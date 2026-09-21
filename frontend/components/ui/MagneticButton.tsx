"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import { getGsap, prefersReducedMotion } from "../../lib/gsap/animations";

export function MagneticButton({ children, href, variant = "primary" }: { children: ReactNode; href: string; variant?: "primary" | "secondary" }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const move = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current || prefersReducedMotion()) return;
    const rect = ref.current.getBoundingClientRect();
    getGsap().to(ref.current, { x: (event.clientX - rect.left - rect.width / 2) * 0.12, y: (event.clientY - rect.top - rect.height / 2) * 0.12, duration: 0.3, overwrite: true });
  };
  return <a ref={ref} href={href} onMouseMove={move} onMouseLeave={() => getGsap().to(ref.current, { x: 0, y: 0, duration: 0.5 })} className={`magnetic-button ${variant}`}>{children}</a>;
}
