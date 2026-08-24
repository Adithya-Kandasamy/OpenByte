/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  devIndicators: false,
  agentRules: false,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
