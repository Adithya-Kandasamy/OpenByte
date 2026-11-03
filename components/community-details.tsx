import { SectionDisclosures } from "./section-disclosures";
import {
  DEVICE_FORM_URL as TECH_DONATION_FORM_URL,
  POSITIONS_URL,
  external,
} from "../lib/site-content";

const ADEEPT_POST =
  "https://d2ol7oe51mr4n9.cloudfront.net/user_3K77yucLkXD8gM0VHqAnyMSm9U2/6e40843b-289a-4a70-a0dc-28649b02cbb3.png";
const ASHBURN_POST =
  "https://d2ol7oe51mr4n9.cloudfront.net/user_3K77yucLkXD8gM0VHqAnyMSm9U2/37a2de9b-6d01-427a-a2d6-c50f8b85f2d1.png";
const ROBEKS_POST =
  "https://www.canva.com/design/DAHZzstU38Y/SwgYxNDxCYcTTIwcrSMyNg/view";

const Arrow = () => <span aria-hidden="true">→</span>;

export function CommunityDetails() {
  return (
    <section
      id="get-involved"
      className="section involvement"
      aria-labelledby="involvement-title"
    >
      <div className="shell">
        <div className="involvement-heading">
          <h2 id="involvement-title">There&apos;s a place for you here.</h2>
          <p>Learn. Give. Build with us.</p>
        </div>
        <SectionDisclosures>
          <details id="partners" className="involvement-item">
            <summary>
              <span>Community partners</span>
              <span className="disclosure-icon" aria-hidden="true">
                +
              </span>
            </summary>
            <div className="disclosure-content">
              <div className="disclosure-inner">
                <div className="sec-head" data-reveal>
                  <div>
                    <p className="mono eyebrow">Community partners</p>
                    <h2 id="partners-title">
                      Made possible by our supporters.
                    </h2>
                  </div>
                  <p className="body">
                    We&apos;re grateful to the local businesses and STEM
                    organizations helping OpenByte bring hands-on technology
                    education to more students.
                  </p>
                </div>
                <ul className="partners" data-reveal>
                  <li>
                    <div>
                      <h3>Adeept</h3>
                      <p className="mono">STEM kit sponsor</p>
                    </div>
                    <p>
                      Adeept donated <strong>three ESP32 smart-car kits</strong>
                      , supporting hands-on robotics and electronics education.
                    </p>
                    <div>
                      <a
                        className="text-link"
                        href="https://www.adeept.com/"
                        {...external}
                      >
                        Visit Adeept <Arrow />
                      </a>
                      <br />
                      <a className="text-link" href={ADEEPT_POST} {...external}>
                        Thank-you graphic <Arrow />
                      </a>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h3>Ashburn Art Classes</h3>
                      <p className="mono">Community donor</p>
                    </div>
                    <p>
                      Thank you to Ashburn Art Classes for its{" "}
                      <strong>$250 donation</strong> toward expanding accessible
                      STEM learning in our community.
                    </p>
                    <div>
                      <a
                        className="text-link"
                        href="https://ashburnartclasses.com/"
                        {...external}
                      >
                        Visit Ashburn Art Classes <Arrow />
                      </a>
                      <br />
                      <a
                        className="text-link"
                        href={ASHBURN_POST}
                        {...external}
                      >
                        Thank-you graphic <Arrow />
                      </a>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h3>Robeks of Loudoun</h3>
                      <p className="mono">Local community sponsor</p>
                    </div>
                    <p>
                      Thank you to Robeks of Loudoun for its{" "}
                      <strong>$100 donation</strong> supporting free and
                      accessible technology education in our community.
                    </p>
                    <div>
                      <a
                        className="text-link"
                        href="https://order.robeks.com/menu/ashburn"
                        {...external}
                      >
                        Visit Robeks Broadlands <Arrow />
                      </a>
                      <br />
                      <a className="text-link" href={ROBEKS_POST} {...external}>
                        Thank-you graphic <Arrow />
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </details>
          <details id="drives" className="involvement-item">
            <summary>
              <span>Organize a device drive</span>
              <span className="disclosure-icon" aria-hidden="true">
                +
              </span>
            </summary>
            <div className="disclosure-content">
              <div className="split">
                <div data-reveal>
                  <p className="mono eyebrow">Got a device to spare?</p>
                  <h2>It might be exactly what someone else needs.</h2>
                  <p className="body">
                    A laptop or phone sitting in a drawer can help someone
                    learn, apply for a job, stay in touch, or get through an
                    everyday task.
                  </p>
                  <div className="actions">
                    <a className="btn btn-primary" href="#tech-donation">
                      Give a device <Arrow />
                    </a>
                    <a className="btn btn-secondary" href="#donate">
                      Help fund a drive
                    </a>
                  </div>
                </div>
                <ol className="ways" data-reveal>
                  <li>
                    <span className="mono">01</span>
                    <h3>Tell us what you have</h3>
                    <p>
                      We&apos;ll let you know if it fits a current need and what
                      to do next.
                    </p>
                  </li>
                  <li>
                    <span className="mono">02</span>
                    <h3>Host a drive</h3>
                    <p>
                      Schools, libraries, businesses, and neighbors can collect
                      devices with us.
                    </p>
                  </li>
                  <li>
                    <span className="mono">03</span>
                    <h3>Pitch in where you can</h3>
                    <p>
                      Help with pickup, sorting, outreach, workshops, or the
                      cost of getting devices where they need to go.
                    </p>
                  </li>
                </ol>
              </div>
            </div>
          </details>
          <details id="tech-donation" className="involvement-item">
            <summary>
              <span>Donate technology</span>
              <span className="disclosure-icon" aria-hidden="true">
                +
              </span>
            </summary>
            <div className="disclosure-content">
              <div className="disclosure-inner">
                <div className="sec-head" data-reveal>
                  <div>
                    <p className="mono eyebrow">Donate technology</p>
                    <h2>Give your unused tech a new purpose.</h2>
                  </div>
                  <div className="body">
                    <p>
                      Have a laptop, tablet, phone, or another device to donate?
                      Fill out this form with the device details and your
                      preferred drop-off or pickup option. We&apos;ll follow up
                      to confirm the next steps before you bring or send
                      anything.
                    </p>
                    <p style={{ marginTop: 16 }}>
                      <a
                        className="text-link"
                        href={TECH_DONATION_FORM_URL}
                        {...external}
                      >
                        Open the technology donation form <Arrow />
                      </a>
                    </p>
                  </div>
                </div>
                <div className="form-note">
                  <p className="small">
                    The device donation form opens in Google Forms. Read our{" "}
                    <a href="/privacy/">privacy policy</a> before submitting.
                    We&apos;ll follow up before you bring or send anything.
                  </p>
                </div>
              </div>
            </div>
          </details>
          <details id="getting-started" className="involvement-item">
            <summary>
              <span>Finding the right program</span>
              <span className="disclosure-icon" aria-hidden="true">
                +
              </span>
            </summary>
            <div className="disclosure-content">
              <div className="split">
                <div data-reveal>
                  <p className="mono eyebrow">Not sure where to start?</p>
                  <h2>That&apos;s okay. We can start with a conversation.</h2>
                </div>
                <ol className="steps" data-reveal>
                  <li>
                    <span className="mono">01</span>
                    <strong>Tell us what you need.</strong>
                    <p>Learn, get support, give a device, or volunteer.</p>
                  </li>
                  <li>
                    <span className="mono">02</span>
                    <strong>Share the useful details.</strong>
                    <p>You don&apos;t need to have the perfect words.</p>
                  </li>
                  <li>
                    <span className="mono">03</span>
                    <strong>
                      We&apos;ll point you in the right direction.
                    </strong>
                    <p>
                      We&apos;ll connect you with the right person or program.
                    </p>
                  </li>
                </ol>
              </div>
            </div>
          </details>
          <details id="questions" className="involvement-item">
            <summary>
              <span>Frequently asked questions</span>
              <span className="disclosure-icon" aria-hidden="true">
                +
              </span>
            </summary>
            <div className="disclosure-content faq">
              <div className="split">
                <div data-reveal>
                  <p className="mono eyebrow">Questions people ask</p>
                  <h2>A few answers before you reach out.</h2>
                  <p className="body">
                    Still not sure? Email team@openbyte-np.org and tell us what
                    you&apos;re trying to do.
                  </p>
                </div>
                <div data-reveal>
                  <details>
                    <summary>Is OpenByte only for beginners?</summary>
                    <p>
                      No. Programs start with the person in front of us. The
                      goal is practical progress, whether that means a first
                      step or a new project.
                    </p>
                  </details>
                  <details>
                    <summary>Can I give you a used device?</summary>
                    <p>
                      Yes. Fill out our{" "}
                      <a href="#tech-donation">technology donation form</a> with
                      details about the device. We&apos;ll follow up to confirm
                      the next steps before you bring or send anything.
                    </p>
                  </details>
                  <details>
                    <summary>
                      Can my school, library, or business work with you?
                    </summary>
                    <p>
                      Yes. We can talk about hosting a class, organizing a
                      collection, providing space, or supporting outreach.
                    </p>
                  </details>
                  <details>
                    <summary>Where can I see what donations are doing?</summary>
                    <p>
                      The live total and donor leaderboard above come directly
                      from OpenByte&apos;s Hack Club Bank account.
                    </p>
                  </details>
                </div>
              </div>
            </div>
          </details>
          <details id="contact" className="involvement-item">
            <summary>
              <span>Contact OpenByte</span>
              <span className="disclosure-icon" aria-hidden="true">
                +
              </span>
            </summary>
            <div className="disclosure-content">
              <div className="split">
                <div data-reveal>
                  <p className="mono eyebrow">Contact OpenByte</p>
                  <h2>Have a question? Get in touch.</h2>
                  <p className="body">
                    For partnerships, sponsorships, volunteering, program
                    questions, device donations, or general questions, reach out
                    by email or Instagram.
                  </p>
                </div>
                <div className="rows" data-reveal>
                  <a className="row" href="mailto:team@openbyte-np.org">
                    <span className="mono">01</span>
                    <span>
                      <strong>Email OpenByte</strong>
                      <small>team@openbyte-np.org</small>
                    </span>
                    <Arrow />
                  </a>
                  <a
                    className="row"
                    href="https://www.instagram.com/openbyte.nonprofit/"
                    {...external}
                  >
                    <span className="mono">02</span>
                    <span>
                      <strong>Instagram</strong>
                      <small>@openbyte.nonprofit</small>
                    </span>
                    <Arrow />
                  </a>
                </div>
              </div>
            </div>
          </details>
          <details id="apply" className="involvement-item">
            <summary>
              <span>Join the team</span>
              <span className="disclosure-icon" aria-hidden="true">
                +
              </span>
            </summary>
            <div className="disclosure-content">
              <div className="split">
                <div data-reveal>
                  <p className="mono eyebrow">OpenByte Positions</p>
                  <h2>Interested in joining OpenByte?</h2>
                  <p className="body">
                    Use the OpenByte Positions form below to apply to join the
                    team.
                  </p>
                </div>
                <div data-reveal>
                  <h3>Apply using our Google Form.</h3>
                  <p className="body" style={{ marginTop: 12 }}>
                    The volunteer and leadership application opens in a new tab.
                    For students under 18, please involve a parent or guardian
                    as appropriate.
                  </p>
                  <p className="small" style={{ marginTop: 12 }}>
                    You can review our <a href="/privacy/">privacy policy</a>{" "}
                    first.
                  </p>
                  <div className="actions" style={{ marginTop: 24 }}>
                    <a
                      className="btn btn-primary"
                      href={POSITIONS_URL}
                      {...external}
                    >
                      Open positions application <Arrow />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </details>
        </SectionDisclosures>
      </div>
    </section>
  );
}
