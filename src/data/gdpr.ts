// GDPR data — sourced from Regulation (EU) 2016/679 with 2018 Corrigendum
// Official Journal L 119, 4.5.2016; Corrigendum OJ L 127, 23.5.2018

export interface GdprFlashcard {
  front: string;
  back: string;
}

export interface GdprQuizQuestion {
  question: string;
  options: string[];
  answer: number;
  explanation?: string;
}

export interface GdprSection {
  id: string;
  number: string;
  articleRef: string;
  title: string;
  content: string;
  authorNote: string;
  dpdpaCorrespondence: string;
  proverb: string;
  flashcards?: GdprFlashcard[];
  quiz?: GdprQuizQuestion[];
}

export interface GdprChapter {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  articleRange: string;
  color: string;
  sections: GdprSection[];
}

export const gdpr = {
  id: "gdpr",
  title: "General Data Protection Regulation",
  shortTitle: "GDPR 2016/679",
  year: 2018,
  region: "European Union",
  inForce: "25 May 2018",
  chapters: [
    {
      id: "ch1",
      number: 1,
      title: "General Provisions",
      subtitle: "Scope, objectives and key definitions",
      articleRange: "Arts. 1–4",
      color: "#3B82F6",
      sections: [
        {
          id: "g1-1",
          number: "Art. 1",
          articleRef: "Article 1",
          title: "Subject-Matter & Objectives",
          content: `Article 1 — Subject-matter and objectives

1. This Regulation lays down rules relating to the protection of natural persons with regard to the processing of personal data and rules relating to the free movement of personal data.

2. This Regulation protects fundamental rights and freedoms of natural persons and in particular their right to the protection of personal data.

3. The free movement of personal data within the Union shall be neither restricted nor prohibited for reasons connected with the protection of natural persons with regard to the processing of personal data.

The GDPR thus has a dual mandate: protecting fundamental rights on one hand, and ensuring the free flow of data within the European internal market on the other. These two objectives exist in deliberate tension and must be balanced throughout the Regulation's application.`,
          authorNote: `Article 1 establishes the constitutional foundation of the GDPR. The dual purpose — rights protection AND free movement — is not incidental. The EU needed a single market for data, but the Schrems I litigation (2015) had already demonstrated that data protection could not be sacrificed at the altar of commerce. The GDPR tries to resolve this tension by creating a high, uniform floor of protection across all Member States, so that data can flow freely within the EU while still being protected.

Notably, this is a Regulation (not a Directive), meaning it applies directly without national implementing legislation. This was a deliberate shift from Directive 95/46/EC, which had produced a patchwork of national laws.`,
          dpdpaCorrespondence: `DPDPA Section 1 (Short Title, Extent & Commencement) and Section 2 (Definitions) together address GDPR's Art. 1 objectives. However, DPDPA is narrower: it applies only to digital personal data (not paper records), and it does not have the EU's free-movement objective. DPDPA's primary objective is protection of individual rights, with cross-border transfer rules as a separate mechanism under Section 16.`,
          proverb: "Every great edifice rests on its first stone — the purpose you declare is the purpose you must keep.",
          flashcards: [
            { front: "What are the two purposes of GDPR as stated in Article 1?", back: "1) Protecting fundamental rights and freedoms of natural persons regarding personal data, and 2) Ensuring free movement of personal data within the EU" },
            { front: "Is GDPR a Regulation or a Directive, and why does it matter?", back: "A Regulation — it applies directly in all Member States without national implementation. This replaced Directive 95/46/EC which had created a patchwork of different national laws" },
            { front: "Can an EU Member State ban data flows to another Member State citing data protection?", back: "No — Article 1(3) prohibits restricting or prohibiting the free movement of personal data within the Union for data protection reasons" },
          ],
          quiz: [
            {
              question: "GDPR replaced which earlier EU data protection instrument?",
              options: [
                "The Data Protection Convention of 1981 (Council of Europe)",
                "Directive 95/46/EC on Protection of Personal Data",
                "The ePrivacy Directive 2002/58/EC",
                "The Charter of Fundamental Rights of the EU (2000)",
              ],
              answer: 1,
              explanation: "GDPR replaced Directive 95/46/EC. By using a Regulation instead of a Directive, the EU ensured uniform application across all Member States without the fragmentation that arose from 28 different national implementations of the Directive.",
            },
          ],
        },
        {
          id: "g1-2",
          number: "Arts. 2–3",
          articleRef: "Articles 2–3",
          title: "Territorial & Material Scope",
          content: `Article 2 — Material scope

1. This Regulation applies to the processing of personal data wholly or partly by automated means and to the processing other than by automated means of personal data which form part of a filing system or are intended to form part of a filing system.

2. This Regulation does not apply to the processing of personal data:
(a) in the course of an activity which falls outside the scope of Union law;
(b) by the Member States when carrying out activities which fall within the scope of Chapter 2 of Title V of the TEU;
(c) by a natural person in the course of a purely personal or household activity;
(d) by competent authorities for the purposes of the prevention, investigation, detection or prosecution of criminal offences.

Article 3 — Territorial scope

1. This Regulation applies to the processing of personal data in the context of the activities of an establishment of a controller or a processor in the Union, regardless of whether the processing takes place in the Union or not.

2. This Regulation applies to the processing of personal data of data subjects who are in the Union by a controller or processor not established in the Union, where the processing activities are related to:
(a) the offering of goods or services, irrespective of whether a payment of the data subject is required, to such data subjects in the Union; or
(b) the monitoring of their behaviour as far as their behaviour takes place within the Union.

3. This Regulation applies to the processing of personal data by a controller not established in the Union, but in a place where Member State law applies by virtue of public international law.`,
          authorNote: `The extra-territorial reach of GDPR (Art. 3(2)) — the "targeting test" — is one of the most consequential provisions in global privacy law. A company based in India, the US, or anywhere else is subject to GDPR if it offers goods or services to EU residents or monitors their behaviour (including through cookies, tracking pixels, or analytics). This is why global companies display GDPR-compliant cookie banners worldwide.

The GDPR covers both automated and manual processing of personal data in filing systems — much broader than India's DPDPA which only covers digital personal data.`,
          dpdpaCorrespondence: `DPDPA Section 1(2) limits scope to "digital personal data" processed within India and data processed outside India if related to offering goods/services to Data Principals in India. The DPDPA's extra-territorial reach is conceptually similar to GDPR Art. 3(2), but only applies to digital data. DPDPA also excludes personal data processed by natural persons for personal or domestic purposes (Section 4(2)), mirroring GDPR's household exemption.`,
          proverb: "A net cast wide catches more fish — know the waters in which you operate.",
          flashcards: [
            { front: "What is the 'targeting test' under GDPR Art 3(2)?", back: "A non-EU controller/processor is subject to GDPR if it: (a) offers goods/services to EU data subjects (free or paid), or (b) monitors their behaviour within the EU (e.g., tracking via cookies)" },
            { front: "Does GDPR cover handwritten records?", back: "Yes — Article 2(1) covers manual processing if the data forms part of a 'filing system' (structured set of personal data). Pure handwritten notes with no structure may be excluded." },
            { front: "A US company with no EU operations builds a website targeting EU customers. Does GDPR apply?", back: "Yes — the targeting test in Art 3(2)(a) catches this. The key is whether the company 'envisages' offering services to EU data subjects, e.g., EU pricing, EU languages, EU shipping." },
          ],
          quiz: [
            {
              question: "A Japanese company operates a mobile app that tracks the location of EU residents for targeted advertising. Does GDPR apply?",
              options: [
                "No — the company has no EU establishment",
                "No — advertising is not a regulated activity under GDPR",
                "Yes — monitoring behaviour of EU data subjects falls under Art 3(2)(b)",
                "Only if the company has annual revenue over €10 million",
              ],
              answer: 2,
              explanation: "Article 3(2)(b) explicitly applies GDPR to controllers/processors outside the EU when they monitor the behaviour of data subjects in the Union, which includes location tracking for advertising purposes.",
            },
          ],
        },
        {
          id: "g1-3",
          number: "Art. 4",
          articleRef: "Article 4",
          title: "26 Definitions — The GDPR Lexicon",
          content: `Article 4 — Definitions

For the purposes of this Regulation:

(1) 'personal data' means any information relating to an identified or identifiable natural person ('data subject'); an identifiable natural person is one who can be identified, directly or indirectly, in particular by reference to an identifier such as a name, an identification number, location data, an online identifier or to one or more factors specific to the physical, physiological, genetic, mental, economic, cultural or social identity of that natural person;

(2) 'processing' means any operation or set of operations which is performed on personal data or on sets of personal data, whether or not by automated means, such as collection, recording, organisation, structuring, storage, adaptation or alteration, retrieval, consultation, use, disclosure by transmission, dissemination or otherwise making available, alignment or combination, restriction, erasure or destruction;

(3) 'restriction of processing' means the marking of stored personal data with the aim of limiting their processing in the future;

(4) 'profiling' means any form of automated processing of personal data consisting of the use of personal data to evaluate certain personal aspects relating to a natural person, in particular to analyse or predict aspects concerning that natural person's performance at work, economic situation, health, personal preferences, interests, reliability, behaviour, location or movements;

(5) 'pseudonymisation' means the processing of personal data in such a manner that the personal data can no longer be attributed to a specific data subject without the use of additional information, provided that such additional information is kept separately and is subject to technical and organisational measures to ensure that the personal data are not attributed to an identified or identifiable natural person;

(6) 'filing system' means any structured set of personal data which are accessible according to specific criteria, whether centralised, decentralised or dispersed on a functional or geographical basis;

(7) 'controller' means the natural or legal person, public authority, agency or other body which, alone or jointly with others, determines the purposes and means of the processing of personal data;

(8) 'processor' means a natural or legal person, public authority, agency or other body which processes personal data on behalf of the controller;

(9) 'recipient' means a natural or legal person, public authority, agency or another body, to which the personal data are disclosed;

(11) 'consent' of the data subject means any freely given, specific, informed and unambiguous indication of the data subject's wishes by which he or she, by a statement or by a clear affirmative action, signifies agreement to the processing of personal data relating to him or her;

(13) 'genetic data' means personal data relating to the inherited or acquired genetic characteristics of a natural person which give unique information about the physiology or the health of that natural person;

(14) 'biometric data' means personal data resulting from specific technical processing relating to the physical, physiological or behavioural characteristics of a natural person, which allow or confirm the unique identification of that natural person, such as facial images or dactyloscopic data;

(15) 'data concerning health' means personal data related to the physical or mental health of a natural person, including the provision of health care services, which reveal information about his or her health status;

(16) 'main establishment' means: (a) as regards a controller with establishments in more than one Member State, the place of its central administration in the Union; (b) as regards a processor with establishments in more than one Member State, the place of its central administration in the Union;

(21) 'supervisory authority' means an independent public authority which is established by a Member State pursuant to Article 51;

(26) 'international organisation' means an organisation and its subordinate bodies governed by public international law, or any other body which is set up by, or on the basis of, an agreement between two or more countries.`,
          authorNote: `The GDPR's definitional architecture in Article 4 is its conceptual backbone. The definition of 'personal data' is deliberately broad — any information relating to an identifiable person, including indirect identifiers like IP addresses and location data. The CJEU confirmed in Breyer (2016) that dynamic IP addresses can be personal data.

The controller/processor distinction (definitions 7 and 8) is critical: controllers determine purposes and means; processors act on instructions. Getting this wrong has significant liability implications under Articles 28 and 82.`,
          dpdpaCorrespondence: `DPDPA Section 2 contains analogous definitions. Key mapping: GDPR 'controller' = DPDPA 'Data Fiduciary'; GDPR 'data subject' = DPDPA 'Data Principal'; GDPR 'processor' = DPDPA 'Data Processor'. Notable difference: GDPR defines 'personal data' broadly to include paper records and indirect identifiers; DPDPA defines 'personal data' as "any data about an individual who is identifiable by or in relation to such data" — similarly broad, but limited to digital form.`,
          proverb: "A word precisely defined is a boundary precisely drawn — clarity in language is clarity in law.",
        },
      ] as GdprSection[],
    },
    {
      id: "ch2",
      number: 2,
      title: "Principles & Legal Bases",
      subtitle: "The seven principles and six lawful grounds for processing",
      articleRange: "Arts. 5–11",
      color: "#F59E0B",
      sections: [
        {
          id: "g2-1",
          number: "Art. 5",
          articleRef: "Article 5",
          title: "Seven Principles of Processing",
          content: `Article 5 — Principles relating to processing of personal data

1. Personal data shall be:

(a) processed lawfully, fairly and in a transparent manner in relation to the data subject ('lawfulness, fairness and transparency');

(b) collected for specified, explicit and legitimate purposes and not further processed in a manner that is incompatible with those purposes; further processing for archiving purposes in the public interest, scientific or historical research purposes or statistical purposes shall not be considered to be incompatible with the initial purposes ('purpose limitation');

(c) adequate, relevant and limited to what is necessary in relation to the purposes for which they are processed ('data minimisation');

(d) accurate and, where necessary, kept up to date; every reasonable step must be taken to ensure that personal data that are inaccurate, having regard to the purposes for which they are processed, are erased or rectified without delay ('accuracy');

(e) kept in a form which permits identification of data subjects for no longer than is necessary for the purposes for which the personal data are processed; personal data may be stored for longer periods insofar as the personal data will be processed solely for archiving purposes in the public interest, scientific or historical research purposes or statistical purposes ('storage limitation');

(f) processed in a manner that ensures appropriate security of the personal data, including protection against unauthorised or unlawful processing and against accidental loss, destruction or damage, using appropriate technical or organisational measures ('integrity and confidentiality').

2. The controller shall be responsible for, and be able to demonstrate compliance with, paragraph 1 ('accountability').`,
          authorNote: `Article 5's seven principles are the moral constitution of GDPR. They are not just rules — they are the interpretive lens through which every other provision must be read. The accountability principle (Art. 5(2)) is the most transformative: it shifts the burden from regulators proving a violation to controllers demonstrating compliance. This drives the entire ecosystem of DPIAs, RoPAs, and DPOs.

The purpose limitation principle (Art. 5(1)(b)) is frequently litigated. The "incompatibility" test requires considering: the link between purposes, context of collection, nature of data, consequences, and safeguards. Secondary use of data for AI training, for example, is a live area of litigation.`,
          dpdpaCorrespondence: `DPDPA Section 4 (Grounds for Processing) and Section 6 (Notice) together implement GDPR's lawfulness/transparency principles. DPDPA Section 8(1) requires Data Fiduciaries to maintain completeness, accuracy, and consistency — mirroring GDPR's accuracy principle. Section 8(3) (purpose limitation) and Section 8(5) (data minimisation via "need-to-know" basis) correspond to GDPR Art. 5(1)(b) and (c). However, DPDPA does not enumerate the seven principles as a standalone article — they are distributed across Sections 4–10.`,
          proverb: "Know why you collect, what you need, and how long to keep — all else is excess.",
        },
        {
          id: "g2-2",
          number: "Art. 6",
          articleRef: "Article 6",
          title: "Six Legal Bases for Processing",
          content: `Article 6 — Lawfulness of processing

1. Processing shall be lawful only if and to the extent that at least one of the following applies:

(a) the data subject has given consent to the processing of his or her personal data for one or more specific purposes;

(b) processing is necessary for the performance of a contract to which the data subject is party or in order to take steps at the request of the data subject prior to entering into a contract;

(c) processing is necessary for compliance with a legal obligation to which the controller is subject;

(d) processing is necessary in order to protect the vital interests of the data subject or of another natural person;

(e) processing is necessary for the performance of a task carried out in the public interest or in the exercise of official authority vested in the controller;

(f) processing is necessary for the purposes of the legitimate interests pursued by the controller or by a third party, except where such interests are overridden by the interests or fundamental rights and freedoms of the data subject which require protection of personal data, in particular where the data subject is a child. Point (f) shall not apply to processing carried out by public authorities in the performance of their tasks.

2. Member States may maintain or introduce more specific provisions to adapt the application of the rules of this Regulation with regard to processing for compliance with points (c) and (e) of paragraph 1.

3. The basis for the processing referred to in point (c) and (e) of paragraph 1 shall be laid down by Union or Member State law. That legal basis may contain specific provisions to adapt the application of rules of this Regulation, including: the general conditions governing the lawfulness of processing; the types of data subject to processing; the entities to and the purposes for which data may be disclosed; the purpose limitation; storage periods; and processing operations and procedures.`,
          authorNote: `The six legal bases are exhaustive — processing is unlawful unless it falls within one of them. The most significant in practice are consent (Art. 6(1)(a)) and legitimate interests (Art. 6(1)(f)). Legitimate interests is a flexible but controversial ground: it requires a three-part test — the interest must be legitimate, the processing must be necessary, and the controller's interests must not be overridden by the data subject's rights. The EDPB's guidance confirms this is not a "catch-all."

A critical point: you cannot switch legal bases retrospectively. If you collected data under consent, you cannot later claim contract performance as the basis if the data subject withdraws.`,
          dpdpaCorrespondence: `DPDPA Section 4 provides grounds for processing that are structurally similar but narrower: consent (Section 5) and legitimate uses under Section 7 (legal obligation, medical emergency, public interest functions by State, employment, judicial functions). Notably, DPDPA has no direct equivalent to GDPR's "legitimate interests" basis — the most flexible GDPR ground. This is a significant structural difference. DPDPA's approach is more prescriptive.`,
          proverb: "A lawful act needs no concealment; know your ground before you act.",
        },
        {
          id: "g2-3",
          number: "Arts. 7–8",
          articleRef: "Articles 7–8",
          title: "Consent Requirements",
          content: `Article 7 — Conditions for consent

1. Where processing is based on consent, the controller shall be able to demonstrate that the data subject has consented to processing of his or her personal data.

2. If the data subject's consent is given in the context of a written declaration which also concerns other matters, the request for consent shall be presented in a manner which is clearly distinguishable from the other matters, in an intelligible and easily accessible form, using clear and plain language. Any part of such a declaration which constitutes an infringement of this Regulation shall not be binding.

3. The data subject shall have the right to withdraw his or her consent at any time. The withdrawal of consent shall not affect the lawfulness of processing based on consent before its withdrawal. Prior to giving consent, the data subject shall be informed thereof. It shall be as easy to withdraw consent as to give it.

4. When assessing whether consent is freely given, utmost account shall be taken of whether, inter alia, the performance of a contract, including the provision of a service, is conditional on consent to the processing of personal data that is not necessary for the performance of that contract.

Article 8 — Conditions applicable to child's consent in relation to information society services

1. Where point (a) of Article 6(1) applies, in relation to the offer of information society services directly to a child, the processing of the personal data of a child shall be lawful where the child is at least 16 years old. Where the child is below the age of 16 years, such processing shall be lawful only if and to the extent that consent is given or authorised by the holder of parental responsibility over the child. Member States may provide by law for a lower age for those purposes, provided that such lower age is not below 13 years.

2. The controller shall make reasonable efforts to verify in such cases that consent is given or authorised by the holder of parental responsibility over the child, taking into consideration available technology.`,
          authorNote: `The GDPR's consent standard is the highest in the world: freely given, specific, informed, and unambiguous (from Art. 4(11)), with an easy withdrawal mechanism. Pre-ticked boxes, bundled consent, and consent conditioned on accessing a service are all invalid. The burden is on the controller to demonstrate valid consent was obtained (Art. 7(1)).

The child consent threshold of 16 (reducible to 13 by Member States) has produced a patchwork across Europe: Ireland sets 16, the UK (post-Brexit) uses 13, Germany uses 16. This fragmentation was a deliberate compromise.`,
          dpdpaCorrespondence: `DPDPA Section 5 sets out consent requirements. The standard is similar: consent must be "free, specific, informed, unconditional and unambiguous." The withdrawal mechanism (Section 5(4)) mirrors GDPR Art. 7(3). For children, DPDPA Section 9 requires "verifiable parental consent" for Data Principals below 18 years (not 16 as in GDPR) — a stricter standard. DPDP Rules 2025 Rule 10 specifies how verifiable parental consent must be obtained, using DigiLocker and authorised virtual tokens.`,
          proverb: "Consent given under pressure is no consent at all — freedom to say yes requires freedom to say no.",
        },
        {
          id: "g2-4",
          number: "Art. 9",
          articleRef: "Article 9",
          title: "Special Category Data",
          content: `Article 9 — Processing of special categories of personal data

1. Processing of personal data revealing racial or ethnic origin, political opinions, religious or philosophical beliefs, or trade union membership, and the processing of genetic data, biometric data for the purpose of uniquely identifying a natural person, data concerning health or data concerning a natural person's sex life or sexual orientation shall be prohibited.

2. Paragraph 1 shall not apply if one of the following applies:
(a) the data subject has given explicit consent to the processing of those personal data for one or more specified purposes;
(b) processing is necessary for the purposes of carrying out the obligations and exercising specific rights of the controller or of the data subject in the field of employment and social security and social protection law;
(c) processing is necessary to protect the vital interests of the data subject or of another natural person where the data subject is physically or legally incapable of giving consent;
(d) processing is carried out in the course of its legitimate activities with appropriate safeguards by a foundation, association or any other not-for-profit body with a political, philosophical, religious or trade union aim;
(e) processing relates to personal data which are manifestly made public by the data subject;
(f) processing is necessary for the establishment, exercise or defence of legal claims or whenever courts are acting in their judicial capacity;
(g) processing is necessary for reasons of substantial public interest, on the basis of Union or Member State law;
(h) processing is necessary for the purposes of preventive or occupational medicine, medical diagnosis, or the provision of health or social care or treatment;
(i) processing is necessary for reasons of public interest in the area of public health;
(j) processing is necessary for archiving purposes in the public interest, scientific or historical research purposes or statistical purposes.

3. Personal data referred to in paragraph 1 may be processed for the purposes referred to in point (h) of paragraph 2 when those data are processed by or under the responsibility of a professional subject to the obligation of professional secrecy.`,
          authorNote: `Article 9's special category data list reflects the categories most sensitive to discrimination and harm. The prohibition is categorical — special category data cannot be processed at all unless one of the ten exceptions in Art. 9(2) applies. Explicit consent (Art. 9(2)(a)) requires more than the standard consent — it must be explicit, meaning a clear affirmative statement, not just a pre-ticked box or conduct.

The inclusion of biometric and genetic data (added to the original Directive list) reflects the GDPR's awareness of emerging technologies. A retina scan or fingerprint database is now treated with the same heightened protection as health records.`,
          dpdpaCorrespondence: `DPDPA does not create a separate category of "sensitive personal data" in the Act itself — this was a significant departure from the 2019 and 2021 draft bills, which had extensive sensitive data provisions. The DPDPA delegates this to the Central Government (via Section 40 rule-making power). DPDP Rules 2025 do not yet define a sensitive data category. This is a major structural gap compared to GDPR Art. 9. However, DPDPA Section 9 imposes heightened rules for children's data, which partially mirrors GDPR's special protections for vulnerable groups.`,
          proverb: "Some things are so personal that even law must tread lightly — handle with care what cannot be undone.",
        },
      ] as GdprSection[],
    },
    {
      id: "ch3",
      number: 3,
      title: "Rights of Data Subjects",
      subtitle: "Eight rights governing access, erasure, portability and objection",
      articleRange: "Arts. 12–23",
      color: "#059669",
      sections: [
        {
          id: "g3-1",
          number: "Arts. 12–15, 20",
          articleRef: "Articles 12–15, 20",
          title: "Transparency, Access & Portability",
          content: `Article 12 — Transparent information, communication and modalities

The controller shall take appropriate measures to provide any information referred to in Articles 13 and 14 and any communication under Articles 15 to 22 and 34 relating to processing to the data subject in a concise, transparent, intelligible and easily accessible form, using clear and plain language. Information shall be provided in writing, or by other means, including, where appropriate, by electronic means. The controller shall provide information on action taken on a request under Articles 15 to 22 without undue delay and in any event within one month of receipt.

Article 13 — Information to be provided where personal data are collected from the data subject

Where personal data relating to a data subject are collected from the data subject, the controller shall provide: the identity and contact details of the controller; the contact details of the DPO where applicable; the purposes and legal basis for the processing; the recipients; any intention to transfer to third countries; the storage period; the existence of data subject rights; the right to withdraw consent; the right to lodge a complaint with a supervisory authority; and whether the provision of personal data is a statutory or contractual requirement.

Article 15 — Right of access by the data subject

The data subject shall have the right to obtain from the controller confirmation as to whether or not personal data concerning him or her are being processed, and, where that is the case, access to the personal data and the following information: purposes of processing; categories of personal data; recipients; envisaged storage period; the existence of rights to rectification, erasure, restriction and objection; the right to lodge a complaint; any available source information; existence of automated decision-making.

The controller shall provide a copy of the personal data undergoing processing. For any further copies requested by the data subject, the controller may charge a reasonable fee based on administrative costs.

Article 20 — Right to data portability

1. The data subject shall have the right to receive the personal data concerning him or her, which he or she has provided to a controller, in a structured, commonly used and machine-readable format and have the right to transmit those data to another controller without hindrance from the controller to which the personal data have been provided, where:
(a) the processing is based on consent or a contract; and
(b) the processing is carried out by automated means.

2. In exercising his or her right to data portability, the data subject shall have the right to have the personal data transmitted directly from one controller to another, where technically feasible.`,
          authorNote: `The right of access (Art. 15) is the cornerstone of data subject rights — you cannot exercise any other right without first knowing what data is held about you. The one-month response deadline has become an operational burden for large organisations receiving thousands of subject access requests (SARs). The ICO and other supervisory authorities have issued detailed guidance on what constitutes a valid SAR and when requests can be refused as "manifestly unfounded or excessive."

Data portability (Art. 20) was novel in the GDPR and directly inspired by competition policy concerns about data lock-in. It only applies to data "provided" by the data subject (not inferred data) and to consent or contract-based processing — so it does not apply to most legitimate interests processing.`,
          dpdpaCorrespondence: `DPDPA Section 11 (Right to Access) grants the right to summary of personal data, identities of all Data Fiduciaries, and a summary of processing activities. DPDPA does not have an explicit data portability right equivalent to GDPR Art. 20 — this is a notable gap. The right to access under DPDPA is also more limited than GDPR's comprehensive Art. 15 right. DPDP Rules 2025 Rule 14 provides the operational mechanism for exercising rights, requiring Data Fiduciaries to publish means of making requests on their website or app.`,
          proverb: "He who knows what is held about him holds a key to his own freedom.",
        },
        {
          id: "g3-2",
          number: "Arts. 16–19, 21",
          articleRef: "Articles 16–19, 21",
          title: "Rectification, Erasure & Restriction",
          content: `Article 16 — Right to rectification

The data subject shall have the right to obtain from the controller without undue delay the rectification of inaccurate personal data concerning him or her. Taking into account the purposes of the processing, the data subject shall have the right to have incomplete personal data completed, including by means of providing a supplementary statement.

Article 17 — Right to erasure ('right to be forgotten')

1. The data subject shall have the right to obtain from the controller the erasure of personal data concerning him or her without undue delay where one of the following grounds applies:
(a) the personal data are no longer necessary in relation to the purposes for which they were collected or otherwise processed;
(b) the data subject withdraws consent and there is no other legal ground for the processing;
(c) the data subject objects to the processing and there are no overriding legitimate grounds;
(d) the personal data have been unlawfully processed;
(e) the personal data have to be erased for compliance with a legal obligation;
(f) the personal data have been collected in relation to the offer of information society services to a child.

2. Where the controller has made the personal data public and is obliged to erase the personal data, the controller shall take reasonable steps, including technical measures, to inform controllers which are processing the personal data that the data subject has requested erasure, including links to that data.

Article 18 — Right to restriction of processing

The data subject shall have the right to obtain restriction of processing where: the accuracy of personal data is contested; the processing is unlawful and the data subject opposes erasure; the controller no longer needs the data but the data subject requires it for legal claims; or the data subject has objected to processing pending verification.

Article 21 — Right to object

The data subject shall have the right to object, on grounds relating to his or her particular situation, at any time to processing based on public task or legitimate interests, including profiling. The controller shall no longer process unless it demonstrates compelling legitimate grounds which override the data subject's interests, rights and freedoms.

Where personal data are processed for direct marketing purposes, the data subject shall have the right to object at any time to processing for such marketing, which includes profiling related to such direct marketing. Where the data subject objects to processing for direct marketing purposes, the data shall no longer be processed for such purposes.`,
          authorNote: `The "right to be forgotten" (Art. 17) originated in the Google Spain case (CJEU, 2014), where the court ordered Google to delist search results about an individual. The GDPR codified this right but it is not absolute — it must be balanced against freedom of expression, public interest in archiving, and legal claim requirements.

The right to restriction (Art. 18) is often overlooked but practically important: it allows a data subject to "freeze" processing while a dispute is resolved, without requiring full erasure. Data can be stored but not otherwise processed.`,
          dpdpaCorrespondence: `DPDPA Section 12 (Right to Correction and Erasure) corresponds to GDPR Arts. 16 and 17. Key difference: DPDPA's erasure right is primarily triggered by withdrawal of consent or when the purpose is no longer served (mirroring GDPR Art. 17(1)(a)(b)). DPDPA also has the Section 8(7) automatic erasure obligation once the purpose is served. DPDPA does not have a direct equivalent to GDPR's right to restriction (Art. 18) or the cascade notification obligation (Art. 19). The right to object to processing (GDPR Art. 21) has no direct equivalent in DPDPA — another significant gap.`,
          proverb: "The past may be recorded but need not be permanent — every person deserves a clean slate when justice demands it.",
        },
        {
          id: "g3-3",
          number: "Art. 22",
          articleRef: "Article 22",
          title: "Automated Decision-Making & Profiling",
          content: `Article 22 — Automated individual decision-making, including profiling

1. The data subject shall have the right not to be subject to a decision based solely on automated processing, including profiling, which produces legal effects concerning him or her or similarly significantly affects him or her.

2. Paragraph 1 shall not apply if the decision:
(a) is necessary for entering into, or performance of, a contract between the data subject and a data controller;
(b) is authorised by Union or Member State law to which the controller is subject and which also lays down suitable measures to safeguard the data subject's rights and freedoms and legitimate interests; or
(c) is based on the data subject's explicit consent.

3. In the cases referred to in points (a) and (c) of paragraph 2, the data controller shall implement suitable measures to safeguard the data subject's rights and freedoms and legitimate interests, at least the right to obtain human intervention on the part of the controller, to express his or her point of view and to contest the decision.

4. Decisions referred to in paragraph 2 shall not be based on special categories of personal data referred to in Article 9(1), unless point (a) or (g) of Article 9(2) applies and suitable measures to safeguard the data subject's rights and freedoms and legitimate interests are in place.`,
          authorNote: `Article 22 is the EU's foundational AI governance provision — predating the AI Act by years. The phrase "significantly affects" is deliberately broad: the EDPB has interpreted it to include decisions that affect someone's access to credit, employment, healthcare, or insurance. The right to human review (Art. 22(3)) is the key safeguard — the data subject must be able to obtain human intervention, express their view, and contest the outcome.

As generative AI systems are increasingly used in decision-making, Art. 22 is under intense scrutiny. The EDPB issued guidelines (2023) clarifying that "solely" automated means without any meaningful human review.`,
          dpdpaCorrespondence: `DPDPA does not have a provision equivalent to GDPR Art. 22. There is no right to object to automated decision-making or profiling under the current DPDPA framework. This is a significant gap, particularly given the growing use of algorithmic systems in India's digital economy. However, DPDP Rules 2025 Rule 13(3) requires Significant Data Fiduciaries to verify that algorithmic software is not likely to pose a risk to the rights of Data Principals — a nascent form of algorithmic accountability.`,
          proverb: "A machine may calculate, but only a human can truly judge — never let an algorithm be the last word on a person's fate.",
        },
        {
          id: "g3-4",
          number: "Art. 23",
          articleRef: "Article 23",
          title: "Restrictions on Rights",
          content: `Article 23 — Restrictions

1. Union or Member State law to which the data controller or processor is subject may restrict by way of a legislative measure the scope of the obligations and rights provided for in Articles 12 to 22 and Article 34, as well as Article 5 in so far as its provisions correspond to the rights and obligations provided for in Articles 12 to 22, when such a restriction respects the essence of the fundamental rights and freedoms and is a necessary and proportionate measure in a democratic society to safeguard:
(a) national security;
(b) defence;
(c) public security;
(d) the prevention, investigation, detection or prosecution of criminal offences or the execution of criminal penalties;
(e) other important objectives of general public interest of the Union or of a Member State, including an important economic or financial interest;
(f) the protection of judicial independence and judicial proceedings;
(g) prevention, investigation, detection and prosecution of breaches of ethics for regulated professions;
(h) a monitoring, inspection or regulatory function connected to the exercise of official authority;
(i) the protection of the data subject or the rights and freedoms of others;
(j) the enforcement of civil law claims.

2. In particular, any legislative measure referred to in paragraph 1 shall contain specific provisions at least as to: the purposes of the processing or categories of processing; categories of personal data; scope of the restrictions; the safeguards to prevent abuse; the specification of the controller or categories of controllers; the storage periods; and the right of data subjects to be informed about the restriction.`,
          authorNote: `Article 23 is the safety valve of GDPR's rights architecture — it allows Member States and EU law to restrict data subject rights for legitimate public interest purposes. National security exemptions under Art. 23(1)(a) have been used extensively, and have been the subject of significant litigation (including the Schrems cases regarding US surveillance programmes).

The key constraint is proportionality: restrictions must be "necessary and proportionate in a democratic society." This language mirrors the European Convention on Human Rights and allows the CJEU to scrutinise whether restrictions go too far.`,
          dpdpaCorrespondence: `DPDPA Section 17 provides exemptions from the Act, which are functionally analogous to GDPR Art. 23 restrictions. These include: national security and public order (Section 17(1)(a)), legal proceedings (Section 17(1)(b)), prevention and detection of offences (Section 17(1)(c)), and Central Government-notified research purposes (Section 17(1)(d)). The DPDPA exemptions are broader and less precisely defined than GDPR Art. 23, which requires specific legislative measures with enumerated safeguards.`,
          proverb: "Even rights have horizons — where one person's freedom ends, another's begins.",
        },
      ] as GdprSection[],
    },
    {
      id: "ch4",
      number: 4,
      title: "Controller & Processor",
      subtitle: "Accountability, security, breach notification and DPOs",
      articleRange: "Arts. 24–43",
      color: "#7C3AED",
      sections: [
        {
          id: "g4-1",
          number: "Arts. 24–25",
          articleRef: "Articles 24–25",
          title: "Responsibility & Privacy by Design",
          content: `Article 24 — Responsibility of the controller

1. Taking into account the nature, scope, context and purposes of processing as well as the risks of varying likelihood and severity for the rights and freedoms of natural persons, the controller shall implement appropriate technical and organisational measures to ensure and to be able to demonstrate that processing is performed in accordance with this Regulation. Those measures shall be reviewed and updated where necessary.

2. Where proportionate in relation to processing activities, the measures referred to in paragraph 1 shall include the implementation of appropriate data protection policies by the controller.

3. Adherence to approved codes of conduct as referred to in Article 40 or approved certification mechanisms as referred to in Article 42 may be used as an element by which to demonstrate compliance with the obligations of the controller.

Article 25 — Data protection by design and by default

1. Taking into account the state of the art, the cost of implementation and the nature, scope, context and purposes of processing as well as the risks of varying likelihood and severity for rights and freedoms of natural persons posed by the processing, the controller shall, both at the time of the determination of the means for processing and at the time of the processing itself, implement appropriate technical and organisational measures, such as pseudonymisation, which are designed to implement data-protection principles, such as data minimisation, in an effective manner and to integrate the necessary safeguards into the processing in order to meet the requirements of this Regulation and protect the rights of data subjects.

2. The controller shall implement appropriate technical and organisational measures for ensuring that, by default, only personal data which are necessary for each specific purpose of the processing are processed. That obligation applies to the amount of personal data collected, the extent of their processing, the period of their storage and their accessibility. In particular, such measures shall ensure that by default personal data are not made accessible without the individual's intervention to an indefinite number of natural persons.`,
          authorNote: `Privacy by Design (PbD) was coined by Dr. Ann Cavoukian in the 1990s and finally received its legal mandate in GDPR Art. 25. It requires data protection to be embedded into products and services from the outset — not bolted on afterwards. This transforms data protection from a compliance checkbox into an engineering requirement.

Privacy by Default is equally important: the most privacy-protective settings must be the default. A social media platform cannot pre-select "make my profile public" — privacy must be the default state. This has significant UX implications.`,
          dpdpaCorrespondence: `DPDPA Section 8(1)-(2) contains similar obligations — Data Fiduciaries must implement "appropriate technical and organisational measures" and ensure security safeguards. However, DPDPA does not explicitly codify "privacy by design" or "privacy by default" as standalone principles. DPDP Rules 2025 Rule 6 specifies minimum security safeguards including encryption, access controls, monitoring and data backups — closer to a prescriptive implementation of PbD rather than the principle itself.`,
          proverb: "Build the vault before you fill it — protection designed in costs less than protection added later.",
        },
        {
          id: "g4-2",
          number: "Art. 28",
          articleRef: "Article 28",
          title: "Data Processing Agreements",
          content: `Article 28 — Processor

1. Where processing is to be carried out on behalf of a controller, the controller shall use only processors providing sufficient guarantees to implement appropriate technical and organisational measures in such a manner that processing will meet the requirements of this Regulation and ensure the protection of the rights of the data subject.

2. The processor shall not engage another processor without prior specific or general written authorisation of the controller. In the case of general written authorisation, the processor shall inform the controller of any intended changes concerning the addition or replacement of other processors, thereby giving the controller the opportunity to object.

3. Processing by a processor shall be governed by a contract or other legal act under Union or Member State law, that is binding on the processor with regard to the controller and that sets out the subject-matter and duration of the processing, the nature and purpose of the processing, the type of personal data and categories of data subjects and the obligations and rights of the controller. That contract shall stipulate, in particular, that the processor:
(a) processes the personal data only on documented instructions from the controller;
(b) ensures that persons authorised to process the personal data have committed themselves to confidentiality;
(c) takes all measures required pursuant to Article 32 (security);
(d) respects the conditions for engaging another processor;
(e) assists the controller in ensuring compliance with data subject rights;
(f) assists the controller in ensuring compliance with Articles 32 to 36;
(g) deletes or returns all the personal data to the controller after the end of the provision of services;
(h) makes available to the controller all information necessary to demonstrate compliance and allows for audits.`,
          authorNote: `Data Processing Agreements (DPAs) are now a standard feature of every B2B contract involving personal data. The eight minimum clauses in Art. 28(3) are non-negotiable — they cannot be contracted out. In practice, the Commission has adopted standard contractual clauses (SCCs) for controller-processor relationships that satisfy Art. 28 requirements.

Sub-processing (engaging a processor's sub-contractor) requires controller authorisation. Major cloud providers (AWS, Google Cloud, Azure) publish their sub-processor lists to enable controllers to comply with this requirement. A controller who uses a non-compliant processor without a valid DPA risks being held jointly liable for breaches.`,
          dpdpaCorrespondence: `DPDPA Section 8(2) requires Data Fiduciaries to ensure Data Processors adhere to the Act's provisions, through "valid contracts." DPDP Rules 2025 Rule 6(f) requires the contract with the Data Processor to include provision for taking reasonable security safeguards. The DPDPA framework does not prescribe the eight specific DPA clauses that GDPR Art. 28(3) requires — the contract terms are left to the parties within the general obligation to comply with the Act.`,
          proverb: "Trust but verify — a handshake means little without a contract, and a contract means little without an audit.",
        },
        {
          id: "g4-3",
          number: "Art. 30",
          articleRef: "Article 30",
          title: "Records of Processing Activities",
          content: `Article 30 — Records of processing activities

1. Each controller and, where applicable, the controller's representative, shall maintain a record of processing activities under its responsibility. That record shall contain all of the following information:
(a) the name and contact details of the controller and, where applicable, the joint controller, the controller's representative and the DPO;
(b) the purposes of the processing;
(c) a description of the categories of data subjects and of the categories of personal data;
(d) the categories of recipients to whom the personal data have been or will be disclosed, including recipients in third countries or international organisations;
(e) where applicable, transfers of personal data to a third country or an international organisation, including the identification of that third country and documentation of suitable safeguards;
(f) where possible, the envisaged time limits for erasure of the different categories of data;
(g) where possible, a general description of the technical and organisational security measures referred to in Article 32(1).

2. Each processor and, where applicable, the processor's representative shall maintain a record of all categories of processing activities carried out on behalf of a controller.

3. The records referred to in paragraphs 1 and 2 shall be in writing, including in electronic form.

4. The controller or the processor shall make the record available to the supervisory authority on request.

5. The obligations referred to in paragraphs 1 and 2 shall not apply to an enterprise or an organisation employing fewer than 250 persons unless the processing it carries out is likely to result in a risk to the rights and freedoms of data subjects, the processing is not occasional, or the processing includes special categories of data.`,
          authorNote: `The Record of Processing Activities (RoPA) is the cornerstone of GDPR's accountability framework — it is the primary document regulators request during investigations. It functions as a live map of an organisation's data flows. Despite the SME exception for organisations with fewer than 250 employees, in practice most organisations maintain a RoPA because the exception has significant carve-outs.

Building and maintaining a RoPA requires input from legal, IT, HR, marketing, and every function that handles personal data. This cross-functional requirement was one of the most operationally challenging aspects of GDPR implementation in 2018.`,
          dpdpaCorrespondence: `DPDPA does not impose an explicit RoPA obligation equivalent to GDPR Art. 30. Data Fiduciaries must respond to access requests (Section 11) and maintain logs under DPDP Rules Rule 6(c) and Rule 8(3), but there is no requirement for a comprehensive, internally maintained record of all processing activities. This is a significant accountability gap compared to GDPR. DPDPA's accountability mechanism relies primarily on post-hoc inquiry by the Board rather than proactive record-keeping.`,
          proverb: "A map of your data is a map of your exposure — know your territory before others discover it for you.",
        },
        {
          id: "g4-4",
          number: "Art. 32",
          articleRef: "Article 32",
          title: "Security of Processing",
          content: `Article 32 — Security of processing

1. Taking into account the state of the art, the costs of implementation and the nature, scope, context and purposes of processing as well as the risk of varying likelihood and severity for the rights and freedoms of natural persons, the controller and the processor shall implement appropriate technical and organisational measures to ensure a level of security appropriate to the risk, including inter alia as appropriate:
(a) the pseudonymisation and encryption of personal data;
(b) the ability to ensure the ongoing confidentiality, integrity, availability and resilience of processing systems and services;
(c) the ability to restore the availability and access to personal data in a timely manner in the event of a physical or technical incident;
(d) a process for regularly testing, assessing and evaluating the effectiveness of technical and organisational measures for ensuring the security of the processing.

2. In assessing the appropriate level of security account shall be taken in particular of the risks that are presented by processing, in particular from accidental or unlawful destruction, loss, alteration, unauthorised disclosure of, or access to personal data transmitted, stored or otherwise processed.

3. Adherence to an approved code of conduct as referred to in Article 40 or an approved certification mechanism as referred to in Article 42 may be used as an element by which to demonstrate compliance with the requirements set out in paragraph 1 of this Article.

4. The controller and processor shall take steps to ensure that any natural person acting under the authority of the controller or of the processor who has access to personal data does not process them except on instructions from the controller, unless required to do so by Union or Member State law.`,
          authorNote: `Article 32's risk-based approach to security is deliberately technology-neutral. The GDPR does not mandate specific security standards — it requires a "level of security appropriate to the risk." This requires controllers to conduct a risk assessment and select proportionate controls. ISO 27001, NIST Cybersecurity Framework, and SOC 2 are commonly used frameworks to demonstrate compliance.

The four specific measures in Art. 32(1) are listed as examples ("inter alia as appropriate"), not exhaustive requirements. Pseudonymisation and encryption are mentioned because they are specifically referenced elsewhere in the GDPR as risk-reducing measures (e.g., Art. 34(3) breach notification exception).`,
          dpdpaCorrespondence: `DPDPA Section 8(5) requires reasonable security safeguards. DPDP Rules 2025 Rule 6 is the most detailed provision: it mandates encryption, obfuscation, masking or virtual tokens; access controls on computer resources; visibility through logs and monitoring; data backups for continued processing; one-year log retention; and contractual security requirements on Data Processors. Rule 6 is more prescriptive than GDPR Art. 32 — it specifies particular measures rather than leaving it to a risk-based assessment.`,
          proverb: "Security is not a product you buy but a practice you maintain — the lock on the door means nothing if left open.",
        },
        {
          id: "g4-5",
          number: "Arts. 33–34",
          articleRef: "Articles 33–34",
          title: "Breach Notification — 72 Hours",
          content: `Article 33 — Notification of a personal data breach to the supervisory authority

1. In the case of a personal data breach, the controller shall without undue delay and, where feasible, not later than 72 hours after having become aware of it, notify the personal data breach to the supervisory authority competent in accordance with Article 55, unless the personal data breach is unlikely to result in a risk to the rights and freedoms of natural persons. Where the notification to the supervisory authority is not made within 72 hours, it shall be accompanied by reasons for the delay.

2. The processor shall notify the controller without undue delay after becoming aware of a personal data breach.

3. The notification to the supervisory authority shall at least:
(a) describe the nature of the personal data breach including where possible, the categories and approximate number of data subjects concerned and the categories and approximate number of personal data records concerned;
(b) communicate the name and contact details of the data protection officer or other contact point;
(c) describe the likely consequences of the personal data breach;
(d) describe the measures taken or proposed to be taken by the controller to address the personal data breach.

Article 34 — Communication of a personal data breach to the data subject

1. When the personal data breach is likely to result in a high risk to the rights and freedoms of natural persons, the controller shall communicate the personal data breach to the data subject without undue delay.

2. The communication to the data subject shall describe in clear and plain language the nature of the personal data breach and contain at least the information and measures referred to in points (b), (c) and (d) of Article 33(3).

3. The communication to the data subject shall not be required if: (a) the controller has implemented appropriate technical and organisational protection measures (e.g. encryption) that render the personal data unintelligible; (b) the controller has taken subsequent measures to ensure high risk is no longer likely to materialise; or (c) it would involve disproportionate effort.`,
          authorNote: `The 72-hour breach notification window is one of GDPR's most operationally demanding requirements. In practice, organisations rarely have full information within 72 hours — the notification can be made with available information and supplemented later (Art. 33(4)). What matters is notifying promptly after becoming "aware" — the moment of awareness, not the moment of breach, starts the clock.

The dual notification requirement (to regulator AND data subjects) reflects GDPR's dual purpose: enabling supervisory oversight and ensuring individuals can take protective action (changing passwords, monitoring accounts). Fines for delayed breach notification have been substantial — British Airways (£20M), Marriott (£18.4M).`,
          dpdpaCorrespondence: `DPDPA Section 8(6) requires breach notification to the Board and affected Data Principals. DPDP Rules 2025 Rule 7 implements this: notification to Data Principals must be made "without delay" with detailed breach information; notification to the Board must be made without delay initially, with a full report within 72 hours. The 72-hour timeline matches GDPR exactly. However, DPDPA's Rule 7 requires more granular information to the Board (including findings about the person who caused the breach and remedial measures) than GDPR Art. 33(3).`,
          proverb: "A breach hidden is a wound untreated — speak quickly when data is compromised, for silence compounds the harm.",
        },
        {
          id: "g4-6",
          number: "Art. 35",
          articleRef: "Article 35",
          title: "Data Protection Impact Assessment",
          content: `Article 35 — Data protection impact assessment

1. Where a type of processing in particular using new technologies, and taking into account the nature, scope, context and purposes of the processing, is likely to result in a high risk to the rights and freedoms of natural persons, the controller shall, prior to the processing, carry out an assessment of the impact of the envisaged processing operations on the protection of personal data. A single assessment may address a set of similar processing operations that present similar high risks.

2. The controller shall seek the advice of the data protection officer, where designated, when carrying out a data protection impact assessment.

3. A data protection impact assessment referred to in paragraph 1 shall in particular be required in the case of:
(a) a systematic and extensive evaluation of personal aspects relating to natural persons which is based on automated processing, including profiling, and on which decisions are based that produce legal effects;
(b) processing on a large scale of special categories of data referred to in Article 9(1) or data relating to criminal convictions and offences;
(c) a systematic monitoring of a publicly accessible area on a large scale.

4. The supervisory authority shall establish and make public a list of the kind of processing operations which are subject to the requirement for a data protection impact assessment.

A DPIA must contain at least:
— a systematic description of the envisaged processing operations and the purposes of the processing;
— an assessment of the necessity and proportionality of the processing;
— an assessment of the risks to the rights and freedoms of data subjects;
— the measures envisaged to address the risks, including safeguards, security measures and mechanisms to ensure the protection of personal data.`,
          authorNote: `The DPIA (Data Protection Impact Assessment) is GDPR's primary risk management tool. It must be conducted before high-risk processing begins — it is a prior check, not a retrospective review. If a DPIA reveals a high residual risk that cannot be mitigated, the controller must consult the supervisory authority before proceeding (Art. 36 — prior consultation).

Each supervisory authority publishes a list of processing operations requiring DPIAs (mandatory list) and sometimes also a list of operations not requiring one. In practice, DPIAs are now required for: AI facial recognition systems, large-scale employee monitoring, behavioural advertising platforms, health data processing, and smart city surveillance.`,
          dpdpaCorrespondence: `DPDPA Section 10(3)(c) requires Significant Data Fiduciaries (SDFs) to undertake a "Data Protection Impact Assessment" once every 12 months. DPDP Rules 2025 Rule 13(1) implements this: an annual DPIA plus audit. However, unlike GDPR which requires DPIAs for any high-risk processing by any controller, DPDPA limits the DPIA obligation to SDFs only. Regular Data Fiduciaries are not required to conduct DPIAs — a significant narrowing of the accountability obligation.`,
          proverb: "Before you open a new door, know what lies behind it — assess the risk before you accept it.",
        },
        {
          id: "g4-7",
          number: "Arts. 37–39",
          articleRef: "Articles 37–39",
          title: "Data Protection Officer",
          content: `Article 37 — Designation of the data protection officer

1. The controller and the processor shall designate a data protection officer in any case where:
(a) the processing is carried out by a public authority or body, except for courts acting in their judicial capacity;
(b) the core activities of the controller or the processor consist of processing operations which, by virtue of their nature, their scope and/or their purposes, require regular and systematic monitoring of data subjects on a large scale; or
(c) the core activities of the controller or the processor consist of processing on a large scale of special categories of data pursuant to Article 9 or personal data relating to criminal convictions and offences referred to in Article 10.

5. The data protection officer shall be designated on the basis of professional qualities and, in particular, expert knowledge of data protection law and practices and the ability to fulfil the tasks referred to in Article 39.

Article 38 — Position of the data protection officer

1. The controller and the processor shall ensure that the data protection officer is involved, properly and in a timely manner, in all issues which relate to the protection of personal data.

3. The controller and processor shall ensure that the data protection officer does not receive any instructions regarding the exercise of those tasks. He or she shall not be dismissed or penalised by the controller or the processor for performing his tasks. The data protection officer shall directly report to the highest management level.

Article 39 — Tasks of the data protection officer

1. The data protection officer shall have at least the following tasks:
(a) inform and advise the controller or the processor and the employees who carry out processing of their obligations pursuant to this Regulation;
(b) monitor compliance with this Regulation, with other Union data protection provisions and with the policies of the controller or processor;
(c) provide advice as regards the data protection impact assessment and monitor its performance;
(d) cooperate with the supervisory authority;
(e) act as the contact point for the supervisory authority on issues relating to processing.`,
          authorNote: `The DPO is the only role explicitly mandated by the GDPR. The independence requirements (Art. 38(3)) are critical: the DPO cannot be dismissed for performing DPO duties, must report to the highest management level, and cannot be instructed on how to perform tasks. In practice, this creates tensions with corporate governance — DPOs often have to escalate directly to boards or audit committees.

The DPO can be an employee or an external service provider (Art. 37(6)). Many SMEs use external DPO services. The DPO is a personal contact point for data subjects and supervisory authorities — their contact details must be published and communicated to the supervisory authority (Art. 37(7)).`,
          dpdpaCorrespondence: `DPDPA Section 10(2)(b) requires Significant Data Fiduciaries to appoint a Data Protection Officer based in India. Regular Data Fiduciaries are not required to appoint a DPO — they must only publish contact information (DPDP Rules Rule 9). This is a significant narrowing compared to GDPR, which requires DPOs for any large-scale systematic monitoring, not just SDFs. The DPDPA DPO's role and independence requirements are less detailed than GDPR Arts. 38-39; the Rules do not specify DPO qualifications, independence, or tasks in detail.`,
          proverb: "The guardian of privacy must be free to speak the truth — independence is not a privilege but the prerequisite of the role.",
        },
      ] as GdprSection[],
    },
    {
      id: "ch5",
      number: 5,
      title: "International Transfers",
      subtitle: "Adequacy decisions, SCCs and binding corporate rules",
      articleRange: "Arts. 44–50",
      color: "#06B6D4",
      sections: [
        {
          id: "g5-1",
          number: "Art. 45",
          articleRef: "Article 45",
          title: "Adequacy Decisions",
          content: `Article 44 — General principle for transfers

Any transfer of personal data which are undergoing processing or are intended for processing after transfer to a third country or to an international organisation shall take place only if the conditions laid down in this Chapter are complied with by the controller and processor. All provisions in this Chapter shall be applied in order to ensure that the level of protection of natural persons guaranteed by this Regulation is not undermined.

Article 45 — Transfers on the basis of an adequacy decision

1. A transfer of personal data to a third country or an international organisation may take place where the Commission has decided that the third country, a territory or one or more specified sectors within that third country, or the international organisation in question ensures an adequate level of protection. Such a transfer shall not require any specific authorisation.

2. When assessing the adequacy of the level of protection, the Commission shall, in particular, take account of the following elements:
(a) the rule of law, respect for human rights and fundamental freedoms, relevant legislation, both general and sectoral, including concerning public security, defence, national security and criminal law, the effective and enforceable data subject rights and effective administrative and judicial redress;
(b) the existence and effective functioning of one or more independent supervisory authorities;
(c) the international commitments the third country or international organisation has entered into.

3. The Commission may decide that a third country ensures an adequate level of protection. The implementing act shall provide for a mechanism for periodic review, at least every four years.

Countries with adequacy decisions (as of 2025): Andorra, Argentina, Canada (commercial), Faroe Islands, Guernsey, Isle of Man, Israel, Japan, Jersey, New Zealand, Republic of Korea, Switzerland, United Kingdom, Uruguay, USA (under EU-US Data Privacy Framework).`,
          authorNote: `Adequacy is the gold standard for international transfers — once granted, data can flow freely without any additional safeguards. The process of obtaining an adequacy decision requires the European Commission to assess the third country's legal framework, enforce individual rights mechanisms, and independent supervisory authority.

The Schrems II judgment (CJEU, 2020) invalidated the EU-US Privacy Shield adequacy decision, citing US bulk surveillance powers as incompatible with fundamental rights. The EU-US Data Privacy Framework (adopted July 2023) is the current arrangement but faces a legal challenge from Max Schrems before the CJEU. India is not yet the subject of an adequacy decision — this is relevant for any company transferring data between India and the EU.`,
          dpdpaCorrespondence: `DPDPA Section 16 (Transfer of personal data outside India) takes a government-whitelist approach rather than an adequacy framework. The Central Government may restrict transfers to specific countries or impose conditions. DPDP Rules Rule 15 provides that Data Fiduciaries may transfer personal data outside India subject to Central Government orders specifying requirements. This is a fundamentally different architecture from GDPR's adequacy system — DPDPA relies on executive orders rather than an independent regulatory adequacy assessment.`,
          proverb: "A passport grants entry, but only trust grants permanence — adequacy must be earned and continuously maintained.",
        },
        {
          id: "g5-2",
          number: "Art. 46",
          articleRef: "Article 46",
          title: "Appropriate Safeguards & SCCs",
          content: `Article 46 — Transfers subject to appropriate safeguards

1. In the absence of a decision pursuant to Article 45(3), a controller or processor may transfer personal data to a third country or an international organisation only if the controller or processor has provided appropriate safeguards, and on condition that enforceable data subject rights and effective legal remedies for data subjects are available.

2. The appropriate safeguards referred to in paragraph 1 may be provided for, without requiring any specific authorisation from a supervisory authority, by:
(a) a legally binding and enforceable instrument between public authorities or bodies;
(b) binding corporate rules in accordance with Article 47;
(c) standard data protection clauses adopted by the Commission in accordance with the examination procedure;
(d) standard data protection clauses adopted by a supervisory authority and approved by the Commission;
(e) an approved code of conduct pursuant to Article 40 together with binding and enforceable commitments of the controller or processor in the third country;
(f) an approved certification mechanism pursuant to Article 42 together with binding and enforceable commitments of the controller or processor in the third country.

Standard Contractual Clauses (SCCs) are the most widely used transfer mechanism globally. The European Commission updated the SCCs in June 2021 (implementing Decision 2021/914) to include: controller-to-controller, controller-to-processor, processor-to-controller, and processor-to-processor transfer scenarios. Post-Schrems II, parties must also complete a Transfer Impact Assessment (TIA) to verify that SCCs provide effective protection in the destination country.`,
          authorNote: `Standard Contractual Clauses (SCCs) are the workhorse of international data transfers. Following Schrems II, every SCC-based transfer requires a Transfer Impact Assessment (TIA) — an assessment of whether the law of the destination country undermines the protection afforded by SCCs (particularly regarding government access to data). This has created significant operational complexity, particularly for transfers to the US, China, and Russia.

The 2021 SCCs introduced a modular structure, replacing the older 2001 and 2010 clauses. They must be signed in full — parties cannot cherry-pick clauses or add terms that contradict the SCCs.`,
          dpdpaCorrespondence: `DPDPA does not have an equivalent to SCCs as a transfer mechanism. Under Section 16, transfers are permitted to countries not restricted by the Central Government. There is no mechanism for using contractual clauses to validate transfers to restricted countries (unlike GDPR Art. 46). India's approach is more permissive in some respects (blanket permission unless restricted) but lacks the structured contractual protection framework that GDPR's SCC system provides.`,
          proverb: "A contract is only as strong as the law that stands behind it — know the ground on which you build your promises.",
        },
        {
          id: "g5-3",
          number: "Art. 47",
          articleRef: "Article 47",
          title: "Binding Corporate Rules",
          content: `Article 47 — Binding corporate rules

1. The competent supervisory authority shall approve binding corporate rules in accordance with the consistency mechanism set out in Article 63, provided that they:
(a) are legally binding and apply to and are enforced by every member concerned of the group of undertakings, or group of enterprises engaged in a joint economic activity, including their employees;
(b) expressly confer enforceable rights on data subjects with regard to the processing of their personal data; and
(c) fulfil the requirements laid down in paragraph 2.

2. The binding corporate rules shall specify at least:
(a) the structure and contact details of the group of undertakings and each of its members;
(b) the data transfers or set of transfers, including the categories of personal data, the type of processing and its purposes, the type of data subjects affected and the identification of the third country or countries;
(c) their legally binding nature, both internally and externally;
(d) the application of the general data protection principles, in particular purpose limitation, data minimisation, limited storage periods, data quality, data protection by design and by default, legal basis for processing, processing of special categories of personal data, measures to ensure data security, and the requirements in respect of onward transfers;
(e) the rights of data subjects in regard to processing and the means to exercise those rights, including the right to object to profiling, the right to lodge a complaint with the competent supervisory authority and before the competent courts, and to obtain redress and compensation;
(f) the acceptance by the controller or processor established on the territory of a Member State of liability for any breaches of the binding corporate rules by any member concerned not established in the Union.`,
          authorNote: `Binding Corporate Rules (BCRs) are the premium intra-group transfer mechanism — approved directly by a supervisory authority (in coordination with other SAs via the consistency mechanism). They are expensive and time-consuming to obtain (typically 2-3 years), but once approved, they enable free data flows within a multinational group without per-transfer documentation.

BCRs must be updated when the group structure changes. Lead supervisory authorities (typically the SA in the country of the group's EU headquarters) maintain a register of approved BCRs. As of 2025, fewer than 200 organisations globally have approved BCRs — the SCC route is far more common.`,
          dpdpaCorrespondence: `DPDPA has no equivalent to BCRs. There is no mechanism for corporate groups to seek a blanket approval for intra-group transfers. Each transfer from India must comply with Section 16 restrictions, and there is no special treatment for related entities within a corporate group. This is a gap for multinational companies with operations in India that have established BCRs for their EU operations.`,
          proverb: "A group that shares values must share rules — binding commitments within a family of companies are the price of trust.",
        },
        {
          id: "g5-4",
          number: "Art. 49",
          articleRef: "Article 49",
          title: "Derogations for Specific Situations",
          content: `Article 49 — Derogations for specific situations

1. In the absence of an adequacy decision pursuant to Article 45(3), or of appropriate safeguards pursuant to Article 46, including binding corporate rules, a transfer or a set of transfers of personal data to a third country or an international organisation shall take place only on one of the following conditions:
(a) the data subject has explicitly consented to the proposed transfer, after having been informed of the possible risks of such transfers for the data subject due to the absence of an adequacy decision and appropriate safeguards;
(b) the transfer is necessary for the performance of a contract between the data subject and the controller or the implementation of pre-contractual measures taken at the request of the data subject;
(c) the transfer is necessary for the conclusion or performance of a contract concluded in the interest of the data subject between the controller and another natural or legal person;
(d) the transfer is necessary for important reasons of public interest;
(e) the transfer is necessary for the establishment, exercise or defence of legal claims;
(f) the transfer is necessary in order to protect the vital interests of the data subject or of other persons, where the data subject is physically or legally incapable of giving consent;
(g) the transfer is made from a register which according to Union or Member State law is intended to provide information to the public.

2. A transfer pursuant to point (g) of paragraph 1 shall not involve the entirety of the personal data or entire categories of the personal data contained in the register. Where the register is intended for consultation by persons having a legitimate interest, the transfer shall be made only at the request of those persons or if they are to be the recipients.`,
          authorNote: `The Art. 49 derogations are last-resort mechanisms — the EDPB has consistently emphasised that they cannot be used systematically for repeated or structural transfers. They are genuinely exceptional. Explicit consent for transfers (Art. 49(1)(a)) is particularly demanding: the data subject must be specifically informed of the risks of the transfer (absence of adequacy and safeguards) — standard privacy policy language is insufficient.

Derogations for contract performance (Art. 49(1)(b)(c)) must be genuinely necessary for the contract — using them as a general basis for cloud storage or international data flows is not permitted.`,
          dpdpaCorrespondence: `DPDPA Section 16 does not enumerate specific derogations equivalent to GDPR Art. 49. Transfers are permitted unless restricted by Central Government order, and the Rules may impose requirements. There is no explicit consent-based derogation for international transfers in DPDPA — consent given for processing generally may not double as consent to international transfer. This structural difference means the GDPR's nuanced transfer regime has no direct parallel in DPDPA.`,
          proverb: "Exceptions are doors, not highways — use them only when the main road is truly closed.",
        },
      ] as GdprSection[],
    },
    {
      id: "ch6",
      number: 6,
      title: "Supervisory Authorities",
      subtitle: "Independence, establishment and powers of national DPAs",
      articleRange: "Arts. 51–59",
      color: "#F59E0B",
      sections: [
        {
          id: "g6-1",
          number: "Arts. 51–54",
          articleRef: "Articles 51–54",
          title: "Independence Requirements",
          content: `Article 51 — Supervisory authority

1. Each Member State shall provide for one or more independent public authorities to be responsible for monitoring the application of this Regulation, in order to protect the fundamental rights and freedoms of natural persons in relation to processing and to facilitate the free flow of personal data within the Union ('supervisory authority').

2. Each supervisory authority shall contribute to the consistent application of this Regulation throughout the Union. For that purpose, the supervisory authorities shall cooperate with each other and the Commission in accordance with Chapter VII.

Article 52 — Independence

1. Each supervisory authority shall act with complete independence in performing its tasks and exercising its powers in accordance with this Regulation.

2. The member or members of each supervisory authority shall, in the performance of their tasks and exercise of their powers in accordance with this Regulation, remain free from external influence, whether direct or indirect, and shall neither seek nor take instructions from anybody.

3. Member or members of each supervisory authority shall refrain from any action incompatible with their duties and shall not, during their term of office, engage in any incompatible occupation, whether gainful or not.

Article 53 — General conditions for the members of the supervisory authority

1. Member States shall provide for each member of their supervisory authorities to be appointed by means of a transparent procedure by: their parliament; their government; their head of State; or an independent body entrusted with the appointment under Member State law.

2. Each member shall have the qualifications, experience and skills, in particular in the area of the protection of personal data, required to perform its duties.

4. A member shall be dismissed only in cases of serious misconduct or if the member no longer fulfils the conditions required for the performance of the duties.

Article 54 — Rules on the establishment of the supervisory authority

Each Member State shall provide by law for: (a) the establishment of each supervisory authority; (b) qualifications and eligibility conditions; (c) rules and procedures for appointment; (d) duration of term of no less than four years; (e) reappointment terms; (f) conditions governing obligations and prohibitions on actions, occupations and benefits incompatible with the role.`,
          authorNote: `Supervisory authority independence is constitutionally significant — the CJEU has ruled that the independence requirement is so fundamental that it applies even in areas outside the GDPR's scope (Commission v. Austria). The requirement that members cannot be dismissed except for serious misconduct (Art. 53(4)) is the key guarantee — it protects SAs from political pressure.

In practice, EU data protection authorities range enormously in size and resources: the Irish DPC (which supervises most major US tech companies' EU operations due to their Irish establishments) has grown from 26 staff in 2018 to over 250 by 2025. The CNIL (France) and BfDI (Germany) are among the most active enforcement authorities.`,
          dpdpaCorrespondence: `DPDPA establishes the Data Protection Board of India (DPBI) under Chapter V (Sections 18-27). The Board is similar to a supervisory authority but differs in key respects: Board members are appointed by the Central Government based on a Search-cum-Selection Committee recommendation (DPDP Rules Rule 17), with the Cabinet Secretary chairing the selection committee. This raises questions about independence from the executive. GDPR requires appointment by parliament, government, head of state, or independent body — the DPDPA's framework gives the Central Government a dominant role.`,
          proverb: "A watchman paid by the watched is no watchman at all — independence is the bedrock of legitimate oversight.",
        },
        {
          id: "g6-2",
          number: "Arts. 57–58",
          articleRef: "Articles 57–58",
          title: "Powers of Supervisory Authorities",
          content: `Article 57 — Tasks of the supervisory authority

1. Without prejudice to other tasks set out under this Regulation, each supervisory authority shall on its territory:
(a) monitor and enforce the application of this Regulation;
(b) promote public awareness and understanding of the risks, rules, safeguards and rights in relation to processing;
(c) advise the national parliament, the government, and other institutions and bodies on legislative and administrative measures relating to the protection of natural persons' rights and freedoms with regard to processing;
(d) promote the awareness of controllers and processors of their obligations under this Regulation;
(e) upon request, provide information to any data subject concerning the exercise of his or her rights and, if appropriate, cooperate with the supervisory authorities in other Member States;
(f) handle complaints lodged by a data subject or by a body, organisation or association, and investigate, to the extent appropriate, the subject matter of the complaint and inform the complainant of the progress and the outcome within a reasonable period;
(g) cooperate with, including sharing information and provide mutual assistance to, other supervisory authorities.

Article 58 — Powers of the supervisory authority

1. Investigative powers include: access to personal data, access to premises, obtaining copies of documents.

2. Corrective powers include:
(a) to issue warnings;
(b) to issue reprimands;
(c) to order the controller or the processor to comply with the data subject's requests;
(d) to order the controller or processor to bring processing operations into compliance;
(e) to order the controller to communicate a personal data breach to the data subject;
(f) to impose a temporary or definitive limitation including a ban on processing;
(g) to order the rectification, restriction or erasure of personal data;
(h) to withdraw a certification;
(i) to impose an administrative fine pursuant to Article 83;
(j) to order the suspension of data flows to a recipient in a third country.`,
          authorNote: `Article 58's corrective powers represent the EU regulator's full enforcement toolkit — from advisory warnings to complete processing bans and nine-figure fines. The ordering power (Art. 58(2)(d)) to require compliance is separate from the fining power — often used alongside fines to ensure future compliance, not just punish past violations.

The most significant power is arguably Art. 58(2)(f) — the power to ban processing entirely. This was used by the Irish DPC against Meta's transatlantic data transfers and by the Italian DPA (Garante) against OpenAI's ChatGPT service (temporarily, in April 2023). A processing ban can be existential for a data-driven business.`,
          dpdpaCorrespondence: `The Data Protection Board of India has broadly analogous powers under DPDPA Sections 24-27: it can inquire into complaints, direct compliance, impose monetary penalties (up to ₹250 crore per instance, up to ₹500 crore for persistent breaches), and issue directions. Unlike GDPR, the DPBI cannot ban processing — it can impose penalties and direct remediation but has no direct equivalent to the GDPR's processing ban power. The Board's inquiry procedure is governed by DPDP Rules Rule 19.`,
          proverb: "A regulator without teeth is a scarecrow — the power to enforce is what gives the rules their meaning.",
        },
      ] as GdprSection[],
    },
    {
      id: "ch7",
      number: 7,
      title: "Cooperation & Consistency",
      subtitle: "One-stop-shop, EDPB and cross-border enforcement",
      articleRange: "Arts. 60–76",
      color: "#3B82F6",
      sections: [
        {
          id: "g7-1",
          number: "Art. 56",
          articleRef: "Article 56",
          title: "One-Stop-Shop Mechanism",
          content: `Article 56 — Competence of the lead supervisory authority

1. Without prejudice to Article 55, the supervisory authority of the main establishment or of the single establishment of the controller or processor shall be competent to act as lead supervisory authority for the cross-border processing carried out by that controller or processor in accordance with the procedure provided in Article 60.

2. By derogation from paragraph 1, each supervisory authority shall be competent to handle a complaint lodged with it or a possible infringement of this Regulation, if the subject matter relates only to an establishment in its Member State or substantially affects data subjects only in its Member State.

3. In the cases referred to in paragraph 2 of this Article, the supervisory authority shall inform the lead supervisory authority without delay on that matter. Within a period of three weeks after being informed, the lead supervisory authority shall decide whether or not it will handle the case in accordance with the procedure provided in Article 60, taking into account whether or not there is an establishment of the controller or processor in the Member State of the supervisory authority that informed it.

Article 60 — Cooperation between the lead supervisory authority and the other supervisory authorities concerned

The lead supervisory authority shall cooperate with the other supervisory authorities concerned in accordance with this Article in an endeavour to reach consensus. The lead supervisory authority and the supervisory authorities concerned shall exchange all relevant information with each other.`,
          authorNote: `The "one-stop-shop" (OSS) mechanism is both the GDPR's most innovative procedural device and its most criticised. The idea is elegant: a multinational company with its main EU establishment in Ireland (as Meta, Google, Apple, and many US tech companies chose) deals with a single regulator — the Irish DPC — rather than 27 national authorities. This reduces regulatory fragmentation.

The criticism is that it created enforcement bottlenecks. Ireland became the de facto EU tech regulator, managing hundreds of cross-border cases. The Irish DPC was seen as slow — a perception that led to the GDPR's 2022 enforcement mechanism reforms and increasing Article 65 dispute resolutions, where the EDPB issues binding decisions overriding the lead SA.`,
          dpdpaCorrespondence: `India's single-jurisdiction framework means there is no equivalent to the one-stop-shop: there is one Data Protection Board for all of India, and no cross-border cooperation framework analogous to the GDPR's Chapter VII. For multinational companies operating in both India and the EU, this means managing two separate regulatory relationships — the Irish DPC (or relevant EU lead SA) and India's DPBI — with no formal coordination mechanism between them.`,
          proverb: "One door, one judge — clarity in authority prevents the chaos of competing voices.",
        },
        {
          id: "g7-2",
          number: "Arts. 68–76",
          articleRef: "Articles 68–76",
          title: "European Data Protection Board",
          content: `Article 68 — European Data Protection Board

1. The European Data Protection Board ('the Board') is hereby established as a body of the Union and shall have legal personality.

2. The Board shall be represented by its Chair.

3. The Board shall be composed of the head of one supervisory authority of each Member State and of the European Data Protection Supervisor, or their respective representatives.

4. Where in a Member State more than one supervisory authority is responsible for monitoring the application of the provisions pursuant to this Regulation, a joint representative shall be appointed in accordance with that Member State's law.

5. The Commission shall have the right to participate in the activities and meetings of the Board without voting right. The Commission shall designate a representative.

Article 70 — Tasks of the Board

1. The Board shall ensure the consistent application of this Regulation. To that end, the Board shall, on its own initiative or, where relevant, at the request of the Commission, in particular:
(a) monitor and ensure the correct application of this Regulation in the cases provided for in Articles 64 and 65;
(b) advise the Commission on any issue related to the protection of personal data in the Union, including any proposed amendment of this Regulation;
(c) advise the Commission on the format and procedures for the exchange of information between controllers, processors and supervisory authorities;
(d) issue guidelines, recommendations and best practices on procedures for erasing links, copies or replications of personal data from publicly available communications services;
(e) examine, on its own initiative, on request of one of its members or on request of the Commission, any question covering the application of this Regulation and issue guidelines, recommendations and best practices in order to encourage consistent application.`,
          authorNote: `The EDPB is the EU's apex data protection governance body — it issues binding decisions in disputes between national SAs and publishes authoritative guidelines that shape GDPR interpretation globally. Its guidelines (on consent, legitimate interests, data portability, breach notification, DPIAs, and dozens of other topics) are treated as quasi-binding by companies even where technically advisory.

The EDPB's binding decisions under Art. 65 (dispute resolution) have been used to force the Irish DPC to impose larger fines on Meta than the DPC had initially proposed — a reflection of the tension between the one-stop-shop mechanism and other Member States' interests.`,
          dpdpaCorrespondence: `India has no equivalent to the EDPB — there is a single Data Protection Board with no supranational coordination body. India does participate in the Global Privacy Assembly (GPA) and has bilateral relationships with data protection authorities in other countries, but there is no formal binding cooperation framework. As DPDPA implementation progresses, the DPBI may develop memoranda of understanding with foreign DPAs, but this is at an early stage.`,
          proverb: "When many speak, one must harmonise — consistency across borders requires a voice that rises above the individual.",
        },
      ] as GdprSection[],
    },
    {
      id: "ch8",
      number: 8,
      title: "Remedies, Liability & Penalties",
      subtitle: "Complaints, compensation and administrative fines up to €20M / 4% turnover",
      articleRange: "Arts. 77–84",
      color: "#EF4444",
      sections: [
        {
          id: "g8-1",
          number: "Art. 77",
          articleRef: "Article 77",
          title: "Right to Lodge a Complaint",
          content: `Article 77 — Right to lodge a complaint with a supervisory authority

1. Without prejudice to any other administrative or judicial remedy, every data subject shall have the right to lodge a complaint with a supervisory authority, in particular in the Member State of his or her habitual residence, place of work or place of the alleged infringement if the data subject considers that the processing of personal data relating to him or her infringes this Regulation.

2. The supervisory authority with which the complaint has been lodged shall inform the complainant on the progress and the outcome of the complaint including the possibility of a judicial remedy pursuant to Article 78.

Article 78 — Right to an effective judicial remedy against a supervisory authority

1. Without prejudice to any other administrative or non-judicial remedy, each natural or legal person shall have the right to an effective judicial remedy against a legally binding decision of a supervisory authority concerning them.

2. Without prejudice to any other administrative or non-judicial remedy, each data subject shall have the right to a judicial remedy where the supervisory authority which is competent pursuant to Articles 55 and 56 does not handle a complaint or does not inform the data subject within three months on the progress or outcome of the complaint.

Article 79 — Right to an effective judicial remedy against a controller or processor

1. Without prejudice to any available administrative or non-judicial remedy, including the right to lodge a complaint with a supervisory authority pursuant to Article 77, each data subject shall have the right to an effective judicial remedy where he or she considers that his or her rights under this Regulation have been infringed as a result of the processing of his or her personal data in non-compliance with this Regulation.`,
          authorNote: `The right to lodge a complaint with a supervisory authority is a fundamental feature of GDPR enforcement — it means any individual anywhere in the EU can trigger an investigation into any controller by simply filing a complaint. This "private enforcement" mechanism has been used extensively by privacy advocacy groups: NOYB (Max Schrems' organisation) has filed over 1,000 coordinated complaints across EU Member States since 2018.

The right to an effective judicial remedy (Art. 78-79) creates a parallel enforcement track alongside SA enforcement — data subjects can sue controllers directly in court without going through the SA first. This enables class-action style litigation, which is increasingly being used against large tech companies.`,
          dpdpaCorrespondence: `DPDPA Section 13 (Right to Grievance Redressal) provides that Data Principals may make complaints to Data Fiduciaries first (internal redress), and then to the Data Protection Board if unsatisfied. DPDP Rules Rule 14(3) requires 90-day grievance redressal timelines. There is no direct judicial remedy against a controller under DPDPA — the Board is the primary enforcement body. This is a significant difference: GDPR allows direct litigation against controllers in civil courts, while DPDPA routes all enforcement through the Board's administrative process.`,
          proverb: "The right to complain is the right to be heard — an effective remedy is the measure of a law's sincerity.",
        },
        {
          id: "g8-2",
          number: "Art. 82",
          articleRef: "Article 82",
          title: "Right to Compensation",
          content: `Article 82 — Right to compensation and liability

1. Any person who has suffered material or non-material damage as a result of an infringement of this Regulation shall have the right to receive compensation from the controller or processor for the damage suffered.

2. Any controller involved in processing shall be liable for the damage caused by processing which infringes this Regulation. A processor shall be liable for the damage caused by processing only where it has not complied with obligations of this Regulation specifically directed to processors or where it has acted outside or contrary to lawful instructions of the controller.

3. A controller or processor shall be exempt from liability under paragraph 2 if it proves that it is not in any way responsible for the event giving rise to the damage.

4. Where more than one controller or processor, or both a controller and a processor, are involved in the same processing and where they are responsible for any damage caused by processing, each controller or processor shall be held liable for the entire damage in order to ensure effective compensation of the data subject.

5. Where a controller or processor has, in accordance with paragraph 4, paid full compensation for the damage suffered, that controller or processor shall be entitled to claim back from the other controllers or processors involved in the same processing that part of the compensation corresponding to their part of responsibility for the damage.

6. Court proceedings for exercising the right to receive compensation shall be brought before the courts competent under the law of the Member State referred to in Article 79(2).`,
          authorNote: `Article 82's compensation right is where GDPR meets civil litigation. "Non-material damage" explicitly covers distress, anxiety, and loss of control over personal data — the CJEU confirmed in UI v. Österreichische Post (2023) that the mere infringement of GDPR is not sufficient for compensation; actual damage (including non-material damage) must be proven. The damage need not be severe, but it must be real.

Joint and several liability (Art. 82(4)) means a data subject can sue any one controller or processor for the full damage and let them apportion liability among themselves — making it easier for data subjects to obtain compensation without identifying the precise responsible party. This has significant implications for cloud computing supply chains.`,
          dpdpaCorrespondence: `DPDPA does not have an equivalent to GDPR's Art. 82 compensation right. Under DPDPA, the remedy for individuals is through the Board's grievance mechanism (Section 13) — there is no private right of action for damages against a Data Fiduciary. Penalties imposed by the Board go to a government fund, not to the affected Data Principals. This is a fundamental structural difference: GDPR enables private compensation claims; DPDPA relies on regulatory penalties alone.`,
          proverb: "Where there is harm, there must be remedy — a right without a remedy is merely a wish.",
        },
        {
          id: "g8-3",
          number: "Art. 83",
          articleRef: "Article 83",
          title: "Administrative Fines",
          content: `Article 83 — General conditions for imposing administrative fines

1. Each supervisory authority shall ensure that the imposition of administrative fines pursuant to this Article in respect of infringements of this Regulation shall in each individual case be effective, proportionate and dissuasive.

2. Administrative fines shall, depending on the circumstances of each individual case, be imposed in addition to, or instead of, corrective measures. Deciding factors include:
(a) the nature, gravity and duration of the infringement;
(b) the intentional or negligent character of the infringement;
(c) action taken by the controller or processor to mitigate the damage;
(d) the degree of responsibility of the controller or processor;
(e) relevant previous infringements;
(f) degree of cooperation with the supervisory authority;
(g) categories of personal data affected;
(h) manner in which the infringement became known to the SA;
(i) compliance with previously ordered measures;
(j) adherence to approved codes of conduct or certification mechanisms.

4. Lower tier — Up to €10,000,000 or up to 2% of total worldwide annual turnover of the preceding financial year (whichever is higher), for infringements of:
— obligations of the controller and processor (Articles 8, 11, 25–39, 42 and 43);
— obligations of certification bodies;
— obligations of monitoring bodies.

5. Upper tier — Up to €20,000,000 or up to 4% of total worldwide annual turnover of the preceding financial year (whichever is higher), for infringements of:
— the basic principles for processing, including conditions for consent (Articles 5, 6, 7 and 9);
— data subjects' rights (Articles 12–22);
— transfers of personal data to a recipient in a third country (Articles 44–49);
— obligations pursuant to Member State law adopted under Chapter IX;
— non-compliance with an order by a supervisory authority.

Notable fines: Meta €1.2B (2023, Irish DPC); Amazon €746M (2021, Luxembourg CNPD); Meta/Instagram €405M (2022, Irish DPC); TikTok €345M (2023, Irish DPC); Meta/WhatsApp €225M (2021, Irish DPC); Google €150M (2022, French CNIL); Google €100M (2021, French CNIL).`,
          authorNote: `The two-tier fine structure (2%/€10M and 4%/€20M) reflects the severity of the underlying obligation. Breaching the fundamental principles (Art. 5) or data subject rights (Arts. 12-22) is the most serious tier — these are the core of the GDPR. Breaching technical obligations (security, DPO, DPIA requirements) is the lower tier.

The "4% of global turnover" calculation is based on total worldwide annual turnover — including all group companies' revenues globally. For Meta, 4% of $116B revenue ($4.6B) far exceeds the €20M cap, so the percentage applies. This makes GDPR enforcement financially significant even for the largest companies. By contrast, most national privacy laws (including DPDPA) impose fixed caps.`,
          dpdpaCorrespondence: `DPDPA Schedule 1 (Penalties) sets fixed monetary penalties: ₹250 crore (≈€27M) per security breach instance; ₹200 crore (≈€22M) per breach notification failure; ₹200 crore for children's data violations; ₹50 crore for failure to maintain accuracy; ₹10,000 crore (≈€1.1B) maximum aggregate penalty. These are fixed caps, not percentages of turnover — meaning they become less significant proportionally as a company grows larger. The GDPR's turnover-based calculation ensures fines scale with a company's ability to pay.`,
          proverb: "A fine must sting to deter — a penalty that costs less than the profit of violation is merely a licence fee.",
        },
      ] as GdprSection[],
    },
    // ── Chapter IX ──────────────────────────────────────────────────────────────
    {
      id: "ch9",
      number: 9,
      title: "Specific Processing Situations",
      subtitle: "Freedom of expression, employment, research, archives, churches",
      articleRange: "Arts. 85–91",
      color: "#0EA5E9",
      sections: [
        {
          id: "g9-1",
          number: "Arts. 85–86",
          articleRef: "Articles 85–86",
          title: "Freedom of Expression, Journalism & Public Documents",
          content: `Article 85 — Processing and freedom of expression and information

1. Member States shall by law reconcile the right to the protection of personal data pursuant to this Regulation with the right to freedom of expression and information, including processing for journalistic purposes and the purposes of academic, artistic or literary expression.

2. For processing carried out for journalistic purposes or the purpose of academic, artistic or literary expression, Member States shall provide for exemptions or derogations from Chapters II (principles), III (data subject rights), IV (obligations of controller/processor), V (international transfers), VI (supervisory authorities), VII (cooperation), and IX (specific situations) if they are necessary to reconcile the right to the protection of personal data with the freedom of expression and information.

3. Each Member State shall notify to the Commission the provisions of its law which it has adopted pursuant to paragraph 2 and, without delay, any subsequent amendment law or amendment affecting those provisions.

Article 86 — Processing and public access to official documents

Personal data in official documents held by a public authority or a public body or a private body for the performance of a task carried out in the public interest may be disclosed by the authority or body in accordance with Union or Member State law to which the public authority or public body is subject in order to reconcile public access to official documents with the right to the protection of personal data pursuant to this Regulation.`,
          authorNote: `Article 85 is one of the most consequential provisions for journalism and investigative reporting. It explicitly allows Member States to carve out broad exemptions from GDPR obligations for journalism, academic research, and artistic expression. This reflects the EU Charter of Fundamental Rights' protection of both privacy (Art. 8) and freedom of expression (Art. 11) as co-equal rights.

In practice, the UK's DPA 2018, Germany's BDSG, and Ireland's DPA 2018 all implement journalistic exemptions. These allow newspapers, broadcasters, and investigative journalists to process personal data without consent, without providing access rights, and without notifying data subjects — provided the processing is in the public interest and journalistic standards are followed.

The Indian DPDPA Section 27(2) provides a similar (if narrower) exemption for processing necessary for "research, archiving or statistical purposes" as notified by the Central Government.`,
          dpdpaCorrespondence: `DPDPA Section 27(3) allows the Central Government to exempt certain Data Fiduciaries or processing activities for research, archiving, or statistical purposes. However, the DPDPA has no explicit journalism or artistic expression exemption equivalent to GDPR Art. 85. India's press freedom protections come from Article 19(1)(a) of the Constitution, not the DPDPA.`,
          proverb: "Truth told in the public interest need not be hidden in the name of privacy — but it must not be weaponised as an alibi for exposure.",
        },
        {
          id: "g9-2",
          number: "Arts. 87–88",
          articleRef: "Articles 87–88",
          title: "National Identification Numbers & Employment Context",
          content: `Article 87 — Processing of the national identification number

Member States may further determine the specific conditions for the processing of a national identification number or any other identifier of general application. In that case, the national identification number or any other identifier of general application shall be used only under appropriate safeguards for the rights and freedoms of the data subject pursuant to this Regulation.

Article 88 — Processing in the context of employment

1. Member States may, by law or by collective agreements, provide for more specific rules to ensure the protection of the rights and freedoms in respect of the processing of employees' personal data in the employment context, in particular for the purposes of the recruitment, the performance of the contract of employment, including discharge of obligations laid down by law or by collective agreements, management, planning and organisation of work, equality and diversity in the workplace, health and safety at work, protection of employer's or customer's property and for the purposes of the exercise or enjoyment, on an individual or collective basis, of rights and benefits related to employment, and for the purpose of the termination of the employment relationship.

2. Those rules shall include suitable and specific measures to safeguard the data subject's human dignity, legitimate interests and fundamental rights, with particular regard to the transparency of processing, the transfer of personal data within a group of undertakings, or a group of enterprises engaged in a joint economic activity and monitoring systems at the work place.

3. Each Member State shall notify to the Commission those provisions of its law which it adopts pursuant to paragraph 1, by 25 May 2018 and, without delay, any subsequent amendment affecting those provisions.`,
          authorNote: `The employment context (Art. 88) reflects the inherent power imbalance between employer and employee. Consent is rarely "freely given" in an employment context because the employee faces economic pressure to agree. This is why Art. 88 allows Member States to create specific employment data protection rules — typically through labour law or collective bargaining agreements.

Germany's Works Constitution Act (Betriebsverfassungsgesetz) and France's Labour Code both have detailed rules on workplace monitoring, performance data, and HR processing that supplement GDPR. These go significantly further than the GDPR baseline.

The Indian DPDPA has no specific employment data provision. Employment data processing in India is governed by the general DPDPA framework, the IT Act, and labour laws — without the specific protections Art. 88 enables.`,
          dpdpaCorrespondence: `The DPDPA does not have an employment-specific chapter. Employee data is treated like any other personal data — the employer as Data Fiduciary must have lawful grounds (consent or legitimate use) for processing. Section 7(d) allows processing for "employment" purposes as a legitimate use, but without the detailed safeguards that Art. 88 enables.`,
          proverb: "In the workplace, power speaks louder than consent forms — the law must compensate for what the employment contract cannot.",
        },
        {
          id: "g9-3",
          number: "Arts. 89–91",
          articleRef: "Articles 89–91",
          title: "Archiving, Research, Statistics & Religious Bodies",
          content: `Article 89 — Safeguards and derogations relating to processing for archiving purposes in the public interest, scientific or historical research purposes or statistical purposes

1. Processing for archiving purposes in the public interest, scientific or historical research purposes or statistical purposes, shall be subject to appropriate safeguards, in accordance with this Regulation, for the rights and freedoms of the data subject. Those safeguards shall ensure that technical and organisational measures are in place in particular in order to ensure respect for the principle of data minimisation. Those measures may include pseudonymisation provided that those purposes can be fulfilled in that manner. Where those purposes can be fulfilled by further processing which does not permit or no longer permits the identification of data subjects, those purposes shall be fulfilled in that manner.

2. Where personal data are processed for scientific or historical research purposes or statistical purposes, Union or Member State law may provide for derogations from the rights referred to in Articles 15, 16, 18 and 21 subject to the conditions and safeguards referred to in paragraph 1 of this Article in so far as such rights are likely to render impossible or seriously impair the achievement of the specific purposes, and such derogations are necessary for the fulfilment of those purposes.

Article 90 — Obligations of secrecy

1. Member States may adopt specific rules to set out the powers of the supervisory authorities laid down in points (e) and (f) of Article 58(1) in relation to controllers or processors that are subject, under Union or Member State law or rules established by national competent bodies, to an obligation of professional secrecy or other equivalent obligations of secrecy where this is necessary and proportionate to reconcile the right of the protection of personal data with the obligation of secrecy.

Article 91 — Existing data protection rules of churches and religious associations

1. Where in a Member State, churches and religious associations or communities apply, at the time of entry into force of this Regulation, comprehensive rules relating to the protection of natural persons with regard to processing, such rules may continue to apply, provided that they are brought into line with this Regulation.

2. Churches and religious associations which apply comprehensive rules in accordance with paragraph 1 of this Article shall be subject to the supervision of an independent supervisory authority, which may be specific, provided that it fulfils the conditions laid down in Chapter VI of this Regulation.`,
          authorNote: `Article 89 is fundamental for academic research, public health studies, genomics, and census work. Without it, GDPR's data minimisation and purpose limitation principles would make longitudinal research practically impossible — you could not retain data longer than necessary for the original purpose, but research requires long-term datasets.

The pseudonymisation requirement is crucial: researchers should use pseudonymous or anonymous data wherever possible. Fully anonymised data falls outside GDPR entirely; pseudonymous data (where re-identification is possible with additional information) remains within GDPR but benefits from reduced obligations.

India's DPDPA Section 27(3) provides a similar exemption for research, archiving, and statistical purposes, but with less detail. The Union health ministry's proposed Health Data Management Policy attempts to fill this gap for medical research.`,
          dpdpaCorrespondence: `DPDPA Section 27(3): The Central Government may exempt Data Fiduciaries processing for research, archiving, or statistical purposes — acknowledging the tension between data protection and research needs. However, there is no equivalent to Art. 90 (professional secrecy) or Art. 91 (religious bodies) in the DPDPA.`,
          proverb: "Knowledge advances on the shoulders of data — but it must never trample the dignity of those whose lives the data records.",
        },
      ] as GdprSection[],
    },
    // ── Chapter X ───────────────────────────────────────────────────────────────
    {
      id: "ch10",
      number: 10,
      title: "Delegated & Implementing Acts",
      subtitle: "Commission powers for delegated regulations and committee procedure",
      articleRange: "Arts. 92–93",
      color: "#8B5CF6",
      sections: [
        {
          id: "g10-1",
          number: "Arts. 92–93",
          articleRef: "Articles 92–93",
          title: "Exercise of Delegation & Committee Procedure",
          content: `Article 92 — Exercise of the delegation

1. The power to adopt delegated acts is conferred on the Commission subject to the conditions laid down in this Article.

2. The delegation of power referred to in Articles 12(8) and 43(8) shall be conferred on the Commission for an indeterminate period of time from 24 May 2016.

3. The delegation of power referred to in Articles 12(8) and 43(8) may be revoked at any time by the European Parliament or by the Council. A decision to revoke shall put an end to the delegation of the power specified in that decision. It shall take effect the day following the publication of the decision in the Official Journal of the European Union or at a later date specified therein. It shall not affect the validity of any delegated acts already in force.

4. Before adopting a delegated act, the Commission shall consult experts designated by each Member State in accordance with the principles laid down in the Interinstitutional Agreement of 13 April 2016 on Better Law-Making.

5. As soon as it adopts a delegated act, the Commission shall notify it simultaneously to the European Parliament and to the Council.

6. A delegated act adopted pursuant to Articles 12(8) and 43(8) shall enter into force only if no objection has been expressed either by the European Parliament or the Council within a period of three months of notification of that act to the European Parliament and the Council or if, before the expiry of that period, the European Parliament and the Council have both informed the Commission that they will not object. That period shall be extended by three months at the initiative of the European Parliament or of the Council.

Article 93 — Committee procedure

1. The Commission shall be assisted by a committee. That committee shall be a committee within the meaning of Regulation (EU) No 182/2011.

2. Where reference is made to this paragraph, Article 5 of Regulation (EU) No 182/2011 shall apply.

3. Where reference is made to this paragraph, Article 8 of Regulation (EU) No 182/2011, in conjunction with Article 5 thereof, shall apply.`,
          authorNote: `Articles 92 and 93 govern the institutional mechanics of how the GDPR's technical standards get updated. The Commission can adopt "delegated acts" (subordinate legislation under Article 290 TFEU) in two specified areas: the icons/standardised information formats under Art. 12(8) and the certification criteria/marks under Art. 43(8).

This matters because technology changes rapidly. Rather than requiring full legislative procedure to update technical specifications, the GDPR delegates this to the Commission with Parliamentary oversight.

India's DPDPA has a simpler equivalent: Section 29 (Power to make rules) allows the Central Government to make subsidiary legislation through the normal gazette notification process, subject to parliamentary tabling. There is no delegated act procedure — the Government retains direct rule-making power without the multi-institution checks of the EU system.`,
          dpdpaCorrespondence: `DPDPA Section 29 (Power to make rules) and Section 30 (Power to make regulations by the Board) are the Indian equivalents. However, Indian rule-making is subject to parliamentary tabling (both Houses), not a veto-capable oversight committee. The EDPB has no direct Indian equivalent — the Data Protection Board of India has narrower rule-making powers than the EDPB.`,
          proverb: "Laws set the principles; rules set the practice — the gap between them is where compliance lives and loopholes hide.",
        },
      ] as GdprSection[],
    },
    // ── Chapter XI ──────────────────────────────────────────────────────────────
    {
      id: "ch11",
      number: 11,
      title: "Final Provisions",
      subtitle: "Repeal, relationship with other laws, entry into force",
      articleRange: "Arts. 94–99",
      color: "#10B981",
      sections: [
        {
          id: "g11-1",
          number: "Arts. 94–96",
          articleRef: "Articles 94–96",
          title: "Repeal of Directive 95/46/EC & Relationship with Other Laws",
          content: `Article 94 — Repeal of Directive 95/46/EC

1. Directive 95/46/EC is repealed with effect from 25 May 2018.

2. References to the repealed Directive shall be construed as references to this Regulation. References to the Working Party on the Protection of Individuals with regard to the Processing of Personal Data established by Article 29 of Directive 95/46/EC shall be construed as references to the European Data Protection Board established by this Regulation.

Article 95 — Relationship with Directive 2002/58/EC

This Regulation shall not impose additional obligations on natural or legal persons in relation to processing in connection with the provision of publicly available electronic communications services in public communications networks in the Union in relation to matters for which they are subject to specific obligations with the same objective set out in Directive 2002/58/EC.

Article 96 — Relationship with previously concluded Agreements

International agreements involving the transfer of personal data to third countries or international organisations which were concluded by Member States prior to 24 May 2016, and which comply with Union law as applicable prior to that date, shall remain in force until amended, replaced or revoked.`,
          authorNote: `Article 94 completes the 20-year transition from Directive 95/46/EC (the 1995 Data Protection Directive) to the GDPR. The Directive had created fragmented national laws across EU Member States — GDPR replaced all of them with a single directly applicable regulation.

The Article 29 Working Party (named after a provision of the 1995 Directive) became the European Data Protection Board (EDPB) under GDPR. The EDPB's guidelines and opinions became significantly more legally authoritative than the old Working Party's opinions, which were advisory only.

Art. 95's relationship with the ePrivacy Directive (2002/58/EC) is complex and evolving — the proposed ePrivacy Regulation (still in negotiation as of 2024) would replace it and align more closely with GDPR. Currently the ePrivacy Directive governs cookies, electronic direct marketing, and communications metadata separately from GDPR.`,
          dpdpaCorrespondence: `India had no comprehensive predecessor to the DPDPA (unlike GDPR's relationship to Directive 95/46). The IT Act 2000 and IT (Reasonable Security Practices) Rules 2011 provided limited data protection — the DPDPA represents a much larger shift. India's DPDPA Section 31 provides that the DPDPA has "overriding effect" over inconsistent provisions of other laws — similar to GDPR's supremacy principle as EU law.`,
          proverb: "Every law that rises must name what it replaces — the past's incompleteness is the present's starting point.",
        },
        {
          id: "g11-2",
          number: "Arts. 97–99",
          articleRef: "Articles 97–99",
          title: "Commission Reports & Entry into Force",
          content: `Article 97 — Commission reports

1. By 25 May 2020 and every four years thereafter, the Commission shall submit a report on the evaluation and review of this Regulation to the European Parliament and to the Council. The reports shall be made public.

2. In the context of the evaluations and reviews referred to in paragraph 1, the Commission shall examine, in particular, the application and functioning of:
(a) Chapter V on the transfer of personal data to third countries or international organisations with particular regard to decisions adopted pursuant to Article 45(3) of this Regulation and decisions adopted on the basis of Article 25(6) of Directive 95/46/EC;
(b) Chapter VII on cooperation and consistency.

3. For the purpose of paragraph 1, the Commission may request information from Member States and supervisory authorities.

4. In carrying out the evaluations and reviews referred to in paragraphs 1 and 2, the Commission shall take into account the positions and findings of the European Parliament, of the Council, and of other relevant bodies or sources.

5. The Commission shall, if necessary, submit appropriate proposals to amend this Regulation, in particular taking into account of developments in information technology and in the light of the state of progress in the information society.

Article 98 — Review of other Union legal acts on data protection

The Commission shall, if appropriate, submit legislative proposals with a view to amending other Union legal acts on the protection of personal data, in order to ensure uniform and consistent protection of natural persons with regard to processing. This shall in particular concern the rules relating to the protection of natural persons with regard to processing by Union institutions, bodies, offices and agencies and on the free movement of such data.

Article 99 — Entry into force and application

1. This Regulation shall enter into force on the twentieth day following that of its publication in the Official Journal of the European Union.

2. It shall apply from 25 May 2018.

This Regulation shall be binding in its entirety and directly applicable in all Member States.

Done at Brussels, 27 April 2016.`,
          authorNote: `Article 97's mandatory review cycle is significant — the GDPR requires the Commission to evaluate its functioning every four years, with a specific focus on international transfers (Chapter V) and the cooperation mechanisms (Chapter VII). The 2020 and 2024 evaluations have both noted implementation inconsistencies across Member States.

Article 99's "directly applicable" language is constitutionally important. Unlike a Directive (which requires national implementing legislation), a Regulation applies automatically in all Member States from May 25, 2018. This is why GDPR creates the same rights for a French data subject and a Finnish data subject — there is one law, not 27 national interpretations.

The DPDPA 2023 follows a different approach: Section 1(3) provides that it "shall come into force on such date as the Central Government may, by notification in the Official Gazette, appoint" — meaning the Government controls the commencement date, and different provisions can come into force at different times. This delayed, phased commencement has meant that as of 2025, the DPDPA Rules are still being finalised.`,
          dpdpaCorrespondence: `DPDPA Section 1(3) on commencement vs GDPR Art. 99: Both deal with when the law comes into force, but with very different approaches. GDPR had a fixed two-year transition (May 2016 gazette → May 2018 enforcement). DPDPA gives the Central Government open-ended discretion on commencement — creating uncertainty for businesses about when obligations are enforceable.

The DPDPA has no equivalent of Art. 97's mandatory review cycle. India's parliamentary tradition relies on Select Committee reviews and annual reports rather than built-in regulatory review mandates.`,
          proverb: "A law without a start date is a promise without a deadline — the urgency of rights cannot await the convenience of governments.",
        },
      ] as GdprSection[],
    },
  ] as GdprChapter[],
};

export function getAllGdprSections() {
  return gdpr.chapters.flatMap(ch =>
    ch.sections.map(s => ({ ...s, chapterNumber: ch.number, chapterId: ch.id, chapterColor: ch.color }))
  );
}
export function getGdprChapterById(id: string) { return gdpr.chapters.find(c => c.id === id); }
export function getGdprSectionById(id: string) { return getAllGdprSections().find(s => s.id === id); }
export function getAdjacentGdprSections(sectionId: string) {
  const all = getAllGdprSections();
  const idx = all.findIndex(s => s.id === sectionId);
  return { prev: idx > 0 ? all[idx - 1] : null, next: idx < all.length - 1 ? all[idx + 1] : null };
}
