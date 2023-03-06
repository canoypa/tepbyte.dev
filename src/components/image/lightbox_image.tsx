'use client';

import { HTMLMotionProps, motion } from 'framer-motion';
import { FC, useId, useState } from 'react';
import { twMerge } from '~/lib/tailwind-merge';
import { tw } from '~/lib/tw';
import { Modal } from '../modal';

const styles = {
  img: /* Tailwind */ tw`cursor-zoom-in`,
  lightbox: /* Tailwind */ tw`max-w-[90vw] max-h-[90vh] rounded-extra-small object-contain cursor-zoom-out`,
};

export type LightboxImageProps = HTMLMotionProps<'img'>;

export const LightboxImage: FC<LightboxImageProps> = ({ ...otherProps }) => {
  const layoutId = useId();
  const [showLightbox, setShowLightbox] = useState(false);

  return (
    <>
      <motion.img
        layoutId={layoutId}
        {...otherProps}
        className={twMerge(otherProps.className, styles.img)}
        onClick={() => setShowLightbox(true)}
      />

      <Modal open={showLightbox} onClose={() => setShowLightbox(false)}>
        <motion.img
          layoutId={layoutId}
          {...otherProps}
          className={styles.lightbox}
          onClick={() => setShowLightbox(false)}
        />
      </Modal>
    </>
  );
};
