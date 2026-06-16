"use client";

import { useState, useEffect } from "react";
import { authService } from "@/services/auth.service";
import { toastService } from "@/utils/toast.service";
import { useAppDispatch } from "@/redux/hooks";
import { closeModal, setStep } from "@/redux/slices/authModalSlice";
import { LoginOTPVerificationPayload } from "../auth.interface";
import { attachDeviceID } from "@/hooks/useDeviceId";
import { resetLoginMobileNo } from "@/redux/slices/authSlice";
import { signIn } from "next-auth/react";

interface VerifyOtpPayload {
  mobileOtp: string;
  mobileNo: string;
}

export const useOtpVerification = async(mobileNo: string) => {
  const dispatch = useAppDispatch();

  const [seconds, setSeconds] = useState(120);

  useEffect(() => {
    if (seconds <= 0) return;

    const interval = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds]);

  const result = await signIn("otp", {
    redirect: false,
    mobileNo,
    mobileOtp: mobileOtp.mobileOtp,
    countryCode: "966",
    deviceId: attachDeviceID().toString(),
    deviceToken: "123",
  });
  if (result?.error) {
    toastService.showToast("Invalid OTP", "error");
    return;
  }
  toastService.showToast("Login Successful", "success");
  dispatch(resetLoginMobileNo());
  dispatch(setStep("LOGIN"));
  dispatch(closeModal());

  const resendOtp = async () => {
    try {
      await authService.resendOtp({
        countryCode: "966",
        mobileNo,
      });

      toastService.showToast("OTP Resent Successfully", "success");

      setSeconds(120);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    seconds,
    verifyOtp,
    resendOtp,
  };
};
