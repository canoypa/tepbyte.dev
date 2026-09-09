import {
  type Component,
  createSignal,
  onCleanup,
  onMount,
  Show,
} from 'solid-js'
import { css } from '~pandacss/css'
import { flex } from '~pandacss/patterns'
import { Modal } from '../modal'

/**
 * サムネイルと拡大表示をつなぐ view transition 名。開閉のどの瞬間も
 * どちらか片方しか持たないので固定名で足りる。擬似要素側の調整は
 * panda.config.ts の globalCss にある。
 */
const VIEW_TRANSITION_NAME = 'lightbox'

/** 焦点要素を使わないときに、拡大表示そのものを動かすための名前 */
const SURFACE_TRANSITION_NAME = 'lightbox-surface'

const TRIGGER_SELECTOR = '[data-lightbox]'

/** キャプションのために空けておく高さ。無いときは詰める */
const CAPTION_SPACE = '32px'

/**
 * (モード × 向き) ごとの尺と曲線。M3 の easing and duration の表に沿う。
 * 焦点要素は画面内で始まり画面内で終わるので emphasized、fade は入るときだけ
 * decelerate。退場に accelerate を使わないのは、あれが「取り戻せない」退場を
 * 表す曲線で、同じトリガから開き直せる拡大表示には合わないため。
 * 擬似要素は :root 側にぶら下がるので、値もそちらに預ける
 */
const MOTION = {
  'focal-opening': ['long-2', 'emphasized'],
  'focal-closing': ['medium-4', 'emphasized'],
  'surface-opening': ['medium-4', 'emphasized-decelerate'],
  'surface-closing': ['short-4', 'emphasized'],
} as const

type OpenedImage = {
  thumbnail: HTMLImageElement
  /** 遷移直後の 1 フレームで確実に描けるよう、まずはサムネイルと同じ画像 */
  initialSrc: string
  fullSrc: string
  fullSrcSet: string | undefined
  alt: string
  /** 幅 / 高さ。箱の縦横比に使う */
  ratio: string
  /** 拡大しすぎないための上限 px */
  maxWidth: string
  /**
   * サムネイルを焦点要素として拡大するか。
   * トリガが常に完全に見えているレイアウトだけが名乗れる
   */
  focal: boolean
  /** 遷移中の角丸。clip でスナップショットの角丸が落ちるので掛け直す */
  radius: string
  caption: string | null
}

const readTrigger = (trigger: HTMLElement): OpenedImage | null => {
  const thumbnail = trigger.querySelector('img')
  const {
    lightboxSrc,
    lightboxSrcset,
    lightboxRatio,
    lightboxMaxWidth,
    lightboxCaption,
    lightboxFocal,
  } = trigger.dataset
  if (!thumbnail || !lightboxSrc || !lightboxRatio || !lightboxMaxWidth) {
    return null
  }
  // 読み込み前のサムネイル（lazy 直後）を種にすると拡大側のスナップショットが
  // 空になり、拡大アニメーションが飛ぶ
  if (!thumbnail.complete) return null

  return {
    thumbnail,
    initialSrc: thumbnail.currentSrc || thumbnail.src,
    fullSrc: lightboxSrc,
    fullSrcSet: lightboxSrcset,
    alt: thumbnail.alt,
    ratio: lightboxRatio,
    maxWidth: `${lightboxMaxWidth}px`,
    focal: lightboxFocal !== undefined,
    radius: getComputedStyle(thumbnail).borderRadius,
    caption: lightboxCaption ?? null,
  }
}

const styles = {
  figure: flex({
    direction: 'column',
    rowGap: 8,
    maxWidth: '100%',
    maxHeight: '100%',
  }),
  image: css({
    // 箱は viewport と縦横比だけで決める。width: auto にすると「今読み込めている
    // 画像の自然サイズ」に箱が従い、低解像度→高解像度の差し替えでレイアウトが
    // ずれる（＝遷移の着地点が変わる）
    width:
      'min(90vw, var(--lightbox-max-width), calc((90vh - var(--lightbox-caption-space, 0px)) * var(--lightbox-ratio)))',
    height: 'auto',
    aspectRatio: 'var(--lightbox-ratio)',
    // 角丸はトリガから引き継ぐ。両端で違うと遷移の開始と同時に角が変わる
    borderRadius: 'var(--lightbox-radius)',
    cursor: 'zoom-out',
  }),
  caption: css({
    minHeight: 24,
    textAlign: 'center',
    textStyle: 'label-medium',
    color: { base: 'dark.on-surface', _osLight: 'light.on-surface' },
  }),
}

