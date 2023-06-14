'use client';

import { FC, ImgHTMLAttributes, useId, useState } from 'react';
import { flushSync } from 'react-dom';
import { twMerge } from 'tailwind-merge';
import { tw } from '~/lib/tw';
import { Modal } from '../modal';

declare global {
  interface ViewTransition {
    finished: Promise<void>;
    ready: Promise<void>;
    updateCallbackDone: Promise<void>;
    skipTransition: () => void;
  }

  interface Document {
    startViewTransition?(updateCallback: () => void): ViewTransition;
  }
}

const styles = {
  img: /* Tailwind */ tw`cursor-zoom-in`,
  lightbox: /* Tailwind */ tw`max-w-full max-h-full rounded-extra-small cursor-zoom-out`,
};

export type ImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  lightbox?: boolean;
};

export const Image: FC<ImageProps> = ({ lightbox, ...otherProps }) => {
  const viewTransitionName = useId().replace(/:/g, '');

  const [isLightboxOpen, setLightboxOpen] = useState(false);
  const [isLightboxAnimating, setIsLightboxAnimating] = useState(false);

  const animate = (open: boolean) => {
    if (document.startViewTransition) {
      setIsLightboxAnimating(true);

      const transition = document.startViewTransition(() => {
        flushSync(() => setLightboxOpen(open));
      });

      transition.finished.then(() => setIsLightboxAnimating(false));
    } else {
      setLightboxOpen(open);
    }
  };

  const openModal = () => animate(true);
  const closeModal = () => animate(false);

  return (
    <>
      {lightbox ? (
        <img
          {...otherProps}
          className={twMerge(otherProps.className, styles.img)}
          style={{
            viewTransitionName:
              !isLightboxOpen && isLightboxAnimating
                ? viewTransitionName
                : undefined,
            visibility: isLightboxOpen ? 'hidden' : undefined,
          }}
          onClick={openModal}
        />
      ) : (
        <img {...otherProps} />
      )}

      {lightbox ? (
        <Modal open={isLightboxOpen} onClose={closeModal} closeWithBackdrop>
          <img
            {...otherProps}
            className={twMerge(styles.lightbox)}
            style={{
              viewTransitionName: isLightboxAnimating
                ? viewTransitionName
                : undefined,
            }}
            onClick={closeModal}
          />
        </Modal>
      ) : null}
    </>
  );
};
