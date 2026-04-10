export type RuleStatus = "in_force" | "2026" | "2027";

export interface Rule {
  id: string;
  number: number;
  title: string;
  description: string;
  status: RuleStatus;
  statusLabel: string;
  inForceDate: string;
  content: string;
  scheduleRef?: string;
}

export interface Schedule {
  id: string;
  number: string;
  title: string;
  description: string;
  content: string;
}

export const rules: Rule[] = [
  {
    id: "rule-1",
    number: 1,
    title: "Short title and commencement",
    description: "Names the Rules and prescribes three staged commencement dates.",
    status: "in_force",
    statusLabel: "In Force — 13 Nov 2025",
    inForceDate: "13 Nov 2025",
    content: `(1) These rules may be called the Digital Personal Data Protection Rules, 2025.

(2) These rules shall come into force on the date of their publication in the Official Gazette, except—
(a) rule 4 shall come into force after one year from the date of publication in the Official Gazette; and
(b) rules 3, 5 to 16, 22 and 23 shall come into force after eighteen months from the date of publication in the Official Gazette.

Commencement summary:
— Rules 1, 2, 17–21: In force 13 November 2025 (date of publication)
— Rule 4 (Consent Manager registration): In force 13 November 2026
— Rules 3, 5–16, 22, 23 (core operational rules): In force 13 May 2027`,
  },
  {
    id: "rule-2",
    number: 2,
    title: "Definitions",
    description: "Defines key terms used throughout the Rules: techno-legal measures, user account, and verifiable consent.",
    status: "in_force",
    statusLabel: "In Force — 13 Nov 2025",
    inForceDate: "13 Nov 2025",
    content: `In these rules, unless the context otherwise requires,—

(a) "Act" means the Digital Personal Data Protection Act, 2023 (22 of 2023);

(b) "section" means a section of the Act;

(c) "techno-legal measures" means technical and legal measures that meet such standards as may be specified by the Board from time to time;

(d) "user account" means an account created by a Data Principal with a Data Fiduciary for the purpose of availing services offered by the Data Fiduciary; and

(e) "verifiable consent" means consent verified through a mechanism as prescribed under rules 10 or 11, as the case may be.`,
  },
  {
    id: "rule-3",
    number: 3,
    title: "Notice given by Data Fiduciary to Data Principal",
    description: "Prescribes the form, manner and detailed content of notice before processing personal data — itemised, multilingual, machine-readable.",
    status: "2027",
    statusLabel: "In Force — 13 May 2027",
    inForceDate: "13 May 2027",
    content: `(1) A Data Fiduciary shall, before or at the time of collection of personal data, give the Data Principal a notice containing—

(a) a clear and itemised description of the personal data to be collected and the specific purpose of processing such data;

(b) the manner in which the Data Principal may exercise the rights conferred on her under the Act, including—
   (i) right to access information (section 11);
   (ii) right to correction, completion and erasure (section 12);
   (iii) right to grievance redressal (section 13);
   (iv) right to nominate (section 14);

(c) the manner in which the Data Principal may make a complaint to the Board;

(d) the contact information of the Data Protection Officer (for Significant Data Fiduciaries) or any other person responsible for addressing grievances;

(e) the categories of third parties with whom personal data may be shared;

(f) the countries or territories to which personal data may be transferred outside India;

(g) the period for which personal data will be retained, or the criteria used to determine that period; and

(h) the process by which the Data Principal may withdraw her consent and the consequences of such withdrawal.

(2) The notice shall be made available in English and in any language specified in the Eighth Schedule to the Constitution, upon request.

(3) The notice shall be presented in a structured, layered, and machine-readable format to facilitate automated processing.

(4) Where personal data was collected before the commencement of this rule, the notice shall be given at the earliest opportunity before the next processing activity.`,
  },
  {
    id: "rule-4",
    number: 4,
    title: "Registration and obligations of Consent Manager",
    description: "Establishes the registration framework for Consent Managers with the Board, minimum net worth ₹2 crore, and obligations under the First Schedule.",
    status: "2026",
    statusLabel: "In Force — 13 Nov 2026",
    inForceDate: "13 Nov 2026",
    content: `(1) A person desiring to act as a Consent Manager shall apply to the Board for registration in such form and manner as may be specified by the Board.

(2) The Board shall, after satisfying itself that the applicant meets the conditions specified in Part A of the First Schedule, grant registration to the applicant for such period as may be specified.

(3) A registered Consent Manager shall be subject to the obligations specified in Part B of the First Schedule.

(4) The registration shall be renewable on application and on continued satisfaction of the conditions in Part A of the First Schedule.

(5) The Board may suspend or cancel the registration of a Consent Manager for breach of the conditions of registration or the obligations in Part B of the First Schedule, after giving the Consent Manager an opportunity of being heard.

(6) A Consent Manager shall not—
(a) directly or indirectly acquire, use or otherwise process personal data of a Data Principal for any purpose other than as instructed by the Data Principal;
(b) sub-contract consent management functions to any other person.`,
    scheduleRef: "First Schedule (Parts A & B)",
  },
  {
    id: "rule-5",
    number: 5,
    title: "Processing of personal data by State and its instrumentalities",
    description: "Sets standards for State entities processing personal data, incorporating Second Schedule standards.",
    status: "2027",
    statusLabel: "In Force — 13 May 2027",
    inForceDate: "13 May 2027",
    content: `The State or any instrumentality of the State shall, when processing personal data of Data Principals in furtherance of its functions, comply with the standards specified in the Second Schedule.

Such standards include:
— Processing only personal data that is necessary and proportionate to the specified governmental function;
— Implementing security safeguards equivalent to those under Rule 6;
— Not using personal data collected for one governmental purpose for a different purpose without legal authorisation;
— Publishing a clear and accessible privacy notice; and
— Establishing a grievance redressal mechanism for Data Principals.`,
    scheduleRef: "Second Schedule",
  },
  {
    id: "rule-6",
    number: 6,
    title: "Reasonable security safeguards",
    description: "Specifies technical and organisational security measures: encryption, masking, virtual tokens, access controls, 1-year audit logs, and regular backups.",
    status: "2027",
    statusLabel: "In Force — 13 May 2027",
    inForceDate: "13 May 2027",
    content: `Every Data Fiduciary and data processor shall implement reasonable security safeguards to prevent personal data breach, including—

(a) use of encryption, obfuscation, masking, or virtual tokens to protect personal data from unauthorised access, use, or disclosure;

(b) implementation of access controls and multi-factor authentication for systems that hold personal data, ensuring that access is granted only on a need-to-know basis;

(c) maintenance of audit logs recording all access to and processing of personal data, for a minimum period of one year from the date of each activity;

(d) regular data backups and verification of integrity of backed-up data;

(e) a process for regularly testing, assessing and evaluating the effectiveness of the security safeguards; and

(f) a process for restoring the availability and access to personal data in a timely manner in the event of a physical or technical incident.`,
  },
  {
    id: "rule-7",
    number: 7,
    title: "Intimation of personal data breach",
    description: "Requires notification to the Board within 72 hours and to affected Data Principals without delay, with prescribed content for each notification.",
    status: "2027",
    statusLabel: "In Force — 13 May 2027",
    inForceDate: "13 May 2027",
    content: `Upon becoming aware of a personal data breach, a Data Fiduciary shall—

(a) give intimation to the Board within seventy-two hours of becoming aware of such breach, specifying—
   (i) the nature of the personal data breach, including the type and estimated volume of personal data breached;
   (ii) the categories and approximate number of Data Principals likely to be affected;
   (iii) the likely consequences of the breach for affected Data Principals;
   (iv) the measures taken or proposed to address the breach and mitigate its effects; and
   (v) the contact details of the Data Protection Officer or responsible person; and

(b) give intimation to each affected Data Principal without undue delay, in a form and manner as may be specified by the Board, including—
   (i) a description of the nature of the breach in plain language;
   (ii) the personal data of the Data Principal that has been breached;
   (iii) the likely consequences of the breach for the Data Principal; and
   (iv) the remedial measures the Data Principal may take to protect herself.`,
  },
  {
    id: "rule-8",
    number: 8,
    title: "Time period for erasure of personal data",
    description: "Third Schedule: 3-year retention limit for e-commerce, online gaming, and social media. 48-hour pre-erasure notice required. 1-year log retention after erasure.",
    status: "2027",
    statusLabel: "In Force — 13 May 2027",
    inForceDate: "13 May 2027",
    content: `(1) The time periods for erasure of personal data of Data Principals are as specified in the Third Schedule.

(2) A Data Fiduciary shall, not less than forty-eight hours before erasing the personal data of a Data Principal, give a notice to the Data Principal informing her of—
(a) the impending erasure of her personal data;
(b) the option to withdraw consent or exercise rights under sections 11 to 14 of the Act before the personal data is erased.

(3) Notwithstanding the erasure of personal data under sub-rule (1) or section 8(7) of the Act, the Data Fiduciary shall retain the audit logs of processing activities related to such personal data for a minimum period of one year from the date of erasure.

Third Schedule (Retention Periods):
— E-commerce entities: 3 years from the last date on which the Data Principal purchased a product or availed a service
— Online gaming intermediaries: 3 years from the last date on which the Data Principal logged in or played
— Social media intermediaries: 3 years from the last date on which the Data Principal used the platform`,
    scheduleRef: "Third Schedule",
  },
  {
    id: "rule-9",
    number: 9,
    title: "Contact information for DPO or grievance officer",
    description: "Requires Data Fiduciaries to publish business contact details of the DPO or grievance officer in an easily accessible format on their website and app.",
    status: "2027",
    statusLabel: "In Force — 13 May 2027",
    inForceDate: "13 May 2027",
    content: `Every Data Fiduciary shall publish, in an easily accessible manner on its website and within any mobile application it operates, the business contact information of—

(a) the Data Protection Officer appointed under section 10(2)(a) of the Act (for Significant Data Fiduciaries); or

(b) any other person designated by the Data Fiduciary to address grievances of Data Principals (for other Data Fiduciaries).

The contact information shall include at minimum—
— An email address or electronic contact form;
— The name and designation of the DPO or grievance officer; and
— The language(s) in which grievances may be submitted.`,
  },
  {
    id: "rule-10",
    number: 10,
    title: "Verifiable consent for child's personal data",
    description: "Mandates parental/guardian consent verification via DigiLocker or Board-approved electronic mechanism before processing a child's personal data.",
    status: "2027",
    statusLabel: "In Force — 13 May 2027",
    inForceDate: "13 May 2027",
    content: `(1) A Data Fiduciary shall, before processing the personal data of a child, obtain verifiable consent of the parent or lawful guardian of such child through one of the following mechanisms:

(a) identity verification of the parent or guardian through DigiLocker or any other identity verification system approved by the Central Government; or

(b) a virtual token-based verification system approved by the Board, which confirms the identity of the parent or guardian without storing sensitive identification data.

(2) A Consent Manager registered under Rule 4 may be used to facilitate the process of obtaining verifiable consent under sub-rule (1).

(3) The Data Fiduciary shall not process the personal data of the child until verifiable consent of the parent or guardian has been obtained and confirmed.

(4) A record of the verifiable consent shall be maintained by the Data Fiduciary for the duration of processing and for one year thereafter.`,
    scheduleRef: "Fourth Schedule",
  },
  {
    id: "rule-11",
    number: 11,
    title: "Verifiable consent for person with disability",
    description: "Prescribes verifiable consent mechanism for processing personal data of persons with disabilities, using the lawful guardian's identity.",
    status: "2027",
    statusLabel: "In Force — 13 May 2027",
    inForceDate: "13 May 2027",
    content: `For the processing of personal data of a person with disability, a Data Fiduciary shall obtain verifiable consent of the lawful guardian of such person through the mechanism specified in Rule 10, with such modifications and accessibility accommodations as may be required to ensure that the guardian can effectively give, manage, review or withdraw consent on behalf of the person with disability.`,
  },
  {
    id: "rule-12",
    number: 12,
    title: "Exemptions from child data obligations",
    description: "Specifies classes of Data Fiduciaries and purposes exempted from parental consent requirements for children's data per the Fourth Schedule.",
    status: "2027",
    statusLabel: "In Force — 13 May 2027",
    inForceDate: "13 May 2027",
    content: `The obligations under section 9(1) of the Act (verifiable parental consent before processing) and section 9(2) of the Act (prohibition on tracking, monitoring and targeted advertising) shall not apply to—

(a) a Data Fiduciary in the class specified in Part A of the Fourth Schedule, processing personal data of a child for the purpose specified in Part B of the Fourth Schedule; or

(b) such other classes of Data Fiduciaries and purposes as the Central Government may notify from time to time.

Fourth Schedule Part A — Exempt Fiduciary Classes:
— Healthcare service providers
— Educational institutions (schools, colleges, coaching centres)
— Crèches and day-care centres
— Child transport service providers

Fourth Schedule Part B — Exempt Purposes:
— Medical treatment of the child
— Provision of education to the child
— Childcare services
— Transport to/from educational institutions`,
    scheduleRef: "Fourth Schedule (Parts A & B)",
  },
  {
    id: "rule-13",
    number: 13,
    title: "Additional obligations of Significant Data Fiduciary",
    description: "Annual DPIA + audit, algorithmic due diligence for AI systems, and data localisation requirement for SDFs.",
    status: "2027",
    statusLabel: "In Force — 13 May 2027",
    inForceDate: "13 May 2027",
    content: `A Significant Data Fiduciary shall, in addition to the obligations under the Act and these rules, comply with the following:

(a) Annual Data Protection Impact Assessment (DPIA):
Conduct, at least once each year, a Data Protection Impact Assessment evaluating the nature, scope, context and purposes of all processing activities and the associated risks to the rights of Data Principals, and submit a report of such assessment to the Board.

(b) Annual independent audit:
Appoint an independent Data Auditor, approved by the Board, to evaluate compliance with the Act and these rules each year. The audit report shall be submitted to the Board and made available to the Board of Directors.

(c) Algorithmic due diligence:
Conduct, at least once each year, a review of all algorithms, machine learning models and artificial intelligence systems used for processing personal data, assessing their potential to—
   (i) cause harm to Data Principals;
   (ii) discriminate on prohibited grounds; or
   (iii) produce biased or inaccurate outputs affecting Data Principal rights.

(d) Data localisation:
Ensure that personal data of Data Principals located in India is stored and mirrored on servers physically located within India, and may be transferred outside India only to countries or territories notified by the Central Government under section 16 of the Act.`,
  },
  {
    id: "rule-14",
    number: 14,
    title: "Rights of Data Principals — procedures and timelines",
    description: "Prescribes 30-day deadlines for responding to access and correction requests and for grievance redressal, before Board complaint is permitted.",
    status: "2027",
    statusLabel: "In Force — 13 May 2027",
    inForceDate: "13 May 2027",
    content: `(1) A Data Fiduciary shall respond to a request made by a Data Principal under section 11 (right to access) or section 12 (right to correction and erasure) of the Act within thirty days of receipt of such request.

(2) A Data Fiduciary shall redress a grievance filed by a Data Principal under section 13(1) of the Act within thirty days of receipt of such grievance.

(3) If a Data Fiduciary fails to respond to a request under sub-rule (1) or fails to redress a grievance under sub-rule (2) within the period of thirty days, the Data Principal may file a complaint with the Board under section 13(4) of the Act.

(4) Where a Data Fiduciary has made a correction, completion or updation of personal data pursuant to a request under section 12(1), it shall—
(a) confirm in writing to the Data Principal that the correction has been made; and
(b) notify all third parties to whom the personal data was previously disclosed of the correction, unless such notification is impossible or involves disproportionate effort.`,
  },
  {
    id: "rule-15",
    number: 15,
    title: "Transfer of personal data outside India",
    description: "Procedures for cross-border transfer of personal data to government-whitelisted countries; Data Principal must be informed in the notice.",
    status: "2027",
    statusLabel: "In Force — 13 May 2027",
    inForceDate: "13 May 2027",
    content: `(1) A Data Fiduciary may transfer personal data to a country or territory notified by the Central Government under section 16 of the Act, subject to such terms and conditions as may be specified in such notification.

(2) Before transferring personal data outside India, the Data Fiduciary shall—
(a) inform the Data Principal, in the notice under Rule 3, of the countries or territories to which her personal data may be transferred; and
(b) obtain her consent for such transfer as part of the consent obtained for processing under section 5 of the Act.

(3) A Data Fiduciary shall not transfer personal data to any country or territory that has not been notified by the Central Government under section 16, except as permitted under section 16(2) of the Act (e.g., contractual necessity, public interest).`,
  },
  {
    id: "rule-16",
    number: 16,
    title: "Exemption for research, archiving and statistical purposes",
    description: "Processing for research, archiving, or statistics is exempt from consent and rights obligations provided data is not used for individual decisions and appropriate safeguards apply.",
    status: "2027",
    statusLabel: "In Force — 13 May 2027",
    inForceDate: "13 May 2027",
    content: `Processing of personal data for research, archiving, or statistical analysis shall be exempt from the requirements of sections 5, 6, 11, 12, 13 and 14 of the Act (consent, notice and Data Principal rights), provided that—

(a) such personal data is not used to take any decision specific to an individual Data Principal;

(b) the personal data is anonymised to the extent technically feasible before use;

(c) appropriate technical and organisational safeguards are maintained to prevent identification of individual Data Principals from the processed data; and

(d) the processing is conducted in accordance with ethical research standards and, where applicable, in compliance with any sector-specific regulations governing research ethics.`,
  },
  {
    id: "rule-17",
    number: 17,
    title: "Appointment of Chairperson and Members of the Board",
    description: "Establishes a Search-cum-Selection Committee comprising Cabinet Secretary, MeitY Secretary, and an expert to recommend Board appointments.",
    status: "in_force",
    statusLabel: "In Force — 13 Nov 2025",
    inForceDate: "13 Nov 2025",
    content: `(1) The Central Government shall constitute a Search-cum-Selection Committee for the purpose of recommending persons for appointment as Chairperson and Members of the Data Protection Board of India.

(2) The Search-cum-Selection Committee shall consist of—
(a) the Cabinet Secretary — Chairperson of the Committee;
(b) the Secretary to the Government of India in the Ministry of Electronics and Information Technology — Member; and
(c) an eminent person having experience and knowledge in the field of data protection, technology or law, to be appointed by the Central Government — Member.

(3) The Committee shall—
(a) invite applications or nominations for the posts of Chairperson and Members;
(b) assess the qualifications, experience and integrity of candidates;
(c) prepare a panel of suitable candidates; and
(d) recommend the panel to the Central Government.

(4) The Central Government shall appoint the Chairperson and Members from the panel recommended by the Committee.`,
  },
  {
    id: "rule-18",
    number: 18,
    title: "Salary and terms of service of Chairperson and Members",
    description: "Fifth Schedule: Chairperson receives ₹4.5 lakh/month, Members ₹4 lakh/month, plus applicable Central Government allowances.",
    status: "in_force",
    statusLabel: "In Force — 13 Nov 2025",
    inForceDate: "13 Nov 2025",
    content: `The salary and allowances payable to, and the other terms and conditions of service of, the Chairperson and Members of the Board shall be as specified in the Fifth Schedule.

Fifth Schedule:
— Chairperson: ₹4,50,000 (four lakh fifty thousand rupees) per month
— Member: ₹4,00,000 (four lakh rupees) per month

In addition to the monthly salary, the Chairperson and Members shall be entitled to—
(a) allowances equivalent to those payable to officers of equivalent grade in the Central Government;
(b) official accommodation or house rent allowance;
(c) transport allowance;
(d) medical facilities; and
(e) such other entitlements as applicable to senior officers of the Central Government.`,
    scheduleRef: "Fifth Schedule",
  },
  {
    id: "rule-19",
    number: 19,
    title: "Board procedure",
    description: "One-third quorum, majority voting (Chairperson has casting vote), 6-month inquiry deadline, all proceedings via digital means.",
    status: "in_force",
    statusLabel: "In Force — 13 Nov 2025",
    inForceDate: "13 Nov 2025",
    content: `(1) The quorum for a meeting of the Board shall be one-third of the total number of Members of the Board for the time being.

(2) All questions before the Board shall be decided by a majority of the Members present and voting at the meeting. In the event of an equality of votes, the Chairperson or the Member presiding at the meeting shall have a second or casting vote.

(3) The Board shall endeavour to complete each inquiry initiated under section 21 of the Act within a period of six months from the date on which the inquiry was initiated.

(4) All proceedings of the Board, including the receipt of complaints, examination of witnesses, conduct of hearings, and issue of notices and orders, shall be conducted through digital means including video conferencing and electronic filing.

(5) A proceeding of the Board shall not be invalid merely by reason of any vacancy in the membership of the Board.`,
  },
  {
    id: "rule-20",
    number: 20,
    title: "Board as digital office",
    description: "Prescribes techno-legal measures for all Board operations as a fully digital office — complaints, proceedings, orders, and records.",
    status: "in_force",
    statusLabel: "In Force — 13 Nov 2025",
    inForceDate: "13 Nov 2025",
    content: `The Board shall function as a digital office and shall use techno-legal measures as specified by the Board from time to time for—

(a) receipt of complaints, references, and other communications from Data Principals, Data Fiduciaries, the Central Government and other parties;

(b) conduct of proceedings, including examination and cross-examination of witnesses via video conferencing;

(c) issue of notices, summons, orders, decisions and directions in digital form;

(d) maintenance of records of all proceedings in digital form; and

(e) any other official business of the Board.

The Board shall make its digital interface accessible to persons with disabilities and shall provide language support in accordance with the Eighth Schedule to the Constitution.`,
  },
  {
    id: "rule-21",
    number: 21,
    title: "Officers and employees of the Board",
    description: "Provides for appointment of Board officers and employees with Central Government approval, subject to Sixth Schedule terms.",
    status: "in_force",
    statusLabel: "In Force — 13 Nov 2025",
    inForceDate: "13 Nov 2025",
    content: `(1) The Board may, with the prior approval of the Central Government, appoint such officers and other employees as it considers necessary for the efficient discharge of its functions under the Act.

(2) The terms and conditions of service of the officers and employees of the Board, including their salary, allowances, leave, and other service conditions, shall be as specified in the Sixth Schedule.

(3) Pending framing of the Sixth Schedule regulations, the Central Government may depute officers of the Central Government to serve in the Board.`,
    scheduleRef: "Sixth Schedule",
  },
  {
    id: "rule-22",
    number: 22,
    title: "Appeal to Appellate Tribunal",
    description: "Digital filing of appeals before TDSAT within 60 days, fee paid via UPI or digital payment, 60-day disposal target.",
    status: "2027",
    statusLabel: "In Force — 13 May 2027",
    inForceDate: "13 May 2027",
    content: `(1) Any person aggrieved by an order of the Board may prefer an appeal to the Appellate Tribunal (the Telecom Disputes Settlement and Appellate Tribunal — TDSAT) in such form and manner as the Appellate Tribunal may specify.

(2) The appeal shall be filed in digital form through the Appellate Tribunal's online portal.

(3) The fee for filing an appeal shall be such amount as may be specified by the Appellate Tribunal and shall be payable through UPI or such other digital payment mechanism as may be notified.

(4) The appeal shall be filed within sixty days from the date of receipt of the order of the Board. The Appellate Tribunal may condone delay if it is satisfied that the appellant was prevented by sufficient cause from filing within the period of sixty days.

(5) The Appellate Tribunal shall endeavour to dispose of every appeal within sixty days from the date of its filing.

(6) An appeal shall lie to the Supreme Court of India from any order of the Appellate Tribunal on a question of law.`,
  },
  {
    id: "rule-23",
    number: 23,
    title: "Calling for information from Data Fiduciary",
    description: "Empowers the Board to call for information from Data Fiduciaries; Seventh Schedule governs government information powers.",
    status: "2027",
    statusLabel: "In Force — 13 May 2027",
    inForceDate: "13 May 2027",
    content: `(1) The Board may, for the purpose of carrying out its functions under the Act, call for such information from any Data Fiduciary or data processor as it may consider necessary.

(2) The Data Fiduciary or data processor shall furnish the information within such period and in such form as may be specified by the Board.

(3) The information received by the Board under this rule shall—
(a) be kept confidential and used only for the purposes of the Act; and
(b) not be disclosed to any person except as required by law or by an order of a competent court.

(4) The powers of the Central Government to call for information from Data Fiduciaries are specified in the Seventh Schedule.`,
    scheduleRef: "Seventh Schedule",
  },
];

