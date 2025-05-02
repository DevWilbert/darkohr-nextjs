import React from "react";
import { SocialIcon } from "react-social-icons";
import Link from "next/link";
import { Container } from "@/components/Container";
import { getStrapiURL } from "@/lib/utils";
import qs from "qs";
import { StrapiImage } from "./StrapiImage";
import { MapPin, Phone, Mail } from "lucide-react"; // Import ikon untuk kontak

interface FooterProps {
  locale: string;
}

async function loader(locale : string) {
  const { fetchData } = await import("@/lib/fetch");

  const path = "/api/global";
  const baseUrl = getStrapiURL();

  const query = qs.stringify({
    locale : locale,
    populate: {
      footer: {
        populate: {
          logoLink: {
            populate: {
              image: {
                fields: ["url", "alternativeText", "name"]
              },
            },
          },
          colOneLinks: {
            populate: true,
          },
          colTwoLinks: {
            populate: true,
          },
          socialLink: {
            populate: {
              socialLinks: {
                populate: true,
              },
            },
          },
          // Menambahkan populate untuk data kontak
          contactInfo: {
            populate: true,
          },
        },
      },
    },
  });

  const url = new URL(path, baseUrl);
  url.search = query;

  const data = await fetchData(url.href);
  return data;
}

interface FooterData {
  footer: {
    id: number;
    description: string;
    logoLink: {
      id: number;
      text: string;
      href: string;
      image: {
        id: number;
        url: string;
        alternativeText: string | null;
        name: string;
      };
    };
    colOneLinks: {
      id: number;
      href: string;
      text: string;
      external: boolean;
    }[];
    colTwoLinks: {
      id: number;
      href: string;
      text: string;
      external: boolean;
    }[];
    socialLink: {
      id: number;
      heading: string;
      socialLinks: SocialLink[];
    };
    contactInfo: {
      id: number;
      address: string;
      phone: string;
      email: string;
    };
  };
}

interface SocialLink {
  id: number;
  href: string;
  text: string;
  external: boolean;
}

function iconSelect(link: SocialLink) {
  if (!link) return null;
  return (
    <SocialIcon
      network={link.text.toLocaleLowerCase()}
      url={link.href}
      target="_blank"
    />
  );
}

// Komponen untuk informasi kontak
const ContactInfo = ({ address, phone, email } : {address: string, phone: string, email : string}) => {
  return (
    <div className="mt-4 space-y-3 text-gray-500 dark:text-gray-400">
      {address && (
        <div className="flex items-start">
          <MapPin className="w-5 h-5 mr-2 text-indigo-500 shrink-0" />
          <span>{address}</span>
        </div>
      )}
      {phone && (
        <div className="flex items-center">
          <Phone className="w-5 h-5 mr-2 text-indigo-500 shrink-0" />
          <a href={`tel:${phone.replace(/\s+/g, '')}`} className="hover:text-indigo-500">
            {phone}
          </a>
        </div>
      )}
      {email && (
        <div className="flex items-center">
          <Mail className="w-5 h-5 mr-2 text-indigo-500 shrink-0" />
          <a href={`mailto:${email}`} className="hover:text-indigo-500">
            {email}
          </a>
        </div>
      )}
    </div>
  );
};

export async function Footer({locale}: FooterProps) {
  const data = await loader(locale) as FooterData;
  if (!data.footer) return null;
  const footer = data.footer;

  if (!data) return null;

  // Default kontak jika tidak ada di CMS
  const defaultContact = {
    address: "Jl. Example No. 123, Jakarta, Indonesia",
    phone: "+62 123 4567 890",
    email: "info@contoh.com"
  };

  const { logoLink, colOneLinks, colTwoLinks, socialLink, description, contactInfo = defaultContact } =
    footer;

  return (
    <footer className="relative bg-white dark:bg-gray-900 pt-10">
      <Container>
        {/* Membuat grid yang lebih responsif */}
        <div className="grid grid-cols-1 gap-8 pt-10 mx-auto mt-5 border-t border-gray-100 dark:border-trueGray-700 md:grid-cols-2 lg:grid-cols-12">
          {/* Kolom logo dan deskripsi - lebih lebar pada desktop */}
          <div className="md:col-span-2 lg:col-span-4">
            <div>
              <Link
                href={logoLink.href}
                className="flex items-center space-x-2 text-2xl font-medium text-indigo-500 dark:text-gray-100"
              >
                <StrapiImage
                  src={logoLink.image.url}
                  alt={logoLink.image.alternativeText || logoLink.image.name}
                  width={32}
                  height={32}
                  className="w-8"
                />
                <span>{logoLink.text}</span>
              </Link>
            </div>

            <div className="max-w-md mt-4 text-gray-500 dark:text-gray-400">
              {description}
            </div>

            {/* Menambahkan informasi kontak di bawah deskripsi */}
            <ContactInfo 
              address={contactInfo.address} 
              phone={contactInfo.phone} 
              email={contactInfo.email} 
            />
          </div>

          {/* Kolom navigasi pertama */}
          <div className="lg:col-span-2">
            <div className="flex flex-wrap w-full -mt-2 -ml-3 lg:ml-0">
              {colOneLinks &&
                colOneLinks.map((item, index) => (
                  <Link
                    key={index}
                    href={`/${locale}${item.href}`}
                    className="w-full px-4 py-2 text-gray-500 rounded-md dark:text-gray-300 hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none dark:focus:bg-trueGray-700"
                  >
                    {item.text}
                  </Link>
                ))}
            </div>
          </div>

          {/* Kolom navigasi kedua - memperbaiki link yang sebelumnya span */}
          <div className="lg:col-span-2">
            <div className="flex flex-wrap w-full -mt-2 -ml-3 lg:ml-0">
              {colTwoLinks &&
                colTwoLinks.map((item, index) => (
                  <Link
                    key={index}
                    href={`/${locale}${item.href}`}
                    className="w-full px-4 py-2 text-gray-500 rounded-md dark:text-gray-300 hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none dark:focus:bg-trueGray-700"
                  >
                    {item.text}
                  </Link>
                ))}
            </div>
          </div>

          {/* Kolom social media */}
          <div className="lg:col-span-4">
            <div className="text-lg font-medium text-gray-700 dark:text-gray-200">
              {socialLink.heading}
            </div>
            <div className="flex mt-5 space-x-5 text-gray-400 dark:text-gray-500">
              {socialLink.socialLinks &&
                socialLink.socialLinks.map((item, index) => (
                  <div key={index}>
                    <span className="sr-only">{item.text}</span>
                    {iconSelect(item)}
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Copyright section */}
        <div className="py-8 mt-10 text-sm text-center text-gray-600 border-t border-gray-100 dark:border-trueGray-700 dark:text-gray-400">
          Copyright © {new Date().getFullYear()}. Made with ♥ by{" "}
          <a 
            href="https://web3templates.com/" 
            target="_blank" 
            rel="noopener"
            className="hover:text-indigo-500"
          >
            Web3Templates.
          </a>{" "}
          Customized by DarkoHR
        </div>
      </Container>
    </footer>
  );
}