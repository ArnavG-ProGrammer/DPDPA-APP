"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Newspaper } from "lucide-react";
import { newsItems, type NewsItem } from "@/data/news";

type Filter = "all" | "dpdpa" | "gdpr" | "both";

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "dpdpa", label: "DPDPA" },
  { id: "gdpr", label: "GDPR" },
  { id: "both", label: "Cross-Jurisdictional" },
];

const amber = "var(--brand-amber)";
const amberText = "var(--brand-amber-text)";
const tint = (color: string, pct: number) => `color-mix(in srgb, ${color} ${pct}%, transparent)`;
// Hue-preserving, theme-safe text color for arbitrary data-driven badge colors.
const dataText = (color: string) => `color-mix(in srgb, ${color} 55%, var(--foreground))`;

function NewsCard({ item }: { item: NewsItem }) {
  return (
    <div
      style={{ background: "var(--card)", border: `1px solid ${item.breaking ? tint(amber, 26) : "var(--border)"}`, borderRadius: 16, padding: "22px 24px", display: "flex", flexDirection: "column", gap: 12, transition: "border-color 0.2s, transform 0.2s, box-shadow 0.2s", height: "100%" }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = item.breaking ? tint(amber, 45) : tint("var(--foreground)", 14); e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "var(--elevation-md)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = item.breaking ? tint(amber, 26) : "var(--border)"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
        {item.breaking && (
          <span style={{ fontSize: 9, padding: "2px 8px", borderRadius: 20, background: tint(amber, 15), border: `1px solid ${tint(amber, 40)}`, color: amberText, fontWeight: 700, letterSpacing: "0.1em" }}>
            BREAKING
          </span>
        )}
        <span style={{ fontSize: 10, padding: "2px 10px", borderRadius: 20, background: tint(item.badgeColor, 12), border: `1px solid ${tint(item.badgeColor, 32)}`, color: dataText(item.badgeColor), fontWeight: 600 }}>
          {item.badge}
        </span>
        <span className="tabular-nums" style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--muted-foreground)", marginLeft: "auto" }}>
          {item.date}
        </span>
      </div>

      <h2 className="font-display" style={{ fontSize: 16, fontWeight: 600, color: "var(--foreground)", lineHeight: 1.35, margin: 0 }}>
        {item.headline}
      </h2>

      <p style={{ fontSize: 13, lineHeight: 1.7, color: "var(--muted-foreground)", margin: 0, flex: 1 }}>
        {item.summary}
      </p>

      <div style={{ display: "flex", alignItems: "center", gap: 6, paddingTop: 10, borderTop: "1px solid var(--border)" }}>
        <span className="tabular-nums" style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--muted-foreground)" }}>Source:</span>
        <span style={{ fontSize: 10, color: "var(--muted-foreground)" }}>{item.source}</span>
      </div>
    </div>
  );
}

export default function NewsPage() {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = newsItems.filter((n) => (filter === "all" ? true : n.category === filter));
  const breaking = filtered.filter((n) => n.breaking);
  const regular = filtered.filter((n) => !n.breaking);

  return (
    <div className="min-h-dvh">
      {/* Navbar */}
      <nav className="glass" style={{ position: "sticky", top: 0, zIndex: 40, background: "var(--glass-nav)", borderBottom: "1px solid var(--border)", padding: "0 clamp(16px, 4vw, 24px)", height: 56, display: "flex", alignItems: "center", gap: 12 }}>
        <Link href="/" className="hover:text-foreground" style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--muted-foreground)", textDecoration: "none", fontSize: 13, transition: "color 0.2s" }}>
          <ArrowLeft size={14} /> Home
        </Link>
        <span style={{ color: "var(--muted-foreground)" }}>/</span>
        <span style={{ fontSize: 13, color: amberText, fontWeight: 600 }}>Privacy News</span>
        <div style={{ marginLeft: "auto" }}>
          <span className="tabular-nums" style={{ fontSize: 10, padding: "3px 10px", borderRadius: 20, background: tint(amber, 8), border: `1px solid ${tint(amber, 20)}`, color: amberText }}>{newsItems.length} Stories</span>
        </div>
      </nav>

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "48px clamp(16px, 5vw, 24px) 100px" }}>
        {/* Hero */}
        <div className="fade-up" style={{ marginBottom: 40 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 10, letterSpacing: "0.2em", color: amberText, textTransform: "uppercase", fontWeight: 700, marginBottom: 14 }}>
            <Newspaper size={13} /> Privacy Intelligence
          </div>
          <h1 className="font-display" style={{ fontSize: "clamp(1.8rem, 5vw, 2.8rem)", fontWeight: 700, color: "var(--foreground)", lineHeight: 1.12, marginBottom: 16, letterSpacing: "-0.02em" }}>
            Privacy Law News &amp;<br />Key Developments
          </h1>
          <p style={{ fontSize: 15, lineHeight: 1.7, color: "var(--muted-foreground)", maxWidth: 580 }}>
            Landmark judgments, enforcement actions, legislative milestones, and regulatory developments across India and the European Union.
          </p>
        </div>

        {/* Filter chips */}
        <div className="fade-up-1" style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 36 }}>
          {FILTERS.map((f) => {
            const active = filter === f.id;
            return (
              <button key={f.id} onClick={() => setFilter(f.id)} aria-pressed={active} style={{ padding: "8px 16px", borderRadius: 10, border: active ? "none" : "1px solid " + tint(amber, 20), cursor: "pointer", background: active ? amber : tint(amber, 7), color: active ? "var(--brand-amber-foreground)" : amberText, fontSize: 12, fontWeight: 600, transition: "all 0.2s" }}>
                {f.label}
                {active && f.id !== "all" && <span style={{ marginLeft: 6, opacity: 0.75 }}>({filtered.length})</span>}
              </button>
            );
          })}
        </div>

        {/* Breaking */}
        {breaking.length > 0 && (
          <div style={{ marginBottom: 40 }}>
            <div style={{ fontSize: 10, letterSpacing: "0.2em", color: amberText, fontWeight: 700, textTransform: "uppercase", marginBottom: 16 }}>Breaking / Featured</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 360px), 1fr))", gap: 16 }}>
              {breaking.map((item, idx) => (
                <div key={item.id} className="fade-up" style={{ animationDelay: `${Math.min(idx * 0.06, 0.4)}s` }}>
                  <NewsCard item={item} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Divider */}
        {breaking.length > 0 && regular.length > 0 && (
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
            <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
            <span style={{ fontSize: 10, color: "var(--muted-foreground)", letterSpacing: "0.15em", textTransform: "uppercase" }}>More Stories</span>
            <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
          </div>
        )}

        {/* Regular */}
        {regular.length > 0 && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))", gap: 14 }}>
            {regular.map((item, idx) => (
              <div key={item.id} className="fade-up" style={{ animationDelay: `${Math.min((breaking.length + idx) * 0.05, 0.4)}s` }}>
                <NewsCard item={item} />
              </div>
            ))}
          </div>
        )}

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "80px 24px", color: "var(--muted-foreground)", fontSize: 14 }}>
            No stories in this category yet.
          </div>
        )}
      </div>
    </div>
  );
}
