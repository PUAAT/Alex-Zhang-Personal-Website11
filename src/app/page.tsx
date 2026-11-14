import Image from "next/image";
import Link from "next/link";
import { profile } from "@/data/profile";
import { Reveal } from "@/components/animations/Reveal";

export default function HomePage() {
  return (
    <section className="relative mx-auto grid min-h-[calc(100svh-4rem)] max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-[1.3fr_1fr]">
      <Reveal>
        <p className="mb-6 text-xs uppercase tracking-editorial text-gold">{profile.title}</p>
        <h1 className="font-serif text-6xl leading-[0.95] tracking-tight sm:text-8xl xl:text-9xl">ALEX ZHANG</h1>
        <p className="mt-8 font-serif text-2xl italic text-paper sm:text-3xl">{profile.tagline}</p>
        <p className="mt-6 max-w-xl text-mute">{profile.intro}</p>
        <Link
          href="/about"
          className="mt-10 inline-block border border-gold px-8 py-3 text-xs uppercase tracking-widest text-gold transition-colors hover:bg-gold hover:text-ink"
        >
          About me
        </Link>
      </Reveal>
      <Reveal delay={0.2}>
        <div className="relative aspect-[4/5] overflow-hidden border border-line">
          <Image src={profile.portrait.src} alt={profile.portrait.alt} fill priority sizes="(min-width:1024px) 40vw, 90vw" className="object-cover" />
        </div>
        {profile.portrait.isPlaceholder && (
          <p className="mt-2 text-xs text-mute">Placeholder image. Not a photograph of Alex Zhang.</p>
        )}
      </Reveal>
    </section>
  );
}
