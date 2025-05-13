'use client'

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { getStrapiMedia } from "@/lib/utils";

interface LogoCarouselProps {
  data: {
    id: number;
    logoItems: {
      image: {
        url: string;
        alternativeText: string | null;
        name: string;
      };
    }[];
  };
  visibleCount?: number;
  interval?: number;
}

export function LogoCarousel({ data, visibleCount = 6, interval = 3000 }: Readonly<LogoCarouselProps>) {
  // Initialize state first - before any conditional returns
  const [visibleLogos, setVisibleLogos] = useState<typeof data.logoItems>([]);
  
  // Wrap allLogos in useMemo to prevent recreating on each render
  const allLogos = useMemo(() => {
    return data?.logoItems || [];
  }, [data]);
  
  // Move replaceRandomLogo into useCallback to prevent recreation on each render
  const replaceRandomLogo = useCallback(() => {
    if (allLogos.length <= visibleCount) return; // Tidak perlu rotasi jika menampilkan semua logo

    setVisibleLogos((currentLogos) => {
      const newLogos = [...currentLogos];
      // Pilih indeks acak untuk diganti
      const indexToReplace = Math.floor(Math.random() * visibleCount);

      // Cari logo yang tidak sedang ditampilkan
      const availableLogos = allLogos.filter(logo =>
        !currentLogos.some(currentLogo =>
          currentLogo.image?.url === logo.image?.url
        )
      );

      if (availableLogos.length === 0) return currentLogos;

      // Pilih logo acak dari yang tersedia
      const randomLogoIndex = Math.floor(Math.random() * availableLogos.length);
      newLogos[indexToReplace] = availableLogos[randomLogoIndex];

      return newLogos;
    });
  }, [allLogos, visibleCount]);

  // Initialize visible logos - always declare hooks at top level
  useEffect(() => {
    if (allLogos.length > 0) {
      // Mulai dengan 'visibleCount' logo pertama atau semua jika jumlahnya lebih sedikit
      setVisibleLogos(allLogos.slice(0, Math.min(visibleCount, allLogos.length)));
    }
  }, [allLogos, visibleCount]);

  // Set up interval untuk penggantian logo - always declare hooks at top level
  useEffect(() => {
    const timer = setInterval(replaceRandomLogo, interval);
    return () => clearInterval(timer);
  }, [interval, replaceRandomLogo]);

  // Early validation check AFTER all hooks declarations
  if (!data || !data.logoItems || data.logoItems.length === 0) {
    console.log("Data tidak ada atau kosong");
    return null;
  }

  return (
    // Ukuran Gambar di Strapi Harus 512 x 256 
    // Atur grid-cols untuk mau nampilkan berapa logo
    <div className="w-full flex justify-center mt-8 mb-[100px]">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 items-center">
        {visibleLogos.map((logoItem, index) => (
          <div 
            key={`${logoItem.image?.url}-${index}`} 
            className="h-24 relative overflow-hidden"
          >
            <AnimatePresence mode="popLayout">
              <motion.div
                key={logoItem.image?.url}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="flex justify-center items-center h-full"
              >
                {/* Card untuk menampung logo dengan transisi dark/light mode */}
                <div 
                  className="relative p-4 rounded-lg bg-transparent shadow-none 
                           border border-transparent dark:border-white/20 backdrop-blur-sm
                           transition-all duration-300 ease-in-out
                           flex justify-center items-center overflow-hidden
                           before:absolute before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2
                           before:w-0 before:h-0 dark:before:w-[300%] dark:before:h-[300%] 
                           before:bg-white before:rounded-full before:transition-all before:duration-500
                           before:opacity-0 dark:before:opacity-100 before:-z-10"
                >
                  <div className="relative h-16 w-32">
                    {logoItem.image?.url && (
                      <Image
                        src={getStrapiMedia(logoItem.image.url) ?? `https://placehold.co/128x64`}
                        alt={logoItem.image.alternativeText || logoItem.image.name || "Logo"}
                        fill={true}
                        style={{ objectFit: 'contain' }}
                        sizes="128px"
                        className="transition-all duration-300 dark:invert-0 relative z-10"
                      />
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}


