"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Fades + rises its children in once they scroll into view. Fires once
 * (disconnects after triggering) so it doesn't replay on scroll-back.
 * Respects prefers-reduced-motion via the same global media query that
 * already neutralizes animation-duration in globals.css.
 */
export function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`${className ?? ""} ${visible ? "animate-rise-in" : "opacity-0"}`}>
      {children}
    </div>
  );
}
