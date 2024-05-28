/* eslint-disable import/no-commonjs */
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: [
    require("tailwindcss"),
    require("autoprefixer"),
    require("postcss-pxtorem"),
  ],
};

module.exports = config;
