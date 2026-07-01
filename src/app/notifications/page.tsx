"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Bell, Scale, CheckCircle2, ClipboardList, MessageSquare, Clock, type LucideIcon } from "lucide-react";
import { notifications } from "@/data/notifications";

type Filter = "all" | "confirmed" | "anticipated";

const primary = "var(--primary)";
const primaryText = "var(--primary-text)";
const tint = (color: string, pct: number) => `color-mix(in srgb, ${color} ${pct}%, transparent)`;
const dataText = (color: string) => `color-mix(in srgb, ${color} 55%, var(--foreground))`;

const TYPE_ICON: Record<string, LucideIcon> = {
  assent: Scale,
  commencement: CheckCircle2,
  rules: ClipboardList,
  consultation: MessageSquare,
};

export default function NotificationsPage() {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = notifications.filter((n) => {
    if (filter === "confirmed") return !n.anticipated;
    if (filter === "anticipated") return n.anticipated;
    return true;
  });

  return (
    <div className="min-h-dvh">
      {/* Navbar */}
      <nav className="glass" style={{ position: "sticky", top: 0, zIndex: 40, background: "var(--glass-nav)", borderBottom: "1px solid var(--border)", padding: "0 clamp(16px, 4vw, 24px)", height: 56, display: "flex", alignItems: "center", gap: 12 }}>
        <Link href="/" className="hover:text-foreground" style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--muted-foreground)", textDecoration: "none", fontSize: 13, transition: "color 0.2s" }}>
          <ArrowLeft size={14} /> Home
        </Link>
        <span style={{ color: "var(--muted-foreground)" }}>/</span>
        <span style={{ fontSize: 13, color: primaryText, fontWeight: 600 }}>Notifications</span>
        <div style={{ marginLeft: "auto" }}>
          <span style={{ fontSize: 10, padding: "3px 10px", borderRadius: 20, background: tint(primary, 8), border: `1px solid ${tint(primary, 20)}`, color: primaryText }}>India</span>
        </div>
      </nav>

      <div style={{ maxWidth: 800, margin: "0 auto", padding: "48px clamp(16px, 5vw, 24px) 100px" }}>
        {/* Hero */}
        <div className="fade-up" style={{ marginBottom: 40 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 10, letterSpacing: "0.2em", color: primaryText, textTransform: "uppercase", fontWeight: 700, marginBottom: 14 }}>
            <Bell size={13} /> Official Gazette
          </div>
          <h1 className="font-display" style={{ fontSize: "clamp(1.8rem, 5vw, 2.8rem)", fontWeight: 700, color: "var(--foreground)", lineHeight: 1.12, marginBottom: 16, letterSpacing: "-0.02em" }}>
            Official Gazette Notifications
          </h1>
          <p style={{ fontSize: 15, lineHeight: 1.7, color: "var(--muted-foreground)", maxWidth: 580 }}>
            Tracking the DPDPA 2023 journey from Presidential Assent to full enforcement, confirmed notifications and anticipated milestones.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="fade-up-1" style={{ display: "flex", gap: 6, marginBottom: 32 }}>
          {(["all", "confirmed", "anticipated"] as Filter[]).map((f) => {
            const active = filter === f;
            return (
              <button key={f} onClick={() => setFilter(f)} aria-pressed={active} style={{ padding: "8px 16px", borderRadius: 10, border: active ? "none" : `1px solid ${tint(primary, 20)}`, cursor: "pointer", background: active ? primary : tint(primary, 7), color: active ? "var(--primary-foreground)" : primaryText, fontSize: 12, fontWeight: 600, textTransform: "capitalize", transition: "all 0.2s" }}>
                {f}
              </button>
            );
          })}
        </div>

        {/* Timeline */}
        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", left: 19, top: 0, bottom: 0, width: 2, background: tint(primary, 15) }} aria-hidden="true" />

          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {filtered.map((n, idx) => {
              const Icon = TYPE_ICON[n.type] ?? Clock;
              return (
                <div key={n.id} className="fade-up" style={{ animationDelay: `${Math.min(idx * 0.05, 0.4)}s`, display: "flex", gap: 24, paddingBottom: 28, position: "relative" }}>
                  {/* Timeline dot */}
                  <div style={{
                    width: 40, height: 40, borderRadius: "50%", flexShrink: 0,
                    background: n.anticipated ? tint(primary, 10) : "var(--card)",
                    border: `2px solid ${n.anticipated ? tint(primary, 30) : tint(n.badgeColor, 55)}`,
                    color: n.anticipated ? primaryText : dataText(n.badgeColor),
                    display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1, position: "relative",
                  }}>
                    <Icon size={16} />
                  </div>

                  {/* Card */}
                  <div style={{
                    flex: 1,
                    background: "var(--card)",
                    border: `1px solid ${n.anticipated ? tint(primary, 22) : "var(--border)"}`,
                    borderStyle: n.anticipated ? "dashed" : "solid",
                    borderRadius: 16, padding: "20px 22px",
                    opacity: n.anticipated ? 0.78 : 1,
                  }}>
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 10, flexWrap: "wrap" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                        <span style={{ fontSize: 10, padding: "3px 10px", borderRadius: 20, background: tint(n.badgeColor, 12), border: `1px solid ${tint(n.badgeColor, 32)}`, color: dataText(n.badgeColor), fontWeight: 600 }}>
                          {n.badge}
                        </span>
                        {n.anticipated && (
                          <span style={{ fontSize: 9, padding: "2px 8px", borderRadius: 20, background: tint(primary, 10), border: `1px solid ${tint(primary, 25)}`, color: primaryText, fontWeight: 700, letterSpacing: "0.08em" }}>
                            ANTICIPATED
                          </span>
                        )}
                      </div>
                      <span className="tabular-nums" style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--muted-foreground)" }}>{n.date}</span>
                    </div>

                    <h3 style={{ fontSize: 14, fontWeight: 600, color: "var(--foreground)", lineHeight: 1.4, marginBottom: 8 }}>{n.title}</h3>
                    <p style={{ fontSize: 13, lineHeight: 1.65, color: "var(--muted-foreground)", margin: 0 }}>{n.description}</p>

                    {n.reference && (
                      <div style={{ marginTop: 12 }}>
                        <span className="tabular-nums" style={{ fontFamily: "var(--font-mono)", fontSize: 10, padding: "3px 10px", borderRadius: 6, background: "var(--secondary)", border: "1px solid var(--border)", color: "var(--muted-foreground)" }}>
                          {n.reference}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div style={{ marginTop: 8, padding: "16px 20px", background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, display: "flex", gap: 20, flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 20, height: 2, background: tint("var(--brand-amber)", 60) }} />
            <span style={{ fontSize: 11, color: "var(--muted-foreground)" }}>Confirmed</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 20, height: 0, borderTop: `2px dashed ${tint(primary, 55)}` }} />
            <span style={{ fontSize: 11, color: "var(--muted-foreground)" }}>Anticipated (not yet official)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
