# XCogni.ai Website — Final Visual, Content, Interaction & React Build Specification

## Purpose

This document translates the approved XCogni.ai layouts into a production-ready specification for a static React website. It includes the final content, visual hierarchy, responsive behavior, diagrams, interactive behavior, animation recommendations, functional CSS patterns, and suggested component architecture.

This file intentionally avoids defining the color palette. All styling examples use semantic CSS variables so the separate design-token file can control the final appearance.

---

# 1. Recommended Technology Stack

## Core

- React 19
- TypeScript
- Vite for a lightweight static marketing website
- React Router only when separate product, solution, company, and resource routes are introduced
- Static hosting through Vercel, Netlify, Cloudflare Pages, or a VPS

A single homepage does not require React Router.

## Styling

Recommended order:

1. CSS Modules with global semantic design tokens
2. Tailwind CSS using semantic utilities
3. Vanilla CSS with a strict component naming convention

CSS Modules are preferred because the approved sections contain complex layouts and custom diagrams that benefit from isolated styles.

## Animation and Interaction

Use a restrained combination of:

- Framer Motion for entry reveals, staggered children, active states, hover states, number transitions, and local diagram changes
- GSAP with ScrollTrigger only for complex scroll-bound sequences
- Embla Carousel for the industry-stat and integration carousels
- Recharts for conventional dashboard charts
- SVG for connectors, workflow paths, confidence rings, orbit lines, and flow diagrams
- Lucide React for standard icons
- Custom SVG icons where the visual reference requires a unique symbol

Do not use GSAP for basic button, card, or opacity animation.

## Images

- Use AVIF or WebP
- Provide desktop, tablet, and mobile crops
- Use CSS backgrounds only for decorative atmospheric assets
- Use `<img>` or `<picture>` for meaningful product visuals
- Lazy-load all sections below the fold

---

# 2. Shared Page Architecture

## Homepage Order

1. Header and Hero
2. Operational Gap
3. Industry Problem Figures
4. Platform Overview
5. ContractX
6. InvoiceX
7. Enterprise Integrations
8. Agentic Overview
9. Deployment and Security
10. Footer

## Global Section Wrapper

```tsx
<section
  className={styles.section}
  data-theme="dark"
  aria-labelledby="section-title"
>
  <div className={styles.container}>...</div>
</section>
```

Only use:

```html
data-theme="dark"
data-theme="light"
```

Components inherit semantic background, surface, text, border, shadow, and accent values from the parent section.

## Shared CSS Foundation

```css
:root {
  --page-max-width: 1440px;
  --content-width: 1280px;
  --text-width: 760px;

  --section-space-xl: clamp(6rem, 10vw, 10rem);
  --section-space-lg: clamp(5rem, 8vw, 8rem);
  --section-space-md: clamp(4rem, 7vw, 6rem);

  --radius-control: 0.625rem;
  --radius-card: 1rem;
  --radius-panel: 1.25rem;
  --radius-large: 1.75rem;

  --motion-fast: 180ms;
  --motion-medium: 320ms;
  --motion-slow: 700ms;

  --ease-standard: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-soft: cubic-bezier(0.16, 1, 0.3, 1);
}

.section {
  position: relative;
  overflow: clip;
  padding-block: var(--section-space-lg);
  color: var(--text-primary);
  background: var(--background-section);
}

.container {
  width: min(calc(100% - 2.5rem), var(--content-width));
  margin-inline: auto;
}

.sectionEyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--accent-primary);
}

.sectionEyebrow::before {
  content: "";
  width: 1.75rem;
  height: 1px;
  background: currentColor;
}

.sectionTitle {
  max-width: 18ch;
  margin: 1rem 0 0;
  font-size: clamp(2.4rem, 5vw, 4.75rem);
  line-height: 1.03;
  letter-spacing: -0.045em;
  font-weight: 500;
}

.sectionLead {
  max-width: 44rem;
  margin-top: 1.25rem;
  color: var(--text-secondary);
  font-size: clamp(1rem, 1.35vw, 1.2rem);
  line-height: 1.7;
}

.highlight {
  color: var(--accent-primary);
}
```

---

# 3. Header and Hero

## Purpose

Introduce XCogni.ai as an agentic financial-operations platform and visually show transformation from incoming records to validated actions.

## Content

### Navigation

Left:

- XCogni.ai logo and wordmark

Center:

- Platform
- Products
- Solutions
- Resources
- Company

Right:

- Book a demo

### Eyebrow

**AGENTIC INTELLIGENCE FOR FINANCIAL OPERATIONS**

### Main Heading

**Turn operational documents into decisions that move.**

Highlight:

**decisions that move.**

### Supporting Text

