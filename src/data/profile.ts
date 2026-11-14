import type { Profile } from "@/types";

// PLACEHOLDER CONTENT: replace the values marked [PLACEHOLDER] with real information.
// The brand statements below were supplied by Alex Zhang; nothing biographical is invented.
export const profile: Profile = {
  name: "Alex Zhang",
  title: "[PLACEHOLDER] Professional title",
  tagline: "Beyond Work. Beyond Boundaries.",
  statement: "An evolving perspective on work, life, creativity, and the world.",
  intro: "Exploring ideas, building experiences, and documenting the journey along the way.",
  email: "a30497611@gmail.com",
  portrait: {
    src: "/images/profile/portrait-placeholder.svg",
    alt: "Placeholder portrait. Replace with a photograph of Alex Zhang.",
    isPlaceholder: true,
  },
  // Set available: true only after /public/documents/alex-zhang-cv.pdf exists.
  cv: { href: "/documents/alex-zhang-cv.pdf", available: false },
  social: [
    { label: "GitHub", href: "https://github.com/PUAAT", placeholder: false },
    { label: "LinkedIn", href: "#", placeholder: true },
    { label: "Instagram", href: "#", placeholder: true },
  ],
};
