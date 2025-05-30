// app/programs/page.tsx
import { getDownloadableDocs, getPrograms, getProgramsPagePhotos } from "@/lib/contentful"
import ProgramPageClient from "./ProgramPageClient"

export default async function AboutPage() {
  const programs = await getPrograms()
  const programsPagePhotos = await getProgramsPagePhotos()
  const downloadableDocs = await getDownloadableDocs();

  return <ProgramPageClient programs={programs} programsPagePhotos={programsPagePhotos} downloadableDocs={downloadableDocs}/>
}
