import { cartService } from "@/services/cart.service";
import { CartItem, CartListApiResponse, CartListData } from "@/types/cart";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface CartState {
  items: CartItem[];
  couponData: Record<string, unknown>;
  status: "idle" | "loading" | "succeeded" | "error";
}

const initialState: CartState = {
  items: [],
  couponData: {},
  status: "idle",
};

export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  const response = await cartService.getCart();
  const body = response.data as CartListApiResponse;
  return body.data;
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart(state: CartState) {
      state.items = [];
      state.couponData = {};
      state.status = "idle";
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
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;

export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartCount = (state: RootState) =>
  state.cart.items.reduce((acc, item) => acc + item.quantity, 0);
