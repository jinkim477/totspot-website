export const revalidate = 60; // Revalidate once every 60 seconds

import { getPrograms, getEvents, getMonthlyUpdates, getContactInfo, getHomePagePhotos, getHomePageDetails } from "@/lib/contentful"
import HomePageClient from "./HomePageClient"

export default async function HomePage() {
  const programs = await getPrograms();
  const events = await getEvents();
  const monthlyUpdates = await getMonthlyUpdates();
  const contactInfo = await getContactInfo();
  const homePagePhotos = await getHomePagePhotos();
  const homePageDetails = await getHomePageDetails();

  return <HomePageClient programs={programs} events={events} monthlyUpdates={monthlyUpdates} contactInfo={contactInfo} homePagePhotos={homePagePhotos} homePageDetails={homePageDetails}/>
}
