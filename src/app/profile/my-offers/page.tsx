"use client";

import OfferCardItem, { getOfferCardKey } from "@/components/profile/OfferCardItem";
import ProfileEmptyState from "@/components/profile/ProfileEmptyState";
import ProfileListSkeleton from "@/components/profile/ProfileListSkeleton";
import ProfilePageShell from "@/components/profile/ProfilePageShell";
import { useOfferHelper } from "./offerHelper";

export default function MyOffersPage() {
  const { offers, isLoading, error } = useOfferHelper();

  return (
    <ProfilePageShell
      title="My Offers"
      description="View your available offers and promotions in AlKhafeef."
    >
      {isLoading ? (
        <ProfileListSkeleton />
      ) : error ? (
        <p className="text-sm text-red-500">{error}</p>
      ) : offers.length > 0 ? (
        <div className="space-y-4">
          {offers.map((offer, index) => (
            <OfferCardItem key={getOfferCardKey(offer, index)} coupon={offer} />
          ))}
        </div>
      ) : (
        <ProfileEmptyState
          imageSrc="/svg/no-offers.svg"
          imageAlt="No offers found"
          title="No offers available yet."
          description="Seems like you do not have any active offers from AlKhafeef at the moment."
          actionLabel=""
          actionHref=""
        />
      )}
    </ProfilePageShell>
  );
}
