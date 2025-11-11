/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0E4C6E",
        gradient2: "#1A936F",
        accent: "#A1E8AF",
        darkText: "#1C1C1C",
        subText: "#2F4858",
        background: "#F8FAFC",
      },
    },
  },
  plugins: [],
};

export default config;
