/**
 * 閉じる経路をすべて受け、退場の transition が終わってから close() する。
 *
 * 先に close() すると dialog は top layer から出る。Safari は `overlay` の
 * transition に未対応で、top layer の外では `::backdrop` が生成されないため、
 * scrim だけ最初のフレームで消える。
 *
 * `closedby` は beforetoggle が cancelable でなく退場を挟めないので使わず、
 * scrim のクリックもここで受ける。
 */

const closeAfterExit = async (dialog: HTMLDialogElement) => {
  if (dialog.dataset.lightboxClosing !== undefined) return
  dialog.dataset.lightboxClosing = ''

  // getAnimations() はスタイルを flush するので、印を立てた直後でも退場の
  // transition が取れる。transition が無い環境では空が返り、待たずに閉じる
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
        // 退場中に押し直された。開いている dialog への showModal() は
        // 例外なく空振りするだけなので、印を外して開いた状態へ戻す
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
    // 主ボタンだけ。右クリックで閉じると、scrim でコンテキストメニューを
    // 出そうとしただけで消える
    pressedScrim = event.button === 0 && event.target === dialog
  })

  dialog.addEventListener('pointerup', (event) => {
    // 押下と離上の両方が dialog のときだけ。画像から scrim へドラッグして
    // 離したときに閉じてしまわないように
    const dismissed = pressedScrim && event.target === dialog
    pressedScrim = false
    if (dismissed) closeAfterExit(dialog)
  })
}
