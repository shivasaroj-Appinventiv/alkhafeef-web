import { toastService } from "@/utils/toast.service";
import axios from "axios";
import Cookies from "js-cookie";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});



api.interceptors.request.use(
  (config) => {
    config.headers["api_key"] = process.env.NEXT_PUBLIC_API_KEY;
    config.headers["language"] = "en";
    config.headers["platform"] = "3";
    config.headers["timezone"] = String(new Date().getTimezoneOffset() * -60 * 1000);

    const token = Cookies.get("accessToken");
    if (token) {
      config.headers["authorization"] = `Bearer ${token}`
    }else{
    config.headers["authorization"] = `Basic ${process.env.NEXT_PUBLIC_BASIC_AUTH}`;

    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error?.response?.data?.message || "Something went wrong";
    toastService.showToast(message, "error");
    if (error?.response?.status === 401) {
      Cookies.remove("accessToken");
    }

    // toast.error(message);

    return Promise.reject(error);
  },
);



