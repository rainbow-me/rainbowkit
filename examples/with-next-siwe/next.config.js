/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['i.pravatar.cc'],
  },
  env: {
    NEXTAUTH_URL: process.env.VERCEL_URL,
  },
};

module.exports = nextConfig;
