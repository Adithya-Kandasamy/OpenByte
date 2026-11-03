import type { Metadata, Viewport } from "next";
import { SiteNav } from "../../components/site-nav";
import { HomeFooter } from "../../components/home-sections";
import { HomeMotion } from "../../components/home-motion";
import { BLINK_CODE, CLASS_INQUIRY_URL, LESSONS } from "../../lib/site-content";
import shell from "../page.module.css";
import s from "./classes.module.css";

export const viewport: Viewport = { themeColor: "#fafaf8" };

export const metadata: Metadata = {
  title: "Beginner Arduino & Electronics Classes | OpenByte",
  description:
    "Hands-on Arduino and electronics for grades 6–9. Explore OpenByte's documented lessons, class details, and parts used. Contact the student team for future availability.",
  alternates: { canonical: "/classes/" },
};

export default function Classes() {
  return (
    <div className={shell.page}>
      <a className={shell.skipLink} href="#main-content">
        Skip to main content
      </a>
      <SiteNav />
      <HomeMotion />
      <main id="main-content" tabIndex={-1} className={s.content}>
        <section className="class-hero">
          <div className="shell">
            <a className="back-link" href="/#programs">
              ← All programs
            </a>
            <div className="class-hero-grid">
              <div>
                <p className="mono eyebrow">OpenByte education · Grades 6–9</p>
                <h1>
                  Beginner Arduino
                  <br />
                  &amp; Electronics.
                </h1>
                <p className="class-hero-sub">
                  Hands-on coding and circuits for students in grades 6–9. No
                  previous electronics experience is required.
                </p>
                <a className="btn btn-primary" href={CLASS_INQUIRY_URL}>
                  Ask about upcoming classes <span aria-hidden="true">↗</span>
                </a>
              </div>
              <figure className="class-hero-figure">
                <img
                  src="/media/hero/arduino-900.webp"
                  srcSet="/media/hero/arduino-560.webp 560w, /media/hero/arduino-900.webp 900w, /media/hero/arduino-1400.webp 1400w"
                  sizes="(max-width: 900px) calc(100vw - 72px), 42vw"
                  width={900}
                  height={506}
                  fetchPriority="high"
                  alt="A close-up of the components and connections on a blue Arduino circuit board"
                />
              </figure>
            </div>
            <div className="course-notice">
              <span className="mono">Current fall cohort underway</span>
              <p>
                Future registration dates, availability, and locations have not
                been announced. Contact our team for updates rather than using
                an expired form.
              </p>
            </div>
          </div>
        </section>
        <section className="section" aria-labelledby="timeline-title">
          <div className="shell">
            <div className="section-heading">
              <div>
                <h2 id="timeline-title">Learning by building.</h2>
              </div>
              <p>
                These dates and topics come from documented completed lessons.
                Further sessions and attendance will be published once verified.
              </p>
            </div>
            <ol className="course-timeline">
              {LESSONS.map((lesson, i) => (
                <li key={lesson.id} id={lesson.id} data-reveal>
                  <div className="timeline-meta">
                    <span className="mono">Lesson 0{i + 1} / Completed</span>
                    <time dateTime={lesson.iso}>{lesson.date}</time>
                  </div>
                  <div>
                    <h3>{lesson.title}</h3>
                    <p>{lesson.description}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="reconciliation">
              Exact student attendance and kit handoffs are still being
              reconciled before we publish totals.
            </p>
          </div>
        </section>
        <section className="section" aria-labelledby="parts-title">
          <div className="shell class-grid">
            <div data-reveal>
              <h2 id="parts-title">
                A few parts.
                <br />A first working circuit.
              </h2>
              <p className="body class-intro">
                These are the parts named in our documented blinking-LED lesson.
                The fall 2026 fee includes a take-home starter kit; this is not
                a complete kit inventory.
              </p>
              <ul className="parts-list">
                <li>
                  <span className="mono">01</span>
                  <strong>LED</strong>
                  <span>Light output</span>
                </li>
                <li>
                  <span className="mono">02</span>
                  <strong>Resistor</strong>
                  <span>Current limiting</span>
                </li>
                <li>
                  <span className="mono">03</span>
                  <strong>Microcontroller</strong>
                  <span>Arduino programming</span>
                </li>
              </ul>
            </div>
            <div className="class-code" data-reveal>
              <div className="code-caption mono">
                <span>Example sketch</span>
                <span>blink.ino</span>
              </div>
              <pre>
                <code>{BLINK_CODE}</code>
              </pre>
              <p className="code-footnote">
                500 ms on. 500 ms off. This example switches an LED on and off
                repeatedly.
              </p>
            </div>
          </div>
        </section>
        <section className="section" aria-labelledby="details-title">
          <div className="shell class-grid">
            <div>
              <h2 id="details-title">Class details.</h2>
              <dl className="specs">
                <div>
                  <dt>Who</dt>
                  <dd>Grades 6–9</dd>
                </div>
                <div>
                  <dt>Experience</dt>
                  <dd>No previous electronics experience required</dd>
                </div>
                <div>
                  <dt>Fall 2026 fee</dt>
                  <dd>$100, including a take-home starter kit</dd>
                </div>
                <div>
                  <dt>Format</dt>
                  <dd>
                    Lessons began online; future in-person locations are subject
                    to confirmation
                  </dd>
                </div>
              </dl>
            </div>
            <div className="class-faq">
              <details>
                <summary>Can I register for the next class?</summary>
                <p>
                  The current fall cohort is underway. Future registration
                  dates, availability, and locations have not been announced.{" "}
                  <a href={CLASS_INQUIRY_URL}>Contact our team for updates</a>.
                </p>
              </details>
              <details>
                <summary>What have students learned so far?</summary>
                <p>
                  Our first two online Arduino lessons covered current,
                  resistance, and LED circuits, followed by Arduino IDE
                  programming and a blinking-LED project.
                </p>
              </details>
              <details>
                <summary>Do students need electronics experience?</summary>
                <p>
                  No previous electronics experience is required. This beginner
                  class is for students in grades 6–9.
                </p>
              </details>
              <details>
                <summary>Can my school or library work with you?</summary>
                <p>
                  Yes. We can talk about hosting a class, organizing a
                  collection, providing space, or supporting outreach. Email{" "}
                  <a href="mailto:team@openbyte-np.org">team@openbyte-np.org</a>
                  .
                </p>
              </details>
            </div>
          </div>
        </section>
        <section className="section class-contact">
          <div className="shell">
            <h2>
              We can start with
              <br />a conversation.
            </h2>
            <p>
              Tell us what you&apos;re trying to learn. We&apos;ll point you in
              the right direction.
            </p>
            <a className="btn btn-primary" href={CLASS_INQUIRY_URL}>
              Email OpenByte <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>
      </main>
      <HomeFooter homePath="/" />
    </div>
  );
}
