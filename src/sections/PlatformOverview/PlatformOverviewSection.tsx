import {
  LayoutDashboard,
  ListChecks,
  AlertTriangle,
  FileText,
  Receipt,
  Bot,
  BarChart3,
  Plug,
  Settings,
  LayoutGrid,
  Link2,
  UserCheck,
  ShieldCheck,
  TrendingUp,
  Puzzle,
  Building2,
  Calendar,
  Bell,
} from "lucide-react";
import { SectionWrapper } from "../../components/SectionWrapper/SectionWrapper";
import { IDS } from "../../registry/ids";
import shared from "../../styles/shared.module.css";
import styles from "./PlatformOverviewSection.module.css";
import {
  sidebarItems,
  topControls,
  kpiCards,
  workQueueItems,
  upcomingObligations,
  topExceptionReasons,
  integrationActivity,
  platformHighlights,
  type PlatformIcon,
  type PlatformIconName,
} from "./platformOverviewContent";

const ICONS: Record<PlatformIconName, PlatformIcon> = {
  LayoutDashboard,
  ListChecks,
  AlertTriangle,
  FileText,
  Receipt,
  Bot,
  BarChart3,
  Plug,
  Settings,
  LayoutGrid,
  Link2,
  UserCheck,
  ShieldCheck,
  TrendingUp,
  Puzzle,
  Building2,
  Calendar,
  Bell,
};

interface PlatformOverviewSectionProps {
  onContactClick?: () => void;
}

export function PlatformOverviewSection({ onContactClick }: PlatformOverviewSectionProps) {
  return (
    <SectionWrapper
      id="platform"
      theme="dark"
      reviewId={IDS.platformOverview.root}
      ariaLabelledBy="platform-overview-heading"
    >
      <div className={styles.intro}>
        <p className={shared.sectionEyebrow} data-review-id={IDS.platformOverview.eyebrow}>
          The XKogni.ai platform
        </p>

        <h2
          id="platform-overview-heading"
          className={shared.sectionTitle}
          data-review-id={IDS.platformOverview.heading}
        >
          Manage the complete journey from{" "}
          <span className={shared.highlight}>procurement to invoice processing</span>, with
          financial intelligence at every step.
        </h2>

        <p className={shared.sectionLead} data-review-id={IDS.platformOverview.paragraph}>
          XKogni.ai provides a shared operating environment that follows work from purchase
          order and contract through invoice matching, exception resolution, and human review—
          giving finance and operations teams a continuous, auditable view of financial exposure
          and the reasoning behind every automated recommendation, from one platform.
        </p>
      </div>

      <div
        className={styles.dashboard}
        data-review-id={IDS.platformOverview.dashboard}
        role="img"
        aria-label="XKogni.ai platform dashboard showing a navigation sidebar, entity and date controls, five KPI cards, a work queue, upcoming obligations, top exception reasons, and integration activity for connected enterprise systems."
      >
        <aside className={styles.sidebar} aria-hidden="true">
          <div className={styles.sidebarBrand}>
            <span className={styles.sidebarMark}>X</span>
            <span>XKogni.ai</span>
          </div>
          <nav className={styles.sidebarNav}>
            {sidebarItems.map((item, index) => {
              const Icon = ICONS[item.icon];
              return (
                <span
                  key={item.label}
                  className={styles.sidebarItem}
                  data-active={index === 0}
                  data-review-id={IDS.platformOverview.sidebarItem(index + 1)}
                >
                  <Icon size={16} />
                  {item.label}
                </span>
              );
            })}
          </nav>
        </aside>

        <div className={styles.main} aria-hidden="true">
          <div className={styles.topBar}>
            {topControls.map((control, index) => {
              const Icon = ICONS[control.icon];
              return (
                <span
                  key={control.label}
                  className={styles.topControl}
                  data-review-id={IDS.platformOverview.topControl(index + 1)}
                >
                  <Icon size={14} />
                  {control.label}
                </span>
              );
            })}
            <span className={styles.avatar}>JD</span>
          </div>

          <div className={styles.kpiRow}>
            {kpiCards.map((kpi, index) => (
              <div
                key={kpi.label}
                className={styles.kpiCard}
                data-review-id={IDS.platformOverview.kpiCard(index + 1)}
              >
                <p className={styles.kpiValue}>{kpi.value}</p>
                <p className={styles.kpiLabel}>{kpi.label}</p>
              </div>
            ))}
          </div>

          <div className={styles.panels}>
            <div className={styles.panel}>
              <p className={styles.panelTitle}>Work Queue</p>
              <ul className={styles.panelList}>
                {workQueueItems.map((item, index) => (
                  <li
                    key={item}
                    data-review-id={IDS.platformOverview.workQueueItem(index + 1)}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.panel}>
              <p className={styles.panelTitle}>Upcoming Obligations</p>
              <ul className={styles.panelList}>
                {upcomingObligations.map((item, index) => (
                  <li
                    key={item}
                    data-review-id={IDS.platformOverview.obligationItem(index + 1)}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.panel}>
              <p className={styles.panelTitle}>Top Exception Reasons</p>
              <ul className={styles.reasonList}>
                {topExceptionReasons.map((reason, index) => (
                  <li
                    key={reason.label}
                    data-review-id={IDS.platformOverview.exceptionReasonItem(index + 1)}
                  >
                    <span>{reason.label}</span>
                    <span className={styles.reasonBarTrack}>
                      <span
                        className={styles.reasonBarFill}
                        style={{ width: `${reason.share}%` }}
                      />
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.panel}>
              <p className={styles.panelTitle}>Integration Activity</p>
              <ul className={styles.integrationList}>
                {integrationActivity.map((item, index) => (
                  <li
                    key={item}
                    data-review-id={IDS.platformOverview.integrationItem(index + 1)}
                  >
                    <span className={styles.integrationDot} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.highlights}>
        <h3
          className={styles.highlightsHeading}
          data-review-id={IDS.platformOverview.highlightsHeading}
        >
          One platform. Complete operational control.
        </h3>
        <p
          className={styles.highlightsParagraph}
          data-review-id={IDS.platformOverview.highlightsParagraph}
        >
          XKogni.ai brings together people, processes, documents, and systems—so financial
          operations can run with clarity, accuracy, and confidence.
        </p>

        <div className={styles.highlightGrid}>
          {platformHighlights.map((highlight, index) => {
            const Icon = ICONS[highlight.icon];
            return (
              <div
                key={highlight.heading}
                className={styles.highlightCard}
                data-review-id={IDS.platformOverview.highlightCard(index + 1)}
              >
                <div className={styles.highlightIcon}>
                  <Icon size={20} aria-hidden="true" />
                </div>
                <p className={styles.highlightHeading}>{highlight.heading}</p>
                <p className={styles.highlightBody}>{highlight.body}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.closing}>
        <p className={styles.closingStatement} data-review-id={IDS.platformOverview.closingStatement}>
          One view of the work. One record of how every decision was reached.
        </p>
        <div className={styles.closingCtas}>
          <button
            type="button"
            onClick={onContactClick}
            className={styles.ctaPrimary}
            data-review-id={IDS.platformOverview.ctaSecondary}
          >
            See XKogni.ai in action
          </button>
        </div>
      </div>
    </SectionWrapper>
  );
}
