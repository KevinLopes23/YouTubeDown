/** @type {import('next').NextConfig} */
const nextConfig = {
  // Aumentar o limite para downloads maiores
  experimental: {
    serverActions: {
      bodySizeLimit: "100mb",
    },
  },
};

module.exports = nextConfig;
