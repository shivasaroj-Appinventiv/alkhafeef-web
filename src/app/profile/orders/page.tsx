"use client";

import ProfileEmptyState from "@/components/profile/ProfileEmptyState";
import ProfilePageShell from "@/components/profile/ProfilePageShell";
import { useOrderHelper } from "./orderHelper";

export default function OrdersPage() {
  const { orders } = useOrderHelper();

  return (
    <ProfilePageShell
      title="Orders"
      description="View and manage your past and ongoing orders in AlKhafeef."
    >
      {orders.length > 0 ? (
        <div className="space-y-4">
          {orders.map((order: { id: string; name: string }) => (
            <div key={order.id}>
              <h2 className="text-xl font-bold">{order.name}</h2>
            </div>
          ))}
        </div>
      ) : (
        <ProfileEmptyState
          imageSrc="/svg/order-not-found.svg"
          imageAlt="No orders found"
          title="No orders have been placed yet."
          description="Seems like you have not ordered from AlKhafeef in the recent past"
        />
      )}
    </ProfilePageShell>
  );
}
