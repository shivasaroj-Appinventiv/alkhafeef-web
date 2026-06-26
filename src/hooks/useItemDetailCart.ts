"use client";

import { useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  addMenuItemToCart,
  selectIsCartItemMutating,
} from "@/redux/slices/cartSlice";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import type { MenuItemDetail } from "@/types/menu";
import {
  buildSelectedModGroupsPayload,
  calculateModifierExtraPrice,
  ModifierSelections,
  toggleModifierSelection,
  validateModifierSelections,
} from "@/lib/menu/modifiers";
import { toastService } from "@/utils/toast.service";

export function useItemDetailCart(item: MenuItemDetail) {
  const dispatch = useAppDispatch();
  const { requireAuth } = useRequireAuth();
  const [selections, setSelections] = useState<ModifierSelections>({});
  const isMutating = useAppSelector((state) =>
    selectIsCartItemMutating(state, item._id),
  );
  const modGroups = item.modGroups ?? [];
  const hasModifiers = item.isCustomised && modGroups.length > 0;

  const modifierExtraPrice = useMemo(
    () => calculateModifierExtraPrice(modGroups, selections),
    [modGroups, selections],
  );

  const totalPrice = item.price + modifierExtraPrice;

  const toggleModifier = (groupId: string, modifierId: string) => {
    const group = modGroups.find((entry) => entry._id === groupId);
    if (!group) return;

    setSelections((current) => {
      const next = toggleModifierSelection(current, group, modifierId);
      const currentCount = current[groupId]?.length ?? 0;
      const nextCount = next[groupId]?.length ?? 0;

      if (
        !current[groupId]?.includes(modifierId) &&
        nextCount === currentCount &&
        group.maximum > 1
      ) {
        toastService.showToast(
          `You can select up to ${group.maximum} options`,
          "error",
        );
      }

      return next;
    });
  };

  const addToCart = () => {
    if (!item.isAvailable) {
      toastService.showToast("This item is currently unavailable", "error");
      return;
    }

    if (hasModifiers) {
      const validation = validateModifierSelections(modGroups, selections);
      if (!validation.valid) {
        toastService.showToast(validation.message, "error");
        return;
      }
    }

    requireAuth(async () => {
      try {
        const modGroupsPayload = hasModifiers
          ? buildSelectedModGroupsPayload(modGroups, selections)
          : [];

        await dispatch(
          addMenuItemToCart({ menuItem: item, modGroups: modGroupsPayload }),
        ).unwrap();

        toastService.showToast("Item added to cart", "success");
      } catch (error) {
        console.error(error);
      }
    });
  };

  return {
    selections,
    toggleModifier,
    modifierExtraPrice,
    totalPrice,
    isMutating,
    hasModifiers,
    addToCart,
  };
}
