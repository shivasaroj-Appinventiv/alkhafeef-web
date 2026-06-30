export interface OrderRestaurantLocation {
  type: string;
  coordinates: [number, number];
  areaNameEnglish: string;
  areaNameArabic: string;
  cityName: string;
  stateName: string;
  countryName: string;
  zipCode: string;
}

export interface OrderUserAddress {
  countryCode: string;
  isDefault: boolean;
  addressLabel: string;
  driverId: string | null;
}

export interface OrderItemDetails {
  _id: string;
  menuId: string;
  itemId: number;
  price: number;
  descriptionEnglish?: string;
  descriptionArabic?: string;
  servicesAvailable: string;
  nameEnglish: string;
  nameArabic: string;
  isCustomised: boolean;
  isAvailable: boolean;
  itemImageUrl?: string;
  allergicComponent: any[];
}

export interface OrderModifier {
  _id: string;
  isAvailable: boolean;
  maximum: number;
  minimum: number;
  sdmId: number;
  nameArabic: string;
  nameEnglish: string;
  price: number;
  count: number;
}

export interface OrderModGroup {
  modifiersId: string[];
  _id: string;
  isAvailable: boolean;
  maximum: number;
  minimum: number;
  modGroupId: number;
  title: string;
  titleUn: string;
  isRequired: boolean;
  modType: string;
  modifiers: OrderModifier[];
}

export interface OrderItem {
  _id: string;
  userId: string;
  storeId: string | null;
  itemId: string;
  menuId: string;
  hashId: string;
  isCustomised: boolean;
  itemSdmId: number;
  quantity: number;
  offerdItem: boolean;
  itemDetails: OrderItemDetails;
  modGroups: OrderModGroup[];
  servicesAvailable: string;
  status: string;
  created: number;
}

export interface OrderTimeWithStatus {
  time: number;
  orderStatus: string;
  updatedFrom: string;
}

export interface Order {
  _id: string;
  driverId: string | null;
  orderId: string;
  restaurantLocation: OrderRestaurantLocation;
  storeNameEnglish: string;
  storeNameArabic: string;
  userAddress: OrderUserAddress;
  isArrived: boolean;
  arrivedStatus: string;
  totalItemAmount: number;
  etaTime: number;
  totalAmount: number;
  vat: number;
  paymentType: string;
  paymentStatus: string;
  orderType: string;
  timeWithStatus: OrderTimeWithStatus[];
  orderStatus: string;
  servicesAvailable: string;
  discount: number;
  items: OrderItem[];
  isMokafaPayment: boolean;
  mokafaAmount: number;
  created: number;
  cancelReason?: string;
  vehicleDetails?: Record<string, any>;
}

export interface PreviousOrderResponse {
  total: number;
  pageNo: number;
  totalPage: number;
  nextHit: number;
  limit: number;
  data: Order[];
  filterCount: number;
}

export interface ActivePreviousOrderData {
  activeOrder: Order[];
  previousOrder: PreviousOrderResponse;
}

export interface ActivePreviousOrderResponse {
  statusCode: number;
  message: string;
  type: string;
  data: ActivePreviousOrderData;
}
