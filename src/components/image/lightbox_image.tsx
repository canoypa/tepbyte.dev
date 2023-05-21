'use client';

import { FC, ImgHTMLAttributes, useId, useState } from 'react';
import { flushSync } from 'react-dom';
import { twMerge } from '~/lib/tailwind-merge';
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

export type LightboxImageProps = ImgHTMLAttributes<HTMLImageElement>;

export const LightboxImage: FC<LightboxImageProps> = ({ ...otherProps }) => {
  const layoutId = useId().replace(/:/g, '');

  const [open, setOpen] = useState(false);
  const [inAnimation, setInAnimation] = useState(false);

  const animate = (open: boolean) => {
    if (document.startViewTransition) {
      setInAnimation(true);

      const transition = document.startViewTransition(() => {
        flushSync(() => setOpen(open));
      });

      transition.finished.then(() => setInAnimation(false));
    } else {
      setOpen(open);
    }
  };

  const openModal = () => {
    animate(true);
  };

  const closeModal = () => {
    animate(false);
  };

  return (
    <>
      <img
        {...otherProps}
        className={twMerge(otherProps.className, styles.img)}
        style={{
          viewTransitionName: !open && inAnimation ? layoutId : undefined,
          visibility: open ? 'hidden' : undefined,
        }}
        onClick={openModal}
      />

      <Modal open={open} onClose={closeModal} closeWithBackdrop>
        <img
          {...otherProps}
          className={twMerge(styles.lightbox)}
          style={{ viewTransitionName: inAnimation ? layoutId : undefined }}
          onClick={closeModal}
        />
      </Modal>
    </>
  );
};
