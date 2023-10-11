import { defineConfig } from '@pandacss/dev'
import { presetMaterialTokens } from 'pandacss-preset-material-tokens'

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

  presets: [
    presetMaterialTokens({
      sourceColor: 0x8282f4,
      customColors: [
        { name: 'info', value: 0x42a5f5, blend: true },
        { name: 'warning', value: 0xffee58, blend: true },
        { name: 'success', value: 0x66bb6a, blend: true },
      ],
    }),
  ],
})
