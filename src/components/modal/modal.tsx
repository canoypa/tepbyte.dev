import {
  type Accessor,
  type Component,
  type ParentProps,
  createEffect,
  createSignal,
  onCleanup,
} from 'solid-js'
import { css } from '~pandacss/css'

const createScrollLock = () => {
  const [initialOverflow, setInitialOverflow] = createSignal('')

  const lockScroll = () => {
    setInitialOverflow(document.body.style.overflow)
    document.body.style.overflow = 'hidden'
  }

  const unlockScroll = () => {
    document.body.style.overflow = initialOverflow()
  }

  return { lockScroll, unlockScroll }
}

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
  open: Accessor<boolean>
  closeWithBackdrop?: boolean
  onClose?: () => void
} & ParentProps

export const Modal: Component<ModalProps> = ({
  open,
  closeWithBackdrop,
  onClose,
  children,
}) => {
  let dialogRef!: HTMLDialogElement

  const { lockScroll, unlockScroll } = createScrollLock()

  createEffect(() => {
    open() ? lockScroll() : unlockScroll()
    onCleanup(unlockScroll)
  })

  createEffect(() => {
    if (open() && !dialogRef.open) dialogRef.showModal()
    else if (!open() && dialogRef.open) dialogRef.close()
  })

  const handleCancel = (e: Event) => {
    e.preventDefault()
    onClose?.()
  }

  const handleClick = (e: Event) => {
    if (closeWithBackdrop && e.target === dialogRef) {
      onClose?.()
    }
  }

  return (
    <dialog
      ref={dialogRef}
      class={styles.dialog}
      onCancel={handleCancel}
      onClick={handleClick}
    >
      {children}
    </dialog>
  )
}
