function CouponEmptyIllustration() {
  return (
    <svg
      viewBox="0 0 200 160"
      className="mx-auto h-36 w-44"
      fill="none"
      aria-hidden
    >
      <circle cx="100" cy="78" r="52" fill="#f3f4f6" />
      <path
        d="M72 44h56a8 8 0 0 1 8 8v10a10 10 0 0 0 0 20v10a8 8 0 0 1-8 8H72a8 8 0 0 1-8-8V92a10 10 0 0 0 0-20V52a8 8 0 0 1 8-8Z"
        fill="#e5e7eb"
        stroke="#d1d5db"
        strokeWidth="2"
      />
      <circle cx="100" cy="58" r="4" fill="#9ca3af" />
      <path
        d="M88 78c0-6 5-10 12-10s12 4 12 10"
        stroke="#9ca3af"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="86" cy="70" r="5" fill="#f9fafb" stroke="#9ca3af" strokeWidth="2" />
      <circle cx="114" cy="70" r="5" fill="#f9fafb" stroke="#9ca3af" strokeWidth="2" />
      <circle cx="88" cy="71" r="1.5" fill="#6b7280" />
      <circle cx="116" cy="71" r="1.5" fill="#6b7280" />
      <text x="44" y="36" fill="#d1d5db" fontSize="14" fontWeight="700">
        x
      </text>
      <text x="150" y="48" fill="#d1d5db" fontSize="12" fontWeight="700">
        x
      </text>
      <circle cx="52" cy="112" r="3" fill="#d1d5db" />
      <circle cx="148" cy="104" r="2.5" fill="#d1d5db" />
    </svg>
  );
}

interface Props {
  onClose: () => void;
}

export default function ApplyCouponModal({ onClose }: Props) {
  return (
    <div
      className="dialog-backdrop z-[999]"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="coupon-modal-title"
      >
        <div className="relative bg-[#F9F5EB] px-6 pb-6 pt-8">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#e53935] text-lg font-bold text-white cursor-pointer"
            aria-label="Close"
          >
            ×
          </button>

          <h2
            id="coupon-modal-title"
            className="text-center text-base font-bold uppercase tracking-wide text-gray-700"
          >
            Offers For You
          </h2>

          <p className="mt-6 text-sm font-medium text-gray-700">
            Have a coupon code?
          </p>

          <div className="relative mt-3">
            <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-gray-400">
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M4 9a2 2 0 0 1 2-2h2.5a1.5 1.5 0 0 0 0-3H6a4 4 0 0 0-4 4v2a4 4 0 0 0 4 4h2.5a1.5 1.5 0 0 0 0-3H6a2 2 0 0 1-2-2V9Z" />
                <path d="M20 9a2 2 0 0 0-2-2h-2.5a1.5 1.5 0 0 1 0-3H18a4 4 0 0 1 4 4v2a4 4 0 0 1-4 4h-2.5a1.5 1.5 0 0 1 0-3H18a2 2 0 0 0 2-2V9Z" />
                <path d="M9 12h6" strokeLinecap="round" />
              </svg>
            </span>

            <input
              type="text"
              placeholder="Enter Coupon Code"
              className="w-full rounded-xl border border-[#e7dfd2] bg-white py-3.5 pl-12 pr-28 text-sm text-gray-800 outline-none placeholder:text-gray-400 focus:border-[#F26A21]"
            />

            <button
              type="button"
              className="absolute inset-y-1.5 right-1.5 rounded-lg bg-[#F3B091] px-5 text-sm font-semibold text-white cursor-pointer"
            >
              Apply
            </button>
          </div>
        </div>

        <div className="px-6 py-10 text-center">
          <CouponEmptyIllustration />
          <p className="mt-4 text-lg font-bold text-[#2D5A56]">No coupon found</p>
          <p className="mt-1 text-sm text-gray-500">
            There are no coupons for now..
          </p>
        </div>
      </div>
    </div>
  );
}
