"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setStep } from "@/redux/slices/authModalSlice";
import { resetLoginMobileNo, resetSignupDraft, setLoginMobileNo, setSignupDraft } from "@/redux/slices/authSlice";
import { RootState } from "@/redux/store";
import { authService } from "@/services/auth.service";
import { useSecurityToken } from "@/utils/securityToken";
import { toastService } from "@/utils/toast.service";

interface LoginPayload {
  phone: string;
}

interface LoginValues {
  phone: string;
}

export function useLogin() {
  const { getSecurityToken } = useSecurityToken();
  const dispatch = useAppDispatch();
  const { authFlow,loginMobileNo } = useAppSelector((state:RootState) => state.auth);
  const initialValues: LoginValues = {
    phone: loginMobileNo || "",
  };

  const handlePhoneChange = (value: string) => {
    // Only numbers
    let phone = value.replace(/\D/g, "");

    // First digit must be 5
    if (phone.length > 0 && phone[0] !== "5") {
      return "";
    }

    // Maximum 9 digits
    return phone.slice(0, 9);
  };
  const login = async (
    values: LoginPayload,
    setSubmitting: (isSubmitting: boolean) => void,
  ) => {
    try {
      const token = await getSecurityToken("login");

      if (!token) {
        toastService.showToast(
          "Security verification failed. Please refresh and try again.",
          "error",
        );

        return;
      }

      const response = await authService.login({
        countryCode: "966",
        mobileNo: values.phone,
        token,
      });

      toastService.showToast(
        "OTP sent successfully! Please check your phone.",
        "success",
      );
      dispatch(setLoginMobileNo(values.phone)); // ✅ add this
      dispatch(setStep("OTP"));

      return response;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setSubmitting(false);
    }
  };

  const handleSignup = () => {
    dispatch(resetLoginMobileNo());
    dispatch(resetSignupDraft())
    dispatch(setStep("SIGNUP"));
    };

  return {
    login,
    dispatch,
    initialValues,
    handlePhoneChange,
    loginMobileNo,
    handleSignup
  };
}
