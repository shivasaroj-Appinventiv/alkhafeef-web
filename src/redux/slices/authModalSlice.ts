import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  step: "LOGIN",
};

const authModalSlice = createSlice({
  name: "authModal",
  initialState,

  reducers: {
    openModal(state) {
      state.isOpen = true;
    },

    closeModal(state) {
      state.isOpen = false;
    },

    setStep(state, action) {
      state.step = action.payload;
    },
  },
});

export const { openModal, closeModal, setStep } = authModalSlice.actions;

export default authModalSlice.reducer;
