"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import type { MenuItem } from "@/types/menu";
import { useCartItem } from "@/hooks/useCartItem";

interface AddToCartButtonProps {
  item: MenuItem;
}

export default function AddToCartButton({ item }: AddToCartButtonProps) {
  const {
    quantity,
    isMutating,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCartItem(item);

  if (quantity === 0) {
    return (
      <button
        type="button"
        disabled={isMutating || !item.isAvailable}
        onClick={addToCart}
        className="
          h-10 rounded-full
          bg-[#F26A21]
          px-6
          text-sm font-semibold
          text-white
          cursor-pointer
          transition hover:bg-[#e65f17]
          disabled:cursor-not-allowed disabled:opacity-50
          cursor-pointer
        "
      >
        {isMutating ? "Adding..." : "Add To Cart"}
      </button>
    );
  }

  return (
    <div
      className="
        flex h-11 items-center overflow-hidden
        rounded-full border border-[#d9cdbd]
        bg-white shadow-sm
      "
    >
      <button
        type="button"
        disabled={isMutating}
        onClick={decreaseQuantity}
        aria-label={quantity === 1 ? "Remove item" : "Decrease quantity"}
        className="
          flex h-full w-11 items-center justify-center
          text-[#F26A21]
          hover:bg-orange-50
          disabled:opacity-50
          cursor-pointer
        "
      >
        {quantity === 1 ? <Trash2 size={18} /> : <Minus size={18} />}
      </button>

      <span className="w-10 text-center font-semibold">
        {isMutating ? "..." : quantity}
      </span>

      <button
        type="button"
        disabled={isMutating || !item.isAvailable}
        onClick={increaseQuantity}
        aria-label="Increase quantity"
        className="
          flex h-full w-11 items-center justify-center
          bg-[#F26A21]
          text-white
          disabled:opacity-50
          cursor-pointer
        "
      >
        <Plus size={18} />
      </button>
    </div>
  );
}
