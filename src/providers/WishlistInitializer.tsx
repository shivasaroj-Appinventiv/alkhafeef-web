"use client";
import { useAppDispatch } from "@/redux/hooks";
import { clearWishlist, fetchWishlist } from "@/redux/slices/wishlistSlice";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function WishlistInitializer() {
  const { status } = useSession();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (status === "authenticated") {
      dispatch(fetchWishlist());
    }
    if (status === "unauthenticated") {
      dispatch(clearWishlist());
    }
  }, [status, dispatch]);

  return null;
}
