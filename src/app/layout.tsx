import { Comfortaa } from "@next/font/google";
import { FC, PropsWithChildren } from "react";
import "../styles/globals.css";

const comfortaa = Comfortaa({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-comfortaa",
});

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html className={comfortaa.variable}>
      <head>
        <meta name="viewport" content="width=device-width" />
      </head>

      <body>{children}</body>
    </html>
  );
};
export default Layout;
