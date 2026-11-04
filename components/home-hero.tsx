"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "@phosphor-icons/react/dist/csr/ArrowRight";
import { ArrowUpRight } from "@phosphor-icons/react/dist/csr/ArrowUpRight";
import { Circuitry } from "@phosphor-icons/react/dist/csr/Circuitry";
import { Devices } from "@phosphor-icons/react/dist/csr/Devices";
import { HandHeart } from "@phosphor-icons/react/dist/csr/HandHeart";
import { List } from "@phosphor-icons/react/dist/csr/List";
import { X } from "@phosphor-icons/react/dist/csr/X";
import styles from "../app/page.module.css";

const navigation = [
  { label: "Our programs", href: "#programs" },
  { label: "Our story", href: "#team" },
  { label: "Get in touch", href: "#contact" },
];

export function HomeHero({ children, footer }: { children?: React.ReactNode; footer?: React.ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLPictureElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;

    let cancelled = false;
    let context: ReturnType<typeof import("gsap").gsap.context> | undefined;
    void import("gsap").then(({ gsap }) => {
      if (cancelled || media.matches) return;
      context = gsap.context(() => {
        gsap.fromTo(photoRef.current, { scale: 1.035 }, {
          scale: 1, duration: 1.1, ease: "power2.out",
        });
        gsap.fromTo("[data-hero-copy]", { y: 14 }, {
          y: 0, duration: 0.65, stagger: 0.06, ease: "power2.out",
        });
      }, rootRef);
    });

    const stopMotion = () => {
      if (media.matches) {
        context?.revert();
      }
    };
    media.addEventListener("change", stopMotion);
    return () => {
      cancelled = true;
      context?.revert();
      media.removeEventListener("change", stopMotion);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    const desktop = window.matchMedia("(min-width: 901px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [menuOpen]);

  return (
    <div className={styles.page} ref={rootRef}>
      <a className={styles.skipLink} href="#main-content">Skip to content</a>
      <header className={styles.header}>
        <a className={styles.wordmark} href="/" aria-label="OpenByte home">
          <img className={styles.brandLogo} src="/media/brand/openbyte-logo.webp"
            width={640} height={191} alt="OpenByte — Innovate, Connect, Empower" />
        </a>
        <nav className={styles.desktopNav} aria-label="Main navigation">
          {navigation.map((item) => <a key={item.label} href={item.href}>{item.label}</a>)}
        </nav>
        <div className={styles.headerActions}>
          <a className={styles.donateLink} href="#donate">Donate</a>
          <a className={styles.deviceButton} href="#tech-donation">
            Give a device <ArrowUpRight size={17} aria-hidden="true" />
          </a>
          <button ref={menuButtonRef} className={styles.menuButton} type="button"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen} aria-controls="hero-navigation-panel"
            onClick={() => setMenuOpen((open) => !open)}>
            {menuOpen ? <X size={23} aria-hidden="true" /> : <List size={23} aria-hidden="true" />}
          </button>
        </div>
        <nav className={styles.mobileNav} id="hero-navigation-panel" aria-label="Mobile navigation" hidden={!menuOpen}>
          {navigation.map((item) => (
            <a key={item.label} href={item.href} onClick={() => setMenuOpen(false)}>
              {item.label} <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          ))}
          <a href="#donate" onClick={() => setMenuOpen(false)}>Donate to OpenByte</a>
        </nav>
      </header>
      <main id="main-content" tabIndex={-1}>
        <section className={styles.hero} aria-labelledby="hero-title" data-hero-scene>
          <picture className={styles.photograph} ref={photoRef}>
            <source media="(max-width: 640px)" type="image/webp"
              srcSet="/media/openbyte-workshops/workshop-hero-mobile.webp" />
            <img src="/media/openbyte-workshops/workshop-hero.webp"
              width={1280} height={720} fetchPriority="high" loading="eager" decoding="async"
              alt="Students collaborating on Arduino electronics projects during an OpenByte workshop" data-hero-depth />
          </picture>
          <div className={styles.photoShade} aria-hidden="true" />
          <div className={styles.heroMeta}>
            <p>Ashburn, Virginia</p>
          </div>
          <div className={styles.heroContent}>
            <div className={styles.introduction}>
              <h1 id="hero-title" data-hero-copy>
                <span>We’re students</span>
                <span>helping people</span>
                <span>learn technology.</span>
              </h1>
              <p className={styles.description} data-hero-copy>
                We teach kids coding and electronics, help older adults with
                everyday tech, and collect donated devices.
              </p>
              <div className={styles.heroActions} data-hero-copy>
                <a className={styles.primaryButton} href="/classes/" data-motion-link>
                  Explore our classes <ArrowUpRight size={20} aria-hidden="true" />
                </a>
              </div>
            </div>
            <a className={styles.teamLink} href="#team">
              <img src="/media/hero/openbyte-team.webp" width={72} height={64} loading="lazy" decoding="async" alt="" />
              <span className={styles.teamText}>
                <strong>Meet the founders <ArrowUpRight size={18} aria-hidden="true" /></strong>
              </span>
            </a>
          </div>
        </section>
        <nav className={styles.programs} id="program-shortcuts" aria-label="Explore OpenByte programs">
          <a href="/classes/">
            <Circuitry className={styles.programIcon} size={26} weight="duotone" aria-hidden="true" />
            <span>Coding &amp; electronics</span>
            <ArrowRight className={styles.programArrow} size={19} aria-hidden="true" />
          </a>
          <a href="#contact">
            <HandHeart className={styles.programIcon} size={26} weight="duotone" aria-hidden="true" />
            <span>Everyday tech help</span>
            <ArrowRight className={styles.programArrow} size={19} aria-hidden="true" />
          </a>
          <a href="#drives">
            <Devices className={styles.programIcon} size={26} weight="duotone" aria-hidden="true" />
            <span>Community device drives</span>
            <ArrowRight className={styles.programArrow} size={19} aria-hidden="true" />
          </a>
        </nav>
        {children}
      </main>
      {footer}
    </div>
  );
}
