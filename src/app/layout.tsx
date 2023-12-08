import { Metadata, Viewport } from 'next'
import { Comfortaa } from 'next/font/google'
import { PropsWithChildren } from 'react'
import { ExternalScripts } from '~/features/external_scripts'
import { Footer } from '~/features/footer'
import { Header } from '~/features/header'
import { css } from '~pandacss/css'
import './globals.css'

type Props = PropsWithChildren

const comfortaa = Comfortaa({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-comfortaa',
})

const styles = {
  body: css({ display: 'flex', flexDirection: 'column', minHeight: '100vh' }),
}

export const viewport: Viewport = {
  colorScheme: 'dark',
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL('https://www.tepbyte.dev'),

    title: {
      template: '%s - Tepbyte',
      default: 'Tepbyte',
    },
    description: "Cano's portfolio site.",

    openGraph: {
      title: {
        template: '%s',
        default: 'Tepbyte',
      },
      type: 'website',
      siteName: 'Tepbyte',
      description: "Cano's portfolio site.",
    },
  }
}

export default async function Layout({ children }: Props) {
  return (
    <html lang="ja" className={comfortaa.variable}>
      <body className={styles.body}>
        <ExternalScripts />

        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
