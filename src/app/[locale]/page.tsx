import { Container } from "@/components/Container";
import { Hero } from "@/components/Hero";
import { SectionHeading } from "@/components/SectionHeading";
import { LogoCarousel } from "@/components/LogoCarousel";
import CardGrid from "@/components/CardGrid";
import { Benefits } from "@/components/Benefits";
// import { ContentWithImage } from "@/components/ContentWithImage";
import { Video } from "@/components/Video";
import { Testimonials } from "@/components/Testimonials";
import { Faq } from "@/components/Faq";
import { Cta } from "@/components/Cta";
import { getStrapiURL } from "@/lib/utils";
import qs from "qs";

async function loader(locale: string) {
  const { fetchData } = await import("@/lib/fetch");

  const path = "/api/home-page";
  const baseUrl = getStrapiURL();

  const query = qs.stringify({
    locale: locale,
    populate: {
      blocks: {
        on: {
          'blocks.hero-section': {
            populate: {
              cta: true,
              image: {
                fields: ['url', 'alternativeText', 'name']
              },
              image_dark: {
                fields: ['url', 'alternativeText', 'name']
              }
            }
          },
          'blocks.section-heading': {
            populate: '*'
          },
          'blocks.logo-carousel': {
            populate: {
              logoItems: {
                populate: {
                  image: {
                    fields: ['url', 'alternativeText', 'name']
                  }
                }
              }
            }
          },
          'blocks.why-choose-us': {
            populate: {
              cards: {
                populate: '*'
              }
            }
          },
          'blocks.content-items': {
            populate: {
              image: {
                fields: ['url', 'alternativeText', 'name']
              },
              items: {
                populate: '*'
              }
            }
          },
          'blocks.yt-video': {
            populate: '*'
          },
          'blocks.card-quote': {
            populate: {
              cards: {
                populate: '*'
              }
            }
          },
          'blocks.fa-qs': {
            populate: {
              questions: {
                populate: '*'
              }
            }
          },
          'blocks.cta': {
            populate: {
              cta: true
            }
          }
        }
      }
    }
  }, {
    encodeValuesOnly: true
  });

  const url = new URL(path, baseUrl);
  url.search = query;

  const data = await fetchData(url.href);
  console.log("Fetching : ", data);
  return data;
}

function blockRenderer(block: any, index: number) {

  const uniqueKey = `${block.id}-${index}`;

  switch (block.__component) {
    case "blocks.hero-section":
      return <Hero key={uniqueKey} data={block} />;

    case "blocks.section-heading":
      return <SectionHeading key={uniqueKey} data={block} />;

    case "blocks.logo-carousel":
      return <LogoCarousel key={uniqueKey} data={block}></LogoCarousel>

    case "blocks.why-choose-us":
       return <CardGrid key={uniqueKey} data={block}></CardGrid>

    case "blocks.content-items":
      return <Benefits key={uniqueKey} data={block} />;

    case "blocks.card-quote":
      return <Testimonials key={uniqueKey} data={block} />;

    case "blocks.fa-qs":
      return <Faq key={uniqueKey} data={block} />;

    case "blocks.cta":
      return <Cta key={uniqueKey} data={block} />;
    default:
      return null;
  }
}


export default async function Home({
  params: { locale }
}: {
  params: { locale: string }
}) {
  const data = await loader(locale);
  const blocks = data?.blocks;
  if (!blocks) {
    console.log("Blocks tidak ada")
    return null
  };
  return (
    <Container>
      {blocks.map((block: any, index: number) => blockRenderer(block, index))}
    </Container>
  );

}

export async function generateStaticParams() {
  return [
    { locale: 'id' },
    { locale: 'en' },
  ];
}