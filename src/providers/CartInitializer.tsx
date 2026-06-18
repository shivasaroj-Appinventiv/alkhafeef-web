"use client";

import { useAppDispatch } from "@/redux/hooks";
import { clearCart, fetchCart } from "@/redux/slices/cartSlice";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function CartInitializer() {
  const { status } = useSession();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === "authenticated") {
      dispatch(fetchCart());
      return;
    }

    if (status === "unauthenticated") {
      dispatch(clearCart());
    }
  }, [status, dispatch]);

  return null;
}
