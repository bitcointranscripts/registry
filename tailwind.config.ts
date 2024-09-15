import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        gray: {
          "custom-100": "#FAFAFA",
          "custom-200": "#858585",
          "custom-300": "#B5B5B5",
          "custom-400": "#BFBFBF",
          "custom-500": "#EBEBEB",
          "custom-600": "#A3A3A3",
          "custom-700": "#F0F0F0",
          "custom-800": "#808080",
          "custom-900": "#F7F7F7",
          "custom-1000": "#656565",
          "custom-1100": "#4D4D4D",
          "custom-1200": "#CCCCCC",
          "custom-1300": "#E6E6E6",
          "custom-1400": "#ACACAC"
        },
        blue: {
          "custom-100": "#2A58FE",
        },
        orange: {
          "custom-100": "#F7931A",
          "custom-200": "#FFF5EB",
          "custom-300": "#E0E0E0",
          "custom-400": "#E68108",
          "custom-500": "#FEF6EB",
          "custom-600": "#FADEB7",
          "custom-700": "#FFF0E0",
          "custom-800": "#FFF7F0",
          "custom-900": "#FFF1E3"
        },
        purple: {
          "custom-100": "#F2F0FF",
          "custom-200": "#7B66FF",
        },
        "custom-black": {
          "custom-100": "#292929",
          "custom-200": "#202020",
          "custom-300": "#464646"
        },
      },
      fontFamily: {
        brawler: ["var(--brawler-font)"],
        inter: ["var(--inter-font)"],
      },
    },
  },
  plugins: [],
};
export default config;
