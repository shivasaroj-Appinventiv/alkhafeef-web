import {
  getCouponDescription,
  getCouponTitle,
  type Coupon,
} from "@/types/payment";
import { Tag } from "lucide-react";

interface OfferCardItemProps {
  coupon: Coupon;
}

export default function OfferCardItem({ coupon }: OfferCardItemProps) {
  const description = getCouponDescription(coupon);

  return (
    <div className="rounded-xl border border-[#e7dfd2] bg-[#faf8f4] px-4 py-4">
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f26a21]/10 text-[#f26a21]">
          <Tag size={18} />
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm font-semibold text-gray-800">
              {getCouponTitle(coupon)}
            </p>
            {coupon.couponCode ? (
              <span className="rounded-md bg-white px-2 py-0.5 text-xs font-medium uppercase tracking-wide text-[#113d2d]">
                {coupon.couponCode}
              </span>
            ) : null}
          </div>

          {description ? (
            <p className="mt-1 text-sm text-gray-500">{description}</p>
          ) : null}

          {coupon.expiryDate ? (
            <p className="mt-2 text-xs text-gray-400">
              Valid till {coupon.expiryDate}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export function getOfferCardKey(coupon: Coupon, index: number) {
  return coupon._id ?? coupon.couponCode ?? `offer-${index}`;
}
