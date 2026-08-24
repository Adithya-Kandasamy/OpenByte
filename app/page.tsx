"use client";

import { useEffect, useState } from "react";
import type { Icon } from "@phosphor-icons/react";
import {
  ArrowRight,
  BookOpenText,
  Buildings,
  CheckCircle,
  Devices,
  Gift,
  HandHeart,
  Laptop,
  Plus,
  ShieldCheck,
  Student,
  UsersThree,
} from "@phosphor-icons/react";
import { DonationTracker } from "../components/donation-tracker";

const DONATE_URL =
  "https://hcb.hackclub.com/donations/start/openbyte-non-profit";

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
    title: "Kids tech labs",
    description:
      "We make space for kids to try things, ask questions, and build something they can show off.",
    examples: "Coding / creative projects / safer internet",
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
            <a href="#drives" onClick={closeMenu}>
              Device drives
            </a>
            <a href="#donate" onClick={closeMenu}>
              Live impact
            </a>
            <a className="nav-cta" href="#apply" onClick={closeMenu}>
              Get involved <ArrowRight aria-hidden="true" />
            </a>
          </nav>
        </div>
        <span
          className="scroll-progress"
          style={{ transform: `scaleX(${scrollProgress})` }}
          aria-hidden="true"
        />
      </header>

      <main>
        <section id="home" className="hero">
          <div className="shell hero-grid">
            <div className="hero-copy" data-reveal>
              <p className="eyebrow">
                <span className="eyebrow-mark" aria-hidden="true" />
                Teaching across generations
              </p>
              <h1>
                Technology should feel <em>possible</em> for everyone.
              </h1>
              <p className="hero-intro">
                OpenByte helps kids learn by making, helps older adults feel more
                comfortable with everyday technology, and gives good devices a
                chance to be useful again.
                </p>
              <div className="hero-actions">
                <a className="button button-primary" href="#programs">
                  Find a program <ArrowRight aria-hidden="true" />
                </a>
                <a className="button button-outline" href="#apply">
                  Volunteer or donate
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

          <div className="impact-band">
            <div className="shell impact-band-inner">
              <span className="impact-label">What we do</span>
              <span>Digital confidence</span>
              <b aria-hidden="true">/</b>
              <span>Device donation drives</span>
              <b aria-hidden="true">/</b>
              <span>Kids tech labs</span>
              <b aria-hidden="true">/</b>
              <span>Support for older adults</span>
              <b aria-hidden="true">/</b>
              <span>Internet safety</span>
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
              <h2>Having a device helps. Knowing what to do with it helps more.</h2>
            </div>
            <div className="body-copy">
              <p>
                Technology is part of everyday life now. We help kids make sense
                of it, help older adults use it with less stress, and help useful
                devices find a home.
              </p>
              <p>
                No jargon. No pressure. Just practical help and people who meet
                you where you are.
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

        <section id="programs" className="section programs-section">
          <div className="shell">
            <div className="section-heading" data-reveal>
              <div>
                <p className="eyebrow">How we help</p>
                <h2>Start with whatever you need.</h2>
              </div>
              <p>
                There’s no perfect door to come through. Pick what sounds like
                you, and we’ll take it from there.
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
                    <a href="#apply">
                      Get involved <ArrowRight aria-hidden="true" />
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
                <a className="button button-light" href="#apply">
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
                Still not sure? That’s what the form is for—tell us what you’re
                trying to do.
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
                  Yes. Tell us what you have through the form. We’ll let you
                  know if it fits a current drive before you bring or send
                  anything.
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

        <section id="apply" className="section apply-section">
          <div className="shell">
            <div className="section-heading apply-heading" data-reveal>
              <div>
                <p className="eyebrow">Come say hello</p>
                <h2>Want to learn, help out, or partner with us?</h2>
              </div>
              <div>
                <p>
                  Tell us what you have in mind. We’ll get back to you with the
                  most useful next step.
                </p>
                <a
                  className="text-link"
                  href="https://forms.gle/ZRpKRfmobkuyH1Ne6"
                  target="_blank"
                  rel="noreferrer"
                >
                  Open the form <ArrowRight aria-hidden="true" />
                </a>
              </div>
            </div>
            <div className="form-frame" data-reveal>
              <iframe
                src="https://forms.gle/ZRpKRfmobkuyH1Ne6"
                title="OpenByte application and sign-up form"
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
          <p>Helping kids learn, helping older adults feel confident, and getting good devices back into use.</p>
          <div className="footer-links">
            <a href="#about">Mission</a>
            <a href="#programs">Programs</a>
            <a href="#drives">Device drives</a>
            <a href="#donate">Live impact</a>
            <a href="#apply">Get involved</a>
          </div>
        </div>
        <div className="shell footer-meta">
          <span>© 2026 OpenByte Non-Profit</span>
          <a href="https://hackclub.com" target="_blank" rel="noreferrer">
            Fiscally sponsored by Hack Club
          </a>
        </div>
      </footer>
    </>
  );
}
