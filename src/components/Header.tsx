"use client";
import Link from "next/link";
import { Search, ShoppingCart, Moon, Bell } from "lucide-react";
import { useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { openModal, setStep } from "@/redux/slices/authModalSlice";
import { useSession } from "next-auth/react";

interface HeaderProps {
  cartCount?: number;
  userName?: string;
  lang?: "en" | "ar";
}

export default function Header({
  cartCount = 0,
  userName = "Test",
  lang = "en",
}: HeaderProps) {
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useAppDispatch();

  const { data: session } = useSession();
  const isLoggedIn = !!session?.user;
  const user = session?.user;
  const handleLogin = () =>{
    dispatch(setStep("LOGIN"));
    dispatch(openModal());
  }

  return (
    <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 py-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-emerald-950 text-white shadow-sm">
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 3C9.5 5.5 8 8 8 10.5C8 14.5 11 17 12 20C13 17 16 14.5 16 10.5C16 8 14.5 5.5 12 3Z" />
                <path d="M12 3C11.2 4.7 11 6.3 12 8C13 6.3 12.8 4.7 12 3Z" />
              </svg>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-slate-500">
                alkhafeef
              </p>
              <p className="text-sm font-semibold text-slate-900">ALKHAFEEF</p>
            </div>
          </Link>

          {/* Search */}
          <div className="w-full flex-1">
            <label htmlFor="site-search" className="sr-only">
              Search Item
            </label>
            <div className="relative mx-auto max-w-2xl">
              <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-slate-400">
                <Search className="h-5 w-5" />
              </span>
              <input
                id="site-search"
                type="search"
                placeholder="Search Item"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-full rounded-full border border-slate-200 bg-slate-50 px-14 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
              />
            </div>
          </div>

          {/* Right actions */}
          <div className="flex flex-wrap items-center justify-end gap-3">
            {/* Cart */}

            {isLoggedIn && (
              <Link
                href="/cart"
                className="relative inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
              >
                <ShoppingCart className="h-4 w-4" />
                Cart
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#e05c2a] text-[10px] font-bold text-white">
                    {cartCount}
                  </span>
                )}
              </Link>
            )}

            {/* Language toggle */}
            <button className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50">
              <Moon className="h-4 w-4" />
              {lang === "en" ? "English" : "العربية"}
            </button>

            {isLoggedIn ? (
              <Link
                href="/profile/orders"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-900 text-sm font-semibold text-white">
                  {user?.fullName?.charAt(0)?.toUpperCase()}
                </span>
                <span>{user?.fullName}</span>
              </Link>
            ) : (
              <button
                type="button"
                onClick={handleLogin}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 cursor-pointer"
              >
                Sign In
              </button>
            )}

            {/* Notifications */}
            {isLoggedIn && (
              <button className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:border-slate-300 hover:bg-slate-50">
                <Bell className="h-5 w-5" />
                {/* Unread dot */}
                <span className="absolute top-2 right-2.5 h-2 w-2 rounded-full bg-[#e05c2a]" />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
