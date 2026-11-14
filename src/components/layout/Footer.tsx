import Link from "next/link";
import { profile } from "@/data/profile";

export function Footer() {
  const links = profile.social.filter((s) => !s.placeholder);
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-12 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-serif text-2xl tracking-editorial">ALEX ZHANG</p>
          <p className="mt-2 text-sm text-mute">{profile.statement}</p>
        </div>
        <ul className="flex gap-6 text-xs uppercase tracking-widest text-mute">
          {links.map((l) => (
            <li key={l.label}>
              <a href={l.href} rel="noopener noreferrer" target="_blank" className="hover:text-gold">{l.label}</a>
            </li>
          ))}
          <li><Link href="/contact" className="hover:text-gold">Contact</Link></li>
        </ul>
      </div>
      <p className="border-t border-line py-4 text-center text-xs text-mute">
        © {new Date().getFullYear()} Alex Zhang
      </p>
    </footer>
  );
}
