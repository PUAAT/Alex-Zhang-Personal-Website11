import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
  description: "CMS administration — requires Supabase configuration.",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <div className="flex min-h-[calc(100svh-4rem)] items-center justify-center bg-ink px-6 py-24">
      <div className="w-full max-w-md border border-line bg-card p-10">
        {/* Header */}
        <p className="mb-2 text-xs uppercase tracking-editorial text-gold">
          CMS
        </p>
        <h1 className="mb-3 font-serif text-4xl text-paper">
          Admin Dashboard
        </h1>
        <p className="mb-8 text-sm text-mute">
          CMS access requires Supabase configuration. See{" "}
          <code className="rounded bg-line px-1.5 py-0.5 font-mono text-xs text-paper">
            .env.example
          </code>{" "}
          to get started.
        </p>

        {/* Sign-in form UI (non-functional without Supabase) */}
        <AdminLoginForm />
      </div>
    </div>
  );
}

/**
 * Client component is avoided here on purpose — the form is UI-only and
 * shows a banner rather than making real auth requests.
 * We use a standard HTML form with an action to keep it a pure server component.
 */
function AdminLoginForm() {
  return (
    <form
      /* Prevent actual submission — the action '#' keeps it in-page */
      action="#"
      onSubmit={undefined}
      className="space-y-4"
    >
      {/* Backend not configured notice */}
      <div className="border border-gold/40 bg-gold/10 px-4 py-3">
        <p className="text-xs text-gold">
          Backend not configured. Set{" "}
          <code className="font-mono">NEXT_PUBLIC_SUPABASE_URL</code> and
          related env vars to enable authentication.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="admin-email"
          className="text-xs uppercase tracking-widest text-mute"
        >
          Email
        </label>
        <input
          id="admin-email"
          type="email"
          name="email"
          disabled
          placeholder="admin@example.com"
          aria-describedby="admin-notice"
          className="border border-line bg-surface px-4 py-3 text-sm text-mute outline-none cursor-not-allowed opacity-60"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="admin-password"
          className="text-xs uppercase tracking-widest text-mute"
        >
          Password
        </label>
        <input
          id="admin-password"
          type="password"
          name="password"
          disabled
          placeholder="••••••••"
          className="border border-line bg-surface px-4 py-3 text-sm text-mute outline-none cursor-not-allowed opacity-60"
        />
      </div>

      <button
        type="submit"
        disabled
        id="admin-notice"
        className="w-full border border-line px-6 py-3 text-xs uppercase tracking-widest text-mute transition-colors cursor-not-allowed opacity-60"
        title="Configure Supabase to enable sign-in"
      >
        Sign In
      </button>

      <p className="text-xs text-mute">
        To enable the dashboard, configure your Supabase project and add the
        required environment variables. Refer to{" "}
        <code className="font-mono text-xs">.env.example</code> in the project
        root.
      </p>
    </form>
  );
}
