import { Comfortaa } from "@next/font/google";
import { FC, PropsWithChildren } from "react";
import { Footer } from "~/features/footer";
import { Header } from "~/features/header";
import "~/styles/globals.css";

const comfortaa = Comfortaa({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-comfortaa",
});

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="ja" className={comfortaa.variable}>
      <body>
        <Header />

        <div className="flex-grow">{children}</div>

        <Footer />
      </body>
    </html>
  );
};
export default Layout;
