"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { MenuItemDetail } from "@/types/menu";
import { useItemDetailCart } from "@/hooks/useItemDetailCart";
import ItemDetailHeader from "./ItemDetailHeader";
import ItemDetailFooter from "./ItemDetailFooter";
import ModifierGroupSection from "./ModifierGroupSection";

interface Props {
  item: MenuItemDetail;
  lang?: "en" | "ar";
}

export default function ItemDetailView({ item, lang = "en" }: Props) {
  const {
    selections,
    toggleModifier,
    totalPrice,
    isMutating,
    hasModifiers,
    addToCart,
  } = useItemDetailCart(item);

  const modGroups = item.modGroups ?? [];

  const backHref = item.menuId
    ? `/explore-menu/${item.menuId}`
    : "/explore-menu";

  return (
    <div className="min-h-screen bg-[#f6efe5] pb-28">
      <div className="mx-auto max-w-3xl px-4 py-6">
        <Link
          href={backHref}
          className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-[#42695a] hover:text-[#F26A21]"
        >
          <ArrowLeft size={18} />
          Back to menu
        </Link>

        <ItemDetailHeader
          item={item}
          lang={lang}
          onAddToCart={addToCart}
          isMutating={isMutating}
        />

        {hasModifiers ? (
          <div className="mt-4 rounded-2xl border border-[#efe8dc] bg-white px-4 shadow-sm">
            {modGroups.map((group, index) => (
              <ModifierGroupSection
                key={group._id}
                group={group}
                lang={lang}
                selections={selections}
                onToggle={toggleModifier}
                scrollable={index === 0 && group.modifiers.length > 4}
              />
            ))}
          </div>
        ) : null}

        {!item.isAvailable ? (
          <p className="mt-4 text-center text-sm font-medium text-red-500">
            This item is currently unavailable.
          </p>
        ) : null}
      </div>

      {item.isAvailable ? (
        <ItemDetailFooter
          totalPrice={totalPrice}
          onAddToCart={addToCart}
          isMutating={isMutating}
        />
      ) : null}
    </div>
  );
}
