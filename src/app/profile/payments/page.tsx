"use client";

import PaymentCardItem, {
  getPaymentCardKey,
} from "@/components/profile/PaymentCardItem";
import ProfileEmptyState from "@/components/profile/ProfileEmptyState";
import ProfileListSkeleton from "@/components/profile/ProfileListSkeleton";
import ProfilePageShell from "@/components/profile/ProfilePageShell";
import { getPaymentCardId } from "@/types/payment";
import { usePaymentHelper } from "./paymentHelper";

export default function PaymentsPage() {
  const { cards, defaultCard, isLoading, error } = usePaymentHelper();

  return (
    <ProfilePageShell
      title="Payments"
      description="View and manage your payment methods in AlKhafeef."
    >
      {isLoading ? (
        <ProfileListSkeleton />
      ) : error ? (
        <p className="text-sm text-red-500">{error}</p>
      ) : cards.length > 0 ? (
        <div className="space-y-4">
          {cards.map((card, index) => (
            <PaymentCardItem
              key={getPaymentCardKey(card, index)}
              card={card}
              isDefault={getPaymentCardId(card) === defaultCard}
            />
          ))}
        </div>
      ) : (
        <ProfileEmptyState
          imageSrc="/svg/payment-not-found.svg"
          imageAlt="No payments found"
          title="You have no card saved"
          description=""
          actionLabel=""
          actionHref=""
        />
      )}
    </ProfilePageShell>
  );
}
