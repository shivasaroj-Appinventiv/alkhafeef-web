"use client";

import { Store } from "@/types/location";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useEffect, useMemo, useState } from "react";
import MapErrorFallback from "./MapErrorFallback";
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

function isGoogleMapsReferrerError(message: string) {
  return (
    message.includes("RefererNotAllowedMapError") ||
    message.includes("Google Maps JavaScript API error")
  );
}

export default function StoreMap({
  stores,
  selectedStoreId,
  isLoading,
  onSelectStore,
}: Props) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";
  const [runtimeError, setRuntimeError] = useState(false);
  const [origin, setOrigin] = useState("");

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

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  useEffect(() => {
    const onError = (event: ErrorEvent) => {
      if (isGoogleMapsReferrerError(event.message ?? "")) {
        setRuntimeError(true);
      }
    };

    window.addEventListener("error", onError);
    return () => window.removeEventListener("error", onError);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    const checkForMapError = () => {
      if (document.querySelector(".gm-err-container")) {
        setRuntimeError(true);
      }
    };

    checkForMapError();

    const observer = new MutationObserver(checkForMapError);
    observer.observe(document.body, { childList: true, subtree: true });

    const intervalId = window.setInterval(checkForMapError, 500);
    const timeoutId = window.setTimeout(() => {
      window.clearInterval(intervalId);
    }, 10000);

    return () => {
      observer.disconnect();
      window.clearInterval(intervalId);
      window.clearTimeout(timeoutId);
    };
  }, [isLoaded]);

  if (!apiKey) {
    return (
      <div className="flex h-full min-h-[420px] items-center justify-center rounded-2xl bg-[#f3eee4] text-sm text-gray-500">
        Add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in .env.local
      </div>
    );
  }

  if (loadError || runtimeError) {
    return <MapErrorFallback origin={origin || "http://localhost:3000"} />;
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
