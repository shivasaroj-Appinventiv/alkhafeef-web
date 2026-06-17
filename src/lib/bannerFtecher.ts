import type {
  BannerData,
  BannerResponse,
  FetchBannerOptions,
} from "@/types/banner";

const API_BASE_URL = "https://api-dev.alkhafeef.com.sa/userStore/api/v1";

const getHeaders = (): HeadersInit => ({
  api_key: process.env.api_key ?? "",
  authorization: `Basic QWxraGFmZWVmOkFsa2hhZmVlZkAxMjM=`,
  timezone: "19800000",
  platform: "3",
  language: "en",
  "Content-Type": "application/json",
  Accept: "application/json",
  "Accept-Language": "en",
//   serviceType:"pickup",
});

/**
 * Fetch banners — returns Promise<BannerResponse> (safe for Promise.all)
 */
export async function fetchBanners(): Promise<BannerData[]> {
  const options: FetchBannerOptions = {
    servicesAvailable: "pickup",
    lang: "en",
    revalidate: 3600, // ISR: Revalidate every 1 hour
  };
  const { servicesAvailable = "pickup" } = options;

  const url = `${API_BASE_URL}/banners?servicesAvailable=${servicesAvailable}`;

  const response = await fetch(url, {
    method: "GET",
    headers: getHeaders(),
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

  const url = `${API_BASE_URL}/banners/${bannerId}`;

  const response = await fetch(url, {
    method: "GET",
    headers: getHeaders(),
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
