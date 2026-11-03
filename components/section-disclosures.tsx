"use client";

import { useEffect, type ReactNode } from "react";

/** Native disclosures stay usable without JS; links open their intended content. */
export function SectionDisclosures({ children }: { children: ReactNode }) {
  useEffect(() => {
    let frame = 0;
    const revealTarget = (hash: string) => {
      if (!hash || hash === "#") return;
      let target: HTMLElement | null;
      try {
        target = document.getElementById(decodeURIComponent(hash.slice(1)));
      } catch {
        return;
      }
      const details = target?.closest("details");
      if (!details) return;
      details.open = true;
      frame = requestAnimationFrame(() =>
        target?.scrollIntoView({ block: "start" }),
      );
    };
    const onHash = () => revealTarget(window.location.hash);
    const onClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      )
        return;
      const link =
        event.target instanceof Element
          ? event.target.closest<HTMLAnchorElement>("a[href]")
          : null;
      if (
        link &&
        link.origin === location.origin &&
        link.pathname === location.pathname
      )
        revealTarget(link.hash);
    };
    onHash();
    window.addEventListener("hashchange", onHash);
    document.addEventListener("click", onClick);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", onHash);
      document.removeEventListener("click", onClick);
    };
  }, []);
  return <div className="involvement-list">{children}</div>;
}
