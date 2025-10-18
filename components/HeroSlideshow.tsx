"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import gallery from "@/content/gallery.json";

type Props = {
  intervalMs?: number;         // slide duration
  maxImages?: number;          // how many to sample
  overlay?: React.ReactNode;   // your title/buttons overlay
};

const VALID_IMG = /\.(jpe?g|png|webp|avif)$/i;

export default function HeroSlideshow({
  intervalMs = 4500,
  maxImages = 18,
  overlay,
}: Props) {
  // 1) Collect images from gallery + add a manual fallback
  const allFromContent = useMemo(() => {
    const arr: string[] = [];
    for (const cat of (gallery as any).categories ?? []) {
      for (const album of cat.albums ?? []) {
        const paths = [album.cover, ...(album.images ?? [])].filter(Boolean);
        for (const p of paths) if (VALID_IMG.test(p)) arr.push(p);
      }
    }
    // Add a safe fallback first so SSR has a deterministic first frame
    const fallback = "/hero.jpg";
    const dedup = Array.from(new Set([fallback, ...arr])); // remove duplicates
    return dedup.slice(0, Math.max(1, maxImages * 3)); // oversample; we’ll shuffle+slice later
  }, [maxImages]);

  // 2) Start with a stable order for SSR; shuffle AFTER mount on the client
  const [imgs, setImgs] = useState<string[]>(() => allFromContent.slice(0, Math.max(1, maxImages)));

  useEffect(() => {
    // Fisher–Yates shuffle (client only)
    const pool = allFromContent.slice();
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    setImgs(pool.slice(0, maxImages));
  }, [allFromContent, maxImages]);

  // 3) Auto-play
  const [idx, setIdx] = useState(0);
  const timer = useRef<number | null>(null);
  useEffect(() => {
    if (imgs.length <= 1) return;
    timer.current = window.setInterval(() => {
      setIdx((i) => (i + 1) % imgs.length);
    }, intervalMs);
    return () => { if (timer.current) window.clearInterval(timer.current); };
  }, [imgs.length, intervalMs]);

  if (!imgs.length) {
    return (
      <div className="relative h-[46vw] max-h-[520px] min-h-[220px] rounded-2xl border bg-gray-100" />
    );
  }

  return (
  <div className="relative max-w-6xl mx-auto px-4 mt-4">
    {/* Aspect-ratio hero: no weird stretching */}
    <div
      className="relative w-full rounded-2xl overflow-hidden border"
      style={{ aspectRatio: "16/9" }} // keeps a consistent 16:9
    >
      {/* Slides */}
      {imgs.map((src, i) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-700 ease-linear ${
            i === idx ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Blurred cover background to fill edges */}
          <Image
            src={src}
            alt=""
            fill
            sizes="100vw"
            className="object-cover blur-xl scale-110 opacity-60"
            aria-hidden
            priority={i === 0}
          />
          {/* Actual photo — no crop, no stretch */}
          <Image
            src={src}
            alt="Swift Club SLU"
            fill
            sizes="100vw"
            className="object-contain"
            priority={i === 0}
          />
        </div>
      ))}

      {/* gentle overlay for text contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/10" />

      {/* overlay content (unchanged) */}
      {overlay && (
        <div className="absolute inset-0 flex items-center">
          <div className="px-4 md:px-8">{overlay}</div>
        </div>
      )}

      {/* dots (unchanged) */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
        {imgs.map((_, i) => (
          <span
            key={i}
            className={`h-1.5 w-4 rounded-full ${i === idx ? "bg-white" : "bg-white/50"}`}
          />
        ))}
      </div>
    </div>
  </div>
);
}