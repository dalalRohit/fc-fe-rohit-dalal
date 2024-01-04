/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    windowHistorySupport: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: "image.tmdb.org",
      },
    ],
  },
};

module.exports = nextConfig;
