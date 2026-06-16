import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  loginMobileNo: string | null;
}

const initialState: AuthState = {
  loginMobileNo: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoginMobileNo(state, action) {
      state.loginMobileNo = action.payload;
    },

    resetLoginMobileNo(state) {
      state.loginMobileNo = null;
    },
  },
});

export const { setLoginMobileNo, resetLoginMobileNo } = authSlice.actions;

export default authSlice.reducer;