XCogni.ai deploys specialized AI agents across invoices, contracts, purchase orders, and supporting records—bringing together the context teams need to review exceptions, make decisions, and keep enterprise systems aligned.

### CTAs

- See XCogni.ai in action
- Explore the platform

### Trust Statements

- Enterprise grade security
- Human in control by design
- Built for complex operations

### Trust Strip

**TRUSTED BY FINANCE & OPERATIONS TEAMS AT**

Only include confirmed customer or partner logos.

---

## Visual Description

The desktop hero uses two primary columns.

### Left Column

1. Eyebrow
2. Multiline headline
3. Supporting paragraph
4. CTA row
5. Three compact trust statements

The left column should occupy approximately 40–45% of the available width.

### Right Column

A central XCogni.ai mark sits between two vertical node stacks.

Inputs:

- Invoices
- Contracts
- Purchase Orders
- Emails & Attachments
- Supporting Records

Outputs:

- Validated Data
- Identified Exceptions
- Recommended Actions
- Approval Tasks
- System Updates

Each node contains an icon and label. Fine data streams converge from the input stack into the X mark and spread outward toward the output stack.

The mark is the dominant focal point.

---

## Diagram Construction

Build the diagram using HTML cards and SVG paths.

Layer order:

1. Decorative dot field
2. Fine circuit lines
3. Animated SVG stream paths
4. Input cards
5. Central mark
6. Output cards
7. Particle highlights

Suggested structure:

```tsx
<HeroFlow>
  <FlowNodeGroup side="input" nodes={inputNodes} />
  <DataStream direction="inbound" />
  <LogoCore />
  <DataStream direction="outbound" />
  <FlowNodeGroup side="output" nodes={outputNodes} />
</HeroFlow>
```

Animated path CSS:

```css
.dataPath {
  fill: none;
  stroke: var(--flow-line);
  stroke-width: 1;
  stroke-linecap: round;
  stroke-dasharray: 3 8;
  animation: flowDash 8s linear infinite;
}

.dataPath:nth-child(2n) {
  animation-duration: 11s;
}

@keyframes flowDash {
  to {
    stroke-dashoffset: -120;
  }
}
```

Use CSS motion paths, Framer Motion, or GSAP MotionPathPlugin to move small particles along selected paths.

---

## Animation

Initial sequence:

1. Header fades in
2. Eyebrow rises
3. Headline reveals line by line
4. Paragraph and CTA row fade upward
5. Node cards appear with a stagger
6. Central mark scales from 0.92 to 1
7. Data streams activate

Framer Motion base variants:

```tsx
const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};
```

Use only subtle scroll parallax.

---

## Responsive Behavior

Tablet:

- Retain two columns
- Reduce node-card dimensions
- Reduce central mark size
- Allow trust statements to wrap

Mobile:

- Stack copy and diagram
- Show only three input and three output nodes at a time
- Cycle hidden nodes automatically
- Remove nonessential circuits
- Remove or horizontally scroll the trust strip

---

# 4. Operational Gap

## Purpose

Explain why financial operations remain fragmented even when the required information exists.

## Content

### Eyebrow

**THE OPERATIONAL GAP**

### Heading

**Your documents contain the answers.  
Your teams still have to assemble the context.**

Highlight:

**assemble the context.**

### Supporting Text

Critical financial information is scattered across PDFs, emails, contracts, purchase orders, spreadsheets, and enterprise systems. Before a decision can be made, teams spend hours finding, comparing, and validating what should already be connected.

### Transition Statement

**XCogni.ai transforms this fragmented process into one connected operational flow.**

### Card 01

**Information remains trapped.**

Subheading:

**Documents arrive. Context does not.**

Body:

Values, dates, clauses, obligations, and supporting evidence remain buried across separate documents and applications.

### Card 02

**Reviews repeatedly restart.**

Subheading:

**Every handoff rebuilds the same story.**

Body:

Reviewers spend time searching for information that another team may have already located, checked, or discussed.

### Card 03

**Exceptions become coordination problems.**

Subheading:

**Identifying an issue is only the beginning.**

Body:

Teams must still determine the cause, gather evidence, assign ownership, request clarification, and track the issue through resolution.

---

## Visual Description

- Centered eyebrow, headline, supporting text, and transition statement
- Three equal-width cards
- Each card includes:
  - circular icon
  - sequence number
  - short decorative divider
  - heading
  - subheading
  - internal divider
  - body copy
  - subtle corner pattern

---

## Animation and CSS

Heading reveals first. Cards enter with a low vertical stagger.

```css
.problemCard {
  transform: translateY(0);
  transition:
    transform var(--motion-medium) var(--ease-standard),
    box-shadow var(--motion-medium) var(--ease-standard),
    border-color var(--motion-medium) var(--ease-standard);
}

.problemCard:hover {
  transform: translateY(-6px);
  border-color: var(--border-active);
  box-shadow: var(--shadow-elevated);
}
```

