"use client";

import { useAppSelector } from "@/redux/hooks";
import { useOtpVerification } from "./useOtpVerfication";
import { useProfileOtpVerification } from "./useProfileOtpVerification";

export function useOtpModal() {
  const { context, profileStep } = useAppSelector((state) => state.authModal);
  const { authFlow } = useAppSelector((state) => state.auth);

  const isProfileOtp =
    context === "profile" &&
    profileStep === "OTP" &&
    authFlow === "profileEdit";

  const authOtp = useOtpVerification();
  const profileOtp = useProfileOtpVerification();

  if (isProfileOtp) {
    return {
      verifyOtp: profileOtp.verifyOtp,
      resendOtp: profileOtp.resendOtp,
      seconds: profileOtp.seconds,
      otpDestination: profileOtp.otpDestination,
      isPhoneVerification: profileOtp.isPhoneVerification,
      countryCode: profileOtp.countryCode,
      handleEditDetails: profileOtp.handleEditDetails,
      isProfileFlow: true,
    };
  }

  return {
    verifyOtp: authOtp.verifyOtp,
    resendOtp: authOtp.resendOtp,
    seconds: authOtp.seconds,
    otpDestination: authOtp.mobileNo,
    isPhoneVerification: true,
    countryCode: "966",
    handleEditDetails: authOtp.handleEditMobileNo,
    isProfileFlow: false,
  };
}
