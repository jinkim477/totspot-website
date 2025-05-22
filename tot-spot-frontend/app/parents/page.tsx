
import { getDates, getParentsPagePhotos, getTestimonials, getDownloadableDocs, getPolicies } from "@/lib/contentful"
import ParentsPageClient from "./ParentsPageClient"

export default async function AboutPage() {
    const dates = await getDates();
    const testimonials = await getTestimonials();
    const parentsPagePhotos = await getParentsPagePhotos();
    const downloadableDocs = await getDownloadableDocs();
    const policies = await getPolicies();

    return <ParentsPageClient dates={dates} testimonials={testimonials} parentsPagePhotos={parentsPagePhotos} downloadableDocs={downloadableDocs} policies={policies} />
}
