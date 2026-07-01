"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/theme";

/** Compact icon toggle for the navbar. Switches between light and coffee dark. */
export function DarkToggle() {
  const { isDark, toggle } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="inline-flex size-10 items-center justify-center rounded-xl border border-border bg-transparent text-muted-foreground transition-colors duration-200 hover:bg-accent hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
    >
      {/* Render a stable icon until mounted to avoid a hydration flash */}
      {mounted && isDark ? <Sun className="size-[18px]" /> : <Moon className="size-[18px]" />}
    </button>
  );
}
