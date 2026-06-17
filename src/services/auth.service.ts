import { LoginOTPVerificationPayload, SignupPayload } from "@/components/auth/auth.interface";
import { api } from "@/lib/api/api";
import { API_RSA_PUBLIC_KEY } from "@/lib/api/config";
import { encryptTimestamp } from "@/utils/encryption";

export const authService = {
  async login(payload: {
    mobileNo: string;
    countryCode: string;
    token: string;
  }) {
    const xValidation = await encryptTimestamp(
      API_RSA_PUBLIC_KEY || undefined
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
    const response = await fetch("/api/auth/logout", { method: "POST" });
    if (!response.ok) throw new Error("Logout failed");
    return response;
  },

  async signup(payload: SignupPayload) {
    return api.post("/userOnboard/api/v1/signup", payload);
  },
};
