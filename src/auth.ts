import type { AppUser } from "@/types/auth-user";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { NextResponse } from "next/server";
import type { NextAuthConfig } from "next-auth";
import {
  fetchUserProfile,
  verifyOtpOnBackend,
} from "@/lib/auth/backend-auth";
import { isPrivateRoute } from "./lib/auth/route";

export const authConfig = {
  providers: [
    Credentials({
      id: "otp",
      name: "Mobile OTP",
      credentials: {
        mobileNo: { label: "Mobile", type: "text" },
        mobileOtp: { label: "OTP", type: "text" },
        countryCode: { label: "Country", type: "text" },
        deviceId: { label: "Device", type: "text" },
        deviceToken: { label: "Device Token", type: "text" },
      },
      async authorize(credentials) {
        return verifyOtpOnBackend({
          mobileNo: credentials?.mobileNo as string | undefined,
          mobileOtp: credentials?.mobileOtp as string | undefined,
          countryCode: credentials?.countryCode as string | undefined,
          deviceId: credentials?.deviceId as string | undefined,
          deviceToken: credentials?.deviceToken as string | undefined,
        });
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60,
  },
  pages: {
    // Must not include query params — Auth.js appends ?error=... and breaks parsing otherwise.
    signIn: "/",
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.user = {
          id: user.id,
          fullName: user.fullName,
          email: user.email,
          isEmailVerified: user.isEmailVerified,
          mobileNo: user.mobileNo,
          countryCode: user.countryCode,
        } satisfies AppUser;
      }

      if (trigger === "update") {
        const currentUser = token.user as AppUser | undefined;
        const sessionUser =
          session &&
            typeof session === "object" &&
            "user" in session &&
            session.user &&
            typeof session.user === "object"
            ? (session.user as Partial<AppUser>)
            : undefined;

        if (sessionUser && currentUser) {
          token.user = {
            ...currentUser,
            ...sessionUser,
          } satisfies AppUser;
        } else if (typeof token.accessToken === "string") {
          const profile = await fetchUserProfile(token.accessToken);
          console.log(profile);

          if (profile) {
            token.user = {
              id: profile.id,
              fullName: profile.fullName,
              email: profile.email,
              isEmailVerified: profile.isEmailVerified,
              mobileNo: profile.mobileNo,
              countryCode: profile.countryCode,
            } satisfies AppUser;
          }
        }
      }

      return token;
    },
    async session({ session, token }) {
      const appUser = token.user as AppUser | undefined;

      return {
        ...session,
        accessToken:
          typeof token.accessToken === "string" ? token.accessToken : undefined,
        user: appUser
          ? {
            ...session.user,
            id: appUser.id,
            fullName: appUser.fullName,
            email: appUser.email,
            isEmailVerified: appUser.isEmailVerified,
            mobileNo: appUser.mobileNo,
            countryCode: appUser.countryCode,
          }
          : session.user,
      };
    },
    authorized({ auth, request }) {
      const { pathname } = request.nextUrl;

      if (!isPrivateRoute(pathname)) return true;
      if (auth?.user) return true;

      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/";
      loginUrl.searchParams.set("login", "1");
      loginUrl.searchParams.set(
        "callbackUrl",
        `${pathname}${request.nextUrl.search}`,
      );

      return NextResponse.redirect(loginUrl);
    },
  },
  trustHost: true,
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);