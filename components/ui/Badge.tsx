import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "live" | "bonus" | "new" | "easy" | "medium" | "hard" | "neutral";

const styles: Record<Variant, string> = {
  live: "bg-accent/15 text-accent border-accent/30",
  bonus: "bg-accent-2/15 text-accent-2 border-accent-2/30",
  new: "bg-warn/15 text-warn border-warn/30",
  easy: "bg-accent/10 text-accent border-accent/20",
  medium: "bg-warn/10 text-warn border-warn/20",
  hard: "bg-danger/10 text-danger border-danger/20",
  neutral: "bg-elev2 text-muted border-line",
};

export function Badge({
  className,
  variant = "neutral",
  children,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { variant?: Variant }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-sm border uppercase tracking-wide",
        styles[variant],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}