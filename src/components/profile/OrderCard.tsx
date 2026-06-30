"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ChevronDown,
  ChevronUp,
  MapPin,
  Calendar,
  RefreshCw,
  ShoppingBag,
  Info,
} from "lucide-react";
import { useAppDispatch } from "@/redux/hooks";
import { addMenuItemToCart } from "@/redux/slices/cartSlice";
import { toastService } from "@/utils/toast.service";
import type { Order, OrderItem } from "@/types/order";
import type { MenuItem } from "@/types/menu";
import OrderStepper from "./OrderStepper";

interface OrderCardProps {
  order: Order;
  isActive: boolean;
  onRefresh?: () => void;
}

export default function OrderCard({ order, isActive, onRefresh }: OrderCardProps) {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(isActive); // Open by default for active orders
  const [isReordering, setIsReordering] = useState(false);

  // Status mapping for badge styling
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "1":
        return (
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
            Placed
          </span>
        );
      case "2":
        return (
          <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-600">
            Preparing
          </span>
        );
      case "3":
      case "4":
        return (
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
            Ready to Collect
          </span>
        );
      case "5":
        return (
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
            Completed
          </span>
        );
      case "7":
        return (
          <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600">
            Cancelled
          </span>
        );
      default:
        return (
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
            Status: {status}
          </span>
        );
    }
  };

  // Convert API order items to MenuItem format required by Redux cartSlice
  const mapOrderItemToMenuItem = (item: OrderItem): MenuItem => {
    const details = item.itemDetails;
    return {
      _id: details._id,
      itemId: details.itemId,
      menuId: details.menuId,
      nameEnglish: details.nameEnglish,
      nameArabic: details.nameArabic,
      titleEnglish: details.nameEnglish,
      titleArabic: details.nameArabic,
      descriptionEnglish: details.descriptionEnglish ?? "",
      descriptionArabic: details.descriptionArabic ?? "",
      itemImageUrl: details.itemImageUrl ?? "",
      mediaType: "1",
      calories: 0,
      price: details.price,
      isAvailable: details.isAvailable,
      isCustomised: details.isCustomised,
      isOfferExcluded: false,
      isTimeRangeSet: false,
      servicesAvailable: details.servicesAvailable,
      allergicComponent: details.allergicComponent ?? [],
      excludeLocations: [],
      timeRange: [],
      nutritionArabic: "",
      nutritionEnglish: "",
      stampStartDate: 0,
      stampEndDate: 0,
      stampFromTime: 0,
      stampToTime: 0,
    };
  };

  const handleReorder = async () => {
    setIsReordering(true);
    try {
      for (const item of order.items) {
        const menuItem = mapOrderItemToMenuItem(item);
        // Map active modifiers back to expected payloads
        const modGroups = item.modGroups?.map((group) => ({
          ...group,
          modifiers: group.modifiers?.map((m) => ({
            ...m,
            count: m.count ?? 1,
          })),
        }));
        
        await dispatch(
          addMenuItemToCart({
            menuItem,
            modGroups,
          })
        );
      }
      toastService.showToast("Items added to cart successfully!", "success");
    } catch (error) {
      console.error("Reorder failed:", error);
      toastService.showToast("Failed to add items to cart. Please try again.", "error");
    } finally {
      setIsReordering(false);
    }
  };

  // Nice date format helper
  const formattedDate = new Date(order.created).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <article className="overflow-hidden rounded-2xl border border-[#efe8dc] bg-white shadow-sm transition hover:shadow-md">
      {/* Header Summary */}
      <div className="p-4 sm:p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-[#2d4a3e] sm:text-lg">
              Order #{order.orderId}
            </h3>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500 sm:text-sm">
              <span className="flex items-center gap-1">
                <Calendar size={14} className="text-gray-400" />
                {formattedDate}
              </span>
              <span className="h-1 w-1 rounded-full bg-gray-300" />
              <span className="font-medium text-[#3d6358] uppercase">
                {order.servicesAvailable || "pickup"}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {getStatusBadge(order.orderStatus)}
            {isActive && onRefresh && (
              <button
                type="button"
                onClick={onRefresh}
                title="Refresh Status"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f0fbf8] text-[#3d6358] transition hover:bg-[#dff3ee] cursor-pointer"
              >
                <RefreshCw size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Stepper display for Active Orders */}
        {isActive && (
          <div className="mt-6 border-t border-slate-100 pt-4">
            <OrderStepper orderStatus={order.orderStatus} />
          </div>
        )}

        {/* Store Location */}
        <div className="mt-4 flex items-start gap-2 text-sm border-t border-slate-100 pt-4">
          <MapPin size={16} className="mt-0.5 text-[#f26a21] shrink-0" />
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-gray-700 leading-tight">
              {order.storeNameEnglish}
            </p>
            {order.storeNameArabic && (
              <p className="mt-0.5 text-xs text-gray-400 font-medium font-sans text-right" dir="rtl">
                {order.storeNameArabic}
              </p>
            )}
          </div>
        </div>

        {/* Cancellation Reason if cancelled */}
        {order.orderStatus === "7" && order.cancelReason && (
          <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-red-100 bg-red-50/30 p-3 text-xs text-red-700">
            <Info size={16} className="shrink-0 text-red-500" />
            <div>
              <p className="font-bold">Order Cancelled</p>
              <p className="mt-0.5 text-red-600">{order.cancelReason}</p>
            </div>
          </div>
        )}
      </div>

      {/* Expand/Collapse Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between border-t border-[#efe8dc] bg-[#faf8f4]/60 px-5 py-3 text-sm font-semibold text-[#3d6358] transition hover:bg-[#faf8f4] cursor-pointer"
      >
        <span>
          {isOpen ? "Hide Items" : "View Items"} ({order.items.length})
        </span>
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {/* Collapsible Content */}
      {isOpen && (
        <div className="border-t border-[#efe8dc] p-5 space-y-5 bg-[#fafcfb]/30">
          {/* Items List */}
          <div className="divide-y divide-[#efe8dc]">
            {order.items.map((item) => {
              const imageSrc = item.itemDetails.itemImageUrl?.trim();
              const hasModifiers = item.modGroups && item.modGroups.length > 0;

              return (
                <div key={item._id} className="flex gap-4 py-3 first:pt-0 last:pb-0">
                  {/* Item Image */}
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-[#efe8dc] bg-white">
                    {imageSrc ? (
                      <Image
                        src={imageSrc}
                        alt={item.itemDetails.nameEnglish}
                        fill
                        sizes="64px"
                        className="object-contain p-1"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gray-100 text-xs font-semibold text-gray-400">
                        No Img
                      </div>
                    )}
                  </div>

                  {/* Item Specs */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h4 className="font-bold text-[#2d4a3e] text-sm">
                          {item.itemDetails.nameEnglish}
                        </h4>
                        {item.itemDetails.nameArabic && (
                          <p className="text-xs text-gray-400 font-sans" dir="rtl">
                            {item.itemDetails.nameArabic}
                          </p>
                        )}

                        {/* Modifiers List */}
                        {hasModifiers && (
                          <div className="mt-1 space-y-0.5">
                            {item.modGroups.map((group) =>
                              group.modifiers?.map((mod) => (
                                <p
                                  key={mod._id}
                                  className="text-[11px] font-medium text-slate-500"
                                >
                                  + {mod.nameEnglish}{" "}
                                  <span className="font-sans text-[10px] text-gray-400">
                                    ({mod.nameArabic})
                                  </span>{" "}
                                  {mod.price > 0 && `(+SR ${mod.price})`}
                                </p>
                              ))
                            )}
                          </div>
                        )}
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-xs font-bold text-gray-400">
                          Qty: {item.quantity}
                        </p>
                        <p className="text-sm font-bold text-[#3d6358] mt-0.5">
                          SR {(item.itemDetails.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pricing Details Breakdown */}
          <div className="rounded-xl border border-[#efe8dc] bg-white p-4 space-y-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Items Total</span>
              <span className="font-semibold text-[#2d4a3e]">
                SR {order.totalItemAmount.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>VAT (15%)</span>
              <span className="font-semibold text-[#2d4a3e]">
                SR {((order.totalItemAmount * order.vat) / 100).toFixed(2)}
              </span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-red-600">
                <span>Discount</span>
                <span className="font-semibold">
                  -SR {order.discount.toFixed(2)}
                </span>
              </div>
            )}
            {order.isMokafaPayment && order.mokafaAmount > 0 && (
              <div className="flex justify-between text-red-600">
                <span>Mokafa Points Discount</span>
                <span className="font-semibold">
                  -SR {order.mokafaAmount.toFixed(2)}
                </span>
              </div>
            )}
            <div className="border-t border-[#f0ebe3] pt-2 flex justify-between font-bold text-[#2d4a3e]">
              <span>Total Payable</span>
              <span>SR {order.totalAmount.toFixed(2)}</span>
            </div>
          </div>

          {/* Action buttons (Reorder / Tracking info) */}
          {!isActive && (
            <div className="flex justify-end pt-1">
              <button
                type="button"
                onClick={handleReorder}
                disabled={isReordering}
                className="inline-flex items-center gap-2 rounded-full bg-[#f26a21] px-5 py-2.5 text-xs font-bold text-white transition hover:bg-[#e65f17] disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
              >
                <ShoppingBag size={14} />
                {isReordering ? "Adding to Cart..." : "Reorder"}
              </button>
            </div>
          )}
        </div>
      )}
    </article>
  );
}
