"use client";

import { useAppDispatch } from "@/redux/hooks";
import { openModal } from "@/redux/slices/authModalSlice";
import { useSession } from "next-auth/react";

export function useRequireAuth() {
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();

  const requireAuth = (action: () => void) => {
    if (status === "loading") {
      return;
    }
    if (!session?.user) {
      dispatch(openModal());
      return;
    }
    action();
  };
  return {
    session,
    status,
    isAuthenticated: !!session?.user,
    requireAuth,
  };
}
