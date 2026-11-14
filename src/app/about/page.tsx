import type { Metadata } from "next";
import { profile } from "@/data/profile";
import { Reveal } from "@/components/animations/Reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn more about Alex Zhang — his story, values, and the ideas that drive him forward.",
};

// PLACEHOLDER: Values and interests below are sample entries.
// Replace with real values/interests when content is ready.
const values = [
  {
    title: "Curiosity",
    description:
      "A relentless drive to understand how things work — from systems and organisations to people and places.",
  },
  {
    title: "Craft",
    description:
      "Whether writing, photography, or building, the commitment to doing things with intention and care.",
  },
  {
    title: "Connection",
    description:
      "Meaningful relationships and cross-cultural exchange as the foundation of a well-lived life.",
  },
  {
    title: "Growth",
    description:
      "Embracing discomfort and new challenges as the fastest path to becoming a fuller version of oneself.",
  },
];

// PLACEHOLDER: Skills below are sample entries.
// Replace with real skills when content is ready.
const skillGroups = [
  {
    category: "Professional",
    skills: [
      "[PLACEHOLDER] Skill A",
      "[PLACEHOLDER] Skill B",
      "[PLACEHOLDER] Skill C",
    ],
  },
  {
    category: "Creative",
    skills: [
      "[PLACEHOLDER] Photography",
      "[PLACEHOLDER] Writing",
      "[PLACEHOLDER] Design",
    ],
  },
  {
    category: "Languages",
    skills: [
      "[PLACEHOLDER] English (native)",
      "[PLACEHOLDER] Mandarin",
      "[PLACEHOLDER] Language C",
    ],
  },
];

export default function AboutPage() {
  return (
    <div className="bg-ink">
      {/* ── Hero ── */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <Reveal>
            <p className="mb-6 text-xs uppercase tracking-editorial text-gold">
              About
            </p>
            <h1 className="font-serif text-5xl leading-[0.95] tracking-tight sm:text-7xl xl:text-8xl">
              {profile.name}
            </h1>
            <p className="mt-6 font-serif text-2xl italic text-mute sm:text-3xl">
              {profile.tagline}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Bio / Story ── */}
      {/* PLACEHOLDER: The bio paragraphs below are sample filler text. Replace with Alex Zhang's real story. */}
      <section className="border-b border-line">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 py-24 lg:grid-cols-[1fr_2fr]">
          <Reveal>
            <p className="text-xs uppercase tracking-editorial text-gold">
              The Story
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="space-y-6 text-paper leading-relaxed">
              <p>
                {/* PLACEHOLDER */}
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris.
              </p>
              <p>
                {/* PLACEHOLDER */}
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt.
              </p>
              <p>
                {/* PLACEHOLDER */}
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto.
              </p>
              <p className="text-xs text-mute">
                ⚠ Placeholder bio — replace with real content before publishing.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Values & Interests ── */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <Reveal>
            <p className="mb-4 text-xs uppercase tracking-editorial text-gold">
              Values &amp; Interests
            </p>
            <h2 className="mb-16 font-serif text-4xl tracking-tight sm:text-5xl">
              What I Stand For
            </h2>
          </Reveal>
          <div className="grid gap-px border border-line bg-line sm:grid-cols-2">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.1}>
                <article className="bg-card p-8">
                  <h3 className="mb-3 font-serif text-2xl text-paper">
                    {v.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-mute">
                    {v.description}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Skills ── */}
      <section>
        <div className="mx-auto max-w-7xl px-6 py-24">
          <Reveal>
            <p className="mb-4 text-xs uppercase tracking-editorial text-gold">
              Skills
            </p>
            <h2 className="mb-16 font-serif text-4xl tracking-tight sm:text-5xl">
              Capabilities
            </h2>
          </Reveal>
          <div className="grid gap-8 sm:grid-cols-3">
            {skillGroups.map((group, i) => (
              <Reveal key={group.category} delay={i * 0.1}>
                <div className="border border-line bg-card p-6">
                  <p className="mb-5 text-xs uppercase tracking-widest text-gold">
                    {group.category}
                  </p>
                  <ul className="space-y-3">
                    {group.skills.map((skill) => (
                      <li
                        key={skill}
                        className="flex items-center gap-3 text-sm text-paper"
                      >
                        <span className="h-px w-6 bg-gold" aria-hidden="true" />
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-8 text-xs text-mute">
            ⚠ Placeholder skills — replace with real content before publishing.
          </p>
        </div>
      </section>
    </div>
  );
}
