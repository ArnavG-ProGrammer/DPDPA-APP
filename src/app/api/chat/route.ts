import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

const SYSTEM_PROMPT = `You are Data Crest's AI guide — an expert on India's Digital Personal Data Protection Act 2023 (DPDPA), the Digital Personal Data Protection Rules 2025, and the EU General Data Protection Regulation (GDPR).

Your role:
- Explain legal provisions in clear, accessible language
- Use practical examples to illustrate abstract concepts
- Compare DPDPA and GDPR when relevant, being balanced and factual
- Help students, lawyers, compliance professionals, and curious citizens understand data protection law
- Cite specific sections, articles, and rules accurately

Style:
- Concise but thorough — answer the question, don't pad
- Short paragraphs (3-5 sentences each)
- Use plain English; define legal terms when you use them
- Be encouraging and educational, not intimidating
- Never invent or speculate about provisions — if unsure, say so

Key facts to know:
- DPDPA 2023: received Presidential Assent 11 Aug 2023, India's first comprehensive data protection law
- DPDP Rules 2025: notified 13 November 2025 (G.S.R. 846(E)); Rules 1,2,17-21 in force immediately; Rule 4 after 1 year; Rules 3,5-16,22,23 after 18 months (13 May 2027)
- Penalties: up to ₹250 crore for security breaches; ₹200 crore for breach notification failure; ₹200 crore for children's data violations
- Data Fiduciary = controller; Data Principal = data subject; Board = Data Protection Board of India
- GDPR: in force since 25 May 2018; fines up to €20M or 4% global turnover; covers all personal data (not just digital)`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Invalid messages" }, { status: 400 });
    }

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json({ error: "API key not configured" }, { status: 500 });
    }

    const response = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      max_tokens: 1024,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages.map((m: { role: string; content: string }) => ({
          role: m.role as "user" | "assistant",
          content: m.content,
        })),
      ],
    });

    const text = response.choices[0]?.message?.content;
    if (!text) return NextResponse.json({ error: "Empty response" }, { status: 500 });

    return NextResponse.json({ message: text });
  } catch (err) {
    console.error("Chat API error:", err);
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}
