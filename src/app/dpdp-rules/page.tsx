"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, ChevronDown, ChevronRight } from "lucide-react";
import { rules, schedules, type RuleStatus } from "@/data/rules";

const STATUS_FILTERS = [
  { id: "all" as const, label: "All Rules" },
  { id: "in_force" as const, label: "In Force Now" },
  { id: "2026" as const, label: "2026" },
  { id: "2027" as const, label: "2027" },
];

const STATUS_COLORS: Record<RuleStatus | "all", { bg: string; border: string; text: string }> = {
  all:      { bg: "rgba(255,255,255,0.05)", border: "rgba(255,255,255,0.1)", text: "#94A3B8" },
  in_force: { bg: "rgba(5,150,105,0.10)",  border: "rgba(5,150,105,0.3)",  text: "#059669" },
  "2026":   { bg: "rgba(245,158,11,0.10)", border: "rgba(245,158,11,0.3)", text: "#F59E0B" },
  "2027":   { bg: "rgba(6,182,212,0.10)",  border: "rgba(6,182,212,0.3)",  text: "#06B6D4" },
};

function StatusChip({ status }: { status: RuleStatus }) {
  const c = STATUS_COLORS[status];
  return (
    <span style={{
      fontSize: 10, padding: "2px 10px", borderRadius: 20,
      background: c.bg, border: `1px solid ${c.border}`, color: c.text,
      fontFamily: "var(--font-ibm), sans-serif", fontWeight: 600,
      whiteSpace: "nowrap",
    }}>
      {status === "in_force" ? "✓ In Force" : `⏳ ${status}`}
    </span>
  );
}

function ScheduleCard({ sch }: { sch: typeof schedules[0] }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{
      background: "#0B1526",
      border: `1px solid ${open ? "rgba(124,58,237,0.3)" : "rgba(124,58,237,0.12)"}`,
      borderRadius: 14, overflow: "hidden",
      transition: "border-color 0.3s",
    }}>
      <button onClick={() => setOpen(o => !o)} style={{
        width: "100%", background: "none", border: "none", cursor: "pointer",
        padding: "18px 22px",
        display: "flex", alignItems: "center", gap: 12, textAlign: "left",
      }}>
        <span style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: 10, padding: "3px 10px", borderRadius: 8,
          background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.3)",
          color: "#7C3AED", flexShrink: 0,
        }}>
          {sch.number}
        </span>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: "var(--font-ibm), sans-serif", fontSize: 13.5, fontWeight: 600, color: "#F0EAD6", marginBottom: 2 }}>
            {sch.title}
          </div>
          <div style={{ fontFamily: "var(--font-ibm), sans-serif", fontSize: 11.5, color: "#4B5563" }}>
            {sch.description}
          </div>
        </div>
        <div style={{ color: open ? "#7C3AED" : "#4B5563", transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s, color 0.3s" }}>
          <ChevronDown size={16} />
        </div>
      </button>
      <div style={{
        maxHeight: open ? "2000px" : "0px",
        overflow: "hidden",
        transition: "max-height 0.5s cubic-bezier(0.22,1,0.36,1)",
      }}>
        <pre style={{
          fontFamily: "var(--font-ibm), sans-serif",
          fontSize: 13, lineHeight: 1.85, color: "#94A3B8",
          whiteSpace: "pre-wrap", margin: 0,
          padding: "20px 22px",
          borderTop: "1px solid rgba(124,58,237,0.1)",
          background: "rgba(124,58,237,0.03)",
        }}>
          {sch.content}
        </pre>
      </div>
    </div>
  );
}

