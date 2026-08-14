"use client";

import * as React from "react";
import { useSession } from "next-auth/react";

interface Props {
  track: string;
  patternSlug: string;
  topicSlug: string;
}

export function TrackView({ track, patternSlug, topicSlug }: Props) {
  const { status } = useSession();
  React.useEffect(() => {
    if (status !== "authenticated") return;
    const body = JSON.stringify({ track, patternSlug, topicSlug });
    void fetch("/api/track-view", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => {});
  }, [status, track, patternSlug, topicSlug]);
  return null;
}