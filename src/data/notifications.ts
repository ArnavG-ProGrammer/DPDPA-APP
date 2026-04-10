export interface Notification {
  id: string;
  date: string;
  type: "assent" | "commencement" | "rules" | "consultation" | "anticipated";
  badge: string;
  badgeColor: string;
  title: string;
  description: string;
  reference?: string;
  anticipated?: boolean;
}

export const notifications: Notification[] = [
  {
    id: "n-1",
    date: "11 Aug 2023",
    type: "assent",
    badge: "Presidential Assent",
    badgeColor: "#F59E0B",
    title: "Digital Personal Data Protection Act, 2023 receives Presidential Assent",
    description: "The Digital Personal Data Protection Act, 2023 received the assent of the President of India on 11 August 2023, completing its journey through both Houses of Parliament. The Act was published in the Official Gazette of India Extraordinary, Part II, Section 1.",
    reference: "No. 22 of 2023",
  },
  {
    id: "n-2",
    date: "11 Aug 2023",
    type: "commencement",
    badge: "Commencement",
    badgeColor: "#06B6D4",
    title: "Section 1 (Short Title & Commencement) brought into force",
    description: "The Central Government notified the commencement of Section 1 of the DPDPA 2023. The remaining provisions of the Act are to be brought into force on such dates as the Central Government may, by notification, appoint.",
    reference: "S.O. 3379(E)",
  },
  {
    id: "n-3",
    date: "3 Jan 2025",
    type: "consultation",
    badge: "Public Consultation",
    badgeColor: "#3B82F6",
    title: "Draft Digital Personal Data Protection Rules, 2025 published for public consultation",
    description: "The Ministry of Electronics and Information Technology (MeitY) published the draft DPDP Rules 2025 for public consultation. Stakeholders were invited to submit comments through the MyGov portal within 30 days. Over 22,000 public comments were received.",
    reference: "Draft Rules 2025 (MeitY)",
  },
  {
    id: "n-4",
    date: "13 Nov 2025",
    type: "rules",
    badge: "Rules Notified",
    badgeColor: "#059669",
    title: "Digital Personal Data Protection Rules, 2025 officially notified",
    description: "The Central Government notified the Digital Personal Data Protection Rules, 2025 in the Official Gazette. The Rules comprise 23 rules and 7 schedules. Rules 1, 2, and 17–21 came into force immediately on publication.",
    reference: "G.S.R. 846(E)",
  },
  {
    id: "n-5",
    date: "13 Nov 2025",
    type: "commencement",
    badge: "In Force",
    badgeColor: "#059669",
    title: "Rules 1, 2 & 17–21 come into force immediately",
    description: "Upon publication on 13 November 2025, the following rules came into force: Rule 1 (Short title & commencement), Rule 2 (Definitions), Rule 17 (Board appointments), Rule 18 (Board salaries), Rule 19 (Board procedure), Rule 20 (Board as digital office), Rule 21 (Board officers).",
    reference: "G.S.R. 846(E), Rule 1(2)(a)",
  },
  {
    id: "n-6",
    date: "13 Nov 2026",
    type: "commencement",
    badge: "Anticipated",
    badgeColor: "#F59E0B",
    title: "Rule 4 (Consent Manager Registration) comes into force",
    description: "Rule 4 — governing the registration and obligations of Consent Managers — is scheduled to come into force one year after notification of the Rules (13 November 2026). Consent Managers must have net worth ≥ ₹2 crore and meet conditions in the First Schedule.",
    reference: "G.S.R. 846(E), Rule 1(2)(b)",
    anticipated: true,
  },
  {
    id: "n-7",
    date: "13 May 2027",
    type: "commencement",
    badge: "Anticipated",
    badgeColor: "#F59E0B",
    title: "Rules 3, 5–16, 22 & 23 come into force — Full DPDPA operational",
    description: "18 months after notification, the bulk of the Rules come into force: Rule 3 (Notice), Rules 5–16 (core operational obligations including security, breach notification, erasure, children's consent, SDF obligations, data transfers, grievances), Rule 22 (appeals), and Rule 23 (information requests). This marks full operationalisation of the DPDPA framework.",
    reference: "G.S.R. 846(E), Rule 1(2)(c)",
    anticipated: true,
  },
  {
    id: "n-8",
    date: "2026 (anticipated)",
    type: "anticipated",
    badge: "Anticipated",
    badgeColor: "#7C3AED",
    title: "Significant Data Fiduciary (SDF) designations by Central Government",
    description: "The Central Government is expected to notify the first tranche of Significant Data Fiduciaries under Section 10 of the DPDPA. Industry expects large social media platforms, major e-commerce companies, and key fintech players to be designated in the first wave.",
    anticipated: true,
  },
  {
    id: "n-9",
    date: "2026 (anticipated)",
    type: "anticipated",
    badge: "Anticipated",
    badgeColor: "#7C3AED",
    title: "Cross-border data transfer whitelist (notified countries)",
    description: "Under Section 16 of the DPDPA, the Central Government is expected to notify the list of countries to which personal data may be transferred. This 'whitelist' approach differs from GDPR's adequacy decision framework. Negotiations with EU and other jurisdictions are ongoing.",
    anticipated: true,
  },
  {
    id: "n-10",
    date: "2027 (anticipated)",
    type: "anticipated",
    badge: "Anticipated",
    badgeColor: "#7C3AED",
    title: "Data Protection Board of India fully constituted and operational",
    description: "The Data Protection Board of India, once constituted with its Chairperson and Members (via the Search-cum-Selection Committee under Rule 17), will begin accepting complaints and conducting inquiries. Until the Board is constituted, an interim Board may be formed under Section 17(6).",
    anticipated: true,
  },
];
