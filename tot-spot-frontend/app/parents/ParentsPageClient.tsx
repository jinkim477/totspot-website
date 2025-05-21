"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar, Download, FileText } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";
import { CardDescription } from "@/components/ui/card";
import { CardHeader } from "@/components/ui/card";
import { CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import TestimonialCarousel from "@/components/testimonialCarousel";
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

export default function ParentsPage({
	dates,
	testimonials,
	parentsPagePhotos,
	downloadableDocs,
}: {
	dates: any[];
	testimonials: any[];
	parentsPagePhotos: any[];
	downloadableDocs: any[];
}) {
	const landingPhotoUrl =
		parentsPagePhotos[0].fields.landingPhoto.fields.file.url;

	return (
		<div className="min-h-screen">
			{/* Hero Section */}
			<section className="relative h-[400px] overflow-hidden">
				<div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 z-10" />
				<Image
					src={landingPhotoUrl}
					alt="Tot Spot Parents"
					fill
					className="object-cover"
					priority
				/>
				<div className="container relative z-20 h-full flex flex-col justify-center text-white">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						className="max-w-2xl"
					>
						<h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
							Parent Resources
						</h1>
						<p className="mt-6 text-lg text-white/90 max-w-xl">
							Helpful information and resources for Tot Spot parents.
						</p>
					</motion.div>
				</div>
			</section>

			{/* Resources Tabs */}
			<section id="resources" className="py-16">
				<div className="container">
					<motion.div
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5 }}
						className="text-center mb-12"
					>
						<h2 className="text-3xl font-bold text-gray-900">
							Parent Resources
						</h2>
						<div className="mt-2 h-1 w-20 bg-pink-500 mx-auto rounded-full"></div>
					</motion.div>

					<Tabs defaultValue="forms" className="max-w-4xl mx-auto">
						<TabsList className="grid w-full grid-cols-3">
							<TabsTrigger value="forms">Documents</TabsTrigger>
							<TabsTrigger value="calendar">Calendar</TabsTrigger>
							<TabsTrigger value="policies">Policies</TabsTrigger>
						</TabsList>

						<TabsContent value="forms" className="mt-6">
							<Card>
								<CardHeader>
									<CardTitle>Forms & Documents</CardTitle>
									<CardDescription>
										Important forms and documents for Tot Spot parents.
									</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="grid gap-4">
										{downloadableDocs.map((doc, index) => {
											const title = doc.fields.title;
											const description = doc.fields.description;
											const fileUrl = `https:${doc.fields.file.fields.file.url}`; // Contentful returns relative URLs

											return (
												<div
													key={index}
													className="flex items-center justify-between p-4 border rounded-lg"
												>
													<div className="flex items-center gap-3">
														{/* <FileText className="h-5 w-5 text-pink-600" /> */}
														<div>
															<h3 className="font-medium text-gray-900">
																{title}
															</h3>
															{description && (
																<p className="text-sm text-gray-500">
																	{description}
																</p>
															)}
														</div>
													</div>
													<a
														href={fileUrl}
														download
														target="_blank"
														rel="noopener noreferrer"
													>
														<Button
															variant="outline"
															size="sm"
															className="gap-1"
														>
															<Download className="h-4 w-4" />
															Download
														</Button>
													</a>
												</div>
											);
										})}
									</div>
								</CardContent>
							</Card>
						</TabsContent>

						<TabsContent value="calendar" className="mt-6">
							<Card>
								<CardHeader>
									<CardTitle>This Month’s Events</CardTitle>
									<CardDescription>
										Stay up-to-date with Tot Spot events and important dates.
									</CardDescription>
								</CardHeader>
								<CardContent>
									{(() => {
										const container = {
											hidden: { opacity: 0 },
											show: {
												opacity: 1,
												transition: {
													staggerChildren: 0.1,
												},
											},
										};

										const item = {
											hidden: { opacity: 0, y: 20 },
											show: { opacity: 1, y: 0 },
										};

										const getMonthKey = (dateStr: string) => {
											const date = new Date(dateStr);
											return date.toLocaleString("en-US", {
												month: "long",
												year: "numeric",
											});
										};

										// Sort and extract the latest month key
										const sortedDates = [...dates]
											.filter((d) => d.fields?.event)
											.sort(
												(a, b) =>
													new Date(b.fields.event).getTime() -
													new Date(a.fields.event).getTime()
											);

										const latestMonthKey = getMonthKey(
											sortedDates[0]?.fields?.event || ""
										);

										// Filter only events from that month
										const eventsThisMonth = sortedDates.filter(
											(entry) =>
												getMonthKey(entry.fields.event) === latestMonthKey
										);

										if (eventsThisMonth.length === 0) {
											return (
												<p className="text-center text-gray-600">
													No events this month.
												</p>
											);
										}

										return (
											<motion.ul
												variants={container}
												initial="hidden"
												whileInView="show"
												viewport={{ once: true }}
												className="space-y-3"
											>
												{eventsThisMonth.map((event, index) => {
													const start = new Date(
														event.fields.event
													).toLocaleDateString("en-US", {
														month: "short",
														day: "numeric",
													});

													const end = event.fields.endDate
														? new Date(event.fields.endDate).toLocaleDateString(
																"en-US",
																{
																	month: "short",
																	day: "numeric",
																}
															)
														: null;

													return (
														<motion.li
															key={event.sys.id}
															variants={item}
															className="flex gap-4 pb-3 border-b last:border-0"
														>
															<div className="w-20 flex-shrink-0 font-medium text-pink-600">
																{end ? `${start} - ${end}` : start}
															</div>
															<div>
																<div className="font-medium text-gray-900">
																	{event.fields.title}
																</div>
																<div className="text-sm text-gray-600">
																	{event.fields.description}
																</div>
															</div>
														</motion.li>
													);
												})}
											</motion.ul>
										);
									})()}
								</CardContent>
							</Card>
						</TabsContent>

						<TabsContent value="policies" className="mt-6">
							<Card>
								<CardHeader>
									<CardTitle>Tot Spot Policies</CardTitle>
									<CardDescription>
										Review our key policies for a safe and positive preschool
										experience.
									</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="grid md:grid-cols-2 gap-6">
										{/* Policy 1 */}
										<Dialog>
											<DialogTrigger asChild>
												<Card className="cursor-pointer hover:shadow-lg transition">
													<CardContent className="pt-4">
														<h3 className="font-medium text-gray-900 mb-1">
															Child Guidance
														</h3>
														<p className="text-sm text-gray-600 mb-3">
															Positive discipline and behavior management
															strategies.
														</p>
														<span className="text-pink-600 text-sm font-medium">
															Read More
														</span>
													</CardContent>
												</Card>
											</DialogTrigger>
											<DialogContent className="max-w-2xl w-[90vw] max-h-[90vh] overflow-y-auto p-6 bg-white rounded-lg shadow-xl">
												<DialogHeader>
													<DialogTitle>Child Guidance Policy</DialogTitle>
												</DialogHeader>
												<div className="mt-2 text-gray-700 whitespace-pre-wrap">
													<p>
														Caring about students and wanting the best possible
														learning environment for them assumes a positive
														approach to child guidance. Supportive class
														management is the way our program is organized. The
														learning process involves teaching children to
														resolve their differences and develop self-control.
														Children must learn to live cooperatively and
														successfully with others.
													</p>
													<br />
													<p>
														Our approach to child guidance is a positive
														approach which involves teaching children to be kind
														and respectful to others, to cooperate with
														classmates and staff, to resolve differences
														verbally, and to develop self-regulation skills in
														order to create a safe and positive learning
														environment for everyone. This will be done through
														reminders, suggestions, discussion, redirection,
														modeling and developing empathy. Some strategies and
														examples are as follows:
													</p>
													<ol className="list-decimal pl-6 mt-2">
														<li>
															You may knock down the things that you build and
															your friends can knock down the things that they
															build.
														</li>
														<li>
															You may share that toy with your friend now or in
															two minutes.
														</li>
														<li>
															Your friend looks frustrated (angry, sad).
															Let&apos;s give that toy back and ask your friend
															for a turn instead.
														</li>
														<li>
															Come and sit over here. I think you will be able
															to listen better in this spot.
														</li>
													</ol>
													<br />
													<p>
														If a child becomes disruptive or harmful and does
														not respond to teacher suggestions for behavioral
														change the child will be invited to sit down in a
														quiet area of the room where he/she can still see
														the other children. Once the child is settled, the
														teacher will have a discussion with the child to
														develop a better approach for next time.
													</p>
													<br />
													<p>
														Physical punishment, physical and verbal abuse and
														emotional deprivation will not be used as a means
														for child guidance.
													</p>
												</div>
											</DialogContent>
										</Dialog>

										{/* Policy 2 */}
										<Dialog>
											<DialogTrigger asChild>
												<Card className="cursor-pointer hover:shadow-lg transition">
													<CardContent className="pt-4">
														<h3 className="font-medium text-gray-900 mb-1">
															Emergency Situations
														</h3>
														<p className="text-sm text-gray-600 mb-3">
															Safety protocols for emergencies and health
															concerns.
														</p>
														<span className="text-pink-600 text-sm font-medium">
															Read More
														</span>
													</CardContent>
												</Card>
											</DialogTrigger>
											<DialogContent className="max-w-2xl w-[90vw] max-h-[90vh] overflow-y-auto p-6 bg-white rounded-lg shadow-xl">
												<DialogHeader>
													<DialogTitle>
														Emergency Procedures for an Accident or Serious
														Illness
													</DialogTitle>
												</DialogHeader>
												<div className="mt-2 text-gray-700 whitespace-pre-wrap">
													<p>
														In the case of an accident or serious illness, Tot
														Spot will notify the child&apos;s parent/guardian
														and will ensure the child receives medical attention
														if necessary. If emergency services are required, we
														will call 911. If the child needs to go to the
														hospital, the child&apos;s health form will
														accompany the child in the ambulance.
													</p>
												</div>
											</DialogContent>
										</Dialog>

										{/* Policy 3 */}
										<Dialog>
											<DialogTrigger asChild>
												<Card className="cursor-pointer hover:shadow-lg transition">
													<CardContent className="pt-4">
														<h3 className="font-medium text-gray-900 mb-1">
															Ambulance/Fire Emergencies
														</h3>
														<p className="text-sm text-gray-600 mb-3">
															Procedures for fire emergencies and evacuation
															plans.
														</p>
														<span className="text-pink-600 text-sm font-medium">
															Read More
														</span>
													</CardContent>
												</Card>
											</DialogTrigger>
											<DialogContent className="max-w-2xl w-[90vw] max-h-[90vh] overflow-y-auto p-6 bg-white rounded-lg shadow-xl">
												<DialogHeader>
													<DialogTitle>Fire Emergency Procedure</DialogTitle>
												</DialogHeader>
												<div className="mt-2 text-gray-700 whitespace-pre-wrap">
													<p>If a fire occurs, we will:</p>
													<ol className="list-decimal pl-6 mt-2">
														<li>Activate the fire alarm.</li>
														<li>
															Line up, count the children and proceed to the
															nearest exist with the teacher at the front of the
															line facing the children. Teachers will have
															attendance and student records with them and will
															close doors behind them to confine fire.
														</li>
														<li>
															Have an adult in the gym and craft areas check
															washrooms.
														</li>
														<li>Recount the children once outside.</li>
														<li>
															Call 911 and give the address &ndash; 1507 Acadia
															Drive SE &ndash; Bonavista Baptist Church.
														</li>
													</ol>
													<br />
													<p>To prepare for a fire emergency, we will:</p>
													<ol className="list-decimal pl-6 mt-2">
														<li>Pre-plan our fire escape route.</li>
														<li>Practice with children.</li>
														<li>Practice fire prevention at all times.</li>
													</ol>
													<br />
													<p>
														<span className="font-bold">NOTE:</span> Our
														emergency evacuation location is the St. Bonaventure
														Catholic CHURCH across the street from Tot Spot.
													</p>
												</div>
											</DialogContent>
										</Dialog>

										{/* Policy 4 */}
										<Dialog>
											<DialogTrigger asChild>
												<Card className="cursor-pointer hover:shadow-lg transition">
													<CardContent className="pt-4">
														<h3 className="font-medium text-gray-900 mb-1">
															Communicable Disease Policy
														</h3>
														<p className="text-sm text-gray-600 mb-3">
															Health and safety protocols for communicable
															diseases.
														</p>
														<span className="text-pink-600 text-sm font-medium">
															Read More
														</span>
													</CardContent>
												</Card>
											</DialogTrigger>
											<DialogContent className="max-w-2xl w-[90vw] max-h-[90vh] overflow-y-auto p-6 bg-white rounded-lg shadow-xl">
												<DialogHeader>
													<DialogTitle>Communicable Disease Policy</DialogTitle>
												</DialogHeader>
												<div className="mt-2 text-gray-700 whitespace-pre-wrap">
													<p>
														Tot Spot has a Communicable Disease Policy in place.
														We follow Alberta Health Services guidelines. For it
														to work, we need your help.
													</p>
													<br />
													<ol className="list-decimal pl-6 mt-2">
														<li className="mb-4">
															<p className="font-bold">
																Reporting a Communicable Disease
															</p>
															<p>
																If a child has been diagnosed with a
																communicable disease, parents/guardians must
																report it to the child&apos;s teacher. Teachers
																will then contact all the parents/guardians of
																the children who have been exposed to the
																affected child. Tot Spot will report the
																communicable disease to the appropriate health
																authorities.
															</p>
														</li>
														<li className="mb-4">
															<p className="font-bold">
																Public Health Recommendations
															</p>
															<p>
																Tot Spot will consult with Public Health and
																will follow their recommendations. It might be
																necessary for a child&apos;s parents/guardians
																to remove the child until the child is well
																enough to return.
															</p>
														</li>
														<li className="mb-4">
															<p className="font-bold">
																Child Becoming Ill at Tot Spot
															</p>
															<p>
																Should a child become ill at Tot Spot,
																parents/guardians will be notified immediately
																and staff will isolate the child until the
																parent/guardian arrives to take the child home.
																If the child&apos;s parents/guardians are not
																available, the emergency contact person will be
																called.
															</p>
														</li>
														<li className="mb-4">
															<p className="font-bold">
																Keeping a Sick Child at Home
															</p>
															<p>
																Parents are asked to be vigilant about keeping
																their child home when he/she is ill and not
																feeling well.
															</p>
															<br />
															<p>
																The Child Care Licensing Handbook states that a
																child is considered ill when they exhibit any of
																the following signs or symptoms: vomiting,
																fever, frequent diarrhea, or a new unexplained
																rash or cough. A child may also be considered
																ill if they temporarily require greater care and
																attention that cannot be provided without
																compromising the care of other children,{" "}
																<span className="font-bold">
																	or if a staff member knows or believes the
																	child poses a health risk to other persons on
																	the program premises.
																</span>
															</p>
															<br />
															<p>
																If your child has been ill, they should be
																<span className="font-bold">
																	{" "}
																	symptom free for 24 hours
																</span>{" "}
																before returning to school.
															</p>
															<br />
															<p>
																<span className="font-bold">
																	Pre-Existing Conditions
																</span>{" "}
																&ndash; Please notify your child&apos;s teacher
																if your child has any pre-existing conditions
																such as allergies, asthma, diabetes, etc. Please
																note these on the health form you will receive
																with your information package and let your
																child&apos;s teacher know when they call you
																prior to the first day of school.
															</p>
														</li>
														<li className="mb-4">
															<p className="font-bold">Head Lice</p>
															<p>
																Please notify Tot Spot immediately if you find
																your child has lice. Lice are not uncommon and
																can be acquired by any child. Please see your
																child&apos;s doctor and follow the eradication
																procedure that is prescribed. Children with lice
																will not be allowed to return to school until
																they have been treated.
															</p>
														</li>
														<li className="mb-4">
															<p className="font-bold">Staff Training</p>
															<p>
																All Tot Spot staff is trained in First Aid and
																CPR as required by Children&apos;s Services. Our
																goal is to keep students and staff healthy and
																safe.
															</p>
														</li>
													</ol>
												</div>
											</DialogContent>
										</Dialog>
									</div>
								</CardContent>
							</Card>
						</TabsContent>
					</Tabs>
				</div>
			</section>

			{/* Parent Involvement */}
			<section className="py-16 bg-gray-50">
				<div className="container">
					<motion.div
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5 }}
						className="text-center mb-12"
					>
						<h2 className="text-3xl font-bold text-gray-900">
							Parent Involvement
						</h2>
						<div className="mt-2 h-1 w-20 bg-pink-500 mx-auto rounded-full"></div>
						<p className="mt-4 text-gray-600 max-w-2xl mx-auto">
							There are many ways for parents to get involved at Tot Spot
							Preschool.
						</p>
					</motion.div>

					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
						{[
							{
								title: "Volunteer Opportunities",
								description:
									"Help with special events, classroom activities, or field trips. Your time and talents enrich our program!",
								icon: "👥",
							},
							{
								title: "Parent Committee",
								description:
									"Join our parent committee to help plan events, fundraisers, and provide input on program decisions.",
								icon: "🤝",
							},
							{
								title: "Classroom Helper",
								description:
									"Assist teachers with classroom activities, reading to children, or helping with art projects.",
								icon: "📚",
							},
							{
								title: "Special Skills Sharing",
								description:
									"Share your profession, hobby, or cultural traditions with our students through special presentations.",
								icon: "🎭",
							},
							{
								title: "Fundraising",
								description:
									"Help with fundraising initiatives to support program enhancements and special activities.",
								icon: "💰",
							},
							{
								title: "Maintenance & Setup",
								description:
									"Assist with classroom setup, toy cleaning, or minor repairs to help maintain our facility.",
								icon: "🔧",
							},
						].map((opportunity, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: index * 0.1 }}
								className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-lg transition"
							>
								<div className="text-3xl mb-4">{opportunity.icon}</div>
								<h3 className="text-xl font-bold text-gray-900 mb-2">
									{opportunity.title}
								</h3>
								<p className="text-gray-600">{opportunity.description}</p>
							</motion.div>
						))}
					</div>

					<div className="mt-12 text-center">
						<Link href="/contact">
							<Button className="bg-pink-500 hover:bg-pink-700">
								Contact Us to Volunteer
							</Button>
						</Link>
					</div>
				</div>
			</section>

			{/* Parent Testimonials */}
			<section className="py-16">
				<div className="container">
					<motion.div
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5 }}
						className="text-center mb-12"
					>
						<h2 className="text-3xl font-bold text-gray-900">
							What Parents Say
						</h2>
						<div className="mt-2 h-1 w-20 bg-pink-500 mx-auto rounded-full"></div>
					</motion.div>
					<TestimonialCarousel testimonials={testimonials} />
				</div>
			</section>

			{/* FAQ */}
			<section className="py-16 bg-gray-50">
				<div className="container">
					<motion.div
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5 }}
						className="text-center mb-12"
					>
						<h2 className="text-3xl font-bold text-gray-900">
							Frequently Asked Questions
						</h2>
						<div className="mt-2 h-1 w-20 bg-pink-500 mx-auto rounded-full"></div>
					</motion.div>

					<div className="max-w-3xl mx-auto">
						<div className="grid gap-6">
							{[
								{
									question: "What should my child bring to school each day?",
									answer:
										"Children should bring a backpack with a healthy, nut-free snack, a water bottle, and a complete change of clothes. Please label all items with your child's name.",
								},
								{
									question: "How can I stay updated on classroom activities?",
									answer:
										"We send weekly newsletters via email, maintain a parent bulletin board, and use a parent communication app. Teachers are also available for brief conversations at drop-off and pick-up times.",
								},
								{
									question: "What is your illness policy?",
									answer:
										"Children should not attend preschool if they have a fever, vomiting, diarrhea, or any contagious illness. Children must be symptom-free for 24 hours before returning to school.",
								},
								{
									question: "How do you handle birthdays and celebrations?",
									answer:
										"We celebrate each child's birthday with a special crown and song. Parents may send a small, non-food treat for classmates (stickers, pencils, etc.). Please coordinate with your child's teacher in advance.",
								},
							].map((faq, index) => (
								<motion.div
									key={index}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ delay: index * 0.1 }}
								>
									<Card className="hover:scale-105 transition-transform transform duration-300">
										<CardContent className="pt-6">
											<h3 className="text-lg font-bold text-gray-900 mb-2">
												{faq.question}
											</h3>
											<p className="text-gray-600">{faq.answer}</p>
										</CardContent>
									</Card>
								</motion.div>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-16 bg-pink-600 text-white">
				<div className="container">
					<div className="max-w-3xl mx-auto text-center">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5 }}
							className="space-y-6"
						>
							<h2 className="text-3xl font-bold">Have Questions?</h2>
							<p className="text-pink-100 text-lg">
								We're here to help! Contact us with any questions or concerns
								about your child's preschool experience.
							</p>
							<div className="pt-4 flex flex-wrap justify-center gap-4">
								<Button
									size="lg"
									className="bg-white text-pink-600 hover:bg-pink-50"
									asChild
								>
									<Link href="/contact">Contact Us</Link>
								</Button>
							</div>
						</motion.div>
					</div>
				</div>
			</section>
		</div>
	);
}
