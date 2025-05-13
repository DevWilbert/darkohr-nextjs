import React from "react";
import { Container } from "@/components/Container";
import { getStrapiURL } from "@/lib/utils";
import qs from "qs";
import { SectionHeading } from "@/components/SectionHeading";

interface FeaturePageProps {
  locale: string;
}

// Fungsi untuk mengambil data fitur dari Strapi berdasarkan locale
async function loader(locale: string) {
  const { fetchData } = await import("@/lib/fetch");

  const path = "/api/features-page"; // Endpoint Strapi untuk halaman fitur
  const baseUrl = getStrapiURL();

  // Query khusus untuk halaman fitur dengan blok-blok yang sesuai
  const query = qs.stringify({
    locale: locale,
    populate: {
      blocks: {
        on: {
          'blocks.section-heading': {
            populate: '*'
          },
        }
      }
    }
  }, {
    encodeValuesOnly: true
  });

  const url = new URL(path, baseUrl);
  url.search = query;

  try {
    const data = await fetchData(url.href);
    console.log(`Fetching features data for locale: ${locale}`, data);
    return data;
  } catch (error) {
    console.error(`Error fetching features data for locale: ${locale}`, error);
    return null;
  }
}

function blockRenderer(block: any, index: number, locale:string) {

  const uniqueKey = `${block.id}-${index}`;

  switch (block.__component) {

    case "blocks.section-heading":
      return <SectionHeading key={uniqueKey} data={block} locale={locale} />;

    default:
      return null;
  }
}

export const FeaturePage: React.FC<FeaturePageProps> = async ({ locale }) => {
  // Ambil data dari API
  const data = await loader(locale);
  const blocks = data?.blocks;
  
  if (!blocks) {
    console.log("Blocks tidak ada pada halaman fitur");
    return (
      <Container>
        <div>Loading feature content...</div>
      </Container>
    );
  }

  return (
    <Container>
      {/* Jika ingin menambahkan konten khusus halaman fitur di sini */}
      {blocks.map((block: any, index: number) => blockRenderer(block, index, locale))}
    </Container>
  );
};

export default FeaturePage;