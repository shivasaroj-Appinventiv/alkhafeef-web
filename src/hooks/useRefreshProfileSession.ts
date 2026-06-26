"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import type { AppUser } from "@/types/auth-user";

export type ProfileSessionUpdate = Partial<
  Pick<
    AppUser,
    "fullName" | "email" | "mobileNo" | "countryCode" | "isEmailVerified"
  >
>;

export function useRefreshProfileSession() {
  const { update } = useSession();
  const router = useRouter();

  return async (userUpdates?: ProfileSessionUpdate) => {
    await update(userUpdates ? { user: userUpdates } : undefined);
    router.refresh();
  };
}
