"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  addMenuItemToCart,
  decreaseCartItem,
  increaseCartItem,
  selectCartLineByMenuItemId,
  selectIsCartItemMutating,
} from "@/redux/slices/cartSlice";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { useConfirmCartRemoval } from "@/hooks/useConfirmCartRemoval";
import type { MenuItem } from "@/types/menu";
import { toastService } from "@/utils/toast.service";

export function useCartItem(menuItem: MenuItem) {
  const dispatch = useAppDispatch();
  const { requireAuth } = useRequireAuth();
  const confirmCartRemoval = useConfirmCartRemoval();

  const cartLine = useAppSelector((state) =>
    selectCartLineByMenuItemId(state, menuItem._id),
  );
  const isMutating = useAppSelector((state) =>
    selectIsCartItemMutating(state, menuItem._id),
  );

  const quantity = cartLine?.quantity ?? 0;

  const runCartAction = (action: () => Promise<unknown>) => {
    requireAuth(async () => {
      try {
        await action();
      } catch (error) {
        console.error(error);
      }
    });
  };

  const addToCart = () => {
    if (!menuItem.isAvailable) {
      toastService.showToast("This item is currently unavailable", "error");
      return;
    }

    runCartAction(() => dispatch(addMenuItemToCart(menuItem)).unwrap());
  };

  const increaseQuantity = () => {
    runCartAction(() => dispatch(increaseCartItem(menuItem)).unwrap());
  };

  const decreaseQuantity = () => {
    const removeItem = () =>
      runCartAction(() => dispatch(decreaseCartItem(menuItem)).unwrap());

    if (quantity <= 1) {
      confirmCartRemoval(removeItem, menuItem.nameEnglish);
      return;
    }

    removeItem();
  };

  return {
    quantity,
    isMutating,
    isInCart: quantity > 0,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
  };
}
