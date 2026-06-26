"use client";

import Image from "next/image";
import { Flame, Loader2 } from "lucide-react";
import type { MenuItemDetail } from "@/types/menu";

interface Props {
  item: MenuItemDetail;
  lang?: "en" | "ar";
  onAddToCart: () => void;
  isMutating?: boolean;
}

export default function ItemDetailHeader({
  item,
  lang = "en",
  onAddToCart,
  isMutating = false,
}: Props) {
  const name = lang === "ar" ? item.nameArabic : item.nameEnglish;
  const description =
    lang === "ar" ? item.descriptionArabic : item.descriptionEnglish;
  const imageSrc = item.itemImageUrl?.trim() || "/images/alkhafeef_logo.png";

  return (
    <div className="rounded-2xl border border-[#efe8dc] bg-white p-4 shadow-sm">
      <div className="flex gap-4">
        <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-[#f7f2ea] sm:h-32 sm:w-32">
          <Image
            src={imageSrc}
            alt={name}
            fill
            sizes="128px"
            className="object-contain p-2"
          />
        </div>

        <div className="min-w-0 flex-1">
          <h1 className="text-lg font-bold text-[#1d4744] sm:text-xl">{name}</h1>
          <p className="mt-1 text-base font-bold text-[#1d4744]">
            SR {item.price}
          </p>

          <div className="mt-1 flex items-center gap-1.5 text-sm text-gray-500">
            <Flame size={14} className="text-orange-500" />
            <span>{item.calories ?? 0}kcal</span>
          </div>

          {description ? (
            <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-gray-500 sm:text-sm">
              {description}
            </p>
          ) : null}

          {item.isAvailable ? (
            <button
              type="button"
              disabled={isMutating}
              onClick={onAddToCart}
              className="mt-3 rounded-full bg-[#F26A21] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#e65f17] disabled:opacity-50 cursor-pointer"
            >
              {isMutating ? (
                <span className="inline-flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  Adding...
                </span>
              ) : (
                "Add to Cart"
              )}
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
