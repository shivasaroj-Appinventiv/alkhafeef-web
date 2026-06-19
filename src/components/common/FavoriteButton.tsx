"use client";

import { Heart, Loader2 } from "lucide-react";

interface FavoriteButtonProps {
  isFavorite: boolean;
  isMutating?: boolean;
  onToggle: () => void;
}

export default function FavoriteButton({ isFavorite, isMutating, onToggle }: FavoriteButtonProps) {
  return (
    <button
      disabled={isMutating}
      onClick={onToggle}
      className="
        absolute right-3 top-3 z-10
        flex h-10 w-10 items-center justify-center
        rounded-full border border-white/70
        bg-white/90 shadow-sm
        transition hover:scale-105
        cursor-pointer
        disabled:cursor-not-allowed disabled:opacity-50
      " aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      {isMutating ? <Loader2 className="animate-spin" aria-hidden="true" /> : <Heart size={20} className={isFavorite ? "fill-[#F26A21] text-[#F26A21]" : "text-gray-300"} aria-hidden="true" />}
    </button>
  );
}