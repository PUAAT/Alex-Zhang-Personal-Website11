"use client";

import { useState } from "react";
import { z } from "zod";
import { profile } from "@/data/profile";
import { Mail, Send } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required."),
  email: z.string().min(1, "Email is required.").email("Enter a valid email address."),
  subject: z.string().min(1, "Subject is required."),
  message: z.string().min(20, "Message must be at least 20 characters."),
});

type ContactFields = z.infer<typeof contactSchema>;
type FormStatus = "idle" | "submitting" | "success" | "error";

type FieldErrors = Partial<Record<keyof ContactFields, string>>;

const EMPTY_FORM: ContactFields = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

function InputField({
  id,
  label,
  type = "text",
  value,
  onChange,
  error,
  required,
}: {
  id: keyof ContactFields;
  label: string;
  type?: string;
  value: string;
  onChange: (val: string) => void;
  error?: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="text-xs uppercase tracking-widest text-mute"
      >
        {label}
        {required && (
          <span className="ml-1 text-gold" aria-hidden="true">
            *
          </span>
        )}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className="border border-line bg-surface px-4 py-3 text-sm text-paper placeholder-mute/50 outline-none transition-colors focus:border-gold"
        placeholder={label}
      />
      {error && (
        <p id={`${id}-error`} role="alert" className="text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactForm() {
  const [form, setForm] = useState<ContactFields>(EMPTY_FORM);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");

  function setField(field: keyof ContactFields, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    // Clear error on change
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: FieldErrors = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof ContactFields;
        if (!fieldErrors[field]) fieldErrors[field] = issue.message;
      }
      setErrors(fieldErrors);
      setStatus("idle");
      return;
    }

    // No real backend configured — simulate a submission delay then show success.
    await new Promise<void>((resolve) => setTimeout(resolve, 1000));
    setStatus("success");
    setForm(EMPTY_FORM);
  }

  return (
    <div>
      {/* Contact form */}
      {status === "success" ? (
        <div
          role="status"
          className="flex flex-col items-center gap-4 border border-gold bg-gold/10 px-8 py-12 text-center"
        >
          <Send size={32} className="text-gold" aria-hidden="true" />
          <p className="font-serif text-2xl text-paper">Message Received</p>
          <p className="text-sm text-mute">
            Thank you for reaching out. Alex will get back to you soon.
          </p>
          <button
            onClick={() => setStatus("idle")}
            className="mt-4 border border-gold px-6 py-3 text-xs uppercase tracking-widest text-gold transition-colors hover:bg-gold hover:text-ink"
          >
            Send Another
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <InputField
              id="name"
              label="Name"
              value={form.name}
              onChange={(v) => setField("name", v)}
              error={errors.name}
              required
            />
            <InputField
              id="email"
              label="Email"
              type="email"
              value={form.email}
              onChange={(v) => setField("email", v)}
              error={errors.email}
              required
            />
          </div>

          <InputField
            id="subject"
            label="Subject"
            value={form.subject}
            onChange={(v) => setField("subject", v)}
            error={errors.subject}
            required
          />

          <div className="flex flex-col gap-2">
            <label
              htmlFor="message"
              className="text-xs uppercase tracking-widest text-mute"
            >
              Message{" "}
              <span className="ml-1 text-gold" aria-hidden="true">
                *
              </span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={6}
              value={form.message}
              onChange={(e) => setField("message", e.target.value)}
              required
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "message-error" : undefined}
              placeholder="Your message (minimum 20 characters)"
              className="border border-line bg-surface px-4 py-3 text-sm text-paper placeholder-mute/50 outline-none transition-colors focus:border-gold"
            />
            {errors.message && (
              <p id="message-error" role="alert" className="text-xs text-red-400">
                {errors.message}
              </p>
            )}
          </div>

          {status === "error" && (
            <p role="alert" className="text-sm text-red-400">
              Something went wrong. Please try again later.
            </p>
          )}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="flex items-center gap-3 border border-gold px-8 py-3 text-xs uppercase tracking-widest text-gold transition-colors hover:bg-gold hover:text-ink disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Send size={14} aria-hidden="true" />
            {status === "submitting" ? "Sending…" : "Send Message"}
          </button>
        </form>
      )}

      {/* Email link */}
      <div className="mt-12 border-t border-line pt-10">
        <p className="mb-2 text-xs uppercase tracking-widest text-gold">
          Or email directly
        </p>
        <a
          href={`mailto:${profile.email}`}
          className="flex items-center gap-3 text-paper transition-colors hover:text-gold"
        >
          <Mail size={16} aria-hidden="true" />
          {profile.email}
        </a>
      </div>

      {/* Social links */}
      {profile.social.filter((s) => !s.placeholder).length > 0 && (
        <div className="mt-8 border-t border-line pt-8">
          <p className="mb-4 text-xs uppercase tracking-widest text-gold">
            Socials
          </p>
          <ul className="flex flex-wrap gap-4">
            {profile.social
              .filter((s) => !s.placeholder)
              .map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs uppercase tracking-widest text-mute transition-colors hover:text-gold"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}
