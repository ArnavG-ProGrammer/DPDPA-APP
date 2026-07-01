"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { ShieldCheck } from "lucide-react";
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
      {/* Scrim */}
      <div
        onClick={dismiss}
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 200,
          background: "hsl(0 0% 0% / 0.55)",
          backdropFilter: "blur(6px)",
          animation: "authFadeIn 0.3s ease",
        }}
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-prompt-title"
        style={{
          position: "fixed",
          zIndex: 201,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "min(420px, calc(100vw - 32px))",
          background: "var(--card)",
          color: "var(--card-foreground)",
          border: "1px solid var(--border)",
          borderRadius: 24,
          padding: "36px 32px",
          boxShadow: "var(--elevation-lg)",
          animation: "authSlideUp 0.35s var(--ease-spring)",
        }}
      >
        {/* Icon */}
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 18,
            margin: "0 auto 20px",
            background: "color-mix(in srgb, var(--primary) 12%, transparent)",
            border: "1px solid color-mix(in srgb, var(--primary) 28%, transparent)",
            color: "var(--primary)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ShieldCheck size={26} />
        </div>

        <h2
          id="auth-prompt-title"
          className="font-display"
          style={{ fontSize: 22, fontWeight: 700, color: "var(--foreground)", textAlign: "center", marginBottom: 10 }}
        >
          Welcome to Data Crest
        </h2>

        <p
          style={{
            fontSize: 13.5,
            color: "var(--muted-foreground)",
            lineHeight: 1.65,
            textAlign: "center",
            marginBottom: 28,
          }}
        >
          Create a free account to save your notes, track your learning score, and sync progress across devices.
        </p>

        {/* Buttons */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <button
            onClick={() => router.push("/auth/login?mode=signup")}
            style={{
              width: "100%",
              padding: "13px",
              borderRadius: 12,
              border: "none",
              background: "var(--primary)",
              color: "var(--primary-foreground)",
              fontWeight: 600,
              fontSize: 14,
              cursor: "pointer",
              transition: "filter 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.filter = "brightness(1.08)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.filter = "brightness(1)"; }}
          >
            Create free account
          </button>

          <button
            onClick={() => router.push("/auth/login")}
            style={{
              width: "100%",
              padding: "13px",
              borderRadius: 12,
              border: "1px solid var(--border)",
              background: "var(--secondary)",
              color: "var(--secondary-foreground)",
              fontWeight: 500,
              fontSize: 14,
              cursor: "pointer",
              transition: "background 0.2s, border-color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "color-mix(in srgb, var(--primary) 32%, transparent)";
              e.currentTarget.style.background = "var(--accent)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--border)";
              e.currentTarget.style.background = "var(--secondary)";
            }}
          >
            Sign in
          </button>

          <button
            onClick={dismiss}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: 12.5,
              color: "var(--muted-foreground)",
              padding: "6px",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "var(--foreground)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "var(--muted-foreground)"; }}
          >
            Continue as guest
          </button>
        </div>
      </div>

      <style>{`
        @keyframes authFadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes authSlideUp {
          from { opacity: 0; transform: translate(-50%, calc(-50% + 20px)); }
          to   { opacity: 1; transform: translate(-50%, -50%); }
        }
      `}</style>
    </>
  );
}
