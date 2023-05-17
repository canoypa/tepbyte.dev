import { Metadata } from 'next';
import { Comfortaa } from 'next/font/google';
import { FC, PropsWithChildren } from 'react';
import { ExternalScripts } from '~/features/external_scripts';
import { Footer } from '~/features/footer';
import { Header } from '~/features/header';
import '~/styles/globals.css';

const comfortaa = Comfortaa({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-comfortaa',
});

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
  };
}

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="ja" className={comfortaa.variable}>
      <body>
        <ExternalScripts />

        <Header />
        <div className="flex-grow">{children}</div>
        <Footer />
      </body>
    </html>
  );
};
export default Layout;
