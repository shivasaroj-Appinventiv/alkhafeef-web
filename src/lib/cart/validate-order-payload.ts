import type { CartItem } from "@/types/cart";
import type { SelectedLocation, ServiceType, Store } from "@/types/location";
import type {
  ApiServicesType,
  ValidateOrderPayload,
  ValidateOrderRestaurantLocation,
} from "@/types/payment";

const VAT_PERCENTAGE = 15;
const DEFAULT_ORDER_TYPE = "1";
const DEFAULT_PAYMENT_TYPE = "2";

const SERVICE_TYPE_TO_API: Record<ServiceType, ApiServicesType> = {
  pickup: "pickup",
  delivery: "delivery",
  carhop: "curbside",
  "dine-in": "dinein",
};

export function toApiServicesType(serviceType: ServiceType): ApiServicesType {
  return SERVICE_TYPE_TO_API[serviceType];
}

function parseAddressParts(addressEnglish: string) {
  const parts = addressEnglish.split(",").map((part) => part.trim());

  return {
    areaNameEnglish: parts[0] ?? "",
    cityName: parts[1] ?? "",
    stateName: parts[2] ?? "",
    countryName: parts[3] ?? "Saudi Arabia",
  };
}

export function resolveStoreForOrder(store: Store, stores: Store[] = []): Store {
  return stores.find((item) => item.storeId === store.storeId) ?? store;
}

function buildRestaurantLocation(
  store: Store,
): ValidateOrderRestaurantLocation {
  const existing = store.restaurantLocation;
  const addressParts = parseAddressParts(store.addressEnglish);

  return {
    coordinates: existing?.coordinates ?? [store.longitude, store.latitude],
    areaNameEnglish:
      existing?.areaNameEnglish ||
      addressParts.areaNameEnglish ||
      store.storeNameEnglish ||
      store.storeName,
    areaNameArabic:
      existing?.areaNameArabic ||
      store.storeNameArabic ||
      store.addressArabic ||
      addressParts.areaNameEnglish ||
      "",
    cityName: existing?.cityName || addressParts.cityName || "",
    stateName: existing?.stateName || addressParts.stateName || "",
    countryName:
      existing?.countryName || addressParts.countryName || "Saudi Arabia",
    zipCode: existing?.zipCode ?? "",
  };
}

function mapCartLineForValidateOrder(cartLine: CartItem) {
  const { offeredItem, ...rest } = cartLine;

  return {
    ...rest,
    offerdItem: offeredItem ?? false,
  };
}

function buildItemQuantityInfo(cartItems: CartItem[]) {
  return cartItems.reduce<Record<string, number>>((acc, item) => {
    const key = item.itemDetails._id;
    acc[key] = (acc[key] ?? 0) + item.quantity;
    return acc;
  }, {});
}

function calculateCartTotal(cartItems: CartItem[]) {
  return cartItems.reduce(
    (sum, item) => sum + item.itemDetails.price * item.quantity,
    0,
  );
}

export function buildValidateOrderPayload(
  cartItems: CartItem[],
  selectedLocation: SelectedLocation,
  couponData: Record<string, unknown> = {},
  stores: Store[] = [],
): ValidateOrderPayload {
  const store = resolveStoreForOrder(selectedLocation.store, stores);
  const { serviceType } = selectedLocation;
  const totalAmount = calculateCartTotal(cartItems);
  const restaurantLocation = buildRestaurantLocation(store);

  return {
    totalItemAmount: totalAmount,
    totalAmount,
    vat: VAT_PERCENTAGE,
    storeId: store.storeId,
    areaId: store.areaId ?? 0,
    storeNameEnglish: store.storeNameEnglish ?? store.storeName,
    storeNameArabic: store.storeNameArabic ?? store.addressArabic ?? "",
    restaurantLocation,
    appVersion: "web",
    storeSdmId: store.storeSdmId ?? 0,
    isCouponApplied: Object.keys(couponData).length > 0,
    servicesType: toApiServicesType(serviceType),
    orderType: DEFAULT_ORDER_TYPE,
    paymentType: store.paymentMethods?.[0] ?? DEFAULT_PAYMENT_TYPE,
    cartDetails: cartItems.map(mapCartLineForValidateOrder),
    itemQuantityInfo: buildItemQuantityInfo(cartItems),
  };
}
