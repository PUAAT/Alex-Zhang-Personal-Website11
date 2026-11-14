import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { Reveal } from "@/components/animations/Reveal";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Alex Zhang.",
};

export default function ContactPage() {
  return (
    <div className="bg-ink">
      {/* ── Hero ── */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <Reveal>
            <p className="mb-6 text-xs uppercase tracking-editorial text-gold">
              Contact
            </p>
            <h1 className="font-serif text-5xl leading-[0.95] tracking-tight sm:text-7xl">
              Get in Touch
            </h1>
            <p className="mt-6 max-w-xl text-mute">
              Whether it is a collaboration, an opportunity, or simply a
              conversation — reach out and Alex will respond.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Form + Info ── */}
      <section>
        <div className="mx-auto grid max-w-7xl gap-16 px-6 py-24 lg:grid-cols-[2fr_1fr]">
          <Reveal>
            <ContactForm />
          </Reveal>

          <Reveal delay={0.15}>
            <aside className="space-y-8">
              <div>
                <p className="mb-3 text-xs uppercase tracking-editorial text-gold">
                  Response time
                </p>
                <p className="text-sm text-mute">
                  Alex typically responds within 2–3 business days.
                </p>
              </div>
              <div>
                <p className="mb-3 text-xs uppercase tracking-editorial text-gold">
                  Best for
                </p>
                <ul className="space-y-2 text-sm text-mute">
                  <li>Collaboration enquiries</li>
                  <li>Speaking or consulting</li>
                  <li>Media &amp; press</li>
                  <li>General introductions</li>
                </ul>
              </div>
            </aside>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
