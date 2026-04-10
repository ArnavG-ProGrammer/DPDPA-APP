"use client";

import { useState, useRef, useEffect } from "react";
import { X, Send } from "lucide-react";

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
      {[0, 1, 2].map(i => (
        <div key={i} className={`dot-${i + 1}`} style={{
          width: 6, height: 6, borderRadius: "50%",
          background: "#94A3B8",
        }} />
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
        setMessages(prev => [...prev, { role: "assistant", content: data.message }]);
      } else {
        setMessages(prev => [...prev, { role: "assistant", content: "Sorry, something went wrong. Please try again." }]);
      }
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "Network error. Please check your connection." }]);
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
    <div className="chat-pop" style={{
      position: "fixed", bottom: 88, right: 24, zIndex: 100,
      width: 360, height: 510,
      background: "rgba(3,7,18,0.97)",
      border: "1px solid rgba(245,158,11,0.25)",
      borderRadius: 20,
      backdropFilter: "blur(24px)",
      display: "flex", flexDirection: "column",
      overflow: "hidden",
      boxShadow: "0 24px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(245,158,11,0.1)",
    }}>
      {/* Header */}
      <div style={{
        padding: "14px 16px",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        display: "flex", alignItems: "center", gap: 10,
        background: "rgba(245,158,11,0.04)",
        flexShrink: 0,
      }}>
        <div style={{
          width: 32, height: 32, borderRadius: 10,
          background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.3)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 16,
        }}>🤖</div>
        <div style={{ flex: 1 }}>
          <div style={{
            fontFamily: "var(--font-ibm), sans-serif",
            fontSize: 13, fontWeight: 600, color: "#F0EAD6",
          }}>Data Crest AI</div>
          <div style={{
            fontFamily: "var(--font-ibm), sans-serif",
            fontSize: 10, color: "#4B5563",
          }}>DPDPA & GDPR expert</div>
        </div>
        <button onClick={onClose} style={{
          background: "none", border: "none", cursor: "pointer",
          color: "#4B5563", padding: 4, borderRadius: 6,
          display: "flex", alignItems: "center",
          transition: "color 0.2s",
        }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#F0EAD6"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#4B5563"; }}
        >
          <X size={16} />
        </button>
      </div>

      {/* Messages */}
      <div style={{
        flex: 1, overflowY: "auto", padding: "14px 14px 8px",
        display: "flex", flexDirection: "column", gap: 10,
        scrollbarWidth: "thin",
        scrollbarColor: "rgba(245,158,11,0.2) transparent",
      }}>
        {messages.length === 0 && (
          <div style={{ textAlign: "center", padding: "20px 8px" }}>
            <div style={{ fontSize: 28, marginBottom: 10 }}>⚖️</div>
            <div style={{
              fontFamily: "var(--font-ibm), sans-serif",
              fontSize: 13, color: "#94A3B8", lineHeight: 1.6,
            }}>
              Ask me anything about DPDPA 2023, DPDP Rules 2025, or GDPR.
            </div>
            <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 6 }}>
              {QUICK_SUGGESTIONS.map(s => (
                <button key={s} onClick={() => send(s)} style={{
                  background: "rgba(245,158,11,0.06)",
                  border: "1px solid rgba(245,158,11,0.15)",
                  borderRadius: 8, padding: "7px 12px",
                  fontFamily: "var(--font-ibm), sans-serif",
                  fontSize: 11.5, color: "#F59E0B",
                  cursor: "pointer", textAlign: "left",
                  transition: "background 0.2s",
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(245,158,11,0.12)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(245,158,11,0.06)"; }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} style={{
            display: "flex",
            justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
          }}>
            <div style={{
              maxWidth: "82%",
              padding: "9px 12px",
              borderRadius: msg.role === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
              background: msg.role === "user"
                ? "rgba(245,158,11,0.18)"
                : "rgba(255,255,255,0.05)",
              border: msg.role === "user"
                ? "1px solid rgba(245,158,11,0.3)"
                : "1px solid rgba(255,255,255,0.07)",
              fontFamily: "var(--font-ibm), sans-serif",
              fontSize: 12.5, lineHeight: 1.65,
              color: msg.role === "user" ? "#F0EAD6" : "#94A3B8",
              whiteSpace: "pre-wrap",
            }}>
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <div style={{
              padding: "10px 14px",
              borderRadius: "14px 14px 14px 4px",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}>
              <ThinkingDots />
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{
        padding: "10px 12px",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        display: "flex", gap: 8, alignItems: "flex-end",
        flexShrink: 0,
      }}>
        <textarea
          ref={textareaRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Ask about DPDPA or GDPR…"
          rows={1}
          style={{
            flex: 1, resize: "none", background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10,
            padding: "9px 12px", color: "#F0EAD6",
            fontFamily: "var(--font-ibm), sans-serif", fontSize: 12.5,
            outline: "none", lineHeight: 1.5,
            maxHeight: 80, overflowY: "auto",
          }}
          onFocus={e => { e.currentTarget.style.borderColor = "rgba(245,158,11,0.3)"; }}
          onBlur={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
        />
        <button
          onClick={() => send()}
          disabled={!input.trim() || loading}
          style={{
            width: 34, height: 34, borderRadius: 10, border: "none",
            background: input.trim() && !loading ? "#F59E0B" : "rgba(245,158,11,0.15)",
            color: input.trim() && !loading ? "#030712" : "#4B5563",
            cursor: input.trim() && !loading ? "pointer" : "default",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.2s", flexShrink: 0,
          }}
        >
          <Send size={14} />
        </button>
      </div>
    </div>
  );
}
