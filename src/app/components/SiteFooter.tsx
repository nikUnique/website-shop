import { MapPin, Clock, Phone, Mail } from "lucide-react";
import Link from "next/link";
import { SHOP_CONFIG } from "@/lib/config";

const footerLinks = [
  { href: "/", label: "Catalog" },
  { href: "/about", label: "About" },
  { href: "/delivery", label: "Delivery" },
  { href: "/contacts", label: "Contacts" },
];

export default function SiteFooter() {
  return (
    <footer className="bg-zinc-900 dark:bg-zinc-950 text-zinc-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Shop info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              {SHOP_CONFIG.name}
            </h3>
            <p className="text-sm leading-relaxed">{SHOP_CONFIG.description}</p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Navigation</h3>
            <nav className="flex flex-col gap-2">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Address */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Address</h3>
            <address className="not-italic">
              <p className="flex items-start gap-2 mb-2">
                <MapPin className="w-4 h-4 mt-0.5 text-emerald-400 flex-shrink-0" />
                <span>{SHOP_CONFIG.address}</span>
              </p>
            </address>
          </div>

          {/* Contact & Hours */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contacts</h3>
            <div className="flex flex-col gap-3">
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <a
                  href={`tel:${SHOP_CONFIG.phone}`}
                  className="text-sm hover:text-white transition-colors"
                >
                  {SHOP_CONFIG.phone}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <a
                  href={`mailto:${SHOP_CONFIG.email}`}
                  className="text-sm hover:text-white transition-colors"
                >
                  {SHOP_CONFIG.email}
                </a>
              </p>
              <p className="flex items-start gap-2">
                <Clock className="w-4 h-4 mt-0.5 text-emerald-400 flex-shrink-0" />
                <span className="text-sm">{SHOP_CONFIG.hours.label}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-zinc-800 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} {SHOP_CONFIG.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
