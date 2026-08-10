import { SiteHeader } from "./components/SiteHeader/SiteHeader";
import { HeroSection } from "./sections/Hero/HeroSection";
import { OperationalGapSection } from "./sections/OperationalGap/OperationalGapSection";
import { ProblemFiguresSection } from "./sections/ProblemFigures/ProblemFiguresSection";
import { PlatformOverviewSection } from "./sections/PlatformOverview/PlatformOverviewSection";
import { ContractXSection } from "./sections/ContractX/ContractXSection";
import { EnterpriseIntegrationsSection } from "./sections/EnterpriseIntegrations/EnterpriseIntegrationsSection";
import { AgenticOverviewSection } from "./sections/AgenticOverview/AgenticOverviewSection";
import { DeploymentSecuritySection } from "./sections/DeploymentSecurity/DeploymentSecuritySection";
import { FooterSection } from "./sections/Footer/FooterSection";

function App() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <OperationalGapSection />
        <ProblemFiguresSection />
        <PlatformOverviewSection />
        <ContractXSection />
        <EnterpriseIntegrationsSection />
        <AgenticOverviewSection />
        <DeploymentSecuritySection />
      </main>
      <FooterSection />
    </>
  );
}

export default App;
