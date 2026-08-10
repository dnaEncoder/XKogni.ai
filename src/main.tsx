import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/tokens.css";
import "./styles/global.css";
import "./feedback/feedback-kit.css";
import App from "./App.tsx";
import { FeedbackKitProvider } from "./feedback/FeedbackKitProvider.tsx";
import { FeedbackWidget } from "./feedback/FeedbackWidget.tsx";

const isDev = import.meta.env.DEV;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {isDev ? (
      <FeedbackKitProvider>
        <App />
        <FeedbackWidget />
      </FeedbackKitProvider>
    ) : (
      <App />
    )}
  </StrictMode>,
);
