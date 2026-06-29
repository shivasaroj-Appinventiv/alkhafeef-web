import { api } from "@/lib/api/api";
import { PAYMENT_ENDPOINTS } from "@/lib/api/endpoints";
import type {
  PaymentCardsApiResponse,
  PaymentGateway,
  ValidateOrderApiResponse,
  ValidateOrderPayload,
} from "@/types/payment";
import type { AxiosResponse } from "axios";

export const paymentService = {
  validateOrder(
    payload: ValidateOrderPayload,
  ): Promise<AxiosResponse<ValidateOrderApiResponse>> {
    return api.post(PAYMENT_ENDPOINTS.VALIDATE_ORDER, payload);
  },

  getCards(
    paymentGateway: PaymentGateway = "Tap",
  ): Promise<AxiosResponse<PaymentCardsApiResponse>> {
    return api.get(PAYMENT_ENDPOINTS.CARDS, {
      params: { paymentGateway },
    });
  },
};
