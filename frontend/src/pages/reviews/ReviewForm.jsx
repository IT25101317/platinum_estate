// src/components/ReviewForm.jsx
import { useState, useEffect } from "react";
import StarRating from "./StarRating";

/**
 * ReviewForm
 * Props:
 *   onSubmit    - async (formData) => void
 *   onCancel    - () => void
 *   initialData - ReviewDTO | null  (null = create mode, object = edit mode)
 *   propertyId  - number
 *   userId      - number
 *   isLoading   - bool
 */
export default function ReviewForm({
  onSubmit,
  onCancel,
  initialData = null,
  propertyId,
  userId,
  isLoading = false,
}) {
  const isEditMode = Boolean(initialData?.id);

  const [form, setForm] = useState({
    reviewerName: "",
    comment: "",
    rating: 0,
  });
  const [errors, setErrors] = useState({});

  // Pre-fill when editing
  useEffect(() => {
    if (initialData) {
      setForm({
        reviewerName: initialData.reviewerName || "",
        comment: initialData.comment || "",
        rating: initialData.rating || 0,
      });
    }
  }, [initialData]);

  const validate = () => {
    const errs = {};
    if (!form.reviewerName.trim()) errs.reviewerName = "Name is required";
    if (!form.comment.trim()) errs.comment = "Comment is required";
    if (form.rating < 1 || form.rating > 5) errs.rating = "Please select a rating";
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleRating = (rating) => {
    setForm((prev) => ({ ...prev, rating }));
    if (errors.rating) setErrors((prev) => ({ ...prev, rating: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    await onSubmit({
      ...form,
      propertyId,
      userId,
      ...(isEditMode ? { id: initialData.id } : {}),
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg animate-in fade-in zoom-in duration-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-7 pt-6 pb-4 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-800">
            {isEditMode ? "Edit Your Review" : "Write a Review"}
          </h2>
          <button
            onClick={onCancel}
            className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="px-7 py-5 space-y-5">
          {/* Reviewer Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Your Name
            </label>
            <input
              type="text"
              name="reviewerName"
              value={form.reviewerName}
              onChange={handleChange}
              placeholder="Enter your name"
              className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-colors
                ${errors.reviewerName
                  ? "border-red-400 bg-red-50 focus:border-red-500"
                  : "border-gray-200 focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
                }`}
            />
            {errors.reviewerName && (
              <p className="mt-1 text-xs text-red-500">{errors.reviewerName}</p>
            )}
          </div>

          {/* Star Rating */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Rating</label>
            <StarRating value={form.rating} onChange={handleRating} size="lg" showLabel />
            {errors.rating && (
              <p className="mt-1 text-xs text-red-500">{errors.rating}</p>
            )}
          </div>

          {/* Comment */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Your Experience
            </label>
            <textarea
              name="comment"
              value={form.comment}
              onChange={handleChange}
              placeholder="Share details about your experience..."
              rows={4}
              className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-colors resize-none
                ${errors.comment
                  ? "border-red-400 bg-red-50 focus:border-red-500"
                  : "border-gray-200 focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
                }`}
            />
            {errors.comment && (
              <p className="mt-1 text-xs text-red-500">{errors.comment}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-600 text-white text-sm font-semibold transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading
                ? "Saving…"
                : isEditMode
                ? "Update Review"
                : "Submit Review"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
