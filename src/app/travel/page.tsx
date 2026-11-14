import type { Metadata } from "next";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { Reveal } from "@/components/animations/Reveal";
import { WorldMap } from "@/components/travel/WorldMap";

export const metadata: Metadata = {
  title: "Travel",
  description:
    "Alex Zhang's travel stories, destinations, and adventures from around the world.",
};

// PLACEHOLDER: Destination cards below are sample entries.
// Replace every field marked [PLACEHOLDER] with real travel records.
const destinations = [
  {
    slug: "placeholder-destination-1",
    flag: "🇯🇵",
    country: "[PLACEHOLDER] Japan",
    city: "[PLACEHOLDER] Tokyo",
    dateVisited: "[PLACEHOLDER] Month YYYY",
    description:
      "[PLACEHOLDER] A brief description of this destination — what made it memorable and what you discovered.",
    isPlaceholder: true,
  },
  {
    slug: "placeholder-destination-2",
    flag: "🇮🇹",
    country: "[PLACEHOLDER] Italy",
    city: "[PLACEHOLDER] Rome",
    dateVisited: "[PLACEHOLDER] Month YYYY",
    description:
      "[PLACEHOLDER] A brief description of this destination — what made it memorable and what you discovered.",
    isPlaceholder: true,
  },
  {
    slug: "placeholder-destination-3",
    flag: "🇸🇬",
    country: "[PLACEHOLDER] Singapore",
    city: "[PLACEHOLDER] Singapore",
    dateVisited: "[PLACEHOLDER] Month YYYY",
    description:
      "[PLACEHOLDER] A brief description of this destination — what made it memorable and what you discovered.",
    isPlaceholder: true,
  },
  {
    slug: "placeholder-destination-4",
    flag: "🇦🇺",
    country: "[PLACEHOLDER] Australia",
    city: "[PLACEHOLDER] Melbourne",
    dateVisited: "[PLACEHOLDER] Month YYYY",
    description:
      "[PLACEHOLDER] A brief description of this destination — what made it memorable and what you discovered.",
    isPlaceholder: true,
  },
  {
    slug: "placeholder-destination-5",
    flag: "🇫🇷",
    country: "[PLACEHOLDER] France",
    city: "[PLACEHOLDER] Paris",
    dateVisited: "[PLACEHOLDER] Month YYYY",
    description:
      "[PLACEHOLDER] A brief description of this destination — what made it memorable and what you discovered.",
    isPlaceholder: true,
  },
];

export default function TravelPage() {
  return (
    <div className="bg-ink">
      {/* ── Hero ── */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <Reveal>
            <p className="mb-6 text-xs uppercase tracking-editorial text-gold">
              Travel
            </p>
            <h1 className="font-serif text-5xl leading-[0.95] tracking-tight sm:text-7xl xl:text-8xl">
              The World,
              <br />
              <span className="font-serif italic text-mute">Experienced</span>
            </h1>
            <p className="mt-6 max-w-xl text-mute">
              Every journey leaves a mark. Here are the places that shaped the
              way I see the world.
            </p>
          </Reveal>
          <p className="mt-4 text-xs text-mute">
            ⚠ Placeholder destinations — replace with real travel records before publishing.
          </p>
        </div>
      </section>

      {/* ── Destination Grid ── */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <Reveal>
            <h2 className="mb-16 font-serif text-4xl tracking-tight sm:text-5xl">
              Destinations
            </h2>
          </Reveal>
          <div className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {destinations.map((dest, i) => (
              <Reveal key={dest.slug} delay={i * 0.08}>
                <article className="flex h-full flex-col bg-card p-8">
                  <div className="mb-4 flex items-start justify-between gap-2">
                    <span
                      className="text-4xl"
                      role="img"
                      aria-label={dest.country}
                    >
                      {dest.flag}
                    </span>
                    <span className="mt-1 bg-line px-3 py-1 text-xs uppercase tracking-widest text-mute">
                      {dest.dateVisited}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl text-paper">
                    {dest.city}
                  </h3>
                  <div className="mb-4 mt-1 flex items-center gap-1 text-sm text-mute">
                    <MapPin size={12} aria-hidden="true" />
                    {dest.country}
                  </div>

                  <p className="mb-6 grow text-sm leading-relaxed text-mute">
                    {dest.description}
                  </p>

                  {/* Link to /travel/[slug] — pages not yet created */}
                  <Link
                    href="#"
                    aria-label={`Read about ${dest.city}`}
                    className="self-start border border-gold px-6 py-3 text-xs uppercase tracking-widest text-gold transition-colors hover:bg-gold hover:text-ink"
                  >
                    Read Story
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Interactive Map Section ── */}
      <section>
        <div className="mx-auto max-w-7xl px-6 py-24">
          <Reveal>
            <h2 className="mb-6 font-serif text-4xl tracking-tight sm:text-5xl">
              World Map
            </h2>
            <p className="mb-10 max-w-xl text-mute">
              An interactive map of destinations explored across four continents. Click pins to see details.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <WorldMap />
          </Reveal>
        </div>
      </section>
    </div>
  );
}