/**
 * ページ内の `[data-lightbox]` をまとめて受け持つ拡大表示。同時に開くのは
 * 常に 1 つなので、島も dialog もページに 1 つでよい。クリックは document
 * 委譲で拾うため、サムネイル自体は素の HTML のままでいられる。
 */
export const Lightbox: Component = () => {
  const [image, setImage] = createSignal<OpenedImage | null>(null)
  const [src, setSrc] = createSignal('')

  // 遷移中のクリックを弾く。固定名を 2 枚が同時に持つと遷移ごと失敗する。
  // なお view transition が動いている間はブラウザ側が当たり判定をページに
  // 通さないので、ここで許可しても閉じ途中のクリックは届かない
  let transitioning = false

  /**
   * 遷移の実行と後始末。モードと向きを CSS 側に伝え、尺と曲線を :root に書く。
   * 中断された遷移は reject するので、view-transition-name を残さないよう
   * finally で必ず剥がす。
   */
  const runTransition = async (
    direction: 'opening' | 'closing',
    image: OpenedImage,
    update: () => void,
  ) => {
    const root = document.documentElement
    const mode = image.focal ? 'focal' : 'surface'
    const [duration, easing] = MOTION[`${mode}-${direction}`]

    transitioning = true
    root.dataset.lightboxTransition = direction
    root.dataset.lightboxMode = mode
    root.style.setProperty(
      '--lightbox-duration',
      `var(--durations-${duration})`,
    )
    root.style.setProperty('--lightbox-easing', `var(--easings-${easing})`)
    if (image.focal) root.style.setProperty('--lightbox-radius', image.radius)
    try {
      if (document.startViewTransition) {
        const transition = document.startViewTransition(update)
        // タブが隠れている・遷移中に次が始まった等でスキップされると
        // ready / finished の両方が reject する。後始末は finally が担う
        transition.ready.catch(() => {})
        await transition.finished.catch(() => {})
      } else {
        update()
      }
    } finally {
      image.thumbnail.style.viewTransitionName = ''
      delete root.dataset.lightboxTransition
      delete root.dataset.lightboxMode
      transitioning = false
    }
  }

  const open = async (trigger: HTMLElement) => {
    if (transitioning || image()) return
    const next = readTrigger(trigger)
    if (!next) return

    if (next.focal)
      next.thumbnail.style.viewTransitionName = VIEW_TRANSITION_NAME
    await runTransition('opening', next, () => {
      if (next.focal) {
        next.thumbnail.style.viewTransitionName = ''
        next.thumbnail.style.visibility = 'hidden'
      }
      setSrc(next.initialSrc)
      setImage(next)
    })

    // 拡大後に高解像度へ差し替える。先に decode しておき、切り替えで空白を出さない
    const full = new Image()
    if (next.fullSrcSet) full.srcset = next.fullSrcSet
    full.sizes = '90vw'
    full.src = next.fullSrc
    await full.decode().catch(() => {})
    if (image() === next) setSrc(next.fullSrc)
  }

  const close = async () => {
    const current = image()
    if (!current || transitioning) return

    await runTransition('closing', current, () => {
      setImage(null)
      if (current.focal) {
        current.thumbnail.style.visibility = ''
        current.thumbnail.style.viewTransitionName = VIEW_TRANSITION_NAME
      }
    })
  }

  onMount(() => {
    const handleClick = (event: MouseEvent) => {
      const trigger = (event.target as Element | null)?.closest<HTMLElement>(
        TRIGGER_SELECTOR,
      )
      if (trigger) open(trigger)
    }

    document.addEventListener('click', handleClick)
    onCleanup(() => document.removeEventListener('click', handleClick))
  })

  return (
    <Modal open={() => image() != null} onClose={close} closeWithBackdrop>
      <Show when={image()}>
        {(current) => (
          <figure
            class={styles.figure}
            style={{
              'view-transition-name': current().focal
                ? undefined
                : SURFACE_TRANSITION_NAME,
            }}
          >
            <img
              src={src()}
              srcset={
                src() === current().fullSrc ? current().fullSrcSet : undefined
              }
              sizes="90vw"
              alt={current().alt}
              class={styles.image}
              style={{
                '--lightbox-ratio': current().ratio,
                '--lightbox-max-width': current().maxWidth,
                '--lightbox-caption-space': current().caption
                  ? CAPTION_SPACE
                  : undefined,
                'view-transition-name': current().focal
                  ? VIEW_TRANSITION_NAME
                  : undefined,
              }}
              onClick={close}
            />
            <Show when={current().caption}>
              {(caption) => (
                <figcaption class={styles.caption}>{caption()}</figcaption>
              )}
            </Show>
          </figure>
        )}
      </Show>
    </Modal>
  )
}
