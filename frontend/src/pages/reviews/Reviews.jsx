// src/pages/reviews/Reviews.jsx
// Full Reviews page: list, create, edit, delete — wired to Spring Boot backend

import { useState, useEffect, useCallback } from "react";
import ReviewCard from "./ReviewCard";
import ReviewForm from "./ReviewForm";
import StarRating from "./StarRating";
import {
  getReviewsByProperty,
  createReview,
  updateReview,
  deleteReview,
  getPropertyReviewStats,
} from "../../services/reviewService";

// ─── Demo defaults (replace with real auth context / route params) ─────────────
const DEMO_PROPERTY_ID = 1;
const DEMO_USER_ID = 1;

export default function Reviews() {
  // ── State ────────────────────────────────────────────────────────────────────
  const [reviews, setReviews]           = useState([]);
  const [stats, setStats]               = useState({ averageRating: 0, totalReviews: 0 });
  const [loading, setLoading]           = useState(true);
  const [formLoading, setFormLoading]   = useState(false);
  const [error, setError]               = useState(null);
  const [toast, setToast]               = useState(null);

  const [showForm, setShowForm]         = useState(false);
  const [editTarget, setEditTarget]     = useState(null);

  const [filterRating, setFilterRating] = useState(0);
  const [sortOrder, setSortOrder]       = useState("newest");
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const propertyId = DEMO_PROPERTY_ID;
  const userId     = DEMO_USER_ID;

  // ── Data fetching ─────────────────────────────────────────────────────────────

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [data, statsData] = await Promise.all([
        getReviewsByProperty(propertyId),
        getPropertyReviewStats(propertyId),
      ]);
      setReviews(data);
      setStats(statsData);
    } catch (err) {
      setError(err.message || "Failed to load reviews.");
    } finally {
      setLoading(false);
    }
  }, [propertyId]);

  useEffect(() => { fetchReviews(); }, [fetchReviews]);

  // ── Toast helper ──────────────────────────────────────────────────────────────

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // ── CRUD handlers ─────────────────────────────────────────────────────────────

  const handleCreate = async (formData) => {
    setFormLoading(true);
    try {
      await createReview({ ...formData, propertyId, userId });
      showToast("Review submitted!");
      setShowForm(false);
      await fetchReviews();
    } catch (err) {
      showToast(err.message || "Failed to submit review.", "error");
    } finally {
      setFormLoading(false);
    }
  };

  const handleEdit = (review) => {
    setEditTarget(review);
    setShowForm(true);
  };

  const handleUpdate = async (formData) => {
    setFormLoading(true);
    try {
      await updateReview(editTarget.id, formData);
      showToast("Review updated!");
      setShowForm(false);
      setEditTarget(null);
      await fetchReviews();
    } catch (err) {
      showToast(err.message || "Failed to update review.", "error");
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteReview(id);
      showToast("Review deleted.");
      setDeleteConfirm(null);
      await fetchReviews();
    } catch (err) {
      showToast(err.message || "Failed to delete review.", "error");
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditTarget(null);
  };

  // ── Derived list (filter + sort) ──────────────────────────────────────────────

  const displayed = reviews
    .filter((r) => filterRating === 0 || r.rating === filterRating)
    .sort((a, b) => {
      if (sortOrder === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortOrder === "oldest") return new Date(a.createdAt) - new Date(b.createdAt);
      if (sortOrder === "highest") return b.rating - a.rating;
      if (sortOrder === "lowest") return a.rating - b.rating;
      return 0;
    });

  // ── Render ────────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-emerald-50/20">
      {/* ── Toast ── */}
      {toast && (
        <div
          className={`fixed top-5 right-5 z-[999] px-5 py-3 rounded-2xl shadow-lg text-white text-sm font-medium transition-all
            ${toast.type === "error" ? "bg-red-500" : "bg-teal-500"}`}
        >
          {toast.type === "error" ? "⚠️" : "✅"} {toast.message}
        </div>
      )}

      {/* ── Delete Confirm Modal ── */}
      {deleteConfirm !== null && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center">
            <div className="text-5xl mb-4">🗑️</div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Delete this review?</h3>
            <p className="text-sm text-gray-500 mb-6">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Review Form Modal ── */}
      {showForm && (
        <ReviewForm
          onSubmit={editTarget ? handleUpdate : handleCreate}
          onCancel={handleFormClose}
          initialData={editTarget}
          propertyId={propertyId}
          userId={userId}
          isLoading={formLoading}
        />
      )}

      {/* ── Page Content ── */}
      <div className="max-w-3xl mx-auto px-4 py-10">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Reviews</h1>
            <p className="text-sm text-gray-400 mt-1">What guests are saying</p>
          </div>
          <button
            onClick={() => { setEditTarget(null); setShowForm(true); }}
            className="flex items-center gap-2 px-5 py-2.5 bg-teal-500 hover:bg-teal-600 text-white text-sm font-semibold rounded-2xl shadow-sm transition-colors"
          >
            <span className="text-base">✏️</span> Write a Review
          </button>
        </div>

        {/* Stats Banner */}
        {!loading && !error && (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 mb-8 flex flex-col sm:flex-row items-center gap-6">
            <div className="text-center">
              <p className="text-6xl font-black text-teal-500 leading-none">
                {Number(stats.averageRating).toFixed(1)}
              </p>
              <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">out of 5</p>
            </div>

            <div className="flex-1">
              <StarRating value={Math.round(stats.averageRating)} size="md" />
              <p className="text-sm text-gray-500 mt-1">
                Based on <strong className="text-gray-800">{stats.totalReviews}</strong>{" "}
                {stats.totalReviews === 1 ? "review" : "reviews"}
              </p>

              {[5, 4, 3, 2, 1].map((star) => {
                const count = reviews.filter((r) => r.rating === star).length;
                const pct = stats.totalReviews > 0 ? (count / stats.totalReviews) * 100 : 0;
                return (
                  <div key={star} className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-400 w-3">{star}</span>
                    <span className="text-amber-400 text-xs">★</span>
                    <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-400 rounded-full transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-400 w-4">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Filter + Sort Row */}
        {!loading && !error && reviews.length > 0 && (
          <div className="flex flex-wrap gap-3 mb-6">
            <div className="flex gap-2 flex-wrap">
              {[0, 5, 4, 3, 2, 1].map((star) => (
                <button
                  key={star}
                  onClick={() => setFilterRating(star)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors
                    ${filterRating === star
                      ? "bg-teal-500 text-white"
                      : "bg-white border border-gray-200 text-gray-600 hover:border-teal-300"
                    }`}
                >
                  {star === 0 ? "All" : `${"★".repeat(star)} ${star}`}
                </button>
              ))}
            </div>

            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="ml-auto px-3 py-1.5 rounded-full text-xs font-medium border border-gray-200 bg-white text-gray-600 outline-none focus:border-teal-300"
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
              <option value="highest">Highest rated</option>
              <option value="lowest">Lowest rated</option>
            </select>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <div className="w-8 h-8 border-4 border-teal-300 border-t-teal-500 rounded-full animate-spin mb-3" />
            <p className="text-sm">Loading reviews…</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center text-red-600 text-sm">
            <p className="text-2xl mb-2">⚠️</p>
            {error}
            <button
              onClick={fetchReviews}
              className="block mx-auto mt-3 text-red-500 underline text-xs"
            >
              Try again
            </button>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && reviews.length === 0 && (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-12 text-center">
            <p className="text-5xl mb-4">💬</p>
            <p className="text-gray-800 font-semibold mb-1">No reviews yet</p>
            <p className="text-sm text-gray-400 mb-5">Be the first to share your experience!</p>
            <button
              onClick={() => { setEditTarget(null); setShowForm(true); }}
              className="px-6 py-2.5 bg-teal-500 hover:bg-teal-600 text-white text-sm font-semibold rounded-2xl transition-colors"
            >
              Write a Review
            </button>
          </div>
        )}

        {/* No results after filter */}
        {!loading && !error && reviews.length > 0 && displayed.length === 0 && (
          <div className="text-center py-12 text-gray-400 text-sm">
            No reviews match the selected filter.
          </div>
        )}

        {/* Review Cards */}
        {!loading && !error && displayed.length > 0 && (
          <div className="space-y-4">
            {displayed.map((review) => (
              <ReviewCard
                key={review.id}
                review={review}
                onEdit={handleEdit}
                onDelete={(id) => setDeleteConfirm(id)}
                currentUserId={userId}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}