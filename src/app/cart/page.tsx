"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useConfirmCartRemoval } from "@/hooks/useConfirmCartRemoval";
import {
  decreaseCartItem,
  fetchCart,
  increaseCartItem,
  removeCartLine,
  selectCartCount,
  selectCartItems,
  selectCartSubtotal,
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

function CartLineItem({ cartLine }: { cartLine: CartItem }) {
  const dispatch = useAppDispatch();
  const confirmCartRemoval = useConfirmCartRemoval();
  const menuItem = cartLineToMenuItem(cartLine);
  const isMutating = useAppSelector((state) =>
    selectIsCartItemMutating(state, menuItem._id),
  );
  const imageSrc = cartLine.itemDetails.itemImageUrl?.trim();

  const handleRemove = () => {
    confirmCartRemoval(
      () => {
        dispatch(removeCartLine(cartLine._id));
      },
      cartLine.itemDetails.nameEnglish,
    );
  };

  return (
    <article className="flex gap-4 rounded-2xl border border-[#efe8dc] bg-white p-4">
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

      <div className="flex min-w-0 flex-1 flex-col justify-between">
        <div>
          <p className="text-xs text-gray-500">{cartLine.menu.titleEnglish}</p>
          <h3 className="font-semibold text-[#42695a]">
            {cartLine.itemDetails.nameEnglish}
          </h3>
          <p className="mt-1 font-bold text-[#42695a]">
            SR {cartLine.itemDetails.price}
          </p>
        </div>

        <div className="mt-3 flex items-center justify-between gap-3">
          <div className="flex items-center overflow-hidden rounded-full border border-[#d9cdbd]">
            <button
              type="button"
              disabled={isMutating}
              onClick={() =>
                cartLine.quantity === 1
                  ? handleRemove()
                  : dispatch(decreaseCartItem(menuItem))
              }
              className="flex h-9 w-9 items-center justify-center text-[#F26A21] hover:bg-orange-50 disabled:opacity-50 cursor-pointer"
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
            <span className="w-8 text-center text-sm font-semibold">
              {isMutating ? "..." : cartLine.quantity}
            </span>
            <button
              type="button"
              disabled={isMutating}
              onClick={() => dispatch(increaseCartItem(menuItem))}
              className="flex h-9 w-9 items-center justify-center bg-[#F26A21] text-white disabled:opacity-50 cursor-pointer"
              aria-label="Increase quantity"
            >
              <Plus size={16} />
            </button>
          </div>

          {cartLine.quantity > 1 ? (
            <button
              type="button"
              disabled={isMutating}
              onClick={handleRemove}
              className="flex h-9 w-9 items-center justify-center rounded-full text-red-500 hover:bg-red-50 disabled:opacity-50"
              aria-label="Remove item"
            >
              <Trash2 size={16} />
            </button>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export default function CartPage() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const itemCount = useAppSelector(selectCartCount);
  const subtotal = useAppSelector(selectCartSubtotal);
  const status = useAppSelector((state) => state.cart.status);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  if (status === "loading" && items.length === 0) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10">
        <p className="text-center text-gray-600">Loading your cart...</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-[#42695a]">Your cart is empty</h1>
        <p className="mt-2 text-gray-600">
          Browse the menu and add items to get started.
        </p>
        <Link
          href="/explore-menu"
          className="mt-6 inline-flex rounded-full bg-[#F26A21] px-6 py-3 text-sm font-semibold text-white"
        >
          Explore Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#42695a]">Cart</h1>
          <p className="mt-1 text-sm text-gray-600">
            {itemCount} item{itemCount === 1 ? "" : "s"}
          </p>
        </div>
        <p className="text-lg font-bold text-[#42695a]">SR {subtotal.toFixed(2)}</p>
      </div>

      <div className="space-y-4">
        {items.map((cartLine) => (
          <CartLineItem key={cartLine._id} cartLine={cartLine} />
        ))}
      </div>
    </div>
  );
}
