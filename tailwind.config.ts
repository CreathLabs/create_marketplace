import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        mainGray: "#868686",
        grayTwo: "#F6F6F6",
        navyBlue: "#1E1265",
      },
      fontFamily: {
        Playfair: ["Playfair Display", "serif"],
        Manrope: ["Manrope", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
