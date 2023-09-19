/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/containers/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      laptop: { max: "1360px" },
      tablet: { max: "1023px" },
      mobile: { max: "767px" },
      mobileMd: { max: "480px" },
      xs: { max: "328px" },
    },
    extend: {
      padding: {
        desktop: "60px",
        laptop: "40px",
        tablet: "30px",
        mobile: "20px",
      },
    },
  },
  plugins: [],
};
