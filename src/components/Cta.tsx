import React from "react";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Poppins } from "next/font/google";
import { ArrowRight } from "lucide-react";

interface CtaProps {
  data: {
    id: number;
    __component: string;
    heading: string;
    subHeading: string;
    cta: {
      id: number;
      href: string;
      text: string;
      external: boolean;
    };
  };
  locale: string;
}

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export function Cta({ data }: CtaProps) {
  if (!data) return null;
  const { heading, subHeading, cta } = data;
  
  return (
    <Container>
      <div className="relative overflow-hidden bg-gradient-to-r from-[#FB4D46] to-[#ff6b65] rounded-2xl shadow-xl">
        {/* Background pattern */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white"></div>
          <div className="absolute bottom-0 right-1/3 w-32 h-32 rounded-full bg-white"></div>
          <div className="absolute top-1/2 -left-10 w-24 h-24 rounded-full bg-white"></div>
        </div>
        
        <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8 px-8 py-10 lg:px-12 lg:py-12">
          <div className="flex-grow text-center lg:text-left">
            <h2 className={`${poppins.className} text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-tight`}>
              {heading}
            </h2>
            <p className={`${poppins.className} mt-3 text-lg text-white text-opacity-90 font-normal max-w-xl`}>
              {subHeading}
            </p>
          </div>
          
          <div className="flex-shrink-0 w-full lg:w-auto">
            <Link
              href={cta.href}
              target={cta.external ? "_blank" : "_self"}
              rel="noopener"
              className="group flex items-center justify-center w-full lg:w-auto px-8 py-4 text-[#FB4D46] font-medium bg-white rounded-xl hover:bg-gray-50 shadow-lg transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <span className="text-lg">{cta.text}</span>
              <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
}

// import React from "react";
// import Link from "next/link";
// import { Container } from "@/components/Container";

// interface CtaProps {
//   data: {
//     id: number;
//     __component: string;
//     heading: string;
//     subHeading: string;
//     cta: {
//       id: number;
//       href: string;
//       text: string;
//       external: boolean;
//     };
//   };
//   locale: string;
// }

// export function Cta({ data }: CtaProps) {
//   if (!data) return null;
//   const { heading, subHeading, cta } = data;
//   return (
//     <Container>
//       <div className="flex flex-wrap items-center justify-between w-full max-w-4xl gap-5 mx-auto text-white bg-indigo-600 px-7 py-7 lg:px-12 lg:py-12 lg:flex-nowrap rounded-xl">
//         <div className="flex-grow text-center lg:text-left">
//           <h2 className="text-2xl font-medium lg:text-3xl">{heading}</h2>
//           <p className="mt-2 font-medium text-white text-opacity-90 lg:text-xl">
//             {subHeading}
//           </p>
//         </div>
//         <div className="flex-shrink-0 w-full text-center lg:w-auto">
//           <Link
//             href={cta.href}
//             target={cta.external ? "_blank" : "_self"}
//             rel="noopener"
//             className="inline-block py-3 mx-auto text-lg font-medium text-center text-indigo-600 bg-white rounded-md px-7 lg:px-10 lg:py-5 "
//           >
//             {cta.text}
//           </Link>
//         </div>
//       </div>
//     </Container>
//   );
// }
