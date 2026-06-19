"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import ConfirmationDialog from "./ConfirmationDialog";
import { closeDialog } from "@/redux/slices/globalSlice";

export default function GLobalDialogs() {
  const dispatch = useAppDispatch();
  const { message, onConfirm, open } = useAppSelector(
    (state) => state.global.openConfirmationDialog,
  );

  if (!open) return null;

  const handleConfirm = async () => {
    if (!onConfirm) return;
    await onConfirm();
    dispatch(closeDialog());
  };

  const handleCancel = () => {
    dispatch(closeDialog());
  };

  return (
    <ConfirmationDialog
      message={message}
      onConfirm={handleConfirm}
      onCancel={handleCancel}
    />
  );
}
