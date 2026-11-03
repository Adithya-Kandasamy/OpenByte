"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "@phosphor-icons/react/dist/csr/ArrowUpRight";
import { List } from "@phosphor-icons/react/dist/csr/List";
import { X } from "@phosphor-icons/react/dist/csr/X";
import s from "../app/page.module.css";

const LINKS = [
  { href: "/#programs", label: "Our programs" },
  { href: "/#team", label: "Our story" },
  { href: "/#contact", label: "Get in touch" },
];

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={s.header}>
      <a
        className={s.wordmark}
        href="/"
        onClick={close}
        aria-label="OpenByte, home"
      >
        <img className={s.brandLogo} src="/media/brand/openbyte-logo.webp"
          width={640} height={191} alt="OpenByte — Innovate, Connect, Empower" />
      </a>

      <nav className={s.desktopNav} aria-label="Main navigation">
        {LINKS.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
      </nav>

      <div className={s.headerActions}>
        <a className={s.donateLink} href="/#donate">Donate</a>
        <a className={s.deviceButton} href="/#tech-donation">
          Give a device <ArrowUpRight size={17} aria-hidden="true" />
        </a>
        <button
          ref={toggleRef}
          className={s.menuButton}
          type="button"
          aria-expanded={open}
          aria-controls="nav-panel"
          aria-label={open ? "Close navigation" : "Open navigation"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={23} aria-hidden="true" /> : <List size={23} aria-hidden="true" />}
        </button>
      </div>

      <nav
        id="nav-panel"
        className={s.mobileNav}
        aria-label="Mobile navigation"
        hidden={!open}
      >
        {LINKS.map((link) => (
          <a key={link.href} href={link.href} onClick={close}>
            {link.label} <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        ))}
        <a href="/#donate" onClick={close}>Donate to OpenByte</a>
        <a href="/#tech-donation" onClick={close}>Give a device</a>
      </nav>
    </header>
  );
}
