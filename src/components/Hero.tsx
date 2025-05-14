import Link from "next/link";
import { Caveat } from "next/font/google";
import { Container } from "@/components/Container";
import { StrapiImage } from "./StrapiImage";

// Initialize Caveat font with weight 700
const caveat = Caveat({
  subsets: ["latin"],
  weight: ["700"],
});

interface HeroProps {
  data: {
    id: number;
    heading: string;
    description: string;
    cta: {
      href: string;
      text: string;
      external: boolean;
    };
    image: {
      url: string;
      alternativeText: string | null;
      name: string;
    };
    image_dark: {
      url: string;
      alternativeText: string | null;
      name: string;
    };
  };
}

export function Hero({ data }: Readonly<HeroProps>) {
  if (!data) {
    console.log("Data Tidak ada");
    return null;
  }

  console.log("data ada");
  const { heading, description, cta, image, image_dark } = data;

  // Function to highlight "DarkoHR" text with the specified color
  const highlightDarkoHR = (text: string) => {
    const parts = text.split(/(DarkoHR)/g);
    return parts.map((part, index) =>
      part === "DarkoHR" ?
        <span key={index} className="text-[#FB4D46]">{part}</span> :
        part
    );
  };

  return (
    <Container className="flex flex-wrap ">
      <div className="flex items-center justify-center w-full lg:w-1/2">
        <div className="max-w-2xl mb-8">
          <h1 className={`${caveat.className} text-5xl font-bold leading-snug tracking-tight text-gray-800 lg:text-6xl lg:leading-tight xl:text-7xl xl:leading-tight dark:text-white`}>
            {highlightDarkoHR(heading)}
          </h1>
          <p className="py-5 text-xl leading-normal text-gray-500 lg:text-xl xl:text-2xl dark:text-gray-300">
            {description}
          </p>

          <div className="flex flex-col items-start space-y-3 sm:space-x-4 sm:space-y-0 sm:items-center sm:flex-row">
            <Link
              href={cta.href}
              target={cta.external ? "_blank" : "_self"}
              rel="noopener"
              className="group px-8 py-4 text-lg font-medium text-center text-white bg-[#FB4D46] rounded-md inline-flex items-center gap-2 transition-all duration-300 hover:bg-[#e03e37]"
            >
              {cta.text}
              <span className="transform transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>

            {/* Hover Effect  */}
            {/* <Link
              href={cta.href}
              target={cta.external ? "_blank" : "_self"}
              rel="noopener"
              className="group relative px-8 py-4 text-lg font-medium text-center text-[#FB4D46] border-2 border-[#FB4D46] rounded-md inline-flex items-center gap-2 transition-colors duration-300 overflow-hidden"
            >
              <span className="absolute inset-0 w-0 bg-[#FB4D46] transition-all duration-300 ease-out group-hover:w-full"></span>
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">{cta.text}</span>
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">→</span>
            </Link> */}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center w-full lg:w-1/2">
        <div className="">
          {/* Light mode image - hidden in dark mode */}
          <div className="block dark:hidden">
            <StrapiImage
              src={image.url}
              width={933}
              height={800}
              className={"object-cover"}
              alt={image.alternativeText || "Hero Image"}
            />
          </div>

          {/* Dark mode image - hidden in light mode */}
          <div className="hidden dark:block">
            <StrapiImage
              src={image_dark.url}
              width={933}
              height={800}
              className={"object-cover"}
              alt={image_dark.alternativeText || "Hero Image (Dark)"}
            />
          </div>
        </div>
      </div>
    </Container>
  );
}