"use client";

import type { ServiceType, Store } from "@/types/location";
import Image from "next/image";

const SERVICE_LABELS: Record<ServiceType, string> = {
  pickup: "Pickup",
  carhop: "Carhop",
  "dine-in": "Dine-In",
  delivery: "Delivery",
};

interface Props {
  store: Store;
  isSelected: boolean;
  activeServiceType: ServiceType | null;
  onSelectStore: (store: Store) => void;
  onSelectService: (serviceType: ServiceType) => void;
}

export default function StoreCard({
  store,
  isSelected,
  activeServiceType,
  onSelectStore,
  onSelectService,
}: Props) {
  
  return (
    <button
      type="button"
      onClick={() => onSelectStore(store)}
      className={`w-full rounded-xl border bg-white p-3 text-left transition cursor-pointer ${
        isSelected ? "border-[#f26a21] shadow-sm" : "border-[#e7dfd2]"
      }`}
    >
      <div className="flex gap-3">
        <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-lg bg-[#f7f2ea]">
            <Image
              src="/images/our-store-img.png"
              alt={store.storeName}
              fill
              className="object-cover"
            />

        </div>

        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-semibold text-[#113d2d]">
            {store.storeName}
          </h3>

          <p className="mt-1 text-xs text-gray-500">
            Open : {store.openTime ?? "--"} to {store.closeTime ?? "--"}
            {store.distance != null ? ` | ${store.distance} Km` : ""}
          </p>

          <p className="mt-1 line-clamp-2 text-xs text-gray-500">
            {store.addressEnglish}
          </p>
        </div>
      </div>

      {isSelected ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {store.servicesAvailable.map((service) => {
            const active = activeServiceType === service;

            return (
              <span
                key={service}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectService(service);
                }}
                className={`rounded-md px-3 py-1 text-xs font-medium cursor-pointer ${
                  active
                    ? "bg-[#f26a21] text-white"
                    : "bg-[#f3eee4] text-gray-600"
                }`}
              >
                {SERVICE_LABELS[service]}
              </span>
            );
          })}
        </div>
      ) : null}
    </button>
  );
}
