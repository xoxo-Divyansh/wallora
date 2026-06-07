"use client";

import { publicNavItems } from "@/config/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isMenuOpen]);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <header className="relative z-[70] border-b border-brand-border bg-brand-bg/95 backdrop-blur">
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-xl font-semibold tracking-tight">
          Wallora
        </Link>
        <ul className="hidden items-center gap-6 lg:flex">
          {publicNavItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-sm font-medium text-brand-muted transition hover:text-brand-text"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/contact"
          className="hidden rounded-full bg-brand-text px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-accent lg:inline-flex"
        >
          Book Free Site Visit
        </Link>

        {isMenuOpen ? (
          <button
            aria-expanded="true"
            aria-label="Open navigation menu"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-border bg-brand-card text-brand-text shadow-sm transition hover:border-brand-accent lg:hidden"
            onClick={() => setIsMenuOpen(false)}
            type="button"
          >
            <span className="sr-only">Close menu</span>
            <span className="flex w-5 flex-col gap-1.5">
              <span className="h-0.5 translate-y-2 rotate-45 rounded-full bg-current transition" />
              <span className="h-0.5 rounded-full bg-current opacity-0 transition" />
              <span className="h-0.5 -translate-y-2 -rotate-45 rounded-full bg-current transition" />
            </span>
          </button>
        ) : (
          <button
            aria-expanded="false"
            aria-label="Open navigation menu"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-border bg-brand-card text-brand-text shadow-sm transition hover:border-brand-accent lg:hidden"
            onClick={() => setIsMenuOpen(true)}
            type="button"
          >
            <span className="sr-only">Open menu</span>
            <span className="flex w-5 flex-col gap-1.5">
              <span className="h-0.5 rounded-full bg-current transition" />
              <span className="h-0.5 rounded-full bg-current transition" />
              <span className="h-0.5 rounded-full bg-current transition" />
            </span>
          </button>
        )}
      </nav>

      {isMenuOpen ? (
        <div className="fixed inset-0 z-[90] min-h-screen bg-[#11110f] px-6 py-6 text-white lg:hidden">
          <div className="mx-auto flex h-full max-w-xl flex-col">
            <div className="flex items-center justify-between">
              <Link
                href="/"
                className="text-2xl font-semibold tracking-tight"
                onClick={closeMenu}
              >
                Wallora
              </Link>
              <button
                aria-label="Close navigation menu"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition hover:bg-white/15"
                onClick={closeMenu}
                type="button"
              >
                <span className="relative h-5 w-5">
                  <span className="absolute left-0 top-1/2 h-0.5 w-5 -translate-y-1/2 rotate-45 rounded-full bg-current" />
                  <span className="absolute left-0 top-1/2 h-0.5 w-5 -translate-y-1/2 -rotate-45 rounded-full bg-current" />
                </span>
              </button>
            </div>

            <div className="flex flex-1 flex-col items-center justify-center gap-7 text-center">
              {publicNavItems.map((item) => (
                <Link
                  className="text-4xl font-semibold tracking-[-0.03em] text-white transition hover:text-[#e2c79d]"
                  href={item.href}
                  key={item.href}
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                className="mt-3 inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-text transition hover:bg-[#efe3d1]"
                href="/contact"
                onClick={closeMenu}
              >
                Book Free Site Visit
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
