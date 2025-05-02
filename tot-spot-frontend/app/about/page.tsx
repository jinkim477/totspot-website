// app/about/page.tsx
import { getStaff, getFacility } from "@/lib/contentful"
import AboutPageClient from "./AboutPageClient"

export default async function AboutPage() {
  const staff = await getStaff() // fetch contentful staff content
  const facilities = await getFacility()

  return <AboutPageClient staff={staff} facilities={facilities} />
}
