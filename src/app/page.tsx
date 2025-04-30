import { Container } from "@/components/Container";
import { Hero } from "@/components/Hero";
import { SectionHeading } from "@/components/SectionHeading";
import { Benefits } from "@/components/Benefits";
import { ContentWithImage } from "@/components/ContentWithImage";
import { Video } from "@/components/Video";
import { Testimonials } from "@/components/Testimonials";
import { Faq } from "@/components/Faq";
import { Cta } from "@/components/Cta";
import { getStrapiURL } from "@/lib/utils";
import qs from "qs";

async function loader() {
  const { fetchData } = await import("@/lib/fetch");

  const path = "/api/home-page";
  const baseUrl = getStrapiURL();

  const query = qs.stringify({
    populate: {
      blocks: {
        on: {
          'blocks.hero-section': {
            populate: {
              cta: true,
              image: {
                fields: ['url', 'alternativeText', 'name']
              }
            }
          },
          'blocks.section-heading': {
            populate: '*'
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
  console.log("Fetching : ",data);
  return data;
}

function blockRenderer(block: any) {
  switch (block.__component) {
    case "blocks.hero-section":
      return <Hero key={block.id} data={block} />;

    case "blocks.section-heading":
      return <SectionHeading key={block.id} data={block} />;

    case "blocks.content-items":
      return <Benefits key={block.id} data={block} />;

    case "blocks.yt-video":
      return <Video key={block.id} data={{ id: block.id, videoId: block.videoId }} />;

    case "blocks.card-quote":
      return <Testimonials key={block.id} data={block} />;

    case "blocks.fa-qs":
      return <Faq key={block.id} data={block} />;

    case "blocks.cta":
      return <Cta key={block.id} data={block} />;
    default:
      return null;
  }
}


export default async function Home() {
  const data = await loader();
  const blocks = data?.blocks;
  if (!blocks) {
    console.log("Blocks tidak ada")
    return null
  };
  return (
    <Container>
    {blocks.map((block: any) => blockRenderer(block))}
  </Container>
  );

}

