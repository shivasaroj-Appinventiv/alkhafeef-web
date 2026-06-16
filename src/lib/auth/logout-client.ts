"use client";

import { signOut } from "next-auth/react";

export async function logoutUser() {
  try {
    await fetch("/api/auth/logout", { method: "POST" });
  } catch {
    // continue
  }

  await signOut({ redirect: false });
}