"use client";

import { useEffect } from "react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="py-24 text-center">
      <div className="text-xs uppercase tracking-widest text-danger font-medium mb-2">
        Error
      </div>
      <h1 className="text-3xl font-semibold text-ink">Something glitched</h1>
      <p className="mt-3 text-muted max-w-md mx-auto">
        An unexpected error occurred. We’ve logged it — try again.
      </p>
      <div className="mt-6">
        <Button onClick={reset}>Retry</Button>
      </div>
    </Container>
  );
}