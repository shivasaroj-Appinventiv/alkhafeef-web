"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { toastService } from "@/utils/toast.service";

interface FavoriteButtonProps {
  itemId: string;
}

export default function FavoriteButton({ itemId }: FavoriteButtonProps) {
  const { requireAuth } = useRequireAuth();
  const [isFavorite, setIsFavorite] = useState(false);

  const handleToggle = () => {
    requireAuth(() => {
      setIsFavorite((current) => !current);
      toastService.showToast(
        isFavorite ? "Removed from favorites" : "Added to favorites",
        "success",
      );
      // TODO: call favorites API with itemId when backend is ready
      void itemId;
    });
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
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
