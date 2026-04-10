"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronDown, ChevronRight } from "lucide-react";
import { dpdpaAct } from "@/data/dpdpa";

type Chapter = typeof dpdpaAct.chapters[0];

const CHAPTER_COLORS = [
  "#F59E0B", "#06B6D4", "#3B82F6", "#7C3AED",
  "#10B981", "#EF4444", "#F97316", "#0EA5E9", "#8B5CF6",
];
const CHAPTER_DIMS = [
  "rgba(245,158,11,0.10)", "rgba(6,182,212,0.10)",
  "rgba(59,130,246,0.10)", "rgba(124,58,237,0.10)",
  "rgba(16,185,129,0.10)", "rgba(239,68,68,0.10)",
  "rgba(249,115,22,0.10)", "rgba(14,165,233,0.10)",
  "rgba(139,92,246,0.10)",
];

function ChapterCard({ chapter, idx }: { chapter: Chapter; idx: number }) {
  const [open, setOpen] = useState(false);
  const color = CHAPTER_COLORS[idx % CHAPTER_COLORS.length];
  const dim = CHAPTER_DIMS[idx % CHAPTER_DIMS.length];

  return (
    <div style={{
      background: "#0B1526",
      border: `1px solid ${open ? `${color}44` : `${color}22`}`,
      borderRadius: 18,
      overflow: "hidden",
      transition: "border-color 0.3s",
    }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: "100%", background: "none", border: "none", cursor: "pointer",
          padding: "24px 28px",
          display: "flex", alignItems: "center", gap: 18,
          textAlign: "left",
        }}
      >
        <div style={{
          width: 44, height: 44, borderRadius: 14, flexShrink: 0,
          background: dim, border: `1px solid ${color}55`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "var(--font-mono), monospace", fontSize: 14, fontWeight: 600, color,
        }}>
          {String(chapter.number).padStart(2, "0")}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontFamily: "var(--font-playfair), Georgia, serif",
            fontSize: 18, fontWeight: 700, color: "#F0EAD6", marginBottom: 4,
          }}>
            {chapter.title}
          </div>
          <div style={{ fontFamily: "var(--font-ibm), sans-serif", fontSize: 13, color: "#4B5563" }}>
            {chapter.sections.length > 0
              ? `§§ ${chapter.sections[0].number}–${chapter.sections[chapter.sections.length - 1].number} · ${chapter.sections.length} section${chapter.sections.length !== 1 ? "s" : ""}`
              : `${chapter.sections.length} sections`}
          </div>
        </div>

        <div style={{
          color: open ? color : "#4B5563",
          transform: open ? "rotate(180deg)" : "rotate(0deg)",
          transition: "transform 0.35s, color 0.3s",
        }}>
          <ChevronDown size={18} />
        </div>
      </button>

      <div style={{
        maxHeight: open ? `${chapter.sections.length * 88}px` : "0px",
        overflow: "hidden",
        transition: "max-height 0.45s cubic-bezier(0.22,1,0.36,1)",
      }}>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "6px 0 10px" }}>
          {chapter.sections.map((section) => {
            const preview = section.content.replace(/\n/g, " ").slice(0, 100).trim();
            return (
              <Link
                key={section.id}
                href={`/dpdpa/${chapter.id}/${section.id}`}
                style={{
                  display: "flex", alignItems: "flex-start", gap: 12,
                  padding: "12px 24px", textDecoration: "none",
                  transition: "background 0.2s",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = `${color}08`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
              >
                <span style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: 10, color: color,
                  background: `${color}14`, border: `1px solid ${color}30`,
                  padding: "2px 8px", borderRadius: 6,
                  flexShrink: 0, marginTop: 1,
                }}>
                  § {section.number}
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontFamily: "var(--font-ibm), sans-serif",
                    fontSize: 13.5, color: "#F0EAD6", fontWeight: 500, marginBottom: 3,
                  }}>
                    {section.title}
                  </div>
                  <div style={{
                    fontFamily: "var(--font-ibm), sans-serif",
                    fontSize: 11.5, color: "#4B5563", lineHeight: 1.5,
                    overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                  }}>
                    {preview}…
                  </div>
                </div>
                <ChevronRight size={14} color={color} style={{ flexShrink: 0, marginTop: 4 }} />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function DpdpaPage() {
  const totalSections = dpdpaAct.chapters.reduce((a, c) => a + c.sections.length, 0);

  return (
    <div style={{ minHeight: "100vh" }}>
      <nav style={{
        position: "sticky", top: 0, zIndex: 40,
        background: "rgba(3,7,18,0.92)", backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(245,158,11,0.12)",
        padding: "0 24px", height: 56,
        display: "flex", alignItems: "center", gap: 12,
      }}>
        <Link href="/" style={{
          display: "flex", alignItems: "center", gap: 6,
          color: "#94A3B8", textDecoration: "none", fontSize: 13,
          fontFamily: "var(--font-ibm), sans-serif", transition: "color 0.2s",
        }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#F0EAD6"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#94A3B8"; }}
        >
          <ArrowLeft size={14} /> Home
        </Link>
        <span style={{ color: "#4B5563" }}>›</span>
        <span style={{ fontSize: 13, fontFamily: "var(--font-ibm), sans-serif", color: "#F59E0B", fontWeight: 600 }}>
          DPDPA 2023
        </span>
        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
          {["India 🇮🇳", "2023", `${dpdpaAct.chapters.length} Chapters`].map(t => (
            <span key={t} style={{
              fontSize: 10, padding: "3px 10px", borderRadius: 20,
              background: "rgba(245,158,11,0.07)", border: "1px solid rgba(245,158,11,0.2)",
              color: "#F59E0B", fontFamily: "var(--font-ibm), sans-serif",
            }}>{t}</span>
          ))}
        </div>
      </nav>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "48px 24px 100px" }}>
        <div className="fade-up" style={{ marginBottom: 48 }}>
          <div style={{
            fontSize: 10, letterSpacing: "0.28em", color: "#F59E0B",
            fontFamily: "var(--font-ibm), sans-serif", textTransform: "uppercase",
            fontWeight: 700, marginBottom: 14,
          }}>⚖️ The Act</div>
          <h1 style={{
            fontFamily: "var(--font-playfair), Georgia, serif",
            fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 700,
            color: "#F0EAD6", lineHeight: 1.15, marginBottom: 16,
          }}>
            Digital Personal Data<br />Protection Act, 2023
          </h1>
          <p style={{
            fontFamily: "var(--font-ibm), sans-serif",
            fontSize: 15, lineHeight: 1.75, color: "#94A3B8",
            maxWidth: 580, marginBottom: 24,
          }}>
            India&apos;s landmark legislation on digital personal data — establishing rights of Data
            Principals, obligations of Data Fiduciaries, and the Data Protection Board of India.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {[
              { t: "India 🇮🇳", c: "#F59E0B" },
              { t: "Enacted 11 Aug 2023", c: "#06B6D4" },
              { t: `${dpdpaAct.chapters.length} Chapters`, c: "#3B82F6" },
              { t: `${totalSections} Sections`, c: "#7C3AED" },
            ].map(p => (
              <span key={p.t} style={{
                fontSize: 11, padding: "5px 14px", borderRadius: 20,
                background: `${p.c}14`, border: `1px solid ${p.c}33`,
                color: p.c, fontFamily: "var(--font-ibm), sans-serif", fontWeight: 500,
              }}>{p.t}</span>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {dpdpaAct.chapters.map((ch, idx) => (
            <div key={ch.id} className="fade-up" style={{ animationDelay: `${idx * 0.08}s` }}>
              <ChapterCard chapter={ch} idx={idx} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