Icons may draw or rotate once on entry. Avoid continuous icon motion.

---

# 5. Industry Problem Figures

## Purpose

Quantify the operational impact through a stat carousel.

## Content

### Eyebrow

**THE COST OF FRAGMENTED OPERATIONS**

### Heading

**Every manual handoff adds time, uncertainty, and operational risk.**

Highlight:

**time, uncertainty, and operational risk.**

### Supporting Text

The impact is not limited to data entry. It appears in exception queues, delayed approvals, duplicate work, missed commercial dates, inconsistent decisions, and limited operational visibility.

### Draft Stat Cards

#### Manual Handling

**70%+**

of financial documents require some form of manual review, correction, or routing.

#### Exception Resolution

**12–18 hrs**

is the average time spent investigating a single invoice or PO discrepancy.

#### Disconnected Systems

**6–10**

systems, files, and channels are typically involved in resolving one exception.

#### Commercial Exposure

**3–5%**

of spend is impacted annually by duplicate payments, missed obligations, or incorrect terms.

#### Operational Visibility

**60%**

of teams lack a consolidated view of document status, exceptions, and ownership.

These figures require verification and citations before publication.

---

## Visual Description

- Centered text block
- Horizontal five-card carousel
- Active card receives stronger emphasis
- Previous and next controls outside the track
- Pagination dots below
- Source note at the bottom

Each card contains:

1. sequence number
2. icon inside a dotted circle
3. category label
4. large statistic
5. divider
6. short explanation

---

## Carousel Functionality

Use Embla Carousel.

```tsx
<div className={styles.viewport} ref={emblaRef}>
  <div className={styles.track}>
    {stats.map((stat, index) => (
      <StatCard
        key={stat.id}
        stat={stat}
        active={index === selectedIndex}
      />
    ))}
  </div>
</div>
```

```css
.statsViewport {
  overflow: hidden;
}

.statsTrack {
  display: flex;
  gap: 1rem;
  touch-action: pan-y pinch-zoom;
}

.statSlide {
  flex: 0 0 min(22rem, 82vw);
  min-width: 0;
}

@media (min-width: 1200px) {
  .statSlide {
    flex-basis: calc((100% - 4rem) / 5);
  }
}

.statCard {
  height: 100%;
  transition:
    transform var(--motion-medium) var(--ease-standard),
    opacity var(--motion-medium) var(--ease-standard);
}

.statCard[data-active="false"] {
  opacity: 0.72;
  transform: scale(0.97);
}

.statCard[data-active="true"] {
  opacity: 1;
  transform: scale(1);
}
```

Autoplay is optional. Pause on hover and focus. Disable autoplay when reduced motion is active.

---

# 6. Platform Overview

## Purpose

Present XCogni.ai as one operational control layer.

## Content

### Eyebrow

**THE XCOGNI.AI PLATFORM**

### Heading

**Build, deploy, and govern AI agents across document-heavy operations.**

Highlight:

**document-heavy**

### Supporting Text

XCogni.ai provides a shared operating environment for intelligent document processing, contextual validation, exception management, human review, and enterprise-system coordination. Monitor how work is moving, identify what requires attention, and understand the reasoning behind automated recommendations from one platform.

### Platform Highlights Heading

**One platform.  
Complete operational control.**

### Supporting Highlight Text

XCogni.ai brings together people, processes, documents, and systems—so financial operations can run with clarity, accuracy, and confidence.

### Highlights

#### Unified operational view

Track documents, exceptions, obligations, and decisions in real time across entities and business units.

#### Context that connects

View the full story behind every item—documents, contracts, history, and related transactions.

#### Human decisions at the center

AI prepares the work. People review, decide, and approve within configurable guardrails and workflows.

#### Governed and auditable

Every action, decision, and system update is captured for auditability, compliance, and continuous improvement.

#### Performance that improves

Monitor cycle time, exception trends, automation rates, and team performance with out-of-the-box insights.

#### Built to fit your enterprise

Flexible configuration, role-based access, and deep integrations ensure the platform fits your operating model.

### Closing Statement

**One view of the work.  
One record of how every decision was reached.**

### CTAs

- Explore the platform
- See XCogni.ai in action

---

## Visual Description

This section flows top-to-bottom:

1. centered eyebrow
2. centered heading
3. centered paragraph
4. large dashboard visual
5. six-feature block
6. closing CTA panel

The dashboard sits over a subtle atmospheric backdrop but remains the main focus.

---

## Dashboard Composition

Sidebar:

- Overview
- Work Queue
- Exceptions
- Contracts
- Invoices
- Agents
- Reports
- Integrations
- Settings

Top controls:

