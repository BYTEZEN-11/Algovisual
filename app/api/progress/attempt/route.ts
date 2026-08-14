import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { requireSameOrigin } from "@/lib/api/origin";

const Body = z.object({
  topicId: z.string().min(1),
  track: z.string().min(1).default("dsa"),
});

export async function POST(req: Request) {
  const forbidden = requireSameOrigin(req);
  if (forbidden) return forbidden;

  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json(
      { error: "bad_request", details: parsed.error.flatten() },
      { status: 400 },
    );
  }
  const { topicId, track } = parsed.data;

  const row = await prisma.progress.upsert({
    where: { userId_topicId: { userId, topicId } },
    update: {
      attempts: { increment: 1 },
      lastSeen: new Date(),
    },
    create: {
      userId,
      topicId,
      track,
      solved: false,
      attempts: 1,
    },
  });

  return NextResponse.json({ ok: true, progress: row });
}