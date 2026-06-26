import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { closeModal } from "./authModalSlice";

export type ProfileOtpTarget = "phone" | "email";

export type ProfileEditFlow = "mobile" | "email";

export interface ProfileEditDraft {
  updatePayload: {
    fullName?: string;
    email?: string;
    mobileNo?: string;
    countryCode?: string;
  };
  mobileOtp?: string;
  pendingOtpTargets: ProfileOtpTarget[];
  currentOtpTarget: ProfileOtpTarget | null;
  flow: ProfileEditFlow;
}

interface AuthState {
  loginMobileNo: string | null;
  signupDraft: {
    fullName: string;
    email?: string;
    mobileNo: string;
    countryCode: string;
  } | null;
  profileEditDraft: ProfileEditDraft | null;
  authFlow: "login" | "signup" | "profileEdit";
}

const initialState: AuthState = {
  loginMobileNo: null,
  signupDraft: null,
  profileEditDraft: null,
  authFlow: "login",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoginMobileNo(state, action: PayloadAction<string>) {
      state.authFlow = "login";
      state.loginMobileNo = action.payload;
    },
    resetLoginMobileNo(state) {
      state.authFlow = "login";
      state.loginMobileNo = null;
    },
    setSignupDraft(
      state,
      action: PayloadAction<{
        fullName: string;
        email?: string;
        mobileNo: string;
        countryCode: string;
      }>,
    ) {
      state.authFlow = "signup";
      state.signupDraft = action.payload;
    },
    resetSignupDraft(state) {
      state.authFlow = "signup";
      state.signupDraft = null;
    },
    setProfileEditDraft(state, action: PayloadAction<ProfileEditDraft>) {
      state.authFlow = "profileEdit";
      state.profileEditDraft = action.payload;
    },
    setProfileCurrentOtpTarget(
      state,
      action: PayloadAction<ProfileOtpTarget | null>,
    ) {
      if (state.profileEditDraft) {
        state.profileEditDraft.currentOtpTarget = action.payload;
      }
    },
    setProfileMobileOtp(state, action: PayloadAction<string>) {
      if (state.profileEditDraft) {
        state.profileEditDraft.mobileOtp = action.payload;
      }
    },
    completeProfileOtpTarget(state, action: PayloadAction<ProfileOtpTarget>) {
      if (!state.profileEditDraft) return;

      state.profileEditDraft.pendingOtpTargets =
        state.profileEditDraft.pendingOtpTargets.filter(
          (target) => target !== action.payload,
        );

      const nextTarget = state.profileEditDraft.pendingOtpTargets[0] ?? null;
      state.profileEditDraft.currentOtpTarget = nextTarget;
    },
    resetProfileEditDraft(state) {
      state.profileEditDraft = null;
      if (state.authFlow === "profileEdit") {
        state.authFlow = "login";
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(closeModal, (state) => {
      state.profileEditDraft = null;
      if (state.authFlow === "profileEdit") {
        state.authFlow = "login";
      }
    });
  },
});

export const {
  setLoginMobileNo,
  resetLoginMobileNo,
  setSignupDraft,
  resetSignupDraft,
  setProfileEditDraft,
  setProfileCurrentOtpTarget,
  setProfileMobileOtp,
  completeProfileOtpTarget,
  resetProfileEditDraft,
} = authSlice.actions;

export default authSlice.reducer;
