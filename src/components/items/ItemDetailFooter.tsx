"use client";

import { Loader2 } from "lucide-react";

interface Props {
  totalPrice: number;
  onAddToCart: () => void;
  isMutating?: boolean;
  disabled?: boolean;
}

export default function ItemDetailFooter({
  totalPrice,
  onAddToCart,
  isMutating = false,
  disabled = false,
}: Props) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#efe8dc] bg-white px-4 py-4 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-[#1d4744]">1 Item</p>
          <p className="text-lg font-bold text-[#1d4744]">
            SR {totalPrice}
          </p>
        </div>

        <button
          type="button"
          disabled={disabled || isMutating}
          onClick={onAddToCart}
          className="
            min-w-[180px] flex-1 max-w-xs rounded-full
            bg-[#F26A21] px-8 py-3.5
            text-base font-semibold text-white
            transition hover:bg-[#e65f17]
            disabled:cursor-not-allowed disabled:opacity-50
            cursor-pointer
          "
        >
          {isMutating ? (
            <span className="inline-flex items-center justify-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
              Adding...
            </span>
          ) : (
            "Add to Cart"
          )}
        </button>
      </div>
    </div>
  );
}
