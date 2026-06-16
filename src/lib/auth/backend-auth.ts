import type { AppUser } from "@/types/auth-user";
import type { User } from "next-auth";
import {
  API_BASE_URL,
  API_BASIC_AUTH,
  API_KEY,
} from "@/lib/api/config";

interface OtpCredentials {
  mobileNo?: string;
  mobileOtp?: string;
  countryCode?: string;
  deviceId?: string;
  deviceToken?: string;
}

function buildBackendHeaders(accessToken?: string) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    api_key: API_KEY,
    language: "en",
    platform: "3",
    timezone: String(new Date().getTimezoneOffset() * -60 * 1000),
  };

  if (accessToken) {
    headers.authorization = `Bearer ${accessToken}`;
  } else {
    headers.authorization = `Basic ${API_BASIC_AUTH}`;
  }

  return headers;
}

function mapBackendUser(data: Record<string, unknown>): User {
  return {
    id: String(data.id ?? data._id ?? ""),
    fullName: String(data.fullName ?? ""),
    email: String(data.email ?? ""),
    emailVerified: data.isEmailVerified ? new Date() : null,
    isEmailVerified: Boolean(data.isEmailVerified),
    mobileNo: String(data.mobileNo ?? ""),
    countryCode: String(data.countryCode ?? "966"),
    accessToken: String(data.accessToken ?? ""),
  };
}

export async function verifyOtpOnBackend(
  credentials: OtpCredentials,
): Promise<User | null> {
  const baseUrl = API_BASE_URL;
  if (!credentials.mobileNo || !credentials.mobileOtp) {
    return null;
  }

  const res = await fetch(
    `${baseUrl}/userOnboard/api/v1/verifyMobileOtp`,
    {
      method: "POST",
      headers: buildBackendHeaders(),
      body: JSON.stringify({
        countryCode: credentials.countryCode ?? "966",
        mobileNo: credentials.mobileNo,
        mobileOtp: credentials.mobileOtp,
        deviceId: credentials.deviceId ?? "web",
        deviceToken: credentials.deviceToken ?? "123",
      }),
    },
  );

  if (!res.ok) return null;

  const json = await res.json();
  const data = json?.data;

  if (!data?.accessToken) return null;

  return mapBackendUser(data);
}

export async function fetchUserProfile(
  accessToken: string,
): Promise<User | null> {
  const baseUrl = API_BASE_URL;

  const res = await fetch(`${baseUrl}/userOnboard/api/v1/profile`, {
    headers: buildBackendHeaders(accessToken),
    cache: "no-store",
  });

  if (!res.ok) return null;

  const json = await res.json();
  const data = json?.data;

  if (!data) return null;

  return mapBackendUser({ ...data, accessToken });
}

export async function logoutOnBackend(accessToken: string): Promise<void> {
  const baseUrl = API_BASE_URL;

  await fetch(`${baseUrl}/userOnboard/api/v1/logout`, {
    method: "POST",
    headers: buildBackendHeaders(accessToken),
  });
}
