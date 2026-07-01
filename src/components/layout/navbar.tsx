"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Newspaper, User, BookOpen } from "lucide-react";
import { DarkToggle } from "@/components/ui/dark-toggle";

interface NavbarProps {
  accentColor?: string;
}

/** Inline SVG logo mark — book/codex icon, tinted by currentColor. */
function LogoMark() {
  return (
    <span className="text-primary" style={{ display: "inline-flex" }}>
      <BookOpen size={20} strokeWidth={1.75} aria-hidden="true" />
    </span>
  );
}

/** Wordmark — "Data Crest" */
function Wordmark() {
  return (
    <span
      className="font-display"
      style={{ display: "flex", alignItems: "baseline", gap: 5, fontSize: 17, fontWeight: 700, letterSpacing: "-0.01em" }}
    >
      <span style={{ color: "var(--foreground)" }}>Data</span>
      <span style={{ color: "var(--primary)" }}>Crest</span>
    </span>
  );
}

/** Breadcrumb trail with dynamic content based on current page. */
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
      const match = pathname.match(/\/gdpr\/ch(\d+)(\/g(\d+)-(\d+))?/);
      if (match) {
        const chapter = match[1];
        crumbs.push({ label: `Chapter ${chapter}`, href: `/gdpr/ch${chapter}` });
        if (match[3]) {
          crumbs.push({ label: `G${match[3]}-${match[4]}` });
        }
      }
    }

    if (isMobile && crumbs.length > 2) {
      setBreadcrumbs(crumbs.slice(-2));
    } else {
      setBreadcrumbs(crumbs);
    }
  }, [pathname, isMobile]);

  return (
    <div className="flex items-center gap-1.5 text-[13px]">
      {breadcrumbs.map((crumb, idx) => (
        <div key={idx} className="flex items-center gap-1.5">
          {idx > 0 && <span className="text-muted-foreground/60">/</span>}
          {crumb.href ? (
            <Link
              href={crumb.href}
              className="font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {crumb.label}
            </Link>
          ) : (
            <span className="font-semibold text-primary">{crumb.label}</span>
          )}
        </div>
      ))}
    </div>
  );
}

/** Icon action button — 40px target, token-driven states. */
function IconButton({
  href, icon, label, isActive = false,
}: { href: string; icon: React.ReactNode; label: string; isActive?: boolean }) {
  return (
    <Link
      href={href}
      aria-label={label}
      aria-current={isActive ? "page" : undefined}
      className={[
        "inline-flex size-11 items-center justify-center rounded-xl border transition-colors duration-200",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        isActive
          ? "border-primary/30 bg-primary/10 text-primary"
          : "border-transparent text-muted-foreground hover:border-border hover:bg-accent hover:text-foreground",
      ].join(" ")}
    >
      {icon}
    </Link>
  );
}

export function Navbar({}: NavbarProps) {
  const pathname = usePathname();
  const isNewsActive = pathname === "/news";
  const isNotifActive = pathname === "/notifications";
  const isProfileActive = pathname === "/profile";

  return (
    <nav
      className="glass sticky top-0 z-40 flex h-14 items-center justify-between gap-3 border-b border-border px-4 sm:px-6 lg:px-8"
      style={{ background: "var(--glass-nav)" }}
    >
      {/* LEFT — Logo */}
      <Link href="/" aria-label="Data Crest home" className="flex shrink-0 items-center gap-2.5 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
        <LogoMark />
        <Wordmark />
      </Link>

      {/* CENTER — Breadcrumb (hidden on small screens) */}
      <div className="hidden flex-1 justify-center md:flex">
        <BreadcrumbNav />
      </div>

      {/* RIGHT — Actions */}
      <div className="flex shrink-0 items-center gap-1">
        <IconButton href="/news" label="News" icon={<Newspaper size={18} />} isActive={isNewsActive} />
        <IconButton href="/notifications" label="Notifications" icon={<Bell size={18} />} isActive={isNotifActive} />
        <IconButton href="/profile" label="Profile" icon={<User size={18} />} isActive={isProfileActive} />
        <div className="mx-1 h-6 w-px bg-border" aria-hidden="true" />
        <DarkToggle />
      </div>
    </nav>
  );
}

export default Navbar;
