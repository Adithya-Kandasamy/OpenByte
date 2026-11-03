import { Fragment } from "react";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr/ArrowRight";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";
import { DonationTracker } from "./donation-tracker";
import { ProgramExplorer } from "./program-explorer";
import { RoomRail } from "./room-rail";
import { Circuitry } from "@phosphor-icons/react/dist/ssr/Circuitry";
import { HandHeart } from "@phosphor-icons/react/dist/ssr/HandHeart";
import { Laptop } from "@phosphor-icons/react/dist/ssr/Laptop";
import { Package } from "@phosphor-icons/react/dist/ssr/Package";
import {
  CLASS_INQUIRY_URL,
  DEVICE_FORM_URL,
  DONATE_URL,
  POSITIONS_URL,
  TRIBUNE_URL,
  external,
} from "../lib/site-content";
import s from "../app/home.module.css";

const SPONSORS = [
  { name: "Adeept", href: "https://www.adeept.com/", tone: s.wmTight },
  { name: "Ashburn Art Classes", href: "https://ashburnartclasses.com/", tone: s.wmCaps },
  { name: "Robeks of Loudoun", href: "https://order.robeks.com/menu/ashburn", tone: s.wmLight },
  { name: "Hack Club", href: "https://hackclub.com", tone: s.wmMono },
  { name: "Bulldog Tribune", href: TRIBUNE_URL, tone: s.wmBold },
];

const ADEEPT_POST =
  "https://d2ol7oe51mr4n9.cloudfront.net/user_3K77yucLkXD8gM0VHqAnyMSm9U2/6e40843b-289a-4a70-a0dc-28649b02cbb3.png";
const ASHBURN_POST =
  "https://d2ol7oe51mr4n9.cloudfront.net/user_3K77yucLkXD8gM0VHqAnyMSm9U2/37a2de9b-6d01-427a-a2d6-c50f8b85f2d1.png";
const ROBEKS_POST = "https://www.canva.com/design/DAHZzstU38Y/SwgYxNDxCYcTTIwcrSMyNg/view";

const ROOM = [
  { name: "room-website", caption: "Made by students.", alt: "Students demonstrating an interactive website they built" },
  { name: "room-recognition", caption: "A little recognition goes a long way.", alt: "Students receiving recognition after their presentations" },
  { name: "room-workshop", caption: "One of our early coding workshops, photographed during Demo Day.", alt: "Real participants and student instructors at an OpenByte coding workshop" },
  { name: "room-demo-day", caption: "Our team presenting at a student coding Demo Day.", alt: "OpenByte team members and volunteers presenting together at a coding Demo Day" },
  { name: "room-coding", caption: "Code on the big screen at Demo Day.", alt: "Students presenting code on a projector screen to a seated audience" },
  { name: "room-presenters", caption: "Students explaining what they built.", alt: "Student presenters at the front of a room during an OpenByte Demo Day" },
];

