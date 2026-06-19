import { cartService } from "@/services/cart.service";
import {
  buildAddToCartPayload,
  buildRemoveFromCartPayload,
  buildUpdateCartQuantityPayload,
} from "@/lib/cart/cart-payload";
import {
  CartItem,
  CartListApiResponse,
  CartListData,
  CartState,
} from "@/types/cart";
import type { MenuItem } from "@/types/menu";
import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "../store";



const initialState: CartState = {
  items: [],
  couponData: {},
  status: "idle",
  mutatingItemIds: [],
};

export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  const response = await cartService.getCart();
  const body = response.data as CartListApiResponse;
  return body.data;
});

export const addMenuItemToCart = createAsyncThunk(
  "cart/addMenuItemToCart",
  async (menuItem: MenuItem, { getState, dispatch }) => {
    const state = getState() as RootState;
    const existing = selectCartLineByMenuItemId(state, menuItem._id);

    if (existing) {
      await dispatch(increaseCartItem(menuItem));
      return;
    }

    const payload = buildAddToCartPayload(menuItem);
    await cartService.addToCart(payload);
    await dispatch(fetchCart());
  },
);

export const increaseCartItem = createAsyncThunk(
  "cart/increaseCartItem",
  async (menuItem: MenuItem, { getState, dispatch }) => {
    const state = getState() as RootState;
    const existing = selectCartLineByMenuItemId(state, menuItem._id);

    if (!existing) {
      await dispatch(addMenuItemToCart(menuItem));
      return;
    }

    const payload = buildUpdateCartQuantityPayload(existing, true, 1);
    await cartService.updateCartQuantity(payload);
    await dispatch(fetchCart());
  },
);

export const decreaseCartItem = createAsyncThunk(
  "cart/decreaseCartItem",
  async (menuItem: MenuItem, { getState, dispatch }) => {
    const state = getState() as RootState;
    const existing = selectCartLineByMenuItemId(state, menuItem._id);

    if (!existing) return;

    if (existing.quantity <= 1) {
      const payload = buildRemoveFromCartPayload(existing, 1);
      await cartService.removeFromCart(payload);
    } else {
      const payload = buildUpdateCartQuantityPayload(existing, false, 1);
      await cartService.updateCartQuantity(payload);
    }

    await dispatch(fetchCart());
  },
);

export const removeCartLine = createAsyncThunk(
  "cart/removeCartLine",
  async (cartLineId: string, { getState, dispatch }) => {
    const state = getState() as RootState;
    const cartLine = state.cart.items.find((item) => item._id === cartLineId);

    if (!cartLine) {
      return { menuItemId: null };
    }

    const menuItemId = cartLine.itemDetails._id;
    const payload = buildRemoveFromCartPayload(cartLine);
    await cartService.removeFromCart(payload);
    await dispatch(fetchCart());

    return { menuItemId };
  },
);

const mutationThunks = [
  addMenuItemToCart,
  increaseCartItem,
  decreaseCartItem,
] as const;

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart(state: CartState) {
      state.items = [];
      state.couponData = {};
      state.status = "idle";
      state.mutatingItemIds = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCart.pending, (state: CartState) => {
      state.status = "loading";
    });
    builder.addCase(
      fetchCart.fulfilled,
      (state: CartState, action: PayloadAction<CartListData>) => {
        state.status = "succeeded";
        state.items = action.payload.data ?? [];
        state.couponData = action.payload.couponData ?? {};
      },
    );
    builder.addCase(fetchCart.rejected, (state: CartState) => {
      state.status = "error";
      state.items = [];
      state.couponData = {};
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

    builder
      .addCase(removeCartLine.pending, (state, action) => {
        const cartLineId = action.meta.arg as string;
        const cartLine = state.items.find((item) => item._id === cartLineId);
        const menuItemId = cartLine?.itemDetails._id;
        if (menuItemId && !state.mutatingItemIds.includes(menuItemId)) {
          state.mutatingItemIds.push(menuItemId);
        }
      })
      .addCase(removeCartLine.fulfilled, (state, action) => {
        const menuItemId = action.payload?.menuItemId;
        if (menuItemId) {
          state.mutatingItemIds = state.mutatingItemIds.filter(
            (id) => id !== menuItemId,
          );
        }
      })
      .addCase(removeCartLine.rejected, (state, action) => {
        const cartLineId = action.meta.arg as string;
        const cartLine = state.items.find((item) => item._id === cartLineId);
        const menuItemId = cartLine?.itemDetails._id;
        if (menuItemId) {
          state.mutatingItemIds = state.mutatingItemIds.filter(
            (id) => id !== menuItemId,
          );
        }
      });
  },
});

function getMenuItemIdFromThunkArg(arg: unknown) {
  if (typeof arg === "string") return null;
  if (arg && typeof arg === "object" && "_id" in arg) {
    return String((arg as MenuItem)._id);
  }
  return null;
}

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;

export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartCount = (state: RootState) =>
  state.cart.items.reduce((acc, item) => acc + item.quantity, 0);

export const selectCartLineByMenuItemId = (state: RootState, menuItemId: string) =>
  state.cart.items.find(
    (item) =>
      item.itemDetails._id === menuItemId || item.itemId === menuItemId,
  );

export const selectIsCartItemMutating = (
  state: RootState,
  menuItemId: string,
) => state.cart.mutatingItemIds.includes(menuItemId);

export const selectCartSubtotal = (state: RootState) =>
  state.cart.items.reduce(
    (sum, item) => sum + item.itemDetails.price * item.quantity,
    0,
  );
