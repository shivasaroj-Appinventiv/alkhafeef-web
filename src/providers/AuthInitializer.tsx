"use client";
import { useAppDispatch } from "@/redux/hooks";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { authService } from "@/services/auth.service";
import { setCredentials, setUserData } from "@/redux/slices/authSlice";
export default function AuthInitializer() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const initializeAuth = async () => {
      const token = Cookies.get("accessToken");
      console.log("AuthInitializer: token", token);
      if (!token) return;
      try {
        const response = await authService.getUserProfile();
        console.log(response.data.data);
        
        dispatch(setUserData(response.data.data));
      } catch (error) {
        console.error(error);
      }
    };
    initializeAuth();
  }, []);

  return null;
}
