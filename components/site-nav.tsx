"use client";

import { useEffect, useRef, useState } from "react";

const LINKS = [
  { href: "/#programs", label: "Programs" },
  { href: "/classes/", label: "Classes" },
  { href: "/#progress", label: "Progress" },
  { href: "/#team", label: "Team" },
  { href: "/#donate", label: "Donate" },
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
    <header className="site-header">
      <div className="shell nav-inner">
        <a
          className="wordmark"
          href="/"
          onClick={close}
          aria-label="OpenByte, home"
        >
          <span className="brand-mark" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
          </span>
          OpenByte
        </a>

        <nav className="nav-links" aria-label="Main">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <a className="btn btn-primary btn-sm" href="/#tech-donation">
            Give a device
          </a>
        </div>

        <button
          ref={toggleRef}
          className="nav-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="nav-panel"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
      </div>

      <nav
        id="nav-panel"
        className="nav-panel"
        aria-label="Mobile"
        hidden={!open}
      >
        <div className="shell">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={close}>
              {link.label}
            </a>
          ))}
          <div className="actions">
            <a
              className="btn btn-primary"
              href="/#tech-donation"
              onClick={close}
            >
              Give a device
            </a>
            <a className="btn btn-secondary" href="/#apply" onClick={close}>
              Positions
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
