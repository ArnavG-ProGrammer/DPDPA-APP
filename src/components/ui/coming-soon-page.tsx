"use client";

import Link from "next/link";
import { ArrowLeft, Clock, Bell, Sparkles } from "lucide-react";
import { DataCrestLogo } from "@/components/ui/logo";

interface ComingSoonPageProps {
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  flag: string;
  accent: "blue" | "emerald";
  features: { icon: string; text: string }[];
}

export function ComingSoonPage({
  title,
  subtitle,
  description,
  icon,
  flag,
  accent,
  features,
}: ComingSoonPageProps) {
  const colors = {
    blue: {
      gradient: "from-blue-500 to-indigo-500",
      glow: "bg-blue-500/[0.06]",
      border: "border-blue-500/20",
      bg: "bg-blue-500/8",
      text: "text-blue-400",
      badge: "border-blue-500/30 bg-blue-500/10 text-blue-400",
      btn: "from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 shadow-blue-500/20 hover:shadow-blue-500/40",
    },
    emerald: {
      gradient: "from-emerald-500 to-teal-500",
      glow: "bg-emerald-500/[0.06]",
      border: "border-emerald-500/20",
      bg: "bg-emerald-500/8",
      text: "text-emerald-400",
      badge: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
      btn: "from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 shadow-emerald-500/20 hover:shadow-emerald-500/40",
    },
  };
  const c = colors[accent];

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#0a0d14" }}>
      {/* Ambient */}
      <div className={`pointer-events-none fixed top-[-20%] left-[10%] w-[70vw] h-[70vh] rounded-full ${c.glow} blur-[140px]`} />

      {/* Navbar */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 h-16 backdrop-blur-xl"
        style={{ background: "rgba(10,13,20,0.85)", borderBottom: "1px solid rgba(201,162,39,0.1)" }}
      >
        <div className="h-full max-w-7xl mx-auto px-6 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-1.5 text-slate-500 hover:text-white transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" />
            Home
          </Link>
          <div className="w-px h-5 bg-white/10" />
          <DataCrestLogo size="sm" href="/" showWordmark={false} />
          <span className={`text-sm font-semibold ${c.text}`}>{subtitle}</span>
        </div>
      </nav>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-6 pt-16">
        <div className="max-w-xl w-full text-center">
          {/* Big emoji */}
          <div className="text-7xl mb-6 animate-float" style={{ display: "inline-block" }}>
            {icon}
          </div>

          {/* Badge */}
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-medium mb-6 ${c.badge}`}>
            <Clock className="w-3 h-3" />
            Coming Soon
            <span className="text-lg">{flag}</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            {title}
          </h1>

          <p className="text-slate-400 text-base leading-relaxed mb-10">{description}</p>

          {/* Feature preview */}
          <div className={`rounded-2xl border ${c.border} ${c.bg} p-6 mb-8 text-left`}>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className={`w-4 h-4 ${c.text}`} />
              <span className={`text-xs font-semibold uppercase tracking-widest ${c.text}`}>
                What&apos;s coming
              </span>
            </div>
            <div className="space-y-3">
              {features.map((f) => (
                <div key={f.text} className="flex items-center gap-3">
                  <span className="text-lg">{f.icon}</span>
                  <span className="text-slate-300 text-sm">{f.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Notify button */}
          <button
            className={`inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r ${c.btn} text-white font-semibold shadow-xl transition-all hover:scale-105`}
          >
            <Bell className="w-4 h-4" />
            Notify me when it&apos;s ready
          </button>

          {/* Back link */}
          <div className="mt-6">
            <Link
              href="/dpdpa"
              className={`text-sm ${c.text} hover:underline`}
            >
              In the meantime, explore DPDPA 2023 →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
