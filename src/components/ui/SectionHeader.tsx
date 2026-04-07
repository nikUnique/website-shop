import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export default function SectionHeader({
  title,
  subtitle,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("text-center mb-12", className)}>
      <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
        {title}
      </h1>
      {subtitle && (
        <p className="text-lg text-zinc-600 dark:text-zinc-400">{subtitle}</p>
      )}
    </div>
  );
}