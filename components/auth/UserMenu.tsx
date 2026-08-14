"use client";

import * as React from "react";
import Image from "next/image";
import { signOut } from "next-auth/react";

export function UserMenu({
  user,
}: {
  user: {
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const initial = (user.name ?? user.email ?? "U")[0]?.toUpperCase() ?? "U";

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-8 h-8 rounded-full overflow-hidden border border-line hover:border-accent transition flex items-center justify-center"
        aria-label="User menu"
        aria-haspopup="true"
        aria-expanded={open}
      >
        {user.image ? (
          <img src={user.image} alt={user.name ?? "user"} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-accent/20 text-accent flex items-center justify-center text-sm font-semibold">
            {initial}
          </div>
        )}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-elev border border-line rounded-md p-2 shadow-xl z-50">
          <div className="px-3 py-2 border-b border-line mb-1">
            <div className="text-sm font-medium text-ink truncate">
              {user.name ?? "Account"}
            </div>
            <div className="text-xs text-muted truncate">{user.email}</div>
          </div>
          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/" })}
            className="w-full text-left px-3 py-1.5 text-sm text-muted hover:text-ink hover:bg-elev2 rounded-sm transition"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}