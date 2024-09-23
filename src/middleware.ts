import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import aliasesJson from "../public/aliases.json";

const aliases = aliasesJson as { [key: string]: string };

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const alias = aliases[pathname];

  if (alias) {
    return NextResponse.redirect(new URL(alias, req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/:path/:subpath*", // Matches any path with at least one subdirectory
    "/:path*/:file((?!.*\\.).*)", // Exclude paths with file extensions
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|plugins).*)", // Exclude specific Next.js paths and API routes
  ],
};
