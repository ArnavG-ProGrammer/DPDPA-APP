"use client";
import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <div style={{ textAlign: "center", maxWidth: 480 }}>
        <div
          style={{
            fontFamily: "var(--font-playfair), Georgia, serif",
            fontSize: "clamp(6rem, 20vw, 10rem)",
            fontWeight: 700,
            color: "#F59E0B",
            lineHeight: 1,
            marginBottom: 8,
            letterSpacing: "-0.04em",
          }}
        >
          404
        </div>

        <h1
          style={{
            fontFamily: "var(--font-playfair), Georgia, serif",
            fontSize: "clamp(1.4rem, 4vw, 2rem)",
            fontWeight: 600,
            color: "#F0EAD6",
            marginBottom: 16,
            marginTop: 0,
          }}
        >
          Page Not Found
        </h1>

        <p
          style={{
            fontFamily: "var(--font-ibm), sans-serif",
            fontSize: 15,
            lineHeight: 1.7,
            color: "#4B5563",
            marginBottom: 40,
            marginTop: 0,
          }}
        >
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track with India&apos;s privacy law landscape.
        </p>

        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "14px 32px",
            borderRadius: 999,
            background: "#F59E0B",
            color: "#030712",
            fontFamily: "var(--font-ibm), sans-serif",
            fontWeight: 600,
            fontSize: 14,
            textDecoration: "none",
            letterSpacing: "0.02em",
            transition: "background 0.2s, transform 0.15s",
          }}
          onMouseEnter={e => {
            const el = e.currentTarget as HTMLElement;
            el.style.background = "#FCD34D";
            el.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={e => {
            const el = e.currentTarget as HTMLElement;
            el.style.background = "#F59E0B";
            el.style.transform = "translateY(0)";
          }}
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
