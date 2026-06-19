import { LoginOTPVerificationPayload, SignupPayload } from "@/components/auth/auth.interface";
import { api } from "@/lib/api/api";
import { API_RSA_PUBLIC_KEY } from "@/lib/api/config";
import { APP_ENDPOINTS, AUTH_ENDPOINTS } from "@/lib/api/endpoints";
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

    return api.post(AUTH_ENDPOINTS.LOGIN, payload, {
      headers: {
        xValidation,
      },
    });
  },

  async verifyOtp(payload: LoginOTPVerificationPayload) {
    return api.post(AUTH_ENDPOINTS.VERIFY_MOBILE_OTP, payload);
  },

  async resendOtp(payload: { countryCode: string; mobileNo: string }) {
    return api.post(AUTH_ENDPOINTS.RESEND_OTP, payload);
  },

  async getUserProfile() {
    return api.get(AUTH_ENDPOINTS.PROFILE);
  },

  async logout() {
    const response = await fetch(APP_ENDPOINTS.AUTH_LOGOUT, { method: "POST" });
    if (!response.ok) throw new Error("Logout failed");
    return response;
  },

  async signup(payload: SignupPayload) {
    return api.post(AUTH_ENDPOINTS.SIGNUP, payload);
  },
};
