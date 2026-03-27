import { NextRequest, NextResponse } from "next/server";
import { env } from "../env";
import { role } from "./constants/role";

export const proxy = async (request: NextRequest) => {
  const pathName = request.nextUrl.pathname;
  const API_URL = env.API_URL;
  const sessionToken =
    request.cookies.get("__Secure-better-auth.session_token") ||
    request.cookies.get("__Secure-better-auth.session_data") ||
    request.cookies.get("better-auth.session_token");

  if (!sessionToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (sessionToken) {
    const res = await fetch(`${API_URL}/get-session`, {
      headers: {
        Cookie: `${sessionToken.name}=${sessionToken.value}`,
      },
    });
    const data = await res.json();
    const userRole = data?.user.role as string;

    if (
      userRole === role.CUSTOMER &&
      (pathName.startsWith("/seller") || pathName.startsWith("/admin"))
    ) {
      return NextResponse.redirect(new URL("/customer/my_orders", request.url));
    }

    if (
      userRole === role.SELLER &&
      (pathName.startsWith("/customer") || pathName.startsWith("/admin"))
    ) {
      return NextResponse.redirect(new URL("/seller/dashboard", request.url));
    }

    if (
      userRole === role.ADMIN &&
      (pathName.startsWith("/seller") || pathName.startsWith("/customer"))
    ) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    "/seller/dashboard",
    "/seller/:path*",
    "/profile",
    "/customer/:path*",
    "/admin/:path*",
  ],
};
