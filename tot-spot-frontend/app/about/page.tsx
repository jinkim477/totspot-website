// app/about/page.tsx
import { getStaff } from "@/lib/contentful"
import AboutPageClient from "./AboutPageClient"

export default async function AboutPage() {
  const content = await getStaff() // fetch contentful content

  return <AboutPageClient content={content} />
}
