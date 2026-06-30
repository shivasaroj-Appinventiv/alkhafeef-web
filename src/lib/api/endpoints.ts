/** Backend API version prefixes */
export const API_V1 = {
  USER_STORE: "/userStore/api/v1",
  USER_CART: "/userCart/api/v1",
  USER_ONBOARD: "/userOnboard/api/v1",
  USER_PAYMENT: "/userPayment/api/v1",
} as const;

export const ADMIN_API_V1 = "/admins/api/v1";

/** Auth / onboarding */
export const AUTH_ENDPOINTS = {
  LOGIN: `${API_V1.USER_ONBOARD}/login`,
  SIGNUP: `${API_V1.USER_ONBOARD}/signup`,
  VERIFY_MOBILE_OTP: `${API_V1.USER_ONBOARD}/verifyMobileOtp`,
  SEND_OTP: `${API_V1.USER_ONBOARD}/sendOtp`,
  SEND_EMAIL_OTP: `${API_V1.USER_ONBOARD}/sendEmailOtp`,
  VERIFY_EMAIL_OTP: `${API_V1.USER_ONBOARD}/verifyEmailOtp`,
  PROFILE: `${API_V1.USER_ONBOARD}/profile`,
  UPDATE_PROFILE: `${API_V1.USER_ONBOARD}/updateProfile`,
  LOGOUT: `${API_V1.USER_ONBOARD}/logout`,
} as const;

/** Cart */
export const CART_ENDPOINTS = {
  LIST: `${API_V1.USER_CART}/cartList`,
  ADD: `${API_V1.USER_CART}/addToCart`,
  UPDATE_QUANTITY: `${API_V1.USER_CART}/updateCartQantity`,
  REMOVE: `${API_V1.USER_CART}/removeCart`,
  COUPON_LIST: `${API_V1.USER_CART}/couponList`,
} as const;

/** Wishlist / favourites */
export const WISHLIST_ENDPOINTS = {
  HASH_SYNC: `${API_V1.USER_STORE}/favouriteHashSync`,
  ADD_FAVOURITES: `${API_V1.USER_STORE}/addFavourites`,
} as const;

/** Payment / checkout */
export const PAYMENT_ENDPOINTS = {
  VALIDATE_ORDER: `${API_V1.USER_PAYMENT}/validateOrder`,
  CARDS: `${API_V1.USER_PAYMENT}/payments/cards`,
  ACTIVE_PREVIOUS_ORDERS: `${API_V1.USER_PAYMENT}/activePreviousOrder`,
} as const;

/** Store — menus, banners, items */
export const STORE_ENDPOINTS = {
  BANNERS: `${API_V1.USER_STORE}/banners`,
  MENU_LIST: `${API_V1.USER_STORE}/menuList`,
  MENU_ITEM_LIST: `${API_V1.USER_STORE}/menuItemList`,
  /** GET ?itemId={id} — e.g. /userStore/api/v1/itemDetails?itemId=690063274aa048bd10515089 */
  ITEM_DETAIL: `${API_V1.USER_STORE}/itemDetails`,
  FAVOURITE_ITEM_LIST: `${API_V1.USER_STORE}/favouriteItemList`,
  MY_STORE_LIST: `${API_V1.USER_STORE}/myStoreList`,
} as const;

/** CMS / static content pages */
export const CONTENT_ENDPOINTS = {
  DETAILS: `${ADMIN_API_V1}/content/details`,
} as const;

export function getItemDetailsUrl(baseUrl: string, itemId: string) {
  return `${baseUrl}${STORE_ENDPOINTS.ITEM_DETAIL}?itemId=${encodeURIComponent(itemId)}`;
}

/** Next.js internal API routes */
export const APP_ENDPOINTS = {
  AUTH_LOGOUT: "/api/auth/logout",
  BACKEND_PROXY: "/api/backend",
} as const;