function RuleCard({ rule }: { rule: typeof rules[0] }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{
      background: "#0B1526",
      border: `1px solid ${open ? "rgba(6,182,212,0.3)" : "rgba(6,182,212,0.12)"}`,
      borderRadius: 16, overflow: "hidden",
      transition: "border-color 0.3s",
    }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: "100%", background: "none", border: "none", cursor: "pointer",
          padding: "20px 24px",
          display: "flex", alignItems: "flex-start", gap: 14,
          textAlign: "left",
        }}
      >
        {/* Rule number */}
        <div style={{
          width: 40, height: 40, borderRadius: 12, flexShrink: 0,
          background: "rgba(6,182,212,0.10)", border: "1px solid rgba(6,182,212,0.3)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "var(--font-mono), monospace", fontSize: 12, fontWeight: 700,
          color: "#06B6D4",
        }}>
          R{rule.number}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5, flexWrap: "wrap" }}>
            <span style={{
              fontFamily: "var(--font-ibm), sans-serif",
              fontSize: 14.5, fontWeight: 600, color: "#F0EAD6",
            }}>
              Rule {rule.number}: {rule.title}
            </span>
          </div>
          <div style={{ fontFamily: "var(--font-ibm), sans-serif", fontSize: 12.5, color: "#4B5563", lineHeight: 1.5, marginBottom: 8 }}>
            {rule.description}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <StatusChip status={rule.status} />
            <span style={{ fontSize: 10, color: "#4B5563", fontFamily: "var(--font-ibm), sans-serif" }}>
              {rule.inForceDate}
            </span>
            {rule.scheduleRef && (
              <span style={{
                fontSize: 10, padding: "2px 8px", borderRadius: 6,
                background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.2)",
                color: "#7C3AED", fontFamily: "var(--font-ibm), sans-serif",
              }}>
                📎 {rule.scheduleRef}
              </span>
            )}
          </div>
        </div>

        <div style={{
          color: open ? "#06B6D4" : "#4B5563",
          transform: open ? "rotate(180deg)" : "rotate(0deg)",
          transition: "transform 0.35s, color 0.3s", marginTop: 2,
        }}>
          <ChevronDown size={17} />
        </div>
      </button>

      {/* Full text */}
      <div style={{
        maxHeight: open ? "1200px" : "0px",
        overflow: "hidden",
        transition: "max-height 0.5s cubic-bezier(0.22,1,0.36,1)",
      }}>
        <div style={{
          borderTop: "1px solid rgba(6,182,212,0.1)",
          padding: "24px",
          background: "rgba(6,182,212,0.03)",
        }}>
          <pre style={{
            fontFamily: "var(--font-ibm), sans-serif",
            fontSize: 13.5, lineHeight: 1.9, color: "#94A3B8",
            whiteSpace: "pre-wrap", margin: 0,
          }}>
            {rule.content}
          </pre>
        </div>
      </div>
    </div>
  );
}

