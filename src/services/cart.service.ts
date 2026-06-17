import { api, type ApiRequestConfig } from "@/lib/api/api";

export const cartService = {
  getCart() {
    return api.get("/userCart/api/v1/cartList", {
      skipSignOutOn401: true,
      skipErrorToast: true,
    } as ApiRequestConfig);
  },
};