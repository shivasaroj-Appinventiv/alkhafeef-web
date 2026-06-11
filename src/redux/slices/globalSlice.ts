import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface Confirmation {
  open: boolean;
  message: string;
  onConfirm: null | (() => void);
}

type GlobalState = {
  loading: boolean;
  openConfirmationDialog: Confirmation;
};

const initialState: GlobalState = {
  loading: false,
  openConfirmationDialog: {
    open: false,
    message: "",
    onConfirm: null,
  },
};
const globalSlice = createSlice({
  name: "globalSlice",
  initialState: initialState,
  reducers: {
    setLoading(state: GlobalState, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    openDialog(state: GlobalState, action: PayloadAction<Confirmation>) {
      state.openConfirmationDialog.open = true;
      state.openConfirmationDialog.message = action.payload.message;
      state.openConfirmationDialog.onConfirm = action.payload.onConfirm;
    },
    closeDialog(state: GlobalState) {
      state.openConfirmationDialog.open = false;
      state.openConfirmationDialog.message = "";
      state.openConfirmationDialog.onConfirm = null;
    },
  },
});

export const {setLoading, openDialog, closeDialog} = globalSlice.actions;

export default globalSlice.reducer;
