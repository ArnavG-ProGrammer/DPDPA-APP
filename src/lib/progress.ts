"use client";

export interface ProgressStore {
  reads: string[];                          // section IDs visited
  flashcards: string[];                     // section IDs with all cards flipped
  quiz: Record<string, number[]>;           // sectionId → correctly answered question indices
}

const KEY = "datacrest_progress_v2";

function load(): ProgressStore {
  if (typeof window === "undefined") return { reads: [], flashcards: [], quiz: {} };
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { reads: [], flashcards: [], quiz: {} };
    return JSON.parse(raw);
  } catch {
    return { reads: [], flashcards: [], quiz: {} };
  }
}

function save(store: ProgressStore) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(store));
}

export function markRead(sectionId: string) {
  const s = load();
  if (!s.reads.includes(sectionId)) { s.reads.push(sectionId); save(s); }
}

export function markFlashcardsComplete(sectionId: string) {
  const s = load();
  if (!s.flashcards.includes(sectionId)) { s.flashcards.push(sectionId); save(s); }
}

export function markQuizCorrect(sectionId: string, idx: number) {
  const s = load();
  s.quiz[sectionId] = s.quiz[sectionId] ?? [];
  if (!s.quiz[sectionId].includes(idx)) { s.quiz[sectionId].push(idx); save(s); }
  save(s);
}

export function getProgress(): ProgressStore {
  return load();
}

export function computeScore(
  allSections: { id: string; flashcards?: { front: string; back: string }[]; quiz?: { question: string }[] }[]
): { score: number; pct: number; breakdown: { reads: number; flashcards: number; quizzes: number; total: number } } {
  const s = load();

  const maxReads = allSections.length;
  const maxFlash = allSections.filter(sec => (sec.flashcards?.length ?? 0) > 0).length;
  const maxQuiz = allSections.reduce((a, sec) => a + (sec.quiz?.length ?? 0), 0);
  const maxTotal = maxReads + maxFlash + maxQuiz || 1;

  const earnedReads = s.reads.filter(id => allSections.some(sec => sec.id === id)).length;
  const earnedFlash = s.flashcards.filter(id => allSections.some(sec => sec.id === id)).length;
  const earnedQuiz = Object.entries(s.quiz).reduce((a, [id, items]) => {
    const sec = allSections.find(s => s.id === id);
    return a + Math.min(items.length, sec?.quiz?.length ?? 0);
  }, 0);

  const total = earnedReads + earnedFlash + earnedQuiz;
  const pct = total / maxTotal;
  const score = Math.round(pct * 1000);

  return {
    score,
    pct,
    breakdown: { reads: earnedReads, flashcards: earnedFlash, quizzes: earnedQuiz, total },
  };
}

export function getSectionProgress(sectionId: string) {
  const s = load();
  return {
    read: s.reads.includes(sectionId),
    flashcardsDone: s.flashcards.includes(sectionId),
    quizDone: s.quiz[sectionId]?.length ?? 0,
  };
}
