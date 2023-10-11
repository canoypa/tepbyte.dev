import { defineConfig } from '@pandacss/dev'

export default defineConfig({
  // The output directory for your css system
  outdir: 'generated/pandacss',

  // Where to look for your css declarations
  include: ['./src/**/*.{ts,tsx}'],
  // Files to exclude
  exclude: [],

  // Whether to use css reset
  preflight: true,

  // Useful for theme customization
  theme: {},
})
