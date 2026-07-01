import { api, type ApiRequestConfig } from "@/lib/api/api";
import { CART_ENDPOINTS } from "@/lib/api/endpoints";
import type { CouponListApiResponse } from "@/types/payment";
import type { AddToCartPayload, RemoveFromCartPayload, UpdateCartQuantityPayload } from "@/types/cart";
import type { AxiosResponse } from "axios";

const cartRequestConfig = {
  skipSignOutOn401: true,
} as ApiRequestConfig;

export const cartService = {
  getCart() {
    return api.get(CART_ENDPOINTS.LIST, {
      ...cartRequestConfig,
      skipErrorToast: true,
    } as ApiRequestConfig);
  },

  addToCart(payload: AddToCartPayload) {
    return api.post(CART_ENDPOINTS.ADD, payload, cartRequestConfig);
  },

  updateCartQuantity(payload: UpdateCartQuantityPayload) {
    return api.put(CART_ENDPOINTS.UPDATE_QUANTITY, payload, cartRequestConfig);
  },

  removeFromCart(payload: RemoveFromCartPayload) {
    return api.put(CART_ENDPOINTS.REMOVE, payload, cartRequestConfig);
  },

  getGeneralSettings() {
    return api.get(CART_ENDPOINTS.GENERAL_SETTINGS);
  },

  getCouponList(
    servicesAvailable: string,
    isOptimized = true,
  ): Promise<AxiosResponse<CouponListApiResponse>> {
    return api.get(CART_ENDPOINTS.COUPON_LIST, {
      params: {
        servicesAvailable,
        isOptimized,
      },
    });
  },
};
