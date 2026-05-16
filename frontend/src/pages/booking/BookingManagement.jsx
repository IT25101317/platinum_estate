// src/pages/booking/BookingManagement.jsx
import { useState, useEffect, useCallback } from "react";
import bookingService from "../../services/bookingService";
import BookingCard from "./BookingCard";
import BookingForm from "./BookingForm";

const STATUS_FILTERS = ["ALL", "PENDING", "CONFIRMED", "CANCELLED", "COMPLETED"];

export default function BookingManagement() {
  const [bookings, setBookings]         = useState([]);
  const [filtered, setFiltered]         = useState([]);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState("");
  const [showForm, setShowForm]         = useState(false);
  const [editingBooking, setEditingBooking] = useState(null);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [searchId, setSearchId]         = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // ─── FETCH ─────────────────────────────────────────────────
  const fetchBookings = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await bookingService.getAllBookings();
      setBookings(data);
    } catch {
      setError("Failed to load bookings. Is the backend running?");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchBookings(); }, [fetchBookings]);

  // ─── FILTER ────────────────────────────────────────────────
  useEffect(() => {
    let result = [...bookings];
    if (statusFilter !== "ALL") {
      result = result.filter((b) => b.status === statusFilter);
    }
    if (searchId.trim()) {
      result = result.filter((b) => String(b.id).includes(searchId.trim()));
    }
    setFiltered(result);
  }, [bookings, statusFilter, searchId]);

  // ─── HANDLERS ──────────────────────────────────────────────
  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingBooking(null);
    fetchBookings();
  };

  const handleEdit = (booking) => {
    setEditingBooking(booking);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteConfirm) return;
    try {
      await bookingService.deleteBooking(deleteConfirm);
      setDeleteConfirm(null);
      fetchBookings();
    } catch {
      setError("Failed to delete booking.");
      setDeleteConfirm(null);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await bookingService.updateBookingStatus(id, status);
      fetchBookings();
    } catch {
      setError("Failed to update booking status.");
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingBooking(null);
  };

  // ─── STATS ─────────────────────────────────────────────────
  const stats = {
    total:     bookings.length,
    pending:   bookings.filter((b) => b.status === "PENDING").length,
    confirmed: bookings.filter((b) => b.status === "CONFIRMED").length,
    cancelled: bookings.filter((b) => b.status === "CANCELLED").length,
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-6xl">

        {/* ── Page Header ── */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
              Booking Management
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Manage all property reservations in one place
            </p>
          </div>
          <button
            onClick={() => { setEditingBooking(null); setShowForm((v) => !v); }}
            className="rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-bold text-white
                       shadow-sm transition hover:bg-teal-700"
          >
            {showForm && !editingBooking ? "✕ Close Form" : "＋ New Booking"}
          </button>
        </div>

        {/* ── Stats ── */}
        <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: "Total",     value: stats.total,     color: "text-slate-800" },
            { label: "Pending",   value: stats.pending,   color: "text-amber-600" },
            { label: "Confirmed", value: stats.confirmed, color: "text-teal-600" },
            { label: "Cancelled", value: stats.cancelled, color: "text-red-500" },
          ].map(({ label, value, color }) => (
            <div key={label} className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm text-center">
              <p className={`text-2xl font-extrabold ${color}`}>{value}</p>
              <p className="text-xs font-medium text-slate-400">{label}</p>
            </div>
          ))}
        </div>

        {/* ── Form (create / edit) ── */}
        {showForm && (
          <div className="mb-8">
            <BookingForm
              existingBooking={editingBooking}
              onSuccess={handleFormSuccess}
              onCancel={handleCancel}
            />
          </div>
        )}

        {/* ── Error ── */}
        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* ── Filters ── */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          {/* Status filter tabs */}
          <div className="flex flex-wrap gap-2">
            {STATUS_FILTERS.map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition
                  ${statusFilter === s
                    ? "bg-teal-600 text-white"
                    : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                  }`}
              >
                {s}
              </button>
            ))}
          </div>
          {/* Search */}
          <input
            type="text"
            placeholder="Search by Booking ID…"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="ml-auto w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm
                       text-slate-700 outline-none focus:border-teal-400 sm:w-56"
          />
        </div>

        {/* ── List ── */}
        {loading ? (
          <div className="flex items-center justify-center py-20 text-slate-400">
            <svg className="mr-2 h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
            </svg>
            Loading bookings…
          </div>
        ) : filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-white py-16 text-center">
            <p className="text-slate-400">No bookings found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                onEdit={handleEdit}
                onDelete={(id) => setDeleteConfirm(id)}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── Delete Confirm Modal ── */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="mx-4 w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="mb-2 text-lg font-bold text-slate-800">Delete Booking</h3>
            <p className="mb-6 text-sm text-slate-500">
              Are you sure you want to delete Booking #{deleteConfirm}? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button onClick={handleDeleteConfirm}
                className="flex-1 rounded-lg bg-red-500 py-2.5 text-sm font-bold text-white
                           transition hover:bg-red-600">
                Yes, Delete
              </button>
              <button onClick={() => setDeleteConfirm(null)}
                className="flex-1 rounded-lg border border-slate-200 py-2.5 text-sm font-semibold
                           text-slate-600 transition hover:bg-slate-50">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
