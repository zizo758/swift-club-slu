"use client";
import { useEffect, useState } from "react";

export default function GalleryLightbox({ images }: { images: string[] }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowRight") setIndex(i => Math.min(i + 1, images.length - 1));
      if (e.key === "ArrowLeft") setIndex(i => Math.max(i - 1, 0));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, images.length]);

  if (!images || images.length === 0) return null;

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {images.map((src, i) => (
          <button
            key={src + i}
            className="group relative aspect-[4/3] overflow-hidden rounded border bg-gray-100"
            onClick={() => { setIndex(i); setOpen(true); }}
          >
            <img src={src} alt={`Photo ${i + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
          </button>
        ))}
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setOpen(false)}>
          <div className="max-w-5xl w-full" onClick={e => e.stopPropagation()}>
            <img src={images[index]} alt={`Photo ${index + 1}`} className="w-full h-auto rounded" />
            <div className="mt-3 flex items-center justify-between text-white text-sm">
              <button className="px-3 py-1 border rounded" onClick={() => setOpen(false)}>Close</button>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1 border rounded disabled:opacity-50" onClick={() => setIndex(i => Math.max(i - 1, 0))} disabled={index === 0}>Prev</button>
                <span>{index + 1} / {images.length}</span>
                <button className="px-3 py-1 border rounded disabled:opacity-50" onClick={() => setIndex(i => Math.min(i + 1, images.length - 1))} disabled={index === images.length - 1}>Next</button>
                <a className="px-3 py-1 border rounded" href={images[index]} target="_blank" rel="noreferrer">Open</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
