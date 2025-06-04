export const revalidate = 60; // Revalidate once every 60 seconds

import { getEvents, getMonthlyUpdates, getNewsletterPagePhotos } from "@/lib/contentful"
import NewslettersPageClient from "./NewslettersPageClient"

export default async function UpdatesPage() {
  const events = await getEvents()
  const monthlyUpdates = await getMonthlyUpdates()
  const newsletterPagePhotos = await getNewsletterPagePhotos()

  return <NewslettersPageClient events={events} monthlyUpdates={monthlyUpdates} newsletterPagePhotos={newsletterPagePhotos}/>
}
