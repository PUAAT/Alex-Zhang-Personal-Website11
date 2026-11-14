import type { Metadata } from "next";
import { Reveal } from "@/components/animations/Reveal";
import { Timeline } from "@/components/journey/Timeline";

export const metadata: Metadata = {
  title: "Journey",
  description:
    "An interactive timeline of Alex Zhang's life milestones — education, career, travel, and personal growth.",
};

export default function JourneyPage() {
  return (
    <div className="bg-ink">
      {/* ── Hero ── */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <Reveal>
            <p className="mb-6 text-xs uppercase tracking-editorial text-gold">
              Journey
            </p>
            <h1 className="font-serif text-5xl leading-[0.95] tracking-tight sm:text-7xl">
              The Timeline
            </h1>
            <p className="mt-6 max-w-xl text-mute">
              A living record of milestones, decisions, and experiences that
              have shaped the journey so far. Filter by category to explore
              a particular chapter.
            </p>
          </Reveal>
          <p className="mt-4 text-xs text-mute">
            ⚠ Sample milestones — replace with real events before publishing.
          </p>
        </div>
      </section>

      {/* ── Interactive Timeline ── */}
      <section>
        <div className="mx-auto max-w-7xl px-6 py-24">
          <Timeline />
        </div>
      </section>
    </div>
  );
}
