import { type Component, createSignal, type JSX } from 'solid-js'
import { css } from '~pandacss/css'

const styles = {
  blur: css({
    backgroundSize: 'cover',
    backgroundPosition: '50% 50%',
    backgroundRepeat: 'no-repeat',
  }),
}

export type ImageProps = JSX.ImgHTMLAttributes<HTMLImageElement> & {
  blurDataUrl?: string
}

/** 画像本体が来るまで blurhash を背景に敷く。拡大表示は Lightbox が受け持つ */
export const Image: Component<ImageProps> = ({
  blurDataUrl,
  classList,
  ...otherProps
}) => {
  const [showBlur, setShowBlur] = createSignal(!!blurDataUrl)

  return (
    <img
      {...otherProps}
      classList={{
        [styles.blur]: showBlur(),
        ...classList,
      }}
      style={showBlur() ? { 'background-image': `url(${blurDataUrl})` } : {}}
      ref={(el) => {
        // 差し替えや取り外しで reject する。ここでは blur を外せれば十分
        el.decode()
          .catch(() => {})
          .finally(() => setShowBlur(false))
      }}
    />
  )
}
