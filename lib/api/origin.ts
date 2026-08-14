import { NextResponse } from "next/server";

export function requireSameOrigin(req: Request): NextResponse | null {
  const origin = req.headers.get("origin");
  const referer = req.headers.get("referer");
  const host = (() => {
    try {
      return new URL(req.url).host;
    } catch {
      return null;
    }
  })();

  if (!host) return null;

  if (origin) {
    try {
      const o = new URL(origin);
      if (o.host !== host) {
        return NextResponse.json(
          { error: "forbidden", reason: "origin_mismatch" },
          { status: 403 },
        );
      }
      return null;
    } catch {
    }
  }

  if (referer) {
    try {
      const r = new URL(referer);
      if (r.host !== host) {
        return NextResponse.json(
          { error: "forbidden", reason: "referer_mismatch" },
          { status: 403 },
        );
      }
      return null;
    } catch {
    }
  }

  return null;
}