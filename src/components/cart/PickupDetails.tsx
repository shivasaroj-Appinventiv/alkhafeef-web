"use client";

import { useAppSelector } from "@/redux/hooks";
import {
  selectSelectedServiceLabel,
  selectSelectedStoreName,
} from "@/redux/slices/locationSlice";
import { ChevronDown, Flame } from "lucide-react";

export default function PickupDetails() {
  const selectedLocation = useAppSelector((state) => state.location.selectedLocation);
  const storeName = useAppSelector(selectSelectedStoreName);
  const serviceLabel = useAppSelector(selectSelectedServiceLabel);

  const addressEnglish = selectedLocation?.store.addressEnglish ?? "";
  const addressArabic = selectedLocation?.store.addressArabic ?? "";

  return (
    <section>
      <h2 className="mb-3 text-lg font-bold text-[#2d4a3e]">Pickup Details</h2>

      <div className="rounded-2xl border border-[#efe8dc] bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between gap-3 border-b border-[#f0ebe3] pb-4">
          <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            {serviceLabel || "Pickup"}
          </span>

          <button
            type="button"
            className="inline-flex items-center gap-1 rounded-lg border border-[#e7dfd2] bg-[#faf7f2] px-3 py-1.5 text-sm font-medium text-[#42695a] cursor-pointer"
          >
            Now
            <ChevronDown size={16} className="text-gray-500" />
          </button>
        </div>

        <div className="pt-4">
          <div className="flex items-center gap-2">
            <Flame size={16} className="shrink-0 text-[#F26A21]" />
            <h3 className="text-sm font-bold uppercase tracking-wide text-[#2d4a3e]">
              {storeName || "Select a store"}
            </h3>
          </div>

          {addressArabic ? (
            <p className="mt-2 text-sm leading-relaxed text-gray-600" dir="rtl">
              {addressArabic}
            </p>
          ) : null}

          {addressEnglish ? (
            <p className="mt-1 text-sm leading-relaxed text-gray-600">
              {addressEnglish}
            </p>
          ) : !selectedLocation ? (
            <p className="mt-2 text-sm text-gray-500">
              Choose a store to see pickup details.
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
