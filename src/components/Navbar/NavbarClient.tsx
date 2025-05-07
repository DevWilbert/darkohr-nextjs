'use client'

import Link from "next/link";
import ThemeChanger from "../DarkSwitch";
import { DisclosureClient } from "@/components/DisclosureClient";
import LocaleSwitch from "../LocaleSwitch";
import { NavbarData } from "./NavbarData";

interface NavbarClientProps {
  data: NavbarData;
  locale: string;
}

export default function NavbarClient({ data, locale }: NavbarClientProps) {
  const navigation = data.topnav.link;
  const cta = data.topnav.cta;

  // Fungsi untuk membuat URL yang tepat berdasarkan locale
  const createLocalizedHref = (path: string) => {
    // Untuk locale default (id), gunakan path tanpa prefix
    // Untuk locale lain (en), tambahkan prefix locale
    return locale === 'id' ? path : `/${locale}${path}`
  };

  return (
    <div className="w-full">
      <nav className="container relative flex flex-wrap items-center justify-between p-8 mx-auto lg:justify-between xl:px-0">
        {/* Logo dan Mobile/Tablet Menu */}
        <DisclosureClient
          topnav={data.topnav}
          locale={locale}
          mobileExtras={
            <>
              <div className="flex flex-col gap-4 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center">
                  <LocaleSwitch currentLocale={locale} />
                  <div className="ml-4">
                    <ThemeChanger />
                  </div>
                </div>
              </div>
            </>
          }
        />

        {/* nav menu - tampil hanya di ukuran xl ke atas */}
        <div className="hidden text-center xl:flex xl:items-center">
          <ul className="items-center justify-end flex-1 pt-6 list-none xl:pt-0 xl:flex">
            {navigation.map((menu, index) => (
              <li className="mr-3 nav__item" key={index}>
                <Link
                  href={createLocalizedHref(menu.href)}
                  className="inline-block px-4 py-2 text-lg font-normal text-gray-800 no-underline rounded-md dark:text-gray-200 hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none dark:focus:bg-gray-800"
                >
                  {menu.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA, LocaleSwitch & ThemeChanger - tampil hanya di ukuran xl ke atas */}
        <div className="hidden mr-3 space-x-4 xl:flex nav__item">

          <Link
            href={cta.href}
            className="group relative px-6 py-2 text-[#FB4D46] border-2 border-[#FB4D46] rounded-md md:ml-5 inline-flex items-center overflow-hidden transition-colors duration-300"
            target={cta.external ? "_blank" : "_self"}
          >
            <span className="absolute inset-0 w-0 bg-[#FB4D46] transition-all duration-300 ease-out group-hover:w-full"></span>
            <span className="relative z-10 group-hover:text-white transition-colors duration-300">{cta.text}</span>
          </Link>
          <LocaleSwitch currentLocale={locale} />
          <ThemeChanger />
        </div>
      </nav>
    </div>
  );
}