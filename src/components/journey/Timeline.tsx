"use client";

import { useState } from "react";
import { timeline } from "@/data/timeline";
import type { TimelineCategory } from "@/types";
import { ChevronDown, ChevronUp } from "lucide-react";

const CATEGORIES: TimelineCategory[] = [
  "Education",
  "Professional Experience",
  "Projects",
  "Personal Milestones",
  "Travel Experiences",
  "Achievements",
];

function categoryColor(cat: TimelineCategory) {
  const map: Record<TimelineCategory, string> = {
    Education: "text-sky-400",
    "Professional Experience": "text-gold",
    Projects: "text-emerald-400",
    "Personal Milestones": "text-violet-400",
    "Travel Experiences": "text-amber-400",
    Achievements: "text-rose-400",
  };
  return map[cat] ?? "text-mute";
}

export function Timeline() {
  const [activeCategories, setActiveCategories] = useState<Set<TimelineCategory>>(
    new Set<TimelineCategory>()
  );
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const published = timeline.filter((m) => m.status === "published");

  const filtered =
    activeCategories.size === 0
      ? published
      : published.filter((m) => activeCategories.has(m.category));

  function toggleCategory(cat: TimelineCategory) {
    setActiveCategories((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  }

  function toggleExpand(id: string) {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div>
      {/* Filter bar */}
      <div className="mb-16 flex flex-wrap gap-3">
        <button
          onClick={() => setActiveCategories(new Set())}
          className={`px-4 py-2 text-xs uppercase tracking-widest transition-colors ${
            activeCategories.size === 0
              ? "bg-gold text-ink"
              : "border border-line text-mute hover:border-gold hover:text-gold"
          }`}
        >
          All
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => toggleCategory(cat)}
            className={`px-4 py-2 text-xs uppercase tracking-widest transition-colors ${
              activeCategories.has(cat)
                ? "bg-gold text-ink"
                : "border border-line text-mute hover:border-gold hover:text-gold"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-mute">No milestones match the selected filter.</p>
      )}

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div
          className="absolute left-4 top-0 h-full w-px bg-line md:left-1/2"
          aria-hidden="true"
        />

        <ol className="space-y-12">
          {filtered.map((milestone, idx) => {
            const isLeft = idx % 2 === 0;
            const expanded = expandedIds.has(milestone.id);

            return (
              <li key={milestone.id} className="relative pl-12 md:pl-0">
                {/* Dot */}
                <div
                  className="absolute left-[10px] top-6 h-3 w-3 -translate-x-1/2 bg-gold md:left-1/2"
                  aria-hidden="true"
                />

                <div
                  className={`md:w-[calc(50%-2rem)] ${
                    isLeft ? "md:ml-auto md:pl-8" : "md:mr-auto md:pr-8 md:text-right"
                  }`}
                >
                  <article className="border border-line bg-card p-6">
                    {/* Category + date */}
                    <div
                      className={`mb-4 flex flex-wrap items-center gap-3 ${
                        isLeft ? "" : "md:flex-row-reverse md:justify-start"
                      }`}
                    >
                      <span
                        className={`text-xs uppercase tracking-widest ${categoryColor(milestone.category)}`}
                      >
                        {milestone.category}
                      </span>
                      <span className="text-xs text-mute">{milestone.date}</span>
                      {milestone.isPlaceholder && (
                        <span className="text-xs text-mute">[PLACEHOLDER]</span>
                      )}
                    </div>

                    <h3 className="mb-3 font-serif text-xl leading-snug text-paper">
                      {milestone.title}
                    </h3>
                    {milestone.location && (
                      <p className="mb-3 text-xs text-mute">{milestone.location}</p>
                    )}
                    <p className="text-sm leading-relaxed text-mute">{milestone.summary}</p>

                    {/* Expand details */}
                    {milestone.details && (
                      <div className="mt-4">
                        <button
                          onClick={() => toggleExpand(milestone.id)}
                          aria-expanded={expanded}
                          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-gold hover:text-paper transition-colors"
                        >
                          {expanded ? (
                            <>
                              Show Less <ChevronUp size={12} />
                            </>
                          ) : (
                            <>
                              Details <ChevronDown size={12} />
                            </>
                          )}
                        </button>
                        {expanded && (
                          <p className="mt-4 text-sm leading-relaxed text-mute border-t border-line pt-4">
                            {milestone.details}
                          </p>
                        )}
                      </div>
                    )}
                  </article>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
