/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["us-east-1.storage.xata.sh"],
  },
};

module.exports = {
  ...nextConfig,
  async rewrites() {
    return [
      {
        source: "/blog/:path*",
        destination: "https://blogpuros.wordpress.com/:path*",
      },
    ];
  },
};
