/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
      },
      // Production - Strapi di hosting
      {
        protocol: 'https',
        hostname: 'cms.example.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/id',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;