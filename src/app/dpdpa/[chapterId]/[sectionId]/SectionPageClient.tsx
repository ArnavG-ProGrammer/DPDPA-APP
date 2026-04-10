"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Copy, Check, Star } from "lucide-react";
import { dpdpaAct } from "@/data/dpdpa";
import {
  markRead, markFlashcardsComplete, markQuizCorrect,
  computeScore, getProgress,
} from "@/lib/progress";

type Tab = "content" | "flashcards" | "quiz" | "author" | "rules" | "gdpr" | "notes";

const TABS: { id: Tab; icon: string; label: string }[] = [
  { id: "content",    icon: "📄", label: "Content" },
  { id: "flashcards", icon: "🃏", label: "Flashcards" },
  { id: "quiz",       icon: "🧠", label: "Quiz" },
  { id: "author",     icon: "✍️", label: "Author's Note" },
  { id: "rules",      icon: "📋", label: "DPDP Rules" },
  { id: "gdpr",       icon: "🏛️", label: "GDPR Link" },
  { id: "notes",      icon: "📝", label: "My Notes" },
];

const ACCENT = "#F59E0B";

// Maps an article number extracted from "Article X - ..." to a GDPR section URL
const GDPR_ARTICLE_MAP: Record<number, { chapterId: string; sectionId: string }> = {
  1: { chapterId: "ch1", sectionId: "g1-1" },
  2: { chapterId: "ch1", sectionId: "g1-2" }, 3: { chapterId: "ch1", sectionId: "g1-2" },
  4: { chapterId: "ch1", sectionId: "g1-3" },
  5: { chapterId: "ch2", sectionId: "g2-1" },
  6: { chapterId: "ch2", sectionId: "g2-2" },
  7: { chapterId: "ch2", sectionId: "g2-3" }, 8: { chapterId: "ch2", sectionId: "g2-3" },
  9: { chapterId: "ch2", sectionId: "g2-4" },
  12: { chapterId: "ch3", sectionId: "g3-1" }, 13: { chapterId: "ch3", sectionId: "g3-1" },
  14: { chapterId: "ch3", sectionId: "g3-1" }, 15: { chapterId: "ch3", sectionId: "g3-1" },
  20: { chapterId: "ch3", sectionId: "g3-1" },
  16: { chapterId: "ch3", sectionId: "g3-2" }, 17: { chapterId: "ch3", sectionId: "g3-2" },
  18: { chapterId: "ch3", sectionId: "g3-2" }, 19: { chapterId: "ch3", sectionId: "g3-2" },
  21: { chapterId: "ch3", sectionId: "g3-2" },
  22: { chapterId: "ch3", sectionId: "g3-3" },
  23: { chapterId: "ch3", sectionId: "g3-4" },
  24: { chapterId: "ch4", sectionId: "g4-1" }, 25: { chapterId: "ch4", sectionId: "g4-1" },
  28: { chapterId: "ch4", sectionId: "g4-2" },
  30: { chapterId: "ch4", sectionId: "g4-3" },
  32: { chapterId: "ch4", sectionId: "g4-4" },
  33: { chapterId: "ch4", sectionId: "g4-5" }, 34: { chapterId: "ch4", sectionId: "g4-5" },
  35: { chapterId: "ch4", sectionId: "g4-6" },
  37: { chapterId: "ch4", sectionId: "g4-7" }, 38: { chapterId: "ch4", sectionId: "g4-7" },
  39: { chapterId: "ch4", sectionId: "g4-7" },
  45: { chapterId: "ch5", sectionId: "g5-1" },
  46: { chapterId: "ch5", sectionId: "g5-2" },
  47: { chapterId: "ch5", sectionId: "g5-3" },
  49: { chapterId: "ch5", sectionId: "g5-4" },
  51: { chapterId: "ch6", sectionId: "g6-1" }, 52: { chapterId: "ch6", sectionId: "g6-1" },
  53: { chapterId: "ch6", sectionId: "g6-1" }, 54: { chapterId: "ch6", sectionId: "g6-1" },
  57: { chapterId: "ch6", sectionId: "g6-2" }, 58: { chapterId: "ch6", sectionId: "g6-2" },
};

