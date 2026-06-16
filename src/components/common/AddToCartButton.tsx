"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { toastService } from "@/utils/toast.service";

interface AddToCartButtonProps {
  itemId: string;
}

export default function AddToCartButton({ itemId }: AddToCartButtonProps) {
  const { requireAuth } = useRequireAuth();
  const [quantity, setQuantity] = useState(0);

  const handleAdd = () => {
    requireAuth(() => {
      setQuantity(1);
      toastService.showToast("Item added to cart", "success");
      // TODO: call cart API with itemId when backend is ready
      void itemId;
    });
  };

  const handleIncrease = () => {
    requireAuth(() => {
      setQuantity((current) => current + 1);
    });
  };

  const handleDecrease = () => {
    requireAuth(() => {
      setQuantity((current) => (current > 1 ? current - 1 : 0));
    });
  };

  if (quantity === 0) {
    return (
      <button
        type="button"
        onClick={handleAdd}
        className="
          h-10 rounded-full
          bg-[#F26A21]
          px-6
          text-sm font-semibold
          text-white
          transition hover:bg-[#e65f17]
        "
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
        type="button"
        onClick={handleDecrease}
        className="
          flex h-full w-11 items-center justify-center
          text-[#F26A21]
          hover:bg-orange-50
        "
      >
        <Minus size={18} />
      </button>

      <span className="w-10 text-center font-semibold">{quantity}</span>

      <button
        type="button"
        onClick={handleIncrease}
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
