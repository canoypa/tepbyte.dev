import { Comfortaa } from "@next/font/google";
import { FC, PropsWithChildren } from "react";
import { Header } from "~/features/header";
import "~/styles/globals.css";

const comfortaa = Comfortaa({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-comfortaa",
});

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html className={comfortaa.variable}>
      <body>
        <Header />

        {children}
      </body>
    </html>
  );
};
export default Layout;