function gdprArticleUrl(ref: string): string {
  const match = ref.match(/Article\s+(\d+)/i);
  if (!match) return "/gdpr";
  const num = parseInt(match[1]);
  const loc = GDPR_ARTICLE_MAP[num];
  return loc ? `/gdpr/${loc.chapterId}/${loc.sectionId}` : "/gdpr";
}

function ruleUrl(ref: string): string {
  const match = ref.match(/Rule\s+(\d+)/i);
  if (!match) return "/dpdp-rules";
  return `/dpdp-rules#rule-${match[1]}`;
}

const crumbStyle: React.CSSProperties = {
  fontSize: 12, fontFamily: "var(--font-ibm), sans-serif",
  color: "#4B5563", textDecoration: "none", whiteSpace: "nowrap",
};

// ─── Score Widget ─────────────────────────────────────────────────────────────
function ScoreWidget({ score, pct }: { score: number; pct: number }) {
  const radius = 22;
  const circ = 2 * Math.PI * radius;
  const dash = circ * pct;

  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 10,
      padding: "8px 16px", borderRadius: 40,
      background: "rgba(245,158,11,0.07)", border: "1px solid rgba(245,158,11,0.2)",
    }}>
      <svg width={52} height={52} style={{ transform: "rotate(-90deg)", flexShrink: 0 }}>
        <circle cx={26} cy={26} r={radius} fill="none" stroke="rgba(245,158,11,0.12)" strokeWidth={4} />
        <circle cx={26} cy={26} r={radius} fill="none" stroke="#F59E0B" strokeWidth={4}
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
          style={{ transition: "stroke-dasharray 0.6s ease" }}
        />
      </svg>
      <div>
        <div style={{
          fontFamily: "var(--font-mono), monospace", fontSize: 20, fontWeight: 700,
          color: "#F59E0B", lineHeight: 1,
        }}>
          {score}<span style={{ fontSize: 11, color: "#4B5563" }}>/1000</span>
        </div>
        <div style={{ fontFamily: "var(--font-ibm), sans-serif", fontSize: 10, color: "#4B5563", marginTop: 2 }}>
          Learning Score
        </div>
      </div>
      <Star size={13} color="#F59E0B" fill="#F59E0B" style={{ flexShrink: 0 }} />
    </div>
  );
}

