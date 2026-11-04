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
      <link rel="preload" as="image" type="image/webp"
        href="/media/openbyte-workshops/workshop-hero-mobile.webp"
        media="(max-width: 640px)" fetchPriority="high" />
      <link rel="preload" as="image" type="image/webp"
        href="/media/openbyte-workshops/workshop-hero.webp"
        media="(min-width: 641px)" fetchPriority="high" />
      <StickyBar />
      <HomeHero footer={<HomeFooter />}>
        <HomeSections />
      </HomeHero>
      <HomeMotion />
    </>
  );
}
