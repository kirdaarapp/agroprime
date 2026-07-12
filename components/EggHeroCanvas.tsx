"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const EggHero3D = dynamic(() => import("./EggHero3D"), { ssr: false });

export default function EggHeroCanvas({ className }: { className?: string }) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
    setReady(true);
  }, []);

  if (!ready || reducedMotion) return null;

  return (
    <div className={className}>
      <EggHero3D />
    </div>
  );
}
