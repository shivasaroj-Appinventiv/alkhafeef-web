"use client";

import { useAppSelector } from "@/redux/hooks";
import { cartService } from "@/services/cart.service";
import type { Coupon } from "@/types/payment";
import { useCallback, useEffect, useState } from "react";

export function useOfferHelper() {
  const activeServiceType = useAppSelector(
    (state) => state.location.activeServiceType,
  );
  const servicesAvailable = activeServiceType ?? "pickup";

  const [offers, setOffers] = useState<Coupon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOffers = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await cartService.getCouponList(servicesAvailable, true);
      setOffers(response.data.data ?? []);
    } catch (err) {
      console.error(err);
      setOffers([]);
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load offers. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  }, [servicesAvailable]);

  useEffect(() => {
    void fetchOffers();
  }, [fetchOffers]);

  return {
    offers,
    isLoading,
    error,
    refetch: fetchOffers,
  };
}
