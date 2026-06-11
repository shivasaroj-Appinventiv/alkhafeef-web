"use client";

import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

export function useSecurityToken() {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const getSecurityToken = async (
    action: string
  ) => {
    if (!executeRecaptcha) {
      return null;
    }

    return await executeRecaptcha(action);
  };

  return {
    getSecurityToken,
    isReady: !!executeRecaptcha,
  };
}