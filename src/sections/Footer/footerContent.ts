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
