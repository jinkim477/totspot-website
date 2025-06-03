export const revalidate = 60; // Revalidate once every 60 seconds

import { getPrograms, getDates, getMonthlyUpdates, getContactInfo, getHomePagePhotos, getHomePageDetails } from "@/lib/contentful"
import HomePageClient from "./HomePageClient"

export default async function HomePage() {
  const programs = await getPrograms();
  const dates = await getDates();
  const monthlyUpdates = await getMonthlyUpdates();
  const contactInfo = await getContactInfo();
  const homePagePhotos = await getHomePagePhotos();
  const homePageDetails = await getHomePageDetails();

  return <HomePageClient programs={programs} dates={dates} monthlyUpdates={monthlyUpdates} contactInfo={contactInfo} homePagePhotos={homePagePhotos} homePageDetails={homePageDetails}/>
}
