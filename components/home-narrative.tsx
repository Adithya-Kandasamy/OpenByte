import { ArrowRight } from "@phosphor-icons/react/dist/ssr/ArrowRight";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";
import { DonationTracker } from "./donation-tracker";
import { LessonPreview } from "./lesson-preview";
import { BreadboardFigure, DevicesFigure, DrivesFigure } from "./figures";
import {
  CLASS_INQUIRY_URL,
  DEVICE_FORM_URL,
  DONATE_URL,
  LESSONS,
  POSITIONS_URL,
  TRIBUNE_URL,
  external,
} from "../lib/site-content";
import s from "../app/home-narrative.module.css";

const SUPPORTERS = [
  { name: "Adeept", role: "Three ESP32 smart-car kits", href: "https://www.adeept.com/" },
  { name: "Ashburn Art Classes", role: "$250 community donation", href: "https://ashburnartclasses.com/" },
  { name: "Robeks of Loudoun", role: "$100 community donation", href: "https://order.robeks.com/menu/ashburn" },
  { name: "Hack Club", role: "Fiscal sponsor", href: "https://hackclub.com" },
  { name: "Bulldog Tribune", role: "Community coverage", href: TRIBUNE_URL },
];

function Photo({
  name,
  alt,
  sizes,
}: {
  name: string;
  alt: string;
  sizes: string;
}) {
  return (
    <img
      src={`/media/home/${name}-480.webp`}
      srcSet={`/media/home/${name}-480.webp 480w, /media/home/${name}-800.webp 800w`}
      sizes={sizes}
      width={800}
      height={1000}
      loading="lazy"
      decoding="async"
      alt={alt}
    />
  );
}