- entity selector
- date range
- notifications
- user avatar

KPI cards:

- Documents Processing
- Exceptions Awaiting Review
- Auto-Cleared
- Average Handling Time
- Items Completed

Main panels:

Work Queue:

- Exceptions
- PO Mismatches
- Price Variances
- Missing Information
- Duplicate Detection

Upcoming Obligations:

- Contract Renewals
- Payment Milestones
- Notice Periods
- SLA Commitments

Top Exception Reasons:

- PO Mismatch
- Price Variance
- Missing Information
- Tax / VAT
- Other

Integration Activity:

- SAP S/4HANA
- Oracle
- Coupa
- Workday
- Microsoft Dynamics 365
- SharePoint

Only show confirmed integrations.

---

## Animation

On first section entry:

1. dashboard frame rises and sharpens
2. sidebar items stagger
3. KPI values count up
4. list rows slide in
5. circular chart draws
6. integration status indicators activate

```css
.chartArc {
  stroke-dasharray: 280;
  stroke-dashoffset: 280;
}

.platformSection[data-visible="true"] .chartArc {
  animation: chartDraw 1.2s var(--ease-standard) forwards 0.45s;
}

@keyframes chartDraw {
  to {
    stroke-dashoffset: 0;
  }
}
```

On mobile, render a curated dashboard rather than shrinking the desktop interface.

---

# 7. ContractX

## Purpose

Explain how ContractX converts agreements and related records into active operational intelligence.

## Content

### Eyebrow

**CONTRACTX**

### Heading

**Turn commercial documents into active operational intelligence.**

### Supporting Text

ContractX interprets agreements, amendments, statements of work, purchase orders, and related commercial records—helping teams understand what has been agreed, monitor what must happen next, and evaluate activity against the right terms.

### CTA

**Explore ContractX**

### Features

1. **Extract commercial terms**  
   Capture pricing, payment conditions, dates, commitments, and key clauses.

2. **Create an obligation map**  
   Organise responsibilities by owner, due date, and dependency.

3. **Track dates and changes**  
   Monitor renewals, notice periods, milestones, and amendments.

4. **Validate operational activity**  
   Compare invoices, POs, and records against agreed commercial terms.

5. **Surface deviations**  
   Highlight inconsistencies, expired terms, and unfulfilled obligations.

6. **Review with evidence**  
   Connect each finding to the exact clause, source document, or amendment.

---

## Layout

1. left-aligned eyebrow, heading, and paragraph
2. CTA in the top-right
3. six features in a 3 × 2 grid
4. large workflow interface below

The workflow interface is the main proof point.

---

## ContractX Workflow Diagram

The visual is divided into a left timeline and right finding panel.

### Source Tabs

At the top of the left panel:

- Agreement
- Amendment
- SOW
- PO
- Renewal

These are compact selectable tabs.

### Workflow Steps

1. Document received
2. Terms interpreted
3. Obligations structured
4. Operational activity monitored
5. Deviation identified
6. Reviewer action initiated

Each row includes:

- number
- icon
- label
- status badge

Statuses:

- Received
- Completed
- Completed
- Monitoring
- Flagged
- Pending

The fifth step is active in the default state.

### Timeline Construction

Use HTML rows and a vertical CSS rail.

```tsx
<div className={styles.workflow}>
  <div className={styles.workflowRail} aria-hidden="true" />
  {steps.map((step, index) => (
    <WorkflowStep
      key={step.id}
      step={step}
      active={index === activeStep}
    />
  ))}
</div>
```

```css
.workflow {
  position: relative;
  display: grid;
  gap: 0.65rem;
}

.workflowRail {
  position: absolute;
  top: 1.75rem;
  bottom: 1.75rem;
  left: 1rem;
  width: 1px;
  background: var(--workflow-line);
}

.workflowStep {
  position: relative;
  display: grid;
  grid-template-columns: 2rem auto 1fr auto;
  align-items: center;
  gap: 0.75rem;
  min-height: 3.5rem;
  padding: 0.75rem 1rem;
  border: 1px solid var(--border-default);
  border-radius: var(--radius-control);
  background: var(--surface-secondary);
}

.workflowStep::before {
  content: "";
  position: absolute;
  left: 0.75rem;
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: var(--workflow-node);
}

.workflowStep[data-active="true"] {
  border-color: var(--border-active);
  box-shadow: var(--shadow-active);
}
```

### Active Connector

An SVG path connects the active workflow row to the finding panel.

```css
.activeConnector {
  stroke-dasharray: 240;
  stroke-dashoffset: 240;
  animation: connectorIn 500ms var(--ease-standard) forwards;
}

@keyframes connectorIn {
  to {
    stroke-dashoffset: 0;
  }
}
```

### Finding Panel

Header:

