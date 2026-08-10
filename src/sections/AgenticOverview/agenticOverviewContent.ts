import type { Share2, Zap, BarChart3, Wrench } from "lucide-react";

export type AgenticIcon = typeof Share2 | typeof Zap | typeof BarChart3 | typeof Wrench;
export type AgenticIconName = "Share2" | "Zap" | "BarChart3" | "Wrench";

export interface AgentCard {
  label: string;
  icon: AgenticIconName;
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}

export const agentCards: AgentCard[] = [
  { label: "Cross-System Communication", icon: "Share2", position: "top-left" },
  { label: "Task Execution", icon: "Zap", position: "top-right" },
  { label: "Analysis & Decisioning", icon: "BarChart3", position: "bottom-left" },
  { label: "Custom Agent Builder", icon: "Wrench", position: "bottom-right" },
];
