"use client";

import { useEffect } from "react";

/** GSAP owns entrance motion; native content is visible before it loads. */
export function Reveal() {
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;
    let disposed = false;
    let observer: IntersectionObserver | undefined;
    let cleanup: (() => void) | undefined;

    void import("gsap")
      .then(({ gsap }) => {
        if (disposed || media.matches) return;
        const context = gsap.context(() => {
          const draw = (root: Element) => {
            const lines = root.querySelectorAll<SVGGeometryElement>(
              ".fig .wire, .fig .trace, .fig .ray",
            );
            lines.forEach((line) => {
              const length = line.getTotalLength();
              gsap.fromTo(
                line,
                { strokeDasharray: length, strokeDashoffset: length },
                {
                  strokeDashoffset: 0,
                  duration: 0.6,
                  ease: "power2.out",
                  clearProps: "strokeDasharray,strokeDashoffset",
                },
              );
            });
          };
          const enter = (element: HTMLElement) => {
            const children = element.matches(".programs-grid")
              ? element.querySelectorAll(".program")
              : null;
            const targets = children?.length ? children : element;
            if (children?.length) gsap.set(element, { opacity: 1 });
            gsap.fromTo(
              targets,
              { opacity: 0, y: 12 },
              {
                opacity: 1,
                y: 0,
                duration: 0.3,
                stagger: 0.07,
                ease: "power2.out",
                clearProps: "opacity,transform,visibility",
              },
            );
            draw(element);
          };
          const hero = document.querySelector(".hero-visual");
          if (hero) {
            gsap.fromTo(
              hero,
              { opacity: 0, x: 12 },
              {
                opacity: 1,
                x: 0,
                duration: 0.3,
                ease: "power2.out",
                clearProps: "opacity,transform",
              },
            );
            draw(hero);
          }
          if (!("IntersectionObserver" in window)) return;
          observer = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                context.add(() => enter(entry.target as HTMLElement));
                observer?.unobserve(entry.target);
              });
            },
            { threshold: 0.08, rootMargin: "0px 0px -5% 0px" },
          );
          document
            .querySelectorAll<HTMLElement>("[data-reveal]")
            .forEach((element) => {
              // Avoid a late repaint of headings already in the initial viewport.
              if (element.getBoundingClientRect().top < window.innerHeight)
                return;
              gsap.set(element, { opacity: 0 });
              observer?.observe(element);
            });
        });
        cleanup = () => {
          observer?.disconnect();
          context.revert();
        };
      })
      .catch(() => {
        // Progressive enhancement: the page needs no animation bundle to work.
      });

    const onPreference = () => {
      if (media.matches) cleanup?.();
    };
    media.addEventListener("change", onPreference);
    return () => {
      disposed = true;
      observer?.disconnect();
      cleanup?.();
      media.removeEventListener("change", onPreference);
    };
  }, []);

  return null;
}