// ─── Flashcard Tab ────────────────────────────────────────────────────────────
function FlashcardsTab({
  cards, sectionId, onUpdate,
}: { cards: { front: string; back: string }[]; sectionId: string; onUpdate: () => void }) {
  const [current, setCurrent] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [seen, setSeen] = useState<Set<number>>(new Set());
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const p = getProgress();
    if (p.flashcards.includes(sectionId)) setCompleted(true);
  }, [sectionId]);

  const card = cards[current];
  const progress = seen.size;

  const markSeen = useCallback(() => {
    const next = new Set(seen);
    next.add(current);
    setSeen(next);
    if (next.size === cards.length && !completed) {
      setCompleted(true);
      markFlashcardsComplete(sectionId);
      onUpdate();
    }
  }, [current, seen, cards.length, completed, sectionId, onUpdate]);

  const handleFlip = () => {
    setFlipped(f => !f);
    if (!flipped) markSeen();
  };

  const next = () => {
    setFlipped(false);
    setCurrent(c => (c + 1) % cards.length);
  };
  const prev = () => {
    setFlipped(false);
    setCurrent(c => (c - 1 + cards.length) % cards.length);
  };

  return (
    <div style={{ background: "#0B1526", borderRadius: 18, border: "1px solid rgba(249,115,22,0.15)", padding: 28 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, flexWrap: "wrap", gap: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(249,115,22,0.1)", border: "1px solid rgba(249,115,22,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🃏</div>
          <div>
            <div style={{ fontFamily: "var(--font-ibm), sans-serif", fontWeight: 600, color: "#F97316", fontSize: 13 }}>Flashcards</div>
            <div style={{ fontFamily: "var(--font-ibm), sans-serif", fontSize: 11, color: "#4B5563" }}>Click card to reveal answer</div>
          </div>
        </div>
        <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: 13, color: "#4B5563" }}>
          {current + 1} / {cards.length}
        </div>
      </div>

      {/* Progress dots */}
      <div style={{ display: "flex", gap: 6, marginBottom: 24 }}>
        {cards.map((_, i) => (
          <div key={i} onClick={() => { setFlipped(false); setCurrent(i); }} style={{
            height: 4, flex: 1, borderRadius: 2, cursor: "pointer",
            background: seen.has(i) ? "#F97316" : (i === current ? "rgba(249,115,22,0.4)" : "rgba(255,255,255,0.06)"),
            transition: "background 0.3s",
          }} />
        ))}
      </div>

      {/* Card */}
      <div
        onClick={handleFlip}
        style={{
          position: "relative", cursor: "pointer",
          minHeight: 200, borderRadius: 16, marginBottom: 20,
          background: flipped ? "rgba(249,115,22,0.08)" : "rgba(255,255,255,0.03)",
          border: `1px solid ${flipped ? "rgba(249,115,22,0.3)" : "rgba(255,255,255,0.08)"}`,
          transition: "all 0.35s",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          padding: 32, textAlign: "center",
        }}
      >
        <div style={{ fontFamily: "var(--font-ibm), sans-serif", fontSize: 10, color: flipped ? "#F97316" : "#4B5563", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 16, fontWeight: 600 }}>
          {flipped ? "✦ Answer" : "? Question"}
        </div>
        <div style={{
          fontFamily: flipped ? "var(--font-ibm), sans-serif" : "var(--font-playfair), Georgia, serif",
          fontSize: flipped ? 14.5 : 17,
          lineHeight: 1.65,
          color: flipped ? "#94A3B8" : "#F0EAD6",
          fontWeight: flipped ? 400 : 600,
        }}>
          {flipped ? card.back : card.front}
        </div>
        {!flipped && (
          <div style={{ marginTop: 20, fontSize: 11, color: "#4B5563", fontFamily: "var(--font-ibm), sans-serif" }}>
            Tap to reveal →
          </div>
        )}
      </div>

      <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
        <button onClick={prev} style={{
          padding: "10px 24px", borderRadius: 10,
          background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
          color: "#94A3B8", fontFamily: "var(--font-ibm), sans-serif", fontSize: 13,
          cursor: "pointer", display: "flex", alignItems: "center", gap: 6,
        }}>
          <ArrowLeft size={13} /> Prev
        </button>
        <button onClick={next} style={{
          padding: "10px 24px", borderRadius: 10,
          background: "#F97316", border: "none",
          color: "#030712", fontFamily: "var(--font-ibm), sans-serif", fontSize: 13, fontWeight: 600,
          cursor: "pointer", display: "flex", alignItems: "center", gap: 6,
        }}>
          Next <ArrowRight size={13} />
        </button>
      </div>

      {completed && (
        <div style={{
          marginTop: 20, padding: "14px 20px", borderRadius: 12,
          background: "rgba(249,115,22,0.07)", border: "1px solid rgba(249,115,22,0.2)",
          textAlign: "center", fontFamily: "var(--font-ibm), sans-serif", fontSize: 13, color: "#F97316",
        }}>
          🔥 All flashcards reviewed! +2 points earned
        </div>
      )}
    </div>
  );
}

