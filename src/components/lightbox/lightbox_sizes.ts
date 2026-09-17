/** 拡大画像は、画面の幅と、画面の高さに収まる幅のどちらも超えない */
export const lightboxSizes = (width: number, height: number) =>
  `min(100vw, 100vh * ${width / height})`
