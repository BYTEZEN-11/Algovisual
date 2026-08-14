import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { requireSameOrigin } from "@/lib/api/origin";

const Body = z.object({
  topicId: z.string().min(1),
  track: z.string().min(1).default("dsa"),
});

export async function GET() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return NextResponse.json({ bookmarks: [] });
  const rows = await prisma.bookmark.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({
    bookmarks: rows.map((r) => ({
      topicId: r.topicId,
      track: r.track,
      createdAt: r.createdAt.toISOString(),
    })),
  });
}

export async function POST(req: Request) {
  const forbidden = requireSameOrigin(req);
  if (forbidden) return forbidden;

  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "bad_request" }, { status: 400 });

  const { topicId, track } = parsed.data;
  await prisma.bookmark.upsert({
    where: { userId_topicId: { userId, topicId } },
    update: {},
    create: { userId, topicId, track },
  });
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: Request) {
  const forbidden = requireSameOrigin(req);
  if (forbidden) return forbidden;

  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "bad_request" }, { status: 400 });
  const { topicId } = parsed.data;
  await prisma.bookmark
    .delete({ where: { userId_topicId: { userId, topicId } } })
    .catch(() => null);
  return NextResponse.json({ ok: true });
}