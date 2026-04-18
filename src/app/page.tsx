"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Compass, BookOpen, List, FileText, Lightbulb } from "lucide-react";
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
  { icon: Compass, label: "Start", active: true },
  { icon: BookOpen, label: "Select Law", active: false },
  { icon: List, label: "Chapter", active: false },
  { icon: FileText, label: "Section", active: false },
  { icon: Lightbulb, label: "Deep Dive", active: false },
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
        padding: "clamp(48px, 8vw, 72px) clamp(24px, 5vw, 48px) 48px",
        maxWidth: 1080,
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        minHeight: "100vh",
        justifyContent: "center",
      }}>
        {/* Eyebrow line */}
        <div className="fade-up" style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
          marginBottom: 18,
          fontFamily: "var(--font-ibm), sans-serif",
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "2.5px",
          textTransform: "uppercase",
          color: "var(--amber-4)",
        }}>
          <div style={{
            width: 28,
            height: 1,
            backgroundColor: "var(--amber-4)",
            display: "inline-block",
          }} />
          Your Privacy Law Journey
          <div style={{
            width: 28,
            height: 1,
            backgroundColor: "var(--amber-4)",
            display: "inline-block",
          }} />
        </div>

        {/* Main heading — 3 lines */}
        <h1 className="fade-up-1" style={{
          fontFamily: "var(--font-playfair), Georgia, serif",
          fontSize: "clamp(36px, 7vw, 58px)",
          fontWeight: 400,
          lineHeight: 1.08,
          color: "var(--text-1)",
          marginBottom: 20,
          maxWidth: 1080,
        }}>
          Navigate the
          <div style={{
            background: "linear-gradient(90deg, var(--amber-4) 0%, var(--amber-2) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            fontWeight: 700,
            display: "inline-block",
            marginLeft: 8,
            marginRight: 8,
          }}>
            Digital Privacy
          </div>
          <br />
          Landscape
        </h1>

        {/* Subtitle */}
        <p className="fade-up-2" style={{
          fontFamily: "var(--font-ibm), sans-serif",
          fontSize: 15,
          fontWeight: 400,
          lineHeight: 1.75,
          color: "var(--text-2)",
          maxWidth: 520,
          marginBottom: 48,
        }}>
          An interactive journey through India&apos;s Digital Personal Data Protection Act 2023 and the EU GDPR — studied provision by provision, chapter by chapter.
        </p>

        {/* Journey path */}
        <div className="fade-up-3" style={{
          display: "flex",
          alignItems: "center",
          gap: 0,
          marginBottom: 64,
          overflowX: "auto",
          padding: "8px 0",
          width: "100%",
          justifyContent: "center",
        }}>
          {JOURNEY.map((node, i) => {
            const IconComponent = node.icon;
            const isCompleted = i === 0; // Start is completed
            const isCurrent = node.active;

            return (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 0 }}>
                {/* Connector line before node */}
                {i > 0 && (
                  <div style={{
                    flex: 1,
                    minWidth: 32,
                    maxWidth: 80,
                    height: 1,
                    background: isCompleted
                      ? "rgba(245, 158, 11, 0.4)"
                      : "linear-gradient(90deg, var(--border-2), var(--border-1))",
                    position: "relative",
                    top: -14,
                  }} />
                )}

                {/* Node circle */}
                <div style={{ textAlign: "center", minWidth: "fit-content" }}>
                  <div
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: "50%",
                      background: isCurrent
                        ? "rgba(245,158,11,0.10)"
                        : isCompleted
                          ? "rgba(245,158,11,0.06)"
                          : "var(--bg-3)",
                      border: `1.5px solid ${
                        isCurrent
                          ? "var(--amber-4)"
                          : isCompleted
                            ? "var(--amber-7)"
                            : "var(--border-1)"
                      }`,
                      boxShadow: isCurrent
                        ? "0 0 0 4px rgba(245,158,11,0.08)"
                        : "none",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all var(--duration-base) var(--ease-out)",
                    }}
                  >
                    <IconComponent
                      size={16}
                      strokeWidth={1.5}
                      color={
                        isCurrent
                          ? "var(--amber-4)"
                          : isCompleted
                            ? "var(--amber-5)"
                            : "var(--text-3)"
                      }
                    />
                  </div>

                  {/* Label below circle */}
                  <div
                    style={{
                      fontFamily: "var(--font-ibm), sans-serif",
                      fontSize: 10,
                      fontWeight: 600,
                      letterSpacing: "0.8px",
                      textTransform: "uppercase",
                      color: isCurrent ? "var(--amber-4)" : "var(--text-3)",
                      marginTop: 8,
                      textAlign: "center",
                      whiteSpace: "nowrap",
                      transition: "color var(--duration-base) var(--ease-out)",
                    }}
                  >
                    {node.label}
                  </div>
                </div>
              </div>
            );
          })}
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

