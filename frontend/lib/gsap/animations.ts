"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let configured = false;

export function getGsap() {
  if (typeof window !== "undefined" && !configured) {
    gsap.registerPlugin(ScrollTrigger);
    configured = true;
  }
  return gsap;
}

export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
