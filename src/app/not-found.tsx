import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Page Not Found",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100svh-4rem)] flex-col items-center justify-center bg-ink px-6 py-24 text-center">
      <p className="mb-4 text-xs uppercase tracking-editorial text-gold">
        Error
      </p>
      <h1 className="font-serif text-[clamp(6rem,20vw,16rem)] leading-none tracking-tight text-paper">
        404
      </h1>
      <p className="mt-6 font-serif text-2xl italic text-mute sm:text-3xl">
        Page Not Found
      </p>
      <p className="mt-4 max-w-sm text-sm text-mute">
        The page you are looking for may have been moved, removed, or never
        existed. Let&apos;s get you back on track.
      </p>
      <Link
        href="/"
        className="mt-10 inline-block border border-gold px-8 py-3 text-xs uppercase tracking-widest text-gold transition-colors hover:bg-gold hover:text-ink"
      >
        Back to Home
      </Link>
    </div>
  );
}
