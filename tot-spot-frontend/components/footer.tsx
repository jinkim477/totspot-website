import Link from "next/link";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { getContactInfo } from "@/lib/contentful";

export function Footer({ contactInfo }: { contactInfo: any }) {
	const { addressLineOne, addressLineTwo, phone, email, mapsLink } =
		contactInfo.fields;

	return (
		<footer className="bg-gray-50 border-t">
			<div className="container py-12">
				<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
					<div className="space-y-4">
						<div className="flex items-center gap-2">
							{/* <div className="h-10 w-10 rounded-full bg-pink-600"></div> */}
							<img
								src="/images/tot-spot-logo.png"
								alt="Tot Spot Logo"
								className="h-10 w-10 rounded-full"
							/>
							<span className="text-xl font-bold text-pink-600">Tot Spot</span>
						</div>
						<p className="text-sm text-gray-600 max-w-xs">
							Tot Spot is one of the best, brightest and most spacious
							preschools in south Calgary, located in Lake Bonavista.
						</p>
					</div>

					<div>
						<h3 className="font-medium text-gray-900 mb-4">Quick Links</h3>
						<ul className="space-y-2">
							<li>
								<Link
									href="/about"
									className="text-sm text-gray-600 hover:text-pink-600"
								>
									About Us
								</Link>
							</li>
							<li>
								<Link
									href="/programs"
									className="text-sm text-gray-600 hover:text-pink-600"
								>
									Programs & Registration
								</Link>
							</li>
							<li>
								<Link
									href="/contact"
									className="text-sm text-gray-600 hover:text-pink-600"
								>
									Contact Us
								</Link>
							</li>
							<li>
								<Link
									href="/parents"
									className="text-sm text-gray-600 hover:text-pink-600"
								>
									Parent Resources
								</Link>
							</li>
							<li>
								<Link
									href="/newsletters"
									className="text-sm text-gray-600 hover:text-pink-600"
								>
									Newsletters
								</Link>
							</li>
							<li>
								<Link
									href="/calendar"
									className="text-sm text-gray-600 hover:text-pink-600"
								>
									Calendar
								</Link>
							</li>
						</ul>
					</div>

					<div>
						<h3 className="font-medium text-gray-900 mb-4">Details</h3>
						<ul className="space-y-2">
							<li>
								<Link
									href="/programs#registration"
									className="text-sm text-gray-600 hover:text-pink-600"
								>
									Registration Process
								</Link>
							</li>
							<li>
								<Link
									href="/newsletters#updates"
									className="text-sm text-gray-600 hover:text-pink-600"
								>
									Newsletters
								</Link>
							</li>
							<li>
								<Link
									href="/newsletters#evenets"
									className="text-sm text-gray-600 hover:text-pink-600"
								>
									Events
								</Link>
							</li>
							<li>
								<Link
									href="/calendar"
									className="text-sm text-gray-600 hover:text-pink-600"
								>
									Calendar
								</Link>
							</li>
							<li>
								<Link
									href="/about#facility"
									className="text-sm text-gray-600 hover:text-pink-600"
								>
									Our Facility
								</Link>
							</li>
							<li>
								<Link
									href="/parents#resources"
									className="text-sm text-gray-600 hover:text-pink-600"
								>
									Policies
								</Link>
							</li>
						</ul>
					</div>

					<div>
						<h3 className="font-medium text-gray-900 mb-4">Contact Us</h3>
						<ul className="space-y-3">
							<li className="flex items-start gap-2">
								<MapPin className="h-5 w-5 text-pink-600 flex-shrink-0 mt-0.5" />
								<Link href={mapsLink} target="_blank" rel="noopener noreferrer">
									<span className="text-sm text-gray-600 hover:text-pink-600">
										{addressLineOne}, {addressLineTwo}
									</span>
								</Link>
							</li>
							<li className="flex items-start gap-2">
								<Phone className="h-5 w-5 text-pink-600 flex-shrink-0 mt-0.5" />
								<Link href={`tel:${phone}`}>
									<span className="text-sm text-gray-600 hover:text-pink-600">
										{phone}
									</span>
								</Link>
							</li>
							<li className="flex items-start gap-2">
								<Mail className="h-5 w-5 text-pink-600 flex-shrink-0 mt-0.5" />
								<Link href={`mailto:${email}`}>
									<span className="text-sm text-gray-600 hover:text-pink-600">
										{email}
									</span>
								</Link>
							</li>
						</ul>
					</div>
				</div>

				<div className="border-t border-gray-200 mt-10 pt-6 text-center text-sm text-gray-600">
					<p>
						© {new Date().getFullYear()} Tot Spot Preschool. All rights
						reserved.
					</p>
				</div>
			</div>
		</footer>
	);
}
