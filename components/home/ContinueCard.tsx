"use client";

import * as React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ArrowRight, History } from "lucide-react";

interface RecentResponse {
  lastViewed?: {
    track: string;
    patternSlug: string;
    topicSlug: string;
    topicTitle: string;
    patternTitle: string;
    lastViewedAt: string;
    href: string;
  } | null;
}

export function ContinueCard() {
  const { data, status } = useSession();
  const [recent, setRecent] = React.useState<RecentResponse["lastViewed"]>(null);
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    if (status !== "authenticated" || !data?.user) {
      setLoaded(true);
      return;
    }
    fetch("/api/recent")
      .then((r) => r.json())
      .then((d: RecentResponse) => {
        setRecent(d.lastViewed ?? null);
      })
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, [status, data?.user]);

  if (!loaded || !recent) return null;

  return (
    <Card className="bg-elev border-line" glow>
      <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-accent font-medium mb-2">
        <History className="w-3.5 h-3.5" /> Continue learning
      </div>
      <h3 className="text-xl font-semibold text-ink leading-tight">
        {recent.topicTitle}
      </h3>
      <p className="text-sm text-muted mt-1">
        {recent.patternTitle} · {recent.track.toUpperCase()}
      </p>
      <div className="mt-4">
        <Link href={recent.href}>
          <Button variant="primary">
            Resume
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </Card>
  );
}
