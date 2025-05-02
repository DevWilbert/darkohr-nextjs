import React from "react";
import type { PageProps } from "@/types";
import { Container } from "@/components/Container";
import { getStrapiURL } from "@/lib/utils";
import qs from "qs";

// Fungsi untuk mengambil data navigasi dari Strapi
async function getNavigationData() {
  const { fetchData } = await import("@/lib/fetch");

  const path = "/api/global";
  const baseUrl = getStrapiURL();

  const query = qs.stringify({
    populate: {
      topnav: {
        populate: {
          link: {
            populate: true,
          },
        },
      },
    },
  });

  const url = new URL(path, baseUrl);
  url.search = query;

  const data = await fetchData(url.href);
  return data;
}

interface NavbarData {
  topnav: {
    link: {
      id: number;
      href: string;
      text: string;
      external: boolean;
    }[];
  };
}

interface StaticParamsProps {
  slug: string;
}

// Fungsi untuk menghasilkan static params berdasarkan data navigasi
export async function generateStaticParams(): Promise<StaticParamsProps[]> {
  try {
    const navData = await getNavigationData() as NavbarData;
    
    if (!navData || !navData.topnav || !navData.topnav.link) {
      console.warn("Navigation data not found or incomplete");
      return [];
    }

    // Filter hanya link internal dan transform menjadi format yang sesuai
    return navData.topnav.link
      .filter(link => !link.external) // hanya ambil link internal
      .map(link => {
        // Ambil slug dari URL (hapus / di awal jika ada)
        const slug = link.href.startsWith('/') ? link.href.substring(1) : link.href;
        return { slug };
      });
  } catch (error) {
    console.error("Error fetching navigation data for static params:", error);
    return [];
  }
}

export default function DynamicPageRoute(props: Readonly<PageProps>) {
  const slug = props.params?.slug;
  return (
    <Container>
      <div>Dynamic Page Route: {slug}</div>
    </Container>
  );
}



// import React from "react";
// import type { PageProps } from "@/types";

// import { Container } from "@/components/Container";

// const pages = {
//   data: [
//     {
//       id: 1,
//       slug: "features",
//     },
//     {
//       id: 2,
//       slug: "faq",
//     },
//     {
//       id: 3,
//       slug: "company",
//     },
//   ],
// };

// interface StaticParamsProps {
//   id: number;
//   slug: string;
// }

// export async function generateStaticParams() {
//   return pages.data.map((page: Readonly<StaticParamsProps>) => ({
//     slug: page.slug,
//   }));
// }

// export default function DynamicPageRoute(props: Readonly<PageProps>) {
//   const slug = props.params?.slug;
//   return (
//     <Container>
//       <div>Dynamic Page Route: {slug}</div>
//     </Container>
//   );
// }
