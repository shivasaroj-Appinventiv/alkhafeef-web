import { toastService } from "@/utils/toast.service";
import axios, { type InternalAxiosRequestConfig } from "axios";
import { getSession, signOut } from "next-auth/react";
import { CLIENT_API_BASE_URL } from "@/lib/api/config";

export interface ApiRequestConfig extends InternalAxiosRequestConfig {
  skipSignOutOn401?: boolean;
  skipErrorToast?: boolean;
  useBasicAuth?: boolean;
}

export const api = axios.create({
  baseURL: CLIENT_API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config: ApiRequestConfig) => {
    config.headers["language"] = "en";
    config.headers["platform"] = "3";
    config.headers["timezone"] = String(
      new Date().getTimezoneOffset() * -60 * 1000,
    );

    const session = await getSession();
    const token = session?.accessToken;

    if (config.useBasicAuth) {
      config.headers["x-use-basic-auth"] = "true";
    } else if (token) {
      config.headers["authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

function isSessionInvalidError(status?: number, data?: { type?: string }) {
  if (status !== 401) return false;

  const type = data?.type;
  return (
    type === "TOKEN_EXPIRED" ||
    type === "INVALID_TOKEN" ||
    type === "SESSION_EXPIRED" ||
    type === "UNAUTHORIZED"
  );
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config as ApiRequestConfig | undefined;
    const isLogoutRequest = config?.url?.includes("/logout");
    const skipErrorToast = config?.skipErrorToast ?? false;
    const skipSignOut = config?.skipSignOutOn401 ?? false;

    if (!isLogoutRequest && !skipErrorToast) {
      const message = error?.response?.data?.message || "Something went wrong";
      toastService.showToast(message, "error");
    }

    const shouldSignOut =
      !isLogoutRequest &&
      !skipSignOut &&
      isSessionInvalidError(error?.response?.status, error?.response?.data);

    if (shouldSignOut) {
      await signOut({ redirect: false });
    }

    return Promise.reject(error);
  },
);
