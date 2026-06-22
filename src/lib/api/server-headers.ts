import { getServerBackendConfig } from "@/lib/api/config.server";

interface BuildServerBackendHeadersOptions {
  accessToken?: string;
  forwardHeaders?: Headers;
}

export function buildServerBackendHeaders(
  options: BuildServerBackendHeadersOptions = {},
) {
  const { API_KEY, API_BASIC_AUTH } = getServerBackendConfig();
  const { accessToken, forwardHeaders } = options;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
    api_key: API_KEY,
    language: forwardHeaders?.get("language") ?? "en",
    platform: forwardHeaders?.get("platform") ?? "3",
    timezone:
      forwardHeaders?.get("timezone") ??
      String(new Date().getTimezoneOffset() * -60 * 1000),
  };

  const forwardedAuth = forwardHeaders?.get("authorization");
  const useBasicAuth = forwardHeaders?.get("x-use-basic-auth") === "true";

  if (useBasicAuth) {
    headers.authorization = `Basic ${API_BASIC_AUTH}`;
  } else if (forwardedAuth?.startsWith("Bearer ")) {
    headers.authorization = forwardedAuth;
  } else if (accessToken) {
    headers.authorization = `Bearer ${accessToken}`;
  } else {
    headers.authorization = `Basic ${API_BASIC_AUTH}`;
  }

  const xValidation =
    forwardHeaders?.get("xvalidation") ?? forwardHeaders?.get("xValidation");
  if (xValidation) {
    headers.xValidation = xValidation;
  }

  return headers;
}
