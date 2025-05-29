/** @type {import('next').NextConfig} */
/** next.config.js */
import { withContentlayer } from "next-contentlayer2";

const nextConfig = {
  rewrites: async () => ({
    beforeFiles: [
      {
        source: "/transcript-images/:path*.:ext(png|jpe?g|webp|svg|gif)",
        destination: "/bitcoin-transcript/:path*.:ext",
      },
    ],
    fallback: [
      {
        source: "/sources.json",
        destination: "/gh-pages/sources.json",
      },
      {
        source: "/status.json",
        destination: "/gh-pages/status.json",
      },
      {
        source: "/:path((?!.*\\.[a-zA-Z0-9]{1,4}$).*)",
        destination: "/transcript/:path*",
      },
    ],
  }),
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        pathname: "/**",
      },
    ],
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};

export default withContentlayer(nextConfig);
