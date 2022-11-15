/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        accent: "#F5CB5C",
        primary: "#18181c",
        "primary-darker": "#101014",
        secondary: "#cfdbd5",
      },
    },
  },
  plugins: [],
};
