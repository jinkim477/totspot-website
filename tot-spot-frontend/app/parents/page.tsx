export const revalidate = 60; // Revalidate once every 60 seconds

import { getDates, getParentsPagePhotos, getTestimonials, getDownloadableDocs, getPolicies, getFAQ } from "@/lib/contentful"
import ParentsPageClient from "./ParentsPageClient"

export default async function ParentsPage() {
    const dates = await getDates();
    const testimonials = await getTestimonials();
    const parentsPagePhotos = await getParentsPagePhotos();
    const downloadableDocs = await getDownloadableDocs();
    const policies = await getPolicies();
    const faq = await getFAQ();

    return <ParentsPageClient dates={dates} testimonials={testimonials} parentsPagePhotos={parentsPagePhotos} downloadableDocs={downloadableDocs} policies={policies} faq={faq}/>
}
