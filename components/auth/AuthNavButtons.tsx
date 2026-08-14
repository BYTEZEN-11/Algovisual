"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";

export function AuthNavButtons() {
  const pathname = usePathname();
  const returnTo = pathname && pathname !== "/" ? `?return=${encodeURIComponent(pathname)}` : "";

  return (
    <div className="flex items-center gap-2">
      <Link href={`/login${returnTo}`}>
        <Button type="button" size="sm" variant="ghost">
          Sign in
        </Button>
      </Link>
      <Link href={`/signup${returnTo}`}>
        <Button type="button" size="sm" variant="primary">
          Sign up
        </Button>
      </Link>
    </div>
  );
}