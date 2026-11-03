"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowLeft } from "@phosphor-icons/react/dist/csr/ArrowLeft";
import { ArrowRight } from "@phosphor-icons/react/dist/csr/ArrowRight";
import s from "../app/home.module.css";

/**
 * Horizontal photo rail. Native scroll + snap with previous/next controls; on
 * wide screens HomeMotion pins the section and drives the track with scroll.
 */
export function RoomRail({ heading, children }: { heading: ReactNode; children: ReactNode }) {
  const railRef = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  const update = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;
    setEdges({
      start: rail.scrollLeft < 8,
      end: rail.scrollLeft + rail.clientWidth > rail.scrollWidth - 8,
    });
  }, []);

  useEffect(() => {
    update();
    const rail = railRef.current;
    rail?.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      rail?.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const step = (direction: 1 | -1) => {
    const rail = railRef.current;
    const card = rail?.querySelector("figure");
    if (!rail || !card) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    rail.scrollBy({ left: direction * (card.getBoundingClientRect().width + 16), behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <>
      <div className={s.railHead}>
        {heading}
        <div className={s.railControls}>
          <button type="button" onClick={() => step(-1)} disabled={edges.start} aria-label="Previous photos">
            <ArrowLeft size={20} aria-hidden="true" />
          </button>
          <button type="button" onClick={() => step(1)} disabled={edges.end} aria-label="Next photos">
            <ArrowRight size={20} aria-hidden="true" />
          </button>
        </div>
      </div>
      <div ref={railRef} className={s.rail} tabIndex={0} role="region" aria-label="Photos from OpenByte workshops" data-rail>
        <div className={s.railTrack} data-rail-track>
          {children}
        </div>
      </div>
    </>
  );
}
