"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, LogOut, BookOpen, Star, User } from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { Session } from "@supabase/supabase-js";
import { dpdpaAct } from "@/data/dpdpa";
import { gdpr } from "@/data/gdpr";
import { getProgress, computeScore } from "@/lib/progress";

const ALL_DPDPA_SECTIONS = dpdpaAct.chapters.flatMap(c => c.sections);
const ALL_GDPR_SECTIONS = gdpr.chapters.flatMap(c => c.sections);
const DPDPA_IDS = new Set(ALL_DPDPA_SECTIONS.map(s => s.id));
const GDPR_IDS = new Set(ALL_GDPR_SECTIONS.map(s => s.id));
const DPDPA_TOTAL = ALL_DPDPA_SECTIONS.length;
const GDPR_TOTAL = ALL_GDPR_SECTIONS.length;

function ProgressBar({ value, max, color }: { value: number; max: number; color: string }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div style={{ width: "100%" }}>
      <div style={{
        height: 6, borderRadius: 3,
        background: "rgba(255,255,255,0.06)",
        overflow: "hidden",
      }}>
        <div style={{
          height: "100%", width: `${pct}%`,
          background: color, borderRadius: 3,
          transition: "width 0.8s cubic-bezier(0.22,1,0.36,1)",
        }} />
      </div>
      <div style={{
        fontFamily: "var(--font-ibm), sans-serif",
        fontSize: 11, color: "#4B5563", marginTop: 4,
      }}>
        {value} / {max} sections · {pct}%
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [dpdpaRead, setDpdpaRead] = useState(0);
  const [gdprRead, setGdprRead] = useState(0);
  const [globalScore, setGlobalScore] = useState(0);
  const [globalPct, setGlobalPct] = useState(0);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s);
    });
    return () => subscription.unsubscribe();
  }, []);

  // Load progress from datacrest_progress_v2
  useEffect(() => {
    const p = getProgress();
    setDpdpaRead(p.reads.filter(id => DPDPA_IDS.has(id)).length);
    setGdprRead(p.reads.filter(id => GDPR_IDS.has(id)).length);
    const { score, pct } = computeScore([...ALL_DPDPA_SECTIONS, ...ALL_GDPR_SECTIONS]);
    setGlobalScore(score);
    setGlobalPct(pct);
  }, []);

  const signOut = async () => {
    if (supabase) await supabase.auth.signOut();
    window.location.href = "/";
  };

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontFamily: "var(--font-ibm), sans-serif", color: "#4B5563", fontSize: 14 }}>
          Loading…
        </div>
      </div>
    );
  }

  if (!session && supabase) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🔐</div>
          <h2 style={{
            fontFamily: "var(--font-playfair), Georgia, serif",
            fontSize: 24, fontWeight: 700, color: "#F0EAD6", marginBottom: 12,
          }}>
            Sign in to view your profile
          </h2>
          <Link href="/auth/login" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "12px 24px", borderRadius: 12,
            background: "#F59E0B", color: "#030712",
            fontFamily: "var(--font-ibm), sans-serif", fontWeight: 600, fontSize: 14,
            textDecoration: "none",
          }}>
            Sign in
          </Link>
        </div>
      </div>
    );
  }

  const userName = session?.user?.user_metadata?.full_name
    ?? session?.user?.email?.split("@")[0]
    ?? "Reader";

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
          fontFamily: "var(--font-ibm), sans-serif",
        }}>
          <ArrowLeft size={14} /> Home
        </Link>
        <span style={{ color: "#4B5563" }}>›</span>
        <span style={{ fontSize: 13, fontFamily: "var(--font-ibm), sans-serif", color: "#F59E0B", fontWeight: 600 }}>
          My Profile
        </span>
        {session && (
          <button onClick={signOut} style={{
            marginLeft: "auto", display: "flex", alignItems: "center", gap: 6,
            padding: "6px 14px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.1)",
            background: "transparent", cursor: "pointer",
            color: "#4B5563", fontFamily: "var(--font-ibm), sans-serif", fontSize: 12,
            transition: "color 0.2s",
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#EF4444"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#4B5563"; }}
          >
            <LogOut size={13} /> Sign out
          </button>
        )}
      </nav>

      <div style={{ maxWidth: 820, margin: "0 auto", padding: "48px 24px 100px" }}>

        {/* Profile header */}
        <div className="fade-up" style={{
          background: "#0B1526", borderRadius: 20,
          border: "1px solid rgba(245,158,11,0.15)",
          padding: "28px 32px", marginBottom: 28,
          display: "flex", alignItems: "center", gap: 20,
        }}>
          <div style={{
            width: 64, height: 64, borderRadius: "50%",
            background: "rgba(245,158,11,0.12)", border: "2px solid rgba(245,158,11,0.3)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 28, flexShrink: 0,
          }}>
            {session?.user?.user_metadata?.avatar_url
              ? <img src={session.user.user_metadata.avatar_url} alt="" style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }} />
              : <User size={28} color="#F59E0B" />}
          </div>
          <div>
            <h1 style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontSize: 22, fontWeight: 700, color: "#F0EAD6", marginBottom: 4,
            }}>
              {userName}
            </h1>
            <div style={{ fontFamily: "var(--font-ibm), sans-serif", fontSize: 13, color: "#4B5563" }}>
              {session?.user?.email ?? "Guest Reader"}
            </div>
          </div>
          <div style={{ marginLeft: "auto", textAlign: "center" }}>
            <div style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: 28, fontWeight: 700, color: "#F59E0B", lineHeight: 1,
            }}>
              {globalScore}
              <span style={{ fontSize: 13, color: "#4B5563" }}>/1000</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 4, marginTop: 4 }}>
              <Star size={11} color="#F59E0B" fill="#F59E0B" />
              <span style={{ fontFamily: "var(--font-ibm), sans-serif", fontSize: 11, color: "#4B5563" }}>
                Learning Score
              </span>
            </div>
            <div style={{
              marginTop: 8, height: 4, width: 100, borderRadius: 2,
              background: "rgba(255,255,255,0.06)", overflow: "hidden",
            }}>
              <div style={{
                height: "100%", borderRadius: 2, background: "#F59E0B",
                width: `${globalPct * 100}%`, transition: "width 1s ease",
              }} />
            </div>
          </div>
        </div>

        {/* Reading Progress */}
        <div className="fade-up" style={{
          background: "#0B1526", borderRadius: 20,
          border: "1px solid rgba(255,255,255,0.06)",
          padding: "24px 28px", marginBottom: 24,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <BookOpen size={18} color="#F59E0B" />
            <h2 style={{
              fontFamily: "var(--font-ibm), sans-serif",
              fontSize: 14, fontWeight: 600, color: "#F0EAD6",
            }}>
              Reading Progress
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {/* DPDPA */}
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                <div style={{ fontFamily: "var(--font-ibm), sans-serif", fontSize: 13, color: "#94A3B8", fontWeight: 500 }}>
                  ⚖️ DPDPA 2023
                </div>
                <Link href="/dpdpa" style={{
                  fontSize: 11, color: "#F59E0B", textDecoration: "none",
                  fontFamily: "var(--font-ibm), sans-serif",
                }}>
                  Continue →
                </Link>
              </div>
              <ProgressBar value={dpdpaRead} max={DPDPA_TOTAL} color="#F59E0B" />
            </div>

            {/* GDPR */}
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                <div style={{ fontFamily: "var(--font-ibm), sans-serif", fontSize: 13, color: "#94A3B8", fontWeight: 500 }}>
                  🏛️ GDPR 2016/679
                </div>
                <Link href="/gdpr" style={{
                  fontSize: 11, color: "#3B82F6", textDecoration: "none",
                  fontFamily: "var(--font-ibm), sans-serif",
                }}>
                  Continue →
                </Link>
              </div>
              <ProgressBar value={gdprRead} max={GDPR_TOTAL} color="#3B82F6" />
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="fade-up" style={{
          background: "#0B1526", borderRadius: 20,
          border: "1px solid rgba(255,255,255,0.06)",
          padding: "24px 28px",
        }}>
          <h2 style={{
            fontFamily: "var(--font-ibm), sans-serif",
            fontSize: 14, fontWeight: 600, color: "#F0EAD6", marginBottom: 16,
          }}>
            Continue Learning
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { href: "/dpdpa", label: "DPDPA 2023", sub: "Digital Personal Data Protection Act", color: "#F59E0B" },
              { href: "/gdpr", label: "GDPR 2016/679", sub: "EU General Data Protection Regulation", color: "#3B82F6" },
              { href: "/dpdp-rules", label: "DPDP Rules 2025", sub: "Implementation rules and timelines", color: "#06B6D4" },
            ].map(item => (
              <Link key={item.href} href={item.href} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "14px 16px", borderRadius: 12,
                background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)",
                textDecoration: "none", transition: "border-color 0.2s, background 0.2s",
              }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = `${item.color}44`;
                  (e.currentTarget as HTMLElement).style.background = `${item.color}08`;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)";
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.02)";
                }}
              >
                <div>
                  <div style={{ fontFamily: "var(--font-ibm), sans-serif", fontSize: 13, color: item.color, fontWeight: 600 }}>
                    {item.label}
                  </div>
                  <div style={{ fontFamily: "var(--font-ibm), sans-serif", fontSize: 11, color: "#4B5563", marginTop: 2 }}>
                    {item.sub}
                  </div>
                </div>
                <span style={{ color: "#4B5563", fontSize: 16 }}>→</span>
              </Link>
            ))}
          </div>
        </div>

        {!session && (
          <div style={{
            marginTop: 24, padding: "16px 20px", borderRadius: 14,
            background: "rgba(245,158,11,0.05)", border: "1px solid rgba(245,158,11,0.15)",
            fontFamily: "var(--font-ibm), sans-serif", fontSize: 13, color: "#94A3B8",
          }}>
            💡 <strong style={{ color: "#F59E0B" }}>Sign in</strong> to sync your progress across devices.{" "}
            <Link href="/auth/login" style={{ color: "#F59E0B", textDecoration: "none" }}>
              Sign in now →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
