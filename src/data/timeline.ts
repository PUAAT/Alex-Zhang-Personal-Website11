import type { Milestone } from "@/types";

// SAMPLE RECORDS ONLY. These are not real events in Alex Zhang's life.
// Replace each entry, set isPlaceholder to false, and keep status "published" to show it.
export const timeline: Milestone[] = [
  {
    id: "sample-1",
    date: "[PLACEHOLDER] Year",
    title: "[PLACEHOLDER] First chapter",
    category: "Education",
    summary: "Sample milestone. Replace with a real education record.",
    details: "Sample detailed content. Describe the experience in your own words.",
    isPlaceholder: true,
    status: "published",
  },
  {
    id: "sample-2",
    date: "[PLACEHOLDER] Year",
    title: "[PLACEHOLDER] Second chapter",
    category: "Professional Experience",
    summary: "Sample milestone. Replace with a real professional record.",
    details: "Sample detailed content.",
    isPlaceholder: true,
    status: "published",
  },
];
