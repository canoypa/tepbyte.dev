import { FC } from 'react'
import { Tag as IconTag } from '~/components/icons/tag'
import { tw } from '~/lib/tw'

const styles = {
  root: /* Tailwind */ tw`flex gap-x-[2px] h-6 pl-[6px] pr-[8px] items-center rounded-full bg-dark-secondary-container text-dark-on-secondary-container fill-dark-on-secondary-container text-label-medium font-comfortaa`,
}

type Props = {
  label: string
}

export const Tag: FC<Props> = ({ label }) => {
  return (
    <span className={styles.root}>
      <IconTag width={16} height={16} />
      {label}
    </span>
  )
}
