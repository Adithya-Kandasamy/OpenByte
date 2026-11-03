import type { Metadata, Viewport } from "next";
import Script from "next/script";
import localFont from "next/font/local";

import "./tailwind.css";
import "./globals.css";
import "../tokens.css";
import "./redesign.css";

const geistSans = localFont({
  src: "../node_modules/geist/dist/fonts/geist-sans/Geist-Variable.woff2",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "optional",
});
const geistMono = localFont({
  src: "../node_modules/geist/dist/fonts/geist-mono/GeistMono-Variable.woff2",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "optional",
  preload: false,
});

const siteDescription =
  "OpenByte is a student-led nonprofit in Ashburn, Virginia offering hands-on Arduino and coding education, digital literacy support, and technology access programs.";

export const metadata: Metadata = {
  metadataBase: new URL("https://openbyte-np.org"),
  title: "OpenByte | STEM Education & Digital Literacy in Northern Virginia",
  description: siteDescription,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "https://openbyte-np.org/",
    siteName: "OpenByte",
    title: "OpenByte | Learn, Build, Connect",
    description: siteDescription,
    images: [
      {
        url: "/openbyte-logo.png",
        alt: "OpenByte — Innovate, Connect, Empower",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "OpenByte | Learn, Build, Connect",
    description: siteDescription,
    images: ["/openbyte-logo.png"],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: {
      url: "/openbyte-favicon.png?v=3",
      type: "image/png",
      sizes: "128x128",
    },
    shortcut: "/openbyte-favicon.png?v=3",
    apple: {
      url: "/apple-touch-icon.png?v=3",
      type: "image/png",
      sizes: "180x180",
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#08090A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        {children}
        <Script
          data-goatcounter="https://adikanda.goatcounter.com/count"
          async
          src="https://gc.zgo.at/count.js"
        />
      </body>
    </html>
  );
}
