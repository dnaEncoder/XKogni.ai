import { IDS } from "../../registry/ids";
import styles from "./SiteHeader.module.css";

const NAV_ITEMS = [
  { label: "Platform", href: "#platform" },
  { label: "Features", href: "#contractx" },
  { label: "Integrations", href: "#integrations" },
  { label: "Agentic AI", href: "#agentic" },
  { label: "Security", href: "#security" },
];

interface SiteHeaderProps {
  onContactClick?: () => void;
}

export function SiteHeader({ onContactClick }: SiteHeaderProps) {
  return (
    <header className={styles.header} data-theme="dark" data-review-id={IDS.siteHeader.root}>
      <div className={styles.inner}>
        <a href="/" className={styles.brand} data-review-id={IDS.siteHeader.logo}>
          <img src="/XKOGNI-LOGO.svg" alt="XKogni.ai" className={styles.logoImage} />
        </a>

        <nav className={styles.nav} aria-label="Primary">
          {NAV_ITEMS.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              className={styles.navLink}
              data-review-id={IDS.siteHeader.navItem(index + 1)}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          onClick={onContactClick}
          className={styles.cta}
          data-review-id={IDS.siteHeader.ctaDemo}
        >
          Book a demo
        </button>
      </div>
    </header>
  );
}
