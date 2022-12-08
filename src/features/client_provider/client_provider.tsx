import { getAnalytics } from "firebase/analytics";
import Script from "next/script";
import { FC } from "react";
import { firebaseApp } from "~/client/firebase";

if (typeof window !== "undefined") {
  getAnalytics(firebaseApp);
}

export const ClientProvider: FC = () => {
  return (
    <>
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
