import { external } from "../lib/site-content";
export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-grid">
          <div className="footer-brand">
            <a className="wordmark" href="/" aria-label="OpenByte, home">
              <span className="brand-mark" aria-hidden="true">
                <i />
                <i />
                <i />
                <i />
              </span>
              OpenByte
            </a>
            <p>
              Helping kids learn, helping older adults feel confident, and
              getting good devices back into use.
            </p>
            <span className="asset-note">Typeset wordmark · placeholder</span>
          </div>
          <div className="footer-links">
            <nav aria-label="Programs">
              <p className="mono">Explore</p>
              <a href="/#programs">Our programs</a>
              <a href="/classes/">Arduino classes</a>
              <a href="/#progress">Our progress</a>
              <a href="/#team">Our team</a>
            </nav>
            <nav aria-label="Get involved">
              <p className="mono">Contribute</p>
              <a href="/#tech-donation">Give a device</a>
              <a href="/#donate">Donate</a>
              <a href="/#drives">Host a drive</a>
              <a href="/#apply">OpenByte Positions</a>
            </nav>
            <nav aria-label="Connect">
              <p className="mono">Connect</p>
              <a href="mailto:team@openbyte-np.org">Email us</a>
              <a
                href="https://www.instagram.com/openbyte.nonprofit/"
                {...external}
              >
                Instagram ↗
              </a>
              <a href="/#partners">Our supporters</a>
              <a href="/privacy/">Privacy policy</a>
            </nav>
          </div>
        </div>
        <div className="footer-meta">
          <span>© 2026 OpenByte Non-Profit</span>
          <span>Ashburn, Virginia</span>
          <a href="https://hackclub.com" {...external}>
            Fiscally sponsored by Hack Club ↗
          </a>
        </div>
      </div>
    </footer>
  );
}
