"use client";

import { X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { closeModal } from "@/redux/slices/authModalSlice";
import AnimatedDialog from "@/components/common/AnimatedDialog";
import SignupModal from "./signup/SignupModal";
import LoginModal from "./login/LoginModal";
import OtpModal from "./otp/OtpModal";
import EditMobileDialog from "./signup/EditMobileDialog";

export default function AuthModal() {
  const dispatch = useAppDispatch();
  const { isOpen, step, context, profileStep } = useAppSelector(
    (state) => state.authModal,
  );

  const isProfileContext = context === "profile";

  const renderProfileContent = () => {
    if (profileStep === "OTP") return <OtpModal />;
    if (profileStep === "MOBILE") return <EditMobileDialog />;
    return <SignupModal />;
  };

  return (
    <AnimatedDialog
      open={isOpen}
      onClose={() => dispatch(closeModal())}
      backdropClassName="z-[999]"
      panelClassName="relative w-full max-w-md rounded-3xl bg-[#F7F4EA] shadow-xl"
    >
      <button
        type="button"
        onClick={() => dispatch(closeModal())}
        className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full hover:bg-black/5 cursor-pointer"
      >
        <X size={20} />
      </button>

      {isProfileContext ? (
        renderProfileContent()
      ) : (
        <>
          {step === "LOGIN" && <LoginModal />}
          {step === "SIGNUP" && <SignupModal />}
          {step === "OTP" && <OtpModal />}
        </>
      )}
    </AnimatedDialog>
  );
}
