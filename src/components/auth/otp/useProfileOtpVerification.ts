"use client";

import { useState, useEffect } from "react";
import { useRefreshProfileSession } from "@/hooks/useRefreshProfileSession";
import { authService } from "@/services/auth.service";
import { toastService } from "@/utils/toast.service";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  closeModal,
  setProfileStep,
} from "@/redux/slices/authModalSlice";
import { resetProfileEditDraft, setProfileMobileOtp } from "@/redux/slices/authSlice";
import { RootState } from "@/redux/store";
import { useSecurityToken } from "@/utils/securityToken";
import {
  buildUpdateProfilePayload,
  normalizeEmail,
  requestProfileUpdateOtp,
  sendProfilePhoneOtp,
} from "@/lib/auth/profile-edit";

interface VerifyOtpPayload {
  mobileOtp: string;
}

export function useProfileOtpVerification() {
  const dispatch = useAppDispatch();
  const refreshProfileSession = useRefreshProfileSession();
  const { getSecurityToken } = useSecurityToken();
  const { profileEditDraft } = useAppSelector((state: RootState) => state.auth);
  const [seconds, setSeconds] = useState(120);

  const isPhoneVerification = profileEditDraft?.flow === "mobile";
  const isEmailVerification = profileEditDraft?.flow === "email";

  const otpDestination = isPhoneVerification
    ? profileEditDraft?.updatePayload.mobileNo ?? ""
    : profileEditDraft?.updatePayload.email ?? "";

  const countryCode = profileEditDraft?.updatePayload.countryCode ?? "966";

  useEffect(() => {
    setSeconds(120);
  }, [profileEditDraft?.flow, otpDestination]);

  useEffect(() => {
    if (seconds <= 0) return;

    const interval = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds]);

  const finalizeProfileUpdate = async (emailOtp?: string) => {
    if (!profileEditDraft) return;

    await authService.updateProfile(
      buildUpdateProfilePayload(profileEditDraft.updatePayload, {
        mobileOtp: profileEditDraft.mobileOtp,
        emailOtp,
      }),
    );

    const { fullName, email, mobileNo, countryCode } =
      profileEditDraft.updatePayload;

    await refreshProfileSession({
      ...(fullName !== undefined && { fullName }),
      ...(email !== undefined && { email }),
      ...(mobileNo !== undefined && { mobileNo }),
      ...(countryCode !== undefined && { countryCode }),
    });
    dispatch(resetProfileEditDraft());
    dispatch(closeModal());
    toastService.showToast("Profile updated successfully", "success");
  };

  const verifyOtp = async (
    payload: VerifyOtpPayload,
    setSubmitting: (value: boolean) => void,
  ) => {
    try {
      if (!profileEditDraft) {
        toastService.showToast("Profile session expired. Please try again.", "error");
        dispatch(setProfileStep("FORM"));
        return;
      }

      if (isPhoneVerification) {
        const mobileNo = profileEditDraft.updatePayload.mobileNo;
        if (!mobileNo) return;

        await authService.verifyProfileMobileOtp({
          mobileNo,
          countryCode,
          mobileOtp: payload.mobileOtp,
        });

        dispatch(setProfileMobileOtp(payload.mobileOtp));
        await finalizeProfileUpdate();
        return;
      }

      if (isEmailVerification) {
        const email = profileEditDraft.updatePayload.email;
        if (!email) return;

        await authService.verifyEmailOtp({
          email: normalizeEmail(email),
          emailOtp: payload.mobileOtp,
        });

        await finalizeProfileUpdate(payload.mobileOtp);
      }
    } catch (error) {
      console.error(error);
      toastService.showToast("Invalid OTP", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const resendOtp = async () => {
    try {
      if (!profileEditDraft) return;

      if (isPhoneVerification && profileEditDraft.updatePayload.mobileNo) {
        await sendProfilePhoneOtp(
          profileEditDraft.updatePayload.mobileNo,
          countryCode,
          getSecurityToken,
        );
      } else if (isEmailVerification && profileEditDraft.updatePayload.email) {
        await requestProfileUpdateOtp(profileEditDraft.updatePayload);
      }

      toastService.showToast("OTP resent successfully", "success");
      setSeconds(120);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditDetails = () => {
    if (isPhoneVerification) {
      dispatch(setProfileStep("MOBILE"));
      return;
    }

    dispatch(setProfileStep("FORM"));
  };

  return {
    seconds,
    verifyOtp,
    resendOtp,
    otpDestination,
    isPhoneVerification,
    countryCode,
    handleEditDetails,
  };
}
