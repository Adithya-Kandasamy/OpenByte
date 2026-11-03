"use client";

import { useEffect } from "react";
import s from "../app/home.module.css";

/**
 * Homepage scroll choreography (GSAP + ScrollTrigger).
 *
 * Progressive enhancement throughout: the server HTML is complete and visible,
 * GSAP only sets "from" states once it has loaded, and everything is skipped
 * under prefers-reduced-motion (gsap.matchMedia reverts if that changes).
 *
 *   [data-split]        heading words rise out of a mask
 *   [data-scrub]        words brighten with scroll; [data-chip] photos open
 *   [data-reveal]       block fades up once
 *   [data-reveal-group] children ([data-reveal-item]) stagger in
 *   [data-grow]         photo/navy bands grow from an inset card (wide screens)
 *   [data-parallax]     band photo drifts inside its frame
 *   [data-count]        figures count up once
 *   [data-draw]         hairline draws left to right
 *   [data-pin-rail]     photo rail pinned and driven horizontally (wide screens)
 *   [data-letters]      footer wordmark letters rise
 *   [data-rise]         larger lift for floating panels
 */
export function HomeMotion() {
  useEffect(() => {
    let disposed = false;
    let cleanup: (() => void) | undefined;

    void Promise.all([import("gsap"), import("gsap/ScrollTrigger")])
      .then(([{ gsap }, { ScrollTrigger }]) => {
        if (disposed) return;
        gsap.registerPlugin(ScrollTrigger);
        const mm = gsap.matchMedia();

        mm.add(
          {
            motion: "(prefers-reduced-motion: no-preference)",
            wide: "(min-width: 901px)",
          },
          (context) => {
            const { motion, wide } = context.conditions as { motion: boolean; wide: boolean };
            if (!motion) return;
            const all = (selector: string, root: ParentNode = document) =>
              Array.from(root.querySelectorAll<HTMLElement>(selector));
            const pinned: HTMLElement[] = [];
            const listeners: (() => void)[] = [];
            const release = () => {
              listeners.forEach((remove) => remove());
              pinned.forEach((section) => section.classList.remove(s.railPinned));
            };

            all("[data-hero-scene]").forEach((hero) => {
              const image = hero.querySelector("[data-hero-depth]");
              if (!image) return;
              gsap.fromTo(image, { yPercent: 0, scale: 1 }, {
                yPercent: wide ? 5 : 2,
                scale: wide ? 1.12 : 1.06,
                ease: "none",
                scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 0.6 },
              });
            });

            context.add("moveAction", (link: HTMLElement, icon: SVGElement, active: boolean) => {
              gsap.to(icon, {
                x: active ? 4 : 0,
                y: active && !link.classList.contains(s.textLink) ? -3 : 0,
                duration: 0.25,
                ease: "power2.out",
                overwrite: "auto",
              });
              gsap.to(link, { "--link-reveal": active ? 1 : 0, duration: 0.25, overwrite: "auto" });
            });

            all(`[data-motion-link], .${s.textLink}, .${s.btnDark}, .${s.btnLight}, .${s.footerCta}`).forEach((link) => {
              const icon = link.querySelector<SVGElement>("svg");
              if (!icon) return;
              gsap.set(icon, { x: 0, y: 0, transition: "none" });
              const enter = (event: PointerEvent) => {
                if (event.pointerType !== "touch") context.moveAction(link, icon, true);
              };
              const leave = () => context.moveAction(link, icon, link.matches(":focus-visible"));
              const focus = () => context.moveAction(link, icon, true);
              const blur = () => context.moveAction(link, icon, link.matches(":hover"));
              link.addEventListener("pointerenter", enter);
              link.addEventListener("pointerleave", leave);
              link.addEventListener("focus", focus);
              link.addEventListener("blur", blur);
              listeners.push(() => {
                link.removeEventListener("pointerenter", enter);
                link.removeEventListener("pointerleave", leave);
                link.removeEventListener("focus", focus);
                link.removeEventListener("blur", blur);
              });
            });

            context.add("toggleFaq", (details: HTMLDetailsElement, summary: HTMLElement, expanded: boolean) => {
              const height = details.getBoundingClientRect().height;
              gsap.killTweensOf(details, "height");
              gsap.set(details, { height: "auto", overflow: "hidden" });
              details.open = true;
              const target = expanded ? details.getBoundingClientRect().height : summary.getBoundingClientRect().height;
              gsap.fromTo(details, { height }, {
                height: target,
                duration: 0.3,
                ease: "power2.inOut",
                onComplete: () => {
                  details.open = expanded;
                  gsap.set(details, { clearProps: "height,overflow" });
                  ScrollTrigger.refresh();
                },
              });
            });

            all("#faq details").forEach((el) => {
              const details = el as HTMLDetailsElement;
              const summary = details.querySelector("summary");
              if (!summary) return;
              let expanded = details.open;
              const toggle = (event: MouseEvent) => {
                event.preventDefault();
                expanded = !expanded;
                context.toggleFaq(details, summary, expanded);
              };
              summary.addEventListener("click", toggle);
              listeners.push(() => {
                summary.removeEventListener("click", toggle);
                details.open = expanded;
              });
            });

            /* Headings: masked word rise. */
            all("[data-split]").forEach((heading) => {
              gsap.from(all("[data-wi]", heading), {
                yPercent: 115,
                duration: 1.05,
                ease: "expo.out",
                stagger: 0.045,
                scrollTrigger: { trigger: heading, start: "top 88%", once: true },
              });
            });

            /* Statement + story: words light up with scroll, chips open in step. */
            all("[data-scrub]").forEach((block) => {
              const words = all("[data-w]", block);
              const trigger = { trigger: block, start: "top 82%", end: "bottom 52%", scrub: 0.6 };
              gsap.fromTo(words, { opacity: 0.13 }, { opacity: 1, ease: "none", stagger: 0.12, scrollTrigger: trigger });
              const chips = all("[data-chip]", block);
              if (chips.length) {
                gsap.fromTo(
                  chips,
                  { clipPath: "inset(0% 50% 0% 50% round 0.24em)", scale: 0.8 },
                  {
                    clipPath: "inset(0% 0% 0% 0% round 0.24em)",
                    scale: 1,
                    ease: "power2.out",
                    stagger: 0.35,
                    scrollTrigger: { ...trigger, end: "center 50%" },
                  },
                );
              }
            });

            /* Single blocks. */
            all("[data-reveal]").forEach((el) => {
              gsap.from(el, {
                y: 28,
                opacity: 0,
                duration: 0.9,
                ease: "power3.out",
                scrollTrigger: { trigger: el, start: "top 90%", once: true },
              });
            });

            /* Groups. */
            all("[data-reveal-group]").forEach((group) => {
              gsap.from(all("[data-reveal-item]", group), {
                y: 40,
                opacity: 0,
                duration: 0.95,
                ease: "power3.out",
                stagger: 0.1,
                scrollTrigger: { trigger: group, start: "top 86%", once: true },
              });
            });

            /* Panel pictograms pop after their card arrives. */
            all(`.${s.pictogram}`).forEach((icon) => {
              gsap.from(icon, {
                scale: 0.4,
                rotation: -18,
                duration: 0.9,
                delay: 0.25,
                ease: "back.out(1.8)",
                scrollTrigger: { trigger: icon, start: "top 90%", once: true },
              });
            });

            /* Floating panels (donation tracker). */
            all("[data-rise]").forEach((el) => {
              gsap.from(el, {
                y: 90,
                opacity: 0,
                duration: 1.2,
                ease: "expo.out",
                scrollTrigger: { trigger: el, start: "top 92%", once: true },
              });
            });

            /* Count-ups. */
            all("[data-count]").forEach((el) => {
              const target = Number(el.dataset.count);
              const prefix = el.dataset.prefix ?? "";
              const suffix = el.dataset.suffix ?? "";
              const state = { value: 0 };
              const render = () => {
                el.textContent = `${prefix}${Math.round(state.value)}${suffix}`;
              };
              gsap.to(state, {
                value: target,
                duration: target > 10 ? 1.6 : 1,
                ease: "power2.out",
                onUpdate: render,
                onStart: render,
                scrollTrigger: { trigger: el, start: "top 88%", once: true },
                onComplete: () => {
                  el.textContent = `${prefix}${target}${suffix}`;
                },
              });
            });

            /* Hairlines. */
            all("[data-draw]").forEach((el) => {
              gsap.fromTo(
                el,
                { "--draw": 0 },
                {
                  "--draw": 1,
                  duration: 1.3,
                  ease: "expo.out",
                  scrollTrigger: { trigger: el, start: "top 90%", once: true },
                },
              );
            });

            /* Footer wordmark. */
            all("[data-letters]").forEach((word) => {
              gsap.from(all("[data-l]", word), {
                yPercent: 105,
                duration: 1.2,
                ease: "expo.out",
                stagger: 0.05,
                scrollTrigger: { trigger: word, start: "top 95%", once: true },
              });
            });

            /* Band photos drift inside their frames. */
            all("[data-parallax]").forEach((picture) => {
              const img = picture.querySelector("img");
              const band = picture.parentElement;
              if (!img || !band) return;
              gsap.fromTo(
                img,
                { yPercent: -7, scale: 1.16 },
                {
                  yPercent: 7,
                  scale: 1.16,
                  ease: "none",
                  scrollTrigger: { trigger: band, start: "top bottom", end: "bottom top", scrub: true },
                },
              );
            });

            if (!wide) return release;

            /* Bands grow from an inset card as they arrive (Stellar). */
            all("[data-grow]").forEach((band) => {
              gsap.fromTo(
                band,
                { scale: 0.93, borderRadius: 32 },
                {
                  scale: 1,
                  borderRadius: 20,
                  ease: "none",
                  scrollTrigger: { trigger: band, start: "top bottom", end: "top 30%", scrub: true },
                },
              );
            });

            /* Pinned photo rail: vertical scroll moves the strip sideways. */
            all("[data-pin-rail]").forEach((wrap) => {
              const rail = wrap.querySelector<HTMLElement>("[data-rail]");
              const track = wrap.querySelector<HTMLElement>("[data-rail-track]");
              if (!rail || !track) return;
              const section = wrap.closest("section");
              if (section) {
                section.classList.add(s.railPinned);
                pinned.push(section);
              }
              rail.scrollLeft = 0;
              const distance = () => {
                const style = getComputedStyle(rail);
                const inner = rail.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
                return Math.max(0, track.scrollWidth - inner);
              };
              gsap.to(track, {
                x: () => -distance(),
                ease: "none",
                scrollTrigger: {
                  trigger: wrap,
                  start: "center center",
                  end: () => `+=${distance()}`,
                  pin: true,
                  scrub: 0.8,
                  anticipatePin: 1,
                  invalidateOnRefresh: true,
                },
              });
            });

            return release;
          },
        );

        // Images and fonts settle after first paint; recompute trigger positions once they do.
        const refresh = () => ScrollTrigger.refresh();
        window.addEventListener("load", refresh, { once: true });
        void document.fonts?.ready.then(refresh);

        cleanup = () => {
          window.removeEventListener("load", refresh);
          mm.revert();
        };
      })
      .catch(() => {
        // Motion is optional; the page is complete without it.
      });

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  return null;
}
