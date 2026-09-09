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

const TRIGGER_SELECTOR = '[data-lightbox]'

/** キャプションのために空けておく高さ。無いときは詰める */
const CAPTION_SPACE = '32px'

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
    color: 'dark.on-surface',
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

  // 遷移中のクリックを弾く。固定名を 2 枚が同時に持つと遷移ごと失敗する
  let transitioning = false

  /**
   * 遷移の実行と後始末。向きは CSS 側に伝える（尺と ::view-transition-new の
   * 扱いが変わる。panda.config.ts の globalCss）。中断された遷移は reject するので、
   * view-transition-name を残さないよう finally で必ず剥がす。
   */
  const runTransition = async (
    direction: 'opening' | 'closing',
    thumbnail: HTMLImageElement,
    update: () => void,
  ) => {
    transitioning = true
    document.documentElement.dataset.lightboxTransition = direction
    // 擬似要素は :root 側にぶら下がるので、角丸もそちらに預ける
    document.documentElement.style.setProperty(
      '--lightbox-radius',
      getComputedStyle(thumbnail).borderRadius,
    )
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
      delete document.documentElement.dataset.lightboxTransition
      thumbnail.style.viewTransitionName = ''
      transitioning = false
    }
  }

  const open = async (trigger: HTMLElement) => {
    if (transitioning || image()) return
    const next = readTrigger(trigger)
    if (!next) return

    next.thumbnail.style.viewTransitionName = VIEW_TRANSITION_NAME
    await runTransition('opening', next.thumbnail, () => {
      next.thumbnail.style.viewTransitionName = ''
      next.thumbnail.style.visibility = 'hidden'
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

    await runTransition('closing', current.thumbnail, () => {
      setImage(null)
      current.thumbnail.style.visibility = ''
      current.thumbnail.style.viewTransitionName = VIEW_TRANSITION_NAME
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
          <figure class={styles.figure}>
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
                'view-transition-name': VIEW_TRANSITION_NAME,
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
