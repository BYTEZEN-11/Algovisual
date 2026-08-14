"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import { CheckCircle, Circle } from "lucide-react";
import { useSession } from "next-auth/react";

type Track = "dsa" | "lld" | "os" | "networking";

export function SolvedToggle({
  topicId,
  track,
  initialSolved,
  onChange,
}: {
  topicId: string;
  track: Track;
  initialSolved?: boolean;
  onChange?: (solved: boolean) => void;
}) {
  const { data } = useSession();
  const [solved, setSolved] = React.useState(!!initialSolved);
  const [pending, setPending] = React.useState(false);
  const router = useRouter();
  const pathname = usePathname();

  async function toggle() {
    if (!data?.user) {
      const ret = encodeURIComponent(pathname || "/");
      router.push(`/login?return=${ret}`);
      return;
    }
    const next = !solved;
    setSolved(next);
    setPending(true);
    try {
      const res = await fetch("/api/progress", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ topicId, track, solved: next }),
      });
      if (!res.ok) throw new Error("save failed");
      onChange?.(next);
    } catch {
      setSolved(!next);
    } finally {
      setPending(false);
    }
  }

  return (
    <button
      onClick={toggle}
      disabled={pending}
      className={
        "inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition border " +
        (solved
          ? "bg-accent/15 text-accent border-accent/40"
          : "bg-elev2 text-muted border-line hover:border-accent/40 hover:text-accent")
      }
    >
      {solved ? (
        <CheckCircle className="w-4 h-4" />
      ) : (
        <Circle className="w-4 h-4" />
      )}
      {solved ? "Solved" : "Mark solved"}
    </button>
  );
}