"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { newsItems, type NewsItem } from "@/data/news";

type Filter = "all" | "dpdpa" | "gdpr" | "both";

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "dpdpa", label: "DPDPA" },
  { id: "gdpr", label: "GDPR" },
  { id: "both", label: "Cross-Jurisdictional" },
];

function NewsCard({ item }: { item: NewsItem }) {
  return (
    <div style={{
      background: "#0B1526",
      border: `1px solid ${item.breaking ? "rgba(245,158,11,0.25)" : "rgba(255,255,255,0.06)"}`,
      borderRadius: 16,
      padding: "22px 24px",
      display: "flex",
      flexDirection: "column",
      gap: 12,
      transition: "border-color 0.2s, transform 0.2s",
      cursor: "default",
      height: "100%",
    }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = item.breaking ? "rgba(245,158,11,0.45)" : "rgba(255,255,255,0.12)";
        el.style.transform = "translateY(-3px)";
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = item.breaking ? "rgba(245,158,11,0.25)" : "rgba(255,255,255,0.06)";
        el.style.transform = "translateY(0)";
      }}
    >
      {/* Top row */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
        {item.breaking && (
          <span style={{
            fontSize: 9, padding: "2px 8px", borderRadius: 20,
            background: "rgba(245,158,11,0.15)", border: "1px solid rgba(245,158,11,0.4)",
            color: "#F59E0B", fontFamily: "var(--font-ibm), sans-serif",
            fontWeight: 700, letterSpacing: "0.1em",
          }}>
            BREAKING
          </span>
        )}
        <span style={{
          fontSize: 10, padding: "2px 10px", borderRadius: 20,
          background: `${item.badgeColor}14`, border: `1px solid ${item.badgeColor}33`,
          color: item.badgeColor, fontFamily: "var(--font-ibm), sans-serif", fontWeight: 600,
        }}>
          {item.badge}
        </span>
        <span style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: 10, color: "#4B5563", marginLeft: "auto",
        }}>
          {item.date}
        </span>
      </div>

      {/* Headline */}
      <h2 style={{
        fontFamily: "var(--font-playfair), Georgia, serif",
        fontSize: 16, fontWeight: 700, color: "#F0EAD6",
        lineHeight: 1.4, margin: 0,
      }}>
        {item.headline}
      </h2>

      {/* Summary */}
      <p style={{
        fontFamily: "var(--font-ibm), sans-serif",
        fontSize: 13, lineHeight: 1.7, color: "#94A3B8",
        margin: 0, flex: 1,
      }}>
        {item.summary}
      </p>

      {/* Source */}
      <div style={{
        display: "flex", alignItems: "center", gap: 6,
        paddingTop: 10, borderTop: "1px solid rgba(255,255,255,0.05)",
      }}>
        <span style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: 10, color: "#4B5563",
        }}>
          Source:
        </span>
        <span style={{
          fontFamily: "var(--font-ibm), sans-serif",
          fontSize: 10, color: "#6B7280",
        }}>
          {item.source}
        </span>
      </div>
    </div>
  );
}

export default function NewsPage() {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = newsItems.filter(n => {
    if (filter === "all") return true;
    return n.category === filter;
  });

  const breaking = filtered.filter(n => n.breaking);
  const regular = filtered.filter(n => !n.breaking);

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Navbar */}
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
          Privacy News
        </span>
        <div style={{ marginLeft: "auto" }}>
          <span style={{
            fontSize: 10, padding: "3px 10px", borderRadius: 20,
            background: "rgba(245,158,11,0.07)", border: "1px solid rgba(245,158,11,0.2)",
            color: "#F59E0B", fontFamily: "var(--font-ibm), sans-serif",
          }}>{newsItems.length} Stories</span>
        </div>
      </nav>

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "48px 24px 100px" }}>

        {/* Hero */}
        <div className="fade-up" style={{ marginBottom: 40 }}>
          <div style={{
            fontSize: 10, letterSpacing: "0.28em", color: "#F59E0B",
            fontFamily: "var(--font-ibm), sans-serif", textTransform: "uppercase",
            fontWeight: 700, marginBottom: 14,
          }}>📰 Privacy Intelligence</div>
          <h1 style={{
            fontFamily: "var(--font-playfair), Georgia, serif",
            fontSize: "clamp(1.8rem, 5vw, 2.8rem)", fontWeight: 700,
            color: "#F0EAD6", lineHeight: 1.15, marginBottom: 16,
          }}>
            Privacy Law News &<br />Key Developments
          </h1>
          <p style={{
            fontFamily: "var(--font-ibm), sans-serif",
            fontSize: 15, lineHeight: 1.75, color: "#94A3B8", maxWidth: 560,
          }}>
            Landmark judgments, enforcement actions, legislative milestones, and regulatory
            developments across India and the European Union.
          </p>
        </div>

        {/* Filter chips */}
        <div className="fade-up-1" style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 36 }}>
          {FILTERS.map(f => (
            <button key={f.id} onClick={() => setFilter(f.id)} style={{
              padding: "8px 16px", borderRadius: 10, border: "none", cursor: "pointer",
              background: filter === f.id ? "#F59E0B" : "rgba(245,158,11,0.07)",
              color: filter === f.id ? "#030712" : "#F59E0B",
              fontFamily: "var(--font-ibm), sans-serif", fontSize: 12, fontWeight: 500,
              transition: "all 0.2s",
            }}>
              {f.label}
              {filter === f.id && f.id !== "all" && (
                <span style={{ marginLeft: 6, opacity: 0.7 }}>({filtered.length})</span>
              )}
            </button>
          ))}
        </div>

        {/* Breaking stories */}
        {breaking.length > 0 && (
          <div style={{ marginBottom: 40 }}>
            <div style={{
              fontSize: 10, letterSpacing: "0.2em", color: "#F59E0B",
              fontFamily: "var(--font-ibm), sans-serif", fontWeight: 700,
              textTransform: "uppercase", marginBottom: 16,
            }}>
              Breaking / Featured
            </div>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))",
              gap: 16,
            }}>
              {breaking.map((item, idx) => (
                <div key={item.id} className="fade-up" style={{ animationDelay: `${idx * 0.07}s` }}>
                  <NewsCard item={item} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Divider */}
        {breaking.length > 0 && regular.length > 0 && (
          <div style={{
            display: "flex", alignItems: "center", gap: 16, marginBottom: 32,
          }}>
            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.05)" }} />
            <span style={{
              fontFamily: "var(--font-ibm), sans-serif",
              fontSize: 10, color: "#4B5563", letterSpacing: "0.15em", textTransform: "uppercase",
            }}>More Stories</span>
            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.05)" }} />
          </div>
        )}

        {/* Regular stories grid */}
        {regular.length > 0 && (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
            gap: 14,
          }}>
            {regular.map((item, idx) => (
              <div key={item.id} className="fade-up" style={{ animationDelay: `${(breaking.length + idx) * 0.06}s` }}>
                <NewsCard item={item} />
              </div>
            ))}
          </div>
        )}

        {filtered.length === 0 && (
          <div style={{
            textAlign: "center", padding: "80px 24px",
            fontFamily: "var(--font-ibm), sans-serif",
            color: "#4B5563", fontSize: 14,
          }}>
            No stories in this category yet.
          </div>
        )}
      </div>
    </div>
  );
}
