"use client";

import { useState, useEffect } from "react";
import { authService } from "@/services/auth.service";
import { toastService } from "@/utils/toast.service";
import { useAppDispatch } from "@/redux/hooks";
import { closeModal, setStep } from "@/redux/slices/authModalSlice";
import { LoginOTPVerificationPayload } from "../auth.interface";
import { attachDeviceID } from "@/hooks/useDeviceId";
import { setCredentials } from "@/redux/slices/authSlice";
import Cookies from "js-cookie";

interface VerifyOtpPayload {
  mobileOtp: string;
  mobileNo: string;
}

export const useOtpVerification = (mobileNo: string) => {
  const dispatch = useAppDispatch();

  const [seconds, setSeconds] = useState(120);

  useEffect(() => {
    if (seconds <= 0) return;

    const interval = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds]);

  const verifyOtp = async (
    mobileOtp: VerifyOtpPayload,
    setSubmitting: (value: boolean) => void,
  ) => {
    try {
      const payload: LoginOTPVerificationPayload = {
        countryCode: "966",
        deviceId: attachDeviceID().toString(),
        deviceToken: "123",
        mobileNo: mobileNo,
        mobileOtp: mobileOtp.mobileOtp,
      };
      const response = await authService.verifyOtp(payload);

      const { accessToken, ...userData } = response.data.data; // ✅ destructure correctly
      Cookies.set("accessToken", accessToken, { expires: 7 ,path: "/" });
      dispatch(
        setCredentials({
          user: userData,
          token: accessToken,
        }),
      );
      toastService.showToast("Login Successful", "success");
      dispatch(setStep("LOGIN"));
      dispatch(closeModal());

      return response;
    } catch (error) {
      console.error(error);

      toastService.showToast("Invalid OTP", "error");

      throw error;
    } finally {
      setSubmitting(false);
    }
  };

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
