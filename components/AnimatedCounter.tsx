"use client";

import { useEffect, useRef, useState } from "react";

export default function AnimatedCounter({
  target,
  suffix = "",
  duration = 1400,
}: {
  target: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const startCounting = () => {
      if (started.current) return;
      started.current = true;
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(Math.round(target * eased));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    if (typeof IntersectionObserver === "undefined") {
      startCounting();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          startCounting();
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);

    // Safety net: some environments never fire IntersectionObserver
    // callbacks. Don't leave counters permanently stuck at 0.
    const fallback = setTimeout(startCounting, 1500);

    return () => {
      observer.disconnect();
      clearTimeout(fallback);
    };
  }, [target, duration]);

  return (
    <span ref={ref}>
      {value.toLocaleString()}
      {suffix}
    </span>
  );
}
