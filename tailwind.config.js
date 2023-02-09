const { fontFamily } = require("tailwindcss/defaultTheme");

const lineClampPlugin = require("@tailwindcss/line-clamp");
const plugin = require("tailwindcss/plugin");

const m3Plugin = require("tailwindcss-material3-plugin").Material3Plugin({
  sourceColor: 0x8282f4,
  customColors: [
    { name: "info", value: 0x42a5f5, blend: true },
    { name: "warning", value: 0xffee58, blend: true },
    { name: "success", value: 0x66bb6a, blend: true },
  ],
});

const utilPlugin = plugin(({ addUtilities, matchUtilities, theme }) => {
  // inline margin/padding
  matchUtilities(
    {
      "mi": (value) => ({ "margin-inline": `${value} ${value}` }),
      "mis": (value) => ({ "margin-inline-start": `${value}` }),
      "mie": (value) => ({ "margin-inline-end": `${value}` }),

      "pi": (value) => ({ "padding-inline": `${value} ${value}` }),
      "pis": (value) => ({ "padding-inline-start": `${value}` }),
      "pie": (value) => ({ "padding-inline-end": `${value}` }),
    },
    { values: theme('spacing') }
  );

  // scrollbar
  addUtilities({
    ".scrollbar-thin": {
      "scrollbar-width": "thin",
      "&::-webkit-scrollbar": { width: "8px", height: "8px", "background-color": theme("colors.dark.surface-variant") },
      "&::-webkit-scrollbar-thumb": { "background-color": theme("colors.dark.secondary") }
    },
    ".scrollbar-none": {
      "scrollbar-width": "none",
      "&::-webkit-scrollbar": { display: "none", }
    }
  })
})

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
  plugins: [lineClampPlugin, utilPlugin, m3Plugin],
};
