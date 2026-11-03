"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ArrowRight } from "@phosphor-icons/react/dist/csr/ArrowRight";
import s from "../app/home.module.css";

const PROGRAMS = [
  {
    title: "Coding & electronics workshops",
    body: "From building a first webpage to lighting LEDs with Arduino, our students learn by making things.",
    tags: "Websites / Arduino / circuits / coding",
    href: "/classes/",
    cta: "See the Arduino class",
    image: "program-kids",
    alt: "An Arduino Uno with red, yellow, and green LEDs plugged into its headers",
  },
  {
    title: "Digital confidence for older adults",
    body: "Bring the phone, laptop, or online task that has been getting in the way. We’ll work through it together.",
    tags: "Phone basics / online forms / video calls / scam spotting",
    href: "#contact",
    cta: "Ask for help",
    image: "program-help",
    alt: "Hands holding a smartphone in front of an open laptop",
  },
  {
    title: "Community device drives",
    body: "We collect useful devices, prepare them for a new home, and connect them with people who can use them.",
    tags: "Device drop-offs / local drives / volunteer help",
    href: "#drives",
    cta: "Give a device",
    image: "program-devices",
    alt: "Three closed laptops stacked on a table",
  },
];

export function ProgramExplorer() {
  const [active, setActive] = useState(0);
  const id = useId();
  const frameRef = useRef<HTMLDivElement>(null);
  const previous = useRef(active);

  useEffect(() => {
    if (previous.current === active) return;
    previous.current = active;
    let disposed = false;
    let cleanup: (() => void) | undefined;

    void import("gsap").then(({ gsap }) => {
      if (disposed || !frameRef.current) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const image = frameRef.current?.querySelector<HTMLImageElement>(`[data-program-image="${active}"]`);
        if (!image) return;
        gsap.set(image, { transition: "opacity 600ms var(--h-ease)" });
        gsap.fromTo(image, { scale: 1.06, xPercent: 2, clipPath: "inset(0 0 0 8%)" }, {
          scale: 1,
          xPercent: 0,
          clipPath: "inset(0 0 0 0%)",
          duration: 0.65,
          ease: "power3.out",
          clearProps: "transform,clipPath,transition",
        });
      });
      cleanup = () => mm.revert();
    }).catch(() => {});

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, [active]);

  return (
    <div className={s.explorer}>
      <ol className={s.explorerList}>
        {PROGRAMS.map((program, index) => {
          const open = index === active;
          return (
            <li key={program.title} className={open ? s.rowOpen : s.row}>
              <h3>
                <button
                  type="button"
                  className={s.rowButton}
                  aria-expanded={open}
                  aria-controls={`${id}-panel-${index}`}
                  onClick={() => setActive(index)}
                  onMouseEnter={() => setActive(index)}
                >
                  <span className={s.rowIndex}>0{index + 1}</span>
                  <span className={s.rowTitle}>{program.title}</span>
                  <ArrowRight className={s.rowArrow} size={22} aria-hidden="true" />
                </button>
              </h3>
              <div id={`${id}-panel-${index}`} className={s.rowPanel}>
                <div>
                  <p>{program.body}</p>
                  <p className={s.rowTags}>{program.tags}</p>
                  <a className={s.textLink} href={program.href} tabIndex={open ? 0 : -1}>
                    {program.cta} <ArrowRight size={18} aria-hidden="true" />
                  </a>
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      <figure className={s.explorerMedia}>
        <div className={s.explorerFrame} ref={frameRef}>
          {PROGRAMS.map((program, index) => (
            <img
              key={program.image}
              data-program-image={index}
              className={index === active ? s.frameOn : s.frameOff}
              src={`/media/home/${program.image}-640.webp`}
              srcSet={`/media/home/${program.image}-640.webp 640w, /media/home/${program.image}-960.webp 960w`}
              sizes="(max-width: 900px) calc(100vw - 48px), 44vw"
              width={640}
              height={800}
              loading="lazy"
              decoding="async"
              alt={index === active ? program.alt : ""}
              aria-hidden={index === active ? undefined : true}
            />
          ))}
        </div>
      </figure>
    </div>
  );
}