- alert icon
- Finding
- confidence indicator

Finding:

**Invoice pricing differs from the rate defined in the active commercial agreement.**

Supporting evidence:

- Invoice line item
- Purchase-order value
- Contract pricing clause
- Relevant amendment
- Historical transaction

Recommended action:

**Route for commercial review before approval.**

Each evidence row includes source icon, source name, and source-type badge.

---

## Interaction

Workflow steps are selectable.

When a new step is selected:

- active row changes
- connector moves
- finding content transitions
- confidence updates
- evidence list updates

Use Framer Motion `layoutId`.

```tsx
{active && (
  <motion.div
    layoutId="contractx-active-step"
    className={styles.activeOutline}
    transition={{
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1]
    }}
  />
)}
```

Source tabs may switch between predefined examples:

- agreement pricing deviation
- amendment renewal risk
- purchase-order obligation mismatch

### Mobile

- horizontally scrollable source tabs
- timeline first
- finding panel below
- vertical connector instead of cross-panel path

---

# 8. InvoiceX

## Purpose

Show how InvoiceX moves invoices from intake to automated processing or evidence-rich review.

## Content

### Eyebrow

**INVOICEX**

### Heading

**Move invoices from arrival to approval with the context already assembled.**

Highlight:

**context already assembled.**

### Supporting Text

InvoiceX captures incoming invoices, connects them with relevant financial and commercial records, identifies discrepancies, and prepares each item for the appropriate automated or human action.

### Supporting Emphasis

**Routine documents continue through the workflow.  
Exceptions arrive with the evidence required to resolve them.**

### Divider Label

**TWO EXPERIENCES. ONE OUTCOME.**

---

## Top Flow Diagram

Inputs:

- Email
- Portal Upload
- EDI / APIs
- Shared Drive
- Scanner

Center:

**InvoiceX Intelligence**

Outputs:

- Validated Data
- Exceptions
- Recommended Actions
- Approval Tasks
- System Updates

Use two vertical stacks and a centered intelligence card. SVG paths sit behind the cards.

```tsx
<div className={styles.invoiceFlow}>
  <NodeStack side="input" nodes={inputNodes} />
  <svg className={styles.connections}>...</svg>
  <div className={styles.intelligenceCore}>...</div>
  <NodeStack side="output" nodes={outputNodes} />
</div>
```

On entry, inputs appear, paths draw inward, the core pulses, output paths draw outward, and outputs appear.

---

## Panel 01 — Continuous Invoice Control

Heading:

**Continuous invoice control**

Subheading:

**Understand every invoice in context.**

Body:

InvoiceX classifies incoming documents, extracts relevant information, and connects each invoice with purchase orders, contracts, receipts, vendor records, and policies.

Capabilities:

- Invoice intake & classification
- Data extraction & interpretation
- PO & contract matching
- Supporting document association
- Exception identification
- Coding & routing preparation

Draft metrics in the reference:

- 95% Auto extracted
- 3 Exceptions found
- 2 Documents matched
- 87% Straight-through rate

Replace with verified values or remove them.

---

## Panel 02 — Exception-Ready Review

Heading:

**Exception-ready review**

Subheading:

**Give reviewers the issue—not the investigation.**

Body:

When human judgment is required, InvoiceX presents the discrepancy, related evidence, applicable controls, system confidence, and recommended actions in one place.

Default exception:

- Exception #EX-78291
- Pending Review
- 1 of 3

Issue:

**Price variance detected**

Description:

Invoice unit price is higher than the price in the matching PO.

Variance:

**USD 4,860.00  
(8.2%)**

Evidence:

- Invoice Line Item
- Purchase Order
- Contract Clause
- Goods Receipt
- Vendor Policy

Confidence:

**92% — High**

Recommended Action:

**Send for price variance approval.**

Primary action:

**Take Action**

Reviewer actions:

- Approve
- Send back
- Request information
- Correct data
- Escalate
- Add evidence
- Add comment

---

## Lower Trust Bar

Statement:

**Every decision is connected.  
Every action is recorded.**

Features:

### End-to-end traceability

From intake to payment, every action is captured with source evidence.

### Audit-ready by design

Complete audit trail with versioning, reviewer activity, and approvals.

### Secure & compliant

Role-based access, data encryption, and compliance with global standards.

### Performance that scales

Handle high invoice volumes across entities, regions, and business units.

CTAs:

- Explore InvoiceX
- See InvoiceX in action

---

## Diagram Interaction

### Entry Sequence

1. left panel enters
2. right panel enters
3. evidence rows stagger
4. confidence ring animates
5. recommended action rises
6. reviewer actions appear

### Confidence Ring

