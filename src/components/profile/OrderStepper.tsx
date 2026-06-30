"use client";

import Image from "next/image";

interface OrderStepperProps {
  orderStatus: string;
}

const steps = [
  {
    id: 1,
    title: "Order Placed",
    activeIcon: "/svg/order-icons/order-active.svg",
    inactiveIcon: "/svg/order-icons/order-inactive.svg",
  },
  {
    id: 2,
    title: "In Kitchen",
    activeIcon: "/svg/order-icons/kitchen-active.svg",
    inactiveIcon: "/svg/order-icons/kitchen-inactive.svg",
  },
  {
    id: 3,
    title: "Ready to Collect",
    activeIcon: "/svg/order-icons/collect-active.svg",
    inactiveIcon: "/svg/order-icons/collect-inactive.svg",
  },
  {
    id: 4,
    title: "Picked Up",
    activeIcon: "/svg/order-icons/pickup-active.svg",
    inactiveIcon: "/svg/order-icons/pickup-inactive.svg",
  },
];

export default function OrderStepper({ orderStatus }: OrderStepperProps) {
  // Map API orderStatus to current step (1 to 4)
  let currentStep = 1;
  if (orderStatus === "1") {
    currentStep = 1;
  } else if (orderStatus === "2") {
    currentStep = 2;
  } else if (orderStatus === "3" || orderStatus === "4") {
    currentStep = 3;
  } else if (orderStatus === "5" || orderStatus === "7") {
    // 7 is Cancelled, but if active order, we show full or whatever (7 usually goes to previous)
    currentStep = 4;
  }

  return (
    <div className="w-full py-4 px-2">
      <div className="relative flex items-center justify-between">
        {/* Connector Line Background */}
        <div className="absolute left-0 right-0 top-1/2 h-1 -translate-y-1/2 bg-slate-100" />

        {/* Active Connector Line Fill */}
        <div
          className="absolute left-0 top-1/2 h-1 -translate-y-1/2 bg-[#3d6358] transition-all duration-500"
          style={{
            width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
          }}
        />

        {/* Steps */}
        {steps.map((step) => {
          const isActive = step.id <= currentStep;
          const isCurrent = step.id === currentStep;

          return (
            <div
              key={step.id}
              className="relative z-10 flex flex-col items-center flex-1"
            >
              {/* Step Circle */}
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                  isActive
                    ? "border-[#3d6358] bg-[#f0fbf8] shadow-md shadow-emerald-900/10 scale-105"
                    : "border-slate-200 bg-white"
                } ${isCurrent ? "ring-4 ring-emerald-100" : ""}`}
              >
                <div className="relative h-7 w-7">
                  <Image
                    src={isActive ? step.activeIcon : step.inactiveIcon}
                    alt={step.title}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Step Title */}
              <span
                className={`mt-2 text-xs font-semibold text-center md:text-sm transition-colors duration-300 ${
                  isActive ? "text-[#3d6358] font-bold" : "text-slate-400"
                }`}
              >
                {step.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
