"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  ClipboardList, CreditCard, Heart, Gift,
  Bell, UserX, LogOut, Pencil, Check,
} from "lucide-react";

const menuItems = [
  { label: "Order",     href: "/profile/order",    icon: ClipboardList },
  { label: "Payments",  href: "/profile/payments",  icon: CreditCard },
  { label: "Favorites", href: "/profile/favorites", icon: Heart },
  { label: "My Offers", href: "/profile/offers",    icon: Gift },
];

const controlItems = [
  { label: "Notifications Preferences", href: "/profile/notifications", icon: Bell },
  { label: "Deactivate Profile",        href: "/profile/deactivate",    icon: UserX },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[240px] flex-shrink-0 overflow-hidden rounded-[20px] bg-[#3d6358] text-white flex flex-col" 
    >

      {/* Profile */}
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-[#f0ebe0] text-sm font-semibold text-[#3d6358]">
              TU
            </div>
            <div>
              <p className="text-sm font-semibold">Test User</p>
              <div className="mt-0.5 flex items-center gap-1.5">
                <span className="text-xs text-white/80">+966-500000002</span>
                {/* ✅ green verified tick — matches image */}
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-green-500">
                  <Check size={9} strokeWidth={3} className="text-white" />
                </span>
              </div>
            </div>
          </div>
          <button className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#f26a21]">
            <Pencil size={13} />
          </button>
        </div>
      </div>

      <div className="border-t border-dashed border-white/30" />

      {/* My Account */}
      <div className="p-4">
        <h3 className="mb-3 text-base font-semibold">My Account</h3>
        <nav className="flex flex-col gap-0.5">
          {menuItems.map(({ label, href, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
                  active
                    ? "bg-[#f26a21] text-white"
                    : "text-white/85 hover:bg-white/10"
                }`}
              >
                <Icon size={16} />
                {label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-dashed border-white/30" />

      {/* Control Center */}
      <div className="p-4">
        <h3 className="mb-3 text-base font-semibold">Control Center</h3>
        <nav className="flex flex-col gap-0.5">
          {controlItems.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/85 transition hover:bg-white/10"
            >
              <Icon size={16} />
              {label}
            </Link>
          ))}
          <button className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/85 transition hover:bg-white/10">
            <LogOut size={16} />
            Logout
          </button>
        </nav>
      </div>
    </aside>
  );
}