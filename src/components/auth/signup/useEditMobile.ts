"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setProfileStep } from "@/redux/slices/authModalSlice";
import { setProfileEditDraft } from "@/redux/slices/authSlice";
import { toastService } from "@/utils/toast.service";
import { useSecurityToken } from "@/utils/securityToken";
import { sendProfilePhoneOtp } from "@/lib/auth/profile-edit";
import { RootState } from "@/redux/store";

export function useEditMobile() {
  const dispatch = useAppDispatch();
  const { getSecurityToken } = useSecurityToken();
  const { profilePrefill } = useAppSelector((state: RootState) => state.authModal);

  const countryCode = profilePrefill?.countryCode ?? "966";
  const currentPhone = profilePrefill?.mobileNo ?? "";

  const handlePhoneChange = (value: string) => {
    let phone = value.replace(/\D/g, "");
    if (phone.length > 0 && phone[0] !== "5") {
      return "";
    }
    return phone.slice(0, 9);
  };

  const startMobileVerification = async (
    newPhone: string,
    setSubmitting: (value: boolean) => void,
  ) => {
    try {
      if (!/^5\d{8}$/.test(newPhone)) {
        toastService.showToast("Enter a valid Saudi mobile number", "error");
        return;
      }

      if (newPhone === currentPhone) {
        toastService.showToast("This is already your current number", "error");
        return;
      }

      dispatch(
        setProfileEditDraft({
          updatePayload: {
            mobileNo: newPhone,
            countryCode,
          },
          pendingOtpTargets: ["phone"],
          currentOtpTarget: "phone",
          flow: "mobile",
        }),
      );

      await sendProfilePhoneOtp(newPhone, countryCode, getSecurityToken);
      toastService.showToast("OTP sent to your phone number", "success");
      dispatch(setProfileStep("OTP"));
    } catch (error) {
      console.error(error);
      toastService.showToast(
        error instanceof Error
          ? error.message
          : "Unable to send OTP. Please try again.",
        "error",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return {
    countryCode,
    currentPhone,
    handlePhoneChange,
    startMobileVerification,
  };
}
