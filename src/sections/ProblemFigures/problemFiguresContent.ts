import type { FileEdit, Clock, Network, DollarSign, EyeOff } from "lucide-react";

export type StatIcon = typeof FileEdit | typeof Clock | typeof Network | typeof DollarSign | typeof EyeOff;

export interface StatCard {
  category: string;
  stat: string;
  explanation: string;
  iconName: "FileEdit" | "Clock" | "Network" | "DollarSign" | "EyeOff";
}

export const statCards: StatCard[] = [
  {
    category: "Manual Handling",
    stat: "70%+",
    explanation:
      "of financial documents require some form of manual review, correction, or routing.",
    iconName: "FileEdit",
  },
  {
    category: "Exception Resolution",
    stat: "12–18 hrs",
    explanation: "is the average time spent investigating a single invoice or PO discrepancy.",
    iconName: "Clock",
  },
  {
    category: "Disconnected Systems",
    stat: "6–10",
    explanation: "systems, files, and channels are typically involved in resolving one exception.",
    iconName: "Network",
  },
  {
    category: "Commercial Exposure",
    stat: "3–5%",
    explanation:
      "of spend is impacted annually by duplicate payments, missed obligations, or incorrect terms.",
    iconName: "DollarSign",
  },
  {
    category: "Operational Visibility",
    stat: "60%",
    explanation: "of teams lack a consolidated view of document status, exceptions, and ownership.",
    iconName: "EyeOff",
  },
];
