// components/StrapiImage.tsx
import Image from "next/image";
import { getStrapiMedia } from "@/lib/utils";

interface StrapiImageProps {
  src: string | null;
  width: number;
  height: number;
  className?: string;
  alt: string;
}

export function StrapiImage({ src, width, height, className, alt }: StrapiImageProps) {
  // Gunakan custom loader untuk gambar Strapi
  const imgSrc = getStrapiMedia(src);
  
  if (!imgSrc) {
    return null;
  }

  return (
    <Image
      src={imgSrc}
      width={width}
      height={height}
      className={className || ""}
      alt={alt}
      // Tambahkan unoptimized untuk mentrigger download gambar saat build time
      unoptimized={process.env.NODE_ENV === 'production'}
    />
  );
}