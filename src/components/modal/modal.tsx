'use client';

import { AnimatePresence, motion, Variants } from 'framer-motion';
import { FC, PropsWithChildren, useCallback, useEffect } from 'react';
import { useLockBodyScroll } from 'react-use';
import { tw } from '~/lib/tw';
import { Portal } from '../portal';

const styles = {
  dialog: /* Tailwind */ tw`fixed inset-0 z-3 grid place-items-center`,
  backdrop: /* Tailwind */ tw`absolute inset-0 -z-1`,
};

const scrimAnimationVariants: Variants = {
  visible: {
    backgroundColor: 'rgba(0,0,0,0.32)',
    backdropFilter: 'blur(4px)',
  },
  invisible: {
    backgroundColor: 'rgba(0,0,0,0)',
    backdropFilter: 'blur(0)',
  },
};

export type ModalProps = {
  open: boolean;
  onClose?: () => void;
} & PropsWithChildren;

export const Modal: FC<ModalProps> = ({ open, onClose, children }) => {
  useLockBodyScroll(open);

  const handleEscape = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose?.();
    },
    [onClose]
  );

  useEffect(() => {
    if (open) {
      window.addEventListener('keydown', handleEscape);
    } else {
      window.removeEventListener('keydown', handleEscape);
    }

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [handleEscape, open]);

  return (
    <Portal>
      <AnimatePresence>
        {open && (
          <div className={styles.dialog} role="dialog" aria-modal>
            <motion.div
              className={styles.backdrop}
              variants={scrimAnimationVariants}
              initial="invisible"
              animate="visible"
              exit="invisible"
              onClick={onClose}
            />

            {children}
          </div>
        )}
      </AnimatePresence>
    </Portal>
  );
};
