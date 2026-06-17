export { auth as proxy } from "./auth";

export const config = {
  matcher: ["/profile/:path*", "/cart/:path*", "/checkout/:path*"],
};
