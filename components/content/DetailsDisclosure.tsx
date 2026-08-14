"use client";

import * as React from "react";

export function DetailsDisclosure({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        className="text-accent hover:underline font-medium"
      >
        {open ? "▼ hide details" : "▶ details"}
      </button>
      <div
        className={
          "w-full grid transition-[grid-template-rows] duration-200 " +
          (open ? "grid-rows-[1fr] mt-3" : "grid-rows-[0fr]")
        }
      >
        <div className="overflow-hidden">{children}</div>
      </div>
    </>
  );
}