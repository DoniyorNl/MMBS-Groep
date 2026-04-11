import { services } from "@/data/services";
import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./src/i18n/routing";

const intlMiddleware = createMiddleware(routing);

function redirectServiceUrls(request: NextRequest): NextResponse | null {
  const pathname = request.nextUrl.pathname;

  if (pathname === "/en/diensten") {
    return NextResponse.redirect(new URL("/en/services", request.url), 301);
  }

  const enDiensten = pathname.match(/^\/en\/diensten\/([^/]+)$/);
  if (enDiensten) {
    const pathSlug = enDiensten[1];
    const service = services.find((s) => s.slugNl === pathSlug || s.slug === pathSlug);
    if (service) {
      return NextResponse.redirect(new URL(`/en/services/${service.slugEn}`, request.url), 301);
    }
  }

  if (pathname === "/nl/services") {
    return NextResponse.redirect(new URL("/nl/diensten", request.url), 301);
  }

  const nlServices = pathname.match(/^\/nl\/services\/([^/]+)$/);
  if (nlServices) {
    const pathSlug = nlServices[1];
    const service = services.find((s) => s.slugEn === pathSlug);
    if (service) {
      return NextResponse.redirect(new URL(`/nl/diensten/${service.slugNl}`, request.url), 301);
    }
  }

  return null;
}

export default function middleware(request: NextRequest) {
  const serviceRedirect = redirectServiceUrls(request);
  if (serviceRedirect) return serviceRedirect;
  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!_next|_vercel|.*\\..*).*)"],
};
