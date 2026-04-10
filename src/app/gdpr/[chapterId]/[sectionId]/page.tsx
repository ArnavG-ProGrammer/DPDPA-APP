import { gdpr } from "@/data/gdpr";
import { GdprSectionPageClient } from "./GdprSectionPageClient";

export async function generateStaticParams() {
  return gdpr.chapters.flatMap(chapter =>
    chapter.sections.map(section => ({
      chapterId: chapter.id,
      sectionId: section.id,
    }))
  );
}

export default async function GdprSectionPage({
  params,
}: {
  params: Promise<{ chapterId: string; sectionId: string }>;
}) {
  const { chapterId, sectionId } = await params;
  return <GdprSectionPageClient params={{ chapterId, sectionId }} />;
}
