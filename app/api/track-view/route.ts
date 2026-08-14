import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { requireSameOrigin } from "@/lib/api/origin";

const Body = z.object({
  track: z.string().min(1).max(32),
  patternSlug: z.string().min(1).max(96),
  topicSlug: z.string().min(1).max(96),
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
  const { track, patternSlug, topicSlug } = parsed.data;

  await prisma.user.update({
    where: { id: userId },
    data: {
      lastViewedAt: new Date(),
      lastViewedTrack: track,
      lastViewedPattern: patternSlug,
      lastViewedTopic: topicSlug,
    },
  });

  return NextResponse.json({ ok: true });
}