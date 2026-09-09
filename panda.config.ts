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
          comfortaa: {
            value: 'var(--font-comfortaa), var(--font-kosugi-maru), sans-serif',
          },
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

    // view transition の UA 既定は 250ms / ease。サムネイルから拡大表示への
    // 大きな遷移には短いので、M3 の long 帯 + emphasized に乗せる。
    // globalCss ではトークン参照（durations.long-2）が落ちるので var() で直に引く
    '::view-transition-group(*), ::view-transition-old(root), ::view-transition-new(root)':
      {
        animationDuration: 'var(--durations-long-2)',
        animationTimingFunction: 'var(--easings-emphasized)',
      },
    // 退出は一段短く
    ":root[data-lightbox-transition='closing']::view-transition-group(lightbox), :root[data-lightbox-transition='closing']::view-transition-old(root), :root[data-lightbox-transition='closing']::view-transition-new(root)":
      {
        animationDuration: 'var(--durations-medium-4)',
      },

    // 既定の ::view-transition-old/new はグループ矩形いっぱいに object-fit: fill で
    // 引き伸ばされるので、サムネイルと拡大表示で縦横比が違うと像が歪む。両者を
    // cover に揃えて歪みを止め、クロスフェード（不透明度が下がった瞬間に背後が
    // 透ける）も止める。overflow: clip が要るのは、この擬似要素の overflow 初期値が
    // visible で、cover ではみ出した分がそのまま矩形の外に描かれるため。clip すると
    // スナップショットに焼かれた角丸ごと落ちるので掛け直す
    '::view-transition-old(lightbox), ::view-transition-new(lightbox)': {
      height: '100%',
      objectFit: 'cover',
      overflow: 'clip',
      borderRadius: 'var(--lightbox-radius)',
      animation: 'none',
      mixBlendMode: 'normal',
    },

    // 閉じるときの new はサムネイルのスナップショット。縦横比が違うと中央だけが
    // 引き伸ばされ、画像が一段拡大して見える。全体を持つ old はどの矩形比でも
    // 切り抜きが正しいので、閉じる間は old だけを見せる
    ":root[data-lightbox-transition='closing']::view-transition-new(lightbox)":
      {
        opacity: 0,
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
