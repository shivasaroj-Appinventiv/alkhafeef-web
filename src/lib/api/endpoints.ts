/** Backend API version prefixes */
export const API_V1 = {
  USER_STORE: "/userStore/api/v1",
  USER_CART: "/userCart/api/v1",
  USER_ONBOARD: "/userOnboard/api/v1",
} as const;

/** Auth / onboarding */
export const AUTH_ENDPOINTS = {
  LOGIN: `${API_V1.USER_ONBOARD}/login`,
  SIGNUP: `${API_V1.USER_ONBOARD}/signup`,
  VERIFY_MOBILE_OTP: `${API_V1.USER_ONBOARD}/verifyMobileOtp`,
  RESEND_OTP: `${API_V1.USER_ONBOARD}/resendOtp`,
  PROFILE: `${API_V1.USER_ONBOARD}/profile`,
  LOGOUT: `${API_V1.USER_ONBOARD}/logout`,
} as const;

/** Cart */
export const CART_ENDPOINTS = {
  LIST: `${API_V1.USER_CART}/cartList`,
  ADD: `${API_V1.USER_CART}/addToCart`,
  UPDATE_QUANTITY: `${API_V1.USER_CART}/updateCartQantity`,
  REMOVE: `${API_V1.USER_CART}/removeCart`,
} as const;

/** Wishlist / favourites */
export const WISHLIST_ENDPOINTS = {
  HASH_SYNC: `${API_V1.USER_STORE}/favouriteHashSync`,
  ADD_FAVOURITES: `${API_V1.USER_STORE}/addFavourites`,
} as const;

/** Store — menus, banners, items */
export const STORE_ENDPOINTS = {
  BANNERS: `${API_V1.USER_STORE}/banners`,
  MENU_LIST: `${API_V1.USER_STORE}/menuList`,
  MENU_ITEM_LIST: `${API_V1.USER_STORE}/menuItemList`,
  FAVOURITE_ITEM_LIST: `${API_V1.USER_STORE}/favouriteItemList`,
  MY_STORE_LIST: `${API_V1.USER_STORE}/myStoreList`,
} as const;

/** Next.js internal API routes */
export const APP_ENDPOINTS = {
  AUTH_LOGOUT: "/api/auth/logout",
  BACKEND_PROXY: "/api/backend",
} as const;




