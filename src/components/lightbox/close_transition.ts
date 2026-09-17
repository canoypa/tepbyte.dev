/**
 * 先に close() すると、`overlay` の transition に未対応の Safari では
 * `::backdrop` がすぐに消え、scrim だけ退場を待たずに消える。
 *
 * `closedby` は beforetoggle が cancelable でなく、退場を挟めない。
 */

const closeAfterExit = async (dialog: HTMLDialogElement) => {
  if (dialog.dataset.lightboxClosing !== undefined) return
  dialog.dataset.lightboxClosing = ''

  // getAnimations() はスタイルを flush するので、印を立てた直後でも退場の transition が取れる。
  // subtree を付けないと ::backdrop と figure の transition が入らない
  await Promise.allSettled(
    dialog.getAnimations({ subtree: true }).map((a) => a.finished),
  )

  delete dialog.dataset.lightboxClosing
  dialog.close()
}

for (const dialog of document.querySelectorAll<HTMLDialogElement>(
  'dialog[data-lightbox]',
)) {
  dialog.addEventListener('command', (event) => {
    if ((event as CommandEvent).command !== 'close') return
    event.preventDefault()
    closeAfterExit(dialog)
  })

  // Esc。既定の動作では退場を待たずに閉じる
  dialog.addEventListener('cancel', (event) => {
    event.preventDefault()
    closeAfterExit(dialog)
  })

  const dismissible = (target: EventTarget | null) =>
    target instanceof Element && !target.closest('button, figcaption')

  let pressed = false

  dialog.addEventListener('pointerdown', (event) => {
    // 主ボタンだけ。右クリックでコンテキストメニューを出そうとしただけで閉じないように
    pressed = event.button === 0 && dismissible(event.target)
  })

  dialog.addEventListener('pointerup', (event) => {
    // 押下と離上の両方を見る。ドラッグして離しただけで閉じないように
    const dismissed = pressed && dismissible(event.target)
    pressed = false
    if (dismissed) closeAfterExit(dialog)
  })
}
