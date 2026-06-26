"use client";

import type { Modifier } from "@/types/menu";

interface Props {
  modifier: Modifier;
  lang?: "en" | "ar";
  isSelected: boolean;
  onToggle: () => void;
}

export default function ModifierRow({
  modifier,
  lang = "en",
  isSelected,
  onToggle,
}: Props) {
  const name = lang === "ar" ? modifier.nameArabic : modifier.nameEnglish;

  return (
    <div className="flex items-center justify-between gap-3 py-3">
      <span className="text-sm font-medium text-[#1d4744]">{name}</span>

      <div className="flex shrink-0 items-center gap-3">
        {modifier.price > 0 ? (
          <span className="text-sm font-semibold text-[#1d4744]">
            +SR {modifier.price}
          </span>
        ) : null}

        <button
          type="button"
          disabled={!modifier.isAvailable}
          onClick={onToggle}
          className={`
            min-w-[72px] rounded-full border px-4 py-1.5
            text-xs font-bold uppercase tracking-wide
            transition cursor-pointer
            disabled:cursor-not-allowed disabled:opacity-40
            ${
              isSelected
                ? "border-[#F26A21] bg-[#F26A21] text-white"
                : "border-[#F26A21] bg-white text-[#F26A21] hover:bg-orange-50"
            }
          `}
        >
          {isSelected ? "Added" : "Add"}
        </button>
      </div>
    </div>
  );
}
