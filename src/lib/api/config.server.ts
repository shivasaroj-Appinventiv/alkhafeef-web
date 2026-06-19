/**
 * Server-only API configuration. Never import this file from Client Components.
 * Use env vars WITHOUT the NEXT_PUBLIC_ prefix so they stay off the client bundle.
 */

function requireEnv(name: string, fallback?: string): string {
  const value = process.env[name] ?? fallback;
  if (!value) {
    throw new Error(`Missing required server environment variable: ${name}`);
  }
  return value;
}

export function getServerBackendConfig() {
  return {
    API_BASE_URL: requireEnv(
      "API_BASE_URL",
      process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://api-dev.alkhafeef.com.sa",
    ),
    API_KEY: requireEnv("API_KEY", "123456"),
    API_BASIC_AUTH: requireEnv(
      "API_BASIC_AUTH",
      "QWxraGFmZWVmOkFsa2hhZmVlZkAxMjM=",
    ),
  };
}

export function getServerRsaPublicKey() {
  return process.env.API_RSA_PUBLIC_KEY ?? "";
}
