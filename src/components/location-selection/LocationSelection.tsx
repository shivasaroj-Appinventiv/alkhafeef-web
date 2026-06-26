"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import {
  closeLocationModal,
  confirmLocationSelection,
  fetchStores,
  selectServiceType,
  selectStore,
  setSearchQuery,
  setUserCoords,
} from "@/redux/slices/locationSlice";
import { RootState } from "@/redux/store";
import { ServiceType, Store } from "@/types/location";
import { X } from "lucide-react";
import { useEffect } from "react";
import AnimatedDialog from "@/components/common/AnimatedDialog";
import StoreList from "./StoreList";
import StoreMap from "./StoreMap";
import StoreSearch from "./StoreSearch";

const DEFAULT_COORDS = { lat: 26.4207, lng: 50.0888 };
const SEARCH_DEBOUNCE_MS = 500;

export default function LocationSelection() {
  const dispatch = useAppDispatch();
  const {
    isLocationModalOpen,
    stores,
    activeStoreId,
    activeServiceType,
    searchQuery,
    userCoords,
    status,
  } = useAppSelector((state: RootState) => state.location);

  const debouncedSearchKey = useDebouncedValue(searchQuery, SEARCH_DEBOUNCE_MS);
  const isDebouncing = searchQuery.trim() !== debouncedSearchKey.trim();
  const isLoading = status === "loading" || isDebouncing || !userCoords;

  useEffect(() => {
    if (!isLocationModalOpen) return;

    if (!navigator.geolocation) {
      dispatch(setUserCoords(DEFAULT_COORDS));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        dispatch(
          setUserCoords({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }),
        );
      },
      () => {
        dispatch(setUserCoords(DEFAULT_COORDS));
      },
    );
  }, [dispatch, isLocationModalOpen]);

  useEffect(() => {
    if (!isLocationModalOpen || !userCoords) return;

    dispatch(
      fetchStores({
        latitude: userCoords.lat,
        longitude: userCoords.lng,
        searchKey: debouncedSearchKey.trim(),
      }),
    );
  }, [dispatch, isLocationModalOpen, userCoords, debouncedSearchKey]);

  const handleSelectStore = (store: Store) => {
    dispatch(selectStore(store));

    if (!activeServiceType && store.servicesAvailable[0]) {
      dispatch(selectServiceType(store.servicesAvailable[0]));
    }
  };

  const handleSelectService = (serviceType: ServiceType) => {
    dispatch(selectServiceType(serviceType));
    dispatch(confirmLocationSelection());
  };

  const handleSearch = (value: string) => {
    dispatch(setSearchQuery(value));
  };

  return (
    <AnimatedDialog
      open={isLocationModalOpen}
      onClose={() => dispatch(closeLocationModal())}
      closeOnBackdropClick={false}
      backdropClassName="z-[998]"
      panelClassName="relative flex h-[90vh] w-full max-w-6xl flex-col overflow-hidden rounded-3xl bg-[#F7F4EA] shadow-xl"
    >
      <button
        type="button"
        onClick={() => dispatch(closeLocationModal())}
        className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-[#e53935] text-white cursor-pointer"
        aria-label="Close"
      >
        <X size={20} />
      </button>

      <div className="border-b border-[#e7dfd2] px-6 py-5 text-center">
        <h1 className="text-lg font-bold uppercase tracking-wide text-[#113d2d]">
          Select a Store
        </h1>
      </div>

      <div className="px-6 py-4">
        <StoreSearch value={searchQuery} onChange={handleSearch} />
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 px-6 pb-6 lg:grid-cols-2">
        <StoreList
          stores={stores}
          activeStoreId={activeStoreId}
          activeServiceType={activeServiceType}
          isLoading={isLoading}
          onSelectStore={handleSelectStore}
          onSelectService={handleSelectService}
        />

        <div className="min-h-[420px] overflow-hidden rounded-2xl">
          <StoreMap
            stores={stores}
            selectedStoreId={activeStoreId}
            isLoading={isLoading}
            onSelectStore={handleSelectStore}
          />
        </div>
      </div>
    </AnimatedDialog>
  );
}
