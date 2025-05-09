import { getPrograms, getDates, getMonthlyUpdates, getContactInfo, getHomePagePhotos } from "@/lib/contentful"
import HomePageClient from "./HomePageClient"

export default async function AboutPage() {
  const programs = await getPrograms();
  const dates = await getDates();
  const monthlyUpdates = await getMonthlyUpdates();
  const contactInfo = await getContactInfo();
  const homePagePhotos = await getHomePagePhotos();

  return <HomePageClient programs={programs} dates={dates} monthlyUpdates={monthlyUpdates} contactInfo={contactInfo} homePagePhotos={homePagePhotos}/>
}
