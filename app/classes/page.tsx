import type { Metadata } from "next";
import { SiteNav } from "../../components/site-nav";
import { SiteFooter } from "../../components/site-footer";
import { Reveal } from "../../components/reveal";
import { BLINK_CODE, CLASS_INQUIRY_URL, LESSONS } from "../../lib/site-content";
import { BreadboardFigure } from "../../components/figures";

export const metadata: Metadata = {
  title: "Beginner Arduino & Electronics Classes | OpenByte",
  description:
    "Hands-on Arduino and electronics for grades 6–9. Explore OpenByte's documented lessons, class details, and parts used. Contact the student team for future availability.",
  alternates: { canonical: "/classes/" },
};

export default function Classes() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <SiteNav />
      <Reveal />
      <main id="main-content" tabIndex={-1} className="classes-page">
        <section className="class-hero">
          <div className="shell">
            <a className="back-link" href="/#programs">
              ← All programs
            </a>
            <div className="class-hero-grid">
              <div>
                <p className="mono eyebrow">OpenByte education / Grades 6–9</p>
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
                <BreadboardFigure />
                <figcaption className="mono">
                  FIG 0.2 / Build an LED circuit
                </figcaption>
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
                <p className="mono eyebrow">01 / Lesson timeline</p>
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
              <p className="mono eyebrow">02 / On the workbench</p>
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
                500 ms on. 500 ms off. Try the editable preview on the{" "}
                <a href="/">homepage ↗</a>.
              </p>
            </div>
          </div>
        </section>
        <section className="section" aria-labelledby="details-title">
          <div className="shell class-grid">
            <div>
              <p className="mono eyebrow">03 / Before you ask</p>
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
            <p className="mono eyebrow">
              Talk to the students behind the class
            </p>
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
      <SiteFooter />
    </>
  );
}
