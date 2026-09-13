/**
 * 閉じる経路を全部受けて、退場が終わってから閉じる。
 *
 * close() を先に呼ぶと `:modal` が外れ、dialog は top layer から出る。
 * `overlay` の transition があればブラウザが退場の終わりまで留めてくれるが、
 * Safari は未対応。位置や大きさは author 側で書き戻せるが、`::backdrop` は
 * top layer の要素にしか生成されないので、書き戻す対象がない。写真が
 * フェードしている最中に scrim だけ最初のフレームで消える。
 * だから「動かしてから閉じる」。
 *
 * そのため閉じる経路はここを通さなければならない。light dismiss
 * (`closedby`) は beforetoggle が cancelable でなく差し込めないので使わず、
 * scrim も自分で受けている。
 *
 * Safari が `overlay` を出荷したら、このモジュールは不要になる。CSS の
 * transition に `overlay` と `display` を allow-discrete で戻し、dialog に
 * `closedby="any"` を付ければ、閉じる側の JS はゼロになる。
 */

const closeAfterExit = async (dialog: HTMLDialogElement) => {
  // 退場中の印。CSS 側は [data-lightbox-closing] で受ける
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

  // Esc。既定のまま閉じると時機を奪われる
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
