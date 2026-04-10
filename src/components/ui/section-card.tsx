"use client";

import { useState } from "react";
import { ChevronDown, PenLine, UserRound, ArrowLeftRight, X, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Section } from "@/data/dpdpa";

interface SectionCardProps {
  section: Section;
  defaultExpanded?: boolean;
}

export function SectionCard({ section, defaultExpanded = false }: SectionCardProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const [activePanel, setActivePanel] = useState<"author" | "user" | "refs" | null>(null);

  const togglePanel = (panel: "author" | "user" | "refs") => {
    setActivePanel((prev) => (prev === panel ? null : panel));
  };

  const hasRefs =
    (section.relatedGDPR && section.relatedGDPR.length > 0) ||
    (section.relatedRules && section.relatedRules.length > 0);

  return (
    <div
      id={`section-${section.id}`}
      className="group rounded-2xl border border-white/[0.07] bg-white/[0.025] backdrop-blur-sm transition-all duration-300 hover:border-white/[0.12] overflow-hidden"
    >
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-start gap-4 p-6 text-left"
      >
        {/* Section number badge */}
        <span className="flex-shrink-0 mt-0.5 w-9 h-9 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 font-bold text-sm">
          {section.number}
        </span>

        <div className="flex-1 min-w-0">
          <h3 className="text-white font-semibold text-base leading-snug pr-2">
            {section.title}
          </h3>
          {!expanded && (
            <p className="mt-1 text-slate-500 text-sm line-clamp-2 leading-relaxed">
              {section.content.slice(0, 120).trim()}…
            </p>
          )}
        </div>

        <ChevronDown
          className={cn(
            "flex-shrink-0 w-4 h-4 text-slate-500 transition-transform duration-300 mt-1",
            expanded && "rotate-180"
          )}
        />
      </button>

      {/* Content */}
      {expanded && (
        <div className="px-6 pb-2">
          <div className="border-t border-white/[0.05] pt-5">
            <pre className="legal-text font-[inherit] whitespace-pre-wrap text-slate-300 text-sm leading-[1.85]">
              {section.content}
            </pre>
          </div>
        </div>
      )}

      {/* Action buttons */}
      <div className="px-6 pb-5 pt-3 flex flex-wrap items-center gap-2">
        {/* Author's Note */}
        <ActionButton
          icon={<PenLine className="w-3.5 h-3.5" />}
          label="Author's Note"
          active={activePanel === "author"}
          onClick={() => togglePanel("author")}
          variant="amber"
        />

        {/* Your Notes */}
        <ActionButton
          icon={<UserRound className="w-3.5 h-3.5" />}
          label="Your Notes"
          active={activePanel === "user"}
          onClick={() => togglePanel("user")}
          variant="blue"
        />

        {/* GDPR / Rules */}
        <ActionButton
          icon={<ArrowLeftRight className="w-3.5 h-3.5" />}
          label={hasRefs ? `GDPR · Rules` : "GDPR · Rules"}
          active={activePanel === "refs"}
          onClick={() => togglePanel("refs")}
          variant="emerald"
          dot={hasRefs}
        />
      </div>

      {/* Slide-in panel */}
      {activePanel && (
        <div className="border-t border-white/[0.06] bg-white/[0.02] animate-slide-up">
          <div className="p-5 relative">
            <button
              onClick={() => setActivePanel(null)}
              className="absolute top-4 right-5 text-slate-600 hover:text-slate-400 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {activePanel === "author" && (
              <ComingSoonPanel
                icon="✍️"
                title="Author's Note"
                desc="Expert commentary on this section will be published here. Check back soon."
                variant="amber"
              />
            )}

            {activePanel === "user" && (
              <ComingSoonPanel
                icon="📝"
                title="Your Notes"
                desc="Personal note-taking for this section is coming in the next update."
                variant="blue"
              />
            )}

            {activePanel === "refs" && (
              <RefsPanel section={section} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function ActionButton({
  icon,
  label,
  active,
  onClick,
  variant,
  dot,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
  variant: "amber" | "blue" | "emerald";
  dot?: boolean;
}) {
  const styles = {
    amber: {
      base: "border-amber-500/20 text-amber-400 bg-amber-500/5 hover:bg-amber-500/10 hover:border-amber-500/40",
      active: "border-amber-500/40 bg-amber-500/15 text-amber-300",
    },
    blue: {
      base: "border-blue-500/20 text-blue-400 bg-blue-500/5 hover:bg-blue-500/10 hover:border-blue-500/40",
      active: "border-blue-500/40 bg-blue-500/15 text-blue-300",
    },
    emerald: {
      base: "border-emerald-500/20 text-emerald-400 bg-emerald-500/5 hover:bg-emerald-500/10 hover:border-emerald-500/40",
      active: "border-emerald-500/40 bg-emerald-500/15 text-emerald-300",
    },
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "relative inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-xs font-medium transition-all duration-200",
        active ? styles[variant].active : styles[variant].base
      )}
    >
      {icon}
      {label}
      {dot && !active && (
        <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 border border-[#020408]" />
      )}
    </button>
  );
}

function ComingSoonPanel({
  icon,
  title,
  desc,
  variant,
}: {
  icon: string;
  title: string;
  desc: string;
  variant: "amber" | "blue";
}) {
  const colors = {
    amber: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    blue: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  };

  return (
    <div className="flex items-start gap-3">
      <span className="text-xl">{icon}</span>
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-white font-medium text-sm">{title}</span>
          <span
            className={cn(
              "inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border",
              colors[variant]
            )}
          >
            <Clock className="w-2.5 h-2.5" />
            Coming Soon
          </span>
        </div>
        <p className="text-slate-500 text-xs leading-relaxed max-w-md">{desc}</p>
      </div>
    </div>
  );
}

function RefsPanel({ section }: { section: Section }) {
  const hasGDPR = section.relatedGDPR && section.relatedGDPR.length > 0;
  const hasRules = section.relatedRules && section.relatedRules.length > 0;

  if (!hasGDPR && !hasRules) {
    return (
      <div className="flex items-start gap-3">
        <span className="text-xl">🔗</span>
        <div>
          <span className="text-white font-medium text-sm block mb-1">Cross-References</span>
          <p className="text-slate-500 text-xs">No direct GDPR or Rule cross-references for this section.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {hasGDPR && (
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-base">🇪🇺</span>
            <span className="text-blue-400 font-medium text-xs uppercase tracking-wider">GDPR</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {section.relatedGDPR!.map((ref) => (
              <span
                key={ref}
                className="text-xs px-3 py-1.5 rounded-lg border border-blue-500/20 bg-blue-500/8 text-blue-300"
              >
                {ref}
              </span>
            ))}
          </div>
        </div>
      )}

      {hasRules && (
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-base">🇮🇳</span>
            <span className="text-emerald-400 font-medium text-xs uppercase tracking-wider">DPDP Rules</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {section.relatedRules!.map((ref) => (
              <span
                key={ref}
                className="text-xs px-3 py-1.5 rounded-lg border border-emerald-500/20 bg-emerald-500/8 text-emerald-300"
              >
                {ref}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
