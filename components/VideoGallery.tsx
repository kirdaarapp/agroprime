"use client";

import { useEffect, useRef, useState } from "react";

function VideoTile({ src }: { src: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(el);

    const fallback = setTimeout(() => setShouldLoad(true), 2000);

    return () => {
      observer.disconnect();
      clearTimeout(fallback);
    };
  }, []);

  useEffect(() => {
    if (shouldLoad) {
      videoRef.current?.play().catch(() => {});
    }
  }, [shouldLoad]);

  return (
    <div
      ref={containerRef}
      className="relative aspect-video rounded-2xl overflow-hidden shadow-xl bg-brand-primary-dark/20"
    >
      {shouldLoad && (
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          src={src}
          muted
          loop
          playsInline
          preload="metadata"
        />
      )}
    </div>
  );
}

export default function VideoGallery() {
  const videos = [
    "/videos/showcase-6288294.mp4",
    "/videos/showcase-6950162.mp4",
    "/videos/showcase-6845568.mp4",
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-3">
      {videos.map((src) => (
        <VideoTile key={src} src={src} />
      ))}
    </div>
  );
}
