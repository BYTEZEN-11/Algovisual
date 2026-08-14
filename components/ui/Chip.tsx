import * as React from "react";
import { cn } from "@/lib/utils";

export function Chip({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-sm bg-elev2 border border-line text-muted hover:text-ink hover:border-accent/30 transition",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}