/**
 * 閉じる経路をすべて受け、退場の transition が終わってから close() する。
 *
 * 先に close() すると、`overlay` の transition に未対応の Safari では
 * `::backdrop` がすぐに消え、scrim だけ退場を待たずに消える。
 *
 * `closedby` は beforetoggle が cancelable でなく退場を挟めないので使わず、
 * scrim のクリックもここで受ける。
 */

const closeAfterExit = async (dialog: HTMLDialogElement) => {
  if (dialog.dataset.lightboxClosing !== undefined) return
  dialog.dataset.lightboxClosing = ''

  // getAnimations() はスタイルを flush するので、印を立てた直後でも退場の transition が取れる
  await Promise.allSettled(dialog.getAnimations().map((a) => a.finished))

  // 待っているあいだに開き直されていれば、印が外されている
  if (dialog.dataset.lightboxClosing === undefined) return
  delete dialog.dataset.lightboxClosing
  dialog.close()
}

for (const dialog of document.querySelectorAll<HTMLDialogElement>(
  'dialog[data-lightbox]',
)) {
  dialog.addEventListener('command', (event) => {
    switch ((event as Event & { command?: string }).command) {
      case 'close':
        event.preventDefault()
        closeAfterExit(dialog)
        break
      case 'show-modal':
        // 退場中に開き直された。dialog は開いたままなので、印を外せば戻る
        delete dialog.dataset.lightboxClosing
        break
    }
  })

  // Esc。既定の動作では退場を待たずに閉じる
  dialog.addEventListener('cancel', (event) => {
    event.preventDefault()
    closeAfterExit(dialog)
  })

  // scrim。::backdrop へのクリックは dialog 自身に届く
  let pressedScrim = false

  dialog.addEventListener('pointerdown', (event) => {
    // 主ボタンだけ。右クリックでコンテキストメニューを出そうとしただけで閉じないように
    pressedScrim = event.button === 0 && event.target === dialog
  })

  dialog.addEventListener('pointerup', (event) => {
    // 押下と離上の両方が scrim のときだけ。画像から scrim へドラッグしただけで閉じないように
    const dismissed = pressedScrim && event.target === dialog
    pressedScrim = false
    if (dismissed) closeAfterExit(dialog)
  })
}
