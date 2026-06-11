import { LoginOTPVerificationPayload } from "@/components/auth/auth.interface";
import { api } from "@/lib/api/api";
import { encryptTimestamp } from "@/utils/encryption";

export const authService = {
  async login(payload: {
    mobileNo: string;
    countryCode: string;
    token: string;
  }) {
    const xValidation = await encryptTimestamp(
      process.env.NEXT_PUBLIC_RSA_PUBLIC_KEY!,
    );

    return api.post("/userOnboard/api/v1/login", payload, {
      headers: {
        xValidation,
      },
    });
  },

  async verifyOtp(payload: LoginOTPVerificationPayload) {
    return api.post("/userOnboard/api/v1/verifyMobileOtp", payload);
  },

  async resendOtp(payload: { countryCode: string; mobileNo: string }) {
    return api.post("/userOnboard/api/v1/resendOtp", payload);
  },

  async getUserProfile() {
    return api.get("/userOnboard/api/v1/profile");
  },

  async logout() {
    return api.post("/userOnboard/api/v1/logout");
  },
};
