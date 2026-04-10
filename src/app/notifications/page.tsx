"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notifications } from "@/data/notifications";

type Filter = "all" | "confirmed" | "anticipated";

export default function NotificationsPage() {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = notifications.filter(n => {
    if (filter === "confirmed") return !n.anticipated;
    if (filter === "anticipated") return n.anticipated;
    return true;
  });

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Navbar */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 40,
        background: "rgba(3,7,18,0.92)", backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(124,58,237,0.15)",
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
        <span style={{ fontSize: 13, fontFamily: "var(--font-ibm), sans-serif", color: "#7C3AED", fontWeight: 600 }}>
          Notifications
        </span>
        <div style={{ marginLeft: "auto" }}>
          <span style={{
            fontSize: 10, padding: "3px 10px", borderRadius: 20,
            background: "rgba(124,58,237,0.07)", border: "1px solid rgba(124,58,237,0.2)",
            color: "#7C3AED", fontFamily: "var(--font-ibm), sans-serif",
          }}>India 🇮🇳</span>
        </div>
      </nav>

      <div style={{ maxWidth: 800, margin: "0 auto", padding: "48px 24px 100px" }}>

        {/* Hero */}
        <div className="fade-up" style={{ marginBottom: 40 }}>
          <div style={{
            fontSize: 10, letterSpacing: "0.28em", color: "#7C3AED",
            fontFamily: "var(--font-ibm), sans-serif", textTransform: "uppercase",
            fontWeight: 700, marginBottom: 14,
          }}>🔔 Official Gazette</div>
          <h1 style={{
            fontFamily: "var(--font-playfair), Georgia, serif",
            fontSize: "clamp(1.8rem, 5vw, 2.8rem)", fontWeight: 700,
            color: "#F0EAD6", lineHeight: 1.15, marginBottom: 16,
          }}>
            Official Gazette Notifications
          </h1>
          <p style={{
            fontFamily: "var(--font-ibm), sans-serif",
            fontSize: 15, lineHeight: 1.75, color: "#94A3B8", maxWidth: 560,
          }}>
            Tracking the DPDPA 2023 journey from Presidential Assent to full enforcement —
            confirmed notifications and anticipated milestones.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="fade-up-1" style={{ display: "flex", gap: 6, marginBottom: 32 }}>
          {(["all", "confirmed", "anticipated"] as Filter[]).map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              padding: "8px 16px", borderRadius: 10, border: "none", cursor: "pointer",
              background: filter === f ? "#7C3AED" : "rgba(124,58,237,0.07)",
              color: filter === f ? "#fff" : "#7C3AED",
              fontFamily: "var(--font-ibm), sans-serif", fontSize: 12, fontWeight: 500,
              textTransform: "capitalize", transition: "all 0.2s",
            }}>
              {f}
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div style={{ position: "relative" }}>
          {/* Vertical line */}
          <div style={{
            position: "absolute", left: 19, top: 0, bottom: 0,
            width: 2, background: "rgba(124,58,237,0.15)",
          }} />

          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {filtered.map((n, idx) => (
              <div key={n.id} className="fade-up" style={{
                animationDelay: `${idx * 0.06}s`,
                display: "flex", gap: 24, paddingBottom: 28,
                position: "relative",
              }}>
                {/* Timeline dot */}
                <div style={{
                  width: 40, height: 40, borderRadius: "50%", flexShrink: 0,
                  background: n.anticipated ? "rgba(124,58,237,0.1)" : "#0B1526",
                  border: `2px solid ${n.anticipated ? "rgba(124,58,237,0.3)" : n.badgeColor}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 14, zIndex: 1,
                  position: "relative",
                }}>
                  {n.type === "assent" ? "⚖️" : n.type === "commencement" ? "✅" : n.type === "rules" ? "📋" : n.type === "consultation" ? "💬" : "⏳"}
                </div>

                {/* Card */}
                <div style={{
                  flex: 1,
                  background: "#0B1526",
                  border: `1px solid ${n.anticipated ? "rgba(124,58,237,0.2)" : "rgba(245,158,11,0.12)"}`,
                  borderStyle: n.anticipated ? "dashed" : "solid",
                  borderRadius: 16, padding: "20px 22px",
                  opacity: n.anticipated ? 0.7 : 1,
                  transition: "opacity 0.2s",
                }}>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 10, flexWrap: "wrap" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                      <span style={{
                        fontSize: 10, padding: "3px 10px", borderRadius: 20,
                        background: `${n.badgeColor}14`, border: `1px solid ${n.badgeColor}33`,
                        color: n.badgeColor, fontFamily: "var(--font-ibm), sans-serif", fontWeight: 600,
                      }}>
                        {n.badge}
                      </span>
                      {n.anticipated && (
                        <span style={{
                          fontSize: 9, padding: "2px 8px", borderRadius: 20,
                          background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.25)",
                          color: "#7C3AED", fontFamily: "var(--font-ibm), sans-serif", fontWeight: 700,
                          letterSpacing: "0.08em",
                        }}>
                          ANTICIPATED
                        </span>
                      )}
                    </div>
                    <span style={{
                      fontFamily: "var(--font-mono), monospace",
                      fontSize: 11, color: "#4B5563",
                    }}>
                      {n.date}
                    </span>
                  </div>

                  <h3 style={{
                    fontFamily: "var(--font-ibm), sans-serif",
                    fontSize: 14, fontWeight: 600, color: "#F0EAD6",
                    lineHeight: 1.4, marginBottom: 8,
                  }}>
                    {n.title}
                  </h3>

                  <p style={{
                    fontFamily: "var(--font-ibm), sans-serif",
                    fontSize: 13, lineHeight: 1.65, color: "#94A3B8", margin: 0,
                  }}>
                    {n.description}
                  </p>

                  {n.reference && (
                    <div style={{ marginTop: 12 }}>
                      <span style={{
                        fontFamily: "var(--font-mono), monospace",
                        fontSize: 10, padding: "3px 10px", borderRadius: 6,
                        background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                        color: "#4B5563",
                      }}>
                        {n.reference}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div style={{
          marginTop: 8, padding: "16px 20px",
          background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 12, display: "flex", gap: 20, flexWrap: "wrap",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 20, height: 1, background: "rgba(245,158,11,0.5)" }} />
            <span style={{ fontFamily: "var(--font-ibm), sans-serif", fontSize: 11, color: "#4B5563" }}>Confirmed</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 20, height: 1, background: "rgba(124,58,237,0.5)", borderTop: "1px dashed rgba(124,58,237,0.5)" }} />
            <span style={{ fontFamily: "var(--font-ibm), sans-serif", fontSize: 11, color: "#4B5563" }}>Anticipated (not yet official)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
