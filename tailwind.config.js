/* eslint-disable import/no-commonjs */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/index.html", "./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "#9499C3",
        green: "#00CF67",
        red: "#EB5757",
        "gray-second": "#242538",
        "icon-active": "#38D9A9",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
