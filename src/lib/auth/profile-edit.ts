import type { ProfileEditDraft } from "@/redux/slices/authSlice";
import type { UpdateProfilePayload } from "@/components/auth/auth.interface";

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function isEmailChanged(email: string, originalEmail: string) {
  return normalizeEmail(email) !== normalizeEmail(originalEmail);
}

export function buildUpdateProfilePayload(
  updatePayload: ProfileEditDraft["updatePayload"],
  options?: { mobileOtp?: string; emailOtp?: string },
) {
  const payload: UpdateProfilePayload = { ...updatePayload };

  if (options?.mobileOtp) {
    payload.mobileOtp = options.mobileOtp;
  }

  if (options?.emailOtp) {
    payload.emailOtp = options.emailOtp;
  }

  return payload;
}

export function hasProfileFormChanges({
  name,
  email,
  originalName,
  originalEmail,
}: {
  name: string;
  email: string;
  originalName: string;
  originalEmail: string;
}) {
  const nameChanged = name.trim() !== originalName.trim();
  const emailChanged = normalizeEmail(email) !== normalizeEmail(originalEmail);
  return { nameChanged, emailChanged };
}

export async function sendProfilePhoneOtp(
  mobileNo: string,
  countryCode: string,
  getSecurityToken: (action: string) => Promise<string | null>,
) {
  const { authService } = await import("@/services/auth.service");
  const token = await getSecurityToken("profile");
  if (!token) {
    throw new Error("Security verification failed. Please refresh and try again.");
  }

  await authService.sendOtp({
    mobileNo,
    countryCode,
    token,
  });
}

export function buildProfileUpdateRequestPayload({
  name,
  email,
  nameChanged,
  emailChanged,
}: {
  name: string;
  email: string;
  nameChanged: boolean;
  emailChanged: boolean;
}) {
  if (emailChanged) {
    return {
      fullName: name.trim(),
      email: normalizeEmail(email),
    };
  }

  if (nameChanged) {
    return { fullName: name.trim() };
  }

  return {};
}

export async function requestProfileUpdateOtp(
  updatePayload: ProfileEditDraft["updatePayload"],
) {
  const { authService } = await import("@/services/auth.service");
  await authService.updateProfile(buildUpdateProfilePayload(updatePayload));
}
