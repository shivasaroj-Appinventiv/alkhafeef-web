import { buildCartHashId } from "@/lib/cart/cart-payload";
import { wishlistService } from "@/services/wishlist.service";
import type { MenuItem } from "@/types/menu";
import { AddToWishlistPayload, WishlistListApiResponse, WishlistState } from "@/types/wishlist";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState: WishlistState = {
  hashIds: [],
  status: "idle",
  mutatingItemIds: [],
};

export const fetchWishlist = createAsyncThunk(
  "wishlist/fetchWishlist",
  async () => {
    const response = await wishlistService.getWishlist();
    const body = response.data as WishlistListApiResponse;
    return normalizeHashIds(body.data);
  },
);

export const addToWishlist = createAsyncThunk(
  "wishlist/addToWishlist",
  async (menuItem: MenuItem, { dispatch }) => {
    const payload = buildAddRemoveToWishlistPayload(menuItem);
    await wishlistService.addToWishlist(payload);
    await dispatch(fetchWishlist());
  },
);

export const removeFromWishlist = createAsyncThunk(
  "wishlist/removeFromWishlist",
  async (menuItem: MenuItem, { dispatch }) => {
    const payload = buildAddRemoveToWishlistPayload(menuItem);
    await wishlistService.removeFromWishlist(payload);
    await dispatch(fetchWishlist());
  },
);

const mutationThunks = [addToWishlist, removeFromWishlist] as const;

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    clearWishlist(state: WishlistState) {
      state.hashIds = [];
      state.status = "idle";
      state.mutatingItemIds = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWishlist.pending, (state: WishlistState) => {
      state.status = "loading";
    });
    builder.addCase(
      fetchWishlist.fulfilled,
      (state: WishlistState, action: PayloadAction<string[]>) => {
        state.status = "succeeded";
        state.hashIds = normalizeHashIds(action.payload);
      },
    );
    builder.addCase(fetchWishlist.rejected, (state: WishlistState) => {
      state.status = "error";
      state.hashIds = [];
    });

    mutationThunks.forEach((thunk) => {
      builder
        .addCase(thunk.pending, (state, action) => {
          const menuItemId = getMenuItemIdFromThunkArg(action.meta.arg);
          if (menuItemId && !state.mutatingItemIds.includes(menuItemId)) {
            state.mutatingItemIds.push(menuItemId);
          }
        })
        .addCase(thunk.fulfilled, (state, action) => {
          const menuItemId = getMenuItemIdFromThunkArg(action.meta.arg);
          if (menuItemId) {
            state.mutatingItemIds = state.mutatingItemIds.filter(
              (id) => id !== menuItemId,
            );
          }
        })
        .addCase(thunk.rejected, (state, action) => {
          const menuItemId = getMenuItemIdFromThunkArg(action.meta.arg);
          if (menuItemId) {
            state.mutatingItemIds = state.mutatingItemIds.filter(
              (id) => id !== menuItemId,
            );
          }
        });
    });
  },
});

function normalizeHashIds(data: unknown): string[] {
  return Array.isArray(data) ? data : [];
}

function buildAddRemoveToWishlistPayload(
  menuItem: MenuItem,
): AddToWishlistPayload {
  return {
    hashId: buildCartHashId(menuItem.menuId, menuItem.itemId),
    itemId: menuItem._id,
    itemSdmId: menuItem.itemId,
    menuId: menuItem.menuId,
    servicesAvailable: menuItem.servicesAvailable,
  };
}

function getMenuItemIdFromThunkArg(arg: unknown) {
  if (arg && typeof arg === "object" && "_id" in arg) {
    return String((arg as MenuItem)._id);
  }
  return null;
}

export const { clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;

export const selectWishlistHashIds = (state: RootState) =>
  state.wishlist.hashIds;

export const selectIsWishlisted = (state: RootState, menuItem: MenuItem) => {
  const hashId = buildCartHashId(menuItem.menuId, menuItem.itemId);
  const hashIds = state.wishlist.hashIds;
  return Array.isArray(hashIds) && hashIds.includes(hashId);
};

export const selectIsWishlistItemMutating = (
  state: RootState,
  menuItemId: string,
) => state.wishlist.mutatingItemIds.includes(menuItemId);
