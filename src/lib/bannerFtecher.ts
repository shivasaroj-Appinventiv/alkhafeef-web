import type {
  BannerData,
  BannerResponse,
  FetchBannerOptions,
} from "@/types/banner";
import { getServerBackendConfig } from "@/lib/api/config.server";
import { STORE_ENDPOINTS } from "@/lib/api/endpoints";
import { buildServerBackendHeaders } from "@/lib/api/server-headers";

/**
 * Fetch banners — returns Promise<BannerResponse> (safe for Promise.all)
 */
export async function fetchBanners(): Promise<BannerData[]> {
  const options: FetchBannerOptions = {
    servicesAvailable: "pickup",
    lang: "en",
    revalidate: 3600,
  };
  const { servicesAvailable = "pickup" } = options;
  const { API_BASE_URL } = getServerBackendConfig();

  const url = `${API_BASE_URL}${STORE_ENDPOINTS.BANNERS}?servicesAvailable=${servicesAvailable}`;

  const response = await fetch(url, {
    method: "GET",
    headers: buildServerBackendHeaders(),
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`fetchBanners failed [${response.status}]: ${errorBody}`);
  }

  const data: BannerResponse = await response.json();

  if (!data.data || !Array.isArray(data.data)) {
    throw new Error("Invalid banner response structure");
  }

  return data.data;
}

/**
 * Fetch banner by ID — returns Promise<BannerResponse> (safe for Promise.all)
 */
export async function fetchBannerById(
  bannerId: string,
  options: FetchBannerOptions = {},
): Promise<BannerResponse> {
  if (!bannerId) throw new Error("Banner ID is required");

  const { API_BASE_URL } = getServerBackendConfig();
  const url = `${API_BASE_URL}${STORE_ENDPOINTS.BANNERS}/${bannerId}`;

  const response = await fetch(url, {
    method: "GET",
    headers: buildServerBackendHeaders(),
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `fetchBannerById failed [${response.status}]: ${errorBody}`,
    );
  }

  return response.json();
}
