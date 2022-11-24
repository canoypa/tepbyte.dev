const { fontFamily } = require("tailwindcss/defaultTheme");

const lineClampPlugin = require("@tailwindcss/line-clamp");

const m3Plugin = require("tailwindcss-material3-plugin").default({
  sourceColor: 0x8282f4,
});

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        comfortaa: ["var(--font-comfortaa)", ...fontFamily.sans],
      },
    },
  },
  plugins: [lineClampPlugin, m3Plugin],
};
