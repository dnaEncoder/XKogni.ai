import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { SiteHeader } from "./components/SiteHeader/SiteHeader";
import { HeroSection } from "./sections/Hero/HeroSection";
import { OperationalGapSection } from "./sections/OperationalGap/OperationalGapSection";
import { ProblemFiguresSection } from "./sections/ProblemFigures/ProblemFiguresSection";
import { PlatformOverviewSection } from "./sections/PlatformOverview/PlatformOverviewSection";
import { ContractXSection } from "./sections/ContractX/ContractXSection";
import { EnterpriseIntegrationsSection } from "./sections/EnterpriseIntegrations/EnterpriseIntegrationsSection";
import { AgenticOverviewSection } from "./sections/AgenticOverview/AgenticOverviewSection";
import { SecurityGovernanceSection } from "./sections/SecurityGovernance/SecurityGovernanceSection";
import { DeploymentSecuritySection } from "./sections/DeploymentSecurity/DeploymentSecuritySection";
import { FooterSection } from "./sections/Footer/FooterSection";
import FeedbackLoginPage from "./feedback/production/FeedbackLoginPage.tsx";
import FeedbackVerifyPage from "./feedback/production/FeedbackVerifyPage.tsx";
import { ContactModal } from "./components/ContactModal/ContactModal";

function HomePage() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const handleOpenContact = () => setIsContactOpen(true);

  return (
    <>
      <SiteHeader onContactClick={handleOpenContact} />
      <main>
        <HeroSection onContactClick={handleOpenContact} />
        <OperationalGapSection />
        <ProblemFiguresSection />
        <PlatformOverviewSection onContactClick={handleOpenContact} />
        <ContractXSection onContactClick={handleOpenContact} />
        <EnterpriseIntegrationsSection />
        <AgenticOverviewSection />
        <SecurityGovernanceSection />
        <DeploymentSecuritySection />
      </main>
      <FooterSection onContactClick={handleOpenContact} />
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/feedback" element={<FeedbackLoginPage />} />
      <Route path="/feedback/verify" element={<FeedbackVerifyPage />} />
    </Routes>
  );
}

export default App;
