"use client";

import { Heart } from "lucide-react";

interface FavoriteButtonProps {
  isFavorite: boolean;
  isLoading?: boolean;
  onToggle: () => void;
}

export default function FavoriteButton() {
  const isFavorite=true;
  return (
    <button
    
      className="
        absolute right-3 top-3 z-10
        flex h-10 w-10 items-center justify-center
        rounded-full border border-white/70
        bg-white/90 shadow-sm
        transition hover:scale-105
      "
    >
      <Heart
        size={20}
        className={
          isFavorite
            ? "fill-[#F26A21] text-[#F26A21]"
            : "text-gray-300"
        }
      />
    </button>
  );
}