```tsx
<svg viewBox="0 0 120 120" className={styles.confidenceRing}>
  <circle className={styles.track} cx="60" cy="60" r="48" />
  <motion.circle
    className={styles.value}
    cx="60"
    cy="60"
    r="48"
    pathLength="1"
    initial={{ pathLength: 0 }}
    whileInView={{ pathLength: 0.92 }}
    viewport={{ once: true }}
    transition={{
      duration: 1.1,
      ease: [0.22, 1, 0.36, 1]
    }}
  />
</svg>
```

### Exception Switcher

Use local React state.

```tsx
const [activeException, setActiveException] = useState(0);
```

On change:

- old content exits left or right
- new content enters
- evidence rows re-stagger
- confidence ring redraws
- recommended action updates

### Mobile

- stack introduction and flow diagram
- convert node stacks into horizontal chips
- stack the two major panels
- collapse capability list after the first three items
- keep reviewer actions horizontally scrollable

---

# 9. Enterprise Integrations

## Purpose

Show that XCogni.ai can operate across existing business systems.

## Content

### Eyebrow

**ENTERPRISE INTEGRATIONS**

### Heading

**Works with the systems your teams already depend on.**

Highlight:

**your teams already depend on.**

### Supporting Text

XCogni.ai operates between document channels, operational teams, and systems of record—adding intelligence and orchestration without disrupting your existing stack.

### Closing Text

**Information enters through the channels teams already use and returns to the systems they already trust.**

### Reference Integrations

- Workday — HCM / Finance
- Coupa — Procurement
- Oracle — ERP
- SAP S/4HANA — ERP & Finance
- SharePoint — Content & Collaboration
- Microsoft Dynamics 365 — CRM & Operations
- AWS — Cloud Infrastructure

Only use confirmed integrations.

---

## Visual Description

- active card is large and centered
- immediate side cards are smaller
- outer cards are smaller, lower-opacity, and partially clipped
- cards follow a shallow visual arc
- previous and next controls at the edges
- pagination dots below

Each card includes:

1. category icon
2. integration logo
3. divider
4. category name
5. description
6. Learn more CTA

---

## Functional Carousel

Use Embla Carousel with Framer Motion transforms.

```tsx
const [emblaRef, emblaApi] = useEmblaCarousel({
  loop: true,
  align: "center",
  skipSnaps: false
});
```

Transform logic:

```tsx
const scale = distance === 0 ? 1 : distance === 1 ? 0.9 : 0.8;
const opacity = distance === 0 ? 1 : distance === 1 ? 0.78 : 0.42;
const translateY = distance === 0 ? 0 : distance === 1 ? 24 : 44;
const rotateY = index < selectedIndex ? 6 : index > selectedIndex ? -6 : 0;
```

```tsx
<motion.article
  animate={{
    scale,
    opacity,
    y: translateY,
    rotateY
  }}
  transition={{
    duration: 0.6,
    ease: [0.22, 1, 0.36, 1]
  }}
/>
```

```css
.integrationViewport {
  overflow: hidden;
  perspective: 1200px;
}

.integrationTrack {
  display: flex;
  align-items: center;
  touch-action: pan-y pinch-zoom;
}

.integrationSlide {
  flex: 0 0 clamp(17rem, 26vw, 24rem);
  min-width: 0;
  padding-inline: 0.5rem;
  transform-style: preserve-3d;
}

.integrationCard {
  min-height: 29rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 1.5rem;
  border: 1px solid var(--border-default);
  border-radius: var(--radius-panel);
  background: var(--surface-primary);
  box-shadow: var(--shadow-card);
  text-align: center;
}
```

Autoplay:

- every 4.5–5 seconds
- pause on hover and focus
- restart after user interaction
- disabled for reduced motion

---

# 10. Agentic Overview

## Purpose

Introduce the agentic architecture with one conceptual visual and minimal copy.

## Content

### Eyebrow

**AGENTIC OVERVIEW**

### Heading

**Our Agentic AI Platform**

Highlight:

**Agentic AI**

### Supporting Text

Specialized agents coordinating analysis, action, and orchestration across operations.

### Capability Cards

- Cross-System Communication
- Task Execution
- Analysis & Decisioning
- Custom Agent Builder

### Center Label

**CONTROL CORE**

---

## Visual Description

- centered eyebrow, heading, and one-line explanation
- central control-tower object
- top-left card: Cross-System Communication
- top-right card: Task Execution
- bottom-left card: Analysis & Decisioning
- bottom-right card: Custom Agent Builder
- orbit rings behind the tower
- atmospheric data field at the bottom
- sparse particles

Do not add detailed metrics or long descriptions.

---

## Construction and Animation

The tower may be a transparent WebP or 3D render.

