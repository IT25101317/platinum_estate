// src/components/StarRating.jsx
import { useState } from "react";

/**
 * StarRating
 * Props:
 *   value       - current rating (1-5)
 *   onChange    - (rating: number) => void  (omit to make read-only)
 *   size        - "sm" | "md" | "lg"
 *   showLabel   - bool (default false)
 */
export default function StarRating({ value = 0, onChange, size = "md", showLabel = false }) {
  const [hovered, setHovered] = useState(0);
  const isInteractive = typeof onChange === "function";

  const sizes = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl",
  };

  const labels = ["", "Poor", "Fair", "Good", "Very Good", "Excellent"];

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = star <= (isInteractive ? hovered || value : value);
        return (
          <span
            key={star}
            className={`
              ${sizes[size]} transition-all duration-150 select-none
              ${filled ? "text-amber-400" : "text-gray-300"}
              ${isInteractive ? "cursor-pointer hover:scale-110" : ""}
            `}
            onClick={() => isInteractive && onChange(star)}
            onMouseEnter={() => isInteractive && setHovered(star)}
            onMouseLeave={() => isInteractive && setHovered(0)}
          >
            ★
          </span>
        );
      })}
      {showLabel && isInteractive && (hovered || value) > 0 && (
        <span className="ml-2 text-sm font-medium text-amber-600">
          {labels[hovered || value]}
        </span>
      )}
      {!isInteractive && value > 0 && (
        <span className="ml-1 text-sm text-gray-500">({value}/5)</span>
      )}
    </div>
  );
}
