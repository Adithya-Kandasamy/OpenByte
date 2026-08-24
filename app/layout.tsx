import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "OpenByte — Technology help for real life",
  description:
    "OpenByte helps kids learn technology by making, gives older adults patient support, and connects useful devices with people who need them.",
  icons: {
    icon: {
      url: "/openbyte-favicon.png?v=2",
      type: "image/png",
      sizes: "128x128",
    },
    shortcut: "/openbyte-favicon.png?v=2",
    apple: "/openbyte-favicon.png?v=2",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Script
          data-goatcounter="https://adikanda.goatcounter.com/count"
          async
          src="//gc.zgo.at/count.js"
        />
      </body>
    </html>
  );
}
