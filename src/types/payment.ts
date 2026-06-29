import type { CartItem } from "@/types/cart";

export type PaymentGateway = "Tap";

export interface PaymentCard {
  _id?: string;
  cardId?: string;
  id?: string;
  brand?: string;
  scheme?: string;
  lastFour?: string;
  last4?: string;
  firstSix?: string;
  expMonth?: string | number;
  expYear?: string | number;
  expiryMonth?: string | number;
  expiryYear?: string | number;
  name?: string;
  isDefault?: boolean;
}

export interface PaymentCardsData {
  cards: PaymentCard[];
  defaultCard: string;
  customerId: string;
}

export interface PaymentCardsApiResponse {
  statusCode: number;
  message: string;
  type: "GET_CARDS";
  data: PaymentCardsData;
}

export interface Coupon {
  _id?: string;
  couponCode?: string;
  titleEnglish?: string;
  titleArabic?: string;
  descriptionEnglish?: string;
  descriptionArabic?: string;
  discountValue?: number;
  discountType?: string;
  expiryDate?: string;
  imageUrl?: string;
}

export interface CouponListApiResponse {
  statusCode: number;
  message: string;
  type: "HOME_COUPON_LIST";
  data: Coupon[];
}

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

export function getPaymentCardId(card: PaymentCard) {
  return card._id ?? card.cardId ?? card.id ?? "";
}

export function getPaymentCardLabel(card: PaymentCard) {
  const brand = card.brand ?? card.scheme ?? "Card";
  const lastDigits = card.lastFour ?? card.last4 ?? "****";
  return `${brand} •••• ${lastDigits}`;
}

export function getPaymentCardExpiry(card: PaymentCard) {
  const month = card.expMonth ?? card.expiryMonth;
  const year = card.expYear ?? card.expiryYear;

  if (month == null || year == null) return null;

  const monthLabel = String(month).padStart(2, "0");
  const yearLabel = String(year).slice(-2);
  return `${monthLabel}/${yearLabel}`;
}

export function getCouponTitle(coupon: Coupon) {
  return coupon.titleEnglish ?? coupon.couponCode ?? "Offer";
}

export function getCouponDescription(coupon: Coupon) {
  return coupon.descriptionEnglish ?? "";
}
