import { FileEdit, Clock, Network, DollarSign, EyeOff } from "lucide-react";
import { SectionWrapper } from "../../components/SectionWrapper/SectionWrapper";
import { IDS } from "../../registry/ids";
import shared from "../../styles/shared.module.css";
import styles from "./ProblemFiguresSection.module.css";
import { statCards, type StatIcon } from "./problemFiguresContent";

const ICONS: Record<string, StatIcon> = { FileEdit, Clock, Network, DollarSign, EyeOff };

export function ProblemFiguresSection() {
  return (
    <SectionWrapper
      theme="dark"
      reviewId={IDS.problemFigures.root}
      ariaLabelledBy="problem-figures-heading"
    >
      <p className={shared.sectionEyebrow} data-review-id={IDS.problemFigures.eyebrow}>
        The cost of fragmented operations
      </p>

      <h2
        id="problem-figures-heading"
        className={shared.sectionTitle}
        data-review-id={IDS.problemFigures.heading}
      >
        Every manual handoff adds{" "}
        <span className={shared.highlight}>time, uncertainty, and operational risk.</span>
      </h2>

      <p className={shared.sectionLead} data-review-id={IDS.problemFigures.paragraph}>
        The impact is not limited to data entry. It appears in exception queues, delayed
        approvals, duplicate work, missed commercial dates, inconsistent decisions, and limited
        operational visibility.
      </p>

      <div className={styles.grid} data-review-id={IDS.problemFigures.grid}>
        {statCards.map((card, index) => {
          const Icon = ICONS[card.iconName];
          return (
            <div
              key={card.category}
              className={styles.card}
              data-review-id={IDS.problemFigures.statCard(index + 1)}
            >
              <div className={styles.cardTop}>
                <span className={styles.sequence}>{String(index + 1).padStart(2, "0")}</span>
                <div className={styles.iconRing}>
                  <Icon size={18} aria-hidden="true" />
                </div>
              </div>
              <p className={styles.category}>{card.category}</p>
              <p className={styles.stat}>{card.stat}</p>
              <div className={styles.cardDivider} aria-hidden="true" />
              <p className={styles.explanation}>{card.explanation}</p>
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
