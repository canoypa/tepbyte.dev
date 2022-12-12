import Script from "next/script";
import { FC } from "react";

declare global {
  interface Window {
    // Google tag
    dataLayer: Record<string, any>[];
  }
}

export const ClientProvider: FC = () => {
  return (
    <>
      {/* Google tag */}
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        onLoad={() => {
          window.dataLayer = window.dataLayer || [];

          function gtag(..._: any[]) {
            window.dataLayer.push(arguments);
          }

          gtag("js", new Date());

          if (process.env.NODE_ENV === "production") {
            gtag("config", process.env.NEXT_PUBLIC_GA_ID);
          } else {
            gtag("config", process.env.NEXT_PUBLIC_GA_ID, { debug_mode: true });
          }
        }}
      />

      {/* Google AdSense */}
      <Script
        async
        strategy="beforeInteractive"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4830238557928139"
        crossOrigin="anonymous"
      />
    </>
  );
};
