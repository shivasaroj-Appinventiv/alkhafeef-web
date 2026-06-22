import { FavoriteItem, FetchMenuOptions, MenuData, MenuItem, MenuResponse } from "@/types/menu";
import { cache } from "react";
import { getServerBackendConfig } from "@/lib/api/config.server";
import { buildServerBackendHeaders } from "@/lib/api/server-headers";
import { STORE_ENDPOINTS } from "./api/endpoints";

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
  const { API_BASE_URL } = getServerBackendConfig();

  const url = `${API_BASE_URL}${STORE_ENDPOINTS.MENU_LIST}?servicesType=${servicesAvailable}`;

  const response = await fetch(url, {
    method: "GET",
    headers: buildServerBackendHeaders(),
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

export const getMenuItemList = cache(
  async (categoryId: string, userId?: string) => {
    const { API_BASE_URL } = getServerBackendConfig();
    const params = new URLSearchParams({
      menuId: categoryId,
    });

    if (userId) {
      params.append("userId", userId);
    }

    const url = `${API_BASE_URL}${STORE_ENDPOINTS.MENU_ITEM_LIST}?${params.toString()}`;

    const response = await fetch(url, {
      method: "GET",
      headers: buildServerBackendHeaders(),
      next: { revalidate: 3600 },
    });

    const result = await response.json();
    console.log(result,'result');
    return result.data ?? [];
  },
);


export const getFavoriteItemsList = cache(
  async (pageNo = 1, limit = 12, accessToken?: string): Promise<MenuItem[]> => {
    const { API_BASE_URL } = getServerBackendConfig();
    const params = new URLSearchParams({
      pageNo: String(pageNo),
      limit: String(limit),
    });
    const url = `${API_BASE_URL}${STORE_ENDPOINTS.FAVOURITE_ITEM_LIST}?${params.toString()}`;
    const response = await fetch(url, {
      method: "GET",
      headers: buildServerBackendHeaders({ accessToken }),
      cache: "no-store",
    });

    const {data} = await response.json();    
    return data.data.map((item: FavoriteItem) => item.itemDetails) ?? [];
  },
);
