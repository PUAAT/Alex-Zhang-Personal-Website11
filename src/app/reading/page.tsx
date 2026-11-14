"use client";

import { useState } from "react";
import { Star, BookOpen } from "lucide-react";
import { Reveal } from "@/components/animations/Reveal";

// NOTE: Metadata must be exported from a server component.
// Because this page needs client state for tab switching, we keep it here
// but metadata export is intentionally included for reference only —
// Next.js will not use it from a client component. Move to a server wrapper
// if SEO metadata is required.

// PLACEHOLDER: All books below are sample entries.
// Replace with real reading records before publishing.
type ReadingStatus = "Currently Reading" | "Finished" | "Want to Read";

interface Book {
  title: string;
  author: string;
  genre: string;
  note: string;
  rating: number; // 1–5; 0 means unrated
  status: ReadingStatus;
  isPlaceholder: boolean;
}

const books: Book[] = [
  // Currently Reading
  {
    title: "[PLACEHOLDER] Book Title A",
    author: "[PLACEHOLDER] Author Name",
    genre: "[PLACEHOLDER] Genre",
    note: "[PLACEHOLDER] A personal note or early impression of this book.",
    rating: 0,
    status: "Currently Reading",
    isPlaceholder: true,
  },
  {
    title: "[PLACEHOLDER] Book Title B",
    author: "[PLACEHOLDER] Author Name",
    genre: "[PLACEHOLDER] Genre",
    note: "[PLACEHOLDER] A personal note or early impression of this book.",
    rating: 0,
    status: "Currently Reading",
    isPlaceholder: true,
  },
  // Finished
  {
    title: "[PLACEHOLDER] Book Title C",
    author: "[PLACEHOLDER] Author Name",
    genre: "[PLACEHOLDER] Genre",
    note: "[PLACEHOLDER] A short review or key takeaway from this book.",
    rating: 5,
    status: "Finished",
    isPlaceholder: true,
  },
  {
    title: "[PLACEHOLDER] Book Title D",
    author: "[PLACEHOLDER] Author Name",
    genre: "[PLACEHOLDER] Genre",
    note: "[PLACEHOLDER] A short review or key takeaway from this book.",
    rating: 4,
    status: "Finished",
    isPlaceholder: true,
  },
  {
    title: "[PLACEHOLDER] Book Title E",
    author: "[PLACEHOLDER] Author Name",
    genre: "[PLACEHOLDER] Genre",
    note: "[PLACEHOLDER] A short review or key takeaway from this book.",
    rating: 4,
    status: "Finished",
    isPlaceholder: true,
  },
  // Want to Read
  {
    title: "[PLACEHOLDER] Book Title F",
    author: "[PLACEHOLDER] Author Name",
    genre: "[PLACEHOLDER] Genre",
    note: "[PLACEHOLDER] Why this book is on the list.",
    rating: 0,
    status: "Want to Read",
    isPlaceholder: true,
  },
  {
    title: "[PLACEHOLDER] Book Title G",
    author: "[PLACEHOLDER] Author Name",
    genre: "[PLACEHOLDER] Genre",
    note: "[PLACEHOLDER] Why this book is on the list.",
    rating: 0,
    status: "Want to Read",
    isPlaceholder: true,
  },
  {
    title: "[PLACEHOLDER] Book Title H",
    author: "[PLACEHOLDER] Author Name",
    genre: "[PLACEHOLDER] Genre",
    note: "[PLACEHOLDER] Why this book is on the list.",
    rating: 0,
    status: "Want to Read",
    isPlaceholder: true,
  },
];

const TABS: ReadingStatus[] = ["Currently Reading", "Finished", "Want to Read"];

function StarRating({ rating }: { rating: number }) {
  if (rating === 0) {
    return <span className="text-xs text-mute">Unrated</span>;
  }
  return (
    <div className="flex gap-1" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={12}
          className={i < rating ? "fill-gold text-gold" : "text-line"}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

function BookCard({ book }: { book: Book }) {
  return (
    <article className="flex gap-5 border border-line bg-card p-6">
      {/* Cover placeholder */}
      <div
        className="flex h-32 w-20 shrink-0 items-center justify-center border border-line bg-surface"
        aria-hidden="true"
      >
        <BookOpen size={20} className="text-mute" />
      </div>
      <div className="flex flex-col justify-between gap-3">
        <div>
          <h3 className="font-serif text-lg text-paper">{book.title}</h3>
          <p className="mt-1 text-sm text-mute">{book.author}</p>
          <span className="mt-2 inline-block bg-line px-3 py-1 text-xs uppercase tracking-widest text-mute">
            {book.genre}
          </span>
        </div>
        <p className="text-sm leading-relaxed text-mute">{book.note}</p>
        <StarRating rating={book.rating} />
      </div>
    </article>
  );
}

export default function ReadingPage() {
  const [activeTab, setActiveTab] = useState<ReadingStatus>("Currently Reading");
  const filtered = books.filter((b) => b.status === activeTab);

  return (
    <div className="bg-ink">
      {/* ── Hero ── */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <Reveal>
            <p className="mb-6 text-xs uppercase tracking-editorial text-gold">
              Reading
            </p>
            <h1 className="font-serif text-5xl leading-[0.95] tracking-tight sm:text-7xl">
              The Bookshelf
            </h1>
            <p className="mt-6 max-w-xl text-mute">
              Books shape thinking. Here is what is on the shelf — read,
              reading, and to be read.
            </p>
          </Reveal>
          <p className="mt-4 text-xs text-mute">
            ⚠ Placeholder books — replace with real reading records before publishing.
          </p>
        </div>
      </section>

      {/* ── Tabs + Grid ── */}
      <section>
        <div className="mx-auto max-w-7xl px-6 py-24">
          {/* Tab buttons */}
          <div
            className="mb-16 flex flex-wrap gap-2 border-b border-line pb-6"
            role="tablist"
            aria-label="Reading status filter"
          >
            {TABS.map((tab) => (
              <button
                key={tab}
                role="tab"
                aria-selected={activeTab === tab}
                onClick={() => setActiveTab(tab)}
                className={`border px-6 py-3 text-xs uppercase tracking-widest transition-colors ${
                  activeTab === tab
                    ? "border-gold bg-gold text-ink"
                    : "border-line text-mute hover:border-gold hover:text-gold"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Book grid */}
          <div
            role="tabpanel"
            aria-label={`${activeTab} books`}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((book, i) => (
              <Reveal key={book.title} delay={i * 0.08}>
                <BookCard book={book} />
              </Reveal>
            ))}
            {filtered.length === 0 && (
              <p className="col-span-full text-sm text-mute">
                No books in this category yet.
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