```css
.agenticVisual {
  position: relative;
  min-height: clamp(34rem, 64vw, 48rem);
  display: grid;
  place-items: center;
}

.agenticOrbit {
  position: absolute;
  width: var(--orbit-size);
  aspect-ratio: 1;
  border: 1px dashed var(--orbit-line);
  border-radius: 50%;
  animation: orbitRotate 18s linear infinite;
}

.agenticOrbit:nth-child(2) {
  animation-direction: reverse;
  animation-duration: 24s;
}

@keyframes orbitRotate {
  to {
    transform: rotate(360deg);
  }
}

.agentCard {
  position: absolute;
  width: min(18rem, 24vw);
  display: grid;
  grid-template-columns: 3rem 1fr;
  gap: 1rem;
  align-items: center;
  padding: 1rem;
  border: 1px solid var(--border-default);
  border-radius: var(--radius-card);
  background: var(--surface-translucent);
  backdrop-filter: blur(14px);
}
```

Entry sequence:

1. landscape fades
2. tower rises
3. orbit rings draw
4. cards enter from nearest edge
5. connection nodes pulse

Ambient motion:

- slow orbit rotation
- subtle particle drift
- restrained tower light pulse

Mobile:

- keep tower centered
- stack four cards in a 2 × 2 grid below
- disable absolute card positioning and pointer parallax

---

# 11. Deployment and Security

## Purpose

Communicate flexible implementation and enterprise controls through a concise three-card layout.

## Content

### Badge

**Deployment & Security**

### Heading

**Deploys in short time.  
Tailored to each requirement.**

### Supporting Text

Built for enterprise environments with secure foundations, configurable workflows, and flexible deployment from day one.

Do not publish a specific deployment timeframe unless confirmed.

### Card 01

**SSO Support**

Secure access with enterprise SSO integration across your organization.

### Card 02

**Flexible Deployment**

Configure XCogni.ai around your systems, workflows, and operating environment.

### Card 03

**Enterprise Security & Governance**

Built with secure access controls, auditability, and enterprise-ready compliance foundations.

---

## Visual Description

- compact badge
- left-aligned two-line heading
- short paragraph
- three equal image cards

Each card contains:

1. atmospheric image
2. top-left icon
3. top-right number
4. title near bottom
5. description

---

## Interaction

```css
.deploymentCard {
  position: relative;
  overflow: hidden;
  min-height: 29rem;
  border: 1px solid var(--border-default);
  border-radius: var(--radius-card);
}

.deploymentCardMedia {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 700ms var(--ease-soft);
}

.deploymentCard:hover .deploymentCardMedia {
  transform: scale(1.025);
}
```

Use only light hover motion.

Responsive:

- desktop: three columns
- tablet: 2 + 1 grid or horizontal scroll
- mobile: vertical stack

---

# 12. Footer

## Purpose

Provide brand positioning, navigation, newsletter capture, legal links, system status, and verified trust indicators.

## Content

### Brand Block

**XCogni.ai**

**Agentic AI for document operations.  
Intelligent. Connected. Built for enterprise scale.**

### Social Links

- LinkedIn
- X
- YouTube

### Platform

- ContractX
- InvoiceX
- Intelligence Engine
- Agentic Overview
- Integrations
- Security

### Solutions

- Procure to Pay
- Order to Cash
- Record to Report
- Compliance & Audit
- Legal Operations

### Resources

- Resource Library
- Case Studies
- Blog
- Events
- Documentation

### Company

- About Us
- Careers
- Partners
- Newsroom
- Contact Us

### Newsletter

Heading:

**Stay updated with XCogni.ai**

Body:

Get the latest updates on features, releases, and insights delivered to your inbox.

Placeholder:

**Enter your work email**

CTA:

**Subscribe**

### Bottom Bar

- All systems operational
- © 2026 XCogni.ai. All rights reserved.
- Privacy Policy
- Terms of Service
- Trust Center
- Status

Only display verified compliance badges.

---

## Visual Description

1. five-column upper navigation
2. wider brand column
3. decorative data wave behind lower half
4. full-width newsletter panel
5. legal and status row

---

## Footer Functionality

Newsletter form state:

```tsx
const [email, setEmail] = useState("");
const [status, setStatus] = useState<
  "idle" | "loading" | "success" | "error"
>("idle");
```

Requirements:

- client-side validation
- loading state
- success message
- error message
- disabled repeated submission
- connection to CRM or newsletter endpoint

Footer wave:

```css
.footerWave {
  animation: footerWaveShift 20s ease-in-out infinite alternate;
  transform-origin: center;
}

@keyframes footerWaveShift {
  from {
    transform: translate3d(-1%, 0, 0) scaleY(0.98);
  }
  to {
    transform: translate3d(1%, -0.5%, 0) scaleY(1.02);
  }
}
```

---

# 13. Shared Animation Rules

Entry reveal:

