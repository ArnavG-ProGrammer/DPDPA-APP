"use client";

/**
 * Internal design-system reference. Not linked from the app.
 * Visualizes the Data Crest token system so the foundation stays visible.
 */

import { useTheme } from "@/contexts/theme";
import { Moon, Sun } from "lucide-react";

const BASE_TOKENS = [
  "background", "foreground", "card", "card-foreground",
  "popover", "popover-foreground", "primary", "primary-foreground",
  "secondary", "secondary-foreground", "muted", "muted-foreground",
  "accent", "accent-foreground", "border", "input", "ring", "destructive",
];

const BRAND_TOKENS = ["brand-teal", "brand-amber", "brand-warm", "success", "warning", "info"];

const TYPE_SCALE: [string, string][] = [
  ["text-5xl", "3rem"], ["text-4xl", "2.25rem"], ["text-3xl", "1.875rem"],
  ["text-2xl", "1.5rem"], ["text-xl", "1.25rem"], ["text-lg", "1.125rem"],
  ["text-base", "1rem"], ["text-sm", "0.875rem"], ["text-xs", "0.75rem"],
];

function Swatch({ token }: { token: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div
        className="h-14 w-full rounded-lg border border-border"
        style={{ background: `var(--${token})` }}
      />
      <code className="text-xs text-muted-foreground">--{token}</code>
    </div>
  );
}

export default function StyleGuide() {
  const { isDark, toggle } = useTheme();

  return (
    <main className="min-h-dvh bg-background text-foreground">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <header className="mb-12 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold">Data Crest — Style Guide</h1>
            <p className="mt-2 text-muted-foreground">
              The single token source, rendered in both themes.
            </p>
          </div>
          <button
            onClick={toggle}
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
            {isDark ? "Light" : "Dark"} mode
          </button>
        </header>

        <section className="mb-14">
          <h2 className="mb-5 text-xl font-semibold">Base tokens</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
            {BASE_TOKENS.map((t) => <Swatch key={t} token={t} />)}
          </div>
        </section>

        <section className="mb-14">
          <h2 className="mb-5 text-xl font-semibold">Brand & status</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {BRAND_TOKENS.map((t) => <Swatch key={t} token={t} />)}
          </div>
        </section>

        <section className="mb-14">
          <h2 className="mb-5 text-xl font-semibold">Type scale (Poppins display / Inter body)</h2>
          <div className="space-y-3">
            {TYPE_SCALE.map(([cls, size]) => (
              <div key={cls} className="flex items-baseline gap-4">
                <code className="w-24 shrink-0 text-xs text-muted-foreground">{cls}</code>
                <span className={`font-display font-semibold ${cls}`}>Aa Privacy</span>
                <span className="text-xs text-muted-foreground">{size}</span>
              </div>
            ))}
            <p className="max-w-[65ch] pt-4 text-base leading-relaxed">
              Body copy set in Inter at 16px with 1.6 line height. Your data protection
              rights, explained simply, chapter by chapter.
            </p>
          </div>
        </section>

        <section className="mb-14">
          <h2 className="mb-5 text-xl font-semibold">Radius & elevation</h2>
          <div className="flex flex-wrap gap-6">
            <div className="flex flex-col items-center gap-2">
              <div className="size-20 rounded-sm border border-border bg-card shadow-md" />
              <code className="text-xs text-muted-foreground">rounded-sm</code>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="size-20 rounded-md border border-border bg-card shadow-md" />
              <code className="text-xs text-muted-foreground">rounded-md</code>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="size-20 rounded-lg border border-border bg-card shadow-md" />
              <code className="text-xs text-muted-foreground">rounded-lg</code>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="size-20 rounded-xl border border-border bg-card shadow-md" />
              <code className="text-xs text-muted-foreground">rounded-xl</code>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="size-20 rounded-xl bg-card shadow-sm" />
              <code className="text-xs text-muted-foreground">shadow-sm</code>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="size-20 rounded-xl bg-card shadow-md" />
              <code className="text-xs text-muted-foreground">shadow-md</code>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="size-20 rounded-xl bg-card shadow-lg" />
              <code className="text-xs text-muted-foreground">shadow-lg</code>
            </div>
          </div>
        </section>

        <section>
          <h2 className="mb-5 text-xl font-semibold">Buttons</h2>
          <div className="flex flex-wrap items-center gap-3">
            <button className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-[transform,background] duration-150 hover:brightness-110 active:scale-[0.98]">
              Primary
            </button>
            <button className="rounded-lg bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition-colors hover:bg-muted">
              Secondary
            </button>
            <button className="rounded-lg px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground">
              Ghost
            </button>
            <button className="rounded-lg bg-brand-amber px-4 py-2 text-sm font-semibold text-brand-amber-foreground transition-[transform] duration-150 active:scale-[0.98]">
              Warm CTA
            </button>
            <button className="rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-2 text-sm font-medium text-destructive transition-colors hover:bg-destructive/20">
              Destructive
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
