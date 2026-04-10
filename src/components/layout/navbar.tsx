"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Bell, Newspaper, User, Star } from "lucide-react";
import { DataCrestLogo } from "@/components/ui/logo";
import { computeScore } from "@/lib/progress";
import { dpdpaAct } from "@/data/dpdpa";
import { gdpr } from "@/data/gdpr";

interface NavbarProps {
  accentColor?: string;
}

function GlobalScoreWidget() {
  const [score, setScore] = useState<number | null>(null);
  const [pct, setPct] = useState(0);
  const [h, setH] = useState(false);

  useEffect(() => {
    const allSections = [
      ...dpdpaAct.chapters.flatMap(c => c.sections),
      ...gdpr.chapters.flatMap(c => c.sections),
    ];
    const { score: s, pct: p } = computeScore(allSections);
    setScore(s);
    setPct(p);

    // Refresh on storage changes (e.g. from another tab or section page)
    const onStorage = () => {
      const { score: s2, pct: p2 } = computeScore(allSections);
      setScore(s2);
      setPct(p2);
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  if (score === null) return null;

  const radius = 10;
  const circ = 2 * Math.PI * radius;
  const dash = circ * pct;

  return (
    <Link
      href="/profile"
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        display: "flex", alignItems: "center", gap: 6, textDecoration: "none",
        padding: "4px 10px 4px 6px", borderRadius: 20,
        border: `1px solid ${h ? "rgba(245,158,11,0.5)" : "rgba(245,158,11,0.2)"}`,
        background: h ? "rgba(245,158,11,0.12)" : "rgba(245,158,11,0.05)",
        transition: "all 0.2s",
      }}
      title="Your learning score"
    >
      <svg width={26} height={26} style={{ transform: "rotate(-90deg)", flexShrink: 0 }}>
        <circle cx={13} cy={13} r={radius} fill="none" stroke="rgba(245,158,11,0.15)" strokeWidth={2.5} />
        <circle cx={13} cy={13} r={radius} fill="none" stroke="#F59E0B" strokeWidth={2.5}
          strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
          style={{ transition: "stroke-dasharray 0.6s ease" }} />
      </svg>
      <span style={{
        fontFamily: "var(--font-mono), monospace", fontSize: 12, fontWeight: 700, color: "#F59E0B",
        lineHeight: 1,
      }}>
        {score}
      </span>
      <Star size={10} color="#F59E0B" fill="#F59E0B" style={{ flexShrink: 0 }} />
    </Link>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const [h, setH] = useState(false);
  return (
    <Link
      href={href}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        padding: "6px 14px", borderRadius: 8, fontSize: 13, fontWeight: 500,
        fontFamily: "var(--font-ibm), sans-serif", letterSpacing: "0.03em",
        color: h ? "#F0EAD6" : "#94A3B8",
        background: h ? "rgba(255,255,255,0.06)" : "transparent",
        textDecoration: "none", transition: "all 0.2s",
      }}
    >
      {children}
    </Link>
  );
}

function IconBtn({ href, icon }: { href: string; icon: React.ReactNode }) {
  const [h, setH] = useState(false);
  return (
    <Link
      href={href}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        width: 36, height: 36, borderRadius: 10, display: "flex",
        alignItems: "center", justifyContent: "center",
        color: h ? "#F0EAD6" : "#4B5563",
        background: h ? "rgba(255,255,255,0.06)" : "transparent",
        textDecoration: "none", transition: "all 0.2s",
      }}
    >
      {icon}
    </Link>
  );
}

export function Navbar({ accentColor = "rgba(245,158,11,0.15)" }: NavbarProps) {
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, height: 64,
      background: "rgba(3,7,18,0.88)", backdropFilter: "blur(20px)",
      borderBottom: `1px solid ${accentColor}`,
    }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto", padding: "0 24px",
        height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <DataCrestLogo size="sm" href="/" showWordmark={true} />

        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
          <NavLink href="/dpdpa">DPDPA</NavLink>
          <NavLink href="/dpdp-rules">Rules</NavLink>
          <NavLink href="/gdpr">GDPR</NavLink>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <GlobalScoreWidget />
          <IconBtn href="/news" icon={<Newspaper size={16} />} />
          <IconBtn href="/notifications" icon={<Bell size={16} />} />
          <IconBtn href="/profile" icon={<User size={16} />} />
          <span style={{
            fontSize: 9, padding: "3px 10px", borderRadius: 20,
            border: "1px solid rgba(245,158,11,0.3)", color: "#F59E0B",
            background: "rgba(245,158,11,0.07)", fontWeight: 700,
            letterSpacing: "0.12em", fontFamily: "var(--font-ibm), sans-serif",
          }}>
            BETA
          </span>
        </div>
      </div>
    </nav>
  );
}

// Default export for backwards compatibility
export default Navbar;
