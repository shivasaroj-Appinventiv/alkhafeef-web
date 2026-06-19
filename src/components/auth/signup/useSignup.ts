import { attachDeviceID } from "@/hooks/useDeviceId";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { authService } from "@/services/auth.service";
import { useSecurityToken } from "@/utils/securityToken";
import { toastService } from "@/utils/toast.service";
import { SignupPayload } from "../auth.interface";
import { resetLoginMobileNo, resetSignupDraft, setSignupDraft } from "@/redux/slices/authSlice";
import { openModal, setStep } from "@/redux/slices/authModalSlice";
import { RootState } from "@/redux/store";

interface SignupValues {
  name: string;
  email: string;
  phone: string;
}

export const useSignup = () => {
  const dispatch = useAppDispatch();
  const { authFlow,signupDraft } = useAppSelector((state:RootState) => state.auth);

  const { getSecurityToken } = useSecurityToken();
  const initialValues: SignupValues = {
    name: signupDraft?.fullName || "",
    email: signupDraft?.email || "",
    phone: signupDraft?.mobileNo || "",
  };

  const handlePhoneChange = (value: string) => {
    let phone = value.replace(/\D/g, "");

    if (phone.length > 0 && phone[0] !== "5") {
      return "";
    }

    return phone.slice(0, 9);
  };

  const handleSubmit = async (
    values: SignupValues,
    setSubmitting: (isSubmitting: boolean) => void,
  ) => {
    try {
      const token = await getSecurityToken("signup");
      if (!token) {
        toastService.showToast(
          "Security verification failed. Please refresh and try again.",
          "error",
        );
        setSubmitting(false);
        return;
      }

      const payload: SignupPayload = {
        fullName: values.name.trim(),
        email: values.email?.trim() || "",
        mobileNo: values.phone,
        countryCode: "966",
        deviceId: attachDeviceID().toString(),
        deviceToken: "123", // replace when FCM is ready
        token,
      };

      const response = await authService.signup(payload);
      console.log(response,'Signup response');
      dispatch(setStep("OTP"));
      // dispatch(openModal());
      dispatch(setSignupDraft({
        fullName: values.name.trim(),
        email: values.email?.trim() || "",
        mobileNo: values.phone,
        countryCode: "966",
      }));
      
    } catch (error) {}
  };

  const handleSignin = () => {
    dispatch(resetLoginMobileNo());
    dispatch(resetSignupDraft())
    dispatch(setStep("LOGIN"));
    };
  return { handleSubmit, initialValues, handlePhoneChange, handleSignin };
};
