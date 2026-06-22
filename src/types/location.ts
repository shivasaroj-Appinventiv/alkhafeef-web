export type ServiceType = "pickup" | "carhop" | "dine-in" | "delivery";

export interface Store {
  storeId: string;
  storeName: string;
  addressEnglish: string;
  addressArabic?: string;
  imageUrl?: string;
  latitude: number;
  longitude: number;
  distance?: number;
  openTime?: string;
  closeTime?: string;
  servicesAvailable: ServiceType[];
}

export interface SelectedLocation {
  store: Store;
  serviceType: ServiceType;
}

export interface LocationState {
  isLocationModalOpen: boolean;
  stores: Store[];
  selectedLocation: SelectedLocation | null;
  activeStoreId: string | null;
  activeServiceType: ServiceType | null;
  searchQuery: string;
  userCoords: { lat: number; lng: number } | null;
  status: "idle" | "loading" | "failed";
}

export interface ApiRestaurantLocation {
  type: "Point";
  coordinates: [number, number];
  areaNameEnglish?: string;
  areaNameArabic?: string;
  cityName?: string;
  stateName?: string;
  countryName?: string;
}

export interface ApiStoreItem {
  _id: string;
  nameEnglish: string;
  nameArabic: string;
  storeNoteEnglish?: string;
  servicePickup: boolean;
  serviceCurbSide: boolean;
  serviceDelivery: boolean;
  serviceDinein: boolean;
  workingHoursStartTimeInMinutes: number;
  workingHoursEndTimeInMinutes: number;
  restaurantLocation?: ApiRestaurantLocation;
  distance?: number;
}

export interface StoreListApiResponse {
  statusCode: number;
  message: string;
  type: string;
  data: {
    list: ApiStoreItem[];
  };
}

export interface FetchStoresParams {
  latitude?: number;
  longitude?: number;
  searchKey?: string;
}