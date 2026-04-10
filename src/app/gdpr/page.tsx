"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronDown, ChevronRight, ExternalLink } from "lucide-react";
import { gdpr } from "@/data/gdpr";

type GdprChapter = typeof gdpr.chapters[0];

function ChapterCard({ chapter }: { chapter: GdprChapter }) {
  const [open, setOpen] = useState(false);
  const color = chapter.color;

  return (
    <div style={{
      background: "#0B1526",
      border: `1px solid ${open ? `${color}44` : "rgba(59,130,246,0.12)"}`,
      borderRadius: 18, overflow: "hidden",
      transition: "border-color 0.3s",
    }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: "100%", background: "none", border: "none", cursor: "pointer",
          padding: "22px 26px",
          display: "flex", alignItems: "center", gap: 16,
          textAlign: "left",
        }}
      >
        <div style={{
          width: 44, height: 44, borderRadius: 14, flexShrink: 0,
          background: `${color}14`, border: `1px solid ${color}44`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "var(--font-mono), monospace", fontSize: 14, fontWeight: 600, color,
        }}>
          {String(chapter.number).padStart(2, "0")}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontFamily: "var(--font-playfair), Georgia, serif",
            fontSize: 17, fontWeight: 700, color: "#F0EAD6", marginBottom: 3,
          }}>
            {chapter.title}
          </div>
          <div style={{ fontFamily: "var(--font-ibm), sans-serif", fontSize: 12, color: "#4B5563" }}>
            {chapter.articleRange} · {chapter.sections.length} section{chapter.sections.length !== 1 ? "s" : ""}
          </div>
        </div>
        <div style={{
          color: open ? color : "#4B5563",
          transform: open ? "rotate(180deg)" : "rotate(0deg)",
          transition: "transform 0.35s, color 0.3s",
        }}>
          <ChevronDown size={17} />
        </div>
      </button>

      <div style={{
        maxHeight: open ? `${chapter.sections.length * 88}px` : "0px",
        overflow: "hidden",
        transition: "max-height 0.45s cubic-bezier(0.22,1,0.36,1)",
      }}>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "6px 0 10px" }}>
          {chapter.sections.map((sec) => {
            const preview = sec.content.replace(/\n/g, " ").slice(0, 100).trim();
            return (
              <Link
                key={sec.id}
                href={`/gdpr/${chapter.id}/${sec.id}`}
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
                  fontSize: 10, color,
                  background: `${color}14`, border: `1px solid ${color}30`,
                  padding: "2px 8px", borderRadius: 6,
                  flexShrink: 0, marginTop: 1, whiteSpace: "nowrap",
                }}>
                  {sec.number}
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontFamily: "var(--font-ibm), sans-serif",
                    fontSize: 13.5, color: "#F0EAD6", fontWeight: 500, marginBottom: 3,
                  }}>
                    {sec.title}
                  </div>
                  <div style={{
                    fontFamily: "var(--font-ibm), sans-serif",
                    fontSize: 11.5, color: "#4B5563", lineHeight: 1.5,
                    overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                  }}>
                    {preview}…
                  </div>
                </div>
                <ChevronRight size={13} color={color} style={{ flexShrink: 0, marginTop: 4 }} />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function GdprPage() {
  const totalSections = gdpr.chapters.reduce((a, c) => a + c.sections.length, 0);

  return (
    <div style={{ minHeight: "100vh" }}>
      <nav style={{
        position: "sticky", top: 0, zIndex: 40,
        background: "rgba(3,7,18,0.92)", backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(59,130,246,0.15)",
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
        <span style={{ fontSize: 13, fontFamily: "var(--font-ibm), sans-serif", color: "#3B82F6", fontWeight: 600 }}>
          GDPR 2016/679
        </span>
        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
          {["EU 🇪🇺", "2018", `${gdpr.chapters.length} Chapters`].map(t => (
            <span key={t} style={{
              fontSize: 10, padding: "3px 10px", borderRadius: 20,
              background: "rgba(59,130,246,0.07)", border: "1px solid rgba(59,130,246,0.2)",
              color: "#3B82F6", fontFamily: "var(--font-ibm), sans-serif",
            }}>{t}</span>
          ))}
        </div>
      </nav>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "48px 24px 100px" }}>
        <div className="fade-up" style={{ marginBottom: 48 }}>
          <div style={{
            fontSize: 10, letterSpacing: "0.28em", color: "#3B82F6",
            fontFamily: "var(--font-ibm), sans-serif", textTransform: "uppercase",
            fontWeight: 700, marginBottom: 14,
          }}>🏛️ The Regulation</div>
          <h1 style={{
            fontFamily: "var(--font-playfair), Georgia, serif",
            fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 700,
            color: "#F0EAD6", lineHeight: 1.15, marginBottom: 16,
          }}>
            General Data Protection<br />Regulation (GDPR)
          </h1>
          <p style={{
            fontFamily: "var(--font-ibm), sans-serif",
            fontSize: 15, lineHeight: 1.75, color: "#94A3B8",
            maxWidth: 580, marginBottom: 24,
          }}>
            The world&apos;s most influential privacy regulation — Regulation (EU) 2016/679 — in
            force across the EU since 25 May 2018. Full text across 99 articles with expert
            commentary and DPDPA cross-references.
          </p>

          <div style={{
            background: "rgba(59,130,246,0.06)", border: "1px solid rgba(59,130,246,0.2)",
            borderRadius: 14, padding: "14px 18px", marginBottom: 24,
            display: "flex", alignItems: "flex-start", gap: 12,
          }}>
            <span style={{ fontSize: 18 }}>🔗</span>
            <div style={{ fontFamily: "var(--font-ibm), sans-serif", fontSize: 13, color: "#94A3B8", lineHeight: 1.6 }}>
              <strong style={{ color: "#3B82F6" }}>DPDPA–GDPR comparison</strong> is embedded throughout this explorer.
              Each section notes the corresponding DPDPA provision and key similarities/differences.
              Click any section to read the full legal text with author commentary.
            </div>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {[
              { t: "EU 🇪🇺", c: "#3B82F6" },
              { t: "In Force 25 May 2018", c: "#059669" },
              { t: `${gdpr.chapters.length} Chapters`, c: "#F59E0B" },
              { t: `${totalSections} Sections`, c: "#7C3AED" },
              { t: "99 Articles", c: "#06B6D4" },
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
          {gdpr.chapters.map((ch, idx) => (
            <div key={ch.id} className="fade-up" style={{ animationDelay: `${idx * 0.07}s` }}>
              <ChapterCard chapter={ch} />
            </div>
          ))}
        </div>

        <div style={{
          marginTop: 48, padding: "20px 24px",
          background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "space-between",
          flexWrap: "wrap", gap: 12,
        }}>
          <div>
            <div style={{ fontFamily: "var(--font-ibm), sans-serif", fontWeight: 600, color: "#F0EAD6", fontSize: 13, marginBottom: 4 }}>
              Official GDPR text
            </div>
            <div style={{ fontFamily: "var(--font-ibm), sans-serif", fontSize: 12, color: "#4B5563" }}>
              Regulation (EU) 2016/679 with 2018 Corrigendum — EUR-Lex
            </div>
          </div>
          <a
            href="https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A02016R0679-20160504"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              padding: "8px 16px", borderRadius: 10,
              background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.2)",
              color: "#3B82F6", fontSize: 12,
              fontFamily: "var(--font-ibm), sans-serif",
              textDecoration: "none", cursor: "pointer",
              transition: "background 0.2s, border-color 0.2s",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = "rgba(59,130,246,0.15)";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(59,130,246,0.4)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = "rgba(59,130,246,0.08)";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(59,130,246,0.2)";
            }}
          >
            <ExternalLink size={12} />
            eur-lex.europa.eu
          </a>
        </div>
      </div>
    </div>
  );
}
