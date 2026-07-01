"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronDown, ArrowRight, Scale } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { dpdpaAct } from "@/data/dpdpa";

type Chapter = typeof dpdpaAct.chapters[0];

function ChapterCard({ chapter }: { chapter: Chapter }) {
  const [open, setOpen] = useState(false);
  const tint = (pct: number) => `color-mix(in srgb, var(--primary) ${pct}%, transparent)`;

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
      {/* Chapter header */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="group w-full"
        style={{
          background: "transparent",
          border: "none",
          cursor: "pointer",
          padding: "20px 24px",
          display: "flex",
          alignItems: "center",
          gap: 16,
          textAlign: "left",
        }}
      >
        {/* Chapter number badge */}
        <div
          className="tabular-nums"
          style={{
            width: 40, height: 40, borderRadius: 12,
            background: tint(10),
            border: `1px solid ${tint(24)}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "var(--font-mono)", fontSize: 13, fontWeight: 600,
            color: "var(--primary)", flexShrink: 0,
          }}
        >
          {String(chapter.number).padStart(2, "0")}
        </div>

        {/* Chapter info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="font-display" style={{ fontSize: 16, fontWeight: 600, color: "var(--foreground)", marginBottom: 3 }}>
            {chapter.title}
          </div>
          <div style={{ fontSize: 12.5, color: "var(--muted-foreground)" }}>
            {chapter.sections.length > 0
              ? `§§ ${chapter.sections[0].number}–${chapter.sections[chapter.sections.length - 1].number} · ${chapter.sections.length} section${chapter.sections.length !== 1 ? "s" : ""}`
              : `${chapter.sections.length} sections`}
          </div>
        </div>

        {/* Chevron */}
        <div
          style={{
            color: open ? "var(--primary)" : "var(--muted-foreground)",
            transition: "transform var(--duration-base) var(--ease-out), color var(--duration-base) var(--ease-out)",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            flexShrink: 0,
          }}
        >
          <ChevronDown size={16} />
        </div>
      </button>

      {/* Section list */}
      <div
        style={{
          maxHeight: open ? `${chapter.sections.length * 50}px` : "0px",
          overflow: "hidden",
          transition: "max-height 0.45s var(--ease-out)",
        }}
      >
        <div style={{ borderTop: "1px solid var(--border)", background: "color-mix(in srgb, var(--muted) 45%, transparent)" }}>
          {chapter.sections.map((section) => (
            <Link
              key={section.id}
              href={`/dpdpa/${chapter.id}/${section.id}`}
              className="group/row"
              style={{
                display: "flex", alignItems: "center", gap: 14,
                padding: "13px 24px",
                borderBottom: "1px solid var(--border)",
                textDecoration: "none",
                transition: "background var(--duration-fast) var(--ease-out)",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = tint(6); }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
            >
              <div style={{ width: 7, height: 7, borderRadius: "50%", border: `1.5px solid ${tint(55)}`, flexShrink: 0 }} aria-hidden="true" />
              <div className="tabular-nums" style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 500, color: "var(--muted-foreground)", width: 36, flexShrink: 0 }}>
                § {section.number}
              </div>
              <div style={{ fontSize: 13, fontWeight: 500, color: "var(--foreground)", flex: 1 }}>
                {section.title}
              </div>
              <ArrowRight size={14} className="text-muted-foreground transition-transform duration-150 group-hover/row:translate-x-0.5 group-hover/row:text-primary" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function DpdpaPage() {
  const totalSections = dpdpaAct.chapters.reduce((a, c) => a + c.sections.length, 0);

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

        {/* Badge */}
        <div
          className="mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em]"
          style={{ color: "var(--brand-amber-text)", background: "color-mix(in srgb, var(--brand-amber) 10%, transparent)", border: "1px solid color-mix(in srgb, var(--brand-amber) 24%, transparent)" }}
        >
          <Scale size={13} />
          DPDPA 2023
        </div>

        <h1 className="font-display" style={{ fontSize: "clamp(26px, 7vw, 40px)", fontWeight: 700, color: "var(--foreground)", lineHeight: 1.12, letterSpacing: "-0.02em", marginTop: 10 }}>
          Digital Personal Data<br />Protection Act, 2023
        </h1>

        <p style={{ fontSize: 15, color: "var(--muted-foreground)", maxWidth: 620, lineHeight: 1.7, marginTop: 12 }}>
          India&apos;s landmark legislation on digital personal data, establishing rights of Data Principals, obligations of Data Fiduciaries, and the Data Protection Board of India.
        </p>

        {/* Meta row */}
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap", marginTop: 16, fontSize: 12.5, color: "var(--muted-foreground)" }}>
          {["India", "Enacted 11 Aug 2023", `${dpdpaAct.chapters.length} Chapters`, `${totalSections} Sections`].map((m) => (
            <span key={m} className="inline-flex items-center gap-1.5">
              <span style={{ color: "var(--brand-amber)" }} aria-hidden="true">●</span> {m}
            </span>
          ))}
        </div>

        <div style={{ margin: "32px 0 28px", height: 1, background: "linear-gradient(90deg, var(--border), transparent)" }} />
      </section>

      {/* Chapters */}
      <section className="mx-auto max-w-[900px]" style={{ padding: "0 clamp(20px, 5vw, 48px) 64px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {dpdpaAct.chapters.map((ch, idx) => (
            <div key={ch.id} className="fade-up" style={{ animationDelay: `${Math.min(idx * 0.06, 0.4)}s` }}>
              <ChapterCard chapter={ch} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
