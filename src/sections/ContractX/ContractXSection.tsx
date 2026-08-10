import { useState } from "react";
import {
  FileSearch,
  ListTree,
  Calendar,
  ShieldCheck,
  AlertTriangle,
  FileCheck2,
  Inbox,
  ScanText,
  ListChecks,
  Activity,
  UserCheck,
  Receipt,
  ClipboardList,
  FileText,
  FileDiff,
  History,
  ShieldQuestion,
  Gauge,
} from "lucide-react";
import { SectionWrapper } from "../../components/SectionWrapper/SectionWrapper";
import { IDS } from "../../registry/ids";
import shared from "../../styles/shared.module.css";
import styles from "./ContractXSection.module.css";
import {
  contractXFeatures,
  workflowSteps,
  workflowExamples,
  sourceTabs,
  closingStatement,
  DEFAULT_ACTIVE_STEP,
  type ContractXIcon,
  type ContractXIconName,
} from "./contractXContent";

const ICONS: Record<ContractXIconName, ContractXIcon> = {
  FileSearch,
  ListTree,
  Calendar,
  ShieldCheck,
  AlertTriangle,
  FileCheck2,
  Inbox,
  ScanText,
  ListChecks,
  Activity,
  UserCheck,
  Receipt,
  ClipboardList,
  FileText,
  FileDiff,
  History,
  ShieldQuestion,
  Gauge,
};

const STATUS_MESSAGE: Record<string, string> = {
  Received: "Document intake complete. No exceptions identified yet.",
  Completed: "Step complete. No exceptions identified at this stage.",
  Monitoring: "Operational activity is being monitored against agreed terms.",
  Pending: "Awaiting reviewer action.",
};

export function ContractXSection() {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [activeStepIndex, setActiveStepIndex] = useState(DEFAULT_ACTIVE_STEP);

  const activeTab = sourceTabs[activeTabIndex];
  const example = workflowExamples[activeTab.exampleId];
  const activeStep = workflowSteps[activeStepIndex];
  const showFinding = activeStepIndex === DEFAULT_ACTIVE_STEP;

  return (
    <SectionWrapper
      theme="light"
      reviewId={IDS.contractX.root}
      ariaLabelledBy="contractx-heading"
    >
      <div className={styles.header}>
        <div className={styles.headerText}>
          <p className={shared.sectionEyebrow} data-review-id={IDS.contractX.eyebrow}>
            Active Operational Intelligence
          </p>
          <h2
            id="contractx-heading"
            className={shared.sectionTitle}
            data-review-id={IDS.contractX.heading}
          >
            Turn contracts and invoices into active operational intelligence.
          </h2>
          <p className={shared.sectionLead} data-review-id={IDS.contractX.paragraph}>
            Our platform interprets agreements, amendments, statements of work, purchase orders, and
            related commercial records, and matches and validates every invoice against
            them—giving teams one place to understand what has been agreed, monitor what
            must happen next, and evaluate activity against the right terms.
          </p>
        </div>
        <a href="#contractx" className={styles.cta} data-review-id={IDS.contractX.cta}>
          Explore the platform
        </a>
      </div>

      <div className={styles.featureGrid}>
        {contractXFeatures.map((feature, index) => {
          const Icon = ICONS[feature.icon];
          return (
            <div
              key={feature.heading}
              className={styles.featureCard}
              data-review-id={IDS.contractX.feature(index + 1)}
            >
              <div className={styles.featureIcon}>
                <Icon size={18} aria-hidden="true" />
              </div>
              <p className={styles.featureHeading}>{feature.heading}</p>
              <p className={styles.featureBody}>{feature.body}</p>
            </div>
          );
        })}
      </div>

      <div className={styles.workflowLayout}>
        <div className={styles.left}>
          <div className={styles.sourceTabs} role="tablist" aria-label="Example source documents">
            {sourceTabs.map((tab, index) => (
              <button
                key={`${tab.label}-${index}`}
                type="button"
                role="tab"
                aria-selected={index === activeTabIndex}
                className={styles.sourceTab}
                data-active={index === activeTabIndex}
                data-review-id={IDS.contractX.sourceTab(index + 1)}
                onClick={() => {
                  setActiveTabIndex(index);
                  setActiveStepIndex(DEFAULT_ACTIVE_STEP);
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className={styles.workflow}>
            <div className={styles.workflowRail} aria-hidden="true" />
            {workflowSteps.map((step, index) => {
              const Icon = ICONS[step.icon];
              const active = index === activeStepIndex;
              return (
                <button
                  key={step.label}
                  type="button"
                  className={styles.workflowStep}
                  data-active={active}
                  data-review-id={IDS.contractX.workflowStep(index + 1)}
                  onClick={() => setActiveStepIndex(index)}
                >
                  <span className={styles.stepNumber}>{index + 1}</span>
                  <Icon size={16} className={styles.stepIcon} aria-hidden="true" />
                  <span className={styles.stepLabel}>{step.label}</span>
                  <span className={styles.stepBadge} data-status={step.status}>
                    {step.status}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className={styles.findingPanel} data-review-id={IDS.contractX.findingPanel}>
          <div className={styles.findingHeader}>
            <AlertTriangle size={18} className={styles.findingAlertIcon} aria-hidden="true" />
            <span>Finding</span>
            {showFinding && <span className={styles.confidence}>{example.confidence}</span>}
          </div>

          {showFinding ? (
            <>
              <p className={styles.findingStatement} data-review-id={IDS.contractX.findingStatement}>
                {example.statement}
              </p>

              <p className={styles.evidenceLabel}>Supporting evidence</p>
              <ul className={styles.evidenceList}>
                {example.evidence.map((row, index) => {
                  const Icon = ICONS[row.icon];
                  return (
                    <li
                      key={row.name}
                      data-review-id={IDS.contractX.findingEvidence(index + 1)}
                    >
                      <Icon size={15} aria-hidden="true" />
                      <span className={styles.evidenceName}>{row.name}</span>
                      <span className={styles.evidenceBadge}>{row.badge}</span>
                    </li>
                  );
                })}
              </ul>

              <div
                className={styles.recommendedAction}
                data-review-id={IDS.contractX.findingRecommendedAction}
              >
                <span className={styles.recommendedLabel}>Recommended action</span>
                <p>{example.recommendedAction}</p>
              </div>
            </>
          ) : (
            <p className={styles.neutralMessage}>{STATUS_MESSAGE[activeStep.status]}</p>
          )}
        </div>
      </div>

      <div className={styles.closingBlock}>
        <p className={styles.closingStatement} data-review-id={IDS.contractX.closingStatement}>
          {closingStatement}
        </p>
        <div className={styles.closingCtaRow}>
          <a href="#demo" className={styles.ctaPrimary} data-review-id={IDS.contractX.ctaPrimary}>
            See it in action
          </a>
          <a
            href="#platform"
            className={styles.ctaSecondary}
            data-review-id={IDS.contractX.ctaSecondary}
          >
            Explore the platform
          </a>
        </div>
      </div>
    </SectionWrapper>
  );
}
