import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "accent" | "warning" | "info";
}

const variantStyles: Record<NonNullable<CardProps["variant"]>, string> = {
  default: "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800",
  accent:
    "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800",
  warning:
    "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800",
  info: "bg-sky-50 dark:bg-sky-900/20 border-sky-200 dark:border-sky-800",
};

export default function Card({
  children,
  className,
  variant = "default",
}: CardProps) {
  return (
    <div className={cn("rounded-2xl border p-8", variantStyles[variant], className)}>
      {children}
    </div>
  );
}