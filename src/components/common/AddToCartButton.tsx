"use client";

import { useRequireAuth } from "@/hooks/useRequireAuth";
import { Minus, Plus } from "lucide-react";

interface AddToCartButtonProps {
  quantity: number;
  onAdd: () => void;
  onIncrease: () => void;
  onDecrease: () => void;
}

export default function AddToCartButton() {
  const { requireAuth } = useRequireAuth();

const handleAdd = () => {
  requireAuth(() => {
    // cart logic here
  });
};


  
  const quantity=0;
  if (quantity === 0) {
    return (
      <button
        className="
          h-10 rounded-full
          bg-[#F26A21]
          px-6
          text-sm font-semibold
          text-white
          cursor-pointer
          transition hover:bg-[#e65f17]
        "
        onClick={handleAdd}
      >
        Add To Cart
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
        className="
          flex h-full w-11 items-center justify-center
          text-[#F26A21]
          hover:bg-orange-50
        "
      >
        <Minus size={18} />
      </button>

      <span className="w-10 text-center font-semibold">
        {quantity}
      </span>

      <button
        className="
          flex h-full w-11 items-center justify-center
          bg-[#F26A21]
          text-white
        "
      >
        <Plus size={18} />
      </button>
    </div>
  );
}