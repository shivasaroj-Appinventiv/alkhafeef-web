"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  closeModal,
  setProfileStep,
} from "@/redux/slices/authModalSlice";
import { setProfileEditDraft } from "@/redux/slices/authSlice";
import { authService } from "@/services/auth.service";
import { toastService } from "@/utils/toast.service";
import { useRefreshProfileSession } from "@/hooks/useRefreshProfileSession";
import { RootState } from "@/redux/store";
import {
  buildProfileUpdateRequestPayload,
  buildUpdateProfilePayload,
  hasProfileFormChanges,
  requestProfileUpdateOtp,
} from "@/lib/auth/profile-edit";

interface ProfileFormValues {
  name: string;
  email: string;
  phone: string;
}

export function useProfileEdit() {
  const dispatch = useAppDispatch();
  const refreshProfileSession = useRefreshProfileSession();
  const { profilePrefill } = useAppSelector((state: RootState) => state.authModal);

  const initialValues: ProfileFormValues = {
    name: profilePrefill?.fullName ?? "",
    email: profilePrefill?.email ?? "",
    phone: profilePrefill?.mobileNo ?? "",
  };

  const countryCode = profilePrefill?.countryCode ?? "966";
  const originalName = profilePrefill?.fullName ?? "";
  const originalEmail = profilePrefill?.email ?? "";

  const saveNameOnly = async (name: string) => {
    const fullName = name.trim();

    await authService.updateProfile(
      buildUpdateProfilePayload({ fullName }),
    );

    await refreshProfileSession({ fullName });
    dispatch(closeModal());
    toastService.showToast("Profile updated successfully", "success");
  };

  const startEmailOtpFlow = async (values: ProfileFormValues) => {
    const updatePayload = buildProfileUpdateRequestPayload({
      name: values.name,
      email: values.email,
      nameChanged: false,
      emailChanged: true,
    });

    dispatch(
      setProfileEditDraft({
        updatePayload,
        pendingOtpTargets: ["email"],
        currentOtpTarget: "email",
        flow: "email",
      }),
    );

    await requestProfileUpdateOtp(updatePayload);
    toastService.showToast("OTP sent to your email address", "success");
    dispatch(setProfileStep("OTP"));
  };

  const handleSubmit = async (
    values: ProfileFormValues,
    setSubmitting: (isSubmitting: boolean) => void,
  ) => {
    try {
      const { nameChanged, emailChanged } = hasProfileFormChanges({
        name: values.name,
        email: values.email,
        originalName,
        originalEmail,
      });

      if (!nameChanged && !emailChanged) {
        toastService.showToast("No changes to save", "error");
        return;
      }

      if (emailChanged) {
        if (!values.email.trim()) {
          toastService.showToast("Please enter an email address", "error");
          return;
        }

        await startEmailOtpFlow(values);
        return;
      }

      if (nameChanged) {
        await saveNameOnly(values.name);
      }
    } catch (error) {
      console.error(error);
      toastService.showToast(
        error instanceof Error
          ? error.message
          : "Unable to update profile. Please try again.",
        "error",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return {
    initialValues,
    countryCode,
    handleSubmit,
    isEditMode: true,
  };
}
