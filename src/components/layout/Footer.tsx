import Link from "next/link";
import { footerUtilityLinks, publicNavItems } from "@/config/navigation";
import { WALLORA_WHATSAPP_NUMBER, createWhatsAppUrl } from "@/lib/whatsapp";

const services = ["Interior Painting", "Exterior Painting", "Texture Painting", "Wallpaper", "Waterproofing", "Wood Polish", "False Ceiling"];

export function Footer() {
  return (
    <footer className="border-t border-brand-border bg-[#ebe4d8]">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-10 text-sm text-brand-muted sm:px-6 lg:grid-cols-[1.15fr_0.85fr_0.75fr_0.85fr_0.75fr] lg:px-8">
        <div className="space-y-4">
          <Link href="/" className="text-2xl font-semibold tracking-tight text-brand-text">
            Wallora
          </Link>
          <p className="max-w-sm leading-7">
            Premium painting and interior finishing support for homes, offices, shops, and villas across Lucknow and
            nearby locations.
          </p>
          <p className="rounded-2xl border border-brand-border bg-white/60 px-4 py-3 font-medium text-brand-text">
            Free site visit available for planned painting and finishing work.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-brand-text">Services</h2>
          <ul className="mt-4 space-y-2">
            {services.map((service) => (
              <li key={service}>{service}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-brand-text">Quick Links</h2>
          <ul className="mt-4 space-y-2">
            {publicNavItems.map((link) => (
              <li key={link.href}>
                <Link className="transition hover:text-brand-text" href={link.href}>
                  {link.href === "/contact" ? "Book Site Visit" : link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-brand-text">Contact</h2>
          <div className="mt-4 space-y-2">
            <p>Service Area: Lucknow and nearby locations</p>
            <p>
              Phone/WhatsApp:{" "}
              <a className="font-medium text-brand-text hover:text-brand-accent" href={createWhatsAppUrl()} rel="noreferrer" target="_blank">
                {WALLORA_WHATSAPP_NUMBER}
              </a>
            </p>
            <p>
              Email:{" "}
              <a className="font-medium text-brand-text hover:text-brand-accent" href="mailto:hello@wallora.in">
                hello@wallora.in
              </a>
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-brand-text">Business Access</h2>
          <ul className="mt-4 space-y-2">
            {footerUtilityLinks.map((link) => (
              <li key={link.href}>
                <Link className="font-medium text-brand-text transition hover:text-brand-accent" href={link.href}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t border-brand-border pt-5 text-xs text-brand-muted lg:col-span-5">
          (c) {new Date().getFullYear()} Wallora. Demo-safe business contact details for client presentation.
        </div>
      </div>
    </footer>
  );
}
