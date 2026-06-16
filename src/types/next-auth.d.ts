import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: {
      id: string;
      fullName: string;
      email: string;
      isEmailVerified: boolean;
      mobileNo: string;
      countryCode: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    fullName: string;
    email: string;
    emailVerified: Date | null;
    isEmailVerified: boolean;
    mobileNo: string;
    countryCode: string;
    accessToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    user?: {
      id: string;
      fullName: string;
      email: string;
      isEmailVerified: boolean;
      mobileNo: string;
      countryCode: string;
    };
  }
}

export {};
