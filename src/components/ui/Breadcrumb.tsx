import Link from "next/link";

export interface BreadcrumbLink {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  links: BreadcrumbLink[];
  current: string;
  className?: string;
}

export default function Breadcrumb({ links, current, className }: BreadcrumbProps) {
  return (
    <nav className={`flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 ${className ?? ""}`}>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="hover:text-emerald-600 transition-colors"
        >
          {link.label}
        </Link>
      ))}
      <span>/</span>
      <span className="text-zinc-900 dark:text-zinc-50">{current}</span>
    </nav>
  );
}