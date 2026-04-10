"use client";

import { useState } from "react";
import { ChatWindow } from "./ChatWindow";

export function ChatFAB() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && <ChatWindow onClose={() => setOpen(false)} />}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Open AI assistant"
        style={{
          position: "fixed", bottom: 24, right: 24, zIndex: 101,
          width: 54, height: 54, borderRadius: "50%",
          background: open ? "#F59E0B" : "rgba(245,158,11,0.90)",
          border: "2px solid rgba(245,158,11,0.5)",
          cursor: "pointer", fontSize: 22,
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 4px 24px rgba(245,158,11,0.35), 0 0 0 0 rgba(245,158,11,0.4)",
          transition: "transform 0.2s, background 0.2s, box-shadow 0.2s",
          transform: open ? "rotate(10deg) scale(1.05)" : "rotate(0deg) scale(1)",
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLElement).style.transform = "scale(1.08)";
          (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 32px rgba(245,158,11,0.5), 0 0 0 6px rgba(245,158,11,0.12)";
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLElement).style.transform = open ? "rotate(10deg) scale(1.05)" : "scale(1)";
          (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 24px rgba(245,158,11,0.35), 0 0 0 0 rgba(245,158,11,0.4)";
        }}
      >
        {open ? "✕" : "🤖"}
      </button>
    </>
  );
}
