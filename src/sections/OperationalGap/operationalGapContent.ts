import type { Lock, RotateCw, GitBranch } from "lucide-react";

export type ProblemCardIcon = typeof Lock | typeof RotateCw | typeof GitBranch;

export interface ProblemCard {
  heading: string;
  subheading: string;
  body: string;
  iconName: "Lock" | "RotateCw" | "GitBranch";
}

export const problemCards: ProblemCard[] = [
  {
    heading: "Information remains trapped.",
    subheading: "Documents arrive. Context does not.",
    body: "Values, dates, clauses, obligations, and supporting evidence remain buried across separate documents and applications.",
    iconName: "Lock",
  },
  {
    heading: "Reviews repeatedly restart.",
    subheading: "Every handoff rebuilds the same story.",
    body: "Reviewers spend time searching for information that another team may have already located, checked, or discussed.",
    iconName: "RotateCw",
  },
  {
    heading: "Exceptions become coordination problems.",
    subheading: "Identifying an issue is only the beginning.",
    body: "Teams must still determine the cause, gather evidence, assign ownership, request clarification, and track the issue through resolution.",
    iconName: "GitBranch",
  },
];
