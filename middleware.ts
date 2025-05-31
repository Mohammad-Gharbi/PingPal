export { default } from "next-auth/middleware"

export const config = {
  matcher: ["/profile", "/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
