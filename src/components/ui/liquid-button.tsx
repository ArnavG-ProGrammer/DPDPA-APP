"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface LiquidButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost";
  children: React.ReactNode;
}

export function LiquidButton({ variant = "primary", children, className, ...props }: LiquidButtonProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-base cursor-pointer select-none focus:outline-none overflow-hidden",
        className
      )}
      style={{
        background: variant === "primary"
          ? hovered
            ? "linear-gradient(135deg, #d4af37 0%, #c9a227 40%, #b8921a 100%)"
            : "linear-gradient(135deg, #c9a227 0%, #b8921a 40%, #9a7818 100%)"
          : hovered
            ? "rgba(255,255,255,0.08)"
            : "rgba(255,255,255,0.04)",
        boxShadow: variant === "primary"
          ? hovered
            ? "0 0 40px rgba(201,162,39,0.7), 0 0 80px rgba(201,162,39,0.3), 0 8px 30px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.3)"
            : "0 0 20px rgba(201,162,39,0.4), 0 0 40px rgba(201,162,39,0.15), 0 4px 15px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)"
          : hovered
            ? "0 0 20px rgba(255,255,255,0.1), inset 0 1px 0 rgba(255,255,255,0.15)"
            : "inset 0 1px 0 rgba(255,255,255,0.08)",
        border: variant === "primary"
          ? "1px solid rgba(255,220,100,0.4)"
          : "1px solid rgba(255,255,255,0.12)",
        color: variant === "primary" ? "#0a0d14" : "#fff",
        backdropFilter: "blur(10px)",
        transform: hovered ? "scale(1.05) translateY(-1px)" : "scale(1) translateY(0)",
        transition: "all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)",
        fontFamily: "var(--font-space, inherit)",
        letterSpacing: "0.04em",
      }}
      {...props}
    >
      {/* Glass shimmer overlay */}
      <span
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0) 100%)",
          opacity: hovered ? 0.8 : 0.4,
          transition: "opacity 0.25s",
        }}
      />
      {/* Liquid shimmer sweep */}
      <span
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)",
          transform: hovered ? "translateX(100%)" : "translateX(-100%)",
          transition: hovered ? "transform 0.6s ease" : "none",
        }}
      />
      {/* Content */}
      <span className="relative z-10 flex items-center gap-2 font-bold">
        {children}
      </span>
    </button>
  );
}
