import { ComingSoonPage } from "@/components/ui/coming-soon-page";

export default function RulesPage() {
  return (
    <ComingSoonPage
      title="DPDP Rules 2025"
      subtitle="DPDP Rules"
      description="The implementing rules under the Digital Personal Data Protection Act — specifying procedures, formats, timelines, and detailed obligations for Data Fiduciaries."
      icon="📋"
      flag="🇮🇳"
      accent="emerald"
      features={[
        { icon: "📜", text: "All rules with complete text and explanations" },
        { icon: "🔗", text: "Linked to corresponding DPDPA sections" },
        { icon: "📅", text: "Key compliance timelines and deadlines" },
        { icon: "🏢", text: "Sector-specific obligations highlighted" },
        { icon: "✅", text: "Compliance checklist for each rule" },
      ]}
    />
  );
}
