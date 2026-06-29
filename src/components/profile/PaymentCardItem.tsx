import {
  getPaymentCardExpiry,
  getPaymentCardId,
  getPaymentCardLabel,
  type PaymentCard,
} from "@/types/payment";
import { CreditCard } from "lucide-react";

interface PaymentCardItemProps {
  card: PaymentCard;
  isDefault: boolean;
}

export default function PaymentCardItem({
  card,
  isDefault,
}: PaymentCardItemProps) {
  const expiry = getPaymentCardExpiry(card);

  return (
    <div className="flex items-center justify-between rounded-xl border border-[#e7dfd2] bg-[#faf8f4] px-4 py-4">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#113d2d]">
          <CreditCard size={18} />
        </span>
        <div>
          <p className="text-sm font-semibold text-gray-800">
            {getPaymentCardLabel(card)}
          </p>
          {expiry ? (
            <p className="mt-0.5 text-xs text-gray-500">Expires {expiry}</p>
          ) : null}
        </div>
      </div>

      {isDefault ? (
        <span className="rounded-full border border-[#f26a21] px-3 py-1 text-xs font-medium text-[#f26a21]">
          Default
        </span>
      ) : null}
    </div>
  );
}

export function getPaymentCardKey(card: PaymentCard, index: number) {
  return getPaymentCardId(card) || `card-${index}`;
}