```tsx
const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: {
    duration: 0.75,
    ease: [0.22, 1, 0.36, 1]
  }
};
```

Stagger:

```tsx
const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08
    }
  }
};
```

Hover rules:

- buttons: rise 2 px
- cards: rise 4–6 px
- icons: maximum scale 1.05
- avoid playful bounce
- avoid rotating whole cards

Reduced motion:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

```tsx
import { useReducedMotion } from "framer-motion";

const shouldReduceMotion = useReducedMotion();
```

---

# 14. Recommended React Component Tree

```text
App
├── SiteHeader
├── HeroSection
│   ├── HeroContent
│   ├── HeroFlowDiagram
│   └── TrustStrip
├── OperationalGapSection
│   └── ProblemCard[]
├── IndustryStatsSection
│   └── StatCarousel
├── PlatformOverviewSection
│   ├── PlatformDashboard
│   ├── PlatformFeatureGrid
│   └── PlatformCTA
├── ContractXSection
│   ├── ContractFeatureGrid
│   └── ContractWorkflowDemo
│       ├── SourceTabs
│       ├── WorkflowTimeline
│       ├── ActiveConnector
│       └── FindingPanel
├── InvoiceXSection
│   ├── InvoiceFlowDiagram
│   ├── ContinuousControlPanel
│   ├── ExceptionReviewPanel
│   └── InvoiceTrustBar
├── IntegrationsSection
│   └── IntegrationCarousel
├── AgenticOverviewSection
│   ├── AgenticControlCore
│   └── AgentCapabilityCard[]
├── DeploymentSection
│   └── DeploymentCard[]
└── SiteFooter
    ├── FooterNavigation
    ├── NewsletterForm
    └── FooterLegal
```

---

# 15. Content Data Structure

Keep copy outside presentational components.

```ts
export const contractSteps = [
  {
    id: "received",
    number: "01",
    title: "Document received",
    status: "Received"
  },
  {
    id: "interpreted",
    number: "02",
    title: "Terms interpreted",
    status: "Completed"
  }
];
```

State-based diagram data:

```ts
export const contractFindings = {
  pricingDeviation: {
    title:
      "Invoice pricing differs from the rate defined in the active commercial agreement.",
    confidence: 96,
    evidence: [
      { label: "Invoice line item", type: "Invoice" },
      { label: "Purchase-order value", type: "PO" },
      { label: "Contract pricing clause", type: "Agreement" },
      { label: "Relevant amendment", type: "Amendment" },
      { label: "Historical transaction", type: "System" }
    ],
    recommendation:
      "Route for commercial review before approval."
  }
};
```

This structure prepares the site for later CMS integration.

---

# 16. Accessibility

## Headings

- one `<h1>`
- section titles use `<h2>`
- card and panel titles use `<h3>`
- eyebrows are decorative labels, not headings

## Carousels

- accessible previous and next buttons
- active slide announcement
- keyboard support
- pause autoplay on focus
- no focus traps

## Diagrams

Provide semantic summaries.

```html
<div
  role="img"
  aria-label="Invoices, contracts, purchase orders, emails, and supporting records flow through the XCogni.ai intelligence layer and become validated data, exceptions, recommended actions, approval tasks, and system updates."
>
```

Interactive diagrams must also expose content as semantic lists.

## Forms

- explicit labels
- linked error messages
- loading and success states
- keyboard-accessible controls

---

# 17. Performance

- code-split heavy lower sections
- lazy-load Platform Dashboard, ContractX, InvoiceX, and Agentic Overview
- avoid loading GSAP on pages that do not need it
- use SVG for lines and connectors
- compress atmospheric imagery
- avoid continuous canvas effects on mobile
- defer particles until idle

```css
.sectionBelowFold {
  content-visibility: auto;
  contain-intrinsic-size: 900px;
}
```

---

# 18. Build Priority

## Phase 1

- layout system
- header
- typography
- buttons
- cards
- section wrappers
- theme inheritance

## Phase 2

- Operational Gap
- Deployment
- Footer
- Platform feature grid

## Phase 3

- Industry Stats Carousel
- Integration Carousel
- ContractX workflow
- InvoiceX exception viewer

## Phase 4

- Hero data streams
- Dashboard reveal
- Agentic control tower
- Footer wave

Complete responsive structure and functionality before atmospheric animation.

---

# 19. Final Development Rules

- The approved layouts are the source of truth for hierarchy and information density.
- Do not implement sections as single background images.
- ContractX and InvoiceX must remain editable, semantic, and data-driven.
- Use semantic tokens rather than hardcoded values.
- Remove unverified logos, metrics, integrations, certifications, and security claims.
- Keep each section focused on one primary idea.
- Distinguish brand storytelling from product-interface proof.
- Dark and light sections must feel like one system, not separate websites.
