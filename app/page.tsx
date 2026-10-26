"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Icon } from "@phosphor-icons/react";
import {
  ArrowRight,
  BookOpenText,
  Buildings,
  CheckCircle,
  Devices,
  EnvelopeSimple,
  Gift,
  HandHeart,
  InstagramLogo,
  Laptop,
  Plus,
  ShieldCheck,
  Student,
  UsersThree,
} from "@phosphor-icons/react";
import { DonationTracker } from "../components/donation-tracker";

// Keep the original sponsor artwork available if the resized image service fails.
const ADEEPT_POST_ORIGINAL = "https://d2ol7oe51mr4n9.cloudfront.net/user_3K77yucLkXD8gM0VHqAnyMSm9U2/6e40843b-289a-4a70-a0dc-28649b02cbb3.png";
const ASHBURN_POST_ORIGINAL = "https://d2ol7oe51mr4n9.cloudfront.net/user_3K77yucLkXD8gM0VHqAnyMSm9U2/37a2de9b-6d01-427a-a2d6-c50f8b85f2d1.png";

function sponsorImageUrl(original: string) {
  return `https://images.weserv.nl/?url=${encodeURIComponent(original)}&w=880&output=webp&q=78`;
}

function SponsorArtwork({
  original,
  alt,
  className,
  width,
  height,
}: {
  original: string;
  alt: string;
  className?: string;
  width: number;
  height: number;
}) {
  return (
    <img
      className={className}
      src={sponsorImageUrl(original)}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      onError={(event) => {
        // Preserve the original user-supplied graphic if the CDN cannot load it.
        if (event.currentTarget.getAttribute("src") !== original) {
          event.currentTarget.src = original;
        }
      }}
    />
  );
}

const DONATE_URL =
  "https://hcb.hackclub.com/donations/start/openbyte-non-profit";

const TECH_DONATION_FORM_URL =
  "https://docs.google.com/forms/d/1ssA5nRFnhq44thGzA4qyUXg45BCEITjNPce8BsVD-ac/viewform";

const helpTopics = [
  {
    id: "kids",
    number: "01",
    icon: "kids",
    title: "Kids and families",
    description: "Try a hands-on project and learn your way around tech.",
    action: "See kids programs",
    href: "#programs",
  },
  {
    id: "seniors",
    number: "02",
    icon: "seniors",
    title: "Older adults and caregivers",
    description: "Get patient help with the everyday things you do online.",
    action: "Find older adult support",
    href: "#programs",
  },
  {
    id: "devices",
    number: "03",
    icon: "devices",
    title: "Device donors and partners",
    description: "Give a device, host a drive, or help someone get connected.",
    action: "Help move devices",
    href: "#drives",
  },
];

const programs = [
  {
    icon: "kids",
    number: "01",
    label: "For kids",
    title: "Coding & electronics workshops",
    description:
      "From building a first webpage to lighting LEDs with Arduino, our students learn by making things.",
    examples: "Websites / Arduino / circuits / coding",
  },
  {
    icon: "seniors",
    number: "02",
    label: "For older adults",
    title: "Digital confidence for older adults",
    description:
      "Bring the phone, laptop, or online task that has been getting in the way. We’ll work through it together.",
    examples: "Phone basics / online forms / video calls / scam spotting",
  },
  {
    icon: "devices",
    number: "03",
    label: "For the community",
    title: "Community device drives",
    description:
      "We collect useful devices, prepare them for a new home, and connect them with people who can use them.",
    examples: "Device drop-offs / local drives / volunteer help",
  },
];

const driveWays = [
  {
    icon: Gift,
    number: "01",
    title: "Tell us what you have",
    description:
      "We’ll let you know if it fits a current need and what to do next.",
  },
  {
    icon: Buildings,
    number: "02",
    title: "Host a drive",
    description:
      "Schools, libraries, businesses, and neighbors can collect devices with us.",
  },
  {
    icon: UsersThree,
    number: "03",
    title: "Pitch in where you can",
    description:
      "Help with pickup, sorting, outreach, workshops, or the cost of getting devices where they need to go.",
  },
];

const topicIcons: Record<string, Icon> = {
  kids: Student,
  seniors: HandHeart,
  devices: Devices,
  learn: BookOpenText,
  safety: ShieldCheck,
};

