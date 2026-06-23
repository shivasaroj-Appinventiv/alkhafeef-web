"use client";

import Image from "next/image";
import { ChevronDown, Minus, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useConfirmCartRemoval } from "@/hooks/useConfirmCartRemoval";
import {
  decreaseCartItem,
  increaseCartItem,
  removeCartLine,
  selectIsCartItemMutating,
} from "@/redux/slices/cartSlice";
import type { CartItem } from "@/types/cart";
import type { MenuItem } from "@/types/menu";

function cartLineToMenuItem(cartLine: CartItem): MenuItem {
  const details = cartLine.itemDetails;

  return {
    _id: details._id,
    itemId: details.itemId,
    menuId: details.menuId,
    nameEnglish: details.nameEnglish,
    nameArabic: details.nameArabic,
    titleEnglish: details.nameEnglish,
    titleArabic: details.nameArabic,
    descriptionEnglish: details.descriptionEnglish,
    descriptionArabic: details.descriptionArabic,
    itemImageUrl: details.itemImageUrl,
    mediaType: details.mediaType,
    calories: 0,
    price: details.price,
    isAvailable: details.isAvailable,
    isCustomised: details.isCustomised,
    isOfferExcluded: details.isOfferExcluded,
    isTimeRangeSet: false,
    servicesAvailable: details.servicesAvailable,
    allergicComponent: details.allergicComponent,
    excludeLocations: details.excludeLocations,
    timeRange: [],
    nutritionArabic: "",
    nutritionEnglish: "",
    stampStartDate: 0,
    stampEndDate: 0,
    stampFromTime: 0,
    stampToTime: 0,
  };
}

interface Props {
  cartLine: CartItem;
}

export default function CartLineItem({ cartLine }: Props) {
  const dispatch = useAppDispatch();
  const confirmCartRemoval = useConfirmCartRemoval();
  const menuItem = cartLineToMenuItem(cartLine);
  const isMutating = useAppSelector((state) =>
    selectIsCartItemMutating(state, menuItem._id),
  );
  const [detailsOpen, setDetailsOpen] = useState(false);
  const imageSrc = cartLine.itemDetails.itemImageUrl?.trim();
  const description = cartLine.itemDetails.descriptionEnglish?.trim();

  const handleRemove = () => {
    confirmCartRemoval(
      () => {
        dispatch(removeCartLine(cartLine._id));
      },
      cartLine.itemDetails.nameEnglish,
    );
  };

  return (
    <article className="rounded-2xl border border-[#efe8dc] bg-white p-4 shadow-sm">
      <div className="flex gap-4">
        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-[#f7f2ea]">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={cartLine.itemDetails.nameEnglish}
              fill
              sizes="96px"
              className="object-contain p-2"
            />
          ) : null}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="font-semibold text-[#2d4a3e]">
                {cartLine.itemDetails.nameEnglish}
              </h3>
              <p className="mt-1 font-bold text-[#42695a]">
                SR {cartLine.itemDetails.price}
              </p>
              {cartLine.isCustomised || cartLine.itemDetails.isCustomised ? (
                <button
                  type="button"
                  className="mt-1 text-sm font-semibold text-[#F26A21] cursor-pointer"
                >
                  Customize
                </button>
              ) : null}
            </div>

            <div className="flex shrink-0 items-center gap-1">
              <button
                type="button"
                disabled={isMutating}
                onClick={() =>
                  cartLine.quantity === 1
                    ? handleRemove()
                    : dispatch(decreaseCartItem(menuItem))
                }
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F26A21] text-white disabled:opacity-50 cursor-pointer"
                aria-label={
                  cartLine.quantity === 1 ? "Remove item" : "Decrease quantity"
                }
              >
                {cartLine.quantity === 1 ? (
                  <Trash2 size={16} />
                ) : (
                  <Minus size={16} />
                )}
              </button>
              <span className="w-8 text-center text-sm font-semibold text-[#2d4a3e]">
                {isMutating ? "..." : cartLine.quantity}
              </span>
              <button
                type="button"
                disabled={isMutating || !cartLine.itemDetails.isAvailable}
                onClick={() => dispatch(increaseCartItem(menuItem))}
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F26A21] text-white disabled:opacity-50 cursor-pointer"
                aria-label="Increase quantity"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {description ? (
        <div className="mt-4 border-t border-[#f0ebe3] pt-3">
          <button
            type="button"
            onClick={() => setDetailsOpen((open) => !open)}
            className="flex w-full items-center justify-between text-sm font-semibold text-[#2d4a3e] cursor-pointer"
          >
            Product Details
            <ChevronDown
              size={18}
              className={`text-gray-500 transition-transform ${detailsOpen ? "rotate-180" : ""}`}
            />
          </button>

          {detailsOpen ? (
            <p className="mt-2 text-sm leading-relaxed text-gray-600">
              {description}
            </p>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}