/** Heading words wrapped for a masked rise-in. Plain text without JS. */
function Split({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, index) => (
        <Fragment key={index}>
          <span className={s.w}><span data-wi>{word}</span></span>
          {index < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </>
  );
}

/** Words that brighten as they scroll through the viewport. */
function ScrubWords({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, index) => (
        <Fragment key={index}>
          <span data-w>{word}</span>
          {index < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </>
  );
}

function Chip({ name, alt }: { name: string; alt: string }) {
  return (
    <img
      className={s.chip}
      data-chip
      src={`/media/home/${name}-200.webp`}
      srcSet={`/media/home/${name}-200.webp 200w, /media/home/${name}-400.webp 400w`}
      sizes="(max-width: 640px) 64px, 120px"
      width={200}
      height={120}
      loading="lazy"
      decoding="async"
      alt={alt}
    />
  );
}

/** Full-bleed photographic band: portrait crop on phones, wide crop elsewhere. */
function Band({ name, alt }: { name: string; alt: string }) {
  return (
    <picture className={s.bandPhoto} data-parallax>
      <source media="(max-width: 640px)" srcSet={`/media/home/${name}-m-720.webp`} />
      <img
        src={`/media/home/${name}-1200.webp`}
        srcSet={`/media/home/${name}-1200.webp 1200w, /media/home/${name}-2000.webp 2000w`}
        sizes="calc(100vw - 48px)"
        width={1200}
        height={600}
        loading="lazy"
        decoding="async"
        alt={alt}
      />
    </picture>
  );
}

export function HomeSections() {
  return (
    <>
      {/* ---------- Why this matters: scroll-lit statement (Stellar) ---------- */}
      <section id="about" className={s.statement} aria-labelledby="statement-title">
        <div className={s.wrap}>
          <div className={s.statementGrid}>
            <h2 id="statement-title" className={s.statementText} data-scrub>
              <ScrubWords text="A first website." />
              <Chip name="chip-website" alt="Students presenting a website they built, with its code projected beside it" />{" "}
              <ScrubWords text="A working LED circuit." />
              <Chip name="chip-circuit" alt="Close-up of an Arduino circuit board" />{" "}
              <ScrubWords text="Figuring out how to use a phone or laptop." />
              <Chip name="chip-help" alt="Participants seated at tables during an OpenByte workshop" />{" "}
              <span className={s.statementQuiet}>
                <ScrubWords text="These might seem like small steps, but they can make technology feel a lot less intimidating." />
              </span>
            </h2>
            <div className={s.statementFoot} data-reveal>
              <p>
                We teach at a pace people can follow, with enough time to ask
                questions, make mistakes, and try again.
              </p>
              <a className={s.textLink} href="/classes/">
                Explore our classes <ArrowRight size={18} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        <div className={s.sponsors}>
          <div className={s.wrap}>
            <div className={s.sponsorRow} data-reveal>
              <p className={s.caption}>Supported by and featured in</p>
              <div className={s.marquee}>
                <div className={s.marqueeTrack}>
                  <ul className={s.marqueeList} aria-label="Supporters and press">
                    {SPONSORS.map((sponsor) => (
                      <li key={sponsor.name}>
                        <a className={sponsor.tone} href={sponsor.href} {...external}>{sponsor.name}</a>
                      </li>
                    ))}
                  </ul>
                  <ul className={s.marqueeList} aria-hidden="true">
                    {SPONSORS.map((sponsor) => (
                      <li key={sponsor.name}>
                        <a className={sponsor.tone} href={sponsor.href} tabIndex={-1} {...external}>{sponsor.name}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Programs: hover list + photo (Stellar "backyard") ---------- */}
      <section id="programs" className={s.section} aria-labelledby="programs-title">
        <div className={s.wrap}>
          <h2 id="programs-title" className={`${s.h2} ${s.sectionTitle}`} data-split>
            <Split text="Here’s what we’re working on." />
          </h2>
          <div data-reveal>
            <ProgramExplorer />
          </div>
        </div>
      </section>

      {/* ---------- Progress: navy figures band ---------- */}
      <section id="progress" className={s.figures} aria-labelledby="progress-title" data-grow>
        <div className={s.mapStage}>
          <div className={s.mapHead}>
            <p className={s.caption} data-reveal>Progress / October 2026</p>
            <h2 id="progress-title" className={s.h2} data-split>
              <Split text="Classes, workshops, and donated kits." />
            </h2>
            <a className={s.textLink} href="/classes/#lesson-circuits" data-reveal>
              View the lessons <ArrowRight size={18} aria-hidden="true" />
            </a>
          </div>
          <div className={s.mapFrame} aria-hidden="true">
            <picture>
              <source media="(max-width: 640px)" srcSet="/media/home/map-m-900.webp" />
              <img
                src="/media/home/map-1300.webp"
                srcSet="/media/home/map-1300.webp 1300w, /media/home/map-2000.webp 2000w"
                sizes="calc(100vw - 48px)"
                width={1300}
                height={500}
                loading="lazy"
                decoding="async"
                alt=""
              />
            </picture>
            <span className={s.mapPin}>
              <i />
              <span>Ashburn, Virginia</span>
            </span>
          </div>
        </div>
        <div className={s.figuresInner}>
          <ul className={s.progressList} data-reveal-group>
            <li data-reveal-item>
              <span className={s.progressNum} data-count="2">2</span>
              <h3>Arduino lessons</h3>
              <p>
                Students explored current, resistance, and LED circuits, then
                programmed a blinking LED in the Arduino IDE.
              </p>
            </li>
            <li data-reveal-item>
              <span className={s.progressNum} data-count="1">1</span>
              <h3>Introductory workshop</h3>
              <p>Our July workshop introduced responsible AI and web development.</p>
            </li>
            <li data-reveal-item>
              <span className={s.progressNum} data-count="3">3</span>
              <h3>Robotics kits from Adeept</h3>
              <p>
                Adeept donated ESP32 smart-car kits to support hands-on robotics
                and electronics education.
              </p>
            </li>
          </ul>
          <p className={s.progressNote} data-reveal>
            Student attendance and kit handoff totals are still being reconciled
            before we publish them.
          </p>
        </div>
      </section>

      {/* ---------- Class feature band (Radiating Hope) ---------- */}
      <section id="arduino" className={s.feature} aria-labelledby="class-title" data-grow>
        <Band name="band-class" alt="A breadboard circuit with glowing green LEDs and jumper wires" />
        <div className={s.featureShade} aria-hidden="true" />
        <div className={s.featureInner}>
          <Circuitry className={s.featureMark} size={64} weight="duotone" aria-hidden="true" />
          <h2 id="class-title" className={s.featureTitle} data-split>
            <Split text="Beginner Arduino & Electronics." />
          </h2>
          <p className={s.featureLead} data-reveal>
            Hands-on coding and circuits for students in grades 6–9. No previous
            electronics experience is required.
          </p>
          <div className={s.actionsCenter} data-reveal>
            <a className={s.btnLight} href={CLASS_INQUIRY_URL}>
              Ask about upcoming classes <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a className={s.btnGhostLight} href="/classes/">Class details</a>
          </div>
          <p className={s.featureFine} data-reveal>
            The current fall cohort is underway. Future dates have not been announced.
          </p>
        </div>
        <dl className={s.featureSpec} data-reveal>
          <div><dt>Who</dt><dd>Grades 6–9</dd></div>
          <div><dt>Fall 2026 fee</dt><dd>$100, including a take-home starter kit</dd></div>
          <div><dt>Format</dt><dd>Lessons began online; future in-person locations are subject to confirmation</dd></div>
        </dl>
      </section>

      {/* ---------- From the room: pinned horizontal rail (Stellar / Lusion) ---------- */}
      <section id="room" className={s.section} aria-labelledby="room-title">
        <div className={s.wrap} data-pin-rail>
          <RoomRail
            heading={
              <div>
                <h2 id="room-title" className={s.h2} data-split>
                  <Split text="The best part is seeing it click." />
                </h2>
                <p className={s.lead} data-reveal>
                  Students build something, explain it, and leave knowing they
                  can do more than they thought.
                </p>
              </div>
            }
          >
            {ROOM.map((photo) => (
              <figure key={photo.name}>
                <div className={s.railPhoto}>
                  <img
                    src={`/media/home/${photo.name}-480.webp`}
                    srcSet={`/media/home/${photo.name}-480.webp 480w, /media/home/${photo.name}-800.webp 800w`}
                    sizes="(max-width: 640px) 74vw, 340px"
                    width={480}
                    height={600}
                    loading="lazy"
                    decoding="async"
                    alt={photo.alt}
                  />
                </div>
                <figcaption>{photo.caption}</figcaption>
              </figure>
            ))}
          </RoomRail>
        </div>
      </section>

      {/* ---------- Team: scroll-lit story (Radiating Hope) ---------- */}
      <section id="team" className={s.section} aria-label="Our team">
        <div className={s.story}>
          <p className={s.storyBig} data-scrub>
            <ScrubWords text="We’re Adithya, Abdullah, and Bodha, three students at Stone Bridge High School. We started OpenByte after noticing how many people wanted to learn technology but didn’t always have someone nearby who could help." />
          </p>
          <p className={s.storySmall} data-reveal>
            Our first outreach events didn&apos;t go as planned. Not many people
            showed up, even after we handed out flyers. We learned that the best
            way to get people interested was to give them something they could
            actually learn or build.
          </p>
          <ul className={s.founders} aria-label="OpenByte co-founders" data-reveal-group>
            <li data-reveal-item><strong>Adithya Kandasamy</strong><span>Co-founder</span></li>
            <li data-reveal-item><strong>Abdullah Ahamed</strong><span>Co-founder</span></li>
            <li data-reveal-item><strong>Bodha Achi</strong><span>Co-founder</span></li>
          </ul>
          <a className={s.press} href={TRIBUNE_URL} {...external} data-reveal>
            <img src="/media/home/team-founders-560.webp" width={560} height={700} loading="lazy" decoding="async"
              alt="The three OpenByte co-founders standing by their technology education display with laptop and electronics kit" />
            <span className={s.pressText}>
              <span className={s.caption}>Featured in the Bulldog Tribune</span>
              <strong>OpenByte Opens Technological Pathways</strong>
              <span className={s.pressMeta}>By Saadya Bojja · October 9, 2026</span>
            </span>
            <ArrowUpRight className={s.pressArrow} size={22} aria-hidden="true" />
          </a>
        </div>
      </section>

      {/* ---------- Partners: counted ledger ---------- */}
      <section id="sponsors" className={s.section} aria-labelledby="partners-title">
        <div className={s.wrap}>
          <div className={s.splitHead}>
            <h2 id="partners-title" className={s.h2} data-split>
              <Split text="Made possible by our supporters." />
            </h2>
            <p className={s.lead} data-reveal>
              We&apos;re grateful to the local businesses and STEM organizations
              helping OpenByte bring hands-on technology education to more students.
            </p>
          </div>
          <ul className={s.ledger} data-reveal-group>
            <li data-reveal-item data-draw>
              <span className={s.ledgerFigure} data-count="3" data-suffix=" kits">3 kits</span>
              <div className={s.ledgerName}><h3>Adeept</h3><span>STEM kit sponsor</span></div>
              <p>Adeept donated <strong>three ESP32 smart-car kits</strong>, supporting hands-on robotics and electronics education.</p>
              <div className={s.ledgerLinks}>
                <a href="https://www.adeept.com/" {...external}>Visit Adeept <ArrowUpRight size={16} aria-hidden="true" /></a>
                <a href={ADEEPT_POST} {...external}>Thank-you graphic <ArrowUpRight size={16} aria-hidden="true" /></a>
              </div>
            </li>
            <li data-reveal-item data-draw>
              <span className={s.ledgerFigure} data-count="250" data-prefix="$">$250</span>
              <div className={s.ledgerName}><h3>Ashburn Art Classes</h3><span>Community donor</span></div>
              <p>Thank you to Ashburn Art Classes for its <strong>$250 donation</strong> toward expanding accessible STEM learning in our community.</p>
              <div className={s.ledgerLinks}>
                <a href="https://ashburnartclasses.com/" {...external}>Visit Ashburn Art Classes <ArrowUpRight size={16} aria-hidden="true" /></a>
                <a href={ASHBURN_POST} {...external}>Thank-you graphic <ArrowUpRight size={16} aria-hidden="true" /></a>
              </div>
            </li>
            <li data-reveal-item data-draw>
              <span className={s.ledgerFigure} data-count="100" data-prefix="$">$100</span>
              <div className={s.ledgerName}><h3>Robeks of Loudoun</h3><span>Local community sponsor</span></div>
              <p>Thank you to Robeks of Loudoun for its <strong>$100 donation</strong> supporting free and accessible technology education in our community.</p>
              <div className={s.ledgerLinks}>
                <a href="https://order.robeks.com/menu/ashburn" {...external}>Visit Robeks Broadlands <ArrowUpRight size={16} aria-hidden="true" /></a>
                <a href={ROBEKS_POST} {...external}>Thank-you graphic <ArrowUpRight size={16} aria-hidden="true" /></a>
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* ---------- Devices: one flow from ask to form (Réno panels) ---------- */}
      <section id="drives" className={s.section} aria-labelledby="drives-title">
        <div className={s.wrap}>
          <div className={s.splitHead}>
            <h2 id="drives-title" className={`${s.h2} ${s.h2Wide}`} data-split>
              <span className={s.h2Quiet}><Split text="Got a device to spare?" /></span>{" "}
              <Split text="It might be exactly what someone else needs." />
            </h2>
            <p className={s.lead} data-reveal>
              A laptop or phone sitting in a drawer can help someone learn, apply
              for a job, stay in touch, or get through an everyday task.
            </p>
          </div>

          <ol className={s.panels} data-reveal-group>
            <li className={s.panelMist} data-reveal-item>
              <a href={DEVICE_FORM_URL} {...external}>
                <span className={s.panelTop}><Laptop className={s.pictogram} size={56} weight="duotone" aria-hidden="true" /><span>01</span></span>
                <span className={s.panelBottom}>
                  <strong>Tell us what you have</strong>
                  <span>We&apos;ll let you know if it fits a current need and what to do next.</span>
                </span>
              </a>
            </li>
            <li className={s.panelTeal} data-reveal-item>
              <a href="mailto:team@openbyte-np.org?subject=Host%20a%20device%20drive">
                <span className={s.panelTop}><Package className={s.pictogram} size={56} weight="duotone" aria-hidden="true" /><span>02</span></span>
                <span className={s.panelBottom}>
                  <strong>Host a drive</strong>
                  <span>Schools, libraries, businesses, and neighbors can collect devices with us.</span>
                </span>
              </a>
            </li>
            <li className={s.panelSky} data-reveal-item>
              <a href="#donate">
                <span className={s.panelTop}><HandHeart className={s.pictogram} size={56} weight="duotone" aria-hidden="true" /><span>03</span></span>
                <span className={s.panelBottom}>
                  <strong>Pitch in where you can</strong>
                  <span>Help with pickup, sorting, outreach, workshops, or the cost of getting devices where they need to go.</span>
                </span>
              </a>
            </li>
          </ol>

          <div id="tech-donation" className={s.formCard} data-reveal>
            <div className={s.formRow}>
              <p className={s.formText}>
                Have a laptop, tablet, phone, or another device to donate? Share
                the device details and your preferred drop-off or pickup option.
                We&apos;ll follow up to confirm the next steps before you bring or
                send anything.
              </p>
              <a className={s.btnDark} href={DEVICE_FORM_URL} {...external}>
                Open the donation form <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            </div>
            <details className={s.formDetails}>
              <summary>Or fill it out here</summary>
              <iframe
                src={`${DEVICE_FORM_URL}?embedded=true`}
                title="OpenByte technology donation form"
                loading="lazy"
                width="100%"
                height="900"
              >
                Loading form…
              </iframe>
              <p className={s.fine}>
                If the form does not appear, use the button above. Read our{" "}
                <a href="/privacy/">privacy policy</a> before submitting.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* ---------- Donate: live tracker on photography (Radiating Hope) ---------- */}
      <section id="donate" className={s.donate} aria-labelledby="donate-title" data-grow>
        <Band name="band-donate" alt="A single LED glowing above a breadboard in a dark room" />
        <div className={s.donateShade} aria-hidden="true" />
        <div className={s.donateInner}>
          <div className={s.donateCopy}>
            <h2 id="donate-title" className={s.featureTitle} data-split>
              <Split text="Help someone get unstuck." />
            </h2>
            <p className={s.featureLead} data-reveal>
              Your donation helps us run kids&apos; workshops, sit with older adults
              as they learn, and get donated devices ready for their next home.
            </p>
            <div className={s.actions} data-reveal>
              <a className={s.btnLight} href={DONATE_URL} {...external}>
                Donate through Hack Club Bank <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            </div>
            <p className={s.bandFine} data-reveal>
              OpenByte is fiscally sponsored by Hack Club, a 501(c)(3) nonprofit.
              Donations are tax-deductible.
            </p>
          </div>
          <div className={s.funding} data-rise>
            <DonationTracker />
          </div>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section id="faq" className={s.section} aria-labelledby="faq-title">
        <div className={`${s.wrap} ${s.faqGrid}`}>
          <div>
            <h2 id="faq-title" className={s.h2} data-split>
              <Split text="A few answers before you reach out." />
            </h2>
            <p className={s.lead} data-reveal>
              Still not sure? Email{" "}
              <a className={s.inlineLink} href="mailto:team@openbyte-np.org">team@openbyte-np.org</a>{" "}
              and tell us what you&apos;re trying to do.
            </p>
          </div>
          <div className={s.faq} data-reveal-group>
            <details data-reveal-item data-draw>
              <summary>Is OpenByte only for beginners?</summary>
              <p>No. Programs start with the person in front of us. The goal is practical progress, whether that means a first step or a new project.</p>
            </details>
            <details data-reveal-item data-draw>
              <summary>Can I give you a used device?</summary>
              <p>Yes. Fill out our <a href="#tech-donation">technology donation form</a> with details about the device. We&apos;ll follow up to confirm the next steps before you bring or send anything.</p>
            </details>
            <details data-reveal-item data-draw>
              <summary>Can my school, library, or business work with you?</summary>
              <p>Yes. We can talk about hosting a class, organizing a collection, providing space, or supporting outreach.</p>
            </details>
            <details data-reveal-item data-draw>
              <summary>Where can I see what donations are doing?</summary>
              <p>The live total and donor leaderboard above come directly from OpenByte&apos;s Hack Club Bank account.</p>
            </details>
          </div>
        </div>
      </section>

      {/* ---------- Contact (Stellar "Let's talk") + positions strip ---------- */}
      <section id="contact" className={s.contact} aria-labelledby="contact-title" data-grow>
        <Band name="band-contact" alt="A laptop on a wooden desk beside a stack of books and a yellow chair" />
        <div className={s.contactInner}>
          <h2 id="contact-title" className={s.contactTitle} data-split>
            <Split text="Have a question? Get in touch." />
          </h2>
          <p className={s.contactLead} data-reveal>
            For partnerships, sponsorships, volunteering, program questions,
            device donations, or general questions, reach out by email or Instagram.
          </p>
          <div className={s.actions} data-reveal>
            <a className={s.btnDark} href="mailto:team@openbyte-np.org">
              Email team@openbyte-np.org <ArrowUpRight size={18} aria-hidden="true" />
            </a>
            <a className={s.btnGhostOnPhoto} href="https://www.instagram.com/openbyte.nonprofit/" {...external}>
              Instagram @openbyte.nonprofit
            </a>
          </div>
        </div>
      </section>

      <div id="apply" className={s.joinStrip} data-reveal>
        <div>
          <h2 className={s.joinTitle}>Interested in joining OpenByte?</h2>
          <p>
            The volunteer and leadership application opens in a new tab. For
            students under 18, please involve a parent or guardian as appropriate.
          </p>
        </div>
        <div className={s.joinActions}>
          <a className={s.btnDark} href={POSITIONS_URL} {...external}>
            Open positions application <ArrowUpRight size={18} aria-hidden="true" />
          </a>
          <p className={s.fine}>You can review our <a href="/privacy/">privacy policy</a> first.</p>
        </div>
      </div>
    </>
  );
}

export function HomeFooter() {
  return (
    <footer className={s.footer}>
      <div className={s.footerGrid}>
        <div className={s.footerBrand}>
          <a className={s.footerLogo} href="/" aria-label="OpenByte home">
            <img
              src="/media/brand/openbyte-logo.webp"
              width={640}
              height={191}
              loading="lazy"
              decoding="async"
              alt="OpenByte — Innovate, Connect, Empower"
            />
          </a>
          <p>
            Helping kids learn, helping older adults feel confident, and getting
            good devices back into use.
          </p>
          <a className={s.footerCta} href={DONATE_URL} {...external}>
            Support OpenByte <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        </div>
        <nav className={s.footerCols} aria-label="Footer">
          <div>
            <p className={s.caption}>Programs</p>
            <ul>
              <li><a href="#programs">Programs</a></li>
              <li><a href="/classes/">Arduino classes</a></li>
              <li><a href="#progress">Progress</a></li>
              <li><a href="#drives">Device drives</a></li>
            </ul>
          </div>
          <div>
            <p className={s.caption}>Organization</p>
            <ul>
              <li><a href="#team">Our team</a></li>
              <li><a href="#sponsors">Sponsors</a></li>
              <li><a href="#contact">Contact</a></li>
              <li><a href="/privacy/">Privacy</a></li>
            </ul>
          </div>
          <div>
            <p className={s.caption}>Get involved</p>
            <ul>
              <li><a href="#tech-donation">Give a device</a></li>
              <li><a href="#donate">Donate</a></li>
              <li><a href="#apply">OpenByte Positions</a></li>
            </ul>
          </div>
        </nav>
      </div>

      <p className={s.footerGiant} aria-hidden="true" data-letters>
        {"OpenByte".split("").map((letter, index) => (
          <span key={index} className={s.footerGiantMask}><span data-l>{letter}</span></span>
        ))}
      </p>

      <div className={s.footerMeta}>
        <span>© 2026 OpenByte Non-Profit</span>
        <a href="mailto:team@openbyte-np.org">team@openbyte-np.org</a>
        <a href="https://www.instagram.com/openbyte.nonprofit/" {...external}>Instagram @openbyte.nonprofit</a>
        <a href="https://hackclub.com" {...external}>Fiscally sponsored by Hack Club</a>
      </div>
      <details id="photo-credits" className={s.credits}>
        <summary>Photo credits</summary>
        <p>
          Program and background photos from Wikimedia Commons:{" "}
          <a href="https://commons.wikimedia.org/wiki/File:Arduino_semaforo_no-breadboard.jpg" {...external}>Mattruffoni</a>{" "}
          (<a href="https://creativecommons.org/licenses/by-sa/4.0/" {...external}>CC BY-SA 4.0</a>),{" "}
          <a href="https://commons.wikimedia.org/wiki/File:Man_with_smartphone_and_laptop_(Unsplash).jpg" {...external}>Alejandro Escamilla</a> (CC0),{" "}
          <a href="https://commons.wikimedia.org/wiki/File:Apple_MacBookPros_13-15-17_stacked_08-2009.jpg" {...external}>Benjamin.nagel</a>{" "}
          (<a href="https://creativecommons.org/licenses/by-sa/3.0/" {...external}>CC BY-SA 3.0</a>),{" "}
          <a href="https://commons.wikimedia.org/wiki/File:Breadboard_with_4008B.jpg" {...external}>Eeppeliteloop</a>{" "}
          (<a href="https://creativecommons.org/licenses/by-sa/3.0/" {...external}>CC BY-SA 3.0</a>),{" "}
          <a href="https://commons.wikimedia.org/wiki/File:RGB_LED_mounted_over_a_breadboard.jpg" {...external}>Viferico</a>{" "}
          (<a href="https://creativecommons.org/licenses/by-sa/4.0/" {...external}>CC BY-SA 4.0</a>),{" "}
          <a href="https://commons.wikimedia.org/wiki/File:Laptop_and_books_(Unsplash).jpg" {...external}>Kari Shea</a> (CC0).
          Cropped and resized; versions shared under the same licenses. Hero photo:{" "}
          <a href="https://unsplash.com/photos/blue-t16000-circuit-board-cuqTg0PElRI" {...external}>Harrison Broadbent</a>,{" "}
          <a href="https://unsplash.com/license" {...external}>Unsplash License</a>.
          These images illustrate our programs; they do not depict OpenByte events.
          Map outlines: U.S. Census Bureau state boundaries (public domain).
        </p>
      </details>
    </footer>
  );
}
