"use client";

import Link from "next/link";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { openDialog } from "@/redux/slices/globalSlice";
import {
  removeCartLine,
  selectCartItems,
} from "@/redux/slices/cartSlice";
import ApplyCouponCard from "./ApplyCouponCard";
import ApplyCouponModal from "./ApplyCouponModal";
import BillDetails from "./BillDetails";
import CartLineItem from "./CartLineItem";
import PickupDetails from "./PickupDetails";
import PolicySection from "./PolicySection";

export default function Cart() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);

  const handleClearAll = () => {
    dispatch(
      openDialog({
        open: true,
        message: "Are you sure you want to clear all items from your cart?",
        onConfirm: async () => {
          await Promise.all(
            items.map((item) => dispatch(removeCartLine(item._id))),
          );
        },
      }),
    );
  };

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
          <div className="space-y-8">
            <PickupDetails />

            <section>
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-lg font-bold text-[#2d4a3e]">Your Order</h2>
                <button
                  type="button"
                  onClick={handleClearAll}
                  className="text-sm font-semibold text-[#F26A21] cursor-pointer"
                >
                  Clear All
                </button>
              </div>

              <div className="space-y-4">
                {items.map((cartLine) => (
                  <CartLineItem key={cartLine._id} cartLine={cartLine} />
                ))}
              </div>
            </section>
          </div>

          <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <ApplyCouponCard onClick={() => setIsCouponModalOpen(true)} />
            <BillDetails />
            <PolicySection />
          </div>
        </div>
      </div>

      <ApplyCouponModal
        open={isCouponModalOpen}
        onClose={() => setIsCouponModalOpen(false)}
      />
    </>
  );
}

export function CartEmptyState() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 text-center">
      <h1 className="text-2xl font-bold text-[#42695a]">Your cart is empty</h1>
      <p className="mt-2 text-gray-600">
        Browse the menu and add items to get started.
      </p>
      <Link
        href="/explore-menu"
        className="mt-6 inline-flex rounded-full bg-[#F26A21] px-6 py-3 text-sm font-semibold text-white"
      >
        Explore Menu
      </Link>
    </div>
  );
}

export function CartLoadingState() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <p className="text-center text-gray-600">Loading your cart...</p>
    </div>
  );
}
