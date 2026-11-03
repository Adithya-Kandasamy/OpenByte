import type { Viewport } from "next";
import { HomeHero } from "../components/home-hero";
import { HomeFooter, HomeSections } from "../components/home-sections";
import { HomeMotion } from "../components/home-motion";
import { StickyBar } from "../components/sticky-bar";

export const viewport: Viewport = {
  themeColor: "#fafaf8",
};

export default function Home() {
  return (
    <>
      <link rel="preload" as="image" type="image/avif"
        href="/media/hero/arduino-mobile-800.avif"
        imageSrcSet="/media/hero/arduino-mobile-480.avif 480w, /media/hero/arduino-mobile-800.avif 800w"
        imageSizes="calc(100vw - 24px)" media="(max-width: 640px)" fetchPriority="high" />
      <link rel="preload" as="image" type="image/webp"
        href="/media/hero/arduino-1400.webp"
        imageSrcSet="/media/hero/arduino-560.webp 560w, /media/hero/arduino-900.webp 900w, /media/hero/arduino-1400.webp 1400w, /media/hero/arduino-2000.webp 2000w"
        imageSizes="(min-width: 1920px) 1872px, calc(100vw - 48px)" media="(min-width: 641px)" fetchPriority="high" />
      <StickyBar />
      <HomeHero footer={<HomeFooter />}>
        <HomeSections />
      </HomeHero>
      <HomeMotion />
    </>
  );
}
