import { api } from "@/lib/api/api";
import { PAYMENT_ENDPOINTS } from "@/lib/api/endpoints";
import type { ActivePreviousOrderResponse } from "@/types/order";
import type { AxiosResponse } from "axios";

export const orderService = {
  getActivePreviousOrders(
    pageNo: number,
    limit: number,
  ): Promise<AxiosResponse<ActivePreviousOrderResponse>> {
    return api.get(PAYMENT_ENDPOINTS.ACTIVE_PREVIOUS_ORDERS, {
      params: {
        pageNo,
        limit,
      },
    });
  },
};
