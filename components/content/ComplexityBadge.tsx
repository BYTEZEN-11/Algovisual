import { cn } from "@/lib/utils";

export function ComplexityBadge({
  time,
  space,
  className,
}: {
  time: string;
  space: string;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-2 text-xs font-mono", className)}>
      <span className="text-muted">T</span>
      <span className="px-2 py-0.5 rounded-sm bg-accent/15 text-accent border border-accent/30">
        {time}
      </span>
      <span className="text-muted">S</span>
      <span className="px-2 py-0.5 rounded-sm bg-accent-2/15 text-accent-2 border border-accent-2/30">
        {space}
      </span>
    </div>
  );
}