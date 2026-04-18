"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Newspaper, User } from "lucide-react";
import { computeScore } from "@/lib/progress";
import { dpdpaAct } from "@/data/dpdpa";
import { gdpr } from "@/data/gdpr";

interface NavbarProps {
  accentColor?: string;
}

/** Inline SVG logo mark — book/codex icon */
function LogoMark() {
  return (
    <svg width={20} height={20} viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
      {/* Left page */}
      <rect x={2} y={4} width={7} height={12} fill="var(--bg-3)" stroke="var(--amber-4)" strokeWidth={0.7} strokeOpacity={0.7} />
      {/* Right page */}
      <rect x={11} y={4} width={7} height={12} fill="var(--bg-3)" stroke="var(--amber-4)" strokeWidth={0.7} strokeOpacity={0.7} />
      {/* Spine */}
      <line x1={9} y1={4} x2={9} y2={16} stroke="var(--amber-4)" strokeWidth={0.7} strokeOpacity={0.7} />
      {/* Text lines on left page */}
      <line x1={3.5} y1={6} x2={8} y2={6} stroke="var(--amber-4)" strokeWidth={0.5} strokeOpacity={0.5} />
      <line x1={3.5} y1={8} x2={8} y2={8} stroke="var(--amber-4)" strokeWidth={0.5} strokeOpacity={0.5} />
      <line x1={3.5} y1={12} x2={8} y2={12} stroke="var(--amber-4)" strokeWidth={0.7} strokeOpacity={0.7} />
      {/* Text lines on right page */}
      <line x1={12.5} y1={6} x2={17} y2={6} stroke="var(--amber-4)" strokeWidth={0.5} strokeOpacity={0.5} />
      <line x1={12.5} y1={8} x2={17} y2={8} stroke="var(--amber-4)" strokeWidth={0.5} strokeOpacity={0.5} />
      <line x1={12.5} y1={12} x2={17} y2={12} stroke="var(--amber-4)" strokeWidth={0.7} strokeOpacity={0.7} />
    </svg>
  );
}

/** Wordmark — "Data" + "Crest" with gradient */
function Wordmark() {
  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
      <span style={{
        fontFamily: "var(--font-ibm), sans-serif",
        fontWeight: 600,
        fontSize: 17,
        color: "var(--text-0)",
      }}>
        Data
      </span>
      <span style={{
        fontFamily: "var(--font-playfair), serif",
        fontWeight: 700,
        fontSize: 17,
        fontStyle: "italic",
        background: "linear-gradient(90deg, var(--amber-4), var(--amber-2))",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}>
        Crest
      </span>
    </div>
  );
}

/** Breadcrumb trail with dynamic content based on current page */
function BreadcrumbNav() {
  const pathname = usePathname();
  const [breadcrumbs, setBreadcrumbs] = useState<Array<{ label: string; href?: string }>>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const crumbs: Array<{ label: string; href?: string }> = [{ label: "Home", href: "/" }];

    if (pathname.startsWith("/dpdpa")) {
      crumbs.push({ label: "DPDPA", href: "/dpdpa" });
      // Extract chapter/section from pathname
      const match = pathname.match(/\/dpdpa\/chapter-(\d+)(\/section-(\d+))?/);
      if (match) {
        const chapter = parseInt(match[1]);
        crumbs.push({ label: `Chapter ${chapter}`, href: `/dpdpa/chapter-${chapter}` });
        if (match[3]) {
          const section = parseInt(match[3]);
          crumbs.push({ label: `Section ${section}` });
        }
      }
    } else if (pathname.startsWith("/dpdp-rules")) {
      crumbs.push({ label: "DPDP Rules 2025", href: "/dpdp-rules" });
    } else if (pathname.startsWith("/gdpr")) {
      crumbs.push({ label: "GDPR", href: "/gdpr" });
      // Extract chapter/section from pathname
      const match = pathname.match(/\/gdpr\/ch(\d+)(\/g(\d+)-(\d+))?/);
      if (match) {
        const chapter = match[1];
        crumbs.push({ label: `Chapter ${chapter}`, href: `/gdpr/ch${chapter}` });
        if (match[3]) {
          crumbs.push({ label: `G${match[3]}-${match[4]}` });
        }
      }
    }

    // On mobile, show only last 2
    if (isMobile && crumbs.length > 2) {
      setBreadcrumbs(crumbs.slice(-2));
    } else {
      setBreadcrumbs(crumbs);
    }
  }, [pathname, isMobile]);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      {breadcrumbs.map((crumb, idx) => (
        <div key={idx} style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {idx > 0 && (
            <span style={{ color: "var(--text-3)", fontSize: 11 }}>›</span>
          )}
          {crumb.href ? (
            <Link
              href={crumb.href}
              style={{
                fontFamily: "var(--font-ibm), sans-serif",
                fontSize: 12,
                fontWeight: 500,
                color: "var(--text-3)",
                textDecoration: "none",
                transition: "color var(--duration-fast) var(--ease-out)",
                cursor: "pointer",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.color = "var(--text-1)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.color = "var(--text-3)";
              }}
            >
              {crumb.label}
            </Link>
          ) : (
            <span style={{
              fontFamily: "var(--font-ibm), sans-serif",
              fontSize: 12,
              fontWeight: 500,
              color: "var(--amber-4)",
            }}>
              {crumb.label}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

/** Icon action button */
function IconButton({ href, icon, isActive = false }: { href: string; icon: React.ReactNode; isActive?: boolean }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={href}
      style={{
        width: 34,
        height: 34,
        borderRadius: "var(--r-md)",
        background: isHovered || isActive ? "var(--border-0)" : "transparent",
        border: `1px solid ${isHovered || isActive ? "var(--border-2)" : "var(--border-1)"}`,
        color: isHovered || isActive ? "var(--text-1)" : (isActive ? "var(--amber-4)" : "var(--text-3)"),
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        transition: `all var(--duration-fast) var(--ease-out)`,
        textDecoration: "none",
        position: "relative",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {icon}
    </Link>
  );
}

export function Navbar({ accentColor }: NavbarProps) {
  const pathname = usePathname();
  const isNewsActive = pathname === "/news";
  const isNotifActive = pathname === "/notifications";
  const isProfileActive = pathname === "/profile";

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: 56,
        background: "rgba(2, 8, 18, 0.82)",
        backdropFilter: "blur(20px) saturate(180%)",
        borderBottom: "1px solid rgba(245,158,11,0.10)",
        padding: "0 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* LEFT — Logo */}
      <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
        <LogoMark />
        <Wordmark />
      </Link>

      {/* CENTER — Breadcrumb */}
      <div style={{ flex: 1, paddingLeft: 32, paddingRight: 32, display: "flex", justifyContent: "center" }}>
        <BreadcrumbNav />
      </div>

      {/* RIGHT — Actions */}
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <IconButton href="/news" icon={<Newspaper size={16} />} isActive={isNewsActive} />
        <IconButton href="/notifications" icon={<Bell size={16} />} isActive={isNotifActive} />
        <IconButton href="/profile" icon={<User size={16} />} isActive={isProfileActive} />
      </div>
    </nav>
  );
}

// Default export for backwards compatibility
export default Navbar;