// ─── Quiz Tab ─────────────────────────────────────────────────────────────────
function QuizTab({
  questions, sectionId, onUpdate,
}: { questions: { question: string; options: string[]; answer: number; explanation?: string }[]; sectionId: string; onUpdate: () => void }) {
  const [answers, setAnswers] = useState<Record<number, number | null>>({});
  const [correct, setCorrect] = useState<Set<number>>(new Set());

  useEffect(() => {
    const p = getProgress();
    setCorrect(new Set(p.quiz[sectionId] ?? []));
  }, [sectionId]);

  const select = (qIdx: number, optIdx: number) => {
    if (answers[qIdx] !== undefined) return; // already answered
    setAnswers(a => ({ ...a, [qIdx]: optIdx }));
    const q = questions[qIdx];
    if (optIdx === q.answer && !correct.has(qIdx)) {
      markQuizCorrect(sectionId, qIdx);
      setCorrect(c => new Set([...c, qIdx]));
      onUpdate();
    }
  };

  const allDone = questions.every((_, i) => answers[i] !== undefined);
  const score = questions.filter((_, i) => answers[i] === questions[i].answer).length;

  return (
    <div style={{ background: "#0B1526", borderRadius: 18, border: "1px solid rgba(139,92,246,0.15)", padding: 28 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🧠</div>
        <div>
          <div style={{ fontFamily: "var(--font-ibm), sans-serif", fontWeight: 600, color: "#8B5CF6", fontSize: 13 }}>Quick Quiz</div>
          <div style={{ fontFamily: "var(--font-ibm), sans-serif", fontSize: 11, color: "#4B5563" }}>{questions.length} question{questions.length !== 1 ? "s" : ""} · select to answer</div>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
        {questions.map((q, qIdx) => {
          const chosen = answers[qIdx] ?? null;
          const revealed = chosen !== null;
          const isCorrect = chosen === q.answer;

          return (
            <div key={qIdx}>
              <div style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontSize: 16, color: "#F0EAD6", lineHeight: 1.5, marginBottom: 14,
              }}>
                <span style={{ color: "#8B5CF6", fontFamily: "var(--font-mono), monospace", fontSize: 12 }}>Q{qIdx + 1}. </span>
                {q.question}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {q.options.map((opt, oIdx) => {
                  let bg = "rgba(255,255,255,0.02)";
                  let border = "rgba(255,255,255,0.08)";
                  let color = "#94A3B8";
                  if (revealed) {
                    if (oIdx === q.answer) { bg = "rgba(16,185,129,0.08)"; border = "rgba(16,185,129,0.3)"; color = "#10B981"; }
                    else if (oIdx === chosen && !isCorrect) { bg = "rgba(239,68,68,0.08)"; border = "rgba(239,68,68,0.3)"; color = "#EF4444"; }
                  } else {
                    bg = "rgba(255,255,255,0.02)";
                  }

                  return (
                    <button key={oIdx} onClick={() => select(qIdx, oIdx)} style={{
                      display: "flex", alignItems: "center", gap: 12,
                      padding: "13px 16px", borderRadius: 10, cursor: revealed ? "default" : "pointer",
                      background: bg, border: `1px solid ${border}`,
                      textAlign: "left", transition: "all 0.25s",
                    }}
                      onMouseEnter={e => { if (!revealed) (e.currentTarget as HTMLElement).style.borderColor = "rgba(139,92,246,0.35)"; }}
                      onMouseLeave={e => { if (!revealed) (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)"; }}
                    >
                      <span style={{
                        width: 26, height: 26, borderRadius: 6, flexShrink: 0,
                        background: revealed && oIdx === q.answer ? "#10B981" : (revealed && oIdx === chosen ? "#EF4444" : "rgba(255,255,255,0.05)"),
                        border: `1px solid ${revealed && oIdx === q.answer ? "#10B981" : "rgba(255,255,255,0.15)"}`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontFamily: "var(--font-mono), monospace", fontSize: 11, color: revealed && (oIdx === q.answer || oIdx === chosen) ? "#030712" : "#4B5563",
                        fontWeight: 600,
                      }}>
                        {revealed && oIdx === q.answer ? "✓" : revealed && oIdx === chosen ? "✗" : String.fromCharCode(65 + oIdx)}
                      </span>
                      <span style={{ fontFamily: "var(--font-ibm), sans-serif", fontSize: 13.5, color, lineHeight: 1.5 }}>
                        {opt}
                      </span>
                    </button>
                  );
                })}
              </div>

              {revealed && q.explanation && (
                <div style={{
                  marginTop: 12, padding: "14px 16px", borderRadius: 10,
                  background: isCorrect ? "rgba(16,185,129,0.06)" : "rgba(245,158,11,0.06)",
                  border: `1px solid ${isCorrect ? "rgba(16,185,129,0.2)" : "rgba(245,158,11,0.2)"}`,
                  fontFamily: "var(--font-ibm), sans-serif", fontSize: 13, lineHeight: 1.65,
                  color: "#94A3B8",
                }}>
                  <span style={{ color: isCorrect ? "#10B981" : "#F59E0B", fontWeight: 600, marginRight: 8 }}>
                    {isCorrect ? "✓ Correct!" : "✗ Not quite."}</span>
                  {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {allDone && (
        <div style={{
          marginTop: 28, padding: "18px 24px", borderRadius: 12,
          background: score === questions.length ? "rgba(16,185,129,0.08)" : "rgba(245,158,11,0.07)",
          border: `1px solid ${score === questions.length ? "rgba(16,185,129,0.25)" : "rgba(245,158,11,0.2)"}`,
          textAlign: "center",
        }}>
          <div style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: 22, color: score === questions.length ? "#10B981" : "#F59E0B", marginBottom: 6 }}>
            {score}/{questions.length} correct
          </div>
          <div style={{ fontFamily: "var(--font-ibm), sans-serif", fontSize: 13, color: "#4B5563" }}>
            {score === questions.length ? "🎉 Perfect score! " : score > 0 ? "📖 Good effort — review the explanations above. " : "💡 Re-read the content and try again. "}
            +{score * 3} points added to your score.
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function SectionPageClient({
  params,
}: {
  params: { chapterId: string; sectionId: string };
}) {
  const [activeTab, setActiveTab] = useState<Tab>("content");
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const [score, setScore] = useState(0);
  const [scorePct, setScorePct] = useState(0);

  const allSectionsFlat = dpdpaAct.chapters.flatMap(ch =>
    ch.sections.map(s => ({ ...s, chapterId: ch.id }))
  );

  const refreshScore = useCallback(() => {
    const { score: s, pct } = computeScore(allSectionsFlat);
    setScore(s);
    setScorePct(pct);
  }, []); // eslint-disable-line

  const chapter = dpdpaAct.chapters.find(c => c.id === params.chapterId);
  const section = chapter?.sections.find(s => s.id === params.sectionId);

  const sIdx = allSectionsFlat.findIndex(s => s.id === params.sectionId);
  const prevSec = sIdx > 0 ? allSectionsFlat[sIdx - 1] : null;
  const nextSec = sIdx < allSectionsFlat.length - 1 ? allSectionsFlat[sIdx + 1] : null;

  useEffect(() => {
    markRead(params.sectionId);
    refreshScore();
    const stored = localStorage.getItem(`note-${params.sectionId}`);
    if (stored) setNote(stored);
  }, [params.sectionId, refreshScore]);

  const saveNote = () => {
    localStorage.setItem(`note-${params.sectionId}`, note);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const copyContent = () => {
    if (section?.content) {
      navigator.clipboard.writeText(section.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!chapter || !section) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>⚠️</div>
          <h2 style={{ fontFamily: "var(--font-playfair), Georgia, serif", color: "#F0EAD6", marginBottom: 12 }}>
            Section not found
          </h2>
          <Link href="/dpdpa" style={{ color: "#F59E0B", fontFamily: "var(--font-ibm), sans-serif", textDecoration: "none" }}>
            ← Back to DPDPA
          </Link>
        </div>
      </div>
    );
  }

  const hasFlashcards = (section.flashcards?.length ?? 0) > 0;
  const hasQuiz = (section.quiz?.length ?? 0) > 0;

  const visibleTabs = TABS.filter(t => {
    if (t.id === "flashcards" && !hasFlashcards) return false;
    if (t.id === "quiz" && !hasQuiz) return false;
    return true;
  });

  return (
    <div style={{ minHeight: "100vh" }}>
      <nav style={{
        position: "sticky", top: 0, zIndex: 40,
        background: "rgba(3,7,18,0.92)", backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(245,158,11,0.12)",
        padding: "0 16px", height: 56,
        display: "flex", alignItems: "center", gap: 8,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, flex: 1, overflow: "hidden" }}>
          <Link href="/" style={crumbStyle}>Home</Link>
          <span style={{ color: "#4B5563", fontSize: 12 }}>›</span>
          <Link href="/dpdpa" style={crumbStyle}>DPDPA</Link>
          <span style={{ color: "#4B5563", fontSize: 12 }}>›</span>
          <span style={{ ...crumbStyle, color: ACCENT, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis" }}>
            {section.title}
          </span>
        </div>
        <ScoreWidget score={score} pct={scorePct} />
      </nav>

      <div style={{ maxWidth: 820, margin: "0 auto", padding: "40px 24px 120px" }}>
        <Link href="/dpdpa" style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          color: "#4B5563", textDecoration: "none", fontSize: 13,
          fontFamily: "var(--font-ibm), sans-serif",
          marginBottom: 32, transition: "color 0.2s",
        }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = ACCENT; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#4B5563"; }}
        >
          <ArrowLeft size={14} /> All Chapters
        </Link>

        {/* Header */}
        <div className="fade-up" style={{ marginBottom: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
            <span style={{
              fontFamily: "var(--font-mono), monospace", fontSize: 11, padding: "4px 12px",
              borderRadius: 20, background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.25)", color: ACCENT,
            }}>
              Chapter {chapter.number} · §{section.number}
            </span>
            <span style={{
              fontSize: 11, padding: "4px 10px", borderRadius: 20,
              background: "rgba(6,182,212,0.08)", border: "1px solid rgba(6,182,212,0.2)",
              color: "#06B6D4", fontFamily: "var(--font-ibm), sans-serif",
            }}>
              India 🇮🇳 · DPDPA 2023
            </span>
            {hasFlashcards && <span style={{ fontSize: 11, padding: "4px 10px", borderRadius: 20, background: "rgba(249,115,22,0.08)", border: "1px solid rgba(249,115,22,0.2)", color: "#F97316", fontFamily: "var(--font-ibm), sans-serif" }}>🃏 Flashcards</span>}
            {hasQuiz && <span style={{ fontSize: 11, padding: "4px 10px", borderRadius: 20, background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.2)", color: "#8B5CF6", fontFamily: "var(--font-ibm), sans-serif" }}>🧠 Quiz</span>}
          </div>
          <h1 style={{
            fontFamily: "var(--font-playfair), Georgia, serif",
            fontSize: "clamp(1.7rem, 4vw, 2.4rem)", fontWeight: 700,
            color: "#F0EAD6", lineHeight: 1.2, marginBottom: 8,
          }}>
            {section.title}
          </h1>
          <div style={{ fontFamily: "var(--font-ibm), sans-serif", fontSize: 13, color: "#4B5563" }}>
            {chapter.title} · DPDPA 2023
          </div>
        </div>

        {/* Tab Bar */}
        <div className="fade-up-1" style={{
          display: "flex", gap: 4, flexWrap: "wrap",
          background: "#0B1526", borderRadius: 14, padding: 6,
          border: "1px solid rgba(245,158,11,0.1)", marginBottom: 28,
        }}>
          {visibleTabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
              padding: "8px 14px", borderRadius: 10, border: "none", cursor: "pointer",
              fontFamily: "var(--font-ibm), sans-serif", fontSize: 12, fontWeight: 500,
              display: "flex", alignItems: "center", gap: 6,
              transition: "all 0.2s",
              background: activeTab === tab.id ? ACCENT : "transparent",
              color: activeTab === tab.id ? "#030712" : "#4B5563",
              whiteSpace: "nowrap",
            }}>
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="fade-up-2">

          {activeTab === "content" && (
            <div style={{ background: "#0B1526", borderRadius: 18, border: "1px solid rgba(245,158,11,0.12)", padding: 28 }}>
              <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
                <button onClick={copyContent} style={{
                  display: "flex", alignItems: "center", gap: 6,
                  padding: "6px 14px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.1)",
                  background: "transparent", cursor: "pointer",
                  color: copied ? ACCENT : "#4B5563",
                  fontFamily: "var(--font-ibm), sans-serif", fontSize: 12, transition: "color 0.2s",
                }}>
                  {copied ? <Check size={12} /> : <Copy size={12} />}
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
              <pre style={{
                fontFamily: "var(--font-ibm), sans-serif",
                fontSize: 14.5, lineHeight: 1.9, color: "#94A3B8",
                whiteSpace: "pre-wrap", margin: 0,
              }}>
                {section.content}
              </pre>
            </div>
          )}

          {activeTab === "flashcards" && hasFlashcards && (
            <FlashcardsTab cards={section.flashcards!} sectionId={section.id} onUpdate={refreshScore} />
          )}

          {activeTab === "quiz" && hasQuiz && (
            <QuizTab questions={section.quiz!} sectionId={section.id} onUpdate={refreshScore} />
          )}

          {activeTab === "author" && (
            <div style={{ background: "rgba(245,158,11,0.05)", borderLeft: "3px solid #F59E0B", borderRadius: "0 18px 18px 0", padding: 28 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>✍️</div>
                <div>
                  <div style={{ fontFamily: "var(--font-ibm), sans-serif", fontWeight: 600, color: ACCENT, fontSize: 13 }}>Author&apos;s Commentary</div>
                  <div style={{ fontFamily: "var(--font-ibm), sans-serif", fontSize: 11, color: "#4B5563" }}>Expert legal analysis</div>
                </div>
              </div>
              <div style={{ fontFamily: "var(--font-ibm), sans-serif", fontSize: 14.5, lineHeight: 1.85, color: "#94A3B8", whiteSpace: "pre-wrap" }}>
                {"authorNote" in section && section.authorNote ? String(section.authorNote) : "Coming Soon — Expert commentary on this provision will be published here."}
              </div>
            </div>
          )}

          {activeTab === "rules" && (
            <div style={{ background: "rgba(6,182,212,0.05)", borderLeft: "3px solid #06B6D4", borderRadius: "0 18px 18px 0", padding: 28 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(6,182,212,0.12)", border: "1px solid rgba(6,182,212,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>📋</div>
                <div>
                  <div style={{ fontFamily: "var(--font-ibm), sans-serif", fontWeight: 600, color: "#06B6D4", fontSize: 13 }}>DPDP Rules 2025</div>
                  <div style={{ fontFamily: "var(--font-ibm), sans-serif", fontSize: 11, color: "#4B5563" }}>Cross-reference to implementing rules</div>
                </div>
              </div>
              {section.relatedRules && section.relatedRules.length > 0 ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {section.relatedRules.map((ref, i) => (
                    <Link key={i} href={`${ruleUrl(ref)}?from=/dpdpa/${params.chapterId}/${params.sectionId}&fromTitle=${encodeURIComponent("§" + section.number + " " + section.title)}`} style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      padding: "12px 16px", borderRadius: 12,
                      background: "rgba(6,182,212,0.04)", border: "1px solid rgba(6,182,212,0.2)",
                      textDecoration: "none", transition: "background 0.2s, border-color 0.2s",
                    }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLElement).style.background = "rgba(6,182,212,0.1)";
                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(6,182,212,0.4)";
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLElement).style.background = "rgba(6,182,212,0.04)";
                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(6,182,212,0.2)";
                      }}
                    >
                      <span style={{ fontFamily: "var(--font-ibm), sans-serif", fontSize: 13, color: "#06B6D4" }}>{ref}</span>
                      <ArrowRight size={14} color="#06B6D4" />
                    </Link>
                  ))}
                </div>
              ) : (
                <div style={{ fontFamily: "var(--font-ibm), sans-serif", fontSize: 14, color: "#4B5563" }}>
                  No specific DPDP Rules 2025 directly cross-reference this section.
                </div>
              )}
            </div>
          )}

          {activeTab === "gdpr" && (
            <div style={{ background: "rgba(59,130,246,0.05)", borderLeft: "3px solid #3B82F6", borderRadius: "0 18px 18px 0", padding: 28 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(59,130,246,0.12)", border: "1px solid rgba(59,130,246,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🏛️</div>
                <div>
                  <div style={{ fontFamily: "var(--font-ibm), sans-serif", fontWeight: 600, color: "#3B82F6", fontSize: 13 }}>GDPR Correspondence</div>
                  <div style={{ fontFamily: "var(--font-ibm), sans-serif", fontSize: 11, color: "#4B5563" }}>EU General Data Protection Regulation</div>
                </div>
              </div>
              {section.relatedGDPR && section.relatedGDPR.length > 0 ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {section.relatedGDPR.map((ref, i) => (
                    <Link key={i} href={`${gdprArticleUrl(ref)}?from=/dpdpa/${params.chapterId}/${params.sectionId}&fromTitle=${encodeURIComponent("§" + section.number + " " + section.title)}`} style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      padding: "12px 16px", borderRadius: 12,
                      background: "rgba(59,130,246,0.04)", border: "1px solid rgba(59,130,246,0.2)",
                      textDecoration: "none", transition: "background 0.2s, border-color 0.2s",
                    }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLElement).style.background = "rgba(59,130,246,0.1)";
                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(59,130,246,0.4)";
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLElement).style.background = "rgba(59,130,246,0.04)";
                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(59,130,246,0.2)";
                      }}
                    >
                      <span style={{ fontFamily: "var(--font-ibm), sans-serif", fontSize: 13, color: "#3B82F6" }}>{ref}</span>
                      <ArrowRight size={14} color="#3B82F6" />
                    </Link>
                  ))}
                </div>
              ) : (
                <div style={{ fontFamily: "var(--font-ibm), sans-serif", fontSize: 14, color: "#4B5563" }}>
                  No direct GDPR equivalent for this provision.
                </div>
              )}
            </div>
          )}

          {activeTab === "notes" && (
            <div style={{ background: "#0B1526", borderRadius: 18, border: "1px solid rgba(245,158,11,0.12)", padding: 28 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>📝</div>
                <div>
                  <div style={{ fontFamily: "var(--font-ibm), sans-serif", fontWeight: 600, color: "#F0EAD6", fontSize: 13 }}>My Notes</div>
                  <div style={{ fontFamily: "var(--font-ibm), sans-serif", fontSize: 11, color: "#4B5563" }}>Saved locally in your browser</div>
                </div>
              </div>
              <textarea
                value={note}
                onChange={e => setNote(e.target.value)}
                placeholder="Write your notes, questions, or insights about this section..."
                style={{
                  width: "100%", minHeight: 200, padding: 16,
                  background: "rgba(255,255,255,0.03)", border: "1px solid rgba(245,158,11,0.2)",
                  borderRadius: 12, resize: "vertical",
                  fontFamily: "var(--font-ibm), sans-serif", fontSize: 14, lineHeight: 1.7, color: "#F0EAD6",
                  outline: "none", boxSizing: "border-box", transition: "border-color 0.2s",
                }}
                onFocus={e => { e.target.style.borderColor = ACCENT; }}
                onBlur={e => { e.target.style.borderColor = "rgba(245,158,11,0.2)"; }}
              />
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 14 }}>
                <button onClick={saveNote} style={{
                  padding: "10px 24px", borderRadius: 10, border: "none", cursor: "pointer",
                  background: ACCENT, color: "#030712",
                  fontFamily: "var(--font-ibm), sans-serif", fontWeight: 600, fontSize: 13, transition: "background 0.2s",
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#FCD34D"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = ACCENT; }}
                >
                  Save Note
                </button>
                {saved && (
                  <span style={{ display: "flex", alignItems: "center", gap: 6, color: "#059669", fontSize: 13, fontFamily: "var(--font-ibm), sans-serif" }}>
                    <Check size={14} /> Saved ✓
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Prev / Next */}
        <div className="fade-up-3" style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          marginTop: 52, paddingTop: 28, borderTop: "1px solid rgba(245,158,11,0.1)",
          gap: 12, flexWrap: "wrap",
        }}>
          {prevSec ? (
            <Link href={`/dpdpa/${prevSec.chapterId}/${prevSec.id}`} style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "12px 20px", borderRadius: 12,
              background: "#0B1526", border: "1px solid rgba(255,255,255,0.08)",
              textDecoration: "none", transition: "border-color 0.2s", maxWidth: "45%",
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(245,158,11,0.25)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)"; }}
            >
              <ArrowLeft size={14} color="#4B5563" />
              <div>
                <div style={{ fontSize: 10, color: "#4B5563", fontFamily: "var(--font-ibm), sans-serif", marginBottom: 2 }}>Previous</div>
                <div style={{ fontSize: 13, color: "#94A3B8", fontFamily: "var(--font-ibm), sans-serif", fontWeight: 500 }}>
                  {prevSec.title.length > 30 ? prevSec.title.slice(0, 30) + "…" : prevSec.title}
                </div>
              </div>
            </Link>
          ) : <div />}

          {nextSec ? (
            <Link href={`/dpdpa/${nextSec.chapterId}/${nextSec.id}`} style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "12px 20px", borderRadius: 12,
              background: "#0B1526", border: "1px solid rgba(255,255,255,0.08)",
              textDecoration: "none", transition: "border-color 0.2s", maxWidth: "45%", textAlign: "right",
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(245,158,11,0.25)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)"; }}
            >
              <div>
                <div style={{ fontSize: 10, color: "#4B5563", fontFamily: "var(--font-ibm), sans-serif", marginBottom: 2 }}>Next</div>
                <div style={{ fontSize: 13, color: "#94A3B8", fontFamily: "var(--font-ibm), sans-serif", fontWeight: 500 }}>
                  {nextSec.title.length > 30 ? nextSec.title.slice(0, 30) + "…" : nextSec.title}
                </div>
              </div>
              <ArrowRight size={14} color={ACCENT} />
            </Link>
          ) : <div />}
        </div>
      </div>
    </div>
  );
}
