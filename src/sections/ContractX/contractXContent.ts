import type {
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

export type ContractXIcon =
  | typeof FileSearch
  | typeof ListTree
  | typeof Calendar
  | typeof ShieldCheck
  | typeof AlertTriangle
  | typeof FileCheck2
  | typeof Inbox
  | typeof ScanText
  | typeof ListChecks
  | typeof Activity
  | typeof UserCheck
  | typeof Receipt
  | typeof ClipboardList
  | typeof FileText
  | typeof FileDiff
  | typeof History
  | typeof ShieldQuestion
  | typeof Gauge;

export type ContractXIconName =
  | "FileSearch"
  | "ListTree"
  | "Calendar"
  | "ShieldCheck"
  | "AlertTriangle"
  | "FileCheck2"
  | "Inbox"
  | "ScanText"
  | "ListChecks"
  | "Activity"
  | "UserCheck"
  | "Receipt"
  | "ClipboardList"
  | "FileText"
  | "FileDiff"
  | "History"
  | "ShieldQuestion"
  | "Gauge";

export interface ContractXFeature {
  heading: string;
  body: string;
  icon: ContractXIconName;
}

export const contractXFeatures: ContractXFeature[] = [
  {
    heading: "Extract commercial terms",
    body: "Capture pricing, payment conditions, dates, commitments, and key clauses.",
    icon: "FileSearch",
  },
  {
    heading: "Match invoices to POs & contracts",
    body: "Validate incoming invoices against purchase orders and the commercial terms that govern them.",
    icon: "ShieldCheck",
  },
  {
    heading: "Create an obligation map",
    body: "Organise responsibilities by owner, due date, and dependency.",
    icon: "ListTree",
  },
  {
    heading: "Surface deviations & exceptions",
    body: "Highlight inconsistencies, expired terms, unfulfilled obligations, and invoice exceptions.",
    icon: "AlertTriangle",
  },
  {
    heading: "Track dates, changes & renewals",
    body: "Monitor renewals, notice periods, milestones, and amendments.",
    icon: "Calendar",
  },
  {
    heading: "Review with evidence",
    body: "Connect each finding to the exact clause, source document, or amendment.",
    icon: "FileCheck2",
  },
  {
    heading: "Audit-ready by design",
    body: "Complete audit trail with versioning, reviewer activity, and approvals.",
    icon: "ShieldQuestion",
  },
  {
    heading: "Built to scale across entities",
    body: "Handle high contract and invoice volumes across entities, regions, and business units.",
    icon: "Gauge",
  },
];

export type WorkflowStatus = "Received" | "Completed" | "Monitoring" | "Flagged" | "Pending";

export interface WorkflowStep {
  label: string;
  icon: ContractXIconName;
  status: WorkflowStatus;
}

// The 6-step workflow is universal across all source-tab examples per spec MD §7 —
// only the finding panel content differs per example.
export const workflowSteps: WorkflowStep[] = [
  { label: "Document received", icon: "Inbox", status: "Received" },
  { label: "Terms interpreted", icon: "ScanText", status: "Completed" },
  { label: "Obligations structured", icon: "ListChecks", status: "Completed" },
  { label: "Operational activity monitored", icon: "Activity", status: "Monitoring" },
  { label: "Deviation identified", icon: "AlertTriangle", status: "Flagged" },
  { label: "Reviewer action initiated", icon: "UserCheck", status: "Pending" },
];

export const DEFAULT_ACTIVE_STEP = 4;

export interface EvidenceRow {
  name: string;
  badge: string;
  icon: ContractXIconName;
}

export interface WorkflowExample {
  id: "agreement" | "amendment" | "po";
  confidence: string;
  statement: string;
  evidence: EvidenceRow[];
  recommendedAction: string;
}

export const workflowExamples: Record<WorkflowExample["id"], WorkflowExample> = {
  agreement: {
    id: "agreement",
    confidence: "94% confidence",
    statement:
      "Invoice pricing differs from the rate defined in the active commercial agreement.",
    evidence: [
      { name: "Invoice line item", badge: "Invoice", icon: "Receipt" },
      { name: "Purchase-order value", badge: "PO", icon: "ClipboardList" },
      { name: "Contract pricing clause", badge: "Contract", icon: "FileText" },
      { name: "Relevant amendment", badge: "Amendment", icon: "FileDiff" },
      { name: "Historical transaction", badge: "History", icon: "History" },
    ],
    recommendedAction: "Route for commercial review before approval.",
  },
  amendment: {
    id: "amendment",
    confidence: "89% confidence",
    statement:
      "An upcoming renewal date conflicts with the notice period defined in the latest amendment.",
    evidence: [
      { name: "Amendment notice clause", badge: "Amendment", icon: "FileDiff" },
      { name: "Renewal milestone", badge: "Contract", icon: "FileText" },
      { name: "Prior renewal record", badge: "History", icon: "History" },
      { name: "Owner assignment", badge: "Obligation", icon: "ClipboardList" },
      { name: "Related correspondence", badge: "Record", icon: "Receipt" },
    ],
    recommendedAction: "Notify the contract owner before the notice window closes.",
  },
  po: {
    id: "po",
    confidence: "91% confidence",
    statement:
      "Purchase-order quantity exceeds the obligation limit agreed in the governing statement of work.",
    evidence: [
      { name: "Purchase-order value", badge: "PO", icon: "ClipboardList" },
      { name: "Statement of work clause", badge: "SOW", icon: "FileText" },
      { name: "Invoice line item", badge: "Invoice", icon: "Receipt" },
      { name: "Relevant amendment", badge: "Amendment", icon: "FileDiff" },
      { name: "Historical transaction", badge: "History", icon: "History" },
    ],
    recommendedAction: "Route for commercial review before approval.",
  },
};

export interface SourceTab {
  label: string;
  exampleId: WorkflowExample["id"];
}

// SOW and Renewal reuse the closest matching example (po / amendment) —
// spec MD §7 only defines 3 predefined examples for 5 source tabs.
export const sourceTabs: SourceTab[] = [
  { label: "Agreement", exampleId: "agreement" },
  { label: "Amendment", exampleId: "amendment" },
  { label: "SOW", exampleId: "po" },
  { label: "PO", exampleId: "po" },
  { label: "Renewal", exampleId: "amendment" },
];

// Adapted from InvoiceX's lower trust bar as part of the ContractX + InvoiceX merge.
export const closingStatement =
  "Built for teams that are accountable for every dollar and every clause.";
