import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      lastViewedAt: true,
      lastViewedTrack: true,
      lastViewedPattern: true,
      lastViewedTopic: true,
    },
  });

  let lastViewed: null | {
    track: string;
    patternSlug: string;
    topicSlug: string;
    href: string;
    topicTitle?: string;
    patternTitle?: string;
    lastViewedAt: string;
  } = null;

  if (
    user?.lastViewedAt &&
    user.lastViewedTrack &&
    user.lastViewedPattern &&
    user.lastViewedTopic
  ) {
    lastViewed = {
      track: user.lastViewedTrack,
      patternSlug: user.lastViewedPattern,
      topicSlug: user.lastViewedTopic,
      href: hrefFor(user.lastViewedTrack, user.lastViewedPattern, user.lastViewedTopic),
      lastViewedAt: user.lastViewedAt.toISOString(),
    };
  }

  return NextResponse.json({ lastViewed });
}

function hrefFor(track: string, pattern: string, topic: string): string {
  if (track === "dsa") return `/patterns/${pattern}/${topic}`;
  if (track === "lld") return `/lld/${pattern}#${topic}`;
  if (track === "os") return `/operating-systems/${topic}`;
  if (track === "networking") return `/computer-networks/${topic}`;
  return `/${track}/${topic}`;
}