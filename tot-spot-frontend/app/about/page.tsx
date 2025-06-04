// app/about/page.tsx
export const revalidate = 60; // Revalidate once every 60 seconds

import {
	getStaff,
	getFacility,
	getAboutPagePhotos,
	getAboutPageDetails,
  getTestimonials,
} from "@/lib/contentful";
import AboutPageClient from "./AboutPageClient";

export default async function AboutPage() {
	const staff = await getStaff(); // fetch contentful staff content
	const facilities = await getFacility();
	const aboutPagePhotos = await getAboutPagePhotos();
	const aboutPageDetails = await getAboutPageDetails();
	const testimonials = await getTestimonials();
	return (
		<AboutPageClient
			staff={staff}
			facilities={facilities}
			aboutPagePhotos={aboutPagePhotos}
			aboutPageDetails={aboutPageDetails}
      testimonials={testimonials}
		/>
	);
}
