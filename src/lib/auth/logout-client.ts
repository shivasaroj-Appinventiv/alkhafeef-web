"use client";

import { signOut } from "next-auth/react";

export async function logoutUser() {
  try {
    await fetch("/api/auth/logout", { method: "POST" });
  } catch {
    // Continue clearing local session even if the request fails
  }

  await signOut({ redirect: false });
}
