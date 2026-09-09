// 開閉は <dialog> と invoker が担う。このファイルが読まれなくても開閉は動く

// 退場に accelerate は使わない。あれは戻ってこない退場の曲線で、
// 同じトリガから開き直せる拡大表示には合わない
const MOTION = {
  opening: ['medium-4', 'emphasized-decelerate'],
  closing: ['short-4', 'emphasized'],
} as const

const enhance = (dialog: HTMLDialogElement) => {
  const run = async (direction: keyof typeof MOTION, update: () => void) => {
    const root = document.documentElement
    const [duration, easing] = MOTION[direction]

    root.dataset.lightboxTransition = direction
    root.style.setProperty(
      '--lightbox-duration',
      `var(--durations-${duration})`,
    )
    root.style.setProperty('--lightbox-easing', `var(--easings-${easing})`)

    try {
      if (!document.startViewTransition) {
        update()
        return
      }
      const transition = document.startViewTransition(update)
      // 遷移がスキップされると ready も finished も reject する
      transition.ready.catch(() => {})
      await transition.finished.catch(() => {})
    } finally {
      delete root.dataset.lightboxTransition
    }
  }

  dialog.addEventListener('command', (event) => {
    const command = (event as Event & { command?: string }).command
    if (command !== 'show-modal' && command !== 'close') return
    event.preventDefault()
    run(command === 'show-modal' ? 'opening' : 'closing', () =>
      command === 'show-modal' ? dialog.showModal() : dialog.close(),
    )
  })

  // 既定のまま閉じると遷移を挟めない
  dialog.addEventListener('cancel', (event) => {
    event.preventDefault()
    run('closing', () => dialog.close())
  })

  // ::backdrop へのクリックは dialog 自身に届く
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog && dialog.open) {
      run('closing', () => dialog.close())
    }
  })
}

for (const dialog of document.querySelectorAll<HTMLDialogElement>(
  'dialog[data-lightbox]',
)) {
  enhance(dialog)
}
