/** @type {import('next').NextConfig} */
import exp from "constants";
import { withContentlayer } from "next-contentlayer2";
const nextConfig = {
  rewrites: async () => {
    return {
      fallback: [
        {
          source: "/:path*.:ext([a-zA-Z0-9_+]{1,4})", // Match extensions that are 1-4 AlphaNumeric characters long
          destination: "/gh-pages/:path*.:ext", // Rewrite to gh-pages/[path_here].ext
        },
        {
          source: "/tags/:path",
          destination: "/gh-pages/tags/:path/index.html",
        },
        {
          source: "/speakers/:path",
          destination: "/gh-pages/speakers/:path/index.html",
        },
        {
          source: "/es",
          destination: "/gh-pages/es/index.html",
        },
        {
          source: "/zh",
          destination: "/gh-pages/zh/index.html",
        },
        {
          source: "/pt",
          destination: "/gh-pages/pt/index.html",
        },
        {
          source: "/:path((?!.*\\.[a-zA-Z0-9]{1,4}$).*)", // Matches paths without a valid file extension
          destination: "/transcript/:path*", // Rewrite to /transcripts/[path...]
        },
        {
          source: "/:path*",
          destination: "/gh-pages/:path*/index.html",
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
