"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let GLOBE: any;

type Props = {
  className?: string;
  children?: React.ReactNode;
};

export default function VantaGlobeBg({ className, children }: Props) {
  const elRef = useRef<HTMLDivElement | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const vantaRef = useRef<any>(null);

  useEffect(() => {
    let mounted = true;

    async function init() {
      if (!elRef.current) return;

      if (!GLOBE) {
        const mod = await import("vanta/dist/vanta.globe.min");
        GLOBE = mod.default;
      }

      if (!mounted || !elRef.current) return;
      if (vantaRef.current) return;

      vantaRef.current = GLOBE({
        el: elRef.current,
        THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,

        // --- Branding colors (fintech glow) ---
        backgroundColor: 0x05060a, // near-black
        color: 0x38bdf8,          // cyan
        color2: 0x7c3aed,         // purple
        color3: 0x22d3ee,

        // Optional tuning (usually improves look)
        size: 1.05
      });
    }

    init();

    return () => {
      mounted = false;
      if (vantaRef.current) {
        vantaRef.current.destroy();
        vantaRef.current = null;
      }
    };
  }, []);

  return (
    <div ref={elRef} className={["relative", className].filter(Boolean).join(" ")}>
      {/* readability overlay */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-black/15" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
