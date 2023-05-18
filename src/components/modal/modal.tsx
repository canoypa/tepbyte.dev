'use client';

import {
  FC,
  MouseEventHandler,
  PropsWithChildren,
  ReactEventHandler,
  useEffect,
  useRef,
} from 'react';
import { useLockBodyScroll } from 'react-use';
import { tw } from '~/lib/tw';

const styles = {
  dialog: /* Tailwind */ tw`open:flex justify-center items-center p-0 w-auto h-auto max-w-[90vw] max-h-[90vh] bg-[transparent] outline-none
    backdrop:bg-dark-surface/[0.32] backdrop:backdrop-blur-sm`,
};

export type ModalProps = {
  open: boolean;
  closeWithBackdrop?: boolean;
  onClose?: () => void;
} & PropsWithChildren;

export const Modal: FC<ModalProps> = ({
  open,
  closeWithBackdrop,
  onClose,
  children,
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useLockBodyScroll(open);

  useEffect(() => {
    const d = dialogRef.current;

    if (!d) return;

    if (open && !d.open) d.showModal();
    else if (!open && d.open) d.close();
  }, [onClose, open]);

  const handleCancel: ReactEventHandler = (e) => {
    e.preventDefault();
    onClose?.();
  };

  const handleClick: MouseEventHandler = (e) => {
    if (closeWithBackdrop && e.target === dialogRef.current) {
      onClose?.();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      onCancel={handleCancel}
      onClick={handleClick}
    >
      {children}
    </dialog>
  );
};
