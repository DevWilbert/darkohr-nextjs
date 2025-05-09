import React from "react";
import { Container } from "@/components/Container";
import { Caveat } from "next/font/google";

import {
  CheckIcon,
  ShieldCheckIcon,
  CogIcon,
  ChartBarIcon,
  FolderOpenIcon,
  CameraIcon,
  CalendarDaysIcon,
  CurrencyDollarIcon,
  PencilSquareIcon
} from "@heroicons/react/20/solid";
import { StrapiImage } from "./StrapiImage";

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["700"],
});

function iconSelect(iconKey: string) {
  const iconClass = "w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white";

  switch (iconKey) {
    case "Cog":
      return <CogIcon className={iconClass} />;
    case "ChartBar":
      return <ChartBarIcon className={iconClass} />;
    case "FolderOpen":
      return <FolderOpenIcon className={iconClass} />;
    case "ShieldCheck":
      return <ShieldCheckIcon className={iconClass} />;
    case "Camera":
      return <CameraIcon className={iconClass} />;
    case "CalendarDays":
      return <CalendarDaysIcon className={iconClass} />;
    case "CurrencyDollar":
      return <CurrencyDollarIcon className={iconClass} />;
    case "PencilSquare":
      return <PencilSquareIcon className={iconClass} />;
    default:
      return <CheckIcon className={iconClass} />;
  }
}

interface BenefitProps {
  data: {
    id: number;
    __component: string;
    heading: string;
    text: string;
    imageRight: boolean | null;
    image: {
      id: number;
      url: string;
      alternativeText: string | null;
      name: string;
    };
    items: {
      id: number;
      text: string;
      icon: string | null;
      heading: string;
    }[];
  };
  locale: string;
}

export function Benefits({ data, locale }: BenefitProps) {
  const { heading, text, image, items, imageRight } = data;

  return (
    <Container className="flex flex-wrap mb-20 lg:gap-10 lg:flex-nowrap">
      <div
        className={`flex items-center justify-center w-full lg:w-1/2 ${
          imageRight ? "lg:order-1" : ""
        }`}
      >
        <div className="relative w-full max-w-md mx-auto">
          {/* Circular Image Container with Better Fitting Solution */}
          <div className="relative w-full">
            {/* Primary Image - Using object-contain to show full image */}
            <div className="relative z-10 rounded-full overflow-hidden aspect-square bg-gray-100">
              <StrapiImage
                src={image.url}
                width={480}
                height={480}
                alt={image.alternativeText || image.name}
                className="object-contain w-full h-full"
              />
            </div>
            
            {/* Minimal Circular Decorative Elements - Adjusted for Portrait Orientation */}
            <div className="absolute inset-0 -z-10">
              {/* Just 4 strategic circles without glow/shadow */}
              {/* Top right circle */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-[#FB4D46]/30 rounded-full"></div>
              
              {/* Bottom left circle */}
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-[#FB4D46]/40 rounded-full"></div>
              
              {/* Middle left small accent */}
              <div className="absolute top-1/3 -left-2 w-8 h-8 bg-[#FB4D46]/50 rounded-full"></div>
              
              {/* Middle right small accent */}
              <div className="absolute bottom-1/3 -right-2 w-6 h-6 bg-[#FB4D46]/60 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`flex flex-wrap items-center w-full lg:w-1/2 ${
          imageRight ? "lg:justify-end" : ""
        }`}
      >
        <div>
          <div className="flex flex-col w-full mt-4">
            {/* Modern heading design */}
            <div className="flex items-center space-x-2 mb-2">
              <span className="bg-[#FB4D46] h-1 w-6 rounded-full"></span>
              <span className="bg-[#FB4D46] h-1 w-12 rounded-full"></span>
            </div>
            <h3 className={`${caveat.className} max-w-2xl mt-3 text-2xl font-bold leading-snug tracking-tight text-gray-800 lg:leading-tight lg:text-4xl dark:text-white`}>
              {heading}
            </h3>
          </div>

          <div className="w-full mt-5">
            {items.map((item, index) => (
              <BenefitItem key={index} data={item} />
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}

interface BenefitItemProps {
  data: {
    id: number;
    text: string;
    icon: string | null;
    heading: string;
  };
}

function BenefitItem({ data }: Readonly<BenefitItemProps>) {
  if (!data) return null;
  const { heading, text, icon } = data;
  return (
    <div className="flex items-start mt-6 space-x-3 md:mt-8 group">
      {icon && (
        <div className="flex items-center justify-center flex-shrink-0 mt-1 bg-[#FB4D46] rounded-md w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11">
          {iconSelect(icon)}
        </div>
      )}
      <div>
        <h4 className="text-sm sm:text-base md:text-lg lg:text-xl font-medium text-gray-700 dark:text-gray-300">
          {heading}
        </h4>
        {text && (
          <p className="mt-1 text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400">
            {text}
          </p>
        )}
      </div>
    </div>
  );
}