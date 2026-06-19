import { User } from "next-auth";
import { getServerBackendConfig } from "../api/config.server";
import { buildServerBackendHeaders } from "../api/server-headers";
import { AUTH_ENDPOINTS } from "../api/endpoints";

interface OtpCredentials {
  mobileNo?: string;
  mobileOtp?: string;
  countryCode?: string;
  deviceId?: string;
  deviceToken?: string;
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
  if (!credentials.mobileNo || !credentials.mobileOtp) return null;

  const { API_BASE_URL } = getServerBackendConfig();
  const res = await fetch(`${API_BASE_URL}${AUTH_ENDPOINTS.VERIFY_MOBILE_OTP}`, {
    method: "POST",
    headers: buildServerBackendHeaders(),
    body: JSON.stringify({
      countryCode: credentials.countryCode ?? "966",
      mobileNo: credentials.mobileNo,
      mobileOtp: credentials.mobileOtp,
      deviceId: credentials.deviceId ?? "web",
      deviceToken: credentials.deviceToken ?? "123",
    }),
  });

  if (!res.ok) return null;
  const json = await res.json();
  const data = json?.data;
  if (!data?.accessToken) return null;
  return mapBackendUser(data);
}

export async function fetchUserProfile(
  accessToken: string,
): Promise<User | null> {
  const { API_BASE_URL } = getServerBackendConfig();
  const res = await fetch(`${API_BASE_URL}${AUTH_ENDPOINTS.PROFILE}`, {
    headers: buildServerBackendHeaders({ accessToken }),
    cache: "no-store",
  });

  if (!res.ok) return null;
  const json = await res.json();
  const data = json?.data;
  if (!data) return null;
  return mapBackendUser({ ...data, accessToken });
}

export async function logoutOnBackend(accessToken: string): Promise<void> {
  const { API_BASE_URL } = getServerBackendConfig();
  await fetch(`${API_BASE_URL}${AUTH_ENDPOINTS.LOGOUT}`, {
    method: "POST",
    headers: buildServerBackendHeaders({ accessToken }),
  });
}
