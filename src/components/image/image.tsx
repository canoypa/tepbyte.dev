import {
  type Component,
  type JSX,
  createSignal,
  createUniqueId,
} from 'solid-js'
import { css } from '~pandacss/css'
import { Modal } from '../modal'

const styles = {
  lightbox: css({
    width: 'auto',
    height: 'auto',
    maxWidth: '100%',
    maxHeight: '100%',
    rounded: 'extra-small',
    cursor: 'zoom-out',
  }),
}

export type ImageProps = JSX.ImgHTMLAttributes<HTMLImageElement> & {
  lightbox?: boolean
  blurDataUrl?: string
}

export const Image: Component<ImageProps> = ({
  lightbox,
  blurDataUrl,
  ...otherProps
}) => {
  const viewTransitionName = createUniqueId()

  const [showBlur, setShowBlur] = createSignal(!!blurDataUrl)

  const [isLightboxOpen, setLightboxOpen] = createSignal(false)
  const [isLightboxAnimating, setIsLightboxAnimating] = createSignal(false)

  const animate = async (open: boolean) => {
    if (!document.startViewTransition) {
      setLightboxOpen(open)
      return
    }

    setIsLightboxAnimating(true)

    const transition = document.startViewTransition(() => {
      setLightboxOpen(open)
    })

    await transition.finished
    setIsLightboxAnimating(false)
  }

  const openModal = () => animate(true)
  const closeModal = () => animate(false)

  const lightboxStyles = (): JSX.CSSProperties => {
    if (!lightbox) return {}

    return {
      cursor: 'zoom-in',
      'view-transition-name':
        !isLightboxOpen() && isLightboxAnimating()
          ? viewTransitionName
          : undefined,
      visibility: isLightboxOpen() ? 'hidden' : undefined,
    }
  }

  const blurStyles = (): JSX.CSSProperties => {
    if (!blurDataUrl || !showBlur()) return {}

    return {
      'background-size': 'cover',
      'background-position': '50% 50%',
      'background-repeat': 'no-repeat',
      'background-image': `url(${blurDataUrl})`,
    }
  }

  return (
    <>
      <img
        {...otherProps}
        style={{ ...lightboxStyles(), ...blurStyles() }}
        onClick={lightbox ? openModal : undefined}
        ref={(el) => {
          el.decode().finally(() => setShowBlur(false))
        }}
      />

      {lightbox ? (
        <Modal open={isLightboxOpen} onClose={closeModal} closeWithBackdrop>
          <img
            {...otherProps}
            class={styles.lightbox}
            style={{
              'view-transition-name':
                isLightboxOpen() && isLightboxAnimating()
                  ? viewTransitionName
                  : undefined,
            }}
            onClick={closeModal}
          />
        </Modal>
      ) : null}
    </>
  )
}
