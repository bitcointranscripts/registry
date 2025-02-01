/** @type {import('next').NextConfig} */
import { withContentlayer } from "next-contentlayer2";
const nextConfig = {
  rewrites: async () => {
    return {
      fallback: [
        {
          source: "/:path((?!.*\\.[a-zA-Z0-9]{1,4}$).*)", // Matches paths without a valid file extension
          destination: "/transcript/:path*", // Rewrite to /transcripts/[path...]
        },
      ],
    };
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};

export default withContentlayer(nextConfig);
