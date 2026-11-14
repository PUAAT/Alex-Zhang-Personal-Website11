import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/animations/Reveal";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Alex Zhang's journal — reflections on work, travel, creativity, and life.",
};

// PLACEHOLDER: These are sample articles. Replace with real entries before publishing.
// isPlaceholder: true means these are not real records authored by Alex Zhang.
const articles = [
  {
    slug: "placeholder-article-1",
    title: "[PLACEHOLDER] On Building Something Worth Keeping",
    excerpt:
      "[PLACEHOLDER] A meditation on craft, patience, and why the process of making matters as much as what gets made.",
    category: "Craft",
    date: "[PLACEHOLDER] Month DD, YYYY",
    readingTime: "5 min read",
    isPlaceholder: true,
  },
  {
    slug: "placeholder-article-2",
    title: "[PLACEHOLDER] Notes from the Road: First Week in a New City",
    excerpt:
      "[PLACEHOLDER] The small observations that arrive when you trade the familiar for the unknown — a street-level account.",
    category: "Travel",
    date: "[PLACEHOLDER] Month DD, YYYY",
    readingTime: "7 min read",
    isPlaceholder: true,
  },
  {
    slug: "placeholder-article-3",
    title: "[PLACEHOLDER] Reading Slowly in a Fast World",
    excerpt:
      "[PLACEHOLDER] What happens to your thinking when you deliberately choose books over feeds, depth over breadth.",
    category: "Reading",
    date: "[PLACEHOLDER] Month DD, YYYY",
    readingTime: "4 min read",
    isPlaceholder: true,
  },
  {
    slug: "placeholder-article-4",
    title: "[PLACEHOLDER] The Discipline of Showing Up",
    excerpt:
      "[PLACEHOLDER] Reflections on consistency, creative blocks, and finding the motivation to keep creating when inspiration is absent.",
    category: "Creativity",
    date: "[PLACEHOLDER] Month DD, YYYY",
    readingTime: "6 min read",
    isPlaceholder: true,
  },
];

export default function JournalPage() {
  return (
    <div className="bg-ink">
      {/* ── Hero ── */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <Reveal>
            <p className="mb-6 text-xs uppercase tracking-editorial text-gold">
              Journal
            </p>
            <h1 className="font-serif text-5xl leading-[0.95] tracking-tight sm:text-7xl">
              Writing &amp; Reflection
            </h1>
            <p className="mt-6 max-w-xl text-mute">
              An ongoing collection of thoughts, observations, and essays on
              work, creativity, travel, and the examined life.
            </p>
          </Reveal>
          <p className="mt-4 text-xs text-mute">
            ⚠ Placeholder articles — no real writing yet. Replace before publishing.
          </p>
        </div>
      </section>

      {/* ── Article Grid ── */}
      <section>
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="grid gap-px border border-line bg-line sm:grid-cols-2">
            {articles.map((article, i) => (
              <Reveal key={article.slug} delay={i * 0.1}>
                <article className="flex h-full flex-col bg-card p-8">
                  {/* Cover placeholder */}
                  <div
                    className="mb-6 flex aspect-video items-center justify-center border border-line bg-surface"
                    aria-hidden="true"
                  >
                    <span className="text-xs uppercase tracking-widest text-line">
                      Cover Image
                    </span>
                  </div>

                  <div className="mb-4 flex items-center gap-4">
                    <span className="bg-line px-3 py-1 text-xs uppercase tracking-widest text-mute">
                      {article.category}
                    </span>
                    <span className="text-xs text-mute">{article.date}</span>
                  </div>

                  <h2 className="mb-3 font-serif text-2xl leading-snug text-paper">
                    {article.title}
                  </h2>
                  <p className="mb-6 grow text-sm leading-relaxed text-mute">
                    {article.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-mute">
                      {article.readingTime}
                    </span>
                    {/* Links to /journal/[slug] — pages not yet created */}
                    <Link
                      href="#"
                      aria-label={`Read ${article.title}`}
                      className="border border-gold px-6 py-3 text-xs uppercase tracking-widest text-gold transition-colors hover:bg-gold hover:text-ink"
                    >
                      Read More
                    </Link>
                  </div>

                  {article.isPlaceholder && (
                    <p className="mt-4 text-xs text-mute">
                      ⚠ Placeholder article
                    </p>
                  )}
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
