import type { KeyRound, Sliders, ShieldCheck } from "lucide-react";

export type DeploymentIcon = typeof KeyRound | typeof Sliders | typeof ShieldCheck;
export type DeploymentIconName = "KeyRound" | "Sliders" | "ShieldCheck";

export interface DeploymentCard {
  title: string;
  description: string;
  icon: DeploymentIconName;
}

export const deploymentCards: DeploymentCard[] = [
  {
    title: "SSO Support",
    description: "Secure access with enterprise SSO integration across your organization.",
    icon: "KeyRound",
  },
  {
    title: "Flexible Deployment",
    description: "Configure XKogni.ai around your systems, workflows, and operating environment.",
    icon: "Sliders",
  },
  {
    title: "Enterprise Security & Governance",
    description: "Built with secure access controls, auditability, and enterprise-ready compliance foundations.",
    icon: "ShieldCheck",
  },
];
