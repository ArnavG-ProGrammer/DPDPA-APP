"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Compass, BookOpen, List, FileText, Lightbulb, Scale, ScrollText, Landmark, Bell, ArrowUpRight } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";

const CARDS = [
  {
    href: "/dpdpa",
    icon: Scale,
    label: "DPDPA 2023",
    title: "Digital Personal Data Protection Act",
    fullName: "India's Digital Personal Data Protection Act",
    region: "India",
    year: "2023",
    accent: "var(--brand-amber)",
    delay: "0.06s",
  },
  {
    href: "/dpdp-rules",
    icon: ScrollText,
    label: "DPDP Rules 2025",
    title: "Digital Personal Data Protection Rules",
    fullName: "Subordinate legislation implementing DPDPA",
    region: "India",
    year: "2025",
    accent: "var(--brand-teal)",
    delay: "0.12s",
  },
  {
    href: "/gdpr",
    icon: Landmark,
    label: "GDPR 2018",
    title: "General Data Protection Regulation",
    fullName: "EU General Data Protection Regulation",
    region: "EU",
    year: "2018",
    accent: "var(--info)",
    delay: "0.18s",
  },
  {
    href: "/notifications",
    icon: Bell,
    label: "Notifications",
    title: "Official Gazette Notifications",
    fullName: "Government of India gazette orders",
    region: "India",
    year: "2023–",
    accent: "var(--primary)",
    delay: "0.24s",
  },
];

const JOURNEY = [
  { icon: Compass, label: "Start", active: true },
  { icon: BookOpen, label: "Select Law", active: false },
  { icon: List, label: "Chapter", active: false },
  { icon: FileText, label: "Section", active: false },
  { icon: Lightbulb, label: "Deep Dive", active: false },
];

