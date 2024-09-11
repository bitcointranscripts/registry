/** @type {import('next').NextConfig} */
import { withContentlayer } from "next-contentlayer2";
const nextConfig = {
  rewrites: async () => {
    return {
      fallback: [
        {
          source: "/plugins/:path*",
          destination: "/gh-pages/plugins/:path*",
        },
        {
          source: "/:path*",
          destination: "/gh-pages/:path*/index.html",
        },
      ]
    }
  },
};

export default withContentlayer(nextConfig);
