// "use client";

// import {
//   Disclosure,
//   DisclosurePanel,
//   DisclosureButton,
// } from "@headlessui/react";

// import Link from "next/link";
// import { StrapiImage } from "./StrapiImage";

// interface LinkProps {
//   text: string;
//   href: string;
//   external: boolean;
// }

// interface DisclosureClientProps {
//   topnav: {
//     logoLink: {
//       text: string;
//       href: string;
//       image: {
//         url: string;
//         alternativeText: string | null;
//         name: string;
//       };
//     };
//     link: LinkProps[];
//     cta: LinkProps;
//   };
//   locale?: string;
//   mobileExtras?: React.ReactNode;
// }

// export function DisclosureClient({ topnav, locale = 'id', mobileExtras }: Readonly<DisclosureClientProps>) {
//   const navigation = topnav.link;
//   const logo = topnav.logoLink;
//   const cta = topnav.cta;

//   // Function to create proper URL based on locale
//   const createLocalizedHref = (path: string) => {
//     // For default locale (id), use path without prefix
//     // For other locales (en), add locale prefix
//     return locale === 'id' ? path : `/${locale}${path}`
//   };

//   return (
//     <Disclosure as="nav" className="w-full">
//       {({ open }) => (
//         <div className="flex flex-wrap items-center justify-between w-full xl:w-auto">
//           <Link href={createLocalizedHref(logo.href)}>
//             <span className="flex items-center space-x-2 text-2xl font-medium text-indigo-500 dark:text-gray-100">
//               <span>
//                 <StrapiImage
//                   src={logo.image.url}
//                   alt={logo.image.alternativeText || logo.image.name}
//                   width={32}
//                   height={32}
//                   className="w-8"
//                 />
//               </span>
//               <span>{logo.text}</span>
//             </span>
//           </Link>

//           {/* Hamburger button for mobile and tablet (xl breakpoint and below) */}
//           <DisclosureButton
//             aria-label="Toggle Menu"
//             className="px-2 py-1 ml-auto text-gray-500 rounded-md xl:hidden hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none dark:text-gray-300 dark:focus:bg-trueGray-700"
//           >
//             <svg
//               className="w-6 h-6 fill-current"
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 24 24"
//             >
//               {open && (
//                 <path
//                   fillRule="evenodd"
//                   clipRule="evenodd"
//                   d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
//                 />
//               )}
//               {!open && (
//                 <path
//                   fillRule="evenodd"
//                   d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
//                 />
//               )}
//             </svg>
//           </DisclosureButton>

//           {/* Disclosure panel for mobile and tablet - positioned below navbar */}
//           <DisclosurePanel className="absolute top-full left-0 right-0 z-50 w-full bg-white dark:bg-gray-900 shadow-lg xl:hidden animate-slidedown">
//             <div className="flex flex-col space-y-4 px-6 py-5 max-h-[70vh] overflow-y-auto">
//               {navigation.map((item, index) => (
//                 <Link
//                   key={index}
//                   href={createLocalizedHref(item.href)}
//                   className="py-2 text-lg text-gray-700 rounded-md dark:text-gray-300 hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 dark:focus:bg-gray-800 focus:outline-none transition-colors duration-200"
//                 >
//                   {item.text}
//                 </Link>
//               ))}
//               <Link
//                 href={createLocalizedHref(cta.href)}
//                 target={cta.external ? "_blank" : "_self"}
//                 className="w-full px-6 py-3 mt-2 text-center text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors duration-200"
//               >
//                 {cta.text}
//               </Link>
              
//               {/* Display additional content (LocaleSwitch and ThemeChanger) on mobile and tablet */}
//               {mobileExtras}
//             </div>
//           </DisclosurePanel>
//         </div>
//       )}
//     </Disclosure>
//   );
// }

"use client";

import { useState, useRef, useEffect } from "react";
import {
  Disclosure,
  DisclosurePanel,
  DisclosureButton,
  Transition
} from "@headlessui/react";

import Link from "next/link";
import { StrapiImage } from "./StrapiImage";

interface LinkProps {
  text: string;
  href: string;
  external: boolean;
}

interface DisclosureClientProps {
  topnav: {
    logoLink: {
      text: string;
      href: string;
      image: {
        url: string;
        alternativeText: string | null;
        name: string;
      };
    };
    link: LinkProps[];
    cta: LinkProps;
  };
  locale?: string;
  mobileExtras?: React.ReactNode;
}

export function DisclosureClient({ topnav, locale = 'id', mobileExtras }: Readonly<DisclosureClientProps>) {
  const navigation = topnav.link;
  const logo = topnav.logoLink;
  const cta = topnav.cta;

  // Function to create proper URL based on locale
  const createLocalizedHref = (path: string) => {
    // For default locale (id), use path without prefix
    // For other locales (en), add locale prefix
    return locale === 'id' ? path : `/${locale}${path}`
  };

  return (
    <Disclosure>
      {({ open }) => (
        <div className="flex flex-wrap items-center justify-between w-full xl:w-auto">
          <Link href={createLocalizedHref(logo.href)}>
            <span className="flex items-center space-x-2 text-2xl font-medium text-indigo-500 dark:text-gray-100">
              <span>
                <StrapiImage
                  src={logo.image.url}
                  alt={logo.image.alternativeText || logo.image.name}
                  width={32}
                  height={32}
                  className="w-8"
                />
              </span>
              <span>{logo.text}</span>
            </span>
          </Link>

          {/* Hamburger button for mobile and tablet (xl breakpoint and below) */}
          <DisclosureButton
            aria-label="Toggle Menu"
            className="px-2 py-1 ml-auto text-gray-500 rounded-md xl:hidden focus:outline-none dark:text-gray-300 dark:focus:bg-trueGray-700"
          >
            <svg
              className="w-6 h-6 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              {open && (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                />
              )}
              {!open && (
                <path
                  fillRule="evenodd"
                  d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                />
              )}
            </svg>
          </DisclosureButton>

          {/* Use Transition component for smooth animations */}
          <Transition
            show={open}
            enter="transition duration-300 ease-out"
            enterFrom="transform opacity-0 -translate-y-3"
            enterTo="transform opacity-100 translate-y-0"
            leave="transition duration-300 ease-in"
            leaveFrom="transform opacity-100 translate-y-0"
            leaveTo="transform opacity-0 -translate-y-3"
          >
            <div className="absolute top-full left-0 right-0 z-50 w-full bg-white dark:bg-gray-900 shadow-lg xl:hidden">
              <DisclosurePanel className="w-full">
                <div className="flex flex-col space-y-4 px-6 pb-5 max-h-[70vh]">
                  {navigation.map((item, index) => (
                    <Link
                      key={index}
                      href={createLocalizedHref(item.href)}
                      className="py-2 text-lg text-gray-700 dark:text-gray-300 focus:outline-none border-b border-gray-300"
                    >
                      {item.text}
                    </Link>
                  ))}
                  <Link
                    href={createLocalizedHref(cta.href)}
                    target={cta.external ? "_blank" : "_self"}
                    className="w-full px-6 py-3 mt-2 text-center text-white bg-[#FB4D46] rounded-md"
                  >
                    {cta.text}
                  </Link>
                  
                  {/* Display additional content (LocaleSwitch and ThemeChanger) on mobile and tablet */}
                  {mobileExtras}
                </div>
              </DisclosurePanel>
            </div>
          </Transition>
        </div>
      )}
    </Disclosure>
  );
}