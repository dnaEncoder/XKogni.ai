import type { Users, ShoppingCart, Database, Layers, FolderOpen, Contact, Cloud } from "lucide-react";

export type IntegrationIcon =
  | typeof Users
  | typeof ShoppingCart
  | typeof Database
  | typeof Layers
  | typeof FolderOpen
  | typeof Contact
  | typeof Cloud;

export type IntegrationIconName =
  | "Users"
  | "ShoppingCart"
  | "Database"
  | "Layers"
  | "FolderOpen"
  | "Contact"
  | "Cloud";

export interface IntegrationCard {
  name: string;
  category: string;
  icon: IntegrationIconName;
  description: string;
  logoSlug: string;
}

// Spec MD §9 confirms only name + category per reference integration ("Only use
// confirmed integrations"). Per-card descriptions and the "Learn more" CTA are
// original UI copy invented to fill the card layout the spec describes, not
// sourced claims about integration depth or scope.
//
// logoSlug maps to /public/integrations/{logoSlug}.svg — drop the official
// brand mark there with that filename and it replaces the icon fallback
// automatically, no code change needed. See public/integrations/README.md.
export const integrationCards: IntegrationCard[] = [
  {
    name: "SAP S/4HANA",
    category: "ERP & Finance",
    icon: "Layers",
    description: "Route exceptions and system-ready records into existing SAP finance and operations workflows.",
    logoSlug: "sap-logo-png.png",
  },
  {
    name: "Oracle Fusion",
    category: "ERP",
    icon: "Database",
    description: "Keep operational records aligned as validated data flows back into your system of record.",
    logoSlug: "oracle-fusion-logo.jpg",
  },
  {
    name: "Oracle EBS",
    category: "ERP",
    icon: "Database",
    description: "Sync E-Business Suite ledgers, purchase orders, and invoices with document intelligence.",
    logoSlug: "oracle-ebs-logo.png",
  },
  {
    name: "NetSuite",
    category: "ERP & Finance",
    icon: "ShoppingCart",
    description: "Automate bill creation, vendor matching, and expense categorization inside NetSuite.",
    logoSlug: "NetSuite-Logo.png",
  },
  {
    name: "Zoho Books",
    category: "Cloud Accounting",
    icon: "Cloud",
    description: "Instantly ingest invoices and categorize business expenses directly into Zoho Books.",
    logoSlug: "ZohoBooks logo.png",
  },
  {
    name: "Microsoft Dynamics 365",
    category: "CRM & Operations",
    icon: "Contact",
    description: "Connect commercial and operational context to Dynamics customer and vendor records.",
    logoSlug: "Microsoft_Dynamics_365_Logo.png",
  },
  {
    name: "Tally",
    category: "Accounting Software",
    icon: "FolderOpen",
    description: "Automate ledger entries and reconcile statements seamlessly with Tally ERP.",
    logoSlug: "tally_logo.png",
  },
];
