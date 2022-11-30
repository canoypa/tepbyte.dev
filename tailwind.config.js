const { fontFamily } = require("tailwindcss/defaultTheme");

const lineClampPlugin = require("@tailwindcss/line-clamp");

const m3Plugin = require("tailwindcss-material3-plugin").Material3Plugin({
  sourceColor: 0x6750A4,
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
