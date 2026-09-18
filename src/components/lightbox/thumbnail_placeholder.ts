/**
 * 拡大画像の読み込みを待つあいだ、開いたサムネイルを下に敷く。
 * サムネイルは同じ写真の縮小なので、blurhash より本物に近く、キャッシュから即座に出る。
 * 剥がすのは blurhash の仕組みに任せる。blurhash の無い画像には敷かない。
 */

for (const dialog of document.querySelectorAll<HTMLDialogElement>(
  'dialog[data-lightbox]',
)) {
  dialog.addEventListener('beforetoggle', (event) => {
    if (event.newState !== 'open') return

    const image = dialog.querySelector<HTMLImageElement>(
      'figure > img[data-blurhash]',
    )
    if (!image || image.complete) return

    const thumbnail = document.querySelector<HTMLImageElement>(
      `[command="show-modal"][commandfor="${CSS.escape(dialog.id)}"] img`,
    )
    // 読み込めていないサムネイルは敷いても出ない。blurhash のままにする
    if (!thumbnail?.complete || thumbnail.naturalWidth === 0) return

    const layers = [
      `url("${thumbnail.currentSrc}")`,
      image.style.backgroundImage,
    ]
    image.style.backgroundImage = layers.filter(Boolean).join(', ')
  })
}
