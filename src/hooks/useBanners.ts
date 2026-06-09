import { useEffect, useState, useCallback } from 'react';
import type { BannerResponse, FetchBannerOptions } from '@/types/banner';

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
 * Client-side hook for fetching banners
 * Use this only when server component fetching is not possible
 * 
 * @param options - Fetch options
 * @returns Object with data, isLoading, error, and refetch function
 */
export function useBanners(options: UseBannersOptions = {}): UseBannersReturn {
  const {
    servicesAvailable = 'pickup',
    lang = 'en',
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
      queryParams.append('servicesAvailable', servicesAvailable);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/banners?${queryParams.toString()}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept-Language': lang === 'ar' ? 'ar' : 'en',
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch banners: ${response.status} ${response.statusText}`
        );
      }

      const result: BannerResponse = await response.json();
      setData(result);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      setError(error);
      console.error('Banner fetch error:', error);
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
