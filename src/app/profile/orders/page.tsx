"use client";

import { useState } from "react";
import ProfileEmptyState from "@/components/profile/ProfileEmptyState";
import ProfilePageShell from "@/components/profile/ProfilePageShell";
import OrderCard from "@/components/profile/OrderCard";
import { useOrderHelper } from "./orderHelper";

// Premium Order Skeleton Loader for rich aesthetics
function OrderCardSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-[#efe8dc] bg-white p-5 space-y-4">
      <div className="flex justify-between items-start">
        <div className="space-y-2 w-1/2">
          <div className="h-5 bg-gray-200 rounded w-2/3" />
          <div className="h-3.5 bg-gray-100 rounded w-1/2" />
        </div>
        <div className="h-6 bg-gray-200 rounded-full w-20" />
      </div>
      <div className="border-t border-slate-50 pt-4 flex gap-2 items-center">
        <div className="h-4 bg-gray-200 rounded-full w-4 shrink-0" />
        <div className="h-4 bg-gray-100 rounded w-3/4" />
      </div>
      <div className="border-t border-[#efe8dc] pt-3 flex justify-between items-center">
        <div className="h-4 bg-gray-200 rounded w-24" />
        <div className="h-4 bg-gray-200 rounded w-4" />
      </div>
    </div>
  );
}

export default function OrdersPage() {
  const {
    activeOrders,
    previousOrders,
    isLoading,
    error,
    pageNo,
    totalPages,
    totalPreviousCount,
    handlePageChange,
    refetch,
  } = useOrderHelper();

  const [activeTab, setActiveTab] = useState<"active" | "previous">("active");

  return (
    <ProfilePageShell
      title="Orders"
      description="View and track your active orders or browse your order history in AlKhafeef."
    >
      {/* Tabs Selection Header */}
      <div className="mb-6 flex border-b border-[#efe8dc]">
        <button
          type="button"
          onClick={() => setActiveTab("active")}
          className={`relative py-3.5 px-6 text-sm font-bold transition-all cursor-pointer ${
            activeTab === "active"
              ? "text-[#3d6358]"
              : "text-gray-400 hover:text-[#3d6358]"
          }`}
        >
          Active Orders
          {activeOrders.length > 0 && (
            <span className="ml-2 rounded-full bg-[#f26a21] px-2 py-0.5 text-xs text-white">
              {activeOrders.length}
            </span>
          )}
          {activeTab === "active" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#3d6358]" />
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("previous")}
          className={`relative py-3.5 px-6 text-sm font-bold transition-all cursor-pointer ${
            activeTab === "previous"
              ? "text-[#3d6358]"
              : "text-gray-400 hover:text-[#3d6358]"
          }`}
        >
          Previous Orders
          {totalPreviousCount > 0 && (
            <span className="ml-2 rounded-full bg-slate-200 px-2 py-0.5 text-xs text-slate-600">
              {totalPreviousCount}
            </span>
          )}
          {activeTab === "previous" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#3d6358]" />
          )}
        </button>
      </div>

      {/* Main Content Area */}
      {isLoading ? (
        <div className="space-y-4">
          <OrderCardSkeleton />
          <OrderCardSkeleton />
        </div>
      ) : error ? (
        <div className="rounded-xl border border-red-100 bg-red-50 p-4 text-center">
          <p className="text-sm font-semibold text-red-700">{error}</p>
          <button
            type="button"
            onClick={refetch}
            className="mt-2 text-xs font-bold text-[#3d6358] underline cursor-pointer"
          >
            Try Again
          </button>
        </div>
      ) : activeTab === "active" ? (
        activeOrders.length > 0 ? (
          <div className="space-y-5">
            {activeOrders.map((order) => (
              <OrderCard
                key={order._id}
                order={order}
                isActive={true}
                onRefresh={refetch}
              />
            ))}
          </div>
        ) : (
          <ProfileEmptyState
            imageSrc="/svg/order-not-found.svg"
            imageAlt="No active orders found"
            title="No active orders have been placed yet."
            description="You don't have any ongoing orders right now. Check out our menu to place an order!"
          />
        )
      ) : previousOrders.length > 0 ? (
        <div className="space-y-5">
          <div className="space-y-4">
            {previousOrders.map((order) => (
              <OrderCard
                key={order._id}
                order={order}
                isActive={false}
              />
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-3 border-t border-[#efe8dc] pt-6">
              <button
                type="button"
                onClick={() => handlePageChange(pageNo - 1)}
                disabled={pageNo === 1}
                className="inline-flex h-9 items-center justify-center rounded-full border border-[#efe8dc] bg-white px-4 text-xs font-bold text-[#3d6358] shadow-sm transition hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                Previous
              </button>

              <div className="flex items-center gap-2 text-xs font-bold text-gray-600">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#3d6358] text-white">
                  {pageNo}
                </span>
                <span className="text-gray-300 font-normal">/</span>
                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#efe8dc] bg-white text-[#2d4a3e]">
                  {totalPages}
                </span>
              </div>

              <button
                type="button"
                onClick={() => handlePageChange(pageNo + 1)}
                disabled={pageNo === totalPages}
                className="inline-flex h-9 items-center justify-center rounded-full border border-[#efe8dc] bg-white px-4 text-xs font-bold text-[#3d6358] shadow-sm transition hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                Next
              </button>
            </div>
          )}
        </div>
      ) : (
        <ProfileEmptyState
          imageSrc="/svg/order-not-found.svg"
          imageAlt="No past orders found"
          title="No past orders found."
          description="Seems like you have not ordered from AlKhafeef in the recent past."
        />
      )}
    </ProfilePageShell>
  );
}
