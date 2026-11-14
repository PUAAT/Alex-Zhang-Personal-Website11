"use client";

import { useState } from "react";
import { Camera, X, ChevronLeft, ChevronRight } from "lucide-react";

type PhotoCategory = "All" | "Travel" | "Portrait" | "Architecture" | "Nature";

interface Photo {
  id: string;
  category: Exclude<PhotoCategory, "All">;
  title: string;
  location: string;
  isPlaceholder: boolean;
}

const photos: Photo[] = [
  { id: "p1", category: "Travel", title: "[PLACEHOLDER] Travel Shot 1", location: "[PLACEHOLDER] City, Country", isPlaceholder: true },
  { id: "p2", category: "Portrait", title: "[PLACEHOLDER] Portrait Shot 1", location: "[PLACEHOLDER] City, Country", isPlaceholder: true },
  { id: "p3", category: "Architecture", title: "[PLACEHOLDER] Architecture Shot 1", location: "[PLACEHOLDER] City, Country", isPlaceholder: true },
  { id: "p4", category: "Nature", title: "[PLACEHOLDER] Nature Shot 1", location: "[PLACEHOLDER] Region, Country", isPlaceholder: true },
  { id: "p5", category: "Travel", title: "[PLACEHOLDER] Travel Shot 2", location: "[PLACEHOLDER] City, Country", isPlaceholder: true },
  { id: "p6", category: "Architecture", title: "[PLACEHOLDER] Architecture Shot 2", location: "[PLACEHOLDER] City, Country", isPlaceholder: true },
  { id: "p7", category: "Portrait", title: "[PLACEHOLDER] Portrait Shot 2", location: "[PLACEHOLDER] City, Country", isPlaceholder: true },
  { id: "p8", category: "Nature", title: "[PLACEHOLDER] Nature Shot 2", location: "[PLACEHOLDER] Region, Country", isPlaceholder: true },
  { id: "p9", category: "Travel", title: "[PLACEHOLDER] Travel Shot 3", location: "[PLACEHOLDER] City, Country", isPlaceholder: true },
  { id: "p10", category: "Architecture", title: "[PLACEHOLDER] Architecture Shot 3", location: "[PLACEHOLDER] City, Country", isPlaceholder: true },
];

const CATEGORIES: PhotoCategory[] = ["All", "Travel", "Portrait", "Architecture", "Nature"];

export function Gallery() {
  const [activeCategory, setActiveCategory] = useState<PhotoCategory>("All");
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const filtered =
    activeCategory === "All"
      ? photos
      : photos.filter((p) => p.category === activeCategory);

  const currentIndex = selectedPhoto
    ? filtered.findIndex((p) => p.id === selectedPhoto.id)
    : -1;

  function prev() {
    if (currentIndex < 0) return;
    const prevIndex = (currentIndex - 1 + filtered.length) % filtered.length;
    setSelectedPhoto(filtered[prevIndex]);
  }

  function next() {
    if (currentIndex < 0) return;
    const nextIndex = (currentIndex + 1) % filtered.length;
    setSelectedPhoto(filtered[nextIndex]);
  }

  return (
    <div>
      {/* ── Category filters ── */}
      <div
        className="mb-12 flex flex-wrap gap-2"
        role="group"
        aria-label="Filter photos by category"
      >
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setActiveCategory(cat);
              setSelectedPhoto(null);
            }}
            aria-pressed={activeCategory === cat}
            className={`border px-6 py-3 text-xs uppercase tracking-widest transition-colors ${
              activeCategory === cat
                ? "border-gold bg-gold text-ink"
                : "border-line text-mute hover:border-gold hover:text-gold"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ── Photo grid ── */}
      <div className="grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-3 lg:grid-cols-4">
        {filtered.map((photo) => (
          <button
            key={photo.id}
            onClick={() => setSelectedPhoto(photo)}
            aria-label={`Open ${photo.title}`}
            className="group relative block w-full overflow-hidden bg-card text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-gold"
          >
            {/* Aspect-ratio placeholder box */}
            <div className="relative aspect-square flex items-center justify-center bg-card transition-colors group-hover:bg-surface">
              <Camera
                size={28}
                className="text-line transition-colors group-hover:text-mute"
                aria-hidden="true"
              />
            </div>
            {/* Hover overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-ink/80 opacity-0 transition-opacity group-hover:opacity-100">
              <p className="px-2 text-center text-xs font-medium uppercase tracking-widest text-paper">
                {photo.title}
              </p>
              <p className="mt-1 px-2 text-center text-xs text-mute">
                {photo.location}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* ── Lightbox ── */}
      {selectedPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Photo: ${selectedPhoto.title}`}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-ink/95 p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setSelectedPhoto(null)}
            aria-label="Close lightbox"
            className="absolute right-6 top-6 text-mute hover:text-paper"
          >
            <X size={28} />
          </button>

          {/* Prev arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Previous photo"
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 text-mute hover:text-paper"
          >
            <ChevronLeft size={36} />
          </button>

          {/* Photo content */}
          <div
            className="relative flex h-[70vmin] w-[70vmin] flex-col items-center justify-center border border-line bg-card"
            onClick={(e) => e.stopPropagation()}
          >
            <Camera size={48} className="mb-4 text-mute" aria-hidden="true" />
            <p className="text-xs uppercase tracking-widest text-mute">
              {selectedPhoto.isPlaceholder
                ? "Placeholder — no image yet"
                : selectedPhoto.title}
            </p>
            <p className="mt-6 text-center text-sm text-paper">
              {selectedPhoto.title}
            </p>
            <p className="mt-1 text-xs text-mute">
              {selectedPhoto.location}
            </p>
            <span className="mt-3 bg-line px-3 py-1 text-xs uppercase tracking-widest text-mute">
              {selectedPhoto.category}
            </span>
          </div>

          {/* Next arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Next photo"
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-mute hover:text-paper"
          >
            <ChevronRight size={36} />
          </button>

          {/* Counter */}
          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs text-mute">
            {currentIndex + 1} / {filtered.length}
          </p>
        </div>
      )}
    </div>
  );
}
