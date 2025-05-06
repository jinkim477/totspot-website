// app/about/page.tsx
import { getStaff, getFacility, getContactInfo } from "@/lib/contentful"
import ContactPageClient from "./ContactPageClient"

export default async function AboutPage() {
  const contactInfo = await getContactInfo() // fetch contentful contact info content

  return <ContactPageClient contactInfo={contactInfo}/>
}
