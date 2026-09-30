import type {
  Server,
  UserCheck,
  Lock,
  ShieldCheck,
  Cpu,
  SearchCheck,
  RefreshCw,
  BadgeCheck,
} from "lucide-react";

export type SecurityGovernanceIcon =
  | typeof Server
  | typeof UserCheck
  | typeof Lock
  | typeof ShieldCheck
  | typeof Cpu
  | typeof SearchCheck
  | typeof RefreshCw
  | typeof BadgeCheck;

export type SecurityGovernanceIconName =
  | "Server"
  | "UserCheck"
  | "Lock"
  | "ShieldCheck"
  | "Cpu"
  | "SearchCheck"
  | "RefreshCw"
  | "BadgeCheck";

export interface SecurityGovernanceCard {
  title: string;
  description: string;
  icon: SecurityGovernanceIconName;
}

export const securityGovernanceCards: SecurityGovernanceCard[] = [
  {
    title: "Data Residency & Protection",
    description: "US-hosted on AWS, encrypted in transit and at rest.",
    icon: "Server",
  },
  {
    title: "Responsible, Auditable AI",
    description:
      "Human-approved guardrails, every agent action logged, your data never used for training.",
    icon: "UserCheck",
  },
  {
    title: "Access Controls",
    description: "SSO, MFA and role-based permissions.",
    icon: "Lock",
  },
  {
    title: "Application Security",
    description:
      "Secure development practices, automated code and dependency scanning, and protection against OWASP Top 10 vulnerabilities.",
    icon: "ShieldCheck",
  },
  {
    title: "AI Threat Protection",
    description: "Safeguards against prompt injection and malicious invoice content.",
    icon: "Cpu",
  },
  {
    title: "Fraud Prevention",
    description:
      "Automatic detection of duplicate invoices and suspicious bank detail changes.",
    icon: "SearchCheck",
  },
  {
    title: "Resilience & Recovery",
    description:
      "Automated backups, disaster recovery and a defined incident response plan.",
    icon: "RefreshCw",
  },
  {
    title: "Compliance",
    description: "SOC 2 Type II audit in progress.",
    icon: "BadgeCheck",
  },
];
