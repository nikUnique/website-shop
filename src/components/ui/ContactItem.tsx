import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ContactItemProps {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
  className?: string;
}

export default function ContactItem({
  icon: Icon,
  label,
  value,
  href,
  className,
}: ContactItemProps) {
  const content = (
    <div className={cn("flex items-center gap-3", className)}>
      <Icon className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
      <div>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">{label}</p>
        <p className="text-zinc-900 dark:text-zinc-50">{value}</p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
      >
        {content}
      </a>
    );
  }

  return content;
}