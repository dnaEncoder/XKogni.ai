import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./styles/tokens.css";
import "./styles/global.css";
import "./feedback/feedback-kit.css";
import "./feedback/production/feedback-kit.css";
import App from "./App.tsx";
import { FeedbackKitProvider } from "./feedback/FeedbackKitProvider.tsx";
import { FeedbackWidget } from "./feedback/FeedbackWidget.tsx";
import { FeedbackSessionProvider } from "./feedback/production/FeedbackSessionContext.tsx";
import ProductionFeedbackWidget from "./feedback/production/FeedbackWidget.tsx";

const isDev = import.meta.env.DEV;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      {isDev ? (
        <FeedbackKitProvider>
          <App />
          <FeedbackWidget />
        </FeedbackKitProvider>
      ) : (
        <FeedbackSessionProvider>
          <App />
          <ProductionFeedbackWidget />
        </FeedbackSessionProvider>
      )}
    </BrowserRouter>
  </StrictMode>,
);
