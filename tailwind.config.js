const { fontFamily } = require("tailwindcss/defaultTheme");

const lineClampPlugin = require("@tailwindcss/line-clamp");

const m3Plugin = require("tailwindcss-material3-plugin").Material3Plugin({
  sourceColor: 0x8282f4,
  customColors: [
    { name: "info", value: 0x42a5f5, blend: true },
    { name: "warning", value: 0xffee58, blend: true },
    { name: "success", value: 0x66bb6a, blend: true },
  ],
});

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx", "./src/**/*.module.scss"],
  theme: {
    extend: {
      fontFamily: {
        comfortaa: ["var(--font-comfortaa)", ...fontFamily.sans],
      },
    },
  },
  plugins: [lineClampPlugin, m3Plugin],
};
