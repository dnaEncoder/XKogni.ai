// @ts-nocheck
import { createContext, useContext, useMemo, useState } from "react";

const STORAGE_KEY = "fbkit_reviewer_name";
const FeedbackKitContext = createContext(null);

export function FeedbackKitProvider({ children }) {
  const [reviewerName, setReviewerNameState] = useState(() => localStorage.getItem(STORAGE_KEY) || "");

  const setReviewerName = (name) => {
    const trimmed = name.trim();
    setReviewerNameState(trimmed);
    if (trimmed) localStorage.setItem(STORAGE_KEY, trimmed);
    else localStorage.removeItem(STORAGE_KEY);
  };

  const value = useMemo(() => ({ reviewerName, setReviewerName }), [reviewerName]);

  return <FeedbackKitContext.Provider value={value}>{children}</FeedbackKitContext.Provider>;
}

export function useFeedbackKit() {
  const ctx = useContext(FeedbackKitContext);
  if (!ctx) throw new Error("useFeedbackKit must be used within FeedbackKitProvider");
  return ctx;
}
