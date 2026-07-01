"use client";

import Link from "next/link";
import { ArrowLeft, Clock, Bell, Sparkles } from "lucide-react";
import { DataCrestLogo } from "@/components/ui/logo";

interface ComingSoonPageProps {
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  flag: string;
  accent: "blue" | "emerald";
  features: { icon: string; text: string }[];
}

export function ComingSoonPage({
  title,
  subtitle,
  description,
  icon,
  flag,
  accent,
  features,
}: ComingSoonPageProps) {
  // Map the two legacy accent names onto brand tokens.
  const accentVar = accent === "blue" ? "var(--info)" : "var(--brand-teal)";

  return (
    <div className="relative flex min-h-dvh flex-col bg-background">
      {/* Ambient glow */}
      <div
        className="pointer-events-none fixed left-[10%] top-[-20%] h-[70vh] w-[70vw] rounded-full blur-[140px]"
        style={{ background: `color-mix(in srgb, ${accentVar} 8%, transparent)` }}
        aria-hidden="true"
      />

      {/* Navbar */}
      <nav
        className="glass fixed left-0 right-0 top-0 z-40 h-14 border-b border-border"
        style={{ background: "var(--glass-nav)" }}
      >
        <div className="mx-auto flex h-full max-w-7xl items-center gap-4 px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft className="size-4" />
            Home
          </Link>
          <div className="h-5 w-px bg-border" />
          <DataCrestLogo size="sm" href="/" showWordmark={false} />
          <span className="text-sm font-semibold" style={{ color: accentVar }}>{subtitle}</span>
        </div>
      </nav>

      {/* Content */}
      <div className="flex flex-1 items-center justify-center px-6 pt-20">
        <div className="w-full max-w-xl text-center">
          {/* Decorative hero glyph */}
          <div className="animate-float mb-6 inline-block text-7xl" aria-hidden="true">
            {icon}
          </div>

          {/* Badge */}
          <div
            className="mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-medium"
            style={{
              color: accentVar,
              borderColor: `color-mix(in srgb, ${accentVar} 30%, transparent)`,
              background: `color-mix(in srgb, ${accentVar} 10%, transparent)`,
            }}
          >
            <Clock className="size-3" />
            Coming soon
            <span className="text-base" aria-hidden="true">{flag}</span>
          </div>

          {/* Title */}
          <h1 className="mb-4 font-display text-4xl font-bold leading-tight text-foreground md:text-5xl">
            {title}
          </h1>

          <p className="mb-10 text-base leading-relaxed text-muted-foreground">{description}</p>

          {/* Feature preview */}
          <div
            className="mb-8 rounded-2xl border p-6 text-left"
            style={{
              borderColor: `color-mix(in srgb, ${accentVar} 22%, transparent)`,
              background: `color-mix(in srgb, ${accentVar} 7%, transparent)`,
            }}
          >
            <div className="mb-4 flex items-center gap-2">
              <Sparkles className="size-4" style={{ color: accentVar }} />
              <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: accentVar }}>
                What&apos;s coming
              </span>
            </div>
            <div className="space-y-3">
              {features.map((f) => (
                <div key={f.text} className="flex items-center gap-3">
                  <span className="text-lg" aria-hidden="true">{f.icon}</span>
                  <span className="text-sm text-card-foreground">{f.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Notify button */}
          <button
            className="inline-flex items-center gap-2 rounded-2xl bg-primary px-8 py-4 font-semibold text-primary-foreground shadow-lg transition-[transform,filter] duration-200 hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring active:translate-y-0"
          >
            <Bell className="size-4" />
            Notify me when it&apos;s ready
          </button>

          {/* Back link */}
          <div className="mt-6">
            <Link href="/dpdpa" className="text-sm hover:underline" style={{ color: accentVar }}>
              In the meantime, explore DPDPA 2023
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
