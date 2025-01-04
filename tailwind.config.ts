import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "node_modules/@bitcoin-dev-project/bdp-ui/dist/**/*.{js,mjs,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
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
          "custom-1400": "#ACACAC",
          "custom-1500": "#DBDBDB",
          "custom-1600": "#BEBEBE",
          "custom-1700": "#737373",
          "custom-1800": "#616161",
          "custom-1900": "#9B9B9B",
          "custom-2000": "#B2AFAC",
          "custom-2100": "#3D3D3D",
        },
        blue: {
          "custom-100": "#2A58FE",
          "custom-200": "#2A66FF",
          "custom-300": "#F0F1FA",
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
          "custom-900": "#FFF1E3",
          "custom-1000": "#FCEDED",
        },
        purple: {
          "custom-100": "#F2F0FF",
          "custom-200": "#7B66FF",
        },
        "custom-black": {
          "custom-100": "#292929",
          "custom-200": "#202020",
          "custom-300": "#464646",
          "custom-400": "#525252",
          "custom-500": "#0B0A0A",
        },
        pink: {
          "custom-100": "#FCEDF3",
        },
        green: {
          "custom-100": "#ECF9F1",
        },
        custom: {
          "primary-text": "#292929",
          "accent": "var(--accent)",
          "white": "#F2F2F2",
        },
        dark: {
          "custom-100": "#141414",
          "custom-200": "#1A1A18",
          "custom-500": "#2C2C2E",
          "custom-600": "#1C1C1E",
        },
        brown: {
          "custom-100": "#483929",
        },
      },
      fontFamily: {
        brawler: ["var(--brawler-font)"],
        inter: ["var(--inter-font)"],
        "basis-mono": ["Basis Grotesque Mono Pro"],
      },
      keyframes: {
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '.5' },
        },
      },
      animation: {
        pulse: 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};
export default config;
