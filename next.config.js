/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['assets.coingecko.com'],
    unoptimized: true,
  },
};

module.exports = nextConfig;
