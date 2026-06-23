"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  fetchCart,
  selectCartItems,
} from "@/redux/slices/cartSlice";
import Cart, { CartEmptyState, CartLoadingState } from "@/components/cart/Cart";

export default function CartPage() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const status = useAppSelector((state) => state.cart.status);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  if (status === "loading" && items.length === 0) {
    return <CartLoadingState />;
  }

  if (items.length === 0) {
    return <CartEmptyState />;
  }

  return <Cart />;
}
