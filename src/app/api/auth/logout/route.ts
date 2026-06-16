import { auth } from "@/auth";
import { logoutOnBackend } from "@/lib/auth/backend-auth";
import { NextResponse } from "next/server";

export async function POST() {
  const session = await auth();

  if (session?.accessToken) {
    try {
      await logoutOnBackend(session.accessToken);
    } catch {
      // still clear local session
    }
  }

  return NextResponse.json({ success: true });
}