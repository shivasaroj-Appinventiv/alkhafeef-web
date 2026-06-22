"use client";
import { useAppDispatch } from "@/redux/hooks";
import { hydrateLocationState } from "@/redux/slices/locationSlice";
import { useEffect } from "react";

export default function LocationInitializer() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(hydrateLocationState());
  }, []);
  return null;
}
