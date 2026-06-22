"use client";

import { Store } from "@/types/location";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useMemo } from "react";
import StoreMapSkeleton from "./StoreMapSkeleton";

interface Props {
  stores: Store[];
  selectedStoreId: string | null;
  isLoading: boolean;
  onSelectStore: (store: Store) => void;
}

const mapContainerStyle = {
  width: "100%",
  height: "100%",
  minHeight: "420px",
  borderRadius: "16px",
};

const DEFAULT_CENTER = { lat: 26.4207, lng: 50.0888 };

export default function StoreMap({
  stores,
  selectedStoreId,
  isLoading,
  onSelectStore,
}: Props) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";

  const { isLoaded, loadError } = useJsApiLoader({
    id: "alkhafeef-google-map",
    googleMapsApiKey: apiKey,
  });

  const selectedStore = stores.find(
    (store: Store) => store.storeId === selectedStoreId,
  );

  const center = useMemo(() => {
    if (selectedStore) {
      return { lat: selectedStore.latitude, lng: selectedStore.longitude };
    }
    if (stores[0]) {
      return { lat: stores[0].latitude, lng: stores[0].longitude };
    }
    return DEFAULT_CENTER;
  }, [selectedStore, stores]);

  if (!apiKey) {
    return (
      <div className="flex h-full min-h-[420px] items-center justify-center rounded-2xl bg-[#f3eee4] text-sm text-gray-500">
        Add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in .env.local
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="flex h-full min-h-[420px] items-center justify-center rounded-2xl bg-[#f3eee4] text-sm text-gray-500">
        Failed to load Google Maps
      </div>
    );
  }

  if (isLoading || !isLoaded) {
    return <StoreMapSkeleton />;
  }

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={selectedStore ? 14 : 11}
      options={{
        disableDefaultUI: false,
        fullscreenControl: true,
        mapTypeControl: true,
      }}
    >
      {stores.map((store) => (
        <Marker
          key={store.storeId}
          position={{ lat: store.latitude, lng: store.longitude }}
          onClick={() => onSelectStore(store)}
        />
      ))}
    </GoogleMap>
  );
}
