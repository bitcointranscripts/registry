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
        // {
        //   source: "/sources/:path((?!.*\\.[^/]+).*)", // Matches /source/[any path without a file extension]
        //   destination: "/[...slug]/:path*", // Replace with your catch-all route
        // },
      ],
    };
  },
};

export default withContentlayer(nextConfig);
