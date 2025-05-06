import React from "react";
import { Container } from "@/components/Container";
import { notFound } from "next/navigation";
import { FeaturePage } from "@/pages/FeaturePage";

// Define interface for component props
interface PageComponentProps {
  locale: string;
}

// Define the type for page components
type PageComponent = React.ComponentType<PageComponentProps>;

// Interface for locale-specific route mappings
interface RouteMap {
  [key: string]: PageComponent;
}

// Interface for all locale mappings
interface LocaleRouteMap {
  [locale: string]: RouteMap;
}

// Define page mappings for each locale
const PAGE_MAPPINGS: LocaleRouteMap = {
  'id': {
    'fitur': FeaturePage,
    // 'tentang': AboutPage,
    // add other mappings as needed
  },
  'en': {
    'features': FeaturePage,
    // 'about': AboutPage,
    // add other mappings as needed
  }
};

export default async function DynamicPage({
  params
}: {
  params: { locale: string; slug: string }
}) {
  const { locale, slug } = params;
  
  // If no slug, show 404 page
  if (!slug) {
    notFound();
  }
  
  // Check if the locale exists in our mappings
  if (!PAGE_MAPPINGS[locale]) {
    notFound();
  }
  
  // Safely access the component using the slug
  const PageComponent = PAGE_MAPPINGS[locale][slug];
  
  // If no matching component, show 404 page
  if (!PageComponent) {
    notFound();
  }
  
  // Render page component with locale
  return (
    <Container>
      <PageComponent locale={locale} />
    </Container>
  );
}

// For static generation
export async function generateStaticParams() {
  // Create array for all possible locale and slug combinations
  const routes = [
    // Specific page routes
    { locale: 'id', slug: 'fitur' },
    { locale: 'en', slug: 'features' },
    { locale: 'id', slug: 'tentang' },
    { locale: 'en', slug: 'about' },
    // Add other routes as needed
  ];
  
  return routes;
}

// import React from "react";
// import type { PageProps } from "@/types";
// import { Container } from "@/components/Container";
// import { getStrapiURL } from "@/lib/utils";
// import qs from "qs";

// // Fungsi untuk mengambil data navigasi dari Strapi
// async function getNavigationData() {
//   const { fetchData } = await import("@/lib/fetch");

//   const path = "/api/global";
//   const baseUrl = getStrapiURL();

//   const query = qs.stringify({
//     populate: {
//       topnav: {
//         populate: {
//           link: {
//             populate: true,
//           },
//         },
//       },
//     },
//   });

//   const url = new URL(path, baseUrl);
//   url.search = query;

//   const data = await fetchData(url.href);
//   return data;
// }

// interface NavbarData {
//   topnav: {
//     link: {
//       id: number;
//       href: string;
//       text: string;
//       external: boolean;
//     }[];
//   };
// }

// interface StaticParamsProps {
//   slug: string;
// }

// // Fungsi untuk menghasilkan static params berdasarkan data navigasi
// export async function generateStaticParams(): Promise<StaticParamsProps[]> {
//   try {
//     const navData = await getNavigationData() as NavbarData;
    
//     if (!navData || !navData.topnav || !navData.topnav.link) {
//       console.warn("Navigation data not found or incomplete");
//       return [];
//     }

//     // Filter hanya link internal dan transform menjadi format yang sesuai
//     return navData.topnav.link
//       .filter(link => !link.external) // hanya ambil link internal
//       .map(link => {
//         // Ambil slug dari URL (hapus / di awal jika ada)
//         const slug = link.href.startsWith('/') ? link.href.substring(1) : link.href;
//         return { slug };
//       });
//   } catch (error) {
//     console.error("Error fetching navigation data for static params:", error);
//     return [];
//   }
// }

// export default function DynamicPageRoute(props: Readonly<PageProps>) {
//   const slug = props.params?.slug;
//   return (
//     <Container>
//       <div>Dynamic Page Route: {slug}</div>
//     </Container>
//   );
// }
