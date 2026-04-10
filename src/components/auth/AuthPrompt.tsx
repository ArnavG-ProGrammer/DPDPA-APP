"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";

export function AuthPrompt() {
  const [show, setShow] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Never show on auth pages
    if (pathname.startsWith("/auth")) return;
    // Don't show if already dismissed this session
    if (sessionStorage.getItem("auth_prompt_dismissed")) return;

    if (!supabase) return;

    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        setTimeout(() => setShow(true), 1200);
      }
    });
  }, [pathname]);

  const dismiss = () => {
    sessionStorage.setItem("auth_prompt_dismissed", "1");
    setShow(false);
  };

  if (!show) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={dismiss}
        style={{
          position: "fixed", inset: 0, zIndex: 200,
          background: "rgba(3,7,18,0.75)",
          backdropFilter: "blur(6px)",
          animation: "fadeIn 0.3s ease",
        }}
      />

      {/* Modal */}
      <div style={{
        position: "fixed", zIndex: 201,
        top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: "min(420px, calc(100vw - 32px))",
        background: "#0B1526",
        border: "1px solid rgba(245,158,11,0.2)",
        borderRadius: 24,
        padding: "36px 32px",
        boxShadow: "0 32px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(245,158,11,0.08)",
        animation: "slideUp 0.35s cubic-bezier(0.34,1.56,0.64,1)",
      }}>
        {/* Icon */}
        <div style={{
          width: 56, height: 56, borderRadius: 16, margin: "0 auto 20px",
          background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.25)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 26,
        }}>⚖️</div>

        <h2 style={{
          fontFamily: "var(--font-playfair), Georgia, serif",
          fontSize: 22, fontWeight: 700, color: "#F0EAD6",
          textAlign: "center", marginBottom: 10,
        }}>
          Welcome to Data Crest
        </h2>

        <p style={{
          fontFamily: "var(--font-ibm), sans-serif",
          fontSize: 13, color: "#4B5563", lineHeight: 1.65,
          textAlign: "center", marginBottom: 28,
        }}>
          Create a free account to save your notes, track your learning score, and sync progress across devices.
        </p>

        {/* Buttons */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <button
            onClick={() => router.push("/auth/login?mode=signup")}
            style={{
              width: "100%", padding: "13px",
              borderRadius: 12, border: "none",
              background: "#F59E0B", color: "#030712",
              fontFamily: "var(--font-ibm), sans-serif",
              fontWeight: 600, fontSize: 14, cursor: "pointer",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = "0.9"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
          >
            Create free account
          </button>

          <button
            onClick={() => router.push("/auth/login")}
            style={{
              width: "100%", padding: "13px",
              borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.04)", color: "#F0EAD6",
              fontFamily: "var(--font-ibm), sans-serif",
              fontWeight: 500, fontSize: 14, cursor: "pointer",
              transition: "border-color 0.2s, background 0.2s",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(245,158,11,0.3)";
              (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.07)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)";
              (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
            }}
          >
            Sign in
          </button>

          <button
            onClick={dismiss}
            style={{
              background: "none", border: "none", cursor: "pointer",
              fontFamily: "var(--font-ibm), sans-serif",
              fontSize: 12, color: "#4B5563", padding: "6px",
              transition: "color 0.2s",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#94A3B8"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#4B5563"; }}
          >
            Continue as guest →
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp {
          from { opacity: 0; transform: translate(-50%, calc(-50% + 20px)); }
          to   { opacity: 1; transform: translate(-50%, -50%); }
        }
      `}</style>
    </>
  );
}
