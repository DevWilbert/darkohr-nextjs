import React from "react";
import { Container } from "@/components/Container";

interface CardProps {
  id: number;
  heading: string;
  subHeading: string;
  text: string;
  image: {
    name: string;
    alternativeText: string | null;
    url: string;
  };
}

interface TestimonialsProps {
  data: {
    id: number;
    cards: CardProps[];
  };
}

export function Testimonials({ data }: Readonly<TestimonialsProps>) {
  if (!data) return null;
  const cards = data.cards;
  return (
    <Container>
      <div className="grid gap-6 lg:gap-8 xl:gap-10 lg:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <div key={card.id} className="lg:col-span-1 xl:col-auto">
            <div className="relative flex flex-col justify-between w-full h-full bg-gray-100 px-6 sm:px-8 md:px-10 lg:px-14 rounded-2xl py-8 sm:py-10 md:py-12 lg:py-14 dark:bg-trueGray-800">
              {/* Custom quotation mark in the corner */}
              <div className="absolute -top-4 sm:-top-5 md:-top-6 -left-2">
                <svg 
                  width="48" 
                  height="40" 
                  viewBox="0 0 48 48" 
                  className="w-10 h-8 sm:w-12 sm:h-10 md:w-14 md:h-12 lg:w-16 lg:h-12"
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path fillRule="evenodd" clipRule="evenodd" d="M18.8533 9.11599C11.3227 13.9523 7.13913 19.5812 6.30256 26.0029C5.00021 36 13.9404 40.8933 18.4703 36.4967C23.0002 32.1002 20.2848 26.5196 17.0047 24.9942C13.7246 23.4687 11.7187 24 12.0686 21.9616C12.4185 19.9231 17.0851 14.2713 21.1849 11.6392C21.4569 11.4079 21.5604 10.9591 21.2985 10.6187C21.1262 10.3947 20.7883 9.95557 20.2848 9.30114C19.8445 8.72888 19.4227 8.75029 18.8533 9.11599Z" fill="#FB4D46" />
                  <path fillRule="evenodd" clipRule="evenodd" d="M38.6789 9.11599C31.1484 13.9523 26.9648 19.5812 26.1282 26.0029C24.8259 36 33.7661 40.8933 38.296 36.4967C42.8259 32.1002 40.1105 26.5196 36.8304 24.9942C33.5503 23.4687 31.5443 24 31.8943 21.9616C32.2442 19.9231 36.9108 14.2713 41.0106 11.6392C41.2826 11.4079 41.3861 10.9591 41.1241 10.6187C40.9519 10.3947 40.614 9.95557 40.1105 9.30114C39.6702 8.72888 39.2484 8.75029 38.6789 9.11599Z" fill="#FB4D46" />
                </svg>
              </div>

              <p className="text-lg sm:text-xl md:text-2xl leading-relaxed sm:leading-relaxed md:leading-normal mb-6 md:mb-8 relative z-10">
                {card.text}
              </p>

              <div className="mt-2 sm:mt-3 md:mt-4">
                <div className="text-base sm:text-lg md:text-lg font-medium">{card.heading}</div>
                <div className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                  {card.subHeading}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}
