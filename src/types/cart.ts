export interface CartItemDetails {
  _id: string;
  allergicComponent: string[];
  descriptionArabic: string;
  descriptionEnglish: string;
  excludeLocations: string[];
  isAvailable: boolean;
  isCustomised: boolean;
  isOfferExcluded: boolean;
  itemId: number;
  itemImageUrl: string;
  mediaType: string;
  menuId: string;
  nameArabic: string;
  nameEnglish: string;
  price: number;
  servicesAvailable: string;
}

export interface CartMenu {
  _id: string;
  isAvailable: boolean;
  isTimeRangeSet: boolean;
  menuTempId: string;
  servicesAvailable: string;
  timeRange: unknown[];
  titleArabic: string;
  titleEnglish: string;
}

export interface CartItem {
  _id: string;
  userId: string;
  storeId: string | null;
  itemId: string;
  menuId: string;
  quantity: number;
  itemSdmId: number;
  isCustomised: boolean;
  offeredItem: boolean;
  hashId: string;
  modGroups: unknown[];
  servicesAvailable: string;
  isAvailable: boolean;
  status: string;
  created: number;
  itemDetails: CartItemDetails;
  menu: CartMenu;
}

export interface CartListData {
  data: CartItem[];
  couponData: Record<string, unknown>;
}

export interface CartListApiResponse {
  statusCode: number;
  message: string;
  type: "CART_ITEM_LIST";
  data: CartListData;
}

export interface UpdateCartQuantityPayload {
  hashId: string;
  isIncrement: boolean;
  itemId: string;
  quantity: number;
}

export interface RemoveFromCartPayload {
  hashId: string;
  itemId: string;
  quantity: number;
  offerdItem: boolean;
}

export interface AddToCartPayload {
  itemId: string;
  menuId: string;
  hashId: string;
  itemSdmId: number;
  quantity: number;
  servicesAvailable: string;
  modGroups: unknown[];
  offerdItem: boolean;
}
