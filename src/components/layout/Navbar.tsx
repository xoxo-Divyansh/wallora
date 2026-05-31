import Link from "next/link";

const navItems = [
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/projects", label: "Projects" },
  { href: "/estimator", label: "Estimator" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  return (
    <header className="border-b border-brand-border bg-brand-bg/95 backdrop-blur">
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-xl font-semibold tracking-tight">
          Wallora
        </Link>
        <ul className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="text-sm text-brand-muted hover:text-brand-text">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/admin/login" className="text-sm font-medium text-brand-text hover:text-brand-muted">
          Admin
        </Link>
      </nav>
    </header>
  );
}