function LawCard({ card }: { card: typeof CARDS[0] }) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const Icon = card.icon;
  const tint = (pct: number) => `color-mix(in srgb, ${card.accent} ${pct}%, transparent)`;

  return (
    <div className="fade-up" style={{ animationDelay: card.delay }}>
      <Link
        href={card.href}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { setHovered(false); setPressed(false); }}
        onMouseDown={() => setPressed(true)}
        onMouseUp={() => setPressed(false)}
        style={{
          display: "block",
          background: "var(--card)",
          border: "1px solid var(--border)",
          borderTop: `2px solid ${tint(hovered ? 65 : 40)}`,
          borderRadius: 20,
          padding: 28,
          textDecoration: "none",
          position: "relative",
          overflow: "hidden",
          transform: pressed ? "translateY(-2px)" : hovered ? "translateY(-5px)" : "translateY(0)",
          boxShadow: hovered ? "var(--elevation-lg)" : "var(--elevation-sm)",
          transition: `transform ${pressed ? "80ms" : "var(--duration-base)"} var(--ease-out), box-shadow var(--duration-base) var(--ease-out), border-color var(--duration-base) var(--ease-out)`,
          borderColor: hovered ? tint(40) : "var(--border)",
        }}
      >
        {/* Decorative background icon */}
        <div style={{ position: "absolute", bottom: -10, right: -10, width: 80, height: 80, opacity: 0.05, pointerEvents: "none", color: card.accent }} aria-hidden="true">
          <Icon size={80} strokeWidth={1.5} />
        </div>

        {/* Top-right arrow */}
        <div
          style={{
            position: "absolute", top: 22, right: 22, color: "var(--muted-foreground)",
            transition: "transform var(--duration-fast) var(--ease-out)",
            transform: hovered ? "translate(3px, -3px)" : "translate(0, 0)",
          }}
          aria-hidden="true"
        >
          <ArrowUpRight size={16} />
        </div>

        <div style={{ position: "relative", zIndex: 1 }}>
          {/* Icon tile */}
          <div
            style={{
              width: 44, height: 44, borderRadius: 12,
              background: `linear-gradient(135deg, ${tint(14)}, ${tint(5)})`,
              border: `1px solid ${tint(24)}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              marginBottom: 18,
            }}
          >
            <Icon size={20} color={card.accent} strokeWidth={1.75} />
          </div>

          {/* Label */}
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: card.accent, marginBottom: 8 }}>
            {card.label}
          </div>

          {/* Title */}
          <h3 className="font-display" style={{ fontSize: 20, fontWeight: 600, color: "var(--foreground)", lineHeight: 1.25, marginBottom: 10 }}>
            {card.title}
          </h3>

          {/* Subtitle */}
          <p style={{ fontSize: 12.5, color: "var(--muted-foreground)", lineHeight: 1.5, marginBottom: 20 }}>
            {card.fullName}
          </p>

          {/* Footer */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
            <span
              style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                padding: "4px 10px", background: tint(8), border: `1px solid ${tint(22)}`,
                borderRadius: 999, fontSize: 11, fontWeight: 600, color: card.accent, whiteSpace: "nowrap",
              }}
            >
              <span aria-hidden="true">{card.region === "India" ? "🇮🇳" : "🇪🇺"}</span> {card.region}
            </span>
            <span className="tabular-nums" style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 500, color: "var(--muted-foreground)", whiteSpace: "nowrap" }}>
              {card.year}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default function Home() {
  return (
    <div className="relative min-h-dvh">
      <Navbar />

      {/* HERO */}
      <section
        className="mx-auto flex min-h-[calc(100dvh-3.5rem)] max-w-[1080px] flex-col items-center justify-center text-center"
        style={{ padding: "clamp(48px, 8vw, 72px) clamp(24px, 5vw, 48px) 48px" }}
      >
        {/* Eyebrow */}
        <div className="fade-up mb-5 flex items-center justify-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
          <span className="inline-block h-px w-7 bg-primary" aria-hidden="true" />
          Your Privacy Law Journey
          <span className="inline-block h-px w-7 bg-primary" aria-hidden="true" />
        </div>

        {/* Heading */}
        <h1 className="fade-up-1 font-display" style={{ fontSize: "clamp(34px, 7vw, 58px)", fontWeight: 700, lineHeight: 1.08, color: "var(--foreground)", marginBottom: 20, letterSpacing: "-0.02em" }}>
          Navigate the{" "}
          <span className="text-amber-gradient" style={{ display: "inline-block" }}>Digital Privacy</span>
          <br />
          Landscape
        </h1>

        {/* Subtitle */}
        <p className="fade-up-2" style={{ fontSize: 16, lineHeight: 1.7, color: "var(--muted-foreground)", maxWidth: 540, marginBottom: 48 }}>
          An interactive journey through India&apos;s Digital Personal Data Protection Act 2023 and the EU GDPR, studied provision by provision, chapter by chapter.
        </p>

        {/* Journey path */}
        <div className="fade-up-3" style={{ display: "flex", alignItems: "flex-start", justifyContent: "center", marginBottom: 56, overflowX: "auto", padding: "8px 0", width: "100%" }}>
          {JOURNEY.map((node, i) => {
            const Icon = node.icon;
            const isCompleted = i === 0;
            const isCurrent = node.active;
            return (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 0 }}>
                {i > 0 && (
                  <div
                    style={{
                      flex: 1, minWidth: 32, maxWidth: 80, height: 2, marginTop: 20,
                      background: isCompleted ? "color-mix(in srgb, var(--primary) 40%, transparent)" : "var(--border)",
                    }}
                    aria-hidden="true"
                  />
                )}
                <div style={{ textAlign: "center", minWidth: "fit-content" }}>
                  <div
                    className={isCurrent ? "node-active" : undefined}
                    style={{
                      width: 42, height: 42, borderRadius: "50%",
                      background: isCurrent ? "color-mix(in srgb, var(--primary) 12%, transparent)" : isCompleted ? "color-mix(in srgb, var(--primary) 7%, transparent)" : "var(--secondary)",
                      border: `1.5px solid ${isCurrent ? "var(--primary)" : isCompleted ? "color-mix(in srgb, var(--primary) 45%, transparent)" : "var(--border)"}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      transition: "all var(--duration-base) var(--ease-out)",
                    }}
                  >
                    <Icon size={16} strokeWidth={1.75} color={isCurrent || isCompleted ? "var(--primary)" : "var(--muted-foreground)"} />
                  </div>
                  <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: isCurrent ? "var(--primary)" : "var(--muted-foreground)", marginTop: 8, whiteSpace: "nowrap" }}>
                    {node.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTAs */}
        <div className="fade-up-4 flex flex-wrap justify-center gap-3">
          <Link
            href="/dpdpa"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-md transition-[transform,filter] duration-200 hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring active:translate-y-0"
          >
            Explore DPDPA 2023 <ArrowRight size={16} />
          </Link>
          <Link
            href="/gdpr"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-7 py-3.5 text-sm font-medium text-foreground transition-colors duration-200 hover:bg-accent hover:text-accent-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            Compare with GDPR
          </Link>
        </div>
      </section>

      {/* CARDS */}
      <section className="mx-auto max-w-[1080px]" style={{ padding: "0 clamp(24px, 5vw, 48px) 72px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
          {CARDS.map((card) => <LawCard key={card.href} card={card} />)}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border px-6 py-6 text-center text-xs text-muted-foreground">
        Data Crest © 2025. Educational use only. Not legal advice.
        <span className="mx-4">·</span>
        <Link href="/dpdpa" className="transition-colors hover:text-foreground">DPDPA</Link>
        <span className="mx-2">·</span>
        <Link href="/gdpr" className="transition-colors hover:text-foreground">GDPR</Link>
        <span className="mx-2">·</span>
        <Link href="/news" className="transition-colors hover:text-foreground">News</Link>
      </footer>
    </div>
  );
}
