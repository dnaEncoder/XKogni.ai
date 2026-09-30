import {
  Server,
  UserCheck,
  Lock,
  ShieldCheck,
  Cpu,
  SearchCheck,
  RefreshCw,
  BadgeCheck,
} from "lucide-react";
import { SectionWrapper } from "../../components/SectionWrapper/SectionWrapper";
import { IDS } from "../../registry/ids";
import shared from "../../styles/shared.module.css";
import styles from "./SecurityGovernanceSection.module.css";
import {
  securityGovernanceCards,
  type SecurityGovernanceIcon,
  type SecurityGovernanceIconName,
} from "./securityGovernanceContent";

const ICONS: Record<SecurityGovernanceIconName, SecurityGovernanceIcon> = {
  Server,
  UserCheck,
  Lock,
  ShieldCheck,
  Cpu,
  SearchCheck,
  RefreshCw,
  BadgeCheck,
};

export function SecurityGovernanceSection() {
  return (
    <SectionWrapper
      id="security-protection"
      theme="light"
      reviewId={IDS.securityGovernance.root}
      ariaLabelledBy="security-governance-heading"
    >
      <div className={styles.header}>
        <p
          className={`${shared.sectionEyebrow} ${styles.eyebrow}`}
          data-review-id={IDS.securityGovernance.eyebrow}
        >
          Security &amp; Protection
        </p>
        <h2
          id="security-governance-heading"
          className={`${shared.sectionTitle} ${styles.heading}`}
          data-review-id={IDS.securityGovernance.heading}
        >
          Built for enterprise <span className={shared.highlight}>trust and protection.</span>
        </h2>
        <p
          className={`${shared.sectionLead} ${styles.paragraph}`}
          data-review-id={IDS.securityGovernance.paragraph}
        >
          Data protection, auditable AI guardrails, and continuous threat prevention engineered for
          financial operations.
        </p>
      </div>

      <div className={styles.cardGrid}>
        {securityGovernanceCards.map((card, index) => {
          const Icon = ICONS[card.icon];
          return (
            <article
              key={card.title}
              className={styles.card}
              data-review-id={IDS.securityGovernance.card(index + 1)}
            >
              <div className={styles.cardTop}>
                <div className={styles.iconWrapper}>
                  <Icon size={20} aria-hidden="true" />
                </div>
                <span className={styles.cardNumber}>{String(index + 1).padStart(2, "0")}</span>
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <p className={styles.cardDescription}>{card.description}</p>
              </div>
            </article>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
