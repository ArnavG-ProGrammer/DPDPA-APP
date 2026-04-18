"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronDown, ChevronRight, ArrowRight, MoreHorizontal, Scale } from "lucide-react";
import { dpdpaAct } from "@/data/dpdpa";

type Chapter = typeof dpdpaAct.chapters[0];

const CHAPTER_COLORS = [
  "var(--amber-4)", "var(--teal-3)", "var(--purple-3)", "var(--green-3)",
  "#EF4444", "#F97316", "#0EA5E9", "#8B5CF6", "#06B6D4",
];
const CHAPTER_COLOR_VALUES = [
  "#F59E0B", "#06B6D4", "#8B5CF6", "#10B981",
  "#EF4444", "#F97316", "#0EA5E9", "#8B5CF6", "#06B6D4",
];

function ChapterCard({ chapter, idx }: { chapter: Chapter; idx: number }) {
  const [open, setOpen] = useState(false);
  const colorVar = CHAPTER_COLORS[idx % CHAPTER_COLORS.length];
  const colorValue = CHAPTER_COLOR_VALUES[idx % CHAPTER_COLOR_VALUES.length];

  return (
    <div
      style={{
        background: "var(--bg-2)",
        border: `1px solid ${open ? "var(--border-2)" : "var(--border-1)"}`,
        borderRadius: "var(--r-lg)",
        overflow: "hidden",
        transition: "border-color var(--duration-base) var(--ease-out)",
        boxShadow: open ? "0 2px 12px rgba(0,0,0,0.2)" : "none",
      }}
    >
      {/* Chapter header button */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: "100%",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          padding: "22px 26px",
          display: "flex",
          alignItems: "center",
          gap: 18,
          textAlign: "left",
          transition: "background var(--duration-fast) var(--ease-out)",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.background = "rgba(245,158,11,0.025)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.background = "transparent";
        }}
      >
        {/* Chapter number badge */}
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: "var(--r-md)",
            background: `rgba(${colorValue === "#F59E0B" ? "245, 158, 11" : colorValue === "#06B6D4" ? "6, 182, 212" : colorValue === "#8B5CF6" ? "139, 92, 246" : "16, 185, 129"}, 0.10)`,
            border: `1px solid rgba(${colorValue === "#F59E0B" ? "245, 158, 11" : colorValue === "#06B6D4" ? "6, 182, 212" : colorValue === "#8B5CF6" ? "139, 92, 246" : "16, 185, 129"}, 0.20)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "var(--font-mono), monospace",
            fontSize: 13,
            fontWeight: 600,
            color: colorValue,
            flexShrink: 0,
          }}
        >
          {String(chapter.number).padStart(2, "0")}
        </div>

        {/* Chapter info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontSize: 17,
              fontWeight: 600,
              color: "var(--text-0)",
              marginBottom: 3,
            }}
          >
            {chapter.title}
          </div>
          <div
            style={{
              fontFamily: "var(--font-ibm), sans-serif",
              fontSize: 12,
              fontWeight: 400,
              color: "var(--text-3)",
            }}
          >
            {chapter.sections.length > 0
              ? `§§ ${chapter.sections[0].number}–${chapter.sections[chapter.sections.length - 1].number} · ${chapter.sections.length} section${chapter.sections.length !== 1 ? "s" : ""}`
              : `${chapter.sections.length} sections`}
          </div>
        </div>

        {/* Right actions */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {/* More button */}
          <button
            style={{
              width: 30,
              height: 30,
              background: "transparent",
              border: "1px solid var(--border-1)",
              borderRadius: "var(--r-sm)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--text-3)",
              transition: "all var(--duration-fast) var(--ease-out)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "var(--bg-4)";
              (e.currentTarget as HTMLElement).style.borderColor = "var(--border-2)";
              (e.currentTarget as HTMLElement).style.color = "var(--text-1)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
              (e.currentTarget as HTMLElement).style.borderColor = "var(--border-1)";
              (e.currentTarget as HTMLElement).style.color = "var(--text-3)";
            }}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <MoreHorizontal size={14} />
          </button>

          {/* Chevron */}
          <div
            style={{
              color: open ? colorValue : "var(--text-4)",
              transition: "transform var(--duration-base) var(--ease-out), color var(--duration-base) var(--ease-out)",
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
            }}
          >
            <ChevronDown size={14} />
          </div>
        </div>
      </button>

      {/* Section list */}
      <div
        style={{
          maxHeight: open ? `${chapter.sections.length * 48}px` : "0px",
          overflow: "hidden",
          transition: "max-height 0.45s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <div style={{ borderTop: "1px solid var(--border-0)", background: "var(--bg-1)" }}>
          {chapter.sections.map((section) => (
            <Link
              key={section.id}
              href={`/dpdpa/${chapter.id}/${section.id}`}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "13px 26px",
                borderBottom: "1px solid rgba(245,158,11,0.04)",
                cursor: "pointer",
                textDecoration: "none",
                transition: "all var(--duration-fast) var(--ease-out)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(245,158,11,0.04)";
                (e.currentTarget as HTMLElement).style.paddingLeft = "32px";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "transparent";
                (e.currentTarget as HTMLElement).style.paddingLeft = "26px";
              }}
            >
              {/* Section dot */}
              <div
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  border: `1.5px solid rgba(${colorValue === "#F59E0B" ? "245, 158, 11" : colorValue === "#06B6D4" ? "6, 182, 212" : colorValue === "#8B5CF6" ? "139, 92, 246" : "16, 185, 129"}, 0.5)`,
                  background: "transparent",
                  flexShrink: 0,
                  transition: "all var(--duration-fast) var(--ease-out)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = colorValue;
                  (e.currentTarget as HTMLElement).style.background = `rgba(${colorValue === "#F59E0B" ? "245, 158, 11" : colorValue === "#06B6D4" ? "6, 182, 212" : colorValue === "#8B5CF6" ? "139, 92, 246" : "16, 185, 129"}, 0.3)`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = `rgba(${colorValue === "#F59E0B" ? "245, 158, 11" : colorValue === "#06B6D4" ? "6, 182, 212" : colorValue === "#8B5CF6" ? "139, 92, 246" : "16, 185, 129"}, 0.5)`;
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                }}
              />

              {/* Section number */}
              <div
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: 11,
                  fontWeight: 500,
                  color: "var(--text-4)",
                  width: 36,
                  flexShrink: 0,
                }}
              >
                § {section.number}
              </div>

              {/* Section title */}
              <div
                style={{
                  fontFamily: "var(--font-ibm), sans-serif",
                  fontSize: 13,
                  fontWeight: 500,
                  color: "var(--text-2)",
                  flex: 1,
                }}
              >
                {section.title}
              </div>

              {/* Arrow icon */}
              <ArrowRight
                size={13}
                color="var(--text-4)"
                style={{
                  transition: "all var(--duration-fast) var(--ease-out)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as SVGElement).style.color = "var(--amber-4)";
                  (e.currentTarget as SVGElement).style.transform = "translateX(3px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as SVGElement).style.color = "var(--text-4)";
                  (e.currentTarget as SVGElement).style.transform = "translateX(0)";
                }}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function DpdpaPage() {
  const totalSections = dpdpaAct.chapters.reduce((a, c) => a + c.sections.length, 0);

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Header section */}
      <section style={{
        padding: "52px 48px 0",
        maxWidth: 900,
        margin: "0 auto",
      }}>
        {/* Back button */}
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 7,
            fontFamily: "var(--font-ibm), sans-serif",
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: "0.3px",
            color: "var(--text-3)",
            padding: "7px 14px",
            background: "var(--bg-3)",
            border: "1px solid var(--border-1)",
            borderRadius: "var(--r-md)",
            cursor: "pointer",
            textDecoration: "none",
            marginBottom: 32,
            transition: "all var(--duration-fast) var(--ease-out)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.color = "var(--text-1)";
            (e.currentTarget as HTMLElement).style.borderColor = "var(--border-2)";
            (e.currentTarget as HTMLElement).style.background = "var(--bg-4)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.color = "var(--text-3)";
            (e.currentTarget as HTMLElement).style.borderColor = "var(--border-1)";
            (e.currentTarget as HTMLElement).style.background = "var(--bg-3)";
          }}
        >
          <ChevronLeft size={14} />
          Back
        </Link>

        {/* Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            fontFamily: "var(--font-mono), monospace",
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: "2px",
            textTransform: "uppercase",
            color: "var(--amber-4)",
            padding: "5px 12px",
            background: "rgba(245,158,11,0.08)",
            border: "1px solid rgba(245,158,11,0.2)",
            borderRadius: "var(--r-full)",
            marginBottom: 16,
          }}
        >
          <Scale size={13} color="var(--amber-4)" />
          DPDPA 2023
        </div>

        {/* Title */}
        <h1
          style={{
            fontFamily: "var(--font-playfair), Georgia, serif",
            fontSize: "clamp(26px, 7vw, 38px)",
            fontWeight: 700,
            color: "var(--text-0)",
            lineHeight: 1.15,
            marginTop: 10,
          }}
        >
          Digital Personal Data<br />Protection Act, 2023
        </h1>

        {/* Description */}
        <p
          style={{
            fontFamily: "var(--font-ibm), sans-serif",
            fontSize: 14,
            fontWeight: 400,
            color: "var(--text-2)",
            maxWidth: 580,
            lineHeight: 1.7,
            marginTop: 10,
            marginBottom: 0,
          }}
        >
          India&apos;s landmark legislation on digital personal data — establishing rights of Data Principals, obligations of Data Fiduciaries, and the Data Protection Board of India.
        </p>

        {/* Meta row */}
        <div
          style={{
            display: "flex",
            gap: 20,
            flexWrap: "wrap",
            marginTop: 14,
            fontFamily: "var(--font-ibm), sans-serif",
            fontSize: 12,
            color: "var(--text-3)",
          }}
        >
          <span>
            <span style={{ color: "var(--amber-4)" }}>●</span> India
          </span>
          <span>
            <span style={{ color: "var(--amber-4)" }}>●</span> Enacted 11 Aug 2023
          </span>
          <span>
            <span style={{ color: "var(--amber-4)" }}>●</span> {dpdpaAct.chapters.length} Chapters
          </span>
          <span>
            <span style={{ color: "var(--amber-4)" }}>●</span> {totalSections} Sections
          </span>
        </div>

        {/* Divider */}
        <div
          style={{
            margin: "36px 0 28px",
            height: 1,
            background: "linear-gradient(90deg, var(--border-2), var(--border-1) 40%, transparent)",
          }}
        />
      </section>

      {/* Chapters section */}
      <section
        style={{
          maxWidth: 900,
          margin: "0 auto",
          padding: "0 48px 64px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {dpdpaAct.chapters.map((ch, idx) => (
            <div key={ch.id} className="fade-up" style={{ animationDelay: `${idx * 0.08}s` }}>
              <ChapterCard chapter={ch} idx={idx} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
