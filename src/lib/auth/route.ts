export const privateRoutes = ["/profile", "/cart", "/checkout"];
export function isPrivateRoute(pathname: string) {
  return privateRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
}
