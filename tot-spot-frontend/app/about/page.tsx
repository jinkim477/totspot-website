// app/about/page.tsx
import { getStaff, getFacility, getAboutPagePhotos, getAboutPageDetails } from "@/lib/contentful"
import AboutPageClient from "./AboutPageClient"

export default async function AboutPage() {
  const staff = await getStaff() // fetch contentful staff content
  const facilities = await getFacility()
  const aboutPagePhotos = await getAboutPagePhotos()
  const aboutPageDetails = await getAboutPageDetails();

  return <AboutPageClient staff={staff} facilities={facilities} aboutPagePhotos={aboutPagePhotos} aboutPageDetails={aboutPageDetails}/>
}
