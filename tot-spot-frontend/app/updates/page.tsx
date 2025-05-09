
import { getDates, getMonthlyUpdates, getUpdatePagePhotos } from "@/lib/contentful"
import UpdatesPageClient from "./UpdatesPageClient"

export default async function UpdatesPage() {
  const dates = await getDates()
  const monthlyUpdates = await getMonthlyUpdates()
  const updatePagePhotos = await getUpdatePagePhotos()

  return <UpdatesPageClient dates={dates} monthlyUpdates={monthlyUpdates} updatePagePhotos={updatePagePhotos}/>
}
