'use client'

import Script from 'next/script'
import { FC } from 'react'

declare global {
  interface Window {
    // Google tag
    dataLayer: Record<string, any>[]
  }
}

export const ExternalScripts: FC = () => {
  return (
    <>
      {/* Google tag */}
      <Script
        async
        src={'https://www.googletagmanager.com/gtag/js?id=G-EW7ZLDQTD1'}
        strategy="afterInteractive"
        onLoad={() => {
          window.dataLayer = window.dataLayer || []

          function gtag(..._: any[]) {
            window.dataLayer.push(arguments)
          }

          gtag('js', new Date())

          if (process.env.NODE_ENV === 'production') {
            gtag('config', process.env.NEXT_PUBLIC_GA_ID)
          } else {
            gtag('config', process.env.NEXT_PUBLIC_GA_ID, { debug_mode: true })
          }
        }}
      />
    </>
  )
}
