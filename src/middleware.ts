// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'
 
// // Daftar locale yang didukung
// export const locales = ['id', 'en']
// export const defaultLocale = 'id'

// // Fungsi untuk memeriksa apakah pathname sudah memiliki locale
// function pathnameHasLocale(pathname: string) {
//   return locales.some(
//     (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
//   )
// }

// // Middleware ini akan berjalan ketika request masuk
// export function middleware(request: NextRequest) {
//   // Mendapatkan pathname dari request
//   const pathname = request.nextUrl.pathname
  
//   // Jika URL adalah root, kita tidak melakukan redirect, tetapi 
//   // kita akan memodifikasi request untuk secara internal melayani konten dari /id
//   if (pathname === '/') {
//     // Mengkloning URL untuk memodifikasi
//     const newUrl = request.nextUrl.clone()
    
//     // Mengubah pathname menjadi /id untuk diproses secara internal
//     newUrl.pathname = `/${defaultLocale}`
    
//     // Mengembalikan rewrite (bukan redirect) untuk mempertahankan URL asli di browser
//     return NextResponse.rewrite(newUrl)
//   }
  
//   // Untuk path lain yang tidak memiliki locale, kita redirect ke versi dengan locale
//   if (!pathnameHasLocale(pathname)) {
//     return NextResponse.redirect(
//       new URL(`/${defaultLocale}${pathname}`, request.url)
//     )
//   }
// }
 
// // Konfigurasi matcher agar middleware hanya dijalankan untuk path tertentu
// export const config = {
//   matcher: ['/((?!api|_next/static|_next/image|favicon.ico|_vercel|.*\\..*).*)'],
// }

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// Daftar locale yang didukung
export const locales = ['id', 'en']
export const defaultLocale = 'id'

// Fungsi untuk memeriksa apakah pathname sudah memiliki locale
function pathnameHasLocale(pathname: string) {
  return locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )
}

// Middleware ini akan berjalan ketika request masuk
export function middleware(request: NextRequest) {
  // Mendapatkan pathname dari request
  const pathname = request.nextUrl.pathname
  
  // Jika pathname belum memiliki locale, kita akan rewrite (bukan redirect)
  if (!pathnameHasLocale(pathname)) {
    // Mengkloning URL untuk memodifikasi
    const newUrl = request.nextUrl.clone()
    
    // Menentukan path baru dengan locale
    // Jika root path, gunakan default locale saja
    // Jika bukan root path, tambahkan default locale di depan path yang ada
    newUrl.pathname = pathname === '/' 
      ? `/${defaultLocale}` 
      : `/${defaultLocale}${pathname}`
    
    // Mengembalikan rewrite untuk mempertahankan URL asli di browser
    return NextResponse.rewrite(newUrl)
  }
}
 
// Konfigurasi matcher agar middleware hanya dijalankan untuk path tertentu
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|_vercel|.*\\..*).*)'],
}