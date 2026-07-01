"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { ChatWindow } from "./ChatWindow";

export function ChatFAB() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && <ChatWindow onClose={() => setOpen(false)} />}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close AI assistant" : "Open AI assistant"}
        aria-expanded={open}
        className="fixed bottom-6 right-6 z-[101] flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-[transform,box-shadow] duration-200 hover:scale-105 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring active:scale-95"
        style={{ boxShadow: "0 8px 28px color-mix(in srgb, var(--primary) 40%, transparent)" }}
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>
    </>
  );
}
