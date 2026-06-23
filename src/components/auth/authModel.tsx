"use client";

import { X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { closeModal } from "@/redux/slices/authModalSlice";
import SignupModal from "./signup/SignupModal";
import LoginModal from "./login/LoginModal";
import OtpModal from "./otp/OtpModal";

export default function AuthModal() {
  const dispatch = useAppDispatch();
  const { isOpen, step } = useAppSelector((state) => state.authModal);
  if (!isOpen) return null;

  return (
    <div className="dialog-backdrop z-[999]">
      <div className="relative w-full max-w-md rounded-3xl bg-[#F7F4EA] shadow-xl">
        <button
          type="button"
          onClick={() => dispatch(closeModal())}
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full hover:bg-black/5 cursor-pointer"
        >
          <X size={20} />
        </button>

        {step === "LOGIN" && <LoginModal />}

        {step === "SIGNUP" && <SignupModal />}

        {step === "OTP" && (
          <OtpModal />
        )}
      </div>
    </div>
  );
}