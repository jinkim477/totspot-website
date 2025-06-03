// app/about/page.tsx

export const revalidate = 60; // Revalidate once every 60 seconds

import { getContactInfo, getContactPagePhotos } from "@/lib/contentful"
import ContactPageClient from "./ContactPageClient"

export default async function AboutPage() {
  const contactInfo = await getContactInfo() // fetch contentful contact info content
  const contactPagePhotos = await getContactPagePhotos()

  return <ContactPageClient contactInfo={contactInfo} contactPagePhotos={contactPagePhotos}/>
}
