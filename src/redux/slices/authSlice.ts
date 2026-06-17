import { createSlice } from "@reduxjs/toolkit";
interface AuthState {
  loginMobileNo: string | null;
  signupDraft: {
    fullName: string;
    email?: string;
    mobileNo: string;
    countryCode: string;
  } | null;
  authFlow: "login" | "signup";
}
const initialState: AuthState = {
  loginMobileNo: null,
  signupDraft: null,
  authFlow: "login",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoginMobileNo(state, action) {
      state.authFlow = "login";
      state.loginMobileNo = action.payload;
    },
    resetLoginMobileNo(state) {
      state.authFlow = "login";
      state.loginMobileNo = null;
    },
    setSignupDraft(state, action) {
      state.authFlow = "signup";
      state.signupDraft = action.payload;
    },
    resetSignupDraft(state) {
      state.authFlow = "signup";
      state.signupDraft = null;
    },
  },
});

export const { setLoginMobileNo, resetLoginMobileNo, setSignupDraft, resetSignupDraft } = authSlice.actions;
export default authSlice.reducer;
