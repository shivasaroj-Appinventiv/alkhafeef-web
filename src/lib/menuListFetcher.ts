import { FetchMenuOptions, MenuData, MenuResponse } from "@/types/menu";

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
});

/**
 * Fetch menus — returns Promise<MenuResponse> (safe for Promise.all)
 */
export async function fetchMenList(): Promise<MenuData[]> {
  const options: FetchMenuOptions = {
    servicesAvailable: "pickup",
    lang: "en",
    revalidate: 3600,
  };
  const { servicesAvailable = "pickup" } = options;

  const url = `${API_BASE_URL}/menuList?servicesType=${servicesAvailable}`;

  const response = await fetch(url, {
    method: "GET",
    headers: getHeaders(),
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`fetchMenus failed [${response.status}]: ${errorBody}`);
  }

  const data: MenuResponse = await response.json();

  if (!data.data || !Array.isArray(data.data)) {
    throw new Error("Invalid menu response structure");
  }
  return data.data;
}
