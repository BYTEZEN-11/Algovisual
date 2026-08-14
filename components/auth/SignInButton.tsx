"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function SignInButton() {
  const pathname = usePathname();
  const returnTo = pathname && pathname !== "/" ? `?return=${encodeURIComponent(pathname)}` : "";
  return (
    <Link href={`/login${returnTo}`}>
      <Button type="button" size="sm" variant="outline">
        Sign in
      </Button>
    </Link>
  );
}