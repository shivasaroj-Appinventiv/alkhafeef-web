"use client";

import { useState, useEffect } from "react";
import { getSession, signIn } from "next-auth/react";
import { authService } from "@/services/auth.service";
import { toastService } from "@/utils/toast.service";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { closeModal, setStep } from "@/redux/slices/authModalSlice";
import { resetLoginMobileNo, resetSignupDraft } from "@/redux/slices/authSlice";
import { attachDeviceID } from "@/hooks/useDeviceId";
import { RootState } from "@/redux/store";
import { fetchCart } from "@/redux/slices/cartSlice";

interface VerifyOtpPayload {
  mobileOtp: string;
  mobileNo: string;
}

export const useOtpVerification = () => {
  const dispatch = useAppDispatch();
  const { authFlow, loginMobileNo, signupDraft } = useAppSelector(
    (state: RootState) => state.auth,
  );
  const mobileNo =
    authFlow === "login" ? loginMobileNo || "" : signupDraft?.mobileNo || "";
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
      if (authFlow === "login") {
        const result = await signIn("otp", {
          redirect: false,
          mobileNo,
          mobileOtp: mobileOtp.mobileOtp,
          countryCode: "966",
          deviceId: attachDeviceID().toString(),
          deviceToken: "123",
        });

        if (result?.error || result?.code === "credentials") {
          toastService.showToast("Invalid OTP", "error");
          return;
        }

        const session = await getSession();
        if (!session?.accessToken) {
          toastService.showToast("Invalid OTP", "error");
          return;
        }

        toastService.showToast("Login Successful", "success");
        dispatch(fetchCart());
        dispatch(resetLoginMobileNo());
        dispatch(setStep("LOGIN"));
        dispatch(closeModal());
      }

      if (authFlow === "signup") {
        const result = await signIn("otp", {
          redirect: false,
          mobileNo,
          mobileOtp: signupDraft?.mobileNo || "",
          countryCode: signupDraft?.countryCode || "966",
          deviceId: attachDeviceID().toString(),
          deviceToken: "123",
        });

        if (result?.error || result?.code === "credentials") {
          toastService.showToast("Invalid OTP", "error");
          return;
        }

        const session = await getSession();
        if (!session?.accessToken) {
          toastService.showToast("Invalid OTP", "error");
          return;
        }

        toastService.showToast("Signup Successful", "success");
        dispatch(resetSignupDraft());
        dispatch(setStep("SIGNUP"));
        dispatch(closeModal());
      }
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
        mobileNo,
        countryCode:
          authFlow === "login" ? "966" : signupDraft?.countryCode || "966",
      });

      toastService.showToast("OTP Resent Successfully", "success");
      setSeconds(120);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditMobileNo = () => {
    if (authFlow === "login") {
      // dispatch(resetLoginMobileNo());
      dispatch(setStep("LOGIN"));
    }
    if (authFlow === "signup") {
      // dispatch(resetSignupDraft());
      dispatch(setStep("SIGNUP"));
    }
  };
  return {
    seconds,
    verifyOtp,
    resendOtp,
    mobileNo,
    handleEditMobileNo,
  };
};
