"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Download, Menu, X } from "lucide-react";
import { profile } from "@/data/profile";

export const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Journey", href: "/journey" },
  { label: "Experience", href: "/experience" },
  { label: "Journal", href: "/journal" },
  { label: "Photography", href: "/photography" },
  { label: "Travel", href: "/travel" },
  { label: "Reading", href: "/reading" },
  { label: "Contact", href: "/contact" },
] as const;

function CvButton() {
  const base =
    "inline-flex items-center gap-2 border px-4 py-2 text-xs uppercase tracking-widest transition-colors";
  if (!profile.cv.available) {
    return (
      <span
        className={`${base} cursor-not-allowed border-line text-mute`}
        title="CV not uploaded yet"
        aria-disabled="true"
      >
        <Download size={14} /> CV unavailable
      </span>
    );
  }
  return (
    <a href={profile.cv.href} download className={`${base} border-gold text-gold hover:bg-gold hover:text-ink`}>
      <Download size={14} /> Download CV
    </a>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line/60 bg-ink/80 backdrop-blur">
      <nav aria-label="Primary" className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="font-serif text-lg tracking-editorial">ALEX ZHANG</Link>

        <ul className="hidden items-center gap-6 xl:flex">
          {NAV_ITEMS.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`text-xs uppercase tracking-widest transition-colors hover:text-gold ${active ? "text-gold" : "text-mute"}`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden xl:block"><CvButton /></div>

        <button
          className="xl:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {open && (
        <div className="fixed inset-0 top-16 bg-ink px-6 py-10 xl:hidden">
          <ul className="space-y-5">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link href={item.href} onClick={() => setOpen(false)} className="font-serif text-4xl hover:text-gold">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-10"><CvButton /></div>
        </div>
      )}
    </header>
  );
}
