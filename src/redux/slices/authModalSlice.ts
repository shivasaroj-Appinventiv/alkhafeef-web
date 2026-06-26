import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AuthStep = "LOGIN" | "SIGNUP" | "OTP";
export type ModalContext = "auth" | "profile";
export type ProfileStep = "FORM" | "OTP" | "MOBILE";

export interface ProfilePrefill {
  fullName: string;
  email: string;
  mobileNo: string;
  countryCode: string;
}

interface AuthModalState {
  isOpen: boolean;
  context: ModalContext;
  step: AuthStep;
  profileStep: ProfileStep;
  profilePrefill: ProfilePrefill | null;
}

const initialState: AuthModalState = {
  isOpen: false,
  context: "auth",
  step: "LOGIN",
  profileStep: "FORM",
  profilePrefill: null,
};

const authModalSlice = createSlice({
  name: "authModal",
  initialState,
  reducers: {
    openModal(state) {
      state.isOpen = true;
      state.context = "auth";
      state.profileStep = "FORM";
    },

    openEditProfileModal(state, action: PayloadAction<ProfilePrefill>) {
      state.isOpen = true;
      state.context = "profile";
      state.profileStep = "FORM";
      state.profilePrefill = action.payload;
    },

    closeModal(state) {
      state.isOpen = false;
      state.context = "auth";
      state.step = "LOGIN";
      state.profileStep = "FORM";
      state.profilePrefill = null;
    },

    setStep(state, action: PayloadAction<AuthStep>) {
      state.step = action.payload;
    },

    setProfileStep(state, action: PayloadAction<ProfileStep>) {
      state.profileStep = action.payload;
    },
  },
});

export const {
  openModal,
  openEditProfileModal,
  closeModal,
  setStep,
  setProfileStep,
} = authModalSlice.actions;

export default authModalSlice.reducer;
