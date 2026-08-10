import { IDS } from "../../registry/ids";
import styles from "./SiteHeader.module.css";

const NAV_ITEMS = ["Platform", "Products", "Solutions", "Resources", "Company"];

export function SiteHeader() {
  return (
    <header className={styles.header} data-theme="dark" data-review-id={IDS.siteHeader.root}>
      <div className={styles.inner}>
        <a href="/" className={styles.brand} data-review-id={IDS.siteHeader.logo}>
          <img src="/XKOGNI-LOGO.svg" alt="XKogni.ai" className={styles.logoImage} />
        </a>

        <nav className={styles.nav} aria-label="Primary">
          {NAV_ITEMS.map((label, index) => (
            <a
              key={label}
              href="#"
              className={styles.navLink}
              data-review-id={IDS.siteHeader.navItem(index + 1)}
            >
              {label}
            </a>
          ))}
        </nav>

        <a href="#demo" className={styles.cta} data-review-id={IDS.siteHeader.ctaDemo}>
          Book a demo
        </a>
      </div>
    </header>
  );
}
