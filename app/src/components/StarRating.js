"use client";

import { useState, useEffect } from "react";

export default function StarRating({ challengeId, avgRating = 0 }) {
  const [hovered, setHovered] = useState(0);
  const [selected, setSelected] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [locked, setLocked] = useState(false);

  // Reset when challenge changes
  useEffect(() => {
    setHovered(0);
    setSelected(null);
    setIsSubmitting(false);
    setLocked(false);
  }, [challengeId]);

  // Display logic: show stars only when hovered or selected
  const display = hovered || selected;

  const handleRate = async (rating) => {
    if (isSubmitting || locked) return;

    setIsSubmitting(true);
    setSelected(rating);

    try {
      await fetch(`${process.env.REACT_APP_API_BASE_URL}/challenge/${challengeId}/rate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating }),
      });
      setLocked(true);
    } catch (error) {
      console.error("Rating failed:", error);
      setSelected(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex gap-1 items-center">
      {[1, 2, 3, 4, 5].map((i) => {
        const isFilled = i <= display;

        return (
          <svg
            key={i}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill={isFilled ? "#facc15" : "none"}
            stroke="#facc15"
            strokeWidth="1.5"
            className={`w-6 h-6 cursor-pointer transition-transform duration-150 hover:scale-110 ${
              (locked || isSubmitting) ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onMouseEnter={() => !(locked || isSubmitting) && setHovered(i)}
            onMouseLeave={() => !(locked || isSubmitting) && setHovered(0)}
            onClick={() => !(locked || isSubmitting) && handleRate(i)}
          >
            <path
              fillRule="evenodd"
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.955a1 1 0 00.95.69h4.166c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.955c.3.921-.755 1.688-1.538 1.118l-3.37-2.448a1 1 0 00-1.176 0l-3.37 2.448c-.783.57-1.838-.197-1.538-1.118l1.287-3.955a1 1 0 00-.364-1.118L2.06 9.382c-.783-.57-.38-1.81.588-1.81h4.166a1 1 0 00.95-.69l1.286-3.955z"
              clipRule="evenodd"
            />
          </svg>
        );
      })}
    </div>
  );
}
