import { api } from "@/lib/api/api";
import { WISHLIST_ENDPOINTS } from "@/lib/api/endpoints";
import type { AxiosResponse } from "axios";
import {
  AddRemoveToWishlistApiResponse,
  AddToWishlistPayload,
  RemoveFromWishlistPayload,
  WishlistListApiResponse,
} from "@/types/wishlist";

export const wishlistService = {
  getWishlist(): Promise<AxiosResponse<WishlistListApiResponse>> {
    return api.get(WISHLIST_ENDPOINTS.HASH_SYNC);
  },

  addToWishlist(
    payload: AddToWishlistPayload,
  ): Promise<AddRemoveToWishlistApiResponse> {
    payload.isFavourite = true;
    return api.post(WISHLIST_ENDPOINTS.ADD_FAVOURITES, payload);
  },

  removeFromWishlist(
    payload: RemoveFromWishlistPayload,
  ): Promise<AddRemoveToWishlistApiResponse> {
    payload.isFavourite = false;
    return api.post(WISHLIST_ENDPOINTS.ADD_FAVOURITES, payload);
  },
};
