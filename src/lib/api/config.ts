/**
 * Client-safe configuration only.
 * Secrets (API_KEY, API_BASIC_AUTH) are injected server-side via /api/backend proxy.
 */

import { APP_ENDPOINTS } from "@/lib/api/endpoints";

/** Same-origin proxy — forwards to the backend with server-injected credentials */
export const CLIENT_API_BASE_URL = APP_ENDPOINTS.BACKEND_PROXY;

/** RSA public keys are safe to expose in the browser */
export const API_RSA_PUBLIC_KEY =
  process.env.NEXT_PUBLIC_RSA_PUBLIC_KEY ?? "";

/** reCAPTCHA site keys are public by design */
export const RECAPTCHA_SITE_KEY =
  process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "";
