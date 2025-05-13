"use client";

import {
  Disclosure,
  DisclosurePanel,
  DisclosureButton,
  Transition
} from "@headlessui/react";

import Link from "next/link";
import { StrapiImage } from "./StrapiImage";
import { useEffect, useState } from "react";
import ThemeChanger from "./DarkSwitch";
import LocaleSwitch from "./LocaleSwitch";

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
}

export function DisclosureClient({ topnav, locale = 'id' }: Readonly<DisclosureClientProps>) {
  const navigation = topnav.link;
  const logo = topnav.logoLink;
  const cta = topnav.cta;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to create proper URL based on locale
  const createLocalizedHref = (path: string) => {
    // For default locale (id), use path without prefix
    // For other locales (en), add locale prefix
    return locale === 'id' ? path : `/${locale}${path}`
  };

  // Effect to manage body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      // Disable scroll on body
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100%';
    } else {
      // Re-enable scroll on body
      document.body.style.overflow = '';
      document.body.style.height = '';
    }

    // Cleanup function to ensure scroll is re-enabled when component unmounts
    return () => {
      document.body.style.overflow = '';
      document.body.style.height = '';
    };
  }, [isMenuOpen]);

  return (
    <Disclosure>
      {({ open, close }) => {
        // Update our state when the Disclosure's open state changes
        // This is safe because it's not a hook, just a regular state update
        if (open !== isMenuOpen) {
          setIsMenuOpen(open);
        }

        return (
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
                <span className="text-[#FB4D46]">{logo.text}</span>
              </span>
            </Link>

            {/* Hamburger button for mobile and tablet (xl breakpoint and below) */}
            <DisclosureButton
              aria-label="Toggle Menu"
              className="px-2 py-1 ml-auto text-gray-500 rounded-md xl:hidden focus:outline-none dark:text-gray-300 dark:focus:bg-trueGray-700 z-50"
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

            {/* Full screen mobile menu with transition */}
            <Transition
              show={open}
              enter="transition duration-300 ease-out"
              enterFrom="transform opacity-0"
              enterTo="transform opacity-100"
              leave="transition duration-200 ease-in"
              leaveFrom="transform opacity-100"
              leaveTo="transform opacity-0"
            >
              <div className="fixed inset-0 z-40 bg-white dark:bg-gray-900 xl:hidden">
                <DisclosurePanel static className="w-full h-full">
                  <div className="flex flex-col px-6 pt-20 pb-5 h-full overflow-hidden">
                    <div className="flex-1 overflow-y-auto">
                      <Link
                        href={locale == 'id' ? '/' : '/en'}
                        className="block py-4 text-xl text-gray-700 dark:text-gray-300 focus:outline-none border-b border-gray-300"
                        onClick={() => close()} // Close menu when nav link is clicked
                      >
                        Home
                      </Link>
                      {navigation.map((item, index) => (
                        <Link
                          key={index}
                          href={createLocalizedHref(item.href)}
                          className="block py-4 text-xl text-gray-700 dark:text-gray-300 focus:outline-none border-b border-gray-300"
                          onClick={() => close()} // Close menu when nav link is clicked
                        >
                          {item.text}
                        </Link>
                      ))}
                      <Link
                        href={createLocalizedHref(cta.href)}
                        target={cta.external ? "_blank" : "_self"}
                        className="block w-full px-6 py-4 mt-4 text-center text-white bg-[#FB4D46] rounded-md"
                        onClick={() => close()} // Close menu when CTA button is clicked
                      >
                        {cta.text}
                      </Link>

                      {/* LocaleSwitch and ThemeChanger */}
                      <div className="flex flex-col gap-4 pt-6 dark:border-gray-700">
                        <div className="flex justify-end items-center">
                          <ThemeChanger />
                          <div className="ml-4">
                            <LocaleSwitch currentLocale={locale} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </DisclosurePanel>
              </div>
            </Transition>
          </div>
        );
      }}
    </Disclosure>
  );
}


