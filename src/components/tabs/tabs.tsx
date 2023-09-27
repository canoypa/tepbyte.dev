import { ComponentPropsWithoutRef, ElementType, ReactElement } from 'react'
import { tw } from '~/lib/tw'

const styles = {
  root: /* Tailwind */ tw`flex`,
}

export type TabItemType = {
  label: string
  value: string
}

type InternalTabsProps<T extends ElementType> = {
  as?: T
  items: TabItemType[]
  renderItem: (item: TabItemType) => ReactElement
}

export type TabsProps<T extends ElementType> = InternalTabsProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof InternalTabsProps<T>>

export const Tabs = <T extends ElementType = 'div'>({
  as,
  items,
  renderItem,
  ...otherProps
}: TabsProps<T>) => {
  const Component = as ?? 'div'

  return (
    <Component role="tablist" className={styles.root} {...otherProps}>
      {items.map((item) => renderItem(item))}
    </Component>
  )
}
