"use client";

import { useAppDispatch } from "@/redux/hooks";
import { openModal } from "@/redux/slices/authModalSlice";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

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
