// src/components/ReviewCard.jsx
import StarRating from "./StarRating";

/**
 * ReviewCard
 * Props:
 *   review  - ReviewDTO object
 *   onEdit  - (review) => void
 *   onDelete - (id) => void
 *   currentUserId - number (to conditionally show edit/delete)
 */
export default function ReviewCard({ review, onEdit, onDelete, currentUserId }) {
  const isOwner = currentUserId && review.userId === currentUserId;

  const formatDate = (isoString) => {
    if (!isoString) return "";
    return new Date(isoString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const initials = review.reviewerName
    ? review.reviewerName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow duration-200">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-emerald-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
            {initials}
          </div>

          <div>
            <p className="font-semibold text-gray-800 leading-tight">{review.reviewerName}</p>
            <p className="text-xs text-gray-400 mt-0.5">{formatDate(review.createdAt)}</p>
          </div>
        </div>

        {/* Actions — only shown to the review owner */}
        {isOwner && (
          <div className="flex gap-2 flex-shrink-0">
            <button
              onClick={() => onEdit(review)}
              className="p-1.5 rounded-lg text-blue-500 hover:bg-blue-50 transition-colors text-sm"
              title="Edit review"
            >
              ✏️
            </button>
            <button
              onClick={() => onDelete(review.id)}
              className="p-1.5 rounded-lg text-red-400 hover:bg-red-50 transition-colors text-sm"
              title="Delete review"
            >
              🗑️
            </button>
          </div>
        )}
      </div>

      {/* Stars */}
      <div className="mt-3">
        <StarRating value={review.rating} size="sm" />
      </div>

      {/* Comment */}
      <p className="mt-2 text-gray-600 text-sm leading-relaxed">{review.comment}</p>

      {/* Footer tag */}
      {review.updatedAt && review.updatedAt !== review.createdAt && (
        <p className="mt-3 text-xs text-gray-300 italic">Edited {formatDate(review.updatedAt)}</p>
      )}
    </div>
  );
}
