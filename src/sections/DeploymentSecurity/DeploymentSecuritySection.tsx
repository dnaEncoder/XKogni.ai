import { KeyRound, Sliders, ShieldCheck } from "lucide-react";
import { SectionWrapper } from "../../components/SectionWrapper/SectionWrapper";
import { IDS } from "../../registry/ids";
import styles from "./DeploymentSecuritySection.module.css";
import {
  deploymentCards,
  type DeploymentIcon,
  type DeploymentIconName,
} from "./deploymentSecurityContent";

const ICONS: Record<DeploymentIconName, DeploymentIcon> = { KeyRound, Sliders, ShieldCheck };

export function DeploymentSecuritySection() {
  return (
    <SectionWrapper
      theme="dark"
      reviewId={IDS.deploymentSecurity.root}
      ariaLabelledBy="deployment-heading"
    >
      <span className={styles.badge} data-review-id={IDS.deploymentSecurity.badge}>
        Deployment &amp; Security
      </span>

      <h2
        id="deployment-heading"
        className={styles.heading}
        data-review-id={IDS.deploymentSecurity.heading}
      >
        Deploys in short time.
        <br />
        Tailored to each requirement.
      </h2>

      <p className={styles.paragraph} data-review-id={IDS.deploymentSecurity.paragraph}>
        Built for enterprise environments with secure foundations, configurable workflows, and
        flexible deployment from day one.
      </p>

      <div className={styles.cardGrid}>
        {deploymentCards.map((card, index) => {
          const Icon = ICONS[card.icon];
          return (
            <article
              key={card.title}
              className={styles.card}
              data-review-id={IDS.deploymentSecurity.card(index + 1)}
            >
              <div
                className={styles.cardMedia}
                aria-hidden="true"
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(9, 10, 12, 0.15) 0%, rgba(9, 10, 12, 0.85) 100%), url('/deployment-security-${index + 1}.png')`
                }}
              />
              <div className={styles.cardTop}>
                <div className={styles.cardIcon}>
                  <Icon size={18} aria-hidden="true" />
                </div>
                <span className={styles.cardNumber}>{String(index + 1).padStart(2, "0")}</span>
              </div>
              <div className={styles.cardText}>
                <p className={styles.cardTitle}>{card.title}</p>
                <p className={styles.cardDescription}>{card.description}</p>
              </div>
            </article>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
