"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-dvh items-center justify-center px-6">
      <div className="max-w-[480px] text-center">
        <div
          className="font-display text-primary"
          style={{ fontSize: "clamp(6rem, 20vw, 10rem)", fontWeight: 700, lineHeight: 1, marginBottom: 8, letterSpacing: "-0.04em" }}
        >
          404
        </div>

        <h1 className="mb-4 font-display text-[clamp(1.4rem,4vw,2rem)] font-semibold text-foreground">
          Page not found
        </h1>

        <p className="mx-auto mb-10 max-w-[42ch] text-[15px] leading-relaxed text-muted-foreground">
          The page you are looking for does not exist or has been moved. Let us get you
          back on track with India&apos;s privacy law landscape.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-md transition-[transform,filter] duration-200 hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring active:translate-y-0"
        >
          <ArrowLeft size={16} /> Back to home
        </Link>
      </div>
    </div>
  );
}
