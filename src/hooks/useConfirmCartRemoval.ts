"use client";

import { useAppDispatch } from "@/redux/hooks";
import { openDialog } from "@/redux/slices/globalSlice";

export function useConfirmCartRemoval() {
  const dispatch = useAppDispatch();

  return (onConfirm: () => void, itemName?: string) => {
    dispatch(
      openDialog({
        open: true,
        message: itemName
          ? `Are you sure you want to remove "${itemName}" from your cart?`
          : "Are you sure you want to remove this item from your cart?",
        onConfirm,
      }),
    );
  };
}
