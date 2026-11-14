import type { Metadata } from "next";
import { Reveal } from "@/components/animations/Reveal";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Alex Zhang's professional experience, projects, and achievements.",
};

// PLACEHOLDER: All entries below are sample content.
// Replace every field marked [PLACEHOLDER] with real data before publishing.
const experience = [
  {
    company: "[PLACEHOLDER] Company Name",
    role: "[PLACEHOLDER] Role / Position",
    dateRange: "[PLACEHOLDER] Month Year – Month Year",
    location: "[PLACEHOLDER] City, Country",
    bullets: [
      "[PLACEHOLDER] Key responsibility or achievement A.",
      "[PLACEHOLDER] Key responsibility or achievement B.",
      "[PLACEHOLDER] Key responsibility or achievement C.",
    ],
  },
  {
    company: "[PLACEHOLDER] Company Name",
    role: "[PLACEHOLDER] Role / Position",
    dateRange: "[PLACEHOLDER] Month Year – Month Year",
    location: "[PLACEHOLDER] City, Country",
    bullets: [
      "[PLACEHOLDER] Key responsibility or achievement A.",
      "[PLACEHOLDER] Key responsibility or achievement B.",
    ],
  },
  {
    company: "[PLACEHOLDER] Company Name",
    role: "[PLACEHOLDER] Role / Position",
    dateRange: "[PLACEHOLDER] Month Year – Month Year",
    location: "[PLACEHOLDER] City, Country",
    bullets: [
      "[PLACEHOLDER] Key responsibility or achievement A.",
      "[PLACEHOLDER] Key responsibility or achievement B.",
    ],
  },
];

const projects = [
  {
    name: "[PLACEHOLDER] Project Alpha",
    description:
      "[PLACEHOLDER] A short description of this project, what problem it solves, and your role in building it.",
    tags: ["[PLACEHOLDER] Tech A", "[PLACEHOLDER] Tech B", "[PLACEHOLDER] Tech C"],
    dateRange: "[PLACEHOLDER] Year",
    link: "#",
  },
  {
    name: "[PLACEHOLDER] Project Beta",
    description:
      "[PLACEHOLDER] A short description of this project, what problem it solves, and your role in building it.",
    tags: ["[PLACEHOLDER] Tech A", "[PLACEHOLDER] Tech B"],
    dateRange: "[PLACEHOLDER] Year",
    link: "#",
  },
  {
    name: "[PLACEHOLDER] Project Gamma",
    description:
      "[PLACEHOLDER] A short description of this project, what problem it solves, and your role in building it.",
    tags: ["[PLACEHOLDER] Tech A", "[PLACEHOLDER] Tech B", "[PLACEHOLDER] Tech C"],
    dateRange: "[PLACEHOLDER] Year",
    link: "#",
  },
  {
    name: "[PLACEHOLDER] Project Delta",
    description:
      "[PLACEHOLDER] A short description of this project, what problem it solves, and your role in building it.",
    tags: ["[PLACEHOLDER] Tech A"],
    dateRange: "[PLACEHOLDER] Year",
    link: "#",
  },
];

const achievements = [
  {
    title: "[PLACEHOLDER] Award or Achievement",
    organisation: "[PLACEHOLDER] Issuing Organisation",
    year: "[PLACEHOLDER] Year",
    description: "[PLACEHOLDER] Brief description of this achievement.",
  },
  {
    title: "[PLACEHOLDER] Award or Achievement",
    organisation: "[PLACEHOLDER] Issuing Organisation",
    year: "[PLACEHOLDER] Year",
    description: "[PLACEHOLDER] Brief description of this achievement.",
  },
];

export default function ExperiencePage() {
  return (
    <div className="bg-ink">
      {/* ── Hero ── */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <Reveal>
            <p className="mb-6 text-xs uppercase tracking-editorial text-gold">
              Experience
            </p>
            <h1 className="font-serif text-5xl leading-[0.95] tracking-tight sm:text-7xl">
              Work &amp; Projects
            </h1>
            <p className="mt-6 max-w-xl text-mute">
              A record of professional roles, independent projects, and notable
              achievements.
            </p>
          </Reveal>
          <p className="mt-4 text-xs text-mute">
            ⚠ All entries are placeholders — replace with real content before publishing.
          </p>
        </div>
      </section>

      {/* ── Professional Experience ── */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <Reveal>
            <p className="mb-4 text-xs uppercase tracking-editorial text-gold">
              Professional
            </p>
            <h2 className="mb-16 font-serif text-4xl tracking-tight sm:text-5xl">
              Work History
            </h2>
          </Reveal>
          <div className="space-y-px border border-line bg-line">
            {experience.map((exp, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <article className="bg-card p-8">
                  <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="font-serif text-2xl text-paper">
                        {exp.role}
                      </h3>
                      <p className="mt-1 text-gold">{exp.company}</p>
                    </div>
                    <div className="flex flex-col items-start gap-1 sm:items-end">
                      <span className="bg-line px-3 py-1 text-xs uppercase tracking-widest text-mute">
                        {exp.dateRange}
                      </span>
                      <span className="text-xs text-mute">{exp.location}</span>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {exp.bullets.map((bullet, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-3 text-sm text-mute"
                      >
                        <span
                          className="mt-2 h-px w-4 shrink-0 bg-gold"
                          aria-hidden="true"
                        />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Projects ── */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <Reveal>
            <p className="mb-4 text-xs uppercase tracking-editorial text-gold">
              Projects
            </p>
            <h2 className="mb-16 font-serif text-4xl tracking-tight sm:text-5xl">
              Selected Work
            </h2>
          </Reveal>
          <div className="grid gap-px border border-line bg-line sm:grid-cols-2">
            {projects.map((project, i) => (
              <Reveal key={project.name} delay={i * 0.08}>
                <article className="flex h-full flex-col bg-card p-8">
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <h3 className="font-serif text-xl text-paper">
                      {project.name}
                    </h3>
                    <span className="shrink-0 text-xs text-mute">
                      {project.dateRange}
                    </span>
                  </div>
                  <p className="mb-6 grow text-sm leading-relaxed text-mute">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-line px-3 py-1 text-xs uppercase tracking-widest text-mute"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Achievements ── */}
      <section>
        <div className="mx-auto max-w-7xl px-6 py-24">
          <Reveal>
            <p className="mb-4 text-xs uppercase tracking-editorial text-gold">
              Achievements
            </p>
            <h2 className="mb-16 font-serif text-4xl tracking-tight sm:text-5xl">
              Recognition
            </h2>
          </Reveal>
          <div className="space-y-px border border-line bg-line">
            {achievements.map((a, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <article className="bg-card p-8">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="font-serif text-xl text-paper">
                        {a.title}
                      </h3>
                      <p className="mt-1 text-sm text-mute">{a.organisation}</p>
                    </div>
                    <span className="bg-line px-3 py-1 text-xs uppercase tracking-widest text-mute sm:shrink-0">
                      {a.year}
                    </span>
                  </div>
                  <p className="mt-4 text-sm text-mute">{a.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
