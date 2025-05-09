// app/about/page.tsx
import { getStaff, getFacility, getAboutPagePhotos } from "@/lib/contentful"
import AboutPageClient from "./AboutPageClient"

export default async function AboutPage() {
  const staff = await getStaff() // fetch contentful staff content
  const facilities = await getFacility()
  const aboutPagePhotos = await getAboutPagePhotos()

  return <AboutPageClient staff={staff} facilities={facilities} aboutPagePhotos={aboutPagePhotos} />
}
