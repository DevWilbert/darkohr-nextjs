"use client";

import {
  Disclosure,
  DisclosurePanel,
  DisclosureButton,
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



export function DisclosureClient({ topnav, locale = '', mobileExtras }: Readonly<DisclosureClientProps>) {
  const navigation = topnav.link;
  const logo = topnav.logoLink;
  const cta = topnav.cta;

  // Fungsi untuk membuat URL yang tepat berdasarkan locale
  const createLocalizedHref = (path: string) => {
    // Untuk locale default (id), gunakan path tanpa prefix
    // Untuk locale lain (en), tambahkan prefix locale
    return locale === 'id' ? path : `/${locale}${path}`
  };

  return (
    <Disclosure>
      {({ open }) => (
        <div className="flex flex-wrap items-center justify-between w-full xl:w-auto">
          {/* <Link href={`/${locale}${logo.href}` || "/"}> */}
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

          {/* Tombol hamburger tampil di mobile dan tablet (xl ke bawah) */}
          <DisclosureButton
            aria-label="Toggle Menu"
            className="px-2 py-1 ml-auto text-gray-500 rounded-md xl:hidden hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none dark:text-gray-300 dark:focus:bg-trueGray-700"
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

          {/* Panel disclosure untuk mobile dan tablet */}
          <DisclosurePanel className="flex flex-wrap w-full my-5 xl:hidden">
            <>
              {navigation.map((item, index) => (
                <Link
                  key={index}
                  href={`/${locale}${item.href}`}
                  className="w-full px-4 py-2 -ml-4 text-gray-500 rounded-md dark:text-gray-300 hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 dark:focus:bg-gray-800 focus:outline-none"
                >
                  {item.text}
                </Link>
              ))}
              <Link
                href={`/${locale}${cta.href}`}
                target={cta.external ? "_blank" : "_self"}
                className="w-full px-6 py-2 mt-3 text-center text-white bg-indigo-600 rounded-md"
              >
                {cta.text}
              </Link>
              
              {/* Menampilkan konten tambahan (LocaleSwitch dan ThemeChanger) di mobile dan tablet */}
              {mobileExtras}
            </>
          </DisclosurePanel>
        </div>
      )}
    </Disclosure>
  );
}