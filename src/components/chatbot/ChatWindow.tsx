"use client";

import { useState, useRef, useEffect } from "react";
import { X, Send, Sparkles, Scale } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const QUICK_SUGGESTIONS = [
  "What is a Data Fiduciary?",
  "How does DPDPA differ from GDPR?",
  "What are the consent rules?",
  "Explain breach notification timeline",
];

function ThinkingDots() {
  return (
    <div style={{ display: "flex", gap: 4, alignItems: "center", padding: "4px 0" }}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`dot-${i + 1}`}
          style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--muted-foreground)" }}
        />
      ))}
    </div>
  );
}

export function ChatWindow({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function send(text?: string) {
    const content = (text ?? input).trim();
    if (!content || loading) return;

    const userMsg: Message = { role: "user", content };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      if (data.message) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.message }]);
      } else {
        setMessages((prev) => [...prev, { role: "assistant", content: "Sorry, something went wrong. Please try again." }]);
      }
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "Network error. Please check your connection." }]);
    } finally {
      setLoading(false);
    }
  }

  function handleKey(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  return (
    <div
      className="chat-pop"
      role="dialog"
      aria-label="Data Crest AI assistant"
      style={{
        position: "fixed",
        bottom: 92,
        right: 24,
        zIndex: 100,
        width: "min(360px, calc(100vw - 32px))",
        height: "min(510px, calc(100dvh - 140px))",
        background: "var(--popover)",
        color: "var(--popover-foreground)",
        border: "1px solid var(--border)",
        borderRadius: 20,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        boxShadow: "var(--elevation-lg)",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "12px 14px",
          borderBottom: "1px solid var(--border)",
          display: "flex",
          alignItems: "center",
          gap: 10,
          background: "color-mix(in srgb, var(--primary) 6%, transparent)",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 10,
            background: "color-mix(in srgb, var(--primary) 12%, transparent)",
            border: "1px solid color-mix(in srgb, var(--primary) 30%, transparent)",
            color: "var(--primary)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Sparkles size={16} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "var(--foreground)" }}>Data Crest AI</div>
          <div style={{ fontSize: 10.5, color: "var(--muted-foreground)" }}>DPDPA &amp; GDPR expert</div>
        </div>
        <button
          onClick={onClose}
          aria-label="Close assistant"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--muted-foreground)",
            padding: 6,
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            transition: "color 0.2s, background 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "var(--foreground)";
            e.currentTarget.style.background = "var(--accent)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "var(--muted-foreground)";
            e.currentTarget.style.background = "none";
          }}
        >
          <X size={16} />
        </button>
      </div>

      {/* Messages */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "14px 14px 8px",
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        {messages.length === 0 && (
          <div style={{ textAlign: "center", padding: "20px 8px" }}>
            <div style={{ color: "var(--primary)", display: "flex", justifyContent: "center", marginBottom: 10 }}>
              <Scale size={26} />
            </div>
            <div style={{ fontSize: 13, color: "var(--muted-foreground)", lineHeight: 1.6 }}>
              Ask me anything about DPDPA 2023, DPDP Rules 2025, or GDPR.
            </div>
            <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 6 }}>
              {QUICK_SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  style={{
                    background: "color-mix(in srgb, var(--primary) 7%, transparent)",
                    border: "1px solid color-mix(in srgb, var(--primary) 20%, transparent)",
                    borderRadius: 10,
                    padding: "8px 12px",
                    fontSize: 12,
                    color: "var(--primary)",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "color-mix(in srgb, var(--primary) 14%, transparent)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "color-mix(in srgb, var(--primary) 7%, transparent)";
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
            <div
              style={{
                maxWidth: "82%",
                padding: "9px 12px",
                borderRadius: msg.role === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
                background: msg.role === "user"
                  ? "color-mix(in srgb, var(--primary) 16%, transparent)"
                  : "var(--secondary)",
                border: msg.role === "user"
                  ? "1px solid color-mix(in srgb, var(--primary) 32%, transparent)"
                  : "1px solid var(--border)",
                fontSize: 12.5,
                lineHeight: 1.65,
                color: msg.role === "user" ? "var(--foreground)" : "var(--secondary-foreground)",
                whiteSpace: "pre-wrap",
              }}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <div
              style={{
                padding: "10px 14px",
                borderRadius: "14px 14px 14px 4px",
                background: "var(--secondary)",
                border: "1px solid var(--border)",
              }}
            >
              <ThinkingDots />
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div
        style={{
          padding: "10px 12px",
          borderTop: "1px solid var(--border)",
          display: "flex",
          gap: 8,
          alignItems: "flex-end",
          flexShrink: 0,
        }}
      >
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Ask about DPDPA or GDPR…"
          aria-label="Message"
          rows={1}
          style={{
            flex: 1,
            resize: "none",
            background: "var(--input)",
            border: "1px solid var(--border)",
            borderRadius: 10,
            padding: "9px 12px",
            color: "var(--foreground)",
            fontFamily: "var(--font-sans)",
            fontSize: 12.5,
            outline: "none",
            lineHeight: 1.5,
            maxHeight: 80,
            overflowY: "auto",
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "var(--ring)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "var(--border)";
          }}
        />
        <button
          onClick={() => send()}
          disabled={!input.trim() || loading}
          aria-label="Send message"
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            border: "none",
            background: input.trim() && !loading ? "var(--primary)" : "var(--muted)",
            color: input.trim() && !loading ? "var(--primary-foreground)" : "var(--muted-foreground)",
            cursor: input.trim() && !loading ? "pointer" : "default",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s",
            flexShrink: 0,
          }}
        >
          <Send size={14} />
        </button>
      </div>
    </div>
  );
}
