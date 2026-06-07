export interface NavigationItem {
  href: string;
  label: string;
}

export const publicNavItems: NavigationItem[] = [
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/projects", label: "Projects" },
  { href: "/estimator", label: "Estimator" },
  { href: "/contact", label: "Contact" },
];

export const footerUtilityLinks: NavigationItem[] = [{ href: "/admin/login", label: "Admin Login" }];

