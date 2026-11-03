"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "@phosphor-icons/react/dist/csr/ArrowUpRight";
import s from "../app/home.module.css";

const LINKS = [
  { href: "#programs", label: "Programs" },
  { href: "/classes/", label: "Classes" },
  { href: "#team", label: "Team" },
  { href: "#contact", label: "Contact" },
];

/**
 * Compact navigation that appears once the hero is behind you: it hides while
 * scrolling down to keep the content clear and returns on any upward scroll.
 */
export function StickyBar() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    let frame = 0;
    const read = () => {
      frame = 0;
      const y = window.scrollY;
      const anchor = document.getElementById("program-shortcuts");
      const threshold = anchor ? anchor.getBoundingClientRect().bottom + y : window.innerHeight;
      if (y < threshold) setShown(false);
      else if (y < last - 4) setShown(true);
      else if (y > last + 4) setShown(false);
      last = y;
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(read);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className={shown ? `${s.bar} ${s.barOn}` : s.bar} inert={!shown}>
      <div className={s.barInner}>
        <a className={s.barLogo} href="#main-content" aria-label="OpenByte, back to top">
          <img src="/media/brand/openbyte-logo.webp" width={640} height={191} alt="" />
        </a>
        <nav className={s.barLinks} aria-label="Quick navigation">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href}>{link.label}</a>
          ))}
        </nav>
        <div className={s.barActions}>
          <a className={s.barGhost} href="#donate">Donate</a>
          <a className={s.barSolid} href="#tech-donation">
            Give a device <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
}
