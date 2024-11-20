/** @type {import('next').NextConfig} */
import { withContentlayer } from "next-contentlayer2";
const nextConfig = {
  rewrites: async () => {
    return {
      fallback: [
        {
          source: "/:path*.:ext([^/]+)", // intercept all paths ending with a file extension
          destination: "/gh-pages/:path*.:ext", // rewrite to gh-pages/[path_here].ext
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
          source: "/:path((?!.*\\.[^/]+).*)", // Matches paths without a file extension
          destination: "/transcript/:path*", // Rewrite to /transcripts/[path...]
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
      ],
    };
  },
};

export default withContentlayer(nextConfig);
