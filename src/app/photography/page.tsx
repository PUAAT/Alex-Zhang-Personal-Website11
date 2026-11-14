import type { Metadata } from "next";
import { Gallery } from "@/components/photography/Gallery";
import { Reveal } from "@/components/animations/Reveal";

export const metadata: Metadata = {
  title: "Photography",
  description:
    "Alex Zhang's photography — travel, portrait, architecture, and nature through a personal lens.",
};

export default function PhotographyPage() {
  return (
    <div className="bg-ink">
      {/* ── Hero ── */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <Reveal>
            <p className="mb-6 text-xs uppercase tracking-editorial text-gold">
              Photography
            </p>
            <h1 className="font-serif text-5xl leading-[0.95] tracking-tight sm:text-7xl xl:text-8xl">
              Through the Lens
            </h1>
            <p className="mt-6 max-w-xl text-mute">
              A curated selection of photographs across travel, people,
              architecture, and the natural world.
            </p>
          </Reveal>
          <p className="mt-4 text-xs text-mute">
            ⚠ Placeholder gallery — replace with real photographs before publishing.
          </p>
        </div>
      </section>

      {/* ── Gallery (client component) ── */}
      <section>
        <div className="mx-auto max-w-7xl px-6 py-24">
          <Gallery />
        </div>
      </section>
    </div>
  );
}
