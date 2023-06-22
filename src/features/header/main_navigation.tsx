'use client'

import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'
import { FC } from 'react'
import { Tab, Tabs } from '~/components/tabs'

export const MainNavigation: FC = () => {
  const layout = useSelectedLayoutSegment()

  return (
    <Tabs
      as="nav"
      items={[
        { label: 'Home', value: '/' },
        { label: 'About', value: '/about' },
        { label: 'Products', value: '/products' },
        { label: 'Blog', value: '/blog' },
      ]}
      renderItem={(item) => (
        <Tab
          key={item.value}
          as={Link}
          href={item.value}
          label={item.label}
          value={item.value}
          active={`/${layout ?? ''}` === item.value}
        />
      )}
    />
  )
}
