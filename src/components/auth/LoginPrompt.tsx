"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { openModal } from "@/redux/slices/authModalSlice";

export default function LoginPrompt() {
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (searchParams.get("login") === "1") {
      dispatch(openModal());
    }
  }, [searchParams, dispatch]);

  return null;
}
