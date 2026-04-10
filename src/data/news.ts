export interface NewsItem {
  id: string;
  date: string;
  category: "dpdpa" | "gdpr" | "both";
  badge: string;
  badgeColor: string;
  breaking?: boolean;
  headline: string;
  summary: string;
  source: string;
}

export const newsItems: NewsItem[] = [
  {
    id: "news-1",
    date: "13 Nov 2025",
    category: "dpdpa",
    badge: "DPDPA",
    badgeColor: "#F59E0B",
    breaking: true,
    headline: "India notifies DPDP Rules 2025 — full data protection framework now in motion",
    summary: "MeitY officially notified the Digital Personal Data Protection Rules, 2025 (G.S.R. 846(E)), marking a landmark step in India's data protection journey. The 23-rule framework sets out consent mechanisms, security standards, breach notification timelines, and Board governance. Full compliance deadline: 13 May 2027.",
    source: "Official Gazette of India",
  },
  {
    id: "news-2",
    date: "Jan 2025",
    category: "dpdpa",
    badge: "DPDPA",
    badgeColor: "#F59E0B",
    headline: "Draft DPDP Rules receive 22,000+ public comments — industry flags compliance concerns",
    summary: "When MeitY published draft rules in January 2025, over 22,000 stakeholder comments were submitted via MyGov. Industry raised concerns about the verifiable consent mechanism for children's data, the broad scope of SDF obligations, and cross-border transfer restrictions. The final rules incorporated several industry requests.",
    source: "MeitY",
  },
  {
    id: "news-3",
    date: "Sep 2024",
    category: "gdpr",
    badge: "GDPR",
    badgeColor: "#3B82F6",
    breaking: true,
    headline: "Meta fined €91 million by Irish DPC for storing passwords in plaintext",
    summary: "Ireland's Data Protection Commission (DPC) fined Meta Platforms Ireland Limited €91 million for storing hundreds of millions of user passwords in plaintext on internal servers — a breach of Article 32 GDPR (security of processing). The investigation began in April 2019. Meta described the storage as 'inadvertent.'",
    source: "Irish Data Protection Commission",
  },
  {
    id: "news-4",
    date: "Mar 2024",
    category: "gdpr",
    badge: "GDPR",
    badgeColor: "#3B82F6",
    headline: "EDPB issues guidelines on AI and automated decision-making under GDPR",
    summary: "The European Data Protection Board published comprehensive guidelines clarifying how Article 22 GDPR (automated decision-making and profiling) applies to AI systems. The guidelines address explainability requirements, the right to human review, and safeguards for sensitive data in AI pipelines.",
    source: "European Data Protection Board",
  },
  {
    id: "news-5",
    date: "Jan 2024",
    category: "gdpr",
    badge: "GDPR",
    badgeColor: "#3B82F6",
    headline: "Meta fined €1.2 billion for transferring EU data to US without adequate safeguards",
    summary: "In one of GDPR's largest-ever fines, the Irish DPC ordered Meta to pay €1.2 billion and suspend data transfers from EU to US. The finding centred on Meta's reliance on Standard Contractual Clauses after Schrems II invalidated Privacy Shield. Meta appealed; the EU-US Data Privacy Framework adopted in July 2023 subsequently resolved the underlying issue.",
    source: "Irish Data Protection Commission",
  },
  {
    id: "news-6",
    date: "Aug 2023",
    category: "dpdpa",
    badge: "DPDPA",
    badgeColor: "#F59E0B",
    headline: "DPDPA 2023 enacted — India joins global privacy law landscape",
    summary: "After four years of deliberation and multiple draft versions, the Digital Personal Data Protection Act, 2023 received Presidential Assent on 11 August 2023. The Act was the culmination of India's data protection journey that began with the K.S. Puttaswamy judgment (2017) recognising the right to privacy as a fundamental right under the Indian Constitution.",
    source: "Ministry of Law and Justice, India",
  },
  {
    id: "news-7",
    date: "Aug 2023",
    category: "both",
    badge: "DPDPA + GDPR",
    badgeColor: "#7C3AED",
    headline: "India and EU explore data adequacy talks following DPDPA passage",
    summary: "Following the DPDPA's enactment, India and the European Union began exploratory talks on a potential adequacy decision — similar to the EU's recognition of the UK's data protection framework post-Brexit. An adequacy decision would allow free data flows between India and the EU without additional safeguards. Negotiations are ongoing.",
    source: "Ministry of External Affairs, India & European Commission",
  },
  {
    id: "news-8",
    date: "Aug 2017",
    category: "both",
    badge: "Landmark",
    badgeColor: "#059669",
    headline: "K.S. Puttaswamy v. Union of India — Right to Privacy declared a fundamental right",
    summary: "A nine-judge bench of the Supreme Court of India unanimously held that the right to privacy is a fundamental right under the Indian Constitution, protected under Article 21 (right to life and personal liberty). The judgment by Justice D.Y. Chandrachud directly catalysed India's data protection legislation journey, culminating in the DPDPA 2023.",
    source: "Supreme Court of India — (2017) 10 SCC 1",
  },
  {
    id: "news-9",
    date: "May 2023",
    category: "gdpr",
    badge: "GDPR",
    badgeColor: "#3B82F6",
    headline: "GDPR fines cross €4.5 billion since 2018 — enforcement accelerates",
    summary: "Five years after GDPR came into force (May 25, 2018), total fines issued across EU supervisory authorities crossed €4.5 billion. The largest fines have targeted Meta, Amazon (€746M), WhatsApp (€225M), and Google (€150M by French CNIL). Legal experts note a significant acceleration in enforcement since 2021.",
    source: "GDPR Enforcement Tracker (enforcementtracker.com)",
  },
  {
    id: "news-10",
    date: "Mar 2023",
    category: "gdpr",
    badge: "GDPR",
    badgeColor: "#3B82F6",
    headline: "EU-US Data Privacy Framework negotiations advance — successor to Privacy Shield",
    summary: "The European Commission and the US Department of Commerce finalised the EU-US Data Privacy Framework (DPF), the successor to Privacy Shield (invalidated by Schrems II in July 2020). The DPF provides an adequacy decision basis for EU-US data transfers. Privacy advocates, including Max Schrems, have challenged it before the CJEU.",
    source: "European Commission",
  },
];
