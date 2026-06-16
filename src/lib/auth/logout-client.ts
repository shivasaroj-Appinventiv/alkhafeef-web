"use client";

import { signOut } from "next-auth/react";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { clearAuthCallbackUrl } from "@/lib/auth/auth-url";

export async function logoutUser(router?: AppRouterInstance) {
  try {
    await fetch("/api/auth/logout", { method: "POST" });
  } catch {
    // Continue clearing local session even if the request fails
  }

  clearAuthCallbackUrl();
  await signOut({ redirect: false });

  if (router) {
    router.replace("/", { scroll: false });
  } else if (typeof window !== "undefined") {
    window.history.replaceState({}, "", "/");
  }
}
