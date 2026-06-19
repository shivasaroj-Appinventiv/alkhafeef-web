"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  type ReactNode,
} from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

type SecurityTokenContextValue = {
  getSecurityToken: (action: string) => Promise<string | null>;
  isReady: boolean;
};

const SecurityTokenContext = createContext<SecurityTokenContextValue | null>(
  null,
);

export function SecurityTokenContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const executeRecaptchaRef = useRef(executeRecaptcha);
  executeRecaptchaRef.current = executeRecaptcha;

  const getSecurityToken = useCallback(async (action: string) => {
    for (let attempt = 0; attempt < 20; attempt++) {
      const executor = executeRecaptchaRef.current;

      if (executor) {
        return await executor(action);
      }

      await new Promise((resolve) => setTimeout(resolve, 250));
    }

    return null;
  }, []);

  return (
    <SecurityTokenContext.Provider
      value={{
        getSecurityToken,
        isReady: !!executeRecaptcha,
      }}
    >
      {children}
    </SecurityTokenContext.Provider>
  );
}

export function SecurityTokenFallbackProvider({
  children,
}: {
  children: ReactNode;
}) {
  const getSecurityToken = useCallback(async () => null, []);

  return (
    <SecurityTokenContext.Provider
      value={{
        getSecurityToken,
        isReady: false,
      }}
    >
      {children}
    </SecurityTokenContext.Provider>
  );
}

export function useSecurityToken() {
  const context = useContext(SecurityTokenContext);

  if (!context) {
    throw new Error(
      "useSecurityToken must be used within RecaptchaProvider",
    );
  }

  return context;
}
