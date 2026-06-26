"use client";
import { useAppDispatch } from "@/redux/hooks";
import { openLocationModal } from "@/redux/slices/locationSlice";

export default function OurStoreButton() {
    const dispatch = useAppDispatch();
    const openLocation = () => {
        dispatch(openLocationModal());
      };
  return (
    <a href="#" onClick={openLocation} className="transition hover:text-white">Our Store</a>
  );
}