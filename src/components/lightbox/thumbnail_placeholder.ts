/**
 * 拡大画像の読み込み中、blurhash の代わりに、クリックされたサムネイルを背景画像にする。
 * サムネイルは同じ写真の縮小版としてすでに読み込まれているため、ぼかしと違い、拡大画像の読み込みを待たずに写真の内容が分かる。
 */

for (const dialog of document.querySelectorAll<HTMLDialogElement>(
  'dialog[data-lightbox]',
)) {
  const image = dialog.querySelector<HTMLImageElement>(
    'figure > img[data-blurhash]',
  )
  if (!image) continue
  // 開くたびに現在の背景画像に追加すると、読み込み前に開き直したとき同じサムネイルが重複して重なる
  const blurhash = image.style.backgroundImage

  dialog.addEventListener('command', (event) => {
    const { command, source } = event as CommandEvent
    if (command !== 'show-modal' || image.complete) return

    const thumbnail = source?.querySelector('img')
    if (!thumbnail?.complete || thumbnail.naturalWidth === 0) return

    image.style.backgroundImage = `url("${thumbnail.currentSrc}"), ${blurhash}`
  })
}
