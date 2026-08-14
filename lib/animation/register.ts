"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

let registered = false;
export function ensureGsapRegistered() {
  if (registered) return;
  gsap.registerPlugin(useGSAP);
  registered = true;
}

export { gsap, useGSAP };