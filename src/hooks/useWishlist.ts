"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  addToWishlist,
  removeFromWishlist,
  selectIsWishlisted,
  selectIsWishlistItemMutating,
} from "@/redux/slices/wishlistSlice";
import { MenuItem } from "@/types/menu";
import { useRequireAuth } from "./useRequireAuth";

export function useWishlist(menuItem: MenuItem) {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);
  const isWishlisted = selectIsWishlisted(state, menuItem);
  const isMutating = selectIsWishlistItemMutating(state, menuItem._id);
  const { requireAuth } = useRequireAuth();

  const toggleWishlist = () => {
    requireAuth(() => {
      if (isWishlisted) {
        dispatch(removeFromWishlist(menuItem));
      } else {
        dispatch(addToWishlist(menuItem));
      }
    });
  };

  return {
    isWishlisted,
    isMutating,
    toggleWishlist,
  };
}
