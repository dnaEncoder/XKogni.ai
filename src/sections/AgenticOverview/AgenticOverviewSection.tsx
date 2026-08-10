import { Share2, Zap, BarChart3, Wrench } from "lucide-react";
import { SectionWrapper } from "../../components/SectionWrapper/SectionWrapper";
import { IDS } from "../../registry/ids";
import shared from "../../styles/shared.module.css";
import styles from "./AgenticOverviewSection.module.css";
import { agentCards, type AgenticIcon, type AgenticIconName } from "./agenticOverviewContent";

const ICONS: Record<AgenticIconName, AgenticIcon> = { Share2, Zap, BarChart3, Wrench };

const VISUAL_SUMMARY =
  "A central Control Core is surrounded by four capability cards: Cross-System Communication, Task Execution, Analysis & Decisioning, and Custom Agent Builder, connected by orbit rings representing the agentic architecture.";

export function AgenticOverviewSection() {
  return (
    <SectionWrapper
      theme="dark"
      reviewId={IDS.agenticOverview.root}
      ariaLabelledBy="agentic-heading"
      className={styles.section}
    >
      <div className={styles.header}>
        <p className={shared.sectionEyebrow} data-review-id={IDS.agenticOverview.eyebrow}>
          Agentic Overview
        </p>
        <h2
          id="agentic-heading"
          className={styles.heading}
          data-review-id={IDS.agenticOverview.heading}
        >
          Our <span className={shared.highlight}>Agentic AI</span> Platform
        </h2>
        <p className={styles.paragraph} data-review-id={IDS.agenticOverview.paragraph}>
          Specialized agents coordinating analysis, action, and orchestration across operations.
        </p>
      </div>

      <div className={styles.visual} role="img" aria-label={VISUAL_SUMMARY}>

        <div className={styles.cardGrid}>
          {agentCards.map((card, index) => {
            const Icon = ICONS[card.icon];
            return (
              <div
                key={card.label}
                className={styles.agentCard}
                data-position={card.position}
                data-review-id={IDS.agenticOverview.capabilityCard(index + 1)}
              >
                <div className={styles.agentIcon}>
                  <Icon size={20} aria-hidden="true" />
                </div>
                <span className={styles.agentLabel}>{card.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
