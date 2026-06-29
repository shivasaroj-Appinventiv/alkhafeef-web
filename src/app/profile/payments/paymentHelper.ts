"use client";

import { useCallback, useEffect, useState } from "react";
import { paymentService } from "@/services/payment.service";
import type { PaymentCard } from "@/types/payment";

export function usePaymentHelper() {
  const [cards, setCards] = useState<PaymentCard[]>([]);
  const [defaultCard, setDefaultCard] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCards = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await paymentService.getCards("Tap");
      const payload = response.data.data;

      setCards(payload?.cards ?? []);
      setDefaultCard(payload?.defaultCard ?? "");
    } catch (err) {
      console.error(err);
      setCards([]);
      setDefaultCard("");
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load payment methods. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchCards();
  }, [fetchCards]);

  return {
    cards,
    defaultCard,
    isLoading,
    error,
    refetch: fetchCards,
  };
}
