
import { getDates, getParentsPagePhotos, getTestimonials } from "@/lib/contentful"
import ParentsPageClient from "./ParentsPageClient"

export default async function AboutPage() {
    const dates = await getDates();
    const testimonials = await getTestimonials();
    const parentsPagePhotos = await getParentsPagePhotos();

    return <ParentsPageClient dates={dates} testimonials={testimonials} parentsPagePhotos={parentsPagePhotos}/>
}
