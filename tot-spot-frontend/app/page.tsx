import { getPrograms, getDates, getMonthlyUpdates, getContactInfo, getHomePagePhotos, getHomePageDetails } from "@/lib/contentful"
import HomePageClient from "./HomePageClient"

export const metadata = {
  title: "Tot Spot Preschool",
  description: "A warm and welcoming preschool located in Lake Bonavista, Calgary.",
  openGraph: {
    title: "Tot Spot Preschool",
    description: "A warm and welcoming preschool located in Lake Bonavista, Calgary.",
    url: "https://www.totspot-website.vercel.app",
    type: "website",
    images: [
      {
        url: "https://www.totspot-website.vercel.app/tot-spot-og.jpg", // Replace with actual hosted image
        width: 1200,
        height: 630,
        alt: "Tot Spot Preschool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tot Spot Preschool",
    description: "A warm and welcoming preschool located in Lake Bonavista, Calgary",
    images: ["https://www.totspot-website.vercel.app/tot-spot-og.jpg"], // Same image
  },
};

export default async function HomePage() {
  const programs = await getPrograms();
  const dates = await getDates();
  const monthlyUpdates = await getMonthlyUpdates();
  const contactInfo = await getContactInfo();
  const homePagePhotos = await getHomePagePhotos();
  const homePageDetails = await getHomePageDetails();

  return <HomePageClient programs={programs} dates={dates} monthlyUpdates={monthlyUpdates} contactInfo={contactInfo} homePagePhotos={homePagePhotos} homePageDetails={homePageDetails}/>
}