export const schedules: Schedule[] = [
  {
    id: "sch-1a",
    number: "First Schedule, Part A",
    title: "Consent Manager — Registration Conditions",
    description: "Conditions for registration of a Consent Manager with the Data Protection Board of India.",
    content: `A Consent Manager seeking registration with the Board shall satisfy the following conditions:

(a) Incorporation: Must be a company incorporated in India under the Companies Act, 2013, with its registered and principal place of business in India.

(b) Net worth: Must have a net worth of not less than two crore rupees at the time of application and maintain such net worth at all times during the registration period.

(c) Platform requirements: Must maintain an accessible, transparent and interoperable platform that enables Data Principals to give, manage, review and withdraw consent effectively.

(d) Technical standards: Must implement technical standards for interoperability with other Consent Managers, as specified by the Board.

(e) Independent certification: Must obtain and maintain certification from an independent body approved by the Board, certifying that the platform meets prescribed technical and security standards.

(f) Conflict of interest: Must not have any conflict of interest in acting as a single point of contact between Data Principals and Data Fiduciaries.

(g) Fit and proper criteria: Promoters, directors and key managerial persons must satisfy such fit and proper criteria as may be specified by the Board.`,
  },
  {
    id: "sch-1b",
    number: "First Schedule, Part B",
    title: "Consent Manager — Obligations (13 Obligations)",
    description: "13 specific obligations of registered Consent Managers including fiduciary duty, 7-year records, and prohibition on sub-contracting.",
    content: `A registered Consent Manager shall—

1. Fiduciary duty: Act exclusively as a fiduciary to the Data Principal; not act in the interest of or take instructions from any Data Fiduciary in a manner that conflicts with the interests of the Data Principal.

2. Conflict of interest: Maintain a conflict of interest register and disclose all actual or potential conflicts of interest to the Board and to affected Data Principals without delay.

3. Record retention: Maintain records of all consents given, managed, reviewed and withdrawn through its platform for a period of seven years from the date of each consent action.

4. No sub-contracting: Not sub-contract or delegate consent management functions or access to Data Principal consent records to any other person or entity.

5. User interface: Provide Data Principals with a user-friendly, accessible interface in multiple languages to view, manage and withdraw all consents they have given through the platform.

6. Immediate processing of withdrawal: Upon a Data Principal withdrawing consent, process and communicate such withdrawal to the concerned Data Fiduciary immediately and without delay.

7. No fees from Data Principals: Not charge any fees from Data Principals for accessing, using or availing of the consent management platform.

8. Interoperability: Maintain the interoperability of its platform with other registered Consent Managers to enable seamless transfer of consent records.

9. Quarterly compliance reports: Submit quarterly compliance reports to the Board in the format specified by the Board.

10. Data confidentiality: Not share Data Principal information with any third party except as required by law or as directed by the Data Principal.

11. Security safeguards: Implement security safeguards as specified under Rule 6 for the protection of consent records and Data Principal information.

12. Insurance: Maintain such insurance cover as may be specified by the Board to cover liability arising from breach of its obligations.

13. General compliance: Comply with such other obligations as may be specified by the Board from time to time.`,
  },
  {
    id: "sch-2",
    number: "Second Schedule",
    title: "Standards for Processing by State and Instrumentalities",
    description: "Technical and governance standards for government processing of personal data.",
    content: `The State and its instrumentalities shall comply with the following standards when processing personal data:

(a) Necessity and proportionality: Process only personal data that is strictly necessary and proportionate to the specified governmental function or public service being rendered.

(b) Security safeguards: Implement security safeguards equivalent to those prescribed under Rule 6, including encryption, access controls and audit logs.

(c) Purpose limitation: Not use personal data collected for one specified governmental purpose for any other purpose without explicit legal authorisation or the consent of the Data Principal.

(d) Transparency: Publish a clear and accessible privacy notice on the relevant government website and in physical offices, specifying the categories of data collected, the purpose of processing, and Data Principal rights.

(e) Grievance redressal: Establish an effective grievance redressal mechanism enabling Data Principals to raise concerns about the processing of their personal data.

(f) Data sharing: Not share personal data with other government departments or third parties except as authorised by law or as consented to by the Data Principal.

(g) Retention: Retain personal data only for the period specified by applicable law or as necessary for the governmental function, and delete thereafter.`,
  },
  {
    id: "sch-3",
    number: "Third Schedule",
    title: "Time Periods for Erasure of Personal Data",
    description: "3-year retention limit for e-commerce, online gaming and social media platforms from last activity date.",
    content: `The following time periods shall apply for the erasure of personal data of Data Principals under Rule 8:

1. E-commerce entities:
Personal data shall be erased within three years from the last date on which the Data Principal—
(a) purchased any product from the Data Fiduciary; or
(b) availed any service from the Data Fiduciary,
whichever is later.

2. Online gaming intermediaries:
Personal data shall be erased within three years from the last date on which the Data Principal—
(a) logged in to the gaming platform; or
(b) participated in any game or gaming activity on the platform,
whichever is later.

3. Social media intermediaries:
Personal data shall be erased within three years from the last date on which the Data Principal used or accessed the social media platform.

Important notes:
— The 48-hour pre-erasure notice requirement under Rule 8(2) applies in all cases before erasure.
— Processing audit logs must be retained for 1 year after erasure per Rule 8(3).
— Where a Data Principal has exercised the right to erasure under section 12(1)(d) before the retention period expires, erasure must occur promptly in accordance with Rule 14.`,
  },
  {
    id: "sch-4a",
    number: "Fourth Schedule, Part A",
    title: "Child Data Exemptions — Exempt Fiduciary Classes",
    description: "Classes of Data Fiduciaries exempt from verifiable parental consent requirements for children's personal data.",
    content: `The following classes of Data Fiduciaries are exempt from the requirements of section 9(1) and 9(2) of the Act (verifiable parental consent and prohibition on tracking/targeting), subject to the conditions in Part B:

1. Healthcare service providers: Hospitals, clinics, diagnostic laboratories, telemedicine services, and other healthcare providers — exempt for the purpose of providing medical treatment, diagnosis, or preventive healthcare to a child.

2. Educational institutions: Schools (primary, secondary and higher secondary), colleges, universities, coaching centres, online educational platforms — exempt for the purpose of providing education, conducting examinations, and maintaining academic records.

3. Crèches and day-care centres: Registered crèche facilities and day-care centres — exempt for the purpose of providing childcare services to a child during the day.

4. Child transport service providers: School buses, cab services contracted by schools — exempt for the purpose of providing transport to and from educational institutions.

5. Such other classes as the Central Government may notify from time to time.`,
  },
  {
    id: "sch-4b",
    number: "Fourth Schedule, Part B",
    title: "Child Data Exemptions — Exempt Purposes",
    description: "Specific purposes for which children's data may be processed without verifiable parental consent.",
    content: `Processing of personal data of a child is exempt from the requirements of section 9(1) of the Act for the following purposes:

1. Medical treatment: For the purpose of providing emergency or ongoing medical treatment to a child, including maintaining medical history and prescriptions.

2. Education: For the purpose of enrolling, teaching, evaluating, and maintaining academic records of a child at an educational institution.

3. Childcare: For the purpose of providing crèche, day-care, or similar childcare services to a child.

4. Transport safety: For the purpose of tracking school transport vehicles and ensuring the safety of children being transported to and from educational institutions.

5. Safety in emergency: For the purpose of protecting the safety or well-being of a child in an emergency situation where obtaining parental consent is not feasible.

6. Law enforcement: For the prevention, detection, investigation, or prosecution of an offence involving or affecting a child.

7. Court orders: For compliance with any order or direction of a court or other competent authority relating to a child.`,
  },
  {
    id: "sch-5",
    number: "Fifth Schedule",
    title: "Board Member Salaries and Allowances",
    description: "Monthly salary: Chairperson ₹4.5 lakh, Members ₹4 lakh, plus Central Government allowances.",
    content: `Salary and allowances payable to the Chairperson and Members of the Data Protection Board of India:

Chairperson:
— Basic salary: ₹4,50,000 (four lakh fifty thousand rupees) per month
— Dearness allowance as applicable to Central Government officers of equivalent grade
— House rent allowance or official accommodation
— Transport allowance
— Medical facilities for self and family
— Leave travel concession

Members:
— Basic salary: ₹4,00,000 (four lakh rupees) per month
— Dearness allowance as applicable to Central Government officers of equivalent grade
— House rent allowance or official accommodation
— Transport allowance
— Medical facilities for self and family
— Leave travel concession

Post-retirement benefits:
The Chairperson and Members shall be entitled to pension and post-retirement medical benefits equivalent to those applicable to officers of corresponding grade in the Central Government.`,
  },
  {
    id: "sch-6",
    number: "Sixth Schedule",
    title: "Terms of Service for Board Officers and Employees",
    description: "Service conditions for officers and employees of the Data Protection Board.",
    content: `The terms and conditions of service of officers and employees of the Board shall be determined by the Board with prior approval of the Central Government, and shall include:

(a) Recruitment: Appointments may be made by direct recruitment, deputation from Central/State Government services, or contract engagement, as specified by the Board in its service regulations.

(b) Salary scales: Salaries shall be equivalent to those of officers of corresponding grade and seniority in the Central Government pay matrix.

(c) Leave: Officers and employees shall be entitled to leave (casual, earned, medical, maternity/paternity) equivalent to Central Government entitlements.

(d) Disciplinary procedure: Misconduct shall be dealt with under a procedure equivalent to the Central Civil Services (Classification, Control and Appeal) Rules.

(e) Pension: Officers appointed on regular basis shall be entitled to the National Pension System (NPS) benefits applicable to Central Government employees.

(f) Conduct rules: Officers and employees shall be subject to conduct rules equivalent to the Central Government Servants' Conduct Rules.`,
  },
  {
    id: "sch-7",
    number: "Seventh Schedule",
    title: "Government Powers to Call for Information",
    description: "Specifies the scope and manner of Central Government powers to call for information from Data Fiduciaries.",
    content: `The Central Government may, in the exercise of its powers under the Act, call for information from any Data Fiduciary or class of Data Fiduciaries for the following purposes:

(a) national security assessment: Evaluation of the national security implications of the processing activities of a Data Fiduciary or class of Data Fiduciaries;

(b) sovereignty and integrity: Assessment of risks to the sovereignty or integrity of India arising from the cross-border transfer of personal data;

(c) investigation of systemic failure: Investigation of any systemic or widespread failure of data protection obligations that affects a large number of Data Principals;

(d) policy development: Preparation of policy proposals, legislative amendments, or sector-specific regulations relating to data protection;

(e) electoral integrity: Assessment of risks to the integrity of elections arising from the processing of personal data.

The Data Fiduciary shall furnish the information within the period and in the form specified in the requisition from the Central Government, and shall maintain the confidentiality of the fact that such information has been sought, unless directed otherwise.`,
  },
];

export function getRulesByStatus(status: RuleStatus): Rule[] {
  return rules.filter(r => r.status === status);
}

export function getRuleById(id: string): Rule | undefined {
  return rules.find(r => r.id === id);
}
