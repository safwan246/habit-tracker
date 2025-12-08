// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value || null;
  const path = req.nextUrl.pathname;

  const isProtected =
    path.startsWith("/habit") ||
    path.startsWith("/api/habit");

  console.log("MIDDLEWARE TOKEN RAW:", token);

  // 1) Public routes → allow
  if (!isProtected) {
    console.log("from not protected");
    return NextResponse.next();
  }

  // 2) Protected route but NO token → redirect
  if (!token) {
    console.log("NO TOKEN → redirect to /login");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 3) Protected route and token exists → allow
  console.log("TOKEN PRESENT → allow");
  return NextResponse.next();
}

export const config = {
  matcher: ["/habit/:path*", "/api/habit/:path*"],
};
