"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, ClipboardList } from "lucide-react";
import { rules, schedules, type RuleStatus } from "@/data/rules";

const STATUS_FILTERS = [
  { id: "all" as const, label: "All Rules" },
  { id: "in_force" as const, label: "In Force Now" },
  { id: "2026" as const, label: "2026" },
  { id: "2027" as const, label: "2027" },
];

// Each status maps onto a brand/status token (tinted bg + border + text-safe color).
const STATUS_COLORS: Record<RuleStatus | "all", { base: string; text: string }> = {
  all:      { base: "var(--muted-foreground)", text: "var(--muted-foreground)" },
  in_force: { base: "var(--success)", text: "var(--success-text)" },
  "2026":   { base: "var(--brand-amber)", text: "var(--brand-amber-text)" },
  "2027":   { base: "var(--brand-teal)", text: "var(--brand-teal-text)" },
};

const tint = (color: string, pct: number) => `color-mix(in srgb, ${color} ${pct}%, transparent)`;

function StatusChip({ status }: { status: RuleStatus }) {
  const c = STATUS_COLORS[status];
  return (
    <span style={{ fontSize: 9, padding: "2px 8px", borderRadius: 999, background: tint(c.base, 12), border: `1px solid ${tint(c.base, 30)}`, color: c.text, fontWeight: 600, whiteSpace: "nowrap", textTransform: status === "in_force" ? "none" : "uppercase" }}>
      {status === "in_force" ? "In Force" : status}
    </span>
  );
}

const teal = "var(--brand-teal)";
const tealText = "var(--brand-teal-text)";

function ScheduleCard({ sch }: { sch: typeof schedules[0] }) {
  return (
    <div
      style={{ background: "var(--card)", border: "1px solid var(--border)", borderLeft: `3px solid ${teal}`, borderRadius: 16, padding: "20px 24px", marginBottom: 10, display: "flex", gap: 20, alignItems: "flex-start", transition: "all var(--duration-fast) var(--ease-out)" }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = tint(teal, 35); e.currentTarget.style.transform = "translateX(3px)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.transform = "translateX(0)"; }}
    >
      <div className="tabular-nums" style={{ fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 600, color: tealText, background: tint(teal, 8), border: `1px solid ${tint(teal, 20)}`, borderRadius: 12, padding: "8px 14px", whiteSpace: "nowrap", flexShrink: 0, height: "fit-content" }}>
        Schedule {sch.number}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: "var(--foreground)", marginBottom: 5 }}>{sch.title}</div>
        <div style={{ fontSize: 13, color: "var(--muted-foreground)", lineHeight: 1.6 }}>{sch.description}</div>
      </div>
    </div>
  );
}

