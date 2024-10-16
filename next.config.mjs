/** @type {import('next').NextConfig} */
import { withContentlayer } from "next-contentlayer2";
const nextConfig = {
  rewrites: async () => {
    return {
      fallback: [
        {
          source: '/:path*.:ext([^/]+)', // intercept all paths ending with a file extension
          destination: '/gh-pages/:path*.:ext', // rewrite to gh-pages/[path_here].ext
        },
        {
          source: "/transcripts",
          destination: "/gh-pages/index.html",
        },
        {
          source: "/types",
          destination: "/gh-pages/categories/index.html",
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
