// app/programs/page.tsx
import { getPrograms } from "@/lib/contentful"
import ProgramPageClient from "./ProgramPageClient"

export default async function AboutPage() {
  const programs = await getPrograms()

  return <ProgramPageClient programs={programs} />
}
