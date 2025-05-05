/** @type {import('next').NextConfig} */
const nextConfig = {
  // Aumentar o limite para downloads maiores
  experimental: {
    serverActions: {
      bodySizeLimit: "100mb",
    },
  },
  serverExternalPackages: ["ytdl-core", "@distube/ytdl-core"],
};

module.exports = nextConfig;
