export type Status = "draft" | "published";

export interface SocialLink {
  label: string;
  href: string;
  /** Placeholder entries are hidden from the UI until replaced with a real URL. */
  placeholder?: boolean;
}

export interface Profile {
  name: string;
  title: string;
  tagline: string;
  intro: string;
  statement: string;
  email: string;
  portrait: { src: string; alt: string; isPlaceholder: boolean };
  cv: { href: string; available: boolean };
  social: SocialLink[];
}

export type TimelineCategory =
  | "Education"
  | "Professional Experience"
  | "Projects"
  | "Personal Milestones"
  | "Travel Experiences"
  | "Achievements";

export interface Milestone {
  id: string;
  date: string;
  title: string;
  category: TimelineCategory;
  summary: string;
  details: string;
  image?: { src: string; alt: string };
  location?: string;
  /** True for sample data. Must be false before it is shown as a real record. */
  isPlaceholder: boolean;
  status: Status;
}
