import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/theme";
import { ChatFAB } from "@/components/chatbot/ChatFAB";
import { AuthPrompt } from "@/components/auth/AuthPrompt";
import { Analytics } from "@vercel/analytics/react";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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

// Applies the saved (or system) theme before first paint to avoid a flash.
const themeScript = `(function(){try{var t=localStorage.getItem('dc-theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark');}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${inter.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full antialiased">
        <ThemeProvider>
          {/* Persistent ambient background layers (token-tinted, behind content) */}
          <div className="bg-base" aria-hidden="true" />
          <div className="dot-grid" aria-hidden="true" />
          <div className="noise-overlay" aria-hidden="true" />

          {/* Page content */}
          <div style={{ position: "relative", zIndex: 1 }}>
            {children}
          </div>

          {/* Auth prompt for guests */}
          <AuthPrompt />

          {/* AI Assistant FAB */}
          <ChatFAB />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
