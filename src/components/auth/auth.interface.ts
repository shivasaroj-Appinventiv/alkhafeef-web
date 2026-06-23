export interface LoginPayload {
  phone: string;
}

export interface SignupPayload {
    fullName: string;
    email: string;
    mobileNo: string;
    countryCode: string;
    deviceId: string;
    deviceToken: string;
    token: string;
}

export interface LoginOTPVerificationPayload {
  countryCode: string;
  deviceId: string;
  deviceToken: string;
  mobileNo: string;
  mobileOtp: string;
}

export interface SendOtpPayload {
  mobileNo: string;
  countryCode: string;
  token: string;
}
