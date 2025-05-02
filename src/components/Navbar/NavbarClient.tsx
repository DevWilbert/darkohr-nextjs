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

  return (
    <div className="w-full">
      <nav className="container relative flex flex-wrap items-center justify-between p-8 mx-auto lg:justify-between xl:px-0">
        {/* Logo  */}
        <DisclosureClient topnav={data.topnav} />

        {/* menu  */}
        <div className="hidden text-center lg:flex lg:items-center">
          <ul className="items-center justify-end flex-1 pt-6 list-none lg:pt-0 lg:flex">
            {navigation.map((menu, index) => (
              <li className="mr-3 nav__item" key={index}>
                <Link
                  href={`/${locale}${menu.href}`}
                  className="inline-block px-4 py-2 text-lg font-normal text-gray-800 no-underline rounded-md dark:text-gray-200 hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none dark:focus:bg-gray-800"
                >
                  {menu.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden mr-3 space-x-4 lg:flex nav__item">
          <Link
            href={`/${locale}${cta.href}`}
            className="px-6 py-2 text-white bg-indigo-600 rounded-md md:ml-5"
            target={cta.external ? "_blank" : "_self"}
          >
            {cta.text}
          </Link>
          <LocaleSwitch currentLocale={locale} />
          <ThemeChanger />
        </div>
      </nav>
    </div>
  );
}