function RuleCard({ rule }: { rule: typeof rules[0] }) {
  return (
    <div
      style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, padding: "20px 24px", marginBottom: 10, display: "flex", gap: 20, alignItems: "flex-start", transition: "all var(--duration-fast) var(--ease-out)" }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = tint(teal, 35); e.currentTarget.style.transform = "translateX(3px)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.transform = "translateX(0)"; }}
    >
      <div className="tabular-nums" style={{ background: tint(teal, 8), border: `1px solid ${tint(teal, 20)}`, borderRadius: 12, padding: "8px 14px", fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 600, color: tealText, whiteSpace: "nowrap", flexShrink: 0, height: "fit-content" }}>
        R{rule.number}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: "var(--foreground)", marginBottom: 5 }}>{rule.title}</div>
        <div style={{ fontSize: 13, color: "var(--muted-foreground)", lineHeight: 1.6, marginBottom: 10 }}>{rule.description}</div>
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

  const filtered = filter === "all" ? rules : rules.filter((r) => r.status === filter);

  return (
    <div className="min-h-dvh">
      {/* Navbar */}
      <nav className="glass" style={{ position: "sticky", top: 0, zIndex: 40, background: "var(--glass-nav)", borderBottom: "1px solid var(--border)", padding: "0 clamp(16px, 4vw, 24px)", height: 56, display: "flex", alignItems: "center", gap: 12 }}>
        <Link href="/" className="hover:text-foreground" style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--muted-foreground)", textDecoration: "none", fontSize: 13, transition: "color 0.2s" }}>
          <ArrowLeft size={14} /> Home
        </Link>
        <span style={{ color: "var(--muted-foreground)" }}>/</span>
        <span style={{ fontSize: 13, color: tealText, fontWeight: 600 }}>DPDP Rules 2025</span>
        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }} className="max-sm:hidden">
          {["India", "2025", "23 Rules"].map((t) => (
            <span key={t} style={{ fontSize: 10, padding: "3px 10px", borderRadius: 20, background: tint(teal, 8), border: `1px solid ${tint(teal, 20)}`, color: tealText }}>{t}</span>
          ))}
        </div>
      </nav>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "48px clamp(16px, 5vw, 24px) 100px" }}>
        {/* Back to DPDPA banner */}
        {fromUrl && (
          <Link href={fromUrl} style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "10px 16px", borderRadius: 12, marginBottom: 24, background: tint("var(--brand-amber)", 8), border: `1px solid ${tint("var(--brand-amber)", 24)}`, textDecoration: "none", transition: "background 0.2s" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = tint("var(--brand-amber)", 14); }}
            onMouseLeave={(e) => { e.currentTarget.style.background = tint("var(--brand-amber)", 8); }}
          >
            <ArrowLeft size={14} color="var(--brand-amber-text)" />
            <div>
              <div style={{ fontSize: 10, color: "var(--muted-foreground)", marginBottom: 1 }}>Back to DPDPA</div>
              <div style={{ fontSize: 12, color: "var(--brand-amber-text)", fontWeight: 600 }}>{fromTitle ?? "Back to section"}</div>
            </div>
          </Link>
        )}

        {/* Hero */}
        <div className="fade-up" style={{ marginBottom: 40 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 10, letterSpacing: "0.2em", color: tealText, textTransform: "uppercase", fontWeight: 700, marginBottom: 14 }}>
            <ClipboardList size={13} /> Subordinate Legislation
          </div>
          <h1 className="font-display" style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 700, color: "var(--foreground)", lineHeight: 1.12, marginBottom: 16, letterSpacing: "-0.02em" }}>
            Digital Personal Data<br />Protection Rules, 2025
          </h1>
          <p style={{ fontSize: 15, lineHeight: 1.7, color: "var(--muted-foreground)", maxWidth: 600, marginBottom: 20 }}>
            Notified on 13 November 2025 (G.S.R. 846(E)), these 23 rules and 7 schedules specify the implementation mechanisms, timelines, and technical standards under the DPDPA 2023.
          </p>

          {/* Commencement timeline */}
          <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, padding: "20px 28px", marginBottom: 32, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 24 }}>
            {[
              { date: "13 Nov 2025", label: "Rules 1, 2, 17–21", status: "in_force" as RuleStatus },
              { date: "13 Nov 2026", label: "Rule 4 (Consent Manager)", status: "2026" as RuleStatus },
              { date: "13 May 2027", label: "Rules 3–16, 22, 23", status: "2027" as RuleStatus },
            ].map((t) => (
              <div key={t.date} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <StatusChip status={t.status} />
                <div className="font-display tabular-nums" style={{ fontSize: 16, fontWeight: 600, color: "var(--foreground)" }}>{t.date}</div>
                <div style={{ fontSize: 11, color: "var(--muted-foreground)" }}>{t.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Filter tabs */}
        <div className="fade-up-1" style={{ display: "flex", gap: 3, flexWrap: "wrap", background: "var(--card)", border: "1px solid var(--border)", borderRadius: 14, padding: 4, marginBottom: 28 }}>
          {STATUS_FILTERS.map((f) => {
            const active = filter === f.id;
            const c = STATUS_COLORS[f.id];
            return (
              <button
                key={f.id}
                onClick={() => setFilter(f.id as typeof filter)}
                aria-pressed={active}
                style={{ display: "inline-flex", alignItems: "center", padding: "8px 14px", borderRadius: 10, cursor: "pointer", fontSize: 11, fontWeight: 600, letterSpacing: "0.3px", textTransform: "uppercase", border: "none", background: active ? tint(c.base, 14) : "transparent", color: active ? c.text : "var(--muted-foreground)", transition: "all var(--duration-fast) var(--ease-out)" }}
                onMouseEnter={(e) => { if (!active) { e.currentTarget.style.background = "var(--accent)"; e.currentTarget.style.color = "var(--foreground)"; } }}
                onMouseLeave={(e) => { if (!active) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--muted-foreground)"; } }}
              >
                {f.label} {filter === f.id && f.id !== "all" && `(${filtered.length})`}
              </button>
            );
          })}
        </div>

        {/* Rules list */}
        <div style={{ display: "flex", flexDirection: "column", gap: 0, marginBottom: 52 }}>
          {filtered.map((rule, idx) => (
            <div key={rule.id} id={rule.id} className="fade-up" style={{ animationDelay: `${Math.min(idx * 0.03, 0.4)}s`, scrollMarginTop: 80 }}>
              <RuleCard rule={rule} />
            </div>
          ))}
        </div>

        {/* Schedules */}
        <div style={{ marginTop: 48 }}>
          <div className="font-display" style={{ fontSize: 22, fontWeight: 600, color: "var(--foreground)", marginBottom: 8 }}>Schedules</div>
          <p style={{ fontSize: 13, color: "var(--muted-foreground)", marginBottom: 24 }}>
            Seven schedules to the DPDP Rules 2025, specifying Consent Manager conditions, retention periods, child exemptions, and more.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {schedules.map((sch) => <ScheduleCard key={sch.id} sch={sch} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
