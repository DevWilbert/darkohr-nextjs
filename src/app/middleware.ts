import { NextRequest, NextResponse } from 'next/server';

const locales = ['id', 'en'];
const defaultLocale = 'id';

// Fungsi matcher untuk menentukan jalur yang akan diproses middleware
export const config = {
  matcher: [
    // Skip jalur API, file statis, dan favicon
    '/((?!api|_next/static|_next/image|images|favicon.ico).*)',
  ],
};

export function middleware(request: NextRequest) {
  // Dapatkan pathname dari request (misalnya: /about, /products)
  const pathname = request.nextUrl.pathname;

  // Periksa apakah URL sudah memiliki locale (misalnya: /id/about, /en/products)
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return NextResponse.next();

  // Tentukan locale yang akan digunakan
  // 1. Coba dapatkan dari cookie
  // 2. Coba dapatkan dari header Accept-Language
  // 3. Gunakan default locale jika tidak ada
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
  const acceptLanguage = request.headers.get('accept-language');
  let locale: string | undefined = undefined;

  // Periksa cookie
  if (cookieLocale && locales.includes(cookieLocale)) {
    locale = cookieLocale;
  } 
  // Periksa header Accept-Language
  else if (acceptLanguage) {
    const preferredLocale = acceptLanguage
      .split(',')
      .map((l) => l.split(';')[0].trim())
      .find((l) => locales.includes(l.substring(0, 2)));
      
    if (preferredLocale) {
      locale = preferredLocale.substring(0, 2);
    }
  }

  // Gunakan default locale jika tidak ada yang cocok
  if (!locale || !locales.includes(locale)) {
    locale = defaultLocale;
  }

  // Redirect ke URL dengan locale
  const newUrl = new URL(`/${locale}${pathname === '/' ? '' : pathname}`, request.url);
  return NextResponse.redirect(newUrl);
}