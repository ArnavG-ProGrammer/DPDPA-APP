"use client";

import { useEffect, useRef, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

interface EncryptedTextProps {
  text: string;
  className?: string;
  encryptedClassName?: string;
  revealedClassName?: string;
  revealDelayMs?: number;
  triggerOnMount?: boolean;
}

export function EncryptedText({
  text,
  className = "",
  encryptedClassName = "text-slate-500",
  revealedClassName = "text-white",
  revealDelayMs = 40,
  triggerOnMount = true,
}: EncryptedTextProps) {
  // Initialize with actual text to avoid SSR/client hydration mismatch
  const [display, setDisplay] = useState<string[]>(text.split(""));
  const [revealed, setRevealed] = useState<boolean[]>(new Array(text.length).fill(true));
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const indexRef = useRef(0);

  useEffect(() => {
    if (!triggerOnMount) return;

    // Scramble all characters first (client-only, after hydration)
    setRevealed(new Array(text.length).fill(false));
    setDisplay(text.split("").map(() => CHARS[Math.floor(Math.random() * CHARS.length)]));
    indexRef.current = 0;

    const timeout = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        const idx = indexRef.current;
        setDisplay((prev) =>
          prev.map((ch, i) =>
            i <= idx ? text[i] : CHARS[Math.floor(Math.random() * CHARS.length)]
          )
        );
        setRevealed((prev) =>
          prev.map((v, i) => (i <= idx ? true : v))
        );
        indexRef.current++;
        if (indexRef.current >= text.length) {
          clearInterval(intervalRef.current!);
        }
      }, revealDelayMs);
    }, 600);

    return () => {
      clearTimeout(timeout);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text, revealDelayMs, triggerOnMount]);

  return (
    <span className={className} suppressHydrationWarning>
      {display.map((ch, i) => (
        <span
          key={i}
          suppressHydrationWarning
          className={`transition-colors duration-150 ${
            revealed[i] ? revealedClassName : encryptedClassName
          }`}
        >
          {text[i] === " " ? "\u00A0" : ch}
        </span>
      ))}
    </span>
  );
}
