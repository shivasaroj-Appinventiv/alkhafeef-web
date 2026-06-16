"use client";

import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

export default function RecaptchaProvider({
  children,
}: {
  children: React.ReactNode;
}) {
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