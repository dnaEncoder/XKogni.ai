import type {
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
} from "lucide-react";

export type PlatformIcon =
  | typeof LayoutDashboard
  | typeof ListChecks
  | typeof AlertTriangle
  | typeof FileText
  | typeof Receipt
  | typeof Bot
  | typeof BarChart3
  | typeof Plug
  | typeof Settings
  | typeof LayoutGrid
  | typeof Link2
  | typeof UserCheck
  | typeof ShieldCheck
  | typeof TrendingUp
  | typeof Puzzle;

export type PlatformIconName =
  | "LayoutDashboard"
  | "ListChecks"
  | "AlertTriangle"
  | "FileText"
  | "Receipt"
  | "Bot"
  | "BarChart3"
  | "Plug"
  | "Settings"
  | "LayoutGrid"
  | "Link2"
  | "UserCheck"
  | "ShieldCheck"
  | "TrendingUp"
  | "Puzzle"
  | "Building2"
  | "Calendar"
  | "Bell";

export const sidebarItems: { label: string; icon: PlatformIconName }[] = [
  { label: "Overview", icon: "LayoutDashboard" },
  { label: "Work Queue", icon: "ListChecks" },
  { label: "Exceptions", icon: "AlertTriangle" },
  { label: "Contracts", icon: "FileText" },
  { label: "Invoices", icon: "Receipt" },
  { label: "Agents", icon: "Bot" },
  { label: "Reports", icon: "BarChart3" },
  { label: "Integrations", icon: "Plug" },
  { label: "Settings", icon: "Settings" },
];

export const topControls: { label: string; icon: PlatformIconName }[] = [
  { label: "All entities", icon: "Building2" },
  { label: "Last 30 days", icon: "Calendar" },
  { label: "Notifications", icon: "Bell" },
];

export const kpiCards: { label: string; value: string }[] = [
  { label: "Invoices Processed", value: "1,248" },
  { label: "PO / Invoice Matches", value: "912" },
  { label: "Exceptions Awaiting Review", value: "37" },
  { label: "Straight-Through Rate", value: "82%" },
  { label: "Financial Exposure Reviewed", value: "$6.4M" },
];

export const workQueueItems = [
  "Exceptions",
  "PO Mismatches",
  "Price Variances",
  "Missing Information",
  "Duplicate Detection",
];

export const upcomingObligations = [
  "Contract Renewals",
  "Payment Milestones",
  "Notice Periods",
  "SLA Commitments",
];

export const topExceptionReasons: { label: string; share: number }[] = [
  { label: "PO Mismatch", share: 34 },
  { label: "Price Variance", share: 26 },
  { label: "Missing Information", share: 20 },
  { label: "Tax / VAT", share: 12 },
  { label: "Other", share: 8 },
];

export const integrationActivity = [
  "SAP S/4HANA",
  "Oracle",
  "Coupa",
  "Workday",
  "Microsoft Dynamics 365",
  "SharePoint",
];

export interface PlatformHighlight {
  heading: string;
  body: string;
  icon: PlatformIconName;
}

export const platformHighlights: PlatformHighlight[] = [
  {
    heading: "Unified operational view",
    body: "Track documents, exceptions, obligations, and decisions in real time across entities and business units.",
    icon: "LayoutGrid",
  },
  {
    heading: "Context that connects",
    body: "View the full story behind every item—documents, contracts, history, and related transactions.",
    icon: "Link2",
  },
  {
    heading: "Human decisions at the center",
    body: "AI prepares the work. People review, decide, and approve within configurable guardrails and workflows.",
    icon: "UserCheck",
  },
  {
    heading: "Governed and auditable",
    body: "Every action, decision, and system update is captured for auditability, compliance, and continuous improvement.",
    icon: "ShieldCheck",
  },
  {
    heading: "Performance that improves",
    body: "Monitor cycle time, exception trends, automation rates, and team performance with out-of-the-box insights.",
    icon: "TrendingUp",
  },
  {
    heading: "Built to fit your enterprise",
    body: "Flexible configuration, role-based access, and deep integrations ensure the platform fits your operating model.",
    icon: "Puzzle",
  },
];
