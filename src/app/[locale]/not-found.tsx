"use client"

import React, { useEffect, useState } from 'react';
import { Container } from "@/components/Container";
import { usePathname } from 'next/navigation';

export default function NotFound() {
  const pathname = usePathname();
  const [locale, setLocale] = useState<'id' | 'en'>('id');
  
  useEffect(() => {
    // Check if pathname starts with '/en/' or '/id/'
    if (pathname?.startsWith('/en/')) {
      setLocale('en');
    } else {
      setLocale('id');
    }
  }, [pathname]);

  // Content for different locales
  const content = {
    'id': {
      title: '404 - Halaman Tidak Ditemukan',
      description: 'Maaf, halaman yang Anda cari tidak dapat ditemukan.',
      homeButton: 'Kembali ke Beranda'
    },
    'en': {
      title: '404 - Page Not Found',
      description: 'Sorry, the page you are looking for could not be found.',
      homeButton: 'Back to Home'
    }
  };

  // Use the appropriate content
  const { title, description, homeButton } = content[locale] || content['id'];

  return (
    <Container>
      <div className="flex flex-col items-center justify-center min-h-screen py-12">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <p className="text-lg mb-6">{description}</p>
        <a href={locale === 'id' ? '/' : `/${locale}`} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
          {homeButton}
        </a>
      </div>
    </Container>
  );
}

// import React from 'react';
// import { Container } from "@/components/Container";

// // Server Component
// export default async function NotFound({ 
//   params 
// }: { 
//   params?: { locale?: string } 
// }) {
//   // Get the locale from params or default to 'id'
//   const locale = params?.locale || 'id';
  
//   // Content for different locales
//   const content = {
//     'id': {
//       title: '404 - Halaman Tidak Ditemukan',
//       description: 'Maaf, halaman yang Anda cari tidak dapat ditemukan.',
//       homeButton: 'Kembali ke Beranda'
//     },
//     'en': {
//       title: '404 - Page Not Found',
//       description: 'Sorry, the page you are looking for could not be found.',
//       homeButton: 'Back to Home'
//     }
//   };

//   // Use the appropriate content or default to English
//   const { title, description, homeButton } = content[locale as keyof typeof content] || content['id'];

//   return (
//     <Container>
//       <div className="flex flex-col items-center justify-center min-h-screen py-12">
//         <h1 className="text-4xl font-bold mb-4">{title}</h1>
//         <p className="text-lg mb-6">{description}</p>
//         <a href={`/${locale}`} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
//           {homeButton}
//         </a>
//       </div>
//     </Container>
//   );
// }

