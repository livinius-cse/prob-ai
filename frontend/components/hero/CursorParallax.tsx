"use client";

import { useEffect } from "react";
import { getGsap, prefersReducedMotion } from "../../lib/gsap/animations";

export function CursorParallax() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const root = document.documentElement;
    const xTo = getGsap().quickTo(root, "--cursor-x", { duration: 0.8, ease: "power3.out" });
    const yTo = getGsap().quickTo(root, "--cursor-y", { duration: 0.8, ease: "power3.out" });
    const handleMove = (event: MouseEvent) => {
      xTo((event.clientX / window.innerWidth) * 100);
      yTo((event.clientY / window.innerHeight) * 100);
    };
    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => window.removeEventListener("pointermove", handleMove);
  }, []);
  return null;
}
