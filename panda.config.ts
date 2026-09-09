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
      keyframes: {
        // Material の fade パターン。入るときだけ 80% から拡大する
        // opacity は % で書く。`1` は Material のステートレイヤの
        // トークン（0.05）に解決されてしまう
        'lightbox-surface-in': {
          from: { opacity: '0%', scale: '0.8' },
          to: { opacity: '100%', scale: '1' },
        },
      },
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

    // 尺と曲線は (モード × 向き) の 4 通り。組み合わせを CSS 側で展開すると
    // 片方だけ直し忘れて食い違うので、lightbox.tsx が決めて :root に書く。
    // 属性が付くのは拡大表示の遷移中だけなので、他の遷移には掛からない
    ':root[data-lightbox-transition]::view-transition-group(*), :root[data-lightbox-transition]::view-transition-old(*), :root[data-lightbox-transition]::view-transition-new(*)':
      {
        animationDuration: 'var(--lightbox-duration)',
        animationTimingFunction: 'var(--lightbox-easing)',
      },

    // 既定の plus-lighter は下の層と足し合わさるので、退場のフレームが
    // 白茶けて浮いて見える。素直な alpha 合成にする
    '::view-transition-old(lightbox), ::view-transition-new(lightbox), ::view-transition-old(lightbox-surface), ::view-transition-new(lightbox-surface)':
      {
        mixBlendMode: 'normal',
      },

    // 焦点要素を使わないときは Material の fade パターン。入るときだけ 80% から
    ":root[data-lightbox-mode='surface']::view-transition-new(lightbox-surface)":
      {
        animationName: 'lightbox-surface-in',
        animationFillMode: 'both',
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
