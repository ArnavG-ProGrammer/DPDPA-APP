import { dpdpaAct } from "@/data/dpdpa";
import { SectionPageClient } from "./SectionPageClient";

export async function generateStaticParams() {
  return dpdpaAct.chapters.flatMap(chapter =>
    chapter.sections.map(section => ({
      chapterId: chapter.id,
      sectionId: section.id,
    }))
  );
}

export default async function DpdpaSectionPage({
  params,
}: {
  params: Promise<{ chapterId: string; sectionId: string }>;
}) {
  const { chapterId, sectionId } = await params;
  return <SectionPageClient params={{ chapterId, sectionId }} />;
}
