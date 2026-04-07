import { cn } from "@/lib/utils";

interface StepItemProps {
  step: string | number;
  title: string;
  description: string;
  className?: string;
}

export default function StepItem({
  step,
  title,
  description,
  className,
}: StepItemProps) {
  return (
    <div className={cn("flex items-start gap-4", className)}>
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold">
        {step}
      </div>
      <div>
        <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">
          {title}
        </h3>
        <p className="text-zinc-600 dark:text-zinc-400">{description}</p>
      </div>
    </div>
  );
}