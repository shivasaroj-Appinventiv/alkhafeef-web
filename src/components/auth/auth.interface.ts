export interface LoginPayload {
  phone: string;
}

export interface SignupPayload {
  name: string;
  email: string;
  phone: string;
}

export interface LoginOTPVerificationPayload {
  countryCode: string;
  deviceId: string;
  deviceToken: string;
  mobileNo: string;
  mobileOtp: string;
}
