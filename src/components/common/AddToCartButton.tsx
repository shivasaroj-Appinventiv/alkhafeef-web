"use client";

import { Loader2, Minus, Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import type { MenuItem } from "@/types/menu";
import { useCartItem } from "@/hooks/useCartItem";

interface AddToCartButtonProps {
  item: MenuItem;
  size?: "sm" | "md";
  /** When true, add/increment runs directly (used on the item detail page). */
  forceDirectAdd?: boolean;
}

export default function AddToCartButton({
  item,
  size = "sm",
  forceDirectAdd = false,
}: AddToCartButtonProps) {
  const router = useRouter();
  const {
    quantity,
    isMutating,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCartItem(item);

  const itemDetailHref = `/items/${item._id}?menuId=${item.menuId}`;

  const openItemDetails = () => {
    router.push(itemDetailHref);
  };

  const handleAdd = () => {
    if (item.isCustomised && !forceDirectAdd) {
      openItemDetails();
      return;
    }
    addToCart();
  };

  const handleIncrease = () => {
    if (item.isCustomised && !forceDirectAdd) {
      openItemDetails();
      return;
    }
    increaseQuantity();
  };

  const buttonHeight = size === "md" ? "h-12" : "h-10";
  const buttonPadding = size === "md" ? "px-8 text-base" : "px-6 text-sm";

  if (!item.isAvailable) {
    return (
      <button
        type="button"
        disabled
        className={`
          ${buttonHeight} min-w-[120px] rounded-full
          bg-gray-200 px-4
          text-sm font-semibold
          text-gray-500
          cursor-not-allowed
        `}
      >
        Not Available
      </button>
    );
  }

  if (quantity === 0) {
    return (
      <button
        type="button"
        disabled={isMutating}
        onClick={handleAdd}
        className={`
          ${buttonHeight} rounded-full
          bg-[#F26A21]
          ${buttonPadding}
          font-semibold
          text-white
          cursor-pointer
          transition hover:bg-[#e65f17]
          disabled:cursor-not-allowed disabled:opacity-50
        `}
      >
        {isMutating ? (
          <span className="inline-flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Adding...
          </span>
        ) : (
          "Add To Cart"
        )}
      </button>
    );
  }

  const qtyHeight = size === "md" ? "h-12" : "h-11";
  const qtyButtonWidth = size === "md" ? "w-12" : "w-11";

  return (
    <div
      className={`
        flex ${qtyHeight} items-center overflow-hidden
        rounded-full border border-[#d9cdbd]
        bg-white shadow-sm
      `}
    >
      <button
        type="button"
        disabled={isMutating}
        onClick={decreaseQuantity}
        aria-label={quantity === 1 ? "Remove item" : "Decrease quantity"}
        className={`
          flex h-full ${qtyButtonWidth} items-center justify-center
          text-[#F26A21]
          hover:bg-orange-50
          disabled:opacity-50
          cursor-pointer
        `}
      >
        {quantity === 1 ? <Trash2 size={18} /> : <Minus size={18} />}
      </button>

      <span className="w-10 text-center font-semibold">
        {isMutating ? "..." : quantity}
      </span>

      <button
        type="button"
        disabled={isMutating || !item.isAvailable}
        onClick={handleIncrease}
        aria-label="Increase quantity"
        className={`
          flex h-full ${qtyButtonWidth} items-center justify-center
          bg-[#F26A21]
          text-white
          disabled:opacity-50
          cursor-pointer
        `}
      >
        <Plus size={18} />
      </button>
    </div>
  );
}
