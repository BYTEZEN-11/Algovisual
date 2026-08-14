"use client";

import * as React from "react";
import { CommandPalette, SearchButton } from "./CommandPalette";

/**
 * Owns the palette's open state and binds the global ⌘K / Ctrl-K shortcut.
 * Renders a button the Navbar can place inline.
 */
export function SearchRoot() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <SearchButton onOpen={() => setOpen(true)} />
      <CommandPalette open={open} onClose={() => setOpen(false)} />
    </>
  );
}