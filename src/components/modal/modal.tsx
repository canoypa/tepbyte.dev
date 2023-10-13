'use client'

import {
  FC,
  MouseEventHandler,
  PropsWithChildren,
  ReactEventHandler,
  useEffect,
  useRef,
} from 'react'
import { useLockBodyScroll } from 'react-use'
import { css } from '~pandacss/css'

const styles = {
  dialog: css({
    _open: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      m: 'auto',
      w: 'auto',
      h: 'auto',
      maxW: '90vw',
      maxH: '90vh',
      backgroundColor: 'transparent',
      outline: 'none',
      _backdrop: {
        backgroundWithAlpha_EXPERIMENTAL: 'dark.surface/0.32',
        backdropFilter: 'blur(4px)',
      },
    },
  }),
}

export type ModalProps = {
  open: boolean
  closeWithBackdrop?: boolean
  onClose?: () => void
} & PropsWithChildren

export const Modal: FC<ModalProps> = ({
  open,
  closeWithBackdrop,
  onClose,
  children,
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useLockBodyScroll(open)

  useEffect(() => {
    const d = dialogRef.current

    if (!d) return

    if (open && !d.open) d.showModal()
    else if (!open && d.open) d.close()
  }, [onClose, open])

  const handleCancel: ReactEventHandler = (e) => {
    e.preventDefault()
    onClose?.()
  }

  const handleClick: MouseEventHandler = (e) => {
    if (closeWithBackdrop && e.target === dialogRef.current) {
      onClose?.()
    }
  }

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      onCancel={handleCancel}
      onClick={handleClick}
    >
      {children}
    </dialog>
  )
}
