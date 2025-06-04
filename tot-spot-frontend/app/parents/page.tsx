export const revalidate = 60; // Revalidate once every 60 seconds

import { getEvents, getParentsPagePhotos, getTestimonials, getDownloadableDocs, getPolicies, getFAQ } from "@/lib/contentful"
import ParentsPageClient from "./ParentsPageClient"

export default async function ParentsPage() {
    const events = await getEvents();
    const parentsPagePhotos = await getParentsPagePhotos();
    const downloadableDocs = await getDownloadableDocs();
    const policies = await getPolicies();
    const faq = await getFAQ();

    return <ParentsPageClient events={events} parentsPagePhotos={parentsPagePhotos} downloadableDocs={downloadableDocs} policies={policies} faq={faq}/>
}
