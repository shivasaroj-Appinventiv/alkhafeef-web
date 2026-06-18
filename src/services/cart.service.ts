import { api, type ApiRequestConfig } from "@/lib/api/api";
import type { AddToCartPayload, RemoveFromCartPayload, UpdateCartQuantityPayload } from "@/types/cart";

const cartRequestConfig = {
  skipSignOutOn401: true,
} as ApiRequestConfig;

export const cartService = {
  getCart() {
    return api.get("/userCart/api/v1/cartList", {
      ...cartRequestConfig,
      skipErrorToast: true,
    } as ApiRequestConfig);
  },

  addToCart(payload: AddToCartPayload) {
    return api.post("/userCart/api/v1/addToCart", payload, cartRequestConfig);
  },

  updateCartQuantity(payload: UpdateCartQuantityPayload) {
    return api.put(
      "/userCart/api/v1/updateCartQantity",
      payload,
      cartRequestConfig,
    );
  },

  removeFromCart(payload: RemoveFromCartPayload) {
    return api.put("/userCart/api/v1/removeCart", payload, cartRequestConfig);
  },
};
