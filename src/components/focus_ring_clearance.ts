import { css } from '~pandacss/css'

const ring =
  'token(borderWidths.md.focus-indicator.thickness) + token(spacing.md.focus-indicator.outer-offset)'

/**
 * スクロールコンテナは中身のフォーカスリングを見切るので、その分の余白を確保し、
 * レイアウトは負のマージンで戻す
 */
export const focusRingClearance = css.raw({
  padding: `calc(${ring})`,
  margin: `calc((${ring}) * -1)`,
})
