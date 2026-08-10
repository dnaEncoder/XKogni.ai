export type HeroIconName =
  | "Receipt"
  | "FileText"
  | "ClipboardList"
  | "Mail"
  | "Folder"
  | "CheckCircle2"
  | "AlertTriangle"
  | "Lightbulb"
  | "UserCheck"
  | "RefreshCw"
  | "ShieldCheck"
  | "UsersRound"
  | "Network";

export interface HeroNode {
  label: string;
  icon: HeroIconName;
}

export const heroInputNodes: HeroNode[] = [
  { label: "Invoices", icon: "Receipt" },
  { label: "Contracts", icon: "FileText" },
  { label: "Purchase Orders", icon: "ClipboardList" },
  { label: "Emails & Attachments", icon: "Mail" },
  { label: "Supporting Records", icon: "Folder" },
];

export const heroOutputNodes: HeroNode[] = [
  { label: "Validated Data", icon: "CheckCircle2" },
  { label: "Identified Exceptions", icon: "AlertTriangle" },
  { label: "Recommended Actions", icon: "Lightbulb" },
  { label: "Approval Tasks", icon: "UserCheck" },
  { label: "System Updates", icon: "RefreshCw" },
];

export const heroTrustStatements: HeroNode[] = [
  { label: "Enterprise grade security", icon: "ShieldCheck" },
  { label: "Human in control by design", icon: "UsersRound" },
  { label: "Built for complex operations", icon: "Network" },
];
