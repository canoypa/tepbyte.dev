import { defineConfig } from '@pandacss/dev'
import { presetMaterialTokens } from 'pandacss-preset-material-tokens'

export default defineConfig({
  // The output directory for your css system
  outdir: 'lib/generated/pandacss',

  // Where to look for your css declarations
  include: ['./src/**/*.{ts,tsx,astro}'],
  // Files to exclude
  exclude: [],

  // Whether to use css reset
  preflight: true,

  // Useful for theme customization
  theme: {
    extend: {
      tokens: {
        fonts: {
          comfortaa: { value: 'var(--font-comfortaa)' },
        },
      },
    },
  },

  conditions: {
    extend: {
      groupHorizontal: '.group:is([data-orientation=horizontal]) &',
      groupVertical: '.group:is([data-orientation=vertical]) &',
    },
  },

  globalCss: {
    '@supports (word-break: auto-phrase)': {
      '*': {
        wordBreak: 'auto-phrase',
      },
    },
    ':root': {
      scrollbarGutter: 'stable',
      scrollBehavior: 'smooth',
      WebkitTapHighlightColor: 'transparent',
    },
    body: {
      minHeight: '100vh',
      backgroundColor: 'dark.surface',
      color: 'dark.on-surface',
      fill: 'dark.on-surface',

      _osLight: {
        backgroundColor: 'light.surface',
        color: 'light.on-surface',
        fill: 'light.on-surface',
      },
    },
    ':focus-visible': {
      outlineWidth: 2,
      outlineStyle: 'solid',
      outlineColor: { base: 'dark.primary', _osLight: 'light.primary' },
      outlineOffset: 2,
    },
  },

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