export default function DpdpRulesPage() {
  const [filter, setFilter] = useState<"all" | RuleStatus>("all");
  const searchParams = useSearchParams();
  const fromUrl = searchParams.get("from");
  const fromTitle = searchParams.get("fromTitle");

  const filtered = filter === "all" ? rules : rules.filter(r => r.status === filter);

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Navbar */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 40,
        background: "rgba(3,7,18,0.92)", backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(6,182,212,0.15)",
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
        <span style={{ fontSize: 13, fontFamily: "var(--font-ibm), sans-serif", color: "#06B6D4", fontWeight: 600 }}>
          DPDP Rules 2025
        </span>
        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
          {["India 🇮🇳", "2025", "23 Rules"].map(t => (
            <span key={t} style={{
              fontSize: 10, padding: "3px 10px", borderRadius: 20,
              background: "rgba(6,182,212,0.07)", border: "1px solid rgba(6,182,212,0.2)",
              color: "#06B6D4", fontFamily: "var(--font-ibm), sans-serif",
            }}>{t}</span>
          ))}
        </div>
      </nav>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "48px 24px 100px" }}>

        {/* Back to DPDPA section banner */}
        {fromUrl && (
          <Link href={fromUrl} style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            padding: "10px 16px", borderRadius: 12, marginBottom: 24,
            background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.2)",
            textDecoration: "none", transition: "background 0.2s",
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(245,158,11,0.12)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(245,158,11,0.06)"; }}
          >
            <ArrowLeft size={13} color="#F59E0B" />
            <div>
              <div style={{ fontFamily: "var(--font-ibm), sans-serif", fontSize: 10, color: "#4B5563", marginBottom: 1 }}>
                Back to DPDPA
              </div>
              <div style={{ fontFamily: "var(--font-ibm), sans-serif", fontSize: 12, color: "#F59E0B", fontWeight: 600 }}>
                {fromTitle ?? "Back to section"}
              </div>
            </div>
          </Link>
        )}

        {/* Hero */}
        <div className="fade-up" style={{ marginBottom: 40 }}>
          <div style={{
            fontSize: 10, letterSpacing: "0.28em", color: "#06B6D4",
            fontFamily: "var(--font-ibm), sans-serif", textTransform: "uppercase",
            fontWeight: 700, marginBottom: 14,
          }}>📋 Subordinate Legislation</div>
          <h1 style={{
            fontFamily: "var(--font-playfair), Georgia, serif",
            fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 700,
            color: "#F0EAD6", lineHeight: 1.15, marginBottom: 16,
          }}>
            Digital Personal Data<br />Protection Rules, 2025
          </h1>
          <p style={{
            fontFamily: "var(--font-ibm), sans-serif",
            fontSize: 15, lineHeight: 1.75, color: "#94A3B8",
            maxWidth: 580, marginBottom: 20,
          }}>
            Notified on 13 November 2025 (G.S.R. 846(E)), these 23 rules and 7 schedules specify
            the implementation mechanisms, timelines, and technical standards under the DPDPA 2023.
          </p>

          {/* Commencement timeline */}
          <div style={{
            background: "#0B1526", border: "1px solid rgba(6,182,212,0.15)",
            borderRadius: 16, padding: "20px 24px", marginBottom: 24,
          }}>
            <div style={{
              fontFamily: "var(--font-ibm), sans-serif", fontWeight: 600,
              color: "#06B6D4", fontSize: 12, marginBottom: 14, letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}>
              Commencement Timeline
            </div>
            {[
              { date: "13 Nov 2025", label: "Rules 1, 2 & 17–21", status: "in_force" as RuleStatus },
              { date: "13 Nov 2026", label: "Rule 4 (Consent Manager registration)", status: "2026" as RuleStatus },
              { date: "13 May 2027", label: "Rules 3, 5–16, 22 & 23 (full operational framework)", status: "2027" as RuleStatus },
            ].map(t => (
              <div key={t.date} style={{
                display: "flex", alignItems: "center", gap: 12,
                marginBottom: 10,
              }}>
                <StatusChip status={t.status} />
                <span style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: 11, color: "#4B5563", minWidth: 90,
                }}>{t.date}</span>
                <span style={{ fontFamily: "var(--font-ibm), sans-serif", fontSize: 13, color: "#94A3B8" }}>
                  {t.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Filter tabs */}
        <div className="fade-up-1" style={{
          display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 28,
        }}>
          {STATUS_FILTERS.map(f => {
            const active = filter === f.id;
            const c = STATUS_COLORS[f.id];
            return (
              <button key={f.id} onClick={() => setFilter(f.id as typeof filter)} style={{
                padding: "8px 16px", borderRadius: 10, border: `1px solid ${active ? c.border : "rgba(255,255,255,0.08)"}`,
                background: active ? c.bg : "transparent",
                color: active ? c.text : "#4B5563",
                fontFamily: "var(--font-ibm), sans-serif", fontSize: 12, fontWeight: 500,
                cursor: "pointer", transition: "all 0.2s",
              }}>
                {f.label} {filter === f.id && f.id !== "all" && `(${filtered.length})`}
              </button>
            );
          })}
        </div>

        {/* Rules list */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 52 }}>
          {filtered.map((rule, idx) => (
            <div key={rule.id} id={rule.id} className="fade-up" style={{ animationDelay: `${idx * 0.04}s`, scrollMarginTop: 80 }}>
              <RuleCard rule={rule} />
            </div>
          ))}
        </div>

        {/* Schedules section */}
        <div style={{ marginTop: 48 }}>
          <div style={{
            fontFamily: "var(--font-playfair), Georgia, serif",
            fontSize: 24, fontWeight: 700, color: "#F0EAD6",
            marginBottom: 8,
          }}>
            Schedules
          </div>
          <p style={{
            fontFamily: "var(--font-ibm), sans-serif",
            fontSize: 13.5, color: "#4B5563", marginBottom: 24,
          }}>
            Seven schedules to the DPDP Rules 2025 — specifying Consent Manager conditions,
            retention periods, child exemptions, Board salaries and more.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {schedules.map((sch) => (
              <ScheduleCard key={sch.id} sch={sch} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
