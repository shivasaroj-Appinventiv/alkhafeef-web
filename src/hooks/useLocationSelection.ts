"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  openLocationModal,
  selectSelectedServiceLabel,
  selectSelectedStoreName,
} from "@/redux/slices/locationSlice";

export function useLocationSelection() {
  const dispatch = useAppDispatch();
  const selectedStoreName = useAppSelector(selectSelectedStoreName);
  const selectedServiceLabel = useAppSelector(selectSelectedServiceLabel);
  const selectedLocation = useAppSelector(
    (state) => state.location.selectedLocation,
  );
  const hasAddress = Boolean(selectedStoreName);
  const bannerText = hasAddress
    ? `${selectedServiceLabel} At: ${selectedStoreName}`
    : "Select your store to start order";
  const buttonLabel = hasAddress ? "Change Address" : "Select Address";

  const openLocation = () => {
    dispatch(openLocationModal());
  };
  return {
    selectedLocation,
    bannerText,
    buttonLabel,
    hasAddress,
    openLocation,
  };
}
