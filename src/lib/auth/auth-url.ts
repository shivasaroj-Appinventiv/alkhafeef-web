const AUTH_CALLBACK_KEY = "authCallbackUrl";

export function saveAuthCallbackUrl(callbackUrl: string) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(AUTH_CALLBACK_KEY, callbackUrl);
}

export function consumeAuthCallbackUrl(): string {
  if (typeof window === "undefined") return "/";

  const callbackUrl = sessionStorage.getItem(AUTH_CALLBACK_KEY);
  sessionStorage.removeItem(AUTH_CALLBACK_KEY);
  return callbackUrl || "/";
}

export function clearAuthCallbackUrl() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(AUTH_CALLBACK_KEY);
}
