// app/programs/page.tsx
import { getPrograms, getProgramsPagePhotos } from "@/lib/contentful"
import ProgramPageClient from "./ProgramPageClient"

export default async function AboutPage() {
  const programs = await getPrograms()
  const programsPagePhotos = await getProgramsPagePhotos()

  return <ProgramPageClient programs={programs} programsPagePhotos={programsPagePhotos}/>
}
