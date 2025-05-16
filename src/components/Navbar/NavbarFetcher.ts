import { getStrapiURL } from "@/lib/utils";
import qs from "qs";
import { NavbarData } from "./NavbarData";

export async function fetchNavbarData(locale: string = 'id'): Promise<NavbarData> {
  const { fetchData } = await import("@/lib/fetch");

  const path = "/api/global";
  const baseUrl = getStrapiURL();

  const query = qs.stringify({
    locale: locale,
    populate: {
      topnav: {
        populate: {
          logoLink: {
            populate: {
              image: {
                fields: ["url","alternativeText","name"]
              },
            },
          },
          link: {
            populate: true,
          },
          cta: {
            populate: true,
          },
        },
      },
    },
  });

  const url = new URL(path, baseUrl);
  url.search = query;

  const data = await fetchData(url.href, { next: { revalidate: false } });
  return data as NavbarData;
}