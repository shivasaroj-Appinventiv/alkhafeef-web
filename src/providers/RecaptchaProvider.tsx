"use client";

import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { RECAPTCHA_SITE_KEY } from "@/lib/api/config";
import {
  SecurityTokenContextProvider,
  SecurityTokenFallbackProvider,
} from "@/utils/securityToken";

export default function RecaptchaProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!RECAPTCHA_SITE_KEY) {
    return (
      <SecurityTokenFallbackProvider>{children}</SecurityTokenFallbackProvider>
    );
  }

  return (
    <GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_SITE_KEY}>
      <SecurityTokenContextProvider>{children}</SecurityTokenContextProvider>
    </GoogleReCaptchaProvider>
  );
}
