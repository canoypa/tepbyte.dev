import { defineConfig } from '@pandacss/dev'
import { colord } from 'colord'
import { presetMaterialTokens } from 'pandacss-preset-material-tokens'

export default defineConfig({
  // The output directory for your css system
  outdir: 'lib/generated/pandacss',

  // Where to look for your css declarations
  include: ['./src/**/*.{ts,tsx}'],
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
    body: {
      backgroundColor: 'dark.surface',
      color: 'dark.on-surface',
      fill: 'dark.on-surface',
    },
    ':focus-visible': {
      outlineWidth: 2,
      outlineStyle: 'solid',
      outlineColor: 'dark.primary',
      outlineOffset: 2,
    },
  },

  utilities: {
    extend: {
      backgroundWithAlpha_EXPERIMENTAL: {
        property: 'backgroundColor',
        className: 'background-with-alpha-experimental',
        values: { type: 'string' },
        transform: (value, { token }) => {
          if (!/.+\/.+/.test(value)) return {}

          const [color, opacity] = value.split('/')

          const colorToken = token.raw(`colors.${color}`)?.value ?? color
          const opacityToken = token.raw(`opacity.${opacity}`)?.value ?? opacity

          const colorValue = colorToken
          const opacityValue = !isNaN(Number(opacityToken))
            ? Number(opacityToken)
            : 1

          return {
            backgroundColor: colord(colorValue)
              .alpha(opacityValue)
              .toRgbString(),
          }
        },
      },
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
