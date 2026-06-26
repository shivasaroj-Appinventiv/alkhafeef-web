import {
  LoginOTPVerificationPayload,
  SendEmailOtpPayload,
  SendOtpPayload,
  SignupPayload,
  UpdateProfilePayload,
  VerifyEmailOtpPayload,
  VerifyProfileMobileOtpPayload,
} from "@/components/auth/auth.interface";
import { api, type ApiRequestConfig } from "@/lib/api/api";
import { API_RSA_PUBLIC_KEY } from "@/lib/api/config";
import { APP_ENDPOINTS, AUTH_ENDPOINTS } from "@/lib/api/endpoints";
import { encryptTimestamp } from "@/utils/encryption";

export const authService = {
  async buildAuthRequestConfig() {
    const xValidation = await encryptTimestamp(
      API_RSA_PUBLIC_KEY || undefined
    );

    return {
      useBasicAuth: true,
      headers: {
        xValidation,
      },
    } as ApiRequestConfig;
  },

  async login(payload: {
    mobileNo: string;
    countryCode: string;
    token: string;
  }) {
    return api.post(
      AUTH_ENDPOINTS.LOGIN,
      payload,
      await this.buildAuthRequestConfig()
    );
  },

  async verifyOtp(payload: LoginOTPVerificationPayload) {
    return api.post(AUTH_ENDPOINTS.VERIFY_MOBILE_OTP, payload);
  },

  async sendOtp(payload: SendOtpPayload) {
    return api.post(
      AUTH_ENDPOINTS.SEND_OTP,
      payload,
      await this.buildAuthRequestConfig()
    );
  },

  async sendEmailOtp(payload: SendEmailOtpPayload) {
    return api.post(
      AUTH_ENDPOINTS.SEND_EMAIL_OTP,
      payload,
      await this.buildAuthRequestConfig()
    );
  },

  async verifyEmailOtp(payload: VerifyEmailOtpPayload) {
    return api.post(AUTH_ENDPOINTS.VERIFY_EMAIL_OTP, payload);
  },

  async verifyProfileMobileOtp(payload: VerifyProfileMobileOtpPayload) {
    return api.post(AUTH_ENDPOINTS.VERIFY_MOBILE_OTP, payload);
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
    return api.post(
      AUTH_ENDPOINTS.SIGNUP,
      payload,
      await this.buildAuthRequestConfig()
    );
  },

  async updateProfile(payload: UpdateProfilePayload) {
    return api.put(AUTH_ENDPOINTS.UPDATE_PROFILE, payload);
  },
};
