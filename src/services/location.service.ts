import { api, type ApiRequestConfig } from "@/lib/api/api";
import { STORE_ENDPOINTS } from "@/lib/api/endpoints";
import type { FetchStoresParams, StoreListApiResponse } from "@/types/location";

const locationRequestConfig = {
  skipErrorToast: true,
  skipSignOutOn401: true,
  useBasicAuth: true,
} as ApiRequestConfig;

export const locationService = {
  getStoreList(params: FetchStoresParams = {}, signal?: AbortSignal) {
    return api.get<StoreListApiResponse>(STORE_ENDPOINTS.MY_STORE_LIST, {
      ...locationRequestConfig,
      params: {
        latitude: params.latitude,
        longitude: params.longitude,
        searchKey: params.searchKey ?? "",
      },
      signal,
    });
  },
};
