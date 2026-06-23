"use client";

import { useRequireAuth } from "@/hooks/useRequireAuth";
import { buildValidateOrderPayload } from "@/lib/cart/validate-order-payload";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { openLocationModal } from "@/redux/slices/locationSlice";
import { selectCartItems } from "@/redux/slices/cartSlice";
import { paymentService } from "@/services/payment.service";
import { toastService } from "@/utils/toast.service";
import { useState } from "react";

export function useValidateOrder() {
  const dispatch = useAppDispatch();
  const { requireAuth } = useRequireAuth();
  const cartItems = useAppSelector(selectCartItems);
  const couponData = useAppSelector((state) => state.cart.couponData);
  const selectedLocation = useAppSelector(
    (state) => state.location.selectedLocation,
  );
  const stores = useAppSelector((state) => state.location.stores);
  const [isValidating, setIsValidating] = useState(false);

  const validateOrder = () => {
    requireAuth(async () => {
      if (!selectedLocation) {
        toastService.showToast("Please select a store to continue", "error");
        dispatch(openLocationModal());
        return;
      }

      if (cartItems.length === 0) {
        toastService.showToast("Your cart is empty", "error");
        return;
      }

      setIsValidating(true);

      try {
        const payload = buildValidateOrderPayload(
          cartItems,
          selectedLocation,
          couponData,
          stores,
        );

        if (!payload.restaurantLocation.areaNameEnglish) {
          toastService.showToast("Please re-select your store to continue", "error");
          dispatch(openLocationModal());
          return;
        }

        const response = await paymentService.validateOrder(payload);
        return response.data;
      } finally {
        setIsValidating(false);
      }
    });
  };

  return {
    validateOrder,
    isValidating,
  };
}
