import type { CartItem } from "@/types/cart";

export type ApiServicesType = "delivery" | "pickup" | "curbside" | "dinein";

export interface ValidateOrderRestaurantLocation {
  coordinates: [number, number];
  areaNameEnglish: string;
  areaNameArabic: string;
  cityName: string;
  stateName: string;
  countryName: string;
  zipCode: string;
}

export interface ValidateOrderCartLine extends Omit<CartItem, "offeredItem"> {
  offerdItem: boolean;
}

export interface ValidateOrderPayload {
  totalItemAmount: number;
  totalAmount: number;
  vat: number;
  storeId: string;
  areaId: number;
  storeNameEnglish: string;
  storeNameArabic: string;
  restaurantLocation: ValidateOrderRestaurantLocation;
  appVersion: string;
  storeSdmId: number;
  isCouponApplied: boolean;
  servicesType: ApiServicesType;
  orderType: string;
  paymentType: string;
  cartDetails: ValidateOrderCartLine[];
  itemQuantityInfo: Record<string, number>;
}

export interface ValidateOrderApiResponse {
  statusCode: number;
  message: string;
  type: string;
  data?: unknown;
}
