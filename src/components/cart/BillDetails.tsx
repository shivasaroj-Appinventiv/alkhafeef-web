"use client";

import { useValidateOrder } from "@/hooks/useValidateOrder";
import { useAppSelector } from "@/redux/hooks";
import { selectCartSubtotal } from "@/redux/slices/cartSlice";

export default function BillDetails() {
  const subtotal = useAppSelector(selectCartSubtotal);
  const { validateOrder, isValidating } = useValidateOrder();

  return (
    <section>
      <h2 className="mb-3 text-lg font-bold text-[#2d4a3e]">Bill Details</h2>

      <div className="rounded-2xl border border-[#efe8dc] bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>Item(S) Total</span>
          <span className="font-semibold text-[#2d4a3e]">
            SR {subtotal.toFixed(2)}
          </span>
        </div>

        <hr className="my-3 border-[#f0ebe3]" />

        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-[#2d4a3e]">Total Payable</p>
            <p className="mt-0.5 text-xs text-gray-500">
              (Prices Include 15% VAT)
            </p>
          </div>
          <span className="text-sm font-bold text-[#2d4a3e]">
            SR {subtotal.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-4">
        <p className="text-2xl font-bold text-[#2d4a3e]">
          SR {subtotal.toFixed(2)}
        </p>
        <button
          type="button"
          onClick={validateOrder}
          disabled={isValidating}
          className="rounded-full bg-[#F26A21] px-8 py-3 text-sm font-semibold text-white transition hover:bg-[#e65f17] cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isValidating ? "Validating..." : "Pay Now"}
        </button>
      </div>
    </section>
  );
}
