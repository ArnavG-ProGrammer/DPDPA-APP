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
  in_force: { bg: "rgba(16,185,129,0.12)",  border: "rgba(16,185,129,0.3)", text: "#10B981" },
  "2026":   { bg: "rgba(245,158,11,0.12)", border: "rgba(245,158,11,0.3)", text: "#F59E0B" },
  "2027":   { bg: "rgba(6,182,212,0.12)",  border: "rgba(6,182,212,0.3)", text: "#06B6D4" },
};

function StatusChip({ status }: { status: RuleStatus }) {
  const c = STATUS_COLORS[status];
  return (
    <span style={{
      fontSize: 9,
      padding: "2px 8px",
      borderRadius: "var(--r-full)",
      background: c.bg,
      border: `1px solid ${c.border}`,
      color: c.text,
      fontFamily: "var(--font-ibm), sans-serif",
      fontWeight: 600,
      whiteSpace: "nowrap",
    }}>
      {status === "in_force" ? "In Force" : status}
    </span>
  );
}

function ScheduleCard({ sch }: { sch: typeof schedules[0] }) {
  return (
    <div
      style={{
        background: "var(--bg-2)",
        border: "1px solid var(--border-1)",
        borderLeft: "3px solid var(--teal-3)",
        borderRadius: "var(--r-lg)",
        padding: "20px 24px",
        marginBottom: 10,
        display: "flex",
        gap: 20,
        alignItems: "flex-start",
        transition: "all var(--duration-fast) var(--ease-out)",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--border-2)";
        (e.currentTarget as HTMLElement).style.transform = "translateX(3px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--border-1)";
        (e.currentTarget as HTMLElement).style.transform = "translateX(0)";
      }}
    >
      {/* Schedule badge */}
      <div
        style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: 12,
          fontWeight: 600,
          color: "var(--teal-3)",
          background: "rgba(6,182,212,0.08)",
          border: "1px solid rgba(6,182,212,0.18)",
          borderRadius: "var(--r-md)",
          padding: "8px 14px",
          whiteSpace: "nowrap",
          flexShrink: 0,
          height: "fit-content",
        }}
      >
        Schedule {sch.number}
      </div>

      {/* Schedule content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontFamily: "var(--font-ibm), sans-serif",
            fontSize: 14,
            fontWeight: 600,
            color: "var(--text-0)",
            marginBottom: 5,
          }}
        >
          {sch.title}
        </div>
        <div
          style={{
            fontFamily: "var(--font-ibm), sans-serif",
            fontSize: 13,
            fontWeight: 400,
            color: "var(--text-2)",
            lineHeight: 1.6,
          }}
        >
          {sch.description}
        </div>
      </div>
    </div>
  );
}

function RuleCard({ rule }: { rule: typeof rules[0] }) {
  return (
    <div
      style={{
        background: "var(--bg-2)",
        border: "1px solid var(--border-1)",
        borderRadius: "var(--r-lg)",
        padding: "20px 24px",
        marginBottom: 10,
        display: "flex",
        gap: 20,
        alignItems: "flex-start",
        transition: "all var(--duration-fast) var(--ease-out)",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--border-2)";
        (e.currentTarget as HTMLElement).style.transform = "translateX(3px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--border-1)";
        (e.currentTarget as HTMLElement).style.transform = "translateX(0)";
      }}
    >
      {/* Rule number badge */}
      <div
        style={{
          background: "rgba(6,182,212,0.08)",
          border: "1px solid rgba(6,182,212,0.18)",
          borderRadius: "var(--r-md)",
          padding: "8px 14px",
          fontFamily: "var(--font-mono), monospace",
          fontSize: 12,
          fontWeight: 600,
          color: "var(--teal-3)",
          whiteSpace: "nowrap",
          flexShrink: 0,
          height: "fit-content",
        }}
      >
        R{rule.number}
      </div>

      {/* Rule content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontFamily: "var(--font-ibm), sans-serif",
            fontSize: 14,
            fontWeight: 600,
            color: "var(--text-0)",
            marginBottom: 5,
          }}
        >
          {rule.title}
        </div>
        <div
          style={{
            fontFamily: "var(--font-ibm), sans-serif",
            fontSize: 13,
            fontWeight: 400,
            color: "var(--text-2)",
            lineHeight: 1.6,
            marginBottom: 10,
          }}
        >
          {rule.description}
        </div>
        <StatusChip status={rule.status} />
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
          <div
            style={{
              background: "var(--bg-3)",
              border: "1px solid var(--border-1)",
              borderRadius: "var(--r-lg)",
              padding: "20px 28px",
              marginBottom: 32,
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 24,
            }}
          >
            {[
              { date: "13 Nov 2025", label: "Rules 1, 2, 17–21", status: "in_force" as RuleStatus },
              { date: "13 Nov 2026", label: "Rule 4 (Consent Manager)", status: "2026" as RuleStatus },
              { date: "13 May 2027", label: "Rules 3–16, 22, 23", status: "2027" as RuleStatus },
            ].map((t) => (
              <div key={t.date} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <StatusChip status={t.status} />
                <div
                  style={{
                    fontFamily: "var(--font-playfair), Georgia, serif",
                    fontSize: 16,
                    fontWeight: 600,
                    color: "var(--text-0)",
                  }}
                >
                  {t.date}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-ibm), sans-serif",
                    fontSize: 11,
                    color: "var(--text-3)",
                  }}
                >
                  {t.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Filter tabs */}
        <div
          className="fade-up-1"
          style={{
            display: "flex",
            gap: 3,
            flexWrap: "wrap",
            background: "var(--bg-3)",
            border: "1px solid var(--border-1)",
            borderRadius: "var(--r-lg)",
            padding: 4,
            marginBottom: 28,
          }}
        >
          {STATUS_FILTERS.map((f) => {
            const active = filter === f.id;
            const c = STATUS_COLORS[f.id];
            return (
              <button
                key={f.id}
                onClick={() => setFilter(f.id as typeof filter)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "8px 14px",
                  borderRadius: "var(--r-md)",
                  cursor: "pointer",
                  fontFamily: "var(--font-ibm), sans-serif",
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.3px",
                  textTransform: "uppercase",
                  border: "none",
                  background: active ? c.bg : "transparent",
                  color: active ? c.text : "var(--text-3)",
                  transition: "all var(--duration-fast) var(--ease-out)",
                }}
                onMouseEnter={(e) => {
                  if (!active) {
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)";
                    (e.currentTarget as HTMLElement).style.color = "var(--text-1)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!active) {
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                    (e.currentTarget as HTMLElement).style.color = "var(--text-3)";
                  }
                }}
              >
                {f.label} {filter === f.id && f.id !== "all" && `(${filtered.length})`}
              </button>
            );
          })}
        </div>

        {/* Rules list */}
        <div style={{ display: "flex", flexDirection: "column", gap: 0, marginBottom: 52 }}>
          {filtered.map((rule, idx) => (
            <div key={rule.id} id={rule.id} className="fade-up" style={{ animationDelay: `${idx * 0.04}s`, scrollMarginTop: 80 }}>
              <RuleCard rule={rule} />
            </div>
          ))}
        </div>

        {/* Schedules section */}
        <div style={{ marginTop: 48 }}>
          <div
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontSize: 22,
              fontWeight: 600,
              color: "var(--text-0)",
              marginBottom: 8,
            }}
          >
            Schedules
          </div>
          <p
            style={{
              fontFamily: "var(--font-ibm), sans-serif",
              fontSize: 13,
              color: "var(--text-3)",
              marginBottom: 24,
            }}
          >
            Seven schedules to the DPDP Rules 2025 — specifying Consent Manager conditions, retention periods, child exemptions, and more.
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
