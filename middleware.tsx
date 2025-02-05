import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";

const PUBLIC_FILE = /\.(.*)$/;
export default async function middleware(
  req: NextRequest,
  event: NextFetchEvent
) {
  // const pathname = req.nextUrl.pathname;
  // const token = await getToken({ req });

  // const isAuthenticated = !!token;

  return NextResponse.next()

  // if (
  //   pathname == "/" ||
  //   pathname.startsWith("/_next") ||
  //   pathname.includes("/api") ||
  //   PUBLIC_FILE.test(pathname) ||
  //   isAuthenticated
  // ) {
  //   return NextResponse.next();
  // }
  const authMiddleware = withAuth({
    pages: {
      signIn: "/login",
    },
  });
  // @ts-expect-error
  return authMiddleware(req, event);
}
