"use client";

import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

export default function RecaptchaProvider({
  children,
}: {
  children: React.ReactNode;
}) {
    console.log("NEXT_PUBLIC_RECAPTCHA_SITE_KEY",process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY);
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={
        '6LfUe3AoAAAAAPAZ97jNhkEjXSvUipLsw2ZFFqXI'
      }
    >
      {children}
    </GoogleReCaptchaProvider>
  );
}