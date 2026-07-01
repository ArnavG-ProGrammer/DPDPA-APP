"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, LogOut, BookOpen, Star, User, Scale, Landmark, Lightbulb, ShieldCheck, ArrowRight } from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { Session } from "@supabase/supabase-js";
import { dpdpaAct } from "@/data/dpdpa";
import { gdpr } from "@/data/gdpr";
import { getProgress, computeScore } from "@/lib/progress";

const ALL_DPDPA_SECTIONS = dpdpaAct.chapters.flatMap((c) => c.sections);
const ALL_GDPR_SECTIONS = gdpr.chapters.flatMap((c) => c.sections);
const DPDPA_IDS = new Set(ALL_DPDPA_SECTIONS.map((s) => s.id));
const GDPR_IDS = new Set(ALL_GDPR_SECTIONS.map((s) => s.id));
const DPDPA_TOTAL = ALL_DPDPA_SECTIONS.length;
const GDPR_TOTAL = ALL_GDPR_SECTIONS.length;

const tint = (color: string, pct: number) => `color-mix(in srgb, ${color} ${pct}%, transparent)`;

function ProgressBar({ value, max, color }: { value: number; max: number; color: string }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div style={{ width: "100%" }}>
      <div style={{ height: 6, borderRadius: 3, background: "var(--muted)", overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: 3, transition: "width 0.8s var(--ease-out)" }} />
      </div>
      <div className="tabular-nums" style={{ fontSize: 11, color: "var(--muted-foreground)", marginTop: 4 }}>
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
    if (!supabase) { setLoading(false); return; }
    supabase.auth.getSession().then(({ data }) => { setSession(data.session); setLoading(false); });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => { setSession(s); });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const p = getProgress();
    setDpdpaRead(p.reads.filter((id) => DPDPA_IDS.has(id)).length);
    setGdprRead(p.reads.filter((id) => GDPR_IDS.has(id)).length);
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
      <div className="flex min-h-dvh items-center justify-center">
        <div style={{ color: "var(--muted-foreground)", fontSize: 14 }}>Loading…</div>
      </div>
    );
  }

  if (!session && supabase) {
    return (
      <div className="flex min-h-dvh items-center justify-center px-6">
        <div style={{ textAlign: "center" }}>
          <div style={{ width: 56, height: 56, borderRadius: 18, margin: "0 auto 16px", background: tint("var(--primary)", 12), border: `1px solid ${tint("var(--primary)", 28)}`, color: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <ShieldCheck size={26} />
          </div>
          <h2 className="font-display" style={{ fontSize: 24, fontWeight: 700, color: "var(--foreground)", marginBottom: 12 }}>
            Sign in to view your profile
          </h2>
          <Link href="/auth/login" className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 24px", borderRadius: 12, background: "var(--primary)", color: "var(--primary-foreground)", fontWeight: 600, fontSize: 14, textDecoration: "none" }}>
            Sign in
          </Link>
        </div>
      </div>
    );
  }

  const userName = session?.user?.user_metadata?.full_name
    ?? session?.user?.email?.split("@")[0]
    ?? "Reader";

  const quickLinks = [
    { href: "/dpdpa", label: "DPDPA 2023", sub: "Digital Personal Data Protection Act", color: "var(--brand-amber)", text: "var(--brand-amber-text)" },
    { href: "/gdpr", label: "GDPR 2016/679", sub: "EU General Data Protection Regulation", color: "var(--info)", text: "var(--info-text)" },
    { href: "/dpdp-rules", label: "DPDP Rules 2025", sub: "Implementation rules and timelines", color: "var(--brand-teal)", text: "var(--brand-teal-text)" },
  ];

  return (
    <div className="min-h-dvh">
      {/* Navbar */}
      <nav className="glass" style={{ position: "sticky", top: 0, zIndex: 40, background: "var(--glass-nav)", borderBottom: "1px solid var(--border)", padding: "0 clamp(16px, 4vw, 24px)", height: 56, display: "flex", alignItems: "center", gap: 12 }}>
        <Link href="/" className="hover:text-foreground" style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--muted-foreground)", textDecoration: "none", fontSize: 13 }}>
          <ArrowLeft size={14} /> Home
        </Link>
        <span style={{ color: "var(--muted-foreground)" }}>/</span>
        <span style={{ fontSize: 13, color: "var(--primary-text)", fontWeight: 600 }}>My Profile</span>
        {session && (
          <button onClick={signOut} style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6, padding: "6px 14px", borderRadius: 8, border: "1px solid var(--border)", background: "transparent", cursor: "pointer", color: "var(--muted-foreground)", fontSize: 12, transition: "color 0.2s, border-color 0.2s" }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "var(--destructive)"; e.currentTarget.style.borderColor = tint("var(--destructive)", 40); }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "var(--muted-foreground)"; e.currentTarget.style.borderColor = "var(--border)"; }}
          >
            <LogOut size={13} /> Sign out
          </button>
        )}
      </nav>

      <div style={{ maxWidth: 820, margin: "0 auto", padding: "48px clamp(16px, 5vw, 24px) 100px" }}>
        {/* Profile header */}
        <div className="fade-up" style={{ background: "var(--card)", borderRadius: 20, border: "1px solid var(--border)", padding: "28px 32px", marginBottom: 24, display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
          <div style={{ width: 64, height: 64, borderRadius: "50%", background: tint("var(--primary)", 12), border: `2px solid ${tint("var(--primary)", 30)}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, overflow: "hidden" }}>
            {session?.user?.user_metadata?.avatar_url
              ? <img src={session.user.user_metadata.avatar_url} alt={`${userName} avatar`} style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }} />
              : <User size={28} color="var(--primary)" />}
          </div>
          <div>
            <h1 className="font-display" style={{ fontSize: 22, fontWeight: 700, color: "var(--foreground)", marginBottom: 4 }}>{userName}</h1>
            <div style={{ fontSize: 13, color: "var(--muted-foreground)" }}>{session?.user?.email ?? "Guest Reader"}</div>
          </div>
          <div style={{ marginLeft: "auto", textAlign: "center" }}>
            <div className="tabular-nums" style={{ fontFamily: "var(--font-mono)", fontSize: 28, fontWeight: 700, color: "var(--primary-text)", lineHeight: 1 }}>
              {globalScore}<span style={{ fontSize: 13, color: "var(--muted-foreground)" }}>/1000</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 4, marginTop: 4 }}>
              <Star size={11} color="var(--primary)" fill="var(--primary)" />
              <span style={{ fontSize: 11, color: "var(--muted-foreground)" }}>Learning Score</span>
            </div>
            <div style={{ marginTop: 8, height: 4, width: 100, borderRadius: 2, background: "var(--muted)", overflow: "hidden" }}>
              <div style={{ height: "100%", borderRadius: 2, background: "var(--primary)", width: `${globalPct * 100}%`, transition: "width 1s ease" }} />
            </div>
          </div>
        </div>

        {/* Reading Progress */}
        <div className="fade-up" style={{ background: "var(--card)", borderRadius: 20, border: "1px solid var(--border)", padding: "24px 28px", marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <BookOpen size={18} color="var(--primary)" />
            <h2 style={{ fontSize: 14, fontWeight: 600, color: "var(--foreground)" }}>Reading Progress</h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {/* DPDPA */}
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--foreground)", fontWeight: 500 }}>
                  <Scale size={14} color="var(--brand-amber-text)" /> DPDPA 2023
                </div>
                <Link href="/dpdpa" style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 11, color: "var(--brand-amber-text)", textDecoration: "none" }}>Continue <ArrowRight size={12} /></Link>
              </div>
              <ProgressBar value={dpdpaRead} max={DPDPA_TOTAL} color="var(--brand-amber)" />
            </div>

            {/* GDPR */}
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--foreground)", fontWeight: 500 }}>
                  <Landmark size={14} color="var(--info-text)" /> GDPR 2016/679
                </div>
                <Link href="/gdpr" style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 11, color: "var(--info-text)", textDecoration: "none" }}>Continue <ArrowRight size={12} /></Link>
              </div>
              <ProgressBar value={gdprRead} max={GDPR_TOTAL} color="var(--info)" />
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="fade-up" style={{ background: "var(--card)", borderRadius: 20, border: "1px solid var(--border)", padding: "24px 28px" }}>
          <h2 style={{ fontSize: 14, fontWeight: 600, color: "var(--foreground)", marginBottom: 16 }}>Continue Learning</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {quickLinks.map((item) => (
              <Link key={item.href} href={item.href} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", borderRadius: 12, background: "var(--secondary)", border: "1px solid var(--border)", textDecoration: "none", transition: "border-color 0.2s, background 0.2s" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = tint(item.color, 44); e.currentTarget.style.background = tint(item.color, 8); }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.background = "var(--secondary)"; }}
              >
                <div>
                  <div style={{ fontSize: 13, color: item.text, fontWeight: 600 }}>{item.label}</div>
                  <div style={{ fontSize: 11, color: "var(--muted-foreground)", marginTop: 2 }}>{item.sub}</div>
                </div>
                <ArrowRight size={16} color="var(--muted-foreground)" />
              </Link>
            ))}
          </div>
        </div>

        {!session && (
          <div className="fade-up" style={{ marginTop: 24, padding: "16px 20px", borderRadius: 14, background: tint("var(--primary)", 6), border: `1px solid ${tint("var(--primary)", 18)}`, fontSize: 13, color: "var(--muted-foreground)", display: "flex", alignItems: "flex-start", gap: 8 }}>
            <Lightbulb size={16} color="var(--primary-text)" style={{ flexShrink: 0, marginTop: 1 }} />
            <span>
              <strong style={{ color: "var(--primary-text)" }}>Sign in</strong> to sync your progress across devices.{" "}
              <Link href="/auth/login" style={{ color: "var(--primary-text)", textDecoration: "none", fontWeight: 600 }}>Sign in now</Link>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
