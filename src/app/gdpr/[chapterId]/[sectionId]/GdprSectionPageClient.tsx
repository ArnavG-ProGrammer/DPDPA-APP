"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft, ArrowRight, Copy, Check, Star, Scale,
  FileText, Layers, Brain, PenLine, Quote, StickyNote, type LucideIcon,
} from "lucide-react";
import { gdpr } from "@/data/gdpr";
import {
  markRead, markFlashcardsComplete, markQuizCorrect,
  computeScore, getProgress,
} from "@/lib/progress";

type Tab = "content" | "flashcards" | "quiz" | "author" | "dpdpa" | "proverb" | "notes";

const TABS: { id: Tab; icon: LucideIcon; label: string }[] = [
  { id: "content",    icon: FileText,  label: "Content" },
  { id: "flashcards", icon: Layers,    label: "Flashcards" },
  { id: "quiz",       icon: Brain,     label: "Quiz" },
  { id: "author",     icon: PenLine,   label: "Author's Note" },
  { id: "dpdpa",      icon: Scale,     label: "DPDPA Link" },
  { id: "proverb",    icon: Quote,     label: "Proverb" },
  { id: "notes",      icon: StickyNote, label: "My Notes" },
];

const ACCENT = "var(--info)";
const ACCENT_TEXT = "var(--info-text)";
const tint = (color: string, pct: number) => `color-mix(in srgb, ${color} ${pct}%, transparent)`;

// ─── Score Widget ─────────────────────────────────────────────────────────────
function ScoreWidget({ score, pct }: { score: number; pct: number }) {
  const radius = 22;
  const circ = 2 * Math.PI * radius;
  const dash = circ * pct;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 16px", borderRadius: 40, background: tint(ACCENT, 8), border: `1px solid ${tint(ACCENT, 22)}` }}>
      <svg width={52} height={52} style={{ transform: "rotate(-90deg)", flexShrink: 0 }}>
        <circle cx={26} cy={26} r={radius} fill="none" stroke={tint(ACCENT, 15)} strokeWidth={4} />
        <circle cx={26} cy={26} r={radius} fill="none" stroke={ACCENT} strokeWidth={4} strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" style={{ transition: "stroke-dasharray 0.6s ease" }} />
      </svg>
      <div>
        <div className="tabular-nums" style={{ fontFamily: "var(--font-mono)", fontSize: 20, fontWeight: 700, color: ACCENT_TEXT, lineHeight: 1 }}>
          {score}<span style={{ fontSize: 11, color: "var(--muted-foreground)" }}>/1000</span>
        </div>
        <div style={{ fontSize: 10, color: "var(--muted-foreground)", marginTop: 2 }}>Learning Score</div>
      </div>
      <Star size={13} color={ACCENT} fill={ACCENT} style={{ flexShrink: 0 }} />
    </div>
  );
}

