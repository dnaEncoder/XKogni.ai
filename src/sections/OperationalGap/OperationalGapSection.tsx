import { Lock, RotateCw, GitBranch } from "lucide-react";
import { SectionWrapper } from "../../components/SectionWrapper/SectionWrapper";
import { IDS } from "../../registry/ids";
import shared from "../../styles/shared.module.css";
import styles from "./OperationalGapSection.module.css";
import { problemCards, type ProblemCardIcon } from "./operationalGapContent";

const ICONS: Record<string, ProblemCardIcon> = { Lock, RotateCw, GitBranch };

export function OperationalGapSection() {
  return (
    <SectionWrapper
      theme="light"
      reviewId={IDS.operationalGap.root}
      ariaLabelledBy="operational-gap-heading"
      className={styles.gap}
    >
      <p
        className={`${shared.sectionEyebrow} ${styles.eyebrow}`}
        data-review-id={IDS.operationalGap.eyebrow}
      >
        The operational gap
      </p>

      <h2
        id="operational-gap-heading"
        className={`${shared.sectionTitle} ${styles.heading}`}
        data-review-id={IDS.operationalGap.heading}
      >
        Your documents contain the answers. Your teams still have to{" "}
        <span className={shared.highlight}>assemble the context.</span>
      </h2>

      <p
        className={`${shared.sectionLead} ${styles.paragraph}`}
        data-review-id={IDS.operationalGap.paragraph}
      >
        Critical financial information is scattered across PDFs, emails, contracts, purchase
        orders, spreadsheets, and enterprise systems. Before a decision can be made, teams spend
        hours finding, comparing, and validating what should already be connected.
      </p>

      <p
        className={styles.transition}
        data-review-id={IDS.operationalGap.transitionStatement}
      >
        XKogni.ai transforms this fragmented process into one connected operational flow.
      </p>

      <div className={styles.cards}>
        {problemCards.map((card, index) => {
          const Icon = ICONS[card.iconName];
          return (
            <div
              key={card.heading}
              className={styles.card}
              data-review-id={IDS.operationalGap.card(index + 1)}
            >
              <div className={styles.cardTop}>
                <div className={styles.icon}>
                  <Icon size={20} aria-hidden="true" />
                </div>
                <span className={styles.sequence}>{String(index + 1).padStart(2, "0")}</span>
              </div>
              <div className={styles.divider} aria-hidden="true" />
              <h3 className={styles.cardHeading}>{card.heading}</h3>
              <p className={styles.cardSubheading}>{card.subheading}</p>
              <div className={styles.cardDivider} aria-hidden="true" />
              <p className={styles.cardBody}>{card.body}</p>
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
