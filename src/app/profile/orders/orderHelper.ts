"use client";

import { useCallback, useEffect, useState } from "react";
import { orderService } from "@/services/order.service";
import type { Order } from "@/types/order";

export const useOrderHelper = (initialLimit = 10) => {
  const [activeOrders, setActiveOrders] = useState<Order[]>([]);
  const [previousOrders, setPreviousOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [pageNo, setPageNo] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPreviousCount, setTotalPreviousCount] = useState(0);

  const fetchOrders = useCallback(async (targetPage: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await orderService.getActivePreviousOrders(targetPage, initialLimit);
      const payload = response.data.data;

      setActiveOrders(payload?.activeOrder ?? []);
      setPreviousOrders(payload?.previousOrder?.data ?? []);
      setTotalPages(payload?.previousOrder?.totalPage ?? 1);
      setTotalPreviousCount(payload?.previousOrder?.total ?? 0);
    } catch (err: any) {
      console.error("Failed to fetch orders:", err);
      setError(
        err?.response?.data?.message ||
        err?.message ||
        "Unable to load orders. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  }, [initialLimit]);

  useEffect(() => {
    void fetchOrders(pageNo);
  }, [fetchOrders, pageNo]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPageNo(newPage);
    }
  };

  const refetch = () => {
    void fetchOrders(pageNo);
  };

  return {
    activeOrders,
    previousOrders,
    isLoading,
    error,
    pageNo,
    totalPages,
    totalPreviousCount,
    handlePageChange,
    refetch,
  };
};
