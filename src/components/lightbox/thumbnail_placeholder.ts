/**
 * 拡大画像の読み込みを待つあいだ、開いたサムネイルを下に敷く。
 * サムネイルは同じ写真の縮小なので、blurhash より本物に近く、キャッシュから即座に出る。
 * 剥がすのは blurhash の仕組みに任せる。blurhash の無い画像には敷かない。
 */

for (const dialog of document.querySelectorAll<HTMLDialogElement>(
  'dialog[data-lightbox]',
)) {
  const image = dialog.querySelector<HTMLImageElement>(
    'figure > img[data-blurhash]',
  )
  if (!image) continue
  // 開き直すたびに重ねないよう、元の blurhash を土台に毎回組み直す
  const blurhash = image.style.backgroundImage

  // command は表示より先に届くので、開いた直後から敷ける
  dialog.addEventListener('command', (event) => {
    const { command, source } = event as CommandEvent
    if (command !== 'show-modal' || image.complete) return

    const thumbnail = source?.querySelector('img')
    // 読み込めていないサムネイルは敷いても出ない。blurhash のままにする
    if (!thumbnail?.complete || thumbnail.naturalWidth === 0) return

    image.style.backgroundImage = `url("${thumbnail.currentSrc}"), ${blurhash}`
  })
}