export function HomeNarrative() {
  return (
    <>
      <section id="programs" className={s.programs} aria-labelledby="programs-title">
        <div className={s.wrap}>
          <header className={s.programsIntro} data-reveal>
            <h2 id="programs-title">Three practical ways we help.</h2>
            <p>
              Classes for students, patient help with everyday technology, and
              local device collection efforts. Each program starts with a real
              task someone wants to complete.
            </p>
          </header>

          <div className={s.programList}>
            <article className={s.programRow} data-reveal>
              <div className={s.programCopy}>
                <p className={s.audience}>For students in grades 6–9</p>
                <h3>Coding and electronics workshops</h3>
                <p>
                  Students move from a first circuit to code they can change and
                  test. The current Arduino class began online with electricity,
                  resistance, the Arduino IDE, and a blinking LED.
                </p>
                <a className={s.textLink} href="/classes/">
                  Explore the Arduino class <ArrowRight size={18} aria-hidden="true" />
                </a>
              </div>
              <figure className={s.programPhoto}>
                <img
                  src="/media/student-project-800.webp"
                  srcSet="/media/student-project-480.webp 480w, /media/student-project-800.webp 800w, /media/student-project-1200.webp 1200w"
                  sizes="(max-width: 900px) calc(100vw - 48px), 58vw"
                  width={1200}
                  height={900}
                  loading="lazy"
                  decoding="async"
                  alt="Students presenting an interactive website they built, with its code projected beside it"
                />
                <figcaption>Students presenting a website they built.</figcaption>
              </figure>
            </article>

            <article className={`${s.programRow} ${s.programRowReverse}`} data-reveal>
              <figure className={s.programIllustration}>
                <DevicesFigure />
                <figcaption>Bring the device and the task that is getting in the way.</figcaption>
              </figure>
              <div className={s.programCopy}>
                <p className={s.audience}>For older adults</p>
                <h3>Help with everyday technology</h3>
                <p>
                  We work through phones, laptops, video calls, online forms,
                  and other everyday tasks at a pace that leaves room for
                  questions and repetition.
                </p>
                <a className={s.textLink} href="mailto:team@openbyte-np.org?subject=Digital%20help">
                  Ask for technology help <ArrowRight size={18} aria-hidden="true" />
                </a>
              </div>
            </article>

            <article className={s.programRow} data-reveal>
              <div className={s.programCopy}>
                <p className={s.audience}>For the community</p>
                <h3>Device drives and reuse</h3>
                <p>
                  We collect useful laptops, tablets, and phones, then coordinate
                  the next step with each donor before anything is dropped off or
                  picked up.
                </p>
                <a className={s.textLink} href={DEVICE_FORM_URL} {...external}>
                  Tell us about a device <ArrowUpRight size={18} aria-hidden="true" />
                </a>
              </div>
              <figure className={`${s.programIllustration} ${s.programIllustrationBlue}`}>
                <DrivesFigure />
                <figcaption>A device can be useful again instead of sitting in a drawer.</figcaption>
              </figure>
            </article>
          </div>
        </div>
      </section>

      <section id="arduino" className={s.lab} aria-labelledby="lab-title">
        <div className={s.labInner}>
          <div className={s.labCopy} data-reveal>
            <p className={s.labLabel}>Beginner Arduino &amp; Electronics</p>
            <h2 id="lab-title">Change the code. Watch the circuit respond.</h2>
            <p className={s.labLead}>
              The preview runs the same 500&nbsp;ms HIGH and LOW timing students
              use in the Blink sketch. Change either delay to see what the code
              does to the LED.
            </p>
            <dl className={s.labSpecs}>
              <div><dt>Who</dt><dd>Grades 6–9</dd></div>
              <div><dt>Fall 2026 fee</dt><dd>$100, including a take-home starter kit</dd></div>
              <div><dt>Format</dt><dd>Online lessons began in October; future locations are not yet confirmed</dd></div>
            </dl>
            <div className={s.labActions}>
              <a className={s.lightButton} href={CLASS_INQUIRY_URL}>
                Ask about the next class <ArrowRight size={18} aria-hidden="true" />
              </a>
              <a className={s.darkTextLink} href="/classes/">Read the class details</a>
            </div>
          </div>
          <div className={s.labDemo} data-reveal>
            <LessonPreview />
          </div>
        </div>
      </section>

      <section id="progress" className={s.evidence} aria-labelledby="progress-title">
        <div className={s.wrap}>
          <header className={s.evidenceIntro} data-reveal>
            <h2 id="progress-title">Documented so far.</h2>
            <p>
              A short record of completed lessons, donated equipment, and the
              first workshop. Attendance and kit handoff totals are still being
              reconciled before publication.
            </p>
          </header>

          <div className={s.evidenceLayout}>
            <dl className={s.counts} data-reveal-group>
              <div data-reveal-item>
                <dd>2</dd>
                <dt>documented online Arduino lessons</dt>
              </div>
              <div data-reveal-item>
                <dd>3</dd>
                <dt>Adeept ESP32 smart-car kits donated</dt>
              </div>
              <div data-reveal-item>
                <dd>1</dd>
                <dt>responsible-AI and web workshop held in July</dt>
              </div>
            </dl>

            <div className={s.lessonLog} data-reveal>
              <p className={s.logTitle}>Lesson log / October 2026</p>
              <ol>
                {LESSONS.map((lesson) => (
                  <li key={lesson.id}>
                    <time dateTime={lesson.iso}>{lesson.date}</time>
                    <div>
                      <h3>{lesson.title}</h3>
                      <p>{lesson.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <a className={s.textLink} href="/classes/">
                Open the complete class page <ArrowRight size={18} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="room" className={s.room} aria-labelledby="room-title">
        <div className={s.wrap}>
          <header className={s.roomIntro} data-reveal>
            <h2 id="room-title">From the room.</h2>
            <p>Real OpenByte workshops, presentations, and student projects.</p>
          </header>
          <div className={s.roomGrid} data-reveal-group>
            <figure className={s.roomLarge} data-reveal-item>
              <Photo name="room-website" sizes="(max-width: 760px) calc(100vw - 48px), 62vw" alt="Students demonstrating an interactive website they built" />
              <figcaption>Students demonstrate the website they built.</figcaption>
            </figure>
            <figure data-reveal-item>
              <Photo name="room-recognition" sizes="(max-width: 760px) calc(100vw - 48px), 28vw" alt="Students receiving recognition after presenting their projects" />
              <figcaption>Recognition after the presentations.</figcaption>
            </figure>
            <figure data-reveal-item>
              <Photo name="room-workshop" sizes="(max-width: 760px) calc(100vw - 48px), 28vw" alt="Participants and student instructors at an OpenByte coding workshop" />
              <figcaption>An early coding workshop during Demo Day.</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section id="team" className={s.team} aria-labelledby="team-title">
        <div className={s.wrap}>
          <div className={s.teamGrid}>
            <figure className={s.teamPhoto} data-reveal>
              <img
                src="/media/home/team-founders-800.webp"
                srcSet="/media/home/team-founders-560.webp 560w, /media/home/team-founders-800.webp 800w"
                sizes="(max-width: 900px) calc(100vw - 48px), 44vw"
                width={800}
                height={1000}
                loading="lazy"
                decoding="async"
                alt="OpenByte co-founders Adithya Kandasamy, Abdullah Ahamed, and Bodha Achi at their technology education display"
              />
              <figcaption>OpenByte&apos;s three co-founders at a community showcase.</figcaption>
            </figure>
            <div className={s.teamCopy} data-reveal>
              <h2 id="team-title">Three students from Stone Bridge High School.</h2>
              <p className={s.teamLead}>
                Adithya Kandasamy, Abdullah Ahamed, and Bodha Achi started
                OpenByte after noticing that people often wanted to learn
                technology but did not have someone nearby to ask.
              </p>
              <ul className={s.founderList} aria-label="OpenByte co-founders">
                <li><strong>Adithya Kandasamy</strong><span>Co-founder</span></li>
                <li><strong>Abdullah Ahamed</strong><span>Co-founder</span></li>
                <li><strong>Bodha Achi</strong><span>Co-founder</span></li>
              </ul>
              <a className={s.textLink} href={TRIBUNE_URL} {...external}>
                Read the Bulldog Tribune profile <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            </div>
          </div>

          <div id="sponsors" className={s.supporters} data-reveal>
            <div className={s.supporterIntro}>
              <h3>Supported locally.</h3>
              <p>Approved logos are still needed; these are text wordmarks.</p>
            </div>
            <ul>
              {SUPPORTERS.map((supporter) => (
                <li key={supporter.name}>
                  <a href={supporter.href} {...external}>
                    <strong>{supporter.name}</strong>
                    <span>{supporter.role}</span>
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="donate" className={s.support} aria-labelledby="support-title">
        <div className={s.wrap}>
          <header className={s.supportIntro} data-reveal>
            <h2 id="support-title">Fund a workshop or give a device.</h2>
            <p>
              The donation total and leaderboard below come directly from Hack
              Club Bank. Device donors can use the separate form so the team can
              confirm the next step first.
            </p>
          </header>
          <div className={s.supportLayout}>
            <div className={s.funding} data-reveal>
              <DonationTracker />
              <a className={s.darkButton} href={DONATE_URL} {...external}>
                Donate through Hack Club Bank <ArrowUpRight size={18} aria-hidden="true" />
              </a>
              <p className={s.fiscalNote}>
                OpenByte is fiscally sponsored by Hack Club, a 501(c)(3)
                nonprofit. Donations are tax-deductible.
              </p>
            </div>
            <aside id="tech-donation" className={s.deviceAction} data-reveal>
              <div className={s.deviceFigure}>
                <BreadboardFigure />
              </div>
              <div>
                <h3>Have useful technology to give?</h3>
                <p>
                  Share the device type, condition, and your preferred pickup or
                  drop-off option. The team will reply before you bring or send it.
                </p>
                <a className={s.textLink} href={DEVICE_FORM_URL} {...external}>
                  Open the device donation form <ArrowUpRight size={18} aria-hidden="true" />
                </a>
              </div>
              <div className={s.otherWays}>
                <a href={POSITIONS_URL} {...external}>Apply to join OpenByte</a>
                <a href="mailto:team@openbyte-np.org?subject=Host%20a%20device%20drive">Host a device drive</a>
                <a href="/privacy/">Read the privacy policy</a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section id="contact" className={s.contact} aria-labelledby="contact-title">
        <div className={s.wrap}>
          <div className={s.contactInner} data-reveal>
            <h2 id="contact-title">Tell us what you&apos;re trying to do.</h2>
            <p>
              Classes, partnerships, sponsorships, volunteering, device drives,
              or a technology question—we&apos;ll point you to the right place.
            </p>
            <div>
              <a href="mailto:team@openbyte-np.org">team@openbyte-np.org</a>
              <a href="https://www.instagram.com/openbyte.nonprofit/" {...external}>@openbyte.nonprofit</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export function HomeNarrativeFooter() {
  return (
    <footer className={s.footer}>
      <p className={s.footerStatement}>We&apos;re students helping people learn technology.</p>
      <div className={s.footerRule}>
        <img src="/media/brand/openbyte-logo.webp" width={640} height={191} alt="OpenByte — Innovate, Connect, Empower" />
        <nav aria-label="Footer">
          <a href="/classes/">Classes</a>
          <a href={DEVICE_FORM_URL} {...external}>Give a device</a>
          <a href={DONATE_URL} {...external}>Donate</a>
          <a href="/privacy/">Privacy</a>
        </nav>
      </div>
      <div className={s.footerMeta}>
        <span>© 2026 OpenByte Non-Profit</span>
        <a href="mailto:team@openbyte-np.org">team@openbyte-np.org</a>
        <span>Hero photograph: Harrison Broadbent / Unsplash</span>
      </div>
    </footer>
  );
}
