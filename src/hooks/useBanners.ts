import { useEffect, useState, useCallback } from "react";
import type { BannerResponse, FetchBannerOptions } from "@/types/banner";
import { CLIENT_API_BASE_URL } from "@/lib/api/config";
import { STORE_ENDPOINTS } from "@/lib/api/endpoints";

interface UseBannersOptions extends FetchBannerOptions {
  enabled?: boolean;
}

interface UseBannersReturn {
  data: BannerResponse | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

/**
 * Client-side hook for fetching banners via the secure API proxy.
 */
export function useBanners(options: UseBannersOptions = {}): UseBannersReturn {
  const {
    servicesAvailable = "pickup",
    lang = "en",
    enabled = true,
  } = options;

  const [data, setData] = useState<BannerResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchBannersData = useCallback(async () => {
    if (!enabled) return;

    setIsLoading(true);
    setError(null);

    try {
      const queryParams = new URLSearchParams();
      queryParams.append("servicesAvailable", servicesAvailable);

      const response = await fetch(
        `${CLIENT_API_BASE_URL}${STORE_ENDPOINTS.BANNERS}?${queryParams.toString()}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Accept-Language": lang === "ar" ? "ar" : "en",
            language: "en",
            platform: "3",
            timezone: String(new Date().getTimezoneOffset() * -60 * 1000),
          },
        },
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch banners: ${response.status} ${response.statusText}`,
        );
      }

      const result: BannerResponse = await response.json();
      setData(result);
    } catch (err) {
      const fetchError = err instanceof Error ? err : new Error("Unknown error");
      setError(fetchError);
      console.error("Banner fetch error:", fetchError);
    } finally {
      setIsLoading(false);
    }
  }, [servicesAvailable, lang, enabled]);

  const refetch = useCallback(async () => {
    await fetchBannersData();
  }, [fetchBannersData]);

  useEffect(() => {
    fetchBannersData();
  }, [fetchBannersData]);

  return {
    data,
    isLoading,
    error,
    refetch,
  };
}
