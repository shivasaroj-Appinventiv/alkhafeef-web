import { api } from "@/lib/api/api";
import type { AxiosResponse } from "axios";
import {
  AddRemoveToWishlistApiResponse,
  AddToWishlistPayload,
  RemoveFromWishlistPayload,
  WishlistListApiResponse,
} from "@/types/wishlist";

export const wishlistService = {
  getWishlist(): Promise<AxiosResponse<WishlistListApiResponse>> {
    return api.get("userStore/api/v1/favouriteHashSync");
  },

  addToWishlist(
    payload: AddToWishlistPayload,
  ): Promise<AddRemoveToWishlistApiResponse> {
    payload.isFavourite = true;
    return api.post("userStore/api/v1/addFavourites", payload);
  },

  removeFromWishlist(
    payload: RemoveFromWishlistPayload,
  ): Promise<AddRemoveToWishlistApiResponse> {
    payload.isFavourite = false;
    return api.post("userStore/api/v1/addFavourites", payload);
  },
};
