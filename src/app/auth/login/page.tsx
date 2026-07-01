"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Mail, Lock, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<"signin" | "signup">(
    searchParams.get("mode") === "signup" ? "signup" : "signin"
  );

  useEffect(() => {
    if (searchParams.get("mode") === "signup") setMode("signup");
  }, [searchParams]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleEmailAuth = async () => {
    if (!supabase) {
      setMsg({ type: "error", text: "Authentication is not configured yet. Add Supabase credentials to .env.local." });
      return;
    }
    setLoading(true);
    setMsg(null);

    const { error } = mode === "signin"
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({
          email, password,
          options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
        });

    setLoading(false);
    if (error) {
      setMsg({ type: "error", text: error.message });
    } else if (mode === "signup") {
      setMsg({ type: "success", text: "Check your email to confirm your account." });
    } else {
      window.location.href = "/profile";
    }
  };

  const handleGoogleAuth = async () => {
    if (!supabase) {
      setMsg({ type: "error", text: "Authentication is not configured yet. Add Supabase credentials to .env.local." });
      return;
    }
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "var(--secondary)",
    border: "1px solid var(--border)",
    borderRadius: 10,
    boxSizing: "border-box",
    fontFamily: "var(--font-sans)",
    fontSize: 14,
    color: "var(--foreground)",
    outline: "none",
    transition: "border-color 0.2s",
  };

  return (
    <div className="flex min-h-dvh items-center justify-center px-6 py-10">
      <div style={{ width: "100%", maxWidth: 420 }}>
        <Link href="/" className="hover:text-primary" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--muted-foreground)", textDecoration: "none", fontSize: 13, marginBottom: 32, transition: "color 0.2s" }}>
          <ArrowLeft size={14} /> Home
        </Link>

        <div style={{ background: "var(--card)", borderRadius: 24, border: "1px solid var(--border)", boxShadow: "var(--elevation-md)", padding: "36px 32px" }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{ width: 56, height: 56, borderRadius: 18, margin: "0 auto 16px", background: tintPrimary(12), border: `1px solid ${tintPrimary(28)}`, color: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <ShieldCheck size={26} />
            </div>
            <h1 className="font-display" style={{ fontSize: 26, fontWeight: 700, color: "var(--foreground)", marginBottom: 8 }}>
              {mode === "signin" ? "Welcome back" : "Join Data Crest"}
            </h1>
            <p style={{ fontSize: 13, color: "var(--muted-foreground)" }}>
              {mode === "signin"
                ? "Sign in to access your saved notes and progress"
                : "Create an account to save notes and track your journey"}
            </p>
          </div>

          {/* Google OAuth */}
          <button
            onClick={handleGoogleAuth}
            style={{ width: "100%", padding: "12px", borderRadius: 12, background: "var(--secondary)", border: "1px solid var(--border)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--foreground)", transition: "border-color 0.2s, background 0.2s", marginBottom: 20 }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = tintPrimary(32); e.currentTarget.style.background = "var(--accent)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.background = "var(--secondary)"; }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
              <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4" />
              <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853" />
              <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05" />
              <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335" />
            </svg>
            Continue with Google
          </button>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
            <span style={{ fontSize: 12, color: "var(--muted-foreground)" }}>or continue with email</span>
            <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
          </div>

          {/* Email */}
          <div style={{ marginBottom: 14 }}>
            <label htmlFor="email" style={{ display: "block", fontSize: 12, color: "var(--muted-foreground)", marginBottom: 6 }}>Email address</label>
            <div style={{ position: "relative" }}>
              <Mail size={15} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--muted-foreground)" }} />
              <input
                id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com"
                style={{ ...inputStyle, padding: "11px 14px 11px 40px" }}
                onFocus={(e) => { e.target.style.borderColor = "var(--ring)"; }}
                onBlur={(e) => { e.target.style.borderColor = "var(--border)"; }}
              />
            </div>
          </div>

          {/* Password */}
          <div style={{ marginBottom: 24 }}>
            <label htmlFor="password" style={{ display: "block", fontSize: 12, color: "var(--muted-foreground)", marginBottom: 6 }}>Password</label>
            <div style={{ position: "relative" }}>
              <Lock size={15} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--muted-foreground)" }} />
              <input
                id="password" type={showPw ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" onKeyDown={(e) => { if (e.key === "Enter") handleEmailAuth(); }}
                style={{ ...inputStyle, padding: "11px 40px 11px 40px" }}
                onFocus={(e) => { e.target.style.borderColor = "var(--ring)"; }}
                onBlur={(e) => { e.target.style.borderColor = "var(--border)"; }}
              />
              <button onClick={() => setShowPw((v) => !v)} aria-label={showPw ? "Hide password" : "Show password"} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--muted-foreground)", padding: 2 }}>
                {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {/* Message */}
          {msg && (
            <div role="status" style={{
              padding: "10px 14px", borderRadius: 10, marginBottom: 16, fontSize: 13,
              background: msg.type === "error" ? "color-mix(in srgb, var(--destructive) 10%, transparent)" : "color-mix(in srgb, var(--success) 10%, transparent)",
              border: `1px solid ${msg.type === "error" ? "color-mix(in srgb, var(--destructive) 26%, transparent)" : "color-mix(in srgb, var(--success) 26%, transparent)"}`,
              color: msg.type === "error" ? "var(--destructive)" : "var(--success-text)",
            }}>
              {msg.text}
            </div>
          )}

          {/* Submit */}
          <button
            onClick={handleEmailAuth}
            disabled={loading || !email || !password}
            style={{ width: "100%", padding: "13px", borderRadius: 12, border: "none", cursor: loading ? "not-allowed" : "pointer", background: loading || !email || !password ? tintPrimary(45) : "var(--primary)", color: "var(--primary-foreground)", fontWeight: 600, fontSize: 14, transition: "background 0.2s" }}
          >
            {loading ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
          </button>

          {/* Mode toggle */}
          <div style={{ textAlign: "center", marginTop: 20 }}>
            <span style={{ fontSize: 13, color: "var(--muted-foreground)" }}>
              {mode === "signin" ? "Don't have an account? " : "Already have an account? "}
            </span>
            <button onClick={() => { setMode((m) => (m === "signin" ? "signup" : "signin")); setMsg(null); }} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--primary-text)", fontSize: 13, fontWeight: 600, padding: 0 }}>
              {mode === "signin" ? "Sign up" : "Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function tintPrimary(pct: number) {
  return `color-mix(in srgb, var(--primary) ${pct}%, transparent)`;
}
