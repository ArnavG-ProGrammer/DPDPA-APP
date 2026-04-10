"use client";

import { useTheme } from "@/contexts/theme";

export function DarkToggle() {
  const { isDark, toggle } = useTheme();

  return (
    <div className="flex items-center gap-2.5">
      <span style={{ fontSize: "10px", color: "var(--dc-text2)", fontFamily: "var(--font-space)", letterSpacing: "0.12em", fontWeight: 600 }}>
        {isDark ? "DARK" : "LIGHT"}
      </span>
      <button
        onClick={toggle}
        aria-label="Toggle light/dark mode"
        className="relative focus:outline-none"
        style={{
          width: "52px",
          height: "28px",
          borderRadius: "14px",
          background: isDark
            ? "linear-gradient(135deg, #1a2d4a 0%, #0d1a2e 100%)"
            : "linear-gradient(135deg, #87ceeb 0%, #fde68a 100%)",
          boxShadow: isDark
            ? "inset 0 2px 6px rgba(0,0,0,0.5), 0 0 10px rgba(100,160,220,0.12)"
            : "inset 0 2px 6px rgba(0,0,0,0.15), 0 0 16px rgba(251,191,36,0.35)",
          transition: "all 0.4s cubic-bezier(0.34,1.56,0.64,1)",
          border: `1px solid ${isDark ? "rgba(100,160,220,0.15)" : "rgba(251,191,36,0.3)"}`,
        }}
      >
        {/* Stars */}
        {isDark && [
          { top: "6px",  left: "6px",  size: "1.5px" },
          { top: "13px", left: "10px", size: "1px" },
          { top: "8px",  left: "16px", size: "1px" },
        ].map((s, i) => (
          <span key={i} className="absolute rounded-full bg-white/70"
            style={{ top: s.top, left: s.left, width: s.size, height: s.size }} />
        ))}

        {/* Thumb */}
        <span
          className="absolute top-[3px] flex items-center justify-center text-[11px]"
          style={{
            width: "22px",
            height: "22px",
            borderRadius: "50%",
            left: isDark ? "calc(100% - 25px)" : "3px",
            background: isDark
              ? "linear-gradient(135deg, #f6d365, #fdb97d)"
              : "linear-gradient(135deg, #fbbf24, #f59e0b)",
            boxShadow: isDark
              ? "0 0 10px rgba(253,185,125,0.7), 0 2px 4px rgba(0,0,0,0.4)"
              : "0 0 14px rgba(251,191,36,0.9), 0 2px 4px rgba(0,0,0,0.2)",
            transition: "all 0.4s cubic-bezier(0.34,1.56,0.64,1)",
          }}
        >
          {isDark ? "🌙" : "☀️"}
        </span>
      </button>
    </div>
  );
}
