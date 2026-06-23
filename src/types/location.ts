export type ServiceType = "pickup" | "carhop" | "dine-in" | "delivery";

export interface StoreRestaurantLocation {
  coordinates: [number, number];
  areaNameEnglish?: string;
  areaNameArabic?: string;
  cityName?: string;
  stateName?: string;
  countryName?: string;
  zipCode?: string;
}

export interface Store {
  storeId: string;
  storeName: string;
  storeNameEnglish: string;
  storeNameArabic: string;
  addressEnglish: string;
  addressArabic?: string;
  imageUrl?: string;
  latitude: number;
  longitude: number;
  distance?: number;
  openTime?: string;
  closeTime?: string;
  servicesAvailable: ServiceType[];
  storeSdmId: number;
  areaId: number;
  restaurantLocation?: StoreRestaurantLocation;
  paymentMethods: string[];
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
  zipCode?: string;
}

export interface ApiStoreItem {
  _id: string;
  nameEnglish: string;
  nameArabic: string;
  storeNoteEnglish?: string;
  sdmId: number;
  areaId: number;
  servicePickup: boolean;
  serviceCurbSide: boolean;
  serviceDelivery: boolean;
  serviceDinein: boolean;
  workingHoursStartTimeInMinutes: number;
  workingHoursEndTimeInMinutes: number;
  restaurantLocation?: ApiRestaurantLocation;
  paymentMethod?: string[];
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