"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";

const CARDS = [
  {
    href: "/dpdpa",
    icon: "⚖️",
    label: "DPDPA 2023",
    title: "Digital Personal Data Protection Act",
    desc: "India's landmark privacy legislation — governing collection, processing and storage of personal data.",
    region: "India 🇮🇳",
    year: "2023",
    accent: "#F59E0B",
    accentDim: "rgba(245,158,11,0.12)",
    accentBorder: "rgba(245,158,11,0.35)",
    glow: "rgba(245,158,11,0.2)",
    delay: "0.08s",
  },
  {
    href: "/dpdp-rules",
    icon: "📋",
    label: "DPDP Rules 2025",
    title: "Digital Personal Data Protection Rules",
    desc: "Subordinate legislation specifying implementation mechanisms, timelines, and technical standards.",
    region: "India 🇮🇳",
    year: "2025",
    accent: "#06B6D4",
    accentDim: "rgba(6,182,212,0.12)",
    accentBorder: "rgba(6,182,212,0.35)",
    glow: "rgba(6,182,212,0.2)",
    delay: "0.16s",
  },
  {
    href: "/gdpr",
    icon: "🏛️",
    label: "GDPR 2018",
    title: "General Data Protection Regulation",
    desc: "The world's most influential privacy regulation, governing the EU since May 25, 2018.",
    region: "EU 🇪🇺",
    year: "2018",
    accent: "#3B82F6",
    accentDim: "rgba(59,130,246,0.12)",
    accentBorder: "rgba(59,130,246,0.35)",
    glow: "rgba(59,130,246,0.2)",
    delay: "0.24s",
  },
  {
    href: "/notifications",
    icon: "🔔",
    label: "Notifications",
    title: "Official Gazette Notifications",
    desc: "Official Government of India notifications and gazette orders tracking the DPDPA journey.",
    region: "India 🇮🇳",
    year: "2023–",
    accent: "#7C3AED",
    accentDim: "rgba(124,58,237,0.12)",
    accentBorder: "rgba(124,58,237,0.35)",
    glow: "rgba(124,58,237,0.2)",
    delay: "0.32s",
  },
];

const JOURNEY = [
  { icon: "🚀", label: "Start", active: true },
  { icon: "📚", label: "Select Law", active: false },
  { icon: "📖", label: "Chapter", active: false },
  { icon: "🔍", label: "Section", active: false },
  { icon: "💡", label: "Deep Dive", active: false },
];

function SectionCard({ card }: { card: typeof CARDS[0] }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className={`card-${CARDS.indexOf(card) + 1}`}
      style={{ animationDelay: card.delay }}
    >
      <Link
        href={card.href}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "block",
          background: hovered ? "#111f38" : "#0B1526",
          borderTop: `2px solid ${card.accent}`,
          borderRight: `1px solid ${hovered ? card.accentBorder : "rgba(245,158,11,0.15)"}`,
          borderBottom: `1px solid ${hovered ? card.accentBorder : "rgba(245,158,11,0.15)"}`,
          borderLeft: `1px solid ${hovered ? card.accentBorder : "rgba(245,158,11,0.15)"}`,
          borderRadius: 20,
          padding: "28px",
          textDecoration: "none",
          position: "relative",
          overflow: "hidden",
          transform: hovered ? "translateY(-8px)" : "translateY(0)",
          boxShadow: hovered ? `0 20px 60px rgba(0,0,0,0.5), 0 0 40px ${card.glow}` : "0 4px 20px rgba(0,0,0,0.3)",
          transition: "all 0.35s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        {/* Glow orb */}
        <div style={{
          position: "absolute", top: -50, right: -50, width: 160, height: 160,
          borderRadius: "50%", background: `radial-gradient(circle, ${card.accentDim}, transparent 70%)`,
          opacity: hovered ? 1 : 0, transition: "opacity 0.4s",
        }} />

        {/* Top: icon + label */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
          <div style={{
            width: 52, height: 52, borderRadius: 16,
            background: card.accentDim, border: `1px solid ${card.accentBorder}`,
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22,
          }}>
            {card.icon}
          </div>
          <div style={{
            fontSize: 10, fontWeight: 700, letterSpacing: "0.15em",
            color: card.accent, fontFamily: "var(--font-ibm), sans-serif",
            textTransform: "uppercase",
            opacity: hovered ? 1 : 0.8, transition: "opacity 0.3s",
          }}>
            {card.label}
          </div>
        </div>

        {/* Title */}
        <h3 style={{
          fontFamily: "var(--font-playfair), Georgia, serif",
          fontSize: 19, fontWeight: 700, color: "#F0EAD6",
          lineHeight: 1.3, marginBottom: 10,
        }}>
          {card.title}
        </h3>

        {/* Description */}
        <p style={{
          fontFamily: "var(--font-ibm), sans-serif",
          fontSize: 13.5, lineHeight: 1.7, color: "#94A3B8",
          marginBottom: 24,
        }}>
          {card.desc}
        </p>

        {/* Footer */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.06)",
        }}>
          <span style={{
            fontSize: 11, fontWeight: 600, padding: "4px 12px", borderRadius: 20,
            background: card.accentDim, border: `1px solid ${card.accentBorder}`,
            color: card.accent, fontFamily: "var(--font-ibm), sans-serif",
          }}>
            {card.region}
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 12, color: "#4B5563", fontFamily: "var(--font-ibm), sans-serif" }}>
              {card.year}
            </span>
            <div style={{
              width: 24, height: 24, borderRadius: "50%",
              background: hovered ? card.accent : "transparent",
              border: `1px solid ${hovered ? card.accent : "rgba(245,158,11,0.3)"}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.3s",
            }}>
              <ArrowRight size={12} color={hovered ? "#030712" : "#F59E0B"} />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", position: "relative" }}>

      {/* ══════════════ NAVBAR ══════════════ */}
      <Navbar />

      {/* ══════════════ HERO ══════════════ */}
      <section style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "100px 24px 60px", textAlign: "center",
      }}>
        {/* Eyebrow */}
        <div className="fade-up" style={{
          fontSize: 10, fontWeight: 700, letterSpacing: "0.32em",
          color: "#F59E0B", fontFamily: "var(--font-ibm), sans-serif",
          textTransform: "uppercase", marginBottom: 28,
        }}>
          Your Privacy Law Journey
        </div>

        {/* Main title */}
        <h1 className="fade-up-1" style={{
          fontFamily: "var(--font-playfair), Georgia, serif",
          fontSize: "clamp(2.6rem, 7vw, 5.5rem)",
          fontWeight: 700, lineHeight: 1.1,
          color: "#F0EAD6", maxWidth: 820, marginBottom: 24,
        }}>
          Navigate the{" "}
          <span className="shimmer-amber">Digital Privacy</span>
          {" "}Landscape
        </h1>

        {/* Subtitle */}
        <p className="fade-up-2" style={{
          fontFamily: "var(--font-ibm), sans-serif",
          fontSize: 16, lineHeight: 1.75, color: "#94A3B8",
          maxWidth: 520, marginBottom: 52,
        }}>
          A journey-based companion for India&apos;s DPDPA 2023, DPDP Rules 2025,
          and EU GDPR — with expert cross-references and plain-language explanations.
        </p>

        {/* Journey nodes */}
        <div className="fade-up-3" style={{
          display: "flex", alignItems: "center", gap: 0,
          marginBottom: 60, flexWrap: "nowrap",
        }}>
          {JOURNEY.map((node, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center" }}>
              {/* Connector line */}
              {i > 0 && (
                <div style={{
                  width: "clamp(28px, 5vw, 64px)", height: 1,
                  background: i === 1 ? "linear-gradient(90deg,#F59E0B,rgba(245,158,11,0.3))" : "rgba(255,255,255,0.08)",
                }} />
              )}
              {/* Node */}
              <div style={{ textAlign: "center" }}>
                <div
                  className={node.active ? "node-active" : ""}
                  style={{
                    width: node.active ? 52 : 44, height: node.active ? 52 : 44,
                    borderRadius: "50%",
                    background: node.active ? "rgba(245,158,11,0.15)" : "rgba(255,255,255,0.04)",
                    border: `1.5px solid ${node.active ? "#F59E0B" : "rgba(255,255,255,0.1)"}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: node.active ? 22 : 18, marginBottom: 6,
                    transition: "all 0.3s",
                  }}
                >
                  {node.icon}
                </div>
                <div style={{
                  fontSize: 9, fontWeight: 600, letterSpacing: "0.08em",
                  color: node.active ? "#F59E0B" : "#4B5563",
                  fontFamily: "var(--font-ibm), sans-serif",
                  textTransform: "uppercase",
                }}>
                  {node.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA button */}
        <div className="fade-up-4" style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
          <Link href="/dpdpa" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "13px 28px", borderRadius: 40,
            background: "#F59E0B", color: "#030712",
            fontFamily: "var(--font-ibm), sans-serif", fontWeight: 600, fontSize: 14,
            textDecoration: "none", letterSpacing: "0.02em",
            transition: "all 0.25s",
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#FCD34D"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#F59E0B"; }}
          >
            Explore DPDPA 2023 <ArrowRight size={15} />
          </Link>
          <Link href="/gdpr" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "13px 28px", borderRadius: 40,
            background: "transparent", color: "#94A3B8",
            border: "1px solid rgba(255,255,255,0.12)",
            fontFamily: "var(--font-ibm), sans-serif", fontWeight: 500, fontSize: 14,
            textDecoration: "none", letterSpacing: "0.02em",
            transition: "all 0.25s",
          }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.color = "#F0EAD6"; el.style.borderColor = "rgba(255,255,255,0.25)"; }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.color = "#94A3B8"; el.style.borderColor = "rgba(255,255,255,0.12)"; }}
          >
            Compare with GDPR
          </Link>
        </div>
      </section>

      {/* ══════════════ CARDS GRID ══════════════ */}
      <section style={{ padding: "0 24px 100px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 24,
        }}>
          {CARDS.map(card => <SectionCard key={card.href} card={card} />)}
        </div>
      </section>

      {/* ══════════════ FOOTER ══════════════ */}
      <footer style={{
        borderTop: "1px solid rgba(245,158,11,0.08)",
        padding: "24px",
        textAlign: "center",
        fontFamily: "var(--font-ibm), sans-serif",
        fontSize: 12, color: "#4B5563",
      }}>
        Data Crest © 2025 — Educational use only. Not legal advice.
        <span style={{ margin: "0 16px" }}>·</span>
        <Link href="/dpdpa" style={{ color: "inherit", textDecoration: "none" }}>DPDPA</Link>
        <span style={{ margin: "0 8px" }}>·</span>
        <Link href="/gdpr" style={{ color: "inherit", textDecoration: "none" }}>GDPR</Link>
        <span style={{ margin: "0 8px" }}>·</span>
        <Link href="/news" style={{ color: "inherit", textDecoration: "none" }}>News</Link>
      </footer>
    </div>
  );
}

