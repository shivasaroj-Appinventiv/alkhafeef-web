import { toastService } from "@/utils/toast.service";
import axios from "axios";
import { getSession, signOut } from "next-auth/react";
import { API_BASE_URL, API_BASIC_AUTH, API_KEY } from "@/lib/api/config";

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    config.headers["api_key"] = API_KEY;
    config.headers["language"] = "en";
    config.headers["platform"] = "3";
    config.headers["timezone"] = String(
      new Date().getTimezoneOffset() * -60 * 1000,
    );

    const existingAuth = config.headers["authorization"];
    if (existingAuth) return config;

    const session = await getSession();
    const token = session?.accessToken;

    if (token) {
      config.headers["authorization"] = `Bearer ${token}`;
    } else {
      config.headers["authorization"] = `Basic ${API_BASIC_AUTH}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const isLogoutRequest = error.config?.url?.includes("/logout");

    if (!isLogoutRequest) {
      const message = error?.response?.data?.message || "Something went wrong";
      toastService.showToast(message, "error");
    }

    if (error?.response?.status === 401 && !isLogoutRequest) {
      await signOut({ redirect: false });
    }

    return Promise.reject(error);
  },
);



