export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  heading: string;
  links: FooterLink[];
}

export const footerColumns: FooterColumn[] = [
  {
    heading: "Platform",
    links: [
      { label: "Operational Intelligence", href: "#contractx" },
      { label: "Intelligence Engine", href: "#platform" },
      { label: "Agentic Overview", href: "#agentic" },
      { label: "Integrations", href: "#integrations" },
      { label: "Security", href: "#security" },
    ],
  },
  {
    heading: "Solutions",
    links: [
      { label: "Procure to Pay", href: "#solutions" },
      { label: "Order to Cash", href: "#solutions" },
      { label: "Record to Report", href: "#solutions" },
      { label: "Compliance & Audit", href: "#solutions" },
      { label: "Legal Operations", href: "#solutions" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Resource Library", href: "#resources" },
      { label: "Case Studies", href: "#resources" },
      { label: "Blog", href: "#resources" },
      { label: "Events", href: "#resources" },
      { label: "Documentation", href: "#resources" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "#company" },
      { label: "Careers", href: "#company" },
      { label: "Partners", href: "#company" },
      { label: "Newsroom", href: "#company" },
      { label: "Contact Us", href: "#company" },
    ],
  },
];

export interface SocialLink {
  label: string;
  href: string;
  initials: string;
}

// lucide-react does not ship brand/logo icons (LinkedIn, X/Twitter, YouTube marks
// are excluded from the package for trademark reasons), so social links render as
// short text initials in a circular badge instead of a mis-substituted generic icon.
export const socialLinks: SocialLink[] = [
  { label: "LinkedIn", href: "#", initials: "in" },
  { label: "X", href: "#", initials: "X" },
  { label: "YouTube", href: "#", initials: "YT" },
];

export const legalLinks: FooterLink[] = [
  { label: "Privacy Policy", href: "#privacy" },
  { label: "Terms of Service", href: "#terms" },
  { label: "Trust Center", href: "#trust" },
  { label: "Status", href: "#status" },
];
