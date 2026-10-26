import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const siteDescription = "OpenByte is a student-led nonprofit in Ashburn, Virginia offering hands-on Arduino and coding education, digital literacy support, and technology access programs.";

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
    images: [{ url: "/openbyte-logo.png", alt: "OpenByte — Innovate, Connect, Empower" }],
  },
  twitter: { card: "summary", title: "OpenByte | Learn, Build, Connect", description: siteDescription, images: ["/openbyte-logo.png"] },
  robots: { index: true, follow: true },
  icons: {
    icon: { url: "/openbyte-favicon.png?v=2", type: "image/png", sizes: "128x128" },
    shortcut: "/openbyte-favicon.png?v=2",
    apple: "/openbyte-favicon.png?v=2",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Script data-goatcounter="https://adikanda.goatcounter.com/count" async src="//gc.zgo.at/count.js" />
      </body>
    </html>
  );
}