function TopicIcon({ name }: { name: string }) {
  const IconComponent = topicIcons[name] ?? Laptop;
  return <IconComponent aria-hidden="true" weight="duotone" />;
}

function Logo() {
  return (
    <img
      className="site-logo"
      src="/openbyte-logo-transparent.png"
      alt="OpenByte — Innovate, Connect, Empower"
    />
  );
}

export default function Home() {
  const pageRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTopicId, setActiveTopicId] = useState(helpTopics[0].id);
  const [scrollProgress, setScrollProgress] = useState(0);
  const closeMenu = () => setMenuOpen(false);
  const activeTopic =
    helpTopics.find((topic) => topic.id === activeTopicId) ?? helpTopics[0];

  useEffect(() => {
    const updateScrollProgress = () => {
      const available =
        document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(available > 0 ? window.scrollY / available : 0);
    };

    updateScrollProgress();
    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    window.addEventListener("resize", updateScrollProgress);

    return () => {
      window.removeEventListener("scroll", updateScrollProgress);
      window.removeEventListener("resize", updateScrollProgress);
    };
  }, []);

  useLayoutEffect(() => {
    const root = pageRef.current;
    if (!root) return;

    gsap.registerPlugin(ScrollTrigger);

    let refreshId: number | undefined;
    const context = gsap.context(() => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reduceMotion) return;

      const select = <T extends Element>(
        selector: string,
        scope: ParentNode = root,
      ) => Array.from(scope.querySelectorAll<T>(selector));

      const heroCopy = root.querySelector<HTMLElement>(".hero-copy");
      const entryPanel = root.querySelector<HTMLElement>(".entry-panel");
      const heroParts = heroCopy
        ? select<HTMLElement>(
            ".eyebrow, h1, .hero-intro, .hero-actions, .hero-proof",
            heroCopy,
          )
        : [];
      const entryRows = entryPanel
        ? select<HTMLElement>(".entry-row", entryPanel)
        : [];
      const entryNext = entryPanel
        ? entryPanel.querySelector<HTMLElement>(".entry-next")
        : null;

      gsap.set(heroParts, { opacity: 0, y: 24 });
      gsap.set(entryPanel, { opacity: 0, x: 34 });
      gsap.set(entryRows, { opacity: 0, x: 22 });
      gsap.set(entryNext, { opacity: 0, y: 18 });

      const heroTimeline = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      heroTimeline
        .to(heroParts, {
          opacity: 1,
          y: 0,
          duration: 0.68,
          stagger: 0.09,
        })
        .to(
          entryPanel,
          {
            opacity: 1,
            x: 0,
            duration: 0.78,
          },
          0.2,
        )
        .to(
          entryRows,
          {
            opacity: 1,
            x: 0,
            duration: 0.48,
            stagger: 0.07,
          },
          0.44,
        )
        .to(
          entryNext,
          {
            opacity: 1,
            y: 0,
            duration: 0.46,
          },
          "-=0.18",
        );

      const revealTargets = select<HTMLElement>("[data-reveal]").filter(
        (element) => !element.closest(".hero"),
      );

      revealTargets.forEach((element) => {
        gsap.from(element, {
          opacity: 0,
          y: 34,
          duration: 0.78,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 84%",
            once: true,
          },
        });
      });

      const staggeredRows = [
        ...select<HTMLElement>(".mission-flow-item"),
        ...select<HTMLElement>(".program-row"),
        ...select<HTMLElement>(".drive-row"),
        ...select<HTMLElement>(".steps li"),
      ];

      staggeredRows.forEach((row) => {
        gsap.from(row, {
          opacity: 0,
          x: 26,
          duration: 0.58,
          ease: "power3.out",
          scrollTrigger: {
            trigger: row,
            start: "top 88%",
            once: true,
          },
        });
      });

      const audienceLinks = select<HTMLElement>(".audience-strip a");
      gsap.from(audienceLinks, {
        opacity: 0,
        y: 18,
        duration: 0.58,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".audience-strip",
          start: "top 92%",
          once: true,
        },
      });

      const photoFigures = select<HTMLElement>(".photo-proof figure");
      gsap.from(photoFigures, {
        opacity: 0,
        y: 26,
        duration: 0.7,
        stagger: 0.14,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".photo-proof",
          start: "top 82%",
          once: true,
        },
      });

      const faqItems = select<HTMLElement>(".faq-list details");
      gsap.from(faqItems, {
        opacity: 0,
        x: 22,
        duration: 0.52,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".faq-list",
          start: "top 82%",
          once: true,
        },
      });

      const impactBand = root.querySelector<HTMLElement>(".impact-band-inner");
      if (impactBand) {
        gsap.from(impactBand, {
          opacity: 0,
          y: 12,
          duration: 0.72,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".impact-band",
            start: "top 94%",
            once: true,
          },
        });

        gsap.from(select<HTMLElement>(".impact-item", impactBand), {
          opacity: 0,
          x: 18,
          duration: 0.46,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".impact-band",
            start: "top 94%",
            once: true,
          },
        });
      }

      refreshId = window.requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    }, root);

    return () => {
      if (refreshId !== undefined) window.cancelAnimationFrame(refreshId);
      context.revert();
    };
  }, []);

  useLayoutEffect(() => {
    const root = pageRef.current;
    const navigation = document.querySelector<HTMLElement>(".site-nav");
    if (!root || !navigation || !menuOpen) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const links = Array.from(navigation.querySelectorAll<HTMLElement>("a"));
    const context = gsap.context(() => {
      gsap.from(links, {
        opacity: 0,
        y: -8,
        duration: 0.3,
        stagger: 0.06,
        ease: "power2.out",
      });
    }, navigation);

    return () => context.revert();
  }, [menuOpen]);

  useLayoutEffect(() => {
    const root = pageRef.current;
    const activeRow = root?.querySelector<HTMLElement>(
      ".entry-row.is-active",
    );
    if (!root || !activeRow) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const activeParts = [
      activeRow.querySelector<HTMLElement>(".entry-icon"),
      activeRow.querySelector<HTMLElement>(".entry-arrow"),
      root.querySelector<HTMLElement>(".entry-next strong"),
    ].filter((element): element is HTMLElement => Boolean(element));
    const context = gsap.context(() => {
      gsap.from(activeParts, {
        opacity: 0.45,
        scale: 0.9,
        y: 3,
        duration: 0.34,
        stagger: 0.05,
        ease: "back.out(1.7)",
        clearProps: "all",
      });
    }, root);

    return () => context.revert();
  }, [activeTopicId]);

  return (
    <>
      <header className="site-header">
        <div className="shell header-inner">
          <a className="logo-link" href="#home" onClick={closeMenu}>
            <Logo />
          </a>

          <button
            className="menu-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="main-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="sr-only">Toggle navigation</span>
            <span />
            <span />
          </button>

          <nav
            id="main-navigation"
            className={`site-nav${menuOpen ? " is-open" : ""}`}
            aria-label="Main navigation"
          >
            <a href="#about" onClick={closeMenu}>
              Mission
            </a>
            <a href="#programs" onClick={closeMenu}>
              Programs
            </a>
            <a href="#sponsors" onClick={closeMenu}>
              Sponsors
            </a>
            <a href="#drives" onClick={closeMenu}>
              Device drives
            </a>
            <a href="#donate" onClick={closeMenu}>
              Live impact
            </a>
            <a href="#contact" onClick={closeMenu}>
              Contact
            </a>
            <a className="nav-cta" href="#apply" onClick={closeMenu}>
              OpenByte Positions <ArrowRight aria-hidden="true" />
            </a>
          </nav>
        </div>
        <span
          className="scroll-progress"
          style={{ transform: `scaleX(${scrollProgress})` }}
          aria-hidden="true"
        />
      </header>

      <main ref={pageRef}>
        <section id="home" className="hero">
          <div className="shell hero-grid">
            <div className="hero-copy" data-reveal>
              <p className="eyebrow">
                <span className="eyebrow-mark" aria-hidden="true" />
                Student-led in Ashburn, Virginia
              </p>
              <h1>
                We're students helping people <em>learn technology.</em>
              </h1>
              <p className="hero-intro">
                We run hands-on coding and electronics workshops, help people
                get comfortable with everyday tech, and work to give useful
                donated devices a second life.
                </p>
              <div className="hero-actions">
                <a className="button button-primary" href="#programs">
                  Find a program <ArrowRight aria-hidden="true" />
                </a>
                <a className="button button-outline" href="#apply">
                  OpenByte Positions
                </a>
              </div>
              <div className="hero-proof" aria-label="OpenByte commitments">
                <span>
                  <CheckCircle aria-hidden="true" weight="fill" /> Hands-on
                  learning
                </span>
                <span>
                  <CheckCircle aria-hidden="true" weight="fill" /> Patient
                  guidance
                </span>
                <span>
                  <CheckCircle aria-hidden="true" weight="fill" /> Community
                  access
                </span>
              </div>
            </div>

            <aside
              className="entry-panel"
              aria-label="Choose how to connect with OpenByte"
              data-reveal
            >
              <div className="entry-panel-head">
                <div>
                  <span>Choose a starting point</span>
                  <strong>Who are you here for?</strong>
                </div>
                <span className="open-community">
                  <CheckCircle aria-hidden="true" weight="fill" /> Open to the
                  community
                </span>
              </div>
              <div className="entry-list">
                {helpTopics.map((topic) => (
                  <button
                    type="button"
                    className={`entry-row${activeTopicId === topic.id ? " is-active" : ""}`}
                    key={topic.id}
                    aria-pressed={activeTopicId === topic.id}
                    onClick={() => setActiveTopicId(topic.id)}
                  >
                    <span className="entry-number">{topic.number}</span>
                    <span className="entry-icon">
                      <TopicIcon name={topic.icon} />
                    </span>
                    <span className="entry-copy">
                      <strong>{topic.title}</strong>
                      <span>{topic.description}</span>
                    </span>
                    <ArrowRight className="entry-arrow" aria-hidden="true" />
                  </button>
                ))}
              </div>
              <a className="entry-next" href={activeTopic.href}>
                <span>
                  <small>Start here</small>
                  <strong>{activeTopic.action}</strong>
                </span>
                <ArrowRight aria-hidden="true" />
              </a>
            </aside>
          </div>

          <div className="impact-band" aria-label="How OpenByte helps">
            <div className="shell impact-band-inner">
              <div className="impact-label">
                <span className="impact-label-kicker">What we do</span>
                <strong>Learn it.<br />Build it.</strong>
              </div>
              <div className="impact-track">
                <span className="impact-item">
                  <b>01</b>
                  <span>Build real projects</span>
                </span>
                <span className="impact-item">
                  <b>02</b>
                  <span>Ask tech questions</span>
                </span>
                <span className="impact-item">
                  <b>03</b>
                  <span>Reuse good devices</span>
                </span>
                <span className="impact-item">
                  <b>04</b>
                  <span>Learn online safety</span>
                </span>
              </div>
            </div>
          </div>

          <div className="audience-strip">
            <div className="shell audience-strip-inner">
              <a href="#programs">
                <span>For families</span>
                Hands-on projects and safer tech habits for kids.
                <ArrowRight aria-hidden="true" />
              </a>
              <a href="#programs">
                <span>For older adults</span>
                Patient help with phones, laptops, and everyday online tasks.
                <ArrowRight aria-hidden="true" />
              </a>
              <a href="#drives">
                <span>For donors and partners</span>
                Give a device, host a drive, or help fund the work.
                <ArrowRight aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        <section id="about" className="section mission-section">
          <div className="shell mission-intro" data-reveal>
            <div>
              <p className="eyebrow">Why this matters</p>
              <h2>We want people to feel comfortable learning technology.</h2>
            </div>
            <div className="body-copy">
              <p>
                A first website. A working LED circuit. Figuring out how to use
                a phone or laptop. These might seem like small steps, but they
                can make technology feel a lot less intimidating.
              </p>
              <p>
                We teach at a pace people can follow, with enough time to ask
                questions, make mistakes, and try again.
              </p>
            </div>
          </div>

          <div className="shell mission-flow" data-reveal>
            <div className="mission-flow-label">One mission / three movements</div>
            <div className="mission-flow-item">
              <span>01</span>
              <strong>Kids learn by making.</strong>
              <p>They try things, ask questions, and share what they build.</p>
            </div>
            <div className="mission-flow-item">
              <span>02</span>
              <strong>Older adults get time.</strong>
              <p>We slow down, listen, and work through the task together.</p>
            </div>
            <div className="mission-flow-item">
              <span>03</span>
              <strong>Devices go where they help.</strong>
              <p>A good device gets another chance to help.</p>
            </div>
          </div>

          <div className="shell photo-proof" data-reveal>
            <div className="photo-proof-copy">
              <span>From the room</span>
              <strong>The best part is seeing it click.</strong>
              <p>
                Students build something, explain it, and leave knowing they can
                do more than they thought.
              </p>
            </div>
            <figure>
              <img
                src="/media/student-project.webp"
                alt="Students demonstrating an interactive website they built"
                loading="lazy"
              />
              <figcaption>Made by students.</figcaption>
            </figure>
            <figure>
              <img
                src="/media/recognition-moment.webp"
                alt="Students receiving recognition after their presentations"
                loading="lazy"
              />
              <figcaption>A little recognition goes a long way.</figcaption>
            </figure>
          </div>
        </section>

        <section id="team" className="section human-section">
          <div className="shell human-grid">
            <div className="human-story" data-reveal>
              <p className="eyebrow">Meet the people behind OpenByte</p>
              <h2>We're the students behind OpenByte.</h2>
              <p>
                We&apos;re Adithya, Abdullah, and Bodha, three students at Stone Bridge
                High School. We started OpenByte after noticing how many
                people wanted to learn technology but didn&apos;t always have
                someone nearby who could help.
              </p>
              <p>
                Our first outreach events didn&apos;t go as planned. Not many people
                showed up, even after we handed out flyers. We learned that
                the best way to get people interested was to give them
                something they could actually learn or build.
              </p>
              <ul className="founder-list" aria-label="OpenByte co-founders">
                <li>Adithya Kandasamy</li>
                <li>Abdullah Ahamed</li>
                <li>Bodha Achi</li>
              </ul>
              <span className="founder-note">
                OpenByte co-founders · Stone Bridge High School
              </span>
              <figure className="feature-photo">
                <img
                  src="/media/openbyte-founders-bulldog-tribune.webp"
                  alt="The three OpenByte co-founders standing by their technology education display with laptop and electronics kit"
                  loading="lazy"
                  width="865"
                  height="1000"
                />
                <figcaption>
                  The three of us sharing OpenByte&apos;s projects at a community
                  showcase. Photo featured in the{" "}
                  <a
                    href="https://www.bulldogtribune.com/feature/2026/10/09/openbyte-opens-technological-pathways/#"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Bulldog Tribune
                  </a>.
                </figcaption>
              </figure>
              <figure className="team-photo">
                <img
                  src="/media/demo-day-team.webp"
                  alt="OpenByte team members and volunteers presenting together at a coding Demo Day"
                  loading="lazy"
                  width="512"
                  height="384"
                />
                <figcaption>
                  Our team presenting at a student coding Demo Day.
                </figcaption>
              </figure>
            </div>

            <div className="human-progress" data-reveal>
              <p className="eyebrow">Our progress so far · October 2026</p>
              <h3>Here's what we've done so far.</h3>
              <div className="human-milestones">
                <div className="human-milestone">
                  <strong>~15</strong>
                  <span>
                    Students at an early coding and web-development workshop
                  </span>
                </div>
                <div className="human-milestone">
                  <strong>3</strong>
                  <span>
                    ESP32 smart-car kits donated by Adeept for hands-on learning
                  </span>
                </div>
              </div>
              <p className="progress-note">
                We&apos;ve also started our fall Arduino and Electronics program.
                We&apos;ll add attendance, completed projects, and devices
                distributed as we verify the results.
              </p>
              <a
                className="press-feature-link"
                href="https://www.bulldogtribune.com/feature/2026/10/09/openbyte-opens-technological-pathways/#"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Read our Bulldog Tribune feature</span>
                <strong>OpenByte Opens Technological Pathways</strong>
                <small>By Saadya Bojja · October 9, 2026</small>
                <ArrowRight aria-hidden="true" />
              </a>
              <figure className="progress-photo">
                <img
                  src="/media/workshop-room.webp"
                  alt="Real participants and student instructors at an OpenByte coding workshop"
                  loading="lazy"
                  width="512"
                  height="384"
                />
                <figcaption>
                  One of our early coding workshops, photographed during Demo Day.
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section id="sponsors" className="section sponsor-section">
          <div className="shell">
            <div className="sponsor-intro" data-reveal>
              <p className="eyebrow">Community partners</p>
              <h2>Made possible by our supporters.</h2>
              <p>
                We're grateful to the local businesses and STEM organizations
                helping OpenByte bring hands-on technology education to more students.
              </p>
            </div>

            <div className="sponsor-grid">
              <article className="sponsor-card" data-reveal>
                <div className="sponsor-card-top">
                  <div className="sponsor-brand" aria-label="Adeept logo">
                    <span className="sponsor-logo-window sponsor-logo-adeept">
                      <SponsorArtwork
                        original={ADEEPT_POST_ORIGINAL}
                        alt="Adeept"
                        width={1846}
                        height={1860}
                      />
                    </span>
                  </div>
                  <div className="sponsor-card-info">
                    <span className="sponsor-kind">STEM kit sponsor</span>
                    <h3>Adeept</h3>
                    <p>
                      Adeept donated <strong>three ESP32 smart-car kits</strong>,
                      supporting hands-on robotics and electronics education.
                    </p>
                    <a
                      className="sponsor-link"
                      href="https://www.adeept.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Visit Adeept <ArrowRight aria-hidden="true" />
                    </a>
                  </div>
                </div>
                <figure className="sponsor-post">
                  <a
                    href={ADEEPT_POST_ORIGINAL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Open full-size Adeept thank-you graphic"
                  >
                    <SponsorArtwork
                      original={ADEEPT_POST_ORIGINAL}
                      alt="OpenByte's Adeept thank-you post showing three donated STEM kit boxes"
                      width={1846}
                      height={1860}
                    />
                  </a>
                  <figcaption>OpenByte's thank-you graphic for Adeept's kit donation.</figcaption>
                </figure>
              </article>

              <article className="sponsor-card" data-reveal>
                <div className="sponsor-card-top">
                  <div className="sponsor-brand" aria-label="Ashburn Art Classes logo">
                    <span className="sponsor-logo-window sponsor-logo-ashburn">
                      <SponsorArtwork
                        original={ASHBURN_POST_ORIGINAL}
                        alt="Ashburn Art Classes"
                        width={1882}
                        height={1866}
                      />
                    </span>
                  </div>
                  <div className="sponsor-card-info">
                    <span className="sponsor-kind">Community donor</span>
                    <h3>Ashburn Art Classes</h3>
                    <p>
                      Thank you to Ashburn Art Classes for its <strong>$250 donation</strong>
                      toward expanding accessible STEM learning in our community.
                    </p>
                    <a
                      className="sponsor-link"
                      href="https://ashburnartclasses.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Visit Ashburn Art Classes <ArrowRight aria-hidden="true" />
                    </a>
                  </div>
                </div>
                <figure className="sponsor-post">
                  <a
                    href={ASHBURN_POST_ORIGINAL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Open full-size Ashburn Art Classes thank-you graphic"
                  >
                    <SponsorArtwork
                      original={ASHBURN_POST_ORIGINAL}
                      alt="OpenByte's thank-you post displaying Ashburn Art Classes' logo and recognizing its $250 donation"
                      width={1882}
                      height={1866}
                    />
                  </a>
                  <figcaption>OpenByte's thank-you graphic for Ashburn Art Classes.</figcaption>
                </figure>
              </article>
            </div>
          </div>
        </section>

        <section id="programs" className="section programs-section">
          <div className="shell">
            <div className="section-heading" data-reveal>
              <div>
                <p className="eyebrow">How we help</p>
                <h2>Here's what we're working on.</h2>
              </div>
              <p>
                We teach coding and electronics, offer help with everyday tech,
                and organize local device donation efforts.
              </p>
            </div>

            <div className="program-list" data-reveal>
              {programs.map((program) => (
                <article className="program-row" key={program.title}>
                  <span className="program-number">{program.number}</span>
                  <span className="program-icon">
                    <TopicIcon name={program.icon} />
                  </span>
                  <div className="program-title">
                    <span>{program.label}</span>
                    <h3>{program.title}</h3>
                  </div>
                  <p className="program-description">{program.description}</p>
                  <div className="program-footer">
                    <span>{program.examples}</span>
                    <a href="#contact">
                      Contact OpenByte <ArrowRight aria-hidden="true" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="drives" className="drive-section">
          <div className="shell drive-grid">
            <div className="drive-copy" data-reveal>
              <p className="eyebrow">Got a device to spare?</p>
              <h2>It might be exactly what someone else needs.</h2>
              <p>
                A laptop or phone sitting in a drawer can help someone learn,
                apply for a job, stay in touch, or get through an everyday task.
              </p>
              <div className="drive-actions">
                <a className="button button-light" href="#tech-donation">
                  Give a device <ArrowRight aria-hidden="true" />
                </a>
                <a className="text-link text-link-light" href="#donate">
                  Help fund a drive <ArrowRight aria-hidden="true" />
                </a>
              </div>
            </div>

            <div className="drive-list" data-reveal>
              {driveWays.map((way) => {
                const WayIcon = way.icon;
                return (
                  <article className="drive-row" key={way.title}>
                    <span className="drive-number">{way.number}</span>
                    <span className="drive-icon">
                      <WayIcon aria-hidden="true" weight="duotone" />
                    </span>
                    <div>
                      <h3>{way.title}</h3>
                      <p>{way.description}</p>
                    </div>
                    <ArrowRight aria-hidden="true" />
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="tech-donation" className="section apply-section">
          <div className="shell">
            <div className="section-heading apply-heading" data-reveal>
              <div>
                <p className="eyebrow">Donate technology</p>
                <h2>Give your unused tech a new purpose.</h2>
              </div>
              <div>
                <p>
                  Have a laptop, tablet, phone, or another device to donate?
                  Fill out this form with the device details and your preferred
                  drop-off or pickup option. We&apos;ll follow up to confirm the
                  next steps before you bring or send anything.
                </p>
                <a
                  className="text-link"
                  href={TECH_DONATION_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open the technology donation form <ArrowRight aria-hidden="true" />
                </a>
              </div>
            </div>
            <div className="form-frame" data-reveal>
              <iframe
                src={`${TECH_DONATION_FORM_URL}?embedded=true`}
                title="OpenByte technology donation form"
                loading="lazy"
                width="100%"
                height="900"
              >
                Loading form…
              </iframe>
            </div>
          </div>
        </section>

        <section className="section start-section">
          <div className="shell start-grid" data-reveal>
            <div>
              <p className="eyebrow">Not sure where to start?</p>
              <h2>That’s okay. We can start with a conversation.</h2>
            </div>
            <ol className="steps">
              <li>
                <span>01</span>
                <div>
                  <strong>Tell us what you need.</strong>
                  <p>Learn, get support, give a device, or volunteer.</p>
                </div>
              </li>
              <li>
                <span>02</span>
                <div>
                  <strong>Share the useful details.</strong>
                  <p>You don’t need to have the perfect words.</p>
                </div>
              </li>
              <li>
                <span>03</span>
                <div>
                  <strong>We’ll point you in the right direction.</strong>
                  <p>We’ll connect you with the right person or program.</p>
                </div>
              </li>
            </ol>
          </div>
        </section>

        <section id="donate" className="section donate-section">
          <div className="shell donate-grid" data-reveal>
            <div className="donate-copy">
              <p className="eyebrow">Support OpenByte</p>
              <h2>Help someone get unstuck.</h2>
              <p>
                Your donation helps us run kids&apos; workshops, sit with older
                adults as they learn, and get donated devices ready for their
                next home. The total and leaderboard update from Hack Club Bank.
              </p>
              <a
                className="button button-primary"
                href={DONATE_URL}
                target="_blank"
                rel="noreferrer"
              >
                Donate through Hack Club Bank <ArrowRight aria-hidden="true" />
              </a>
              <small>
                OpenByte is fiscally sponsored by Hack Club, a 501(c)(3)
                nonprofit. Donations are tax-deductible.
              </small>
            </div>
            <DonationTracker />
          </div>
        </section>

        <section className="section faq-section">
          <div className="shell faq-grid">
            <div data-reveal>
              <p className="eyebrow">Questions people ask</p>
              <h2>A few answers before you reach out.</h2>
              <p className="faq-intro">
                Still not sure? Email team@openbyte-np.org and tell us what
                you’re trying to do.
              </p>
            </div>
            <div className="faq-list" data-reveal>
              <details>
                <summary>
                  <span>Is OpenByte only for beginners?</span>
                  <Plus aria-hidden="true" />
                </summary>
                <p>
                  No. Programs start with the person in front of us. The goal is
                  practical progress, whether that means a first step or a new
                  project.
                </p>
              </details>
              <details>
                <summary>
                  <span>Can I give you a used device?</span>
                  <Plus aria-hidden="true" />
                </summary>
                <p>
                  Yes. Fill out our <a href="#tech-donation">technology donation
                  form</a> with details about the device. We&apos;ll follow up
                  to confirm the next steps before you bring or send anything.
                </p>
              </details>
              <details>
                <summary>
                  <span>Can my school, library, or business work with you?</span>
                  <Plus aria-hidden="true" />
                </summary>
                <p>
                  Yes. We can talk about hosting a class, organizing a collection,
                  providing space, or supporting outreach.
                </p>
              </details>
              <details>
                <summary>
                  <span>Where can I see what donations are doing?</span>
                  <Plus aria-hidden="true" />
                </summary>
                <p>
                  The live total and donor leaderboard above come directly from
                  OpenByte&apos;s Hack Club Bank account.
                </p>
              </details>
            </div>
          </div>
        </section>

        <section id="contact" className="drive-section contact-section">
          <div className="shell drive-grid">
            <div className="drive-copy" data-reveal>
              <p className="eyebrow">Contact OpenByte</p>
              <h2>Have a question? Get in touch.</h2>
              <p>
                For partnerships, sponsorships, volunteering, program questions,
                device donations, or general questions, reach out by email or
                Instagram.
              </p>
            </div>

            <div className="drive-list" data-reveal>
              <a
                className="drive-row contact-row"
                href="mailto:team@openbyte-np.org"
              >
                <span className="drive-number">01</span>
                <span className="drive-icon">
                  <EnvelopeSimple aria-hidden="true" weight="duotone" />
                </span>
                <div>
                  <h3>Email OpenByte</h3>
                  <p>team@openbyte-np.org</p>
                </div>
                <ArrowRight aria-hidden="true" />
              </a>
              <a
                className="drive-row contact-row"
                href="https://www.instagram.com/openbyte.nonprofit/"
                target="_blank"
                rel="noreferrer"
              >
                <span className="drive-number">02</span>
                <span className="drive-icon">
                  <InstagramLogo aria-hidden="true" weight="duotone" />
                </span>
                <div>
                  <h3>Instagram</h3>
                  <p>@openbyte.nonprofit</p>
                </div>
                <ArrowRight aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        <section id="apply" className="section apply-section">
          <div className="shell">
            <div className="section-heading apply-heading" data-reveal>
              <div>
                <p className="eyebrow">OpenByte Positions</p>
                <h2>Interested in joining OpenByte?</h2>
              </div>
              <div>
                <p>
                  Use the OpenByte Positions form below to apply to join the
                  team.
                </p>
                <a
                  className="text-link"
                  href="https://forms.gle/ZRpKRfmobkuyH1Ne6"
                  target="_blank"
                  rel="noreferrer"
                >
                  Open the Positions form <ArrowRight aria-hidden="true" />
                </a>
              </div>
            </div>
            <div className="form-frame" data-reveal>
              <iframe
                src="https://forms.gle/ZRpKRfmobkuyH1Ne6"
                title="OpenByte Positions form"
                loading="lazy"
                width="100%"
                height="700"
              >
                Loading form…
              </iframe>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="shell footer-inner">
          <Logo />
          <p>
            Helping kids learn, helping older adults feel confident, and getting
            good devices back into use.
            <br />
            For partnerships, sponsorships, volunteering, or general questions,
            contact us at team@openbyte-np.org or on Instagram @openbyte.nonprofit.
          </p>
          <div className="footer-links">
            <a href="#about">Mission</a>
            <a href="#team">Our team &amp; progress</a>
            <a href="#sponsors">Sponsors</a>
            <a href="#programs">Programs</a>
            <a href="#drives">Device drives</a>
            <a href="#tech-donation">Donate technology</a>
            <a href="#donate">Live impact</a>
            <a href="#contact">Contact</a>
            <a href="#apply">OpenByte Positions</a>
          </div>
        </div>
        <div className="shell footer-meta">
          <span>© 2026 OpenByte Non-Profit</span>
          <a href="mailto:team@openbyte-np.org">
            Email: team@openbyte-np.org
          </a>
          <a
            href="https://www.instagram.com/openbyte.nonprofit/"
            target="_blank"
            rel="noreferrer"
          >
            Instagram: @openbyte.nonprofit
          </a>
          <a href="https://hackclub.com" target="_blank" rel="noreferrer">
            Fiscally sponsored by Hack Club
          </a>
        </div>
      </footer>
    </>
  );
}
