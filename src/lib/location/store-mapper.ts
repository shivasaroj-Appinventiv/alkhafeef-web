import type { ServiceType, Store } from "@/types/location";
import type { ApiStoreItem } from "@/types/location";

function formatMinutesToTime(minutes: number): string {
  const normalized = ((minutes % 1440) + 1440) % 1440;
  const hours = Math.floor(normalized / 60);
  const mins = normalized % 60;
  const period = hours >= 12 ? "PM" : "AM";
  const displayHour = hours % 12 || 12;

  return `${String(displayHour).padStart(2, "0")}:${String(mins).padStart(2, "0")} ${period}`;
}

function getServicesAvailable(store: ApiStoreItem): ServiceType[] {
  const services: ServiceType[] = [];

  if (store.servicePickup) services.push("pickup");
  if (store.serviceCurbSide) services.push("carhop");
  if (store.serviceDinein) services.push("dine-in");
  if (store.serviceDelivery) services.push("delivery");

  return services;
}

function buildAddress(store: ApiStoreItem): string {
  const location = store.restaurantLocation;
  if (!location) return store.storeNoteEnglish || store.nameEnglish;

  return [
    location.areaNameEnglish,
    location.cityName,
    location.stateName,
    location.countryName,
  ]
    .filter(Boolean)
    .join(", ");
}

export function mapApiStoreToStore(store: ApiStoreItem): Store {
  const [longitude = 0, latitude = 0] = store.restaurantLocation?.coordinates ?? [];

  return {
    storeId: store._id,
    storeName: store.nameEnglish,
    addressEnglish: buildAddress(store),
    addressArabic: store.nameArabic,
    latitude,
    longitude,
    distance:
      store.distance != null
        ? Number(store.distance.toFixed(1))
        : undefined,
    openTime: formatMinutesToTime(store.workingHoursStartTimeInMinutes),
    closeTime: formatMinutesToTime(store.workingHoursEndTimeInMinutes),
    servicesAvailable: getServicesAvailable(store),
  };
}

export function mapApiStoreList(stores: ApiStoreItem[]): Store[] {
  return stores.map(mapApiStoreToStore);
}
