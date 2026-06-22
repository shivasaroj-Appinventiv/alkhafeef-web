import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import authModalSlice from "./slices/authModalSlice";
import globalSlice from "./slices/globalSlice";
import cartSlice from "./slices/cartSlice";
import wishlistSlice from "./slices/wishlistSlice";
import locationSlice from "./slices/locationSlice";
const reducers = combineReducers({
  auth: authSlice,
  authModal: authModalSlice,
  global: globalSlice,
  cart: cartSlice,
  wishlist: wishlistSlice,
  location: locationSlice,

});

const reducerProxy = (state: any, action: any) => {
  return reducers(state, action);
};

export const store = configureStore({
  reducer: reducerProxy,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
