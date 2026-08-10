import {
  Receipt,
  FileText,
  ClipboardList,
  Mail,
  Folder,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  UserCheck,
  RefreshCw,
  ShieldCheck,
  UsersRound,
  Network,
} from "lucide-react";
import { SectionWrapper } from "../../components/SectionWrapper/SectionWrapper";
import { IDS } from "../../registry/ids";
import shared from "../../styles/shared.module.css";
import styles from "./HeroSection.module.css";
import {
  heroTrustStatements,
  type HeroIconName,
} from "./heroContent";

const ICONS: Record<HeroIconName, typeof Receipt> = {
  Receipt,
  FileText,
  ClipboardList,
  Mail,
  Folder,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  UserCheck,
  RefreshCw,
  ShieldCheck,
  UsersRound,
  Network,
};


export function HeroSection() {
  return (
    <SectionWrapper
      theme="dark"
      reviewId={IDS.hero.root}
      ariaLabelledBy="hero-heading"
      className={styles.hero}
    >
      <div className={styles.layout}>
        <div className={styles.copy}>
          <p className={shared.sectionEyebrow} data-review-id={IDS.hero.eyebrow}>
            Agentic intelligence for financial operations
          </p>

          <h1 id="hero-heading" className={styles.headline} data-review-id={IDS.hero.headline}>
            Turn operational documents into{" "}
            <span className={shared.highlight}>decisions that move.</span>
          </h1>

          <p className={styles.paragraph} data-review-id={IDS.hero.paragraph}>
            XKogni.ai deploys specialized AI agents across invoices, contracts, purchase
            orders, and supporting records—bringing together the context teams need to
            review exceptions, make decisions, and keep enterprise systems aligned.
          </p>

          <div className={styles.ctaRow}>
            <a href="#demo" className={styles.ctaPrimary} data-review-id={IDS.hero.ctaPrimary}>
              See XKogni.ai in action
            </a>
            <a
              href="#platform"
              className={styles.ctaSecondary}
              data-review-id={IDS.hero.ctaSecondary}
            >
              Explore the platform
            </a>
          </div>

          <ul className={styles.trustList}>
            {heroTrustStatements.map((item, index) => {
              const Icon = ICONS[item.icon];
              return (
                <li
                  key={item.label}
                  className={styles.trustItem}
                  data-review-id={IDS.hero.trustStatement(index + 1)}
                >
                  <Icon size={16} aria-hidden="true" />
                  <span>{item.label}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <p className={styles.trustStrip} data-review-id={IDS.hero.trustStripLabel}>
        Trusted by finance &amp; operations teams at
      </p>
    </SectionWrapper>
  );
}
