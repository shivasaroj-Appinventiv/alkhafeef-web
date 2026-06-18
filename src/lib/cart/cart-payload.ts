import type {
  AddToCartPayload,
  CartItem,
  RemoveFromCartPayload,
  UpdateCartQuantityPayload,
} from "@/types/cart";
import type { MenuItem } from "@/types/menu";
import { md5 } from "@/utils/md5";

export function buildCartHashId(
  menuId: string,
  itemSdmId: number,
  modGroups: unknown[] = [],
) {
  const raw = `${menuId}_${itemSdmId}_${JSON.stringify(modGroups)}`;
  return md5(raw);
}

export function buildAddToCartPayload(
  menuItem: MenuItem,
  existingCartLine?: CartItem,
  modGroups: unknown[] = [],
): AddToCartPayload {
  const hashId =
    existingCartLine?.hashId ??
    buildCartHashId(menuItem.menuId, menuItem.itemId, modGroups);

  return {
    itemId: menuItem._id,
    menuId: menuItem.menuId,
    hashId,
    itemSdmId: menuItem.itemId,
    quantity: 1,
    servicesAvailable: menuItem.servicesAvailable || "pickup",
    modGroups: existingCartLine?.modGroups ?? modGroups,
    offerdItem: false,
  };
}

export function buildUpdateCartQuantityPayload(
  cartLine: CartItem,
  isIncrement: boolean,
  quantity = 1,
): UpdateCartQuantityPayload {
  return {
    hashId: cartLine.hashId,
    isIncrement,
    itemId: cartLine.itemId,
    quantity,
  };
}

export function buildRemoveFromCartPayload(
  cartLine: CartItem,
  quantity = cartLine.quantity,
): RemoveFromCartPayload {
  return {
    hashId: cartLine.hashId,
    itemId: cartLine.itemId,
    quantity,
    offerdItem: cartLine.offeredItem ?? false,
  };
}
