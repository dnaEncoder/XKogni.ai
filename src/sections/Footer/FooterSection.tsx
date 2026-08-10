import { useState, type FormEvent } from "react";
import { IDS } from "../../registry/ids";
import styles from "./FooterSection.module.css";
import { footerColumns, socialLinks, legalLinks } from "./footerContent";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type SubscribeStatus = "idle" | "loading" | "success" | "error";

export function FooterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<SubscribeStatus>("idle");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "loading") return;

    if (!EMAIL_PATTERN.test(email)) {
      setStatus("error");
      return;
    }

    setStatus("loading");
    try {
      // No newsletter/CRM endpoint is wired up yet — this simulates the round trip
      // so the interaction states described in the spec are exercised end to end.
      await new Promise((resolve) => setTimeout(resolve, 900));
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <footer
      className={styles.footer}
      data-theme="dark"
      data-review-id={IDS.footer.root}
    >
      <div className={styles.wave} aria-hidden="true" />

      <div className={styles.container}>
        <div className={styles.upperGrid}>
          <div className={styles.brandColumn} data-review-id={IDS.footer.brandBlock}>
            <p className={styles.brandName}>XKogni.ai</p>
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

          {footerColumns.map((column, index) => (
            <nav
              key={column.heading}
              className={styles.navColumn}
              aria-label={column.heading}
              data-review-id={IDS.footer.navColumn(index + 1)}
            >
              <p className={styles.navHeading}>{column.heading}</p>
              <ul className={styles.navList}>
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className={styles.newsletterPanel} data-review-id={IDS.footer.newsletterPanel}>
          <div className={styles.newsletterText}>
            <p className={styles.newsletterHeading} data-review-id={IDS.footer.newsletterHeading}>
              Stay updated with XKogni.ai
            </p>
            <p className={styles.newsletterBody} data-review-id={IDS.footer.newsletterBody}>
              Get the latest updates on features, releases, and insights delivered to your inbox.
            </p>
          </div>

          <form className={styles.newsletterForm} onSubmit={handleSubmit} noValidate>
            <input
              type="email"
              required
              placeholder="Enter your work email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                if (status !== "idle") setStatus("idle");
              }}
              className={styles.newsletterInput}
              data-review-id={IDS.footer.newsletterInput}
              aria-label="Work email"
              aria-invalid={status === "error"}
              disabled={status === "loading"}
            />
            <button
              type="submit"
              className={styles.newsletterSubmit}
              data-review-id={IDS.footer.newsletterSubmit}
              disabled={status === "loading"}
            >
              {status === "loading" ? "Subscribing…" : "Subscribe"}
            </button>
          </form>
          <div aria-live="polite" className={styles.newsletterFeedback}>
            {status === "success" && (
              <p className={styles.newsletterSuccess} data-review-id={IDS.footer.newsletterSuccess}>
                You're subscribed. Watch your inbox for updates.
              </p>
            )}
            {status === "error" && (
              <p className={styles.newsletterError} data-review-id={IDS.footer.newsletterError}>
                Enter a valid work email address.
              </p>
            )}
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
          <ul className={styles.legalList}>
            {legalLinks.map((link, index) => (
              <li key={link.label} data-review-id={IDS.footer.legalLink(index + 1)}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
