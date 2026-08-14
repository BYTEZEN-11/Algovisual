import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { contentStats } from "@/lib/content/stats";

export async function GET() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const rows = await prisma.progress.findMany({
    where: { userId },
    orderBy: { lastSeen: "desc" },
  });

  const solvedByTrack: Record<string, number> = {
    dsa: 0,
    lld: 0,
    networking: 0,
    os: 0,
  };
  let totalSolved = 0;
  const recent: { topicId: string; track: string; solved: boolean; lastSeen: string }[] = [];

  for (const r of rows) {
    if (r.solved) {
      totalSolved++;
      solvedByTrack[r.track] = (solvedByTrack[r.track] ?? 0) + 1;
    }
    recent.push({
      topicId: r.topicId,
      track: r.track,
      solved: r.solved,
      lastSeen: r.lastSeen.toISOString(),
    });
  }

  const days = new Set<string>();
  for (const r of rows) {
    days.add(r.lastSeen.toISOString().slice(0, 10));
  }
  let streakDays = 0;
  const today = new Date();
  for (let i = 0; i < 365; i++) {
    const d = new Date(today.getTime() - i * 86_400_000).toISOString().slice(0, 10);
    if (days.has(d)) streakDays++;
    else if (i > 0) break;
  }

  return NextResponse.json({
    solvedByTrack,
    totalSolved,
    streakDays,
    totals: {
      dsaTopics: contentStats.dsa.topics,
      lldLessons: contentStats.lld.lessons,
      osChapters: contentStats.os.chapters,
      networkingChapters: contentStats.networking.chapters,
    },
    recent: recent.slice(0, 8),
  });
}