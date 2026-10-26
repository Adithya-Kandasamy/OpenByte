import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | OpenByte",
  description: "How OpenByte uses contact information, program forms, and website analytics.",
  alternates: { canonical: "/privacy/" },
};

export default function PrivacyPolicy() {
  return (
    <main className="policy-main">
      <div className="shell">
        <a className="policy-back" href="/">← Back to OpenByte</a>
        <article className="policy-article">
          <p className="eyebrow">OpenByte nonprofit</p>
          <h1>Privacy Policy</h1>
          <p className="policy-updated">Last updated: October 26, 2026</p>
          <p>
            OpenByte is a student-led education and technology-access initiative based in
            Ashburn, Virginia. This page explains information visitors may share with us.
          </p>
          <section>
            <h2>Information you share</h2>
            <p>
              When you email OpenByte, apply for a team position, ask about a class,
              or submit a device donation form, you may supply your name, contact details,
              program interests, and device or service details. Please do not send
              sensitive personal information that we do not need.
            </p>
            <p>
              Parents or guardians should help minors complete forms when appropriate.
              Participant names, faces, and photos should not be published without
              appropriate permission.
            </p>
          </section>
          <section>
            <h2>How information is used</h2>
            <p>
              Information is used to respond to inquiries, coordinate classes, plan
              device donations and pickup, manage volunteer applications, and document
              our activities. Authorized team members may access relevant information
              for these purposes.
            </p>
          </section>
          <section>
            <h2>Third-party services</h2>
            <p>
              This website links to Google Forms, Instagram, and Hack Club Bank,
              OpenByte&apos;s donation and fiscal sponsorship platform.
              Those services have their own privacy practices.
              We also use GoatCounter for website visitor analytics.
              This site itself does not process credit-card payments.
            </p>
          </section>
          <section>
            <h2>Contact and records</h2>
            <p>
              Records may be kept as needed for program operations, documentation,
              and applicable recordkeeping. To ask a question about information you
              supplied or request a correction or removal, contact{" "}
              <a href="mailto:team@openbyte-np.org">team@openbyte-np.org</a>.
              We will review requests.
            </p>
          </section>
          <section>
            <h2>Updates</h2>
            <p>We may update this policy as our programs or tools change.</p>
          </section>
        </article>
      </div>
    </main>
  );
}
