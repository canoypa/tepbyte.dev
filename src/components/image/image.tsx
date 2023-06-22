'use client'

import Head from 'next/head'
import { CSSProperties, FC, ImgHTMLAttributes, useId, useState } from 'react'
import { flushSync } from 'react-dom'
import { tw } from '~/lib/tw'
import { Modal } from '../modal'

declare global {
  interface ViewTransition {
    finished: Promise<void>
    ready: Promise<void>
    updateCallbackDone: Promise<void>
    skipTransition: () => void
  }

  interface Document {
    startViewTransition?(updateCallback: () => void): ViewTransition
  }
}

const styles = {
  lightbox: /* Tailwind */ tw`max-w-full max-h-full rounded-extra-small cursor-zoom-out`,
}

export type ImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  priority?: boolean
  blurDataUrl?: string
  lightbox?: boolean
}

export const Image: FC<ImageProps> = ({
  priority,
  blurDataUrl,
  lightbox,
  ...otherProps
}) => {
  const [showBlur, setShowBlur] = useState(true)

  const viewTransitionName = useId().replace(/:/g, '')

  const [isLightboxOpen, setLightboxOpen] = useState(false)
  const [isLightboxAnimating, setIsLightboxAnimating] = useState(false)

  const animate = (open: boolean) => {
    if (document.startViewTransition) {
      setIsLightboxAnimating(true)

      const transition = document.startViewTransition(() => {
        flushSync(() => setLightboxOpen(open))
      })

      transition.finished.then(() => setIsLightboxAnimating(false))
    } else {
      setLightboxOpen(open)
    }
  }

  const openModal = () => animate(true)
  const closeModal = () => animate(false)

  const lightboxStyles: CSSProperties = lightbox
    ? {
        cursor: 'zoom-in',
        viewTransitionName:
          !isLightboxOpen && isLightboxAnimating
            ? viewTransitionName
            : undefined,
        visibility: isLightboxOpen ? 'hidden' : undefined,
      }
    : {}

  const blurStyles: CSSProperties =
    blurDataUrl && showBlur
      ? {
          backgroundSize: 'cover',
          backgroundPosition: '50% 50%',
          backgroundRepeat: 'no-repeat',
          backgroundImage: `url(${blurDataUrl})`,
        }
      : {}

  return (
    <>
      <img
        {...otherProps}
        style={{ ...lightboxStyles, ...blurStyles }}
        onClick={lightbox ? openModal : undefined}
        ref={(v) => {
          v?.decode().finally(() => setShowBlur(false))
        }}
        loading={priority ? undefined : 'lazy'}
      />

      {lightbox ? (
        <Modal open={isLightboxOpen} onClose={closeModal} closeWithBackdrop>
          <img
            {...otherProps}
            className={styles.lightbox}
            style={{
              viewTransitionName: isLightboxAnimating
                ? viewTransitionName
                : undefined,
            }}
            onClick={closeModal}
          />
        </Modal>
      ) : null}

      {priority ? (
        <Head>
          <link
            key={otherProps.src}
            rel="preload"
            as="image"
            href={otherProps.src}
          />
        </Head>
      ) : null}
    </>
  )
}
