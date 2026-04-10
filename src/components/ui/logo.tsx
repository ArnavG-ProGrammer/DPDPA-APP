"use client";

import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  href?: string;
  showWordmark?: boolean;
  showTagline?: boolean;
}

/** Shield mark only — rendered from the public SVG */
export function DataCrestMark({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const px = { sm: 32, md: 48, lg: 90 }[size];
  const h  = { sm: 42, md: 63, lg: 118 }[size];
  return (
    <Image
      src="/logo.svg"
      alt="Data Crest"
      width={px}
      height={h}
      priority
    />
  );
}

/** Full logo: shield + wordmark + optional tagline */
export function DataCrestLogo({
  size = "md",
  href = "/",
  showWordmark = true,
  showTagline = false,
}: LogoProps) {
  const shieldPx  = { sm: 28, md: 40, lg: 72 }[size];
  const shieldH   = { sm: 37, md: 52, lg: 94 }[size];
  const dataSize  = { sm: "0.9rem", md: "1.15rem",  lg: "2.2rem" }[size];
  const crestSize = { sm: "0.75rem", md: "0.9rem", lg: "1.6rem" }[size];
  const spacing   = { sm: "0.14em", md: "0.16em",   lg: "0.22em" }[size];

  const shield = (
    <Image
      src="/logo.svg"
      alt="Data Crest shield"
      width={shieldPx}
      height={shieldH}
      priority
      style={{ display: "block" }}
    />
  );

  const wordmark = showWordmark && (
    <div style={{ display: "flex", flexDirection: "column", lineHeight: 1, gap: 1 }}>
      <span style={{
        fontFamily: "Georgia, 'Times New Roman', serif",
        fontWeight: 700,
        fontSize: dataSize,
        color: "#F0EAD6",
        letterSpacing: spacing,
      }}>
        DATA
      </span>
      <span style={{
        fontFamily: "Georgia, 'Times New Roman', serif",
        fontWeight: 400,
        fontSize: crestSize,
        color: "#F59E0B",
        letterSpacing: spacing,
      }}>
        CREST
      </span>
      {showTagline && (
        <span style={{
          fontFamily: "var(--font-ibm), 'IBM Plex Sans', sans-serif",
          fontSize: "0.52rem",
          letterSpacing: "0.25em",
          color: "#4B5563",
          marginTop: 3,
          textTransform: "uppercase",
        }}>
          Privacy Law Decoded
        </span>
      )}
    </div>
  );

  const inner = (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: size === "lg" ? 16 : 10,
      textDecoration: "none",
    }}>
      {shield}
      {wordmark}
    </div>
  );

  return href ? (
    <Link href={href} style={{ textDecoration: "none", display: "inline-flex" }}>
      {inner}
    </Link>
  ) : inner;
}

/** Vertical stacked logo for splash / hero use */
export function DataCrestLogoStacked({ className }: { className?: string }) {
  return (
    <div className={className} style={{
      display: "flex", flexDirection: "column", alignItems: "center", gap: 16,
    }}>
      <Image src="/logo.svg" alt="Data Crest" width={110} height={144} priority />
      <div style={{ textAlign: "center", lineHeight: 1.1 }}>
        <div style={{
          fontFamily: "Georgia, 'Times New Roman', serif",
          fontWeight: 700, fontSize: "2.4rem",
          color: "#F0EAD6", letterSpacing: "0.2em",
        }}>DATA</div>
        <div style={{
          fontFamily: "Georgia, 'Times New Roman', serif",
          fontWeight: 400, fontSize: "1.6rem",
          color: "#F59E0B", letterSpacing: "0.32em",
        }}>CREST</div>
        <div style={{
          fontFamily: "var(--font-ibm), sans-serif",
          fontSize: "0.58rem", letterSpacing: "0.28em",
          color: "#4B5563", marginTop: 8, textTransform: "uppercase",
        }}>
          Privacy Law Decoded
        </div>
      </div>
    </div>
  );
}
