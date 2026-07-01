"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronDown, ArrowRight, ExternalLink, Landmark } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { gdpr } from "@/data/gdpr";

type GdprChapter = typeof gdpr.chapters[0];

const ACCENT = "var(--info)";
const ACCENT_TEXT = "var(--info-text)";
const tint = (pct: number) => `color-mix(in srgb, ${ACCENT} ${pct}%, transparent)`;

function ChapterCard({ chapter }: { chapter: GdprChapter }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        background: "var(--card)",
        border: `1px solid ${open ? tint(35) : "var(--border)"}`,
        borderRadius: 16,
        overflow: "hidden",
        transition: "border-color var(--duration-base) var(--ease-out), box-shadow var(--duration-base) var(--ease-out)",
        boxShadow: open ? "var(--elevation-md)" : "none",
      }}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        style={{ width: "100%", background: "transparent", border: "none", cursor: "pointer", padding: "20px 24px", display: "flex", alignItems: "center", gap: 16, textAlign: "left" }}
      >
        <div
          className="tabular-nums"
          style={{
            width: 40, height: 40, borderRadius: 12,
            background: tint(10), border: `1px solid ${tint(24)}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "var(--font-mono)", fontSize: 13, fontWeight: 600, color: ACCENT_TEXT, flexShrink: 0,
          }}
        >
          {String(chapter.number).padStart(2, "0")}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="font-display" style={{ fontSize: 16, fontWeight: 600, color: "var(--foreground)", marginBottom: 3 }}>
            {chapter.title}
          </div>
          <div style={{ fontSize: 12.5, color: "var(--muted-foreground)" }}>
            {chapter.articleRange} · {chapter.sections.length} section{chapter.sections.length !== 1 ? "s" : ""}
          </div>
        </div>

        <div
          style={{
            color: open ? ACCENT_TEXT : "var(--muted-foreground)",
            transition: "transform var(--duration-base) var(--ease-out), color var(--duration-base) var(--ease-out)",
            transform: open ? "rotate(180deg)" : "rotate(0deg)", flexShrink: 0,
          }}
        >
          <ChevronDown size={16} />
        </div>
      </button>

      <div style={{ maxHeight: open ? `${chapter.sections.length * 50}px` : "0px", overflow: "hidden", transition: "max-height 0.45s var(--ease-out)" }}>
        <div style={{ borderTop: "1px solid var(--border)", background: "color-mix(in srgb, var(--muted) 45%, transparent)" }}>
          {chapter.sections.map((sec) => (
            <Link
              key={sec.id}
              href={`/gdpr/${chapter.id}/${sec.id}`}
              className="group/row"
              style={{ display: "flex", alignItems: "center", gap: 14, padding: "13px 24px", borderBottom: "1px solid var(--border)", textDecoration: "none", transition: "background var(--duration-fast) var(--ease-out)" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = tint(6); }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
            >
              <div style={{ width: 7, height: 7, borderRadius: "50%", border: `1.5px solid ${tint(55)}`, flexShrink: 0 }} aria-hidden="true" />
              <div className="tabular-nums" style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 500, color: "var(--muted-foreground)", width: 36, flexShrink: 0 }}>
                {sec.number}
              </div>
              <div style={{ fontSize: 13, fontWeight: 500, color: "var(--foreground)", flex: 1 }}>
                {sec.title}
              </div>
              <ArrowRight size={14} className="text-muted-foreground transition-transform duration-150 group-hover/row:translate-x-0.5 group-hover/row:text-[color:var(--info-text)]" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function GdprPage() {
  const totalSections = gdpr.chapters.reduce((a, c) => a + c.sections.length, 0);

  return (
    <div className="min-h-dvh">
      <Navbar />

      {/* Header */}
      <section className="mx-auto max-w-[900px]" style={{ padding: "48px clamp(20px, 5vw, 48px) 0" }}>
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-1.5 rounded-xl border border-border bg-secondary px-3.5 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <ChevronLeft size={14} />
          Back
        </Link>

        <div
          className="mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em]"
          style={{ color: ACCENT_TEXT, background: tint(9), border: `1px solid ${tint(22)}` }}
        >
          <Landmark size={13} />
          GDPR 2016/679
        </div>

        <h1 className="font-display" style={{ fontSize: "clamp(26px, 7vw, 40px)", fontWeight: 700, color: "var(--foreground)", lineHeight: 1.12, letterSpacing: "-0.02em", marginTop: 10 }}>
          General Data Protection<br />Regulation (GDPR)
        </h1>

        <p style={{ fontSize: 15, color: "var(--muted-foreground)", maxWidth: 620, lineHeight: 1.7, marginTop: 12 }}>
          The world&apos;s most influential privacy regulation, Regulation (EU) 2016/679, in force across the EU since 25 May 2018. Full text across 99 articles with expert commentary and DPDPA cross-references.
        </p>

        <div style={{ display: "flex", gap: 20, flexWrap: "wrap", marginTop: 16, fontSize: 12.5, color: "var(--muted-foreground)" }}>
          {["EU", "In Force 25 May 2018", `${gdpr.chapters.length} Chapters`, `${totalSections} Sections`].map((m) => (
            <span key={m} className="inline-flex items-center gap-1.5">
              <span style={{ color: ACCENT }} aria-hidden="true">●</span> {m}
            </span>
          ))}
        </div>

        <div style={{ margin: "32px 0 28px", height: 1, background: "linear-gradient(90deg, var(--border), transparent)" }} />
      </section>

      {/* Chapters */}
      <section className="mx-auto max-w-[900px]" style={{ padding: "0 clamp(20px, 5vw, 48px) 64px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 40 }}>
          {gdpr.chapters.map((ch, idx) => (
            <div key={ch.id} className="fade-up" style={{ animationDelay: `${Math.min(idx * 0.06, 0.4)}s` }}>
              <ChapterCard chapter={ch} />
            </div>
          ))}
        </div>

        {/* Reference box */}
        <div style={{ padding: "20px 24px", background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div>
            <div style={{ fontWeight: 600, color: "var(--foreground)", fontSize: 13, marginBottom: 4 }}>Official GDPR text</div>
            <div style={{ fontSize: 12, color: "var(--muted-foreground)" }}>Regulation (EU) 2016/679 with 2018 Corrigendum, EUR-Lex</div>
          </div>
          <a
            href="https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A02016R0679-20160504"
            target="_blank"
            rel="noopener noreferrer"
            className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 12, background: tint(9), border: `1px solid ${tint(22)}`, color: ACCENT_TEXT, fontSize: 12, textDecoration: "none", transition: "background 0.2s, border-color 0.2s" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = tint(16); e.currentTarget.style.borderColor = tint(40); }}
            onMouseLeave={(e) => { e.currentTarget.style.background = tint(9); e.currentTarget.style.borderColor = tint(22); }}
          >
            <ExternalLink size={12} />
            eur-lex.europa.eu
          </a>
        </div>
      </section>
    </div>
  );
}
