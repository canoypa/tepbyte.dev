'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { FC, PropsWithChildren, useCallback, useEffect } from 'react';
import { useLockBodyScroll } from 'react-use';
import { Portal } from '../portal';

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
          <div
            className="fixed inset-0 z-3 grid place-items-center"
            role="dialog"
            aria-modal
          >
            <motion.div
              className="absolute inset-0 -z-1"
              initial={{
                backgroundColor: 'rgba(0,0,0,0)',
                backdropFilter: 'blur(0px)',
              }}
              animate={{
                backgroundColor: 'rgba(0,0,0,0.32)',
                backdropFilter: 'blur(4px)',
              }}
              exit={{
                backgroundColor: 'rgba(0,0,0,0)',
                backdropFilter: 'blur(0px)',
              }}
              onClick={onClose}
            />

            {children}
          </div>
        )}
      </AnimatePresence>
    </Portal>
  );
};
