"use client";

import type { ServiceType, Store } from "@/types/location";
import StoreCard from "./StoreCard";
import StoreListSkeleton from "./StoreListSkeleton";

interface Props {
  stores: Store[];
  activeStoreId: string | null;
  activeServiceType: ServiceType | null;
  isLoading: boolean;
  onSelectStore: (store: Store) => void;
  onSelectService: (serviceType: ServiceType) => void;
}

export default function StoreList({
  stores,
  activeStoreId,
  activeServiceType,
  isLoading,
  onSelectStore,
  onSelectService,
}: Props) {
  return (
    <div className="flex h-full min-h-0 flex-col">
      <h2 className="mb-3 text-base font-semibold text-[#113d2d]">
        Near By Stores
      </h2>

      {isLoading ? (
        <StoreListSkeleton />
      ) : (
        <div className="flex-1 space-y-3 overflow-y-auto pr-1">
          {stores.length > 0 ? (
            stores.map((store) => (
              <StoreCard
                key={store.storeId}
                store={store}
                isSelected={store.storeId === activeStoreId}
                activeServiceType={activeServiceType}
                onSelectStore={onSelectStore}
                onSelectService={onSelectService}
              />
            ))
          ) : (
            <p className="text-sm text-gray-500">No stores found.</p>
          )}
        </div>
      )}
    </div>
  );
}
