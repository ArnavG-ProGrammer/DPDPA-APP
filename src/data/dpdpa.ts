export interface Flashcard {
  front: string;
  back: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  answer: number; // 0-indexed correct option
  explanation?: string;
}

export interface Section {
  id: string;
  number: string;
  title: string;
  content: string;
  authorNote?: string;
  userNote?: string;
  relatedRules?: string[];
  relatedGDPR?: string[];
  flashcards?: Flashcard[];
  quiz?: QuizQuestion[];
}

export interface Chapter {
  id: string;
  number: number;
  title: string;
  sections: Section[];
}

export interface Act {
  id: string;
  title: string;
  shortTitle: string;
  year: number;
  chapters: Chapter[];
}

export const dpdpaAct: Act = {
  id: "dpdpa-2023",
  title: "The Digital Personal Data Protection Act, 2023",
  shortTitle: "DPDPA 2023",
  year: 2023,
  chapters: [
    // ══════════════════════════════════════════════════════
    // CHAPTER I — PRELIMINARY
    // ══════════════════════════════════════════════════════
    {
      id: "chapter-1",
      number: 1,
      title: "Preliminary",
      sections: [
        {
          id: "section-1",
          number: "1",
          title: "Short title, extent and commencement",
          content: `(1) This Act may be called the Digital Personal Data Protection Act, 2023.

(2) It extends to the whole of India and also applies to processing of digital personal data outside the territory of India, if such processing is in connection with any activity related to offering of goods or services to Data Principals within the territory of India.

(3) It shall come into force on such date as the Central Government may, by notification in the Official Gazette, appoint; and different dates may be appointed for different provisions of this Act and any reference in any such provision to the commencement of this Act shall be construed as a reference to the coming into force of that provision.`,
          relatedGDPR: ["Article 3 - Territorial scope"],
          relatedRules: ["Rule 1 - Short title and commencement"],
          flashcards: [
            { front: "What does DPDPA stand for?", back: "Digital Personal Data Protection Act, 2023 (No. 22 of 2023)" },
            { front: "Does DPDPA apply to processing outside India?", back: "Yes — if processing is in connection with any activity related to offering goods or services to Data Principals within India" },
            { front: "How does DPDPA come into force?", back: "The Central Government appoints commencement dates by notification in the Official Gazette; different dates may apply to different provisions" },
          ],
          quiz: [
            {
              question: "DPDPA 2023 applies to processing outside India when:",
              options: [
                "The data processor is an Indian company",
                "The processing relates to offering goods or services to Data Principals within India",
                "The data subject is an Indian citizen living abroad",
                "The server storing data is located in India",
              ],
              answer: 1,
              explanation: "Section 1(2) specifically extends the Act's reach to processing outside India only when connected with offering goods or services to Data Principals within India — it follows the service, not the processor or citizenship.",
            },
            {
              question: "DPDPA 2023 was enacted as which number in the Acts of Parliament?",
              options: ["No. 11 of 2023", "No. 22 of 2023", "No. 44 of 2023", "No. 2023 of 2023"],
              answer: 1,
              explanation: "DPDPA 2023 is officially No. 22 of 2023, enacted on 11th August 2023.",
            },
          ],
        },
        {
          id: "section-2",
          number: "2",
          title: "Definitions",
          content: `In this Act, unless the context otherwise requires,—

(a) "Appellate Tribunal" means the Telecom Disputes Settlement and Appellate Tribunal established under section 14 of the Telecom Regulatory Authority of India Act, 1997;

(b) "Board" means the Data Protection Board of India established under section 18;

(c) "child" means an individual who has not completed the age of eighteen years;

(d) "certain legitimate uses" means the uses referred to in section 7;

(e) "Chairperson" means the Chairperson of the Board;

(f) "consent manager" means a person registered with the Board who acts as a single point of contact to enable a Data Principal to give, manage, review and withdraw her consent through an accessible, transparent and interoperable platform;

(g) "data" means a representation of information, facts, concepts, opinions or instructions in a manner suitable for communication, interpretation or processing by human beings or by automated means;

(h) "Data Fiduciary" means any person who alone or in conjunction with other persons determines the purpose and means of processing of personal data;

(i) "Data Principal" means the individual to whom the personal data relates and where such individual is—
    (i) a child, includes the parents or lawful guardian of such a child;
    (ii) a person with disability, includes her lawful guardian, acting on her behalf;

(j) "data processor" means any person who processes personal data on behalf of a Data Fiduciary;

(k) "Data Protection Officer" means an individual appointed by a Significant Data Fiduciary under clause (b) of sub-section (2) of section 10;

(l) "digital office" means an office that adopts an online mechanism wherein the proceedings, from receipt of intimation or complaint or reference or directions or appeal, as the case may be, to the disposal thereof, are conducted in online or digital mode;

(m) "grievance" means a complaint or grievance of a Data Principal in relation to any act or omission of a Data Fiduciary or consent manager in contravention of the provisions of this Act;

(n) "intermediary" shall have the same meaning as assigned to it in clause (w) of sub-section (1) of section 2 of the Information Technology Act, 2000;

(o) "notification" means a notification published in the Official Gazette and the expressions "notify" and "notified" shall be construed accordingly;

(p) "person" includes—
    (i) an individual;
    (ii) a Hindu undivided family;
    (iii) a company;
    (iv) a firm;
    (v) an association of persons or a body of individuals, whether incorporated or not;
    (vi) the State; and
    (vii) every artificial juridical person, not falling within any of the preceding sub-clauses;

(q) "personal data" means any data about an individual who is identifiable by or in relation to such data;

(r) "personal data breach" means any unauthorised processing of personal data or accidental disclosure, acquisition, sharing, use, alteration, destruction or loss of access to personal data, that compromises the confidentiality, integrity or availability of personal data;

(s) "prescribed" means prescribed by rules made under this Act;

(t) "processing" in relation to personal data, means a wholly or partly automated operation or set of operations performed on digital personal data, and includes operations such as collection, recording, organisation, structuring, storage, adaptation, retrieval, use, alignment or combination, indexing, sharing, disclosure by transmission, dissemination or otherwise making available, restriction, erasure or destruction;

(u) "regulations" means regulations made by the Board under this Act;

(v) "Significant Data Fiduciary" means any Data Fiduciary or class of Data Fiduciaries as may be notified by the Central Government under section 10;

(w) "State" includes—
    (i) the Central Government;
    (ii) a State Government;
    (iii) any body or authority constituted by the Central Government or a State Government; and
    (iv) any company in which more than fifty-one per cent. of the paid-up share capital is held by the Central Government or by any State Government or partly by the Central Government and partly by one or more State Governments.`,
          relatedGDPR: ["Article 4 - Definitions"],
          relatedRules: ["Rule 2 - Definitions"],
          flashcards: [
            { front: "Who is a 'Data Fiduciary'?", back: "Any person who alone or in conjunction with others determines the purpose and means of processing personal data — analogous to a 'controller' under GDPR" },
            { front: "Who is a 'Data Principal'?", back: "The individual to whom the personal data relates. For a child, includes parents/guardian; for a person with disability, includes their lawful guardian" },
            { front: "What is a 'personal data breach'?", back: "Any unauthorised processing or accidental disclosure, acquisition, sharing, use, alteration, destruction or loss of access to personal data that compromises its confidentiality, integrity or availability" },
            { front: "What is the role of a 'Consent Manager'?", back: "A Board-registered person acting as a single point of contact for a Data Principal to give, manage, review and withdraw consent through an accessible, transparent and interoperable platform" },
            { front: "What does 'processing' include under DPDPA?", back: "Collection, recording, organisation, structuring, storage, adaptation, retrieval, use, alignment, combination, indexing, sharing, disclosure, dissemination, restriction, erasure or destruction" },
          ],
          quiz: [
            {
              question: "Under DPDPA, who is considered a 'Data Principal' when a child's data is processed?",
              options: [
                "Only the child themselves",
                "The child and includes their parents or lawful guardian",
                "Only the parents or lawful guardian",
                "The Data Fiduciary on behalf of the child",
              ],
              answer: 1,
              explanation: "Section 2(i) defines Data Principal as the individual to whom the data relates. For a child, this includes their parents or lawful guardian — both are covered as Data Principal.",
            },
            {
              question: "Which of the following is NOT covered under the definition of 'processing' in DPDPA?",
              options: [
                "Collection of personal data",
                "Erasure of personal data",
                "Physical inspection of handwritten records",
                "Disclosure by transmission of personal data",
              ],
              answer: 2,
              explanation: "DPDPA defines 'processing' as a wholly or partly automated operation on *digital* personal data. Physical inspection of handwritten records is not covered under this definition.",
            },
          ],
        },
        {
          id: "section-3",
          number: "3",
          title: "Application of Act",
          content: `(1) Subject to the provisions of this Act, it shall—
(a) apply to the processing of digital personal data within the territory of India where the personal data is collected—
    (i) in digital form; or
    (ii) in non-digital form and digitised subsequently; and
(b) also apply to processing of digital personal data outside the territory of India, if such processing is in connection with any activity related to offering of goods or services to Data Principals within the territory of India.

(2) It shall not apply to—
(a) personal data processed by an individual for any personal or domestic purpose; and
(b) personal data that is made or caused to be made publicly available by—
    (A) the Data Principal to whom such personal data relates; or
    (B) any other person who is under an obligation under any law for the time being in force in India to make such personal data publicly available.

Illustration. X, an individual, while blogging her views, has publicly made available her personal data on social media. In such case, the provisions of this Act shall not apply.`,
          relatedGDPR: ["Article 2 - Material scope", "Article 3 - Territorial scope"],
          relatedRules: ["Rule 3 - Application"],
          flashcards: [
            { front: "What two forms of data collection trigger DPDPA applicability?", back: "1) Data collected in digital form, or 2) Data collected in non-digital form and later digitised" },
            { front: "Give an example where DPDPA does not apply.", back: "X blogs her views and publicly makes her personal data available on social media — DPDPA does not apply to that publicly available personal data" },
            { front: "Does DPDPA apply to a person processing their own family's data at home?", back: "No. Processing by an individual for personal or domestic purposes is explicitly excluded from DPDPA's scope" },
          ],
          quiz: [
            {
              question: "DPDPA applies to which of the following scenarios?",
              options: [
                "A person maintaining a personal diary with friends' contact details",
                "An Indian e-commerce company processing EU customer data in Germany",
                "A US company processing data of Indian users to offer them products",
                "A government officer mandated by law to publish certain personal data",
              ],
              answer: 2,
              explanation: "Section 3(1)(b) extends DPDPA to processing outside India if it relates to offering goods/services to Data Principals within India. A US company targeting Indian users falls squarely within this.",
            },
          ],
        },
      ],
    },

    // ══════════════════════════════════════════════════════
    // CHAPTER II — OBLIGATIONS OF DATA FIDUCIARY
    // ══════════════════════════════════════════════════════
    {
      id: "chapter-2",
      number: 2,
      title: "Obligations of Data Fiduciary",
      sections: [
        {
          id: "section-4",
          number: "4",
          title: "Grounds for processing personal data",
          content: `(1) A person may process the personal data of a Data Principal only in accordance with the provisions of this Act and for a lawful purpose—
(a) for which the Data Principal has given her consent; or
(b) for certain legitimate uses.

(2) For the purposes of this section, the expression "lawful purpose" means any purpose which is not expressly forbidden by law.`,
          relatedGDPR: ["Article 6 - Lawfulness of processing"],
          relatedRules: ["Rule 4 - Grounds for processing"],
          flashcards: [
            { front: "What are the two grounds for processing personal data under DPDPA?", back: "1) Consent of the Data Principal, or 2) Certain Legitimate Uses as specified in Section 7" },
            { front: "What does 'lawful purpose' mean in DPDPA?", back: "Any purpose that is not expressly forbidden by law — it is a broader standard than GDPR's six lawful bases" },
          ],
          quiz: [
            {
              question: "Under DPDPA, a Data Fiduciary may process personal data only on which grounds?",
              options: [
                "Consent, legitimate interest, or legal obligation",
                "Consent or certain legitimate uses as defined in Section 7",
                "Any purpose that is commercially reasonable",
                "Consent, contract, legal obligation, vital interests, public task, or legitimate interests",
              ],
              answer: 1,
              explanation: "Unlike GDPR's six lawful bases, DPDPA Section 4 provides only two grounds: (a) consent, and (b) certain legitimate uses under Section 7. This is a key structural difference.",
            },
          ],
        },
        {
          id: "section-5",
          number: "5",
          title: "Notice",
          content: `(1) Every request for consent made to a Data Principal shall be accompanied or preceded by a notice given by the Data Fiduciary to the Data Principal, informing her—
(i) the personal data and the purpose for which the same is proposed to be processed;
(ii) the manner in which she may exercise her rights under sub-section (4) of section 6 and section 13; and
(iii) in such manner and as may be prescribed.

Illustration. X, an individual, opens a bank account using the mobile app or website of Y, a bank. To complete the Know-Your-Customer requirements under law for opening of bank account, X opts for processing of her personal data by Y in a live, video-based customer identification process. Y shall accompany or precede the request for the personal data with notice to X, describing the personal data and the purpose of its processing.

(2) Where a Data Principal has given her consent for the processing of her personal data before the date of commencement of this Act—
(a) the Data Fiduciary shall, as soon as it is reasonably practicable, give the Data Principal a notice informing her—
    (i) the personal data and the purpose for which the same has been processed;
    (ii) the manner in which she may exercise her rights under sub-section (4) of section 6 and section 13; and
    (iii) the manner in which the Data Principal may make a complaint to the Board, in such manner and as may be prescribed.
(b) the Data Fiduciary may continue to process the personal data until and unless the Data Principal withdraws her consent.

Illustration. X, an individual, gave her consent to the processing of her personal data for an online shopping app or website operated by Y, an e-commerce service provider, before the commencement of this Act. Upon commencement of the Act, Y shall, as soon as practicable, give through email, in-app notification or other effective method information to X, describing the personal data and the purpose of its processing.

(3) The notice referred to in sub-sections (1) and (2) shall be presented in the English language or any language specified in the Eighth Schedule to the Constitution.`,
          relatedGDPR: ["Article 13 - Information to be provided where data collected from data subject", "Article 14 - Information where data have not been obtained from the data subject"],
          relatedRules: ["Rule 5 - Notice"],
          flashcards: [
            { front: "When must a Data Fiduciary give notice?", back: "Notice must accompany or precede the request for consent — it cannot come after consent is sought" },
            { front: "What must a notice under Section 5 include?", back: "1) The personal data and purpose of processing, 2) How to exercise rights under §6(4) and §13, and 3) Contact details of DPO or authorised person" },
            { front: "What obligation exists for data collected before DPDPA's commencement?", back: "The Data Fiduciary must, as soon as reasonably practicable, give the Data Principal a notice informing them of the data held and its purpose" },
          ],
          quiz: [
            {
              question: "A Data Fiduciary seeks consent and simultaneously provides a notice. Is this compliant with Section 5?",
              options: [
                "No — notice must always come before consent, not simultaneously",
                "Yes — Section 5 requires notice to accompany or precede consent, so simultaneous notice is valid",
                "Only if the notice is in English",
                "Only for Significant Data Fiduciaries",
              ],
              answer: 1,
              explanation: "Section 5(1) says notice must 'accompany or precede' the consent request. Simultaneous delivery satisfies 'accompany' and is therefore compliant.",
            },
          ],
        },
        {
          id: "section-6",
          number: "6",
          title: "Consent",
          content: `(1) Consent given by a Data Principal shall be free, specific, informed, unconditional and unambiguous with a clear affirmative action, and shall signify an agreement to the processing of her personal data for the specified purpose and be limited to such personal data as is necessary for such specified purpose.

Illustration. X, an individual, downloads Y, a telemedicine app. Y requests the consent of X for (i) the processing of her personal data for making available telemedicine services, and (ii) accessing her mobile phone contact list, and X signifies her consent to both. Since phone contact list is not necessary for making available telemedicine services, her consent shall be limited to the processing of her personal data for making available telemedicine services.

(2) Any part of consent referred to in sub-section (1) that constitutes an infringement of the provisions of this Act or the rules made thereunder or any other law for the time being in force shall be invalid to the extent of such infringement.

Illustration. X, an individual, buys an insurance policy using the mobile app or website of Y, an insurer. She gives to Y her consent for (i) the processing of her personal data by Y for the purpose of issuing the policy, and (ii) waiver of her right to file a complaint before the Data Protection Board of India. Part (ii), relating to waiver of her right to file a complaint, shall be invalid.

(3) Every request for consent under this Act or the rules made thereunder shall be presented to the Data Principal in a clear and plain language, giving her the option to access such request in English or any language specified in the Eighth Schedule to the Constitution and providing the contact details of a Data Protection Officer, where applicable, or of any other person authorised by the Data Fiduciary to respond to any communication from the Data Principal for the purpose of exercise of her rights under the provisions of this Act.

(4) The Data Principal shall have the right to withdraw her consent at any time, with the ease of doing so being comparable to the ease with which such consent was given, and upon such withdrawal, the Data Fiduciary shall, within a reasonable time, cease to process her personal data.

Illustration. X, an individual, is the user of an online shopping app or website operated by Y, an e-commerce service provider. X consents to the processing of her personal data by Y for the purpose of fulfilling her supply order and places an order for supply of a good while making payment for the same. If X withdraws her consent, Y may stop enabling X to use the app or website for placing orders, but may not stop the processing for supply of the goods already ordered and paid for by X.

(5) The withdrawal of consent shall not affect the lawfulness of the processing of personal data based on consent before its withdrawal.

(6) Upon withdrawal of consent by the Data Principal, the Data Fiduciary shall, within a reasonable time, cease and cause its Data Processors to cease processing the personal data of such Data Principal unless such processing without her consent is required or authorised under the provisions of this Act or the rules made thereunder or any other law for the time being in force in India.

Illustration. X, a telecom service provider, enters into a contract with Y, a Data Processor, for emailing telephone bills to the customers of X. Z, a customer of X, who had earlier given her consent to X for the processing of her personal data for emailing of bills, downloads the mobile app of X and opts to receive bills only on the app. X shall itself cease, and shall cause Y to cease, the processing of the personal data of Z for emailing bills.

(7) A Data Principal may give, manage, review or withdraw her consent to any Data Fiduciary through a Consent Manager.

(8) The Consent Manager shall be accountable to the Data Principal and shall act on her behalf in such manner and subject to such obligations as may be prescribed.

(9) The Consent Manager shall be registered with the Board in such manner and subject to such technical, operational, financial and other conditions as may be prescribed.

(10) Where a Data Principal has given her consent for processing of her personal data and a question arises in this regard in a proceeding, the Data Fiduciary shall be obliged to prove that a notice was given by her to the Data Principal and consent was given by such Data Principal to the Data Fiduciary in accordance with the provisions of this Act and the rules made thereunder.`,
          relatedGDPR: ["Article 7 - Conditions for consent", "Article 8 - Conditions applicable to child's consent in relation to information society services"],
          relatedRules: ["Rule 6 - Consent"],
          flashcards: [
            { front: "Name the five qualities DPDPA consent must possess.", back: "Free, Specific, Informed, Unconditional, and Unambiguous — all five must be present for valid consent" },
            { front: "What happens when a Data Principal withdraws consent?", back: "The Fiduciary must cease processing within a reasonable time and cause its Data Processors to cease also. Prior processing remains lawful." },
            { front: "What is 'bundled consent' and is it valid under DPDPA?", back: "Bundled consent means seeking consent for one purpose conditional on consent for another. Under §6(1), this is invalid — consent must be specific to the stated purpose." },
            { front: "Who bears the burden of proof for consent under DPDPA?", back: "The Data Fiduciary must prove that proper notice was given and valid consent was obtained — the burden of proof lies with the Fiduciary, not the Data Principal" },
          ],
          quiz: [
            {
              question: "A company's sign-up form requires a user to consent to marketing emails as a condition of using the app. Is this valid under DPDPA?",
              options: [
                "Yes, companies can bundle consent for operational and marketing purposes",
                "No — consent for marketing is conditional on consent for using the app, making it bundled and therefore invalid",
                "Yes, as long as the user can later opt out",
                "Only invalid if the user objects after the fact",
              ],
              answer: 1,
              explanation: "Section 6(1) prohibits bundled consent — consent for one purpose cannot be conditioned on consent for another unrelated purpose. Marketing emails are a separate purpose from app usage.",
            },
            {
              question: "After withdrawing consent, can a Data Fiduciary continue processing the personal data for orders already placed?",
              options: [
                "No — all processing must immediately cease upon withdrawal",
                "Yes — withdrawal does not affect the lawfulness of prior processing and processing necessary to fulfil prior commitments may continue",
                "Only if the Data Principal signs a separate agreement",
                "Only for 30 days post-withdrawal",
              ],
              answer: 1,
              explanation: "Section 6(5) clarifies that withdrawal of consent does not affect the lawfulness of processing that occurred before withdrawal. The illustration in Section 6(4) further shows that processing to fulfil an existing supply order can continue.",
            },
          ],
        },
        {
          id: "section-7",
          number: "7",
          title: "Certain legitimate uses",
          content: `A Data Fiduciary may process personal data of a Data Principal for any of following uses, namely:—

(a) for the specified purpose for which the Data Principal, while availing of or applying for a service, voluntarily provides her personal data to the Data Fiduciary and in respect of which she has not indicated to the Data Fiduciary that she does not consent to the use of her personal data.

Illustrations.
(I) X, an individual, voluntarily provides her name, address and purchase information to Y, a pharmacy. She voluntarily provides Y her personal data and requests Y to acknowledge receipt of the payment made for the purchase by sending a message to her mobile phone. Y may process the personal data of X for the purpose of sending the receipt.
(II) X, an individual, contacts Y, a real estate broker, requesting Y to help identify a suitable rented accommodation for her and shares her personal data for this purpose. Y may process her personal data to identify and intimate to her the details of accommodation available on rent. Subsequently, X informs Y that X no longer needs help from Y. Y shall cease to process the personal data of X;

(b) for provision to the Data Principal of any subsidy, benefit, service, certificate, licence or permit as may be prescribed, where—
    (i) the Data Principal has previously consented to the State or any of its instrumentalities for any subsidy, benefit, service, certificate, licence or permit; or
    (ii) such personal data is available in digital form in, or in non-digital form and digitised subsequently from, any database, register, book or other document which is maintained by the State or any of its instrumentalities and is notified by the Central Government, subject to standards followed for processing being in accordance with the policy issued by the Central Government or any law for the time being in force for governance of personal data.

Illustration. X, a pregnant woman, enrols herself on an app or website to avail of government's maternity benefits programme, while consenting to provide her personal data for the purpose of availing of such benefits. Government may process the personal data of X for determining her eligibility to receive any other prescribed benefit from the government;

(c) for the performance by the State or any of its instrumentalities of any function under any law for the time being in force in India or in the interest of sovereignty and integrity of India or security of the State;

(d) for compliance with any judgment or decree or order issued under any law for the time being in force in India, or any judgment or order relating to claims of a contractual or civil nature under any law for the time being in force outside India;

(e) for responding to a medical emergency involving a threat to the life or immediate threat to the health of the Data Principal or any other individual;

(f) for taking measures to provide medical treatment or health services to any individual during an epidemic, outbreak of disease, or any other threat to public health;

(g) for taking measures to ensure safety of, or provide assistance or services to, any individual during any disaster or any breakdown of public order.

Explanation.— For the purposes of this clause, the expression "disaster" shall have the same meaning as assigned to it in clause (d) of section 2 of the Disaster Management Act, 2005;

(h) for the purposes related to employment including prevention of corporate espionage, maintenance of confidentiality of trade secrets, intellectual property, classified information or provision of any service or benefit sought by a Data Principal who is an employee.`,
          relatedGDPR: ["Article 6(1)(b)-(f) - Lawfulness of processing", "Article 9(2) - Processing of special categories of personal data"],
          relatedRules: ["Rule 7 - Legitimate uses"],
          flashcards: [
            { front: "Does Section 7 require consent from the Data Principal?", back: "No — Section 7 lists legitimate uses where consent is not required. The Data Principal's voluntary act or the nature of the purpose justifies processing." },
            { front: "Can an employer process employee data without consent under DPDPA?", back: "Yes — Section 7(h) permits processing for employment purposes including prevention of corporate espionage, trade secret protection, and providing benefits to employee Data Principals" },
            { front: "What is the 'voluntary provision' legitimate use in §7(a)?", back: "When a Data Principal voluntarily provides data for a specific purpose (e.g., asking a pharmacy to send a receipt), the Fiduciary may process it for that stated purpose without separate consent" },
          ],
          quiz: [
            {
              question: "A hospital processes patient data during a disease outbreak without individual consent. Which Section 7 legitimate use applies?",
              options: [
                "Section 7(a) — voluntary provision",
                "Section 7(c) — State functions",
                "Section 7(f) — medical treatment during epidemic",
                "Section 7(h) — employment purposes",
              ],
              answer: 2,
              explanation: "Section 7(f) permits processing 'for taking measures to provide medical treatment or health services to any individual during an epidemic, outbreak of disease, or any other threat to public health' — no consent required in such emergencies.",
            },
          ],
        },
        {
          id: "section-8",
          number: "8",
          title: "General obligations of Data Fiduciary",
          content: `(1) A Data Fiduciary shall, irrespective of any agreement to the contrary or failure of a Data Principal to carry out the duties provided under this Act, be responsible for complying with the provisions of this Act and the rules made thereunder in respect of any processing of personal data of a Data Principal undertaken by it or on its behalf by a Data Processor.

(2) A Data Fiduciary shall not process any personal data of a Data Principal beyond what is necessary for the specified purpose.

(3) A Data Fiduciary shall not retain personal data beyond the period necessary for the specified purpose, and shall ensure that after the specified purpose has been met, the personal data is deleted.

(4) Where the Data Fiduciary is unable to determine the period specified in sub-section (3), the Central Government may, by rules, prescribe a period after the expiry of which the specified purpose shall be deemed to be no longer being served.

(5) The Data Fiduciary shall implement appropriate technical and organisational measures to ensure effective observance of the provisions of this Act and the rules made thereunder, and in particular, to prevent personal data breach.

(6) The Data Fiduciary shall, upon becoming aware of a personal data breach, give the Board and each affected Data Principal a notice in such form and in such manner as may be prescribed.

(7) In the event of any personal data breach, the Data Fiduciary shall take such measures as may be prescribed to mitigate such breach.

(8) The Data Fiduciary shall, before transferring personal data to a Data Processor, enter into a valid contract with such Data Processor.

(9) The Data Fiduciary shall publish the business contact information of a Data Protection Officer, if applicable, or of any other person who is able to answer on behalf of the Data Fiduciary, the questions of a Data Principal regarding the processing of her personal data.`,
          relatedGDPR: ["Article 5 - Principles relating to processing of personal data", "Article 24 - Responsibility of the controller", "Article 25 - Data protection by design and by default", "Article 33 - Notification of a personal data breach to the supervisory authority"],
          relatedRules: ["Rule 8 - Data Fiduciary obligations", "Rule 9 - Security safeguards"],
          flashcards: [
            { front: "Who is ultimately responsible for DPDPA compliance when a Data Processor is used?", back: "The Data Fiduciary — Section 8(1) makes the Fiduciary responsible for all processing by its processors, regardless of any contrary agreement" },
            { front: "What are the two triggers for erasure of personal data under §8(3)?", back: "1) The specified purpose is no longer being served, AND 2) retention is no longer necessary for legal or business purposes" },
            { front: "What must a Data Fiduciary do upon becoming aware of a personal data breach?", back: "Under §8(6): notify both the Board and each affected Data Principal in the prescribed form and manner" },
          ],
          quiz: [
            {
              question: "A Data Fiduciary's processor causes a breach. Who is responsible under DPDPA?",
              options: [
                "Only the Data Processor — they caused the breach",
                "The Data Fiduciary — regardless of any agreement to the contrary",
                "Both equally share 50% liability",
                "Whoever the Board determines based on investigation",
              ],
              answer: 1,
              explanation: "Section 8(1) explicitly states the Data Fiduciary is responsible for compliance 'irrespective of any agreement to the contrary' — it cannot contractually escape liability by blaming its processor.",
            },
          ],
        },
        {
          id: "section-9",
          number: "9",
          title: "Processing of personal data of children",
          content: `(1) The Data Fiduciary shall, before processing any personal data of a child or a person with disability who has a lawful guardian, obtain verifiable consent of the parent of such child or the lawful guardian, as the case may be, in such manner as may be prescribed.

(2) The Data Fiduciary shall not undertake such processing of personal data that is likely to cause any detrimental effect on the well-being of a child.

(3) Subject to such conditions as may be prescribed, the Data Fiduciary shall not undertake tracking or behavioural monitoring of children or targeted advertising directed at children.

(4) The Central Government may, having regard to the circumstances specified under sub-section (5), by notification, exempt a class of Data Fiduciaries from the obligation under sub-section (1), or modify the obligation under sub-section (1) to use a different age.

(5) The circumstances referred to in sub-section (4) are—
(a) the class of Data Fiduciary is processing data in a manner that does not cause harm to children; or
(b) the Data Fiduciary is a health care or educational institution processing personal data of a child for the welfare of the child.`,
          relatedGDPR: ["Article 8 - Conditions applicable to child's consent in relation to information society services", "Recital 38 - Special protection of children's personal data"],
          relatedRules: ["Rule 10 - Processing of children's data"],
          flashcards: [
            { front: "What age defines a 'child' under DPDPA?", back: "Any individual who has not completed the age of 18 years — unlike GDPR which allows EU member states to set it between 13 and 16 years" },
            { front: "Can a healthcare app process a child's medical data without parental consent?", back: "Potentially yes — Section 9(5)(b) allows exemption for healthcare institutions processing data of a child for the child's welfare, subject to prescribed conditions" },
            { front: "Is targeted advertising to children allowed under DPDPA?", back: "No — Section 9(3) explicitly prohibits tracking, behavioural monitoring of children, and targeted advertising directed at children" },
          ],
          quiz: [
            {
              question: "An educational app for students processes data of a 15-year-old without parental consent. Under which circumstance might this be permissible?",
              options: [
                "Never — parental consent is always mandatory for under-18s",
                "If the Central Government has exempted educational institutions processing data for children's welfare",
                "If the student themselves consents",
                "Only if processing is automated and involves no human decision-making",
              ],
              answer: 1,
              explanation: "Section 9(4) and 9(5)(b) allow the Central Government to exempt educational institutions from the verifiable parental consent requirement when processing is for the welfare of the child.",
            },
          ],
        },
        {
          id: "section-10",
          number: "10",
          title: "Additional obligations of Significant Data Fiduciary",
          content: `(1) The Central Government may, having regard to the volume and sensitivity of personal data processed, risk to the rights of Data Principals, potential impact on the sovereignty and integrity of India, risk to electoral democracy, security of the State, or public order, notify any Data Fiduciary or class of Data Fiduciaries as Significant Data Fiduciaries.

(2) Every Significant Data Fiduciary shall—
(a) appoint a Data Protection Officer who shall—
    (i) represent the Significant Data Fiduciary before the Board;
    (ii) be based in India; and
    (iii) be an individual responsible to the Board of Directors or similar governing body of the Significant Data Fiduciary;
(b) appoint an independent Data Auditor to evaluate the compliance of the Significant Data Fiduciary; and
(c) undertake such other measures as may be prescribed, such as—
    (i) periodic Data Protection Impact Assessment, being a process comprising description of the rights and interests of Data Principals and an assessment of the risk to such rights and interests arising out of the processing of personal data and the measures to address such risks;
    (ii) periodic audit; and
    (iii) such other measures as may be prescribed.`,
          relatedGDPR: ["Article 37 - Designation of the data protection officer", "Article 38 - Position of the data protection officer", "Article 35 - Data protection impact assessment"],
          relatedRules: ["Rule 11 - Significant Data Fiduciary"],
          flashcards: [
            { front: "What criteria does the government consider when designating a Significant Data Fiduciary?", back: "Volume and sensitivity of data processed, risk to Data Principal rights, potential impact on sovereignty/integrity of India, risk to electoral democracy, security of the State, or public order" },
            { front: "Where must a Data Protection Officer of an SDF be based?", back: "In India — the DPO must be based in India and be accountable to the SDF's Board of Directors (not just management)" },
            { front: "What is a Data Protection Impact Assessment (DPIA)?", back: "A periodic process describing: (i) rights and interests of Data Principals, and (ii) assessment of risk to those rights arising from the processing, plus measures to address those risks" },
          ],
          quiz: [
            {
              question: "A Significant Data Fiduciary's Data Protection Officer must be:",
              options: [
                "A lawyer with at least 10 years of experience",
                "Based in India and accountable to the Board of Directors or similar governing body",
                "Appointed by the Data Protection Board of India",
                "A citizen of India holding a government security clearance",
              ],
              answer: 1,
              explanation: "Section 10(2)(a) specifies the DPO must be based in India and be accountable to the Board of Directors or similar governing body. The law does not prescribe specific qualifications — those may be addressed in Rules.",
            },
          ],
        },
      ],
    },

    // ══════════════════════════════════════════════════════
    // CHAPTER III — RIGHTS AND DUTIES OF DATA PRINCIPAL
    // ══════════════════════════════════════════════════════
    {
      id: "chapter-3",
      number: 3,
      title: "Rights and Duties of Data Principal",
      sections: [
        {
          id: "section-11",
          number: "11",
          title: "Right to access information about personal data",
          content: `(1) A Data Principal shall have the right to obtain from the Data Fiduciary to whom she has previously given consent, including consent as referred to in clause (a) of section 7, upon making to it a request in such manner as may be prescribed—
(a) a summary of the personal data being processed by the Data Fiduciary and the processing activities undertaken by that Data Fiduciary with respect to such personal data;
(b) the identities of all other Data Fiduciaries and data processors with whom the personal data has been shared by such Data Fiduciary, along with a description of the personal data so shared; and
(c) any other information related to the personal data of such Data Principal and its processing, as may be prescribed.

(2) A Data Fiduciary shall respond to a request made by a Data Principal under sub-section (1) within the period as may be prescribed.

(3) A consent manager shall, upon request by a Data Principal, provide her with a log of all consents given or withdrawn by her to or in respect of Data Fiduciaries through such consent manager.`,
          relatedGDPR: ["Article 15 - Right of access by the data subject"],
          relatedRules: ["Rule 12 - Right to access"],
          flashcards: [
            { front: "What three things can a Data Principal access under §11?", back: "1) Summary of personal data being processed and processing activities, 2) Identities of other Fiduciaries/processors with whom data was shared, 3) Any other prescribed information" },
            { front: "Who else besides the Data Fiduciary must provide information under §11?", back: "A Consent Manager must provide a log of all consents given or withdrawn by the Data Principal on request" },
          ],
          quiz: [
            {
              question: "Under Section 11, which of the following can a Data Principal NOT demand?",
              options: [
                "Summary of personal data being processed",
                "Identities of third parties with whom data was shared",
                "Deletion of all personal data immediately and without conditions",
                "Any other information prescribed by rules",
              ],
              answer: 2,
              explanation: "Section 11 is the right to *access information*. The right to erasure/deletion is governed by Section 12. Section 11 does not grant unconditional deletion rights.",
            },
          ],
        },
        {
          id: "section-12",
          number: "12",
          title: "Right to correction and erasure of personal data",
          content: `(1) A Data Principal shall have the right to—
(a) correction of inaccurate or misleading personal data;
(b) completion of incomplete personal data;
(c) updating of personal data; and
(d) erasure of personal data that the Data Principal no longer wishes to be processed by the Data Fiduciary, unless such retention is necessary for the specified purpose or compliance with any applicable law.

(2) Every Data Fiduciary shall, upon receipt of a request made by a Data Principal under sub-section (1), as the case may be—
(a) correct or complete or update the personal data of the Data Principal; or
(b) erase the personal data of the Data Principal unless retention of such personal data is necessary for the specified purpose or compliance with any applicable law.

(3) Where a Data Fiduciary has shared the personal data of a Data Principal with any other Data Fiduciary, and the Data Principal wishes to correct, complete, update or erase such personal data, the Data Fiduciary shall, upon request of the Data Principal or of its own accord, intimate such other Data Fiduciary of the correction, completion, updation or erasure, as the case may be, of the personal data, and such other Data Fiduciary shall also correct, complete, update or erase the personal data of the Data Principal.`,
          relatedGDPR: ["Article 16 - Right to rectification", "Article 17 - Right to erasure ('right to be forgotten')"],
          relatedRules: ["Rule 13 - Right to correction and erasure"],
          flashcards: [
            { front: "What four actions does the §12 right cover?", back: "Correction of inaccurate/misleading data, Completion of incomplete data, Updating of outdated data, and Erasure of data no longer needed" },
            { front: "If a Fiduciary shared data with a third party and the Data Principal requests erasure, what happens?", back: "Section 12(3) requires the Fiduciary to notify the third party Fiduciary, which must also correct, complete, update or erase the data" },
          ],
          quiz: [
            {
              question: "A Data Principal requests erasure of their data. Can the Data Fiduciary refuse?",
              options: [
                "No — erasure must always be granted immediately",
                "Yes — if retention is still necessary for the specified purpose or required by applicable law",
                "Yes — if the Data Fiduciary has commercially valuable uses for the data",
                "No — DPDPA has an absolute right to erasure with no exceptions",
              ],
              answer: 1,
              explanation: "Section 12(1)(d) grants erasure rights but only for data 'no longer necessary for the purpose for which it was processed, or the period has expired.' Retention for the original purpose or legal requirements is a valid basis to decline erasure.",
            },
          ],
        },
        {
          id: "section-13",
          number: "13",
          title: "Right of grievance redressal",
          content: `(1) A Data Principal shall have the right to have readily available means of grievance redressal provided by a Data Fiduciary or consent manager, in respect of any act or omission of such Data Fiduciary or consent manager regarding the performance of its obligations in relation to the personal data of such Data Principal or the exercise of her rights under the provisions of this Act.

(2) Every Data Fiduciary and consent manager shall—
(a) establish an effective mechanism to redress the grievances of the Data Principals; and
(b) respond to the grievances of a Data Principal within the period and in the manner as may be prescribed.

(3) A Data Principal may, after the expiry of the period specified under sub-section (2), or if she is not satisfied with the response received, file a complaint with the Board.`,
          relatedGDPR: ["Article 77 - Right to lodge a complaint with a supervisory authority"],
          relatedRules: ["Rule 14 - Grievance redressal"],
          flashcards: [
            { front: "What is the escalation path for a Data Principal's grievance?", back: "Step 1: File with Data Fiduciary/Consent Manager → Step 2: If no response or unsatisfied with response → File complaint with the Data Protection Board" },
            { front: "Can a Data Principal go directly to court without using the Board?", back: "No — Section 39 bars civil courts from hearing matters where the Board has jurisdiction. The grievance→Board→Appellate Tribunal→Supreme Court path must be followed" },
          ],
          quiz: [
            {
              question: "A Data Principal is unhappy with a Fiduciary's response to their grievance. What is the correct next step?",
              options: [
                "File a civil suit in the district court immediately",
                "File a complaint with the Data Protection Board of India",
                "Write to the Ministry of Electronics and Information Technology",
                "Approach the consumer court under the Consumer Protection Act",
              ],
              answer: 1,
              explanation: "Section 13(3) directs dissatisfied Data Principals to the Board after the prescribed period or an unsatisfactory response. Section 39 bars civil courts from matters within the Board's jurisdiction.",
            },
          ],
        },
        {
          id: "section-14",
          number: "14",
          title: "Right to nominate",
          content: `(1) A Data Principal shall have the right to nominate, in such manner as may be prescribed, any other individual who shall, in the event of the death or incapacity of the Data Principal, exercise the rights of the Data Principal in accordance with the provisions of this Act.

(2) The individual so nominated under sub-section (1) shall, upon the death or incapacity of the Data Principal, exercise the rights of the Data Principal under the provisions of this Act.`,
          relatedGDPR: [],
          relatedRules: ["Rule 15 - Right to nominate"],
          flashcards: [
            { front: "What is the right to nominate under §14?", back: "A Data Principal may designate a nominee who will exercise their data protection rights (access, correction, erasure etc.) in the event of the Data Principal's death or incapacity" },
            { front: "DPDPA's right to nominate is unique because:", back: "GDPR has no equivalent provision — DPDPA's §14 is India-specific, reflecting the importance of digital data rights continuing beyond a person's lifetime or legal capacity" },
          ],
          quiz: [
            {
              question: "Under Section 14, who can exercise a deceased Data Principal's rights?",
              options: [
                "Only the legal heirs of the Data Principal",
                "Only the executor of the will",
                "The nominee designated by the Data Principal in the prescribed manner",
                "No one — data rights extinguish upon death",
              ],
              answer: 2,
              explanation: "Section 14(2) specifically enables the nominated individual to exercise the Data Principal's rights upon death or incapacity — it is the nominee, not heirs generally, who is empowered.",
            },
          ],
        },
        {
          id: "section-15",
          number: "15",
          title: "Duties of Data Principal",
          content: `(1) Every Data Principal shall, while exercising the rights under this Act, comply with the provisions of all applicable laws.

(2) No Data Principal shall—
(a) register a false or frivolous grievance or complaint with a Data Fiduciary or the Board;
(b) provide any false particulars or suppress any material information or impersonate another person in specified circumstances;
(c) impersonate another person while providing personal data for any specified purpose; or
(d) suppress any material information while exercising the right to correction under section 12.

(3) A Data Principal who fails to comply with the duties under this section shall be liable to a penalty as specified in the Schedule.`,
          relatedGDPR: [],
          relatedRules: [],
          flashcards: [
            { front: "Can a Data Principal be penalised under DPDPA?", back: "Yes — Section 15 imposes duties on Data Principals. Breach (e.g., filing false grievances, impersonation) attracts a penalty of up to ₹10,000 per the Schedule" },
            { front: "Why does DPDPA impose duties on Data Principals?", back: "To prevent misuse of data rights — false complaints or impersonation could burden Fiduciaries and the Board. The Act balances rights with responsibilities" },
          ],
          quiz: [
            {
              question: "A Data Principal files multiple frivolous complaints against a Fiduciary. What penalty can they face?",
              options: [
                "No penalty — Data Principals are protected from any liability",
                "Penalty up to ₹10,000 under the Schedule for breach of duties under §15",
                "Penalty up to ₹50 crore — same as Fiduciaries",
                "Criminal prosecution under IPC",
              ],
              answer: 1,
              explanation: "The Schedule specifies that breach of duties under Section 15 (including filing false/frivolous grievances) attracts a penalty of up to ₹10,000 — much lower than penalties on Fiduciaries, reflecting the asymmetry of the relationship.",
            },
          ],
        },
      ],
    },

    // ══════════════════════════════════════════════════════
    // CHAPTER IV — SPECIAL PROVISIONS
    // ══════════════════════════════════════════════════════
    {
      id: "chapter-4",
      number: 4,
      title: "Special Provisions",
      sections: [
        {
          id: "section-16",
          number: "16",
          title: "Restriction on transfer of personal data outside India",
          content: `(1) The Central Government may, after an assessment of such factors as it may consider necessary, restrict the transfer of personal data by a Data Fiduciary for processing to such country or territory outside India as may be so notified.

(2) Nothing contained in sub-section (1) shall affect the application of any law for the time being in force in India that provides for a higher degree of protection for or restriction on transfer of personal data by a Data Fiduciary outside India in relation to any personal data or Data Fiduciary or class thereof.`,
          relatedGDPR: ["Article 44 - General principle for transfers", "Article 45 - Transfers on the basis of an adequacy decision", "Article 46 - Transfers subject to appropriate safeguards"],
          relatedRules: ["Rule 16 - Cross-border transfers"],
          flashcards: [
            { front: "How does DPDPA's cross-border transfer model differ from GDPR?", back: "GDPR uses a 'whitelist' (adequacy decisions, SCCs) approach. DPDPA uses a 'blacklist' approach — transfers are permitted by default unless the Central Government restricts specific countries" },
            { front: "Can India's other laws impose stricter transfer restrictions?", back: "Yes — Section 16(2) preserves the application of other laws that provide higher protection or stricter restrictions on cross-border transfers" },
          ],
          quiz: [
            {
              question: "Under DPDPA, cross-border transfer of personal data is:",
              options: [
                "Prohibited unless the destination country is whitelisted by the Central Government",
                "Permitted by default, subject to the Central Government's power to restrict specific countries",
                "Subject to standard contractual clauses similar to GDPR",
                "Only allowed to countries with adequacy decisions from India",
              ],
              answer: 1,
              explanation: "Section 16 adopts a 'blacklist' model: transfers are permitted unless the Central Government notifies a restriction. This is the opposite of GDPR's whitelist/adequacy approach.",
            },
          ],
        },
        {
          id: "section-17",
          number: "17",
          title: "Exemptions",
          content: `(1) The Central Government may, in the interest of sovereignty and integrity of India, security of the State, friendly relations with foreign States, maintenance of public order or preventing incitement to any cognisable offence relating to any of these, by notification, exempt any instrumentality of the State from the application of provisions of this Act.

(2) The provisions of Chapter III and section 16 shall not apply where processing of personal data is necessary for—
(a) enforcement of any legal right or claim;
(b) any judicial or quasi-judicial function;
(c) prevention, detection, investigation or prosecution of any offence or contravention of any law for the time being in force in India;
(d) matters relating to sovereignty and integrity of India or security of the State; or
(e) research, archiving or statistical purposes, in accordance with such standards as may be prescribed, if personal data is not used to take any decision specific to a Data Principal and such processing is carried on in accordance with such standards as may be prescribed.

(3) The Central Government may, by notification, exempt such class of Data Fiduciaries or such processing of personal data as it may consider necessary, having regard to the volume and nature of personal data processed, for the purposes of—
(a) research, archiving or statistical purposes; or
(b) any other purpose as may be specified.

(4) Nothing in this Act shall apply to—
(a) personal data processed by any person in the course of any personal or domestic purpose;
(b) any person in respect of personal data processed by or on behalf of any competent authority in connection with the performance of any function of Parliament or of a State Legislature; and
(c) processing by an individual for personal or household activity.`,
          relatedGDPR: ["Article 23 - Restrictions", "Article 85 - Processing and freedom of expression and information", "Article 89 - Safeguards and derogations relating to processing for archiving purposes in the public interest"],
          relatedRules: ["Rule 17 - Exemptions"],
          flashcards: [
            { front: "What is exempt from Chapter III (rights of Data Principals) under §17?", back: "Processing for: enforcement of legal rights/claims, judicial/quasi-judicial functions, prevention/investigation of offences, national security/sovereignty, and prescribed research/archiving/statistical purposes" },
            { front: "Can the government access anyone's data without giving them access rights?", back: "Yes — §17(1) allows the Central Government to exempt State instrumentalities from DPDPA provisions for national security, sovereignty, friendly relations with foreign states, and public order" },
          ],
          quiz: [
            {
              question: "A law enforcement agency processes personal data for investigating a cybercrime. Do Data Principals' Chapter III rights apply?",
              options: [
                "Yes — all DPDPA rights always apply",
                "No — Section 17 exempts such processing from Chapter III rights as it involves prevention/investigation of offences",
                "Only if the data was originally collected with consent",
                "Only rights under §11 (access) apply, not §12 (correction/erasure)",
              ],
              answer: 1,
              explanation: "Section 17(2)(c) carves out an exemption for 'prevention, detection, investigation or prosecution of any offence or contravention of any law' — law enforcement processing falls outside Chapter III rights.",
            },
          ],
        },
      ],
    },

    // ══════════════════════════════════════════════════════
    // CHAPTER V — DATA PROTECTION BOARD OF INDIA
    // ══════════════════════════════════════════════════════
    {
      id: "chapter-5",
      number: 5,
      title: "Data Protection Board of India",
      sections: [
        {
          id: "section-18",
          number: "18",
          title: "Establishment of Data Protection Board of India",
          content: `(1) With effect from such date as the Central Government may, by notification, appoint, there shall be established, for the purposes of this Act, a Board to be called the Data Protection Board of India.

(2) The Board shall be a body corporate by the name aforesaid, having perpetual succession and a common seal, with power, subject to the provisions of this Act, to acquire, hold and dispose of property, both movable and immovable, and to contract and shall, by the said name, sue or be sued.

(3) The Board shall consist of such number of Members as the Central Government may notify.

(4) The Board shall be a digital office.

(5) Notwithstanding anything contained in this section, the Central Government may, by notification, constitute an interim Board until the Board is established under sub-section (1), consisting of such members and having such powers as the Central Government may notify.`,
          relatedGDPR: ["Article 51 - Supervisory authority", "Article 52 - Independence"],
          relatedRules: ["Rule 18 - Establishment of Board"],
          flashcards: [
            { front: "What type of legal entity is the Data Protection Board of India?", back: "A body corporate with perpetual succession, a common seal, and the capacity to sue and be sued in its own name" },
            { front: "How does the DPDPA Board operate procedurally?", back: "It functions as a 'digital office' — all proceedings from receipt of complaints to disposal are conducted online or by digital means" },
          ],
          quiz: [
            {
              question: "The Data Protection Board of India is best described as:",
              options: [
                "A ministry under the Central Government",
                "A body corporate functioning as a digital office",
                "A judicial tribunal equivalent to a High Court",
                "An advisory committee with recommendatory powers only",
              ],
              answer: 1,
              explanation: "Section 18 establishes the Board as a body corporate (legal person) that functions as a digital office — it has quasi-judicial powers but is not a court. Appeals from its orders go to the Telecom Disputes Settlement and Appellate Tribunal.",
            },
          ],
        },
        {
          id: "section-19",
          number: "19",
          title: "Composition and qualifications for appointment of Chairperson and Members",
          content: `(1) The Chairperson and Members shall be appointed by the Central Government in such manner as the Central Government may notify.

(2) The Chairperson and other Members shall be appointed in such manner as may be prescribed.

(3) The Chairperson and other Members shall be a person of ability, integrity and standing who possesses special knowledge or practical experience in the fields of data governance, administration or implementation of laws related to social or consumer protection, dispute resolution, information and communication technology, digital economy, law, regulation or techno-regulation, or in any other field which in the opinion of the Central Government may be useful to the Board, and at least one among them shall be an expert in the field of law.`,
          relatedGDPR: ["Article 53 - General conditions for the members of the supervisory authority"],
          relatedRules: ["Rule 19 - Qualifications of Board Members"],
        },
        {
          id: "section-20",
          number: "20",
          title: "Salary, allowances payable to and term of office of Chairperson and Members",
          content: `(1) The salary, allowances and other terms and conditions of service of the Chairperson and other Members shall be such as may be prescribed, and shall not be varied to their disadvantage after their appointment.

(2) The Chairperson and other Members shall hold office for such period as may be prescribed and shall be eligible for re-appointment.`,
          relatedGDPR: [],
          relatedRules: ["Rule 20 - Term and salary of Board Members"],
        },
        {
          id: "section-21",
          number: "21",
          title: "Disqualifications for appointment and continuation as Chairperson and Members of Board",
          content: `(1) A person shall be disqualified for being appointed and continued as the Chairperson or a Member, if she—
(a) is, or at any time has been, adjudged as an insolvent;
(b) has been convicted of an offence which, in the opinion of the Central Government, involves moral turpitude;
(c) is of unsound mind and stands so declared by a competent court;
(d) has acquired such financial or other interest as is likely to affect prejudicially her functions as a Member; or
(e) has so abused her position as to render her continuance in office prejudicial to the public interest.

(2) The Chairperson or a Member shall not be removed from her office on the ground specified in clause (d) or clause (e) of sub-section (1) unless the Central Government unless she has been given an opportunity of being heard in the matter.`,
          relatedGDPR: [],
          relatedRules: [],
        },
        {
          id: "section-22",
          number: "22",
          title: "Resignation by Members and filling of vacancy",
          content: `(1) The Chairperson or any other Member may, by notice in writing under her hand addressed to the Central Government, resign from her office, and such resignation shall be effective from the date on which the Central Government permits her to relinquish office, or upon expiry of a period of three months from the date of receipt of such notice, or upon a duly appointed successor entering upon her office, or upon the expiry of the term of her office, whichever is earliest.

(2) A vacancy caused by the resignation or removal or death of the Chairperson or any other Member, or otherwise, shall be filled by fresh appointment in accordance with the provisions of this Act.

(3) The Chairperson and other Members shall not, for a period of two years from the date on which they cease to hold such office, except with the previous approval of the Central Government, accept any employment, and shall also disclose to the Central Government any subsequent acceptance of employment with any Data Fiduciary against whom proceedings were initiated by or before such Chairperson or other Member.`,
          relatedGDPR: [],
          relatedRules: [],
        },
        {
          id: "section-23",
          number: "23",
          title: "Proceedings of Board",
          content: `(1) The Board shall meet at such times and places and shall observe such rules of procedure in regard to the transaction of business at its meetings, including by digital means, and authenticate its orders, directions and instruments in such manner as may be prescribed.

(2) No act or proceeding of the Board shall be invalid merely by reason of—
(a) any vacancy in, or any defect in the constitution of, the Board; or
(b) any defect in the appointment of a person acting as a Chairperson or a Member of the Board; or
(c) any irregularity in the procedure of the Board not affecting the merits of the case.

(3) In the event of the occurrence of a vacancy in the office of the Chairperson by reason of her death, resignation or otherwise, or in the event of the Chairperson being unable to discharge her functions owing to absence, illness or any other cause, the senior-most Member shall discharge the functions of the Chairperson until the date on which the Chairperson resumes her duties.`,
          relatedGDPR: [],
          relatedRules: [],
        },
        {
          id: "section-24",
          number: "24",
          title: "Officers and employees of Board",
          content: `The Board may, with previous approval of the Central Government, appoint such officers and employees as it may deem necessary for the efficient discharge of its functions under the provisions of this Act, on such terms and conditions of appointment and service as may be prescribed.`,
          relatedGDPR: [],
          relatedRules: [],
        },
        {
          id: "section-25",
          number: "25",
          title: "Members and officers to be public servants",
          content: `The Chairperson, Members, officers and employees of the Board shall be deemed, when acting or purporting to act in pursuance of provisions of this Act, to be public servants within the meaning of section 21 of the Indian Penal Code.`,
          relatedGDPR: [],
          relatedRules: [],
        },
        {
          id: "section-26",
          number: "26",
          title: "Powers of Chairperson",
          content: `The Chairperson shall exercise the following powers, namely:—
(a) superintendence, direction and control in all administrative matters of the Board;
(b) all correspondence, reference or correspondence addressed to the Board; and
(c) allocation and distribution of its proceedings, by an individual Member or groups of Members and to allocate proceedings among them.`,
          relatedGDPR: [],
          relatedRules: [],
        },
      ],
    },

    // ══════════════════════════════════════════════════════
    // CHAPTER VI — POWERS, FUNCTIONS AND PROCEDURE TO BE FOLLOWED BY BOARD
    // ══════════════════════════════════════════════════════
    {
      id: "chapter-6",
      number: 6,
      title: "Powers, Functions and Procedure to be Followed by Board",
      sections: [
        {
          id: "section-27",
          number: "27",
          title: "Powers and functions of Board",
          content: `(1) The Board shall have the following powers and functions, namely:—
(a) on receipt of a complaint from a Data Principal under sub-section (3) of section 13, to direct any urgent remedial or mitigation measures in the event of a personal data breach, and to inquire into such personal data breach and impose penalty as provided in this Act;
(b) on receipt of a complaint from a Data Principal or a reference made to it by the Central Government or a State Government, or in compliance of the directions of any court, to inquire into a breach in observance by a Data Fiduciary of its obligations in relation to her personal data or the exercise of her rights under the provisions of this Act;
(c) to refer any complaint to alternate dispute resolution mechanisms under the laws for the time being in force, if such complaint has arisen out of a breach of contract between a Data Principal and a Data Fiduciary;
(d) to impose penalties in accordance with the provisions of this Act; and
(e) such other functions as may be prescribed.

(2) For the purposes of carrying out its functions under this Act, the Board shall have powers to—
(a) call for information from any Data Fiduciary, data processor or consent manager;
(b) conduct an inquiry into any personal data breach or into any complaint of a Data Principal;
(c) issue directions to Data Fiduciaries, data processors or consent managers as it considers necessary and appropriate;
(d) impose penalties as specified in the Schedule; and
(e) take such measures as it considers necessary to protect the interests of Data Principals.

(3) An order of the Board shall be complied with by every person to whom such order is addressed, within the period specified in such order.

(4) The Board may, in the exercise of its powers under this Act, make such interim orders as it considers necessary and appropriate.`,
          relatedGDPR: ["Article 57 - Tasks", "Article 58 - Powers"],
          relatedRules: ["Rule 27 - Functions of Board"],
        },
        {
          id: "section-28",
          number: "28",
          title: "Procedure to be followed by Board",
          content: `(1) The Board shall, upon receipt of a complaint from a Data Principal under sub-section (3) of section 13, give a notice to the concerned Data Fiduciary or consent manager and after giving them an opportunity of being heard, inquire into the complaint.

(2) The Board shall follow such procedure as may be prescribed and shall, while conducting an inquiry, follow the principles of natural justice.

(3) Notwithstanding anything in any other law for the time being in force, the Board shall have the same powers as are vested in a civil court under the Code of Civil Procedure, 1908, for the purposes of—
(a) summoning and enforcing the attendance of any person and examining them on oath;
(b) requiring the discovery and production of documents;
(c) receiving evidence on affidavits;
(d) issuing commissions for the examination of witnesses or documents;
(e) requiring any public record or document or copy of such record or document from any office; and
(f) any other matters as may be prescribed.

(4) In the course of proceedings before it, the Board may—
(a) obtain any information as it considers necessary from any person concerned;
(b) call upon any expert to provide technical or other expert assistance; or
(c) seek such other information as it may deem fit.

(5) The Board shall, to the extent possible, endeavour to complete inquiry in a time-bound manner.

(6) If, at any stage of the proceedings before it, the Board is of the opinion that any complaint may be resolved by mediation, it may, with the consent of the parties involved, refer such complaint to mediation.

(7) Every proceeding before the Board shall be deemed to be a judicial proceeding within the meaning of sections 193 and 228, and for the purpose of section 196, of the Indian Penal Code, and the Board shall be deemed to be a civil court for the purposes of section 195 and Chapter XXVI of the Code of Criminal Procedure, 1973.`,
          relatedGDPR: ["Article 58 - Powers", "Article 83 - General conditions for imposing administrative fines"],
          relatedRules: ["Rule 28 - Inquiry procedure"],
        },
      ],
    },

    // ══════════════════════════════════════════════════════
    // CHAPTER VII — APPEAL AND ALTERNATE DISPUTE RESOLUTION
    // ══════════════════════════════════════════════════════
    {
      id: "chapter-7",
      number: 7,
      title: "Appeal and Alternate Dispute Resolution",
      sections: [
        {
          id: "section-29",
          number: "29",
          title: "Appeal to Appellate Tribunal",
          content: `(1) Any person aggrieved by an order or direction made by the Board under this Act may prefer an appeal before the Appellate Tribunal.

(2) Every appeal under sub-section (1) shall be filed within sixty days from the date of receipt of the order or direction appealed against and it shall be in such form and manner and shall be accompanied by such fee as may be prescribed.

(3) The Appellate Tribunal may entertain an appeal after the expiry of the period specified in sub-section (2), if it is satisfied that the appellant was prevented by sufficient cause from filing the appeal within that period.

(4) On receipt of an appeal under sub-section (1), the Appellate Tribunal may, after giving the parties to the appeal, an opportunity of being heard, pass such orders thereon as it thinks fit, confirming, modifying or setting aside the order appealed against.

(5) The Appellate Tribunal shall send a copy of every order made by it to the Board and to the parties to the appeal.

(6) The appeal filed before the Appellate Tribunal under sub-section (1) shall be dealt with by it as expeditiously as possible and endeavour shall be made by it to dispose of the appeal finally within six months from the date on which the appeal is presented to it.

(7) If the appeal could not be disposed of within the period of six months, the Appellate Tribunal shall record its reasons in writing for not disposing of the appeal within that period.

(8) Without prejudice to the provisions of section 14A and section 16 of the Telecom Regulatory Authority of India Act, 1997, the Appellate Tribunal shall deal with an appeal under this section in accordance with such procedure as may be prescribed.

(9) Where an appeal is filed against the orders of the Appellate Tribunal under this Act, the provisions of section 18 of the Telecom Regulatory Authority of India Act, 1997 shall apply.

(10) The Appellate Tribunal shall, as far as practicable, function as a digital office, with the receipt of appeal, hearing and pronouncement of decisions in respect of the same being digital by design.`,
          relatedGDPR: ["Article 78 - Right to an effective judicial remedy against a supervisory authority"],
          relatedRules: ["Rule 29 - Appeals"],
        },
        {
          id: "section-30",
          number: "30",
          title: "Orders passed by Appellate Tribunal to be executable as decree",
          content: `(1) An order passed by the Appellate Tribunal under this Act shall be executable by it as a decree of civil court, and for this purpose, the Appellate Tribunal shall have all the powers of a civil court.

(2) Notwithstanding anything contained in sub-section (1), the Appellate Tribunal may transmit any order made by it to a civil court having local jurisdiction and such civil court shall execute the order as if it were a decree made by that court.`,
          relatedGDPR: [],
          relatedRules: [],
        },
        {
          id: "section-31",
          number: "31",
          title: "Alternate dispute resolution",
          content: `If the Board is of the opinion that any complaint may be resolved by mediation, it may direct the parties to resort to mediation under the laws for the time being in force, and the complaint shall, upon consent of the parties, stand referred to mediation.`,
          relatedGDPR: [],
          relatedRules: [],
        },
        {
          id: "section-32",
          number: "32",
          title: "Voluntary undertaking",
          content: `(1) The Board may, at any time during the proceedings under this Act, accept a voluntary undertaking from any person in relation to any act or omission that is the subject of such proceedings.

(2) Where the Board accepts a voluntary undertaking, it shall suspend the proceedings relating to the act or omission in respect of which the voluntary undertaking has been given.

(3) An undertaking accepted by the Board under sub-section (1) shall be published in such manner as may be prescribed.

(4) If the person who gave the voluntary undertaking fails to comply with any of the terms of the voluntary undertaking, the Board may—
(a) resume the proceedings that were suspended; and
(b) impose penalty in accordance with the provisions of this Act.`,
          relatedGDPR: [],
          relatedRules: [],
        },
      ],
    },

    // ══════════════════════════════════════════════════════
    // CHAPTER VIII — PENALTIES AND ADJUDICATION
    // ══════════════════════════════════════════════════════
    {
      id: "chapter-8",
      number: 8,
      title: "Penalties and Adjudication",
      sections: [
        {
          id: "section-33",
          number: "33",
          title: "Penalties",
          content: `(1) Where the Board, after an inquiry held by it under this Act, is satisfied that the breach of any provision of this Act or the rules made thereunder by a person is significant, it may, after giving the person an opportunity of being heard, impose such monetary penalty specified in the Schedule as it considers appropriate.

(2) While determining the monetary penalty to be imposed under sub-section (1), the Board shall have due regard to—
(a) the nature, gravity and duration of the breach and the type and nature of the personal data affected by such breach;
(b) the repetitive nature of the breach;
(c) whether the person, as a result of the breach, has realised a gain or avoided a loss;
(d) whether the person took any action to mitigate the effects and consequences of the breach, and the timeliness and effectiveness of such action;
(e) whether the monetary penalty to be imposed is proportionate and effective in relation to the need to secure observance of and deter breach of the provisions of this Act; and
(f) the financial capacity of the person.`,
          relatedGDPR: ["Article 83 - General conditions for imposing administrative fines", "Article 84 - Penalties"],
          relatedRules: ["Schedule - Penalties"],
          flashcards: [
            { front: "What is the maximum penalty under DPDPA and for what breach?", back: "₹250 crore — for breach of security safeguard obligations under §8(5) (Schedule Item 1)" },
            { front: "What seven factors guide penalty quantum under §33?", back: "1) Nature, gravity, duration; 2) Type of data affected; 3) Repetition; 4) Gain/loss avoided; 5) Mitigation measures taken; 6) Proportionality for deterrence; 7) Financial capacity of the violator" },
            { front: "How does DPDPA's maximum penalty compare to GDPR?", back: "GDPR: up to €20 million or 4% of global annual turnover. DPDPA: up to ₹250 crore (~€27 million). DPDPA is not turnover-based, which may make it less impactful for large global companies" },
          ],
          quiz: [
            {
              question: "A company fails to notify the Board and affected Data Principals of a personal data breach. The maximum penalty is:",
              options: [
                "₹250 crore (Schedule Item 1 — security safeguard breach)",
                "₹200 crore (Schedule Item 2 — breach notification failure)",
                "₹150 crore (Schedule Item 4 — SDF obligations)",
                "₹50 crore (Schedule Item 7 — general breach)",
              ],
              answer: 1,
              explanation: "Schedule Item 2 specifically penalises 'breach in observing the obligation to give the Board or affected Data Principal notice of a personal data breach under §8(6)' with a penalty up to ₹200 crore.",
            },
          ],
        },
        {
          id: "section-34",
          number: "34",
          title: "Crediting sums realised by way of penalties to Consolidated Fund of India",
          content: `All sums realised by way of penalties imposed by the Board under this Act, shall be credited to the Consolidated Fund of India.

THE SCHEDULE
[See section 33(1)]

| Sl. No. | Breach of provisions of this Act or rules made thereunder | Penalty |
|---------|----------------------------------------------------------|---------|
| 1. | Breach in observing the obligation of Data Fiduciary to take reasonable security safeguards to prevent personal data breach under sub-section (5) of section 8. | May extend to two hundred and fifty crore rupees. |
| 2. | Breach in observing the obligation to give the Board or affected Data Principal notice of a personal data breach under sub-section (6) of section 8. | May extend to two hundred crore rupees. |
| 3. | Breach in observance of additional obligations in relation to children under section 9. | May extend to two hundred crore rupees. |
| 4. | Breach in observance of additional obligations of Significant Data Fiduciary under section 10. | May extend to one hundred and fifty crore rupees. |
| 5. | Breach in observance of the duties under section 15. | May extend to ten thousand rupees. |
| 6. | Breach of any term of voluntary undertaking accepted by the Board under section 32. | Up to the extent applicable for the breach in respect of which the proceedings under section 28 were instituted. |
| 7. | Breach of any other provision of this Act or the rules made thereunder. | May extend to fifty crore rupees. |`,
          relatedGDPR: ["Article 83 - General conditions for imposing administrative fines"],
          relatedRules: [],
        },
      ],
    },

    // ══════════════════════════════════════════════════════
    // CHAPTER IX — MISCELLANEOUS
    // ══════════════════════════════════════════════════════
    {
      id: "chapter-9",
      number: 9,
      title: "Miscellaneous",
      sections: [
        {
          id: "section-35",
          number: "35",
          title: "Protection of action taken in good faith",
          content: `No suit, prosecution or other legal proceedings shall lie against the Central Government, the Board, its Chairperson and any Member, officer or employee thereof for anything which is done or intended to be done in good faith under the provisions of this Act or the rules made thereunder.`,
          relatedGDPR: [],
          relatedRules: [],
        },
        {
          id: "section-36",
          number: "36",
          title: "Power of Central Government to call for information",
          content: `The Central Government may, for the purposes of this Act, require the Board and any Data Fiduciary or intermediary to furnish such information as it may call for.`,
          relatedGDPR: [],
          relatedRules: [],
        },
        {
          id: "section-37",
          number: "37",
          title: "Power of Central Government to issue directions",
          content: `(1) The Central Government or any of its officers specially authorised by it in this behalf may, upon receipt of a reference in writing from the Board that—
(a) a Data Fiduciary has been in breach of the provisions of this Act in two or more instances; and
(b) it is necessary to block access by the public to any information generated, transmitted, received, stored or hosted in any computer resource that enables such Data Fiduciary to carry on any activity relating to offering of goods or services to Data Principals within the territory of India,

after giving an opportunity of being heard to that Data Fiduciary, on being satisfied that it is necessary or expedient so to do, in the interests of the general public, for reasons to be recorded in writing, by order, direct any agency of the Central Government or any intermediary to block for access by the public or cause to be blocked for access by the public any such information.

(2) Every intermediary who receives a direction issued under sub-section (1) shall be bound to comply with the same.

(3) For the purposes of this section, the expressions "computer resource", "information" and "intermediary" shall have the meanings respectively assigned to them in the Information Technology Act, 2000.`,
          relatedGDPR: [],
          relatedRules: [],
        },
        {
          id: "section-38",
          number: "38",
          title: "Consistency with other laws",
          content: `(1) The provisions of this Act shall be in addition to and not in derogation of any other law for the time being in force.

(2) In the event of a conflict between the provisions of this Act and a provision of any other law for the time being in force, the provision of this Act shall prevail to the extent of such conflict.`,
          relatedGDPR: [],
          relatedRules: [],
        },
        {
          id: "section-39",
          number: "39",
          title: "Bar of jurisdiction",
          content: `No civil court shall have the jurisdiction to entertain any suit or proceeding in respect of any matter for which the Board is empowered under the provisions of this Act and no injunction shall be granted by any court or other authority in respect of any action taken or to be taken in pursuance of any power conferred by or under this Act.`,
          relatedGDPR: [],
          relatedRules: [],
        },
        {
          id: "section-40",
          number: "40",
          title: "Power of Central Government to make rules",
          content: `(1) The Central Government may, by notification, and subject to the condition of previous publication, make rules not inconsistent with the provisions of this Act, to carry out the purposes of this Act.

(2) In particular and without prejudice to the generality of the foregoing power, such rules may provide for all or any of the following matters, namely:—
(a) the manner in which the notice given by the Data Fiduciary to a Data Principal shall inform her, under sub-section (1) of section 5;
(b) the manner in which the notice given by the Data Fiduciary to a Data Principal shall inform her, under sub-section (2) of section 5;
(c) the manner in which a Consent Manager shall be accountable, under sub-section (8) of section 6;
(d) the technical, operational, financial and other conditions for registration of a Consent Manager, under sub-section (9) of section 6;
(e) subsidy, benefit, service, certificate, licence or permit for the provision or issuance of which, personal data may be processed under clause (b) of section 7;
(f) the time period within which a Data Fiduciary shall erase personal data, under sub-section (3) of section 8;
(g) the time period for the specified purpose to be deemed as no longer being served, under sub-section (4) of section 8;
(h) the form and manner for giving notice of a personal data breach, under sub-section (6) of section 8;
(i) the manner to obtain verifiable consent for processing of personal data of a child under sub-section (1) of section 9;
(j) the conditions for exemption of a class of Data Fiduciaries and the conditions relating thereto, under sub-section (4) of section 9;
(k) periodic Data Protection Impact Assessment under sub-clause (i) of clause (c) of sub-section (2) of section 10;
(l) periodic audit under sub-clause (iii) of clause (c) of sub-section (2) of section 10;
(m) any other information related to the personal data of a Data Principal and its processing, under sub-section (1) of section 11;
(n) the period within which a Data Fiduciary shall respond to a request for erasure of her personal data under sub-section (3) of section 12;
(o) the period and manner for responding to the grievances of a Data Principal, under sub-section (2) of section 13;
(p) the manner of nominating an individual under sub-section (1) of section 14;
(q) the exemption of a class of Data Fiduciaries from processing of personal data, under sub-section (1) of section 17;
(r) the composition and qualifications for appointment of Members of the Board under sub-section (2) of section 19;
(s) the salary, allowances and other terms and conditions of services of the Chairperson and other Members of the Board under sub-section (1) of section 20;
(t) the terms and conditions of service of the Chairperson and Members under sub-section (1) of section 20;
(u) the terms and conditions of appointment of officers and employees of the Board under section 24;
(v) the manner of conducting the proceedings of the Board under sub-section (1) of section 28;
(w) the form, manner and fee for filing an appeal under sub-section (2) of section 29; and
(z) any other matter which is required to be, or may be, prescribed.`,
          relatedGDPR: [],
          relatedRules: [],
        },
        {
          id: "section-41",
          number: "41",
          title: "Laying of rules and certain notifications",
          content: `Every rule made and every notification issued under section 16 and section 42 of this Act shall be laid, as soon as may be after it is made, before each House of Parliament, while it is in session, for a total period of thirty days which may be comprised in one session or in two or more successive sessions, and if before the expiry of the session immediately following the session or the successive sessions aforesaid, both Houses agree in making any modification in the rule or notification or both Houses agree that the rule or notification should not be made or issued, the rule or notification shall thereafter have effect only in such modified form or be of no effect, as the case may be; so, however, that any such modification or annulment shall be without prejudice to the validity of anything previously done under that rule or notification.`,
          relatedGDPR: [],
          relatedRules: [],
        },
        {
          id: "section-42",
          number: "42",
          title: "Power to amend Schedule",
          content: `(1) The Central Government may, by notification, amend the Schedule, subject to the restriction that no such notification shall have the effect of increasing any penalty specified therein to more than twice of what was specified in it when this Act was originally enacted.

(2) Any amendment notified under sub-section (1) shall have effect as if enacted in this Act and shall come into force on the date of the notification.`,
          relatedGDPR: [],
          relatedRules: [],
        },
        {
          id: "section-43",
          number: "43",
          title: "Power to remove difficulties",
          content: `(1) If any difficulty arises in giving effect to the provisions of this Act, the Central Government may, by order published in the Official Gazette, make such provisions not inconsistent with the provisions of this Act as may appear to it to be necessary or expedient for removing the difficulty.

(2) No order as referred to in sub-section (1) shall be made after the expiry of three years from the date of commencement of this Act.

(3) Every order made under this section shall be laid, as soon as may be after it is made, before each House of Parliament.`,
          relatedGDPR: [],
          relatedRules: [],
        },
        {
          id: "section-44",
          number: "44",
          title: "Amendments to certain Acts",
          content: `(1) In section 14 of the Telecom Regulatory Authority of India Act, 1997, in clause (c), after sub-clause (ii), the following sub-clause shall be inserted, namely:—
"(iii) the Appellate Tribunal under the Digital Personal Data Protection Act, 2023.".

(2) The Information Technology Act, 2000 shall be amended in the following manner, namely:—
(a) in section 43A, after the words "Sensitive Personal Data or information", the words "not regulated by the Digital Personal Data Protection Act, 2023" shall be inserted;
(b) in section 72A, after the words "Privacy and Data Protection Act, 1970", the words and figures "or the Digital Personal Data Protection Act, 2023" shall be inserted; and
(c) in sub-section (2) of section 87, clause (ob) shall be omitted.

(3) In the Right to Information Act, 2005, in sub-section (1) of section 8, for clause (j), the following clause shall be substituted, namely:—
"(j) information which relates to personal information the disclosure of which has no relationship to any public activity or interest, or which would cause unwarranted invasion of the privacy of the individual unless the Central Public Information Officer or the State Public Information Officer or the appellate authority, as the case may be, is satisfied that the larger public interest justifies the disclosure of such information:

Provided that the information, which cannot be denied to the Parliament or a State Legislature, shall not be denied to any person.".`,
          relatedGDPR: [],
          relatedRules: [],
        },
      ],
    },
  ],
};
