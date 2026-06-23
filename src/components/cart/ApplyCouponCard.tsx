"use client";

import { ChevronRight, TicketPercent } from "lucide-react";

interface Props {
  onClick: () => void;
}

export default function ApplyCouponCard({ onClick }: Props) {
  return (
    <section>
      <h2 className="mb-3 text-lg font-bold text-[#2d4a3e]">Apply Coupon</h2>

      <button
        type="button"
        onClick={onClick}
        className="flex w-full items-center justify-between rounded-2xl border border-[#efe8dc] bg-white p-4 shadow-sm transition hover:border-[#F26A21]/40 cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fff4ec] text-[#F26A21]">
            <TicketPercent size={20} />
          </span>
          <span className="text-sm font-bold uppercase tracking-wide text-[#F26A21]">
            Apply Coupon
          </span>
        </div>
        <ChevronRight size={20} className="text-[#F26A21]" />
      </button>
    </section>
  );
}
