'use client'

import {
  useEffect,
  useRef,
  type FC,
  type MouseEventHandler,
  type PropsWithChildren,
  type ReactEventHandler,
} from 'react'
import { css } from '~pandacss/css'

const styles = {
  dialog: css({
    _open: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 'auto',
      width: 'auto',
      maxWidth: '90vw',
      height: 'auto',
      maxHeight: '90vh',
      backgroundColor: 'transparent',
      outline: 'none',

      _backdrop: {
        backgroundColor: 'dark.surface/0.32',
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

  const initialOverflow = useRef<string>('')
  useEffect(() => {
    const lock = () => {
      initialOverflow.current = document.body.style.overflow
      document.body.style.overflow = 'hidden'
    }
    const unlock = () => {
      document.body.style.overflow = initialOverflow.current
    }

    open ? lock() : unlock()
    return () => unlock()
  }, [open])

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
