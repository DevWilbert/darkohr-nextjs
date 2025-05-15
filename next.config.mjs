/** @type {import('next').NextConfig} */

const nextConfig = () => {
  const protocol = process.env.NEXT_PUBLIC_STRAPI_PROTOCOL || 'http'; // Default ke http jika tidak ada
  const hostname = process.env.NEXT_PUBLIC_STRAPI_HOST || 'localhost'; // Default ke localhost
  const port = process.env.NEXT_PUBLIC_STRAPI_PORT || '5000';  // Default ke 5000

  return {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "placehold.co",
        },
        {
          protocol,
          hostname,
          port,
        // Production - Strapi di hosting
        },
        {
          protocol: 'https',
          hostname: 'cms.example.com',
        },
      ],
      unoptimized: process.env.NODE_ENV === 'production',
    },
  };
};

export default nextConfig;



