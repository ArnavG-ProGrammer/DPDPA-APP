import type { Metadata } from "next";
import { Playfair_Display, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { ChatFAB } from "@/components/chatbot/ChatFAB";
import { AuthPrompt } from "@/components/auth/AuthPrompt";
import { Analytics } from "@vercel/analytics/react";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://datacrest.in"),
  title: "Data Crest — Privacy Law Decoded",
  description:
    "Your journey-based companion for India's DPDPA 2023, DPDP Rules 2025, and EU GDPR. " +
    "Expert cross-references, author commentary, and plain-language explanations.",
  keywords: ["DPDPA", "GDPR", "DPDP Rules", "data protection", "privacy law", "India"],
  openGraph: {
    title: "Data Crest — Privacy Law Decoded",
    description: "Navigate India's DPDPA 2023, DPDP Rules 2025, and EU GDPR in one beautifully designed platform.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Data Crest — Privacy Law Decoded",
    description:
      "Your journey-based companion for India's DPDPA 2023, DPDP Rules 2025, and EU GDPR. " +
      "Expert cross-references, author commentary, and plain-language explanations.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable} h-full`}
      style={{ colorScheme: "dark" }}
    >
      <body className="min-h-full antialiased">
        {/* Persistent background layers */}
        <div className="bg-base"       aria-hidden="true" />
        <div className="dot-grid"      aria-hidden="true" />
        <div className="noise-overlay" aria-hidden="true" />
        <div className="rule-lines"    aria-hidden="true" />

        {/* Page content */}
        <div style={{ position: "relative", zIndex: 1 }}>
          {children}
        </div>

        {/* Auth prompt for guests */}
        <AuthPrompt />

        {/* AI Assistant FAB */}
        <ChatFAB />
        <Analytics />
      </body>
    </html>
  );
}
