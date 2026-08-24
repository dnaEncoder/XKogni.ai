import { IDS } from "../../registry/ids";
import styles from "./FooterSection.module.css";
import { socialLinks } from "./footerContent";

interface FooterSectionProps {
  onContactClick?: () => void;
}

export function FooterSection({ onContactClick }: FooterSectionProps) {
  return (
    <footer
      className={styles.footer}
      data-theme="dark"
      data-review-id={IDS.footer.root}
    >
      <div className={styles.wave} aria-hidden="true" />

      <div className={styles.container}>
        <div className={styles.hero}>
          <div className={styles.brandColumn} data-review-id={IDS.footer.brandBlock}>
            <img src="/XKOGNI-LOGO.svg" alt="XKogni.ai" className={styles.brandLogo} />
            <p className={styles.brandTagline}>
              Agentic AI for document operations.
              <br />
              Intelligent. Connected. Built for enterprise scale.
            </p>
            <div className={styles.socialRow}>
              {socialLinks.map((social, index) => (
                <a
                  key={social.label}
                  href={social.href}
                  className={styles.socialLink}
                  aria-label={social.label}
                  data-review-id={IDS.footer.socialLink(index + 1)}
                >
                  <span aria-hidden="true">{social.initials}</span>
                </a>
              ))}
            </div>
          </div>

          <div className={styles.enquiry}>
            <p className={styles.enquiryHeading} data-review-id={IDS.footer.enquiryHeading}>
              Ready to see XKogni.ai in action?
            </p>
            <button
              type="button"
              onClick={onContactClick}
              className={styles.enquiryCta}
              data-review-id={IDS.footer.enquiryCta}
            >
              Get in touch
            </button>
          </div>
        </div>

        <div className={styles.bottomBar}>
          <div className={styles.statusRow} data-review-id={IDS.footer.systemStatus}>
            <span className={styles.statusDot} aria-hidden="true" />
            <span>All systems operational</span>
          </div>
          <p className={styles.copyright} data-review-id={IDS.footer.copyright}>
            © 2026 XKogni.ai. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
