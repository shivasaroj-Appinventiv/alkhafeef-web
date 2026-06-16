"use client";

import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { openModal } from "@/redux/slices/authModalSlice";
import { saveAuthCallbackUrl } from "@/lib/auth/auth-url";

export default function LoginPrompt() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const handledRef = useRef(false);

  useEffect(() => {
    if (searchParams.get("login") !== "1") {
      handledRef.current = false;
      return;
    }

    if (handledRef.current) return;

    handledRef.current = true;

    const callbackUrl = searchParams.get("callbackUrl");
    if (callbackUrl) {
      saveAuthCallbackUrl(callbackUrl);
    }

    dispatch(openModal());
    router.replace("/", { scroll: false });
  }, [searchParams, dispatch, router]);

  return null;
}
