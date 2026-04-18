"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Compass, BookOpen, List, FileText, Lightbulb, Scale, ScrollText, Landmark, Bell, ArrowUpRight } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";

const CARDS = [
  {
    href: "/dpdpa",
    icon: Scale,
    label: "DPDPA 2023",
    title: "Digital Personal Data Protection Act",
    fullName: "India's Digital Personal Data Protection Act",
    region: "India",
    year: "2023",
    accent: "var(--amber-4)",
    accentValue: "#F59E0B",
    delay: "0.08s",
  },
  {
    href: "/dpdp-rules",
    icon: ScrollText,
    label: "DPDP Rules 2025",
    title: "Digital Personal Data Protection Rules",
    fullName: "Subordinate legislation implementing DPDPA",
    region: "India",
    year: "2025",
    accent: "var(--teal-3)",
    accentValue: "#06B6D4",
    delay: "0.16s",
  },
  {
    href: "/gdpr",
    icon: Landmark,
    label: "GDPR 2018",
    title: "General Data Protection Regulation",
    fullName: "EU General Data Protection Regulation",
    region: "EU",
    year: "2018",
    accent: "var(--blue-3)",
    accentValue: "#3B82F6",
    delay: "0.24s",
  },
  {
    href: "/notifications",
    icon: Bell,
    label: "Notifications",
    title: "Official Gazette Notifications",
    fullName: "Government of India gazette orders",
    region: "India",
    year: "2023–",
    accent: "var(--purple-3)",
    accentValue: "#8B5CF6",
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
  const [pressed, setPressed] = useState(false);
  const IconComponent = card.icon;

  return (
    <div
      className={`fade-up`}
      style={{ animationDelay: card.delay }}
    >
      <Link
        href={card.href}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { setHovered(false); setPressed(false); }}
        onMouseDown={() => setPressed(true)}
        onMouseUp={() => setPressed(false)}
        style={{
          display: "block",
          background: "var(--bg-2)",
          border: `1px solid var(--border-1)`,
          borderTop: `2px solid rgba(${
            card.accentValue === "#F59E0B" ? "245, 158, 11" :
            card.accentValue === "#06B6D4" ? "6, 182, 212" :
            card.accentValue === "#3B82F6" ? "59, 130, 246" :
            "139, 92, 246"
          }, 0.35)`,
          borderRadius: "var(--r-xl)",
          padding: 32,
          textDecoration: "none",
          position: "relative",
          overflow: "hidden",
          cursor: "pointer",
          transform: pressed ? "translateY(-3px)" : (hovered ? "translateY(-6px)" : "translateY(0)"),
          boxShadow: hovered ? "var(--shadow-card-hover)" : "var(--shadow-card)",
          transition: `all ${pressed ? "80ms" : "var(--duration-base)"} var(--ease-out)`,
          borderColor: hovered ? `rgba(${
            card.accentValue === "#F59E0B" ? "245, 158, 11" :
            card.accentValue === "#06B6D4" ? "6, 182, 212" :
            card.accentValue === "#3B82F6" ? "59, 130, 246" :
            "139, 92, 246"
          }, 0.3)` : "var(--border-1)",
        }}
      >
        {/* Decorative background icon */}
        <div style={{
          position: "absolute",
          bottom: -10,
          right: -10,
          width: 80,
          height: 80,
          opacity: 0.03,
          pointerEvents: "none",
          color: card.accentValue,
        }}>
          <IconComponent size={80} strokeWidth={1.5} />
        </div>

        {/* Top-right arrow */}
        <div style={{
          position: "absolute",
          top: 22,
          right: 22,
          color: "var(--text-4)",
          transition: `all var(--duration-fast) var(--ease-out)`,
          transform: hovered ? "translate(3px, -3px)" : "translate(0, 0)",
        }}>
          <ArrowUpRight size={16} />
        </div>

        {/* Main content */}
        <div style={{ position: "relative", zIndex: 1 }}>
          {/* Icon container */}
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: "var(--r-md)",
              background: `linear-gradient(135deg, rgba(${
                card.accentValue === "#F59E0B" ? "245, 158, 11" :
                card.accentValue === "#06B6D4" ? "6, 182, 212" :
                card.accentValue === "#3B82F6" ? "59, 130, 246" :
                "139, 92, 246"
              }, 0.12), rgba(${
                card.accentValue === "#F59E0B" ? "245, 158, 11" :
                card.accentValue === "#06B6D4" ? "6, 182, 212" :
                card.accentValue === "#3B82F6" ? "59, 130, 246" :
                "139, 92, 246"
              }, 0.04))`,
              border: `1px solid rgba(${
                card.accentValue === "#F59E0B" ? "245, 158, 11" :
                card.accentValue === "#06B6D4" ? "6, 182, 212" :
                card.accentValue === "#3B82F6" ? "59, 130, 246" :
                "139, 92, 246"
              }, 0.2)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 20,
            }}
          >
            <IconComponent size={20} color={card.accentValue} strokeWidth={1.5} />
          </div>

          {/* Label */}
          <div
            style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: 10,
              fontWeight: 500,
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              color: card.accentValue,
              marginBottom: 8,
            }}
          >
            {card.label}
          </div>

          {/* Title */}
          <h3
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontSize: 22,
              fontWeight: 700,
              color: "var(--text-0)",
              lineHeight: 1.2,
              marginBottom: 10,
            }}
          >
            {card.title}
          </h3>

          {/* Full name subtitle */}
          <p
            style={{
              fontFamily: "var(--font-ibm), sans-serif",
              fontSize: 12,
              fontWeight: 400,
              color: "var(--text-3)",
              lineHeight: 1.5,
              marginBottom: 20,
            }}
          >
            {card.fullName}
          </p>

          {/* Footer: region + year */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "4px 10px",
                background: `rgba(${
                  card.accentValue === "#F59E0B" ? "245, 158, 11" :
                  card.accentValue === "#06B6D4" ? "6, 182, 212" :
                  card.accentValue === "#3B82F6" ? "59, 130, 246" :
                  "139, 92, 246"
                }, 0.08)`,
                border: `1px solid rgba(${
                  card.accentValue === "#F59E0B" ? "245, 158, 11" :
                  card.accentValue === "#06B6D4" ? "6, 182, 212" :
                  card.accentValue === "#3B82F6" ? "59, 130, 246" :
                  "139, 92, 246"
                }, 0.2)`,
                borderRadius: "var(--r-full)",
                fontFamily: "var(--font-ibm), sans-serif",
                fontSize: 11,
                fontWeight: 600,
                color: card.accentValue,
                whiteSpace: "nowrap",
              }}
            >
              {card.region === "India" ? "🇮🇳" : "🇪🇺"} {card.region}
            </div>

            <div
              style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: 11,
                fontWeight: 500,
                color: "var(--text-4)",
                whiteSpace: "nowrap",
              }}
            >
              {card.year}
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
      <section style={{
        maxWidth: 1080,
        margin: "0 auto",
        padding: "0 clamp(24px, 5vw, 48px) 72px",
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 14,
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