// ─── Flashcard Tab ────────────────────────────────────────────────────────────
function FlashcardsTab({ cards, sectionId, onUpdate }: { cards: { front: string; back: string }[]; sectionId: string; onUpdate: () => void }) {
  const [current, setCurrent] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [seen, setSeen] = useState<Set<number>>(new Set());
  const [completed, setCompleted] = useState(false);
  const accent = "var(--brand-amber)";
  const accentText = "var(--brand-amber-text)";
  useEffect(() => { const p = getProgress(); if (p.flashcards.includes(sectionId)) setCompleted(true); }, [sectionId]);
  const card = cards[current];
  const markSeen = useCallback(() => {
    const next = new Set(seen); next.add(current); setSeen(next);
    if (next.size === cards.length && !completed) { setCompleted(true); markFlashcardsComplete(sectionId); onUpdate(); }
  }, [current, seen, cards.length, completed, sectionId, onUpdate]);
  const handleFlip = () => { setFlipped((f) => !f); if (!flipped) markSeen(); };
  const next = () => { setFlipped(false); setCurrent((c) => (c + 1) % cards.length); };
  const prev = () => { setFlipped(false); setCurrent((c) => (c - 1 + cards.length) % cards.length); };
  return (
    <div style={{ background: "var(--card)", borderRadius: 18, border: "1px solid var(--border)", padding: 28 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, flexWrap: "wrap", gap: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: tint(accent, 12), border: `1px solid ${tint(accent, 30)}`, color: accentText, display: "flex", alignItems: "center", justifyContent: "center" }}><Layers size={16} /></div>
          <div>
            <div style={{ fontWeight: 600, color: accentText, fontSize: 13 }}>Flashcards</div>
            <div style={{ fontSize: 11, color: "var(--muted-foreground)" }}>Click card to reveal answer</div>
          </div>
        </div>
        <div className="tabular-nums" style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--muted-foreground)" }}>{current + 1} / {cards.length}</div>
      </div>
      <div style={{ display: "flex", gap: 6, marginBottom: 24 }}>
        {cards.map((_, i) => (
          <button key={i} onClick={() => { setFlipped(false); setCurrent(i); }} aria-label={`Go to card ${i + 1}`} style={{ height: 4, flex: 1, borderRadius: 2, cursor: "pointer", border: "none", padding: 0, background: seen.has(i) ? accent : i === current ? tint(accent, 40) : "var(--border)", transition: "background 0.3s" }} />
        ))}
      </div>
      <div onClick={handleFlip} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleFlip(); } }}
        style={{ position: "relative", cursor: "pointer", minHeight: 200, borderRadius: 16, marginBottom: 20, background: flipped ? tint(accent, 8) : "var(--secondary)", border: `1px solid ${flipped ? tint(accent, 30) : "var(--border)"}`, transition: "all 0.35s", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 32, textAlign: "center" }}>
        <div style={{ fontSize: 10, color: flipped ? accentText : "var(--muted-foreground)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 16, fontWeight: 600 }}>{flipped ? "Answer" : "Question"}</div>
        <div className={flipped ? undefined : "font-display"} style={{ fontSize: flipped ? 15 : 18, lineHeight: 1.6, color: flipped ? "var(--muted-foreground)" : "var(--foreground)", fontWeight: flipped ? 400 : 600 }}>{flipped ? card.back : card.front}</div>
        {!flipped && <div style={{ marginTop: 20, fontSize: 11, color: "var(--muted-foreground)" }}>Tap to reveal</div>}
      </div>
      <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
        <button onClick={prev} style={{ padding: "10px 24px", borderRadius: 12, background: "var(--secondary)", border: "1px solid var(--border)", color: "var(--foreground)", fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}><ArrowLeft size={14} /> Prev</button>
        <button onClick={next} style={{ padding: "10px 24px", borderRadius: 12, background: accent, border: "none", color: "var(--brand-amber-foreground)", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>Next <ArrowRight size={14} /></button>
      </div>
      {completed && <div style={{ marginTop: 20, padding: "14px 20px", borderRadius: 12, background: tint("var(--success)", 10), border: `1px solid ${tint("var(--success)", 25)}`, textAlign: "center", fontSize: 13, color: "var(--success-text)", fontWeight: 500 }}>All flashcards reviewed. +2 points earned.</div>}
    </div>
  );
}

// ─── Quiz Tab ─────────────────────────────────────────────────────────────────
function QuizTab({ questions, sectionId, onUpdate }: { questions: { question: string; options: string[]; answer: number; explanation?: string }[]; sectionId: string; onUpdate: () => void }) {
  const [answers, setAnswers] = useState<Record<number, number | null>>({});
  const [correct, setCorrect] = useState<Set<number>>(new Set());
  const accent = "var(--primary-text)";
  useEffect(() => { const p = getProgress(); setCorrect(new Set(p.quiz[sectionId] ?? [])); }, [sectionId]);
  const select = (qIdx: number, optIdx: number) => {
    if (answers[qIdx] !== undefined) return;
    setAnswers((a) => ({ ...a, [qIdx]: optIdx }));
    if (optIdx === questions[qIdx].answer && !correct.has(qIdx)) { markQuizCorrect(sectionId, qIdx); setCorrect((c) => new Set([...c, qIdx])); onUpdate(); }
  };
  const allDone = questions.every((_, i) => answers[i] !== undefined);
  const score = questions.filter((_, i) => answers[i] === questions[i].answer).length;
  return (
    <div style={{ background: "var(--card)", borderRadius: 18, border: "1px solid var(--border)", padding: 28 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: tint(accent, 12), border: `1px solid ${tint(accent, 30)}`, color: accent, display: "flex", alignItems: "center", justifyContent: "center" }}><Brain size={16} /></div>
        <div>
          <div style={{ fontWeight: 600, color: accent, fontSize: 13 }}>Quick Quiz</div>
          <div style={{ fontSize: 11, color: "var(--muted-foreground)" }}>{questions.length} question{questions.length !== 1 ? "s" : ""} · select to answer</div>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
        {questions.map((q, qIdx) => {
          const chosen = answers[qIdx] ?? null; const revealed = chosen !== null; const isCorrect = chosen === q.answer;
          return (
            <div key={qIdx}>
              <div className="font-display" style={{ fontSize: 16, fontWeight: 600, color: "var(--foreground)", lineHeight: 1.4, marginBottom: 14 }}>
                <span className="tabular-nums" style={{ color: accent, fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 700 }}>Q{qIdx + 1}. </span>{q.question}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {q.options.map((opt, oIdx) => {
                  let bg = "var(--secondary)", border = "var(--border)", color = "var(--foreground)";
                  if (revealed) { if (oIdx === q.answer) { bg = tint("var(--success)", 10); border = tint("var(--success)", 32); color = "var(--success-text)"; } else if (oIdx === chosen && !isCorrect) { bg = tint("var(--destructive)", 10); border = tint("var(--destructive)", 32); color = "var(--destructive)"; } }
                  return (
                    <button key={oIdx} onClick={() => select(qIdx, oIdx)} disabled={revealed} style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 16px", borderRadius: 12, cursor: revealed ? "default" : "pointer", background: bg, border: `1px solid ${border}`, textAlign: "left", transition: "all 0.2s" }}
                      onMouseEnter={(e) => { if (!revealed) e.currentTarget.style.borderColor = tint(accent, 40); }}
                      onMouseLeave={(e) => { if (!revealed) e.currentTarget.style.borderColor = "var(--border)"; }}
                    >
                      <span className="tabular-nums" style={{ width: 26, height: 26, borderRadius: 8, flexShrink: 0, background: revealed && oIdx === q.answer ? "var(--success)" : revealed && oIdx === chosen ? "var(--destructive)" : "var(--muted)", border: `1px solid ${revealed && oIdx === q.answer ? "var(--success)" : "var(--border)"}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 600, color: revealed && (oIdx === q.answer || oIdx === chosen) ? "var(--primary-foreground)" : "var(--muted-foreground)" }}>
                        {revealed && oIdx === q.answer ? "✓" : revealed && oIdx === chosen ? "✗" : String.fromCharCode(65 + oIdx)}
                      </span>
                      <span style={{ fontSize: 13.5, color: revealed ? color : "var(--foreground)", lineHeight: 1.5 }}>{opt}</span>
                    </button>
                  );
                })}
              </div>
              {revealed && q.explanation && (
                <div style={{ marginTop: 12, padding: "14px 16px", borderRadius: 12, background: isCorrect ? tint("var(--success)", 8) : tint(ACCENT, 8), border: `1px solid ${isCorrect ? tint("var(--success)", 22) : tint(ACCENT, 22)}`, fontSize: 13, lineHeight: 1.65, color: "var(--muted-foreground)" }}>
                  <span style={{ color: isCorrect ? "var(--success-text)" : ACCENT_TEXT, fontWeight: 600, marginRight: 8 }}>{isCorrect ? "Correct." : "Not quite."}</span>{q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>
      {allDone && (
        <div style={{ marginTop: 28, padding: "18px 24px", borderRadius: 12, background: score === questions.length ? tint("var(--success)", 10) : tint(ACCENT, 8), border: `1px solid ${score === questions.length ? tint("var(--success)", 26) : tint(ACCENT, 22)}`, textAlign: "center" }}>
          <div className="font-display tabular-nums" style={{ fontSize: 22, fontWeight: 700, color: score === questions.length ? "var(--success-text)" : ACCENT_TEXT, marginBottom: 6 }}>{score}/{questions.length} correct</div>
          <div style={{ fontSize: 13, color: "var(--muted-foreground)" }}>{score === questions.length ? "Perfect score. " : "Review the explanations above. "}+{score * 3} points added.</div>
        </div>
      )}
    </div>
  );
}

// ─── Accent panel ─────────────────────────────────────────────────────────────
function AccentPanel({ color, textColor, icon, title, subtitle, children }: { color: string; textColor: string; icon: LucideIcon; title: string; subtitle: string; children: React.ReactNode }) {
  const Icon = icon;
  return (
    <div style={{ background: tint(color, 5), borderLeft: `3px solid ${color}`, borderRadius: "0 18px 18px 0", padding: 28 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: tint(color, 12), border: `1px solid ${tint(color, 30)}`, color: textColor, display: "flex", alignItems: "center", justifyContent: "center" }}><Icon size={16} /></div>
        <div>
          <div style={{ fontWeight: 600, color: textColor, fontSize: 13 }}>{title}</div>
          <div style={{ fontSize: 11, color: "var(--muted-foreground)" }}>{subtitle}</div>
        </div>
      </div>
      {children}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function GdprSectionPageClient({ params }: { params: { chapterId: string; sectionId: string } }) {
  const searchParams = useSearchParams();
  const fromUrl = searchParams.get("from");
  const fromTitle = searchParams.get("fromTitle");

  const [activeTab, setActiveTab] = useState<Tab>("content");
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const [score, setScore] = useState(0);
  const [scorePct, setScorePct] = useState(0);

  const allSectionsFlat = gdpr.chapters.flatMap((ch) => ch.sections.map((s) => ({ ...s, chapterId: ch.id })));

  const refreshScore = useCallback(() => {
    const { score: s, pct } = computeScore(allSectionsFlat);
    setScore(s); setScorePct(pct);
  }, []); // eslint-disable-line

  const chapter = gdpr.chapters.find((c) => c.id === params.chapterId);
  const section = chapter?.sections.find((s) => s.id === params.sectionId);

  const sIdx = allSectionsFlat.findIndex((s) => s.id === params.sectionId);
  const prevSec = sIdx > 0 ? allSectionsFlat[sIdx - 1] : null;
  const nextSec = sIdx < allSectionsFlat.length - 1 ? allSectionsFlat[sIdx + 1] : null;

  useEffect(() => {
    markRead(params.sectionId);
    refreshScore();
    const stored = localStorage.getItem(`gdpr-note-${params.sectionId}`);
    if (stored) setNote(stored);
  }, [params.sectionId, refreshScore]);

  const saveNote = () => {
    localStorage.setItem(`gdpr-note-${params.sectionId}`, note);
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
      <div style={{ minHeight: "100dvh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <div style={{ textAlign: "center" }}>
          <h2 className="font-display" style={{ color: "var(--foreground)", marginBottom: 12, fontSize: 22 }}>Section not found</h2>
          <Link href="/gdpr" style={{ color: ACCENT_TEXT, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6 }}><ArrowLeft size={14} /> Back to GDPR</Link>
        </div>
      </div>
    );
  }

  const hasFlashcards = (section.flashcards?.length ?? 0) > 0;
  const hasQuiz = (section.quiz?.length ?? 0) > 0;

  const visibleTabs = TABS.filter((t) => {
    if (t.id === "flashcards" && !hasFlashcards) return false;
    if (t.id === "quiz" && !hasQuiz) return false;
    return true;
  });

  return (
    <div style={{ minHeight: "100dvh" }}>
      <nav className="glass" style={{ position: "sticky", top: 0, zIndex: 40, background: "var(--glass-nav)", borderBottom: "1px solid var(--border)", padding: "0 16px", height: 56, display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, flex: 1, overflow: "hidden", fontSize: 12 }}>
          <Link href="/" style={{ color: "var(--muted-foreground)", textDecoration: "none", whiteSpace: "nowrap" }}>Home</Link>
          <span style={{ color: "var(--muted-foreground)" }}>/</span>
          <Link href="/gdpr" style={{ color: "var(--muted-foreground)", textDecoration: "none", whiteSpace: "nowrap" }}>GDPR</Link>
          <span style={{ color: "var(--muted-foreground)" }}>/</span>
          <span style={{ color: ACCENT_TEXT, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{section.title}</span>
        </div>
        <ScoreWidget score={score} pct={scorePct} />
      </nav>

      <div style={{ maxWidth: 820, margin: "0 auto", padding: "40px 24px 120px" }}>
        <Link href="/gdpr" className="hover:text-[color:var(--info-text)]" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--muted-foreground)", textDecoration: "none", fontSize: 13, marginBottom: 32, transition: "color 0.2s" }}>
          <ArrowLeft size={14} /> All Chapters
        </Link>

        {/* Back to DPDPA banner */}
        {fromUrl && (
          <Link href={fromUrl} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 16px", borderRadius: 12, marginBottom: 20, background: tint("var(--brand-amber)", 8), border: `1px solid ${tint("var(--brand-amber)", 24)}`, textDecoration: "none", transition: "background 0.2s" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = tint("var(--brand-amber)", 14); }}
            onMouseLeave={(e) => { e.currentTarget.style.background = tint("var(--brand-amber)", 8); }}
          >
            <Scale size={16} color="var(--brand-amber-text)" />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 10, color: "var(--muted-foreground)", marginBottom: 1 }}>Back to DPDPA</div>
              <div style={{ fontSize: 12, color: "var(--brand-amber-text)", fontWeight: 600 }}>{fromTitle ?? "Back to section"}</div>
            </div>
            <ArrowLeft size={14} color="var(--brand-amber-text)" />
          </Link>
        )}

        {/* Header */}
        <div className="fade-up" style={{ marginBottom: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
            <span className="tabular-nums" style={{ fontFamily: "var(--font-mono)", fontSize: 11, padding: "4px 12px", borderRadius: 20, background: tint(ACCENT, 8), border: `1px solid ${tint(ACCENT, 24)}`, color: ACCENT_TEXT }}>
              Chapter {chapter.number} · {section.number}
            </span>
            <span style={{ fontSize: 11, padding: "4px 10px", borderRadius: 20, background: tint(ACCENT, 8), border: `1px solid ${tint(ACCENT, 22)}`, color: ACCENT_TEXT }}>
              EU · GDPR 2016/679
            </span>
            {hasFlashcards && <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11, padding: "4px 10px", borderRadius: 20, background: tint("var(--brand-amber)", 8), border: `1px solid ${tint("var(--brand-amber)", 22)}`, color: "var(--brand-amber-text)" }}><Layers size={12} /> Flashcards</span>}
            {hasQuiz && <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11, padding: "4px 10px", borderRadius: 20, background: tint("var(--primary)", 8), border: `1px solid ${tint("var(--primary)", 22)}`, color: "var(--primary-text)" }}><Brain size={12} /> Quiz</span>}
          </div>
          <h1 className="font-display" style={{ fontSize: "clamp(1.7rem, 4vw, 2.4rem)", fontWeight: 700, color: "var(--foreground)", lineHeight: 1.2, marginBottom: 8, letterSpacing: "-0.02em" }}>{section.title}</h1>
          <div style={{ fontSize: 13, color: "var(--muted-foreground)" }}>{chapter.title} · GDPR 2016/679</div>
        </div>

        {/* Tab Bar */}
        <div className="fade-up-1" style={{ display: "flex", gap: 4, flexWrap: "wrap", background: "var(--card)", borderRadius: 14, padding: 6, border: "1px solid var(--border)", marginBottom: 28 }}>
          {visibleTabs.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} aria-pressed={active} style={{ padding: "8px 14px", borderRadius: 10, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 500, display: "flex", alignItems: "center", gap: 6, transition: "all 0.2s", background: active ? ACCENT : "transparent", color: active ? "var(--primary-foreground)" : "var(--muted-foreground)", whiteSpace: "nowrap" }}>
                <Icon size={14} />{tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="fade-up-2">
          {activeTab === "content" && (
            <div style={{ background: "var(--card)", borderRadius: 18, border: "1px solid var(--border)", padding: 28 }}>
              <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
                <button onClick={copyContent} style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 14px", borderRadius: 8, border: "1px solid var(--border)", background: "transparent", cursor: "pointer", color: copied ? "var(--success-text)" : "var(--muted-foreground)", fontSize: 12, transition: "color 0.2s" }}>
                  {copied ? <Check size={13} /> : <Copy size={13} />}{copied ? "Copied" : "Copy"}
                </button>
              </div>
              <pre style={{ fontFamily: "var(--font-sans)", fontSize: 15, lineHeight: 1.85, color: "var(--foreground)", whiteSpace: "pre-wrap", margin: 0 }}>{section.content}</pre>
            </div>
          )}

          {activeTab === "flashcards" && hasFlashcards && <FlashcardsTab cards={section.flashcards!} sectionId={section.id} onUpdate={refreshScore} />}
          {activeTab === "quiz" && hasQuiz && <QuizTab questions={section.quiz!} sectionId={section.id} onUpdate={refreshScore} />}

          {activeTab === "author" && (
            <AccentPanel color={ACCENT} textColor={ACCENT_TEXT} icon={PenLine} title="Author's Commentary" subtitle="Expert legal analysis">
              <div style={{ fontSize: 15, lineHeight: 1.8, color: "var(--muted-foreground)", whiteSpace: "pre-wrap" }}>
                {section.authorNote || "Coming soon. Expert commentary will be published here."}
              </div>
            </AccentPanel>
          )}

          {activeTab === "dpdpa" && (
            <AccentPanel color="var(--brand-amber)" textColor="var(--brand-amber-text)" icon={Scale} title="DPDPA Correspondence" subtitle="India's Digital Personal Data Protection Act 2023">
              <div style={{ fontSize: 15, lineHeight: 1.8, color: "var(--muted-foreground)", whiteSpace: "pre-wrap" }}>
                {section.dpdpaCorrespondence || "No direct DPDPA correspondence for this provision."}
              </div>
              <div style={{ marginTop: 20 }}>
                <Link href="/dpdpa" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--brand-amber-text)", textDecoration: "none", padding: "6px 14px", borderRadius: 8, border: `1px solid ${tint("var(--brand-amber)", 26)}`, background: tint("var(--brand-amber)", 8) }}>
                  Explore DPDPA <ArrowRight size={12} />
                </Link>
              </div>
            </AccentPanel>
          )}

          {activeTab === "proverb" && (
            <div style={{ background: tint("var(--primary)", 7), border: `1px solid ${tint("var(--primary)", 20)}`, borderRadius: 18, padding: "52px 40px", textAlign: "center" }}>
              <div className="font-display" style={{ fontSize: 72, lineHeight: 1, color: tint("var(--primary)", 32), marginBottom: -16 }} aria-hidden="true">&ldquo;</div>
              <blockquote className="font-display" style={{ fontSize: "clamp(1.2rem, 3vw, 1.6rem)", fontStyle: "italic", color: "var(--foreground)", lineHeight: 1.6, margin: "0 0 24px" }}>
                {section.proverb ? section.proverb.replace(/^"|"$/g, "") : "Privacy is not a privilege, it is a fundamental right."}
              </blockquote>
              <div style={{ fontSize: 11, letterSpacing: "0.15em", color: "var(--primary-text)", textTransform: "uppercase" }}>Data Crest Commentary</div>
            </div>
          )}

          {activeTab === "notes" && (
            <div style={{ background: "var(--card)", borderRadius: 18, border: "1px solid var(--border)", padding: 28 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: tint(ACCENT, 10), border: `1px solid ${tint(ACCENT, 24)}`, color: ACCENT_TEXT, display: "flex", alignItems: "center", justifyContent: "center" }}><StickyNote size={16} /></div>
                <div>
                  <div style={{ fontWeight: 600, color: "var(--foreground)", fontSize: 13 }}>My Notes</div>
                  <div style={{ fontSize: 11, color: "var(--muted-foreground)" }}>Saved locally in your browser</div>
                </div>
              </div>
              <textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Write your notes about this article..." aria-label="Section notes"
                style={{ width: "100%", minHeight: 200, padding: 16, background: "var(--secondary)", border: "1px solid var(--border)", borderRadius: 12, resize: "vertical", fontFamily: "var(--font-sans)", fontSize: 14, lineHeight: 1.7, color: "var(--foreground)", outline: "none", boxSizing: "border-box", transition: "border-color 0.2s" }}
                onFocus={(e) => { e.target.style.borderColor = "var(--ring)"; }}
                onBlur={(e) => { e.target.style.borderColor = "var(--border)"; }}
              />
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 14 }}>
                <button onClick={saveNote} style={{ padding: "10px 24px", borderRadius: 12, border: "none", cursor: "pointer", background: ACCENT, color: "var(--primary-foreground)", fontWeight: 600, fontSize: 13 }}>Save Note</button>
                {saved && <span style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--success-text)", fontSize: 13 }}><Check size={14} /> Saved</span>}
              </div>
            </div>
          )}
        </div>

        {/* Prev / Next */}
        <div className="fade-up-3" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 52, paddingTop: 28, borderTop: "1px solid var(--border)", gap: 12, flexWrap: "wrap" }}>
          {prevSec ? (
            <Link href={`/gdpr/${prevSec.chapterId}/${prevSec.id}`} style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 20px", borderRadius: 12, background: "var(--card)", border: "1px solid var(--border)", textDecoration: "none", transition: "border-color 0.2s", maxWidth: "45%" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = tint(ACCENT, 32); }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; }}
            >
              <ArrowLeft size={14} color="var(--muted-foreground)" />
              <div>
                <div style={{ fontSize: 10, color: "var(--muted-foreground)", marginBottom: 2 }}>Previous</div>
                <div style={{ fontSize: 13, color: "var(--foreground)", fontWeight: 500 }}>{prevSec.title.length > 30 ? prevSec.title.slice(0, 30) + "…" : prevSec.title}</div>
              </div>
            </Link>
          ) : <div />}

          {nextSec ? (
            <Link href={`/gdpr/${nextSec.chapterId}/${nextSec.id}`} style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 20px", borderRadius: 12, background: "var(--card)", border: "1px solid var(--border)", textDecoration: "none", transition: "border-color 0.2s", maxWidth: "45%", textAlign: "right" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = tint(ACCENT, 32); }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; }}
            >
              <div>
                <div style={{ fontSize: 10, color: "var(--muted-foreground)", marginBottom: 2 }}>Next</div>
                <div style={{ fontSize: 13, color: "var(--foreground)", fontWeight: 500 }}>{nextSec.title.length > 30 ? nextSec.title.slice(0, 30) + "…" : nextSec.title}</div>
              </div>
              <ArrowRight size={14} color={ACCENT} />
            </Link>
          ) : <div />}
        </div>
      </div>
    </div>
  );
}
