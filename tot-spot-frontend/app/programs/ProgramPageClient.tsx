"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Users, AlertCircle, DollarSign } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";
import { CardDescription } from "@/components/ui/card";
import { CardHeader } from "@/components/ui/card";
import { CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
	Accordion,
	AccordionItem,
	AccordionTrigger,
	AccordionContent,
} from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import { RegistrationDialog } from "@/components/registration-dialog";

export default function ProgramPageClient({
	programs,
	programsPagePhotos,
	downloadableDocs,
}: {
	programs: any[];
	programsPagePhotos: any[];
	downloadableDocs: any[];
}) {
	const [registrationOpen, setRegistrationOpen] = useState(false);
	const [selectedProgram, setSelectedProgram] = useState("");
	const [selectedProgramDays, setSelectedProgramDays] = useState("");
	const [selectedProgramTime, setSelectedProgramTime] = useState("");
	const [selectedProgramPrice, setSelectedProgramPrice] = useState("");

	const openRegistration = (
		programName: string,
		programDays: string,
		programTime: string,
		programPrice: string
	) => {
		setSelectedProgram(programName);
		setSelectedProgramDays(programDays);
		setSelectedProgramTime(programTime);
		setSelectedProgramPrice(programPrice);
		setRegistrationOpen(true);
	};

	const closeRegistration = () => {
		setRegistrationOpen(false);
	};

	const threeYearPrograms = programs
		.filter((program) => program.fields.age === 3)
		.sort((a, b) => a.fields.option - b.fields.option);

	const fourYearPrograms = programs
		.filter((program) => program.fields.age === 4)
		.sort((a, b) => a.fields.option - b.fields.option);

	const landingPhotoUrl =
		programsPagePhotos[0].fields.landingPhoto.fields.file.url;

	return (
		<div className="min-h-screen">
			{/* Registration Dialog */}
			<RegistrationDialog
				isOpen={registrationOpen}
				onClose={closeRegistration}
				programName={selectedProgram}
				programDays={selectedProgramDays}
				programTime={selectedProgramTime}
				programPrice={selectedProgramPrice}
				downloadableDocs={downloadableDocs}
			/>

			{/* Hero Section */}
			<section className="relative h-[300px] overflow-hidden">
				<div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 z-10" />
				<Image
					src={landingPhotoUrl}
					alt="Tot Spot Programs"
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
							Programs & Registration
						</h1>
						<p className="mt-6 text-lg text-white/90 max-w-xl">
							Discover our preschool programs designed to nurture your child's
							development and prepare them for future success.
						</p>
					</motion.div>
				</div>
			</section>

			{/* Programs Overview */}
			<section id="programs" className="py-16 md:py-24">
				<div className="container">
					<motion.div
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5 }}
						className="text-center mb-12"
					>
						<h2 className="text-3xl font-bold text-gray-900">Our Programs</h2>
						<div className="mt-2 h-1 w-20 bg-pink-500 mx-auto rounded-full"></div>
						<p className="mt-4 text-gray-600 max-w-2xl mx-auto">
							Tot Spot offers developmentally appropriate programs for children
							ages 3-4 years old.
						</p>
						<p className="mt-4 text-gray-600 max-w-2xl mx-auto italic">
							* Prices have already been reduced to reflect the Affordability Grant *
						</p>
					</motion.div>

					<Tabs defaultValue="three-year" className="max-w-4xl mx-auto">
						<TabsList className="grid w-full grid-cols-2">
							<TabsTrigger value="three-year">3 Year Old Programs</TabsTrigger>
							<TabsTrigger value="four-year">4 Year Old Programs</TabsTrigger>
						</TabsList>

						{/* 3 Year Old Programs */}
						<TabsContent value="three-year" className="mt-6">
							<Card>
								<CardHeader>
									<div className="flex items-center gap-3 mb-2">
										<Users className="h-6 w-6 text-pink-500" />
										<CardTitle>3 Year Old Programs</CardTitle>
									</div>
									<CardDescription>
										Choose from three schedule options designed for our young
										preschoolers
									</CardDescription>
								</CardHeader>
								<CardContent className="space-y-8">
									<div className="grid md:grid-cols-3 gap-6">
										{threeYearPrograms.map((program, index) => {
											const {
												age,
												option,
												days,
												time,
												price,
												capacity,
												enrolled,
											} = program.fields;
											const remainingSpots = capacity - enrolled;
											const availabilityPercentage =
												(enrolled / capacity) * 100;

											let buttonText = "Register";
											if (remainingSpots === 0) {
												buttonText = "Contact for Waitlist";
											}

											return (
												<Card
													key={index}
													className="border rounded-lg p-5 h-full flex flex-col"
												>
													<h3 className="text-xl font-bold text-gray-900 mb-4">
														{age} Years / Option {option}
													</h3>
													<div className="space-y-4 flex-grow">
														<div className="flex items-start gap-2">
															<Calendar className="h-5 w-5 text-pink-600 mt-0.5" />
															<div>
																<h4 className="font-medium text-gray-900">
																	Days
																</h4>
																<p className="text-gray-600">
																	{days.join("/")}
																</p>
															</div>
														</div>
														<div className="flex items-start gap-2">
															<Clock className="h-5 w-5 text-pink-600 mt-0.5" />
															<div>
																<h4 className="font-medium text-gray-900">
																	Time
																</h4>
																<p className="text-gray-600">{time}</p>
															</div>
														</div>
														<div className="flex items-start gap-2">
															<DollarSign className="h-5 w-5 text-pink-600 mt-0.5" />
															<div>
																<h4 className="font-medium text-gray-900">
																	Price
																</h4>
																<p className="text-gray-600">{price}</p>
															</div>
														</div>
													</div>
													{/* Availability Indicator */}
													<div className="mt-2">
														<div className="flex justify-between items-center mb-1">
															<h3 className="font-medium text-gray-900">
																Availability
															</h3>
															<span
																className={`text-sm font-medium ${
																	remainingSpots <= 3
																		? "text-amber-600"
																		: "text-green-600"
																}`}
															>
																{remainingSpots === 0
																	? "Waitlist Only"
																	: remainingSpots <= 3
																		? "Limited Spots"
																		: "Available"}
															</span>
														</div>
														<Progress
															value={availabilityPercentage}
															className="h-2 bg-gray-100"
															indicatorClassName={
																remainingSpots === 0
																	? "bg-red-500"
																	: "bg-amber-500"
															}
														/>
													</div>
													<div className="pt-4 mt-auto">
														{buttonText === "Contact for Waitlist" ? (
															<Link href="/contact">
																<Button className="w-full bg-pink-500 hover:bg-pink-700">
																	{buttonText}
																</Button>
															</Link>
														) : (
															<Button
																className="w-full bg-pink-500 hover:bg-pink-700"
																onClick={() =>
																	openRegistration(
																		"3 Year Old Program Option " + option,
																		days,
																		time,
																		price
																	)
																}
															>
																{buttonText}
															</Button>
														)}
													</div>
												</Card>
											);
										})}
									</div>
									<div className="pt-4">
										<h3 className="text-lg font-medium text-gray-900 mb-3">
											Program Highlights for All 3-Year-Old Classes
										</h3>
										<ul className="grid gap-2">
											<li className="flex items-start gap-2">
												<div className="h-5 w-5 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 flex-shrink-0 mt-0.5">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														viewBox="0 0 24 24"
														fill="none"
														stroke="currentColor"
														strokeWidth="2"
														strokeLinecap="round"
														strokeLinejoin="round"
														className="h-3 w-3"
													>
														<polyline points="20 6 9 17 4 12"></polyline>
													</svg>
												</div>
												<span className="text-gray-600">
													Focus on social skills, sharing, and making friends
												</span>
											</li>
											<li className="flex items-start gap-2">
												<div className="h-5 w-5 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 flex-shrink-0 mt-0.5">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														viewBox="0 0 24 24"
														fill="none"
														stroke="currentColor"
														strokeWidth="2"
														strokeLinecap="round"
														strokeLinejoin="round"
														className="h-3 w-3"
													>
														<polyline points="20 6 9 17 4 12"></polyline>
													</svg>
												</div>
												<span className="text-gray-600">
													Introduction to classroom routines and group
													activities
												</span>
											</li>
											<li className="flex items-start gap-2">
												<div className="h-5 w-5 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 flex-shrink-0 mt-0.5">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														viewBox="0 0 24 24"
														fill="none"
														stroke="currentColor"
														strokeWidth="2"
														strokeLinecap="round"
														strokeLinejoin="round"
														className="h-3 w-3"
													>
														<polyline points="20 6 9 17 4 12"></polyline>
													</svg>
												</div>
												<span className="text-gray-600">
													Development of fine and gross motor skills
												</span>
											</li>
											<li className="flex items-start gap-2">
												<div className="h-5 w-5 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 flex-shrink-0 mt-0.5">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														viewBox="0 0 24 24"
														fill="none"
														stroke="currentColor"
														strokeWidth="2"
														strokeLinecap="round"
														strokeLinejoin="round"
														className="h-3 w-3"
													>
														<polyline points="20 6 9 17 4 12"></polyline>
													</svg>
												</div>
												<span className="text-gray-600">
													Introduction to shapes, colours, and numbers
												</span>
											</li>
											<li className="flex items-start gap-2">
												<div className="h-5 w-5 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 flex-shrink-0 mt-0.5">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														viewBox="0 0 24 24"
														fill="none"
														stroke="currentColor"
														strokeWidth="2"
														strokeLinecap="round"
														strokeLinejoin="round"
														className="h-3 w-3"
													>
														<polyline points="20 6 9 17 4 12"></polyline>
													</svg>
												</div>
												<span className="text-gray-600">
													Creative arts, music, and movement activities
												</span>
											</li>
										</ul>
									</div>
								</CardContent>
							</Card>
						</TabsContent>

						{/* 4 Year Old Programs */}
						<TabsContent value="four-year" className="mt-6">
							<Card>
								<CardHeader>
									<div className="flex items-center gap-3 mb-2">
										<Users className="h-6 w-6 text-pink-500" />
										<CardTitle>4 Year Old Programs</CardTitle>
									</div>
									<CardDescription>
										Choose from three schedule options designed to prepare your
										child for kindergarten
									</CardDescription>
								</CardHeader>
								<CardContent className="space-y-8">
									<div className="grid md:grid-cols-3 gap-6">
										{fourYearPrograms.map((program, index) => {
											const {
												age,
												option,
												days,
												time,
												price,
												capacity,
												enrolled,
											} = program.fields;
											const remainingSpots = capacity - enrolled;
											const availabilityPercentage =
												(enrolled / capacity) * 100;

											let buttonText = "Register";
											if (remainingSpots === 0) {
												buttonText = "Contact for Waitlist";
											}

											return (
												<Card
													key={index}
													className="border rounded-lg p-5 h-full flex flex-col"
												>
													<h3 className="text-xl font-bold text-gray-900 mb-4">
														{age} Years / Option {option}
													</h3>
													<div className="space-y-4 flex-grow">
														<div className="flex items-start gap-2">
															<Calendar className="h-5 w-5 text-pink-600 mt-0.5" />
															<div>
																<h4 className="font-medium text-gray-900">
																	Days
																</h4>
																<p className="text-gray-600">
																	{days.join("/")}
																</p>
															</div>
														</div>
														<div className="flex items-start gap-2">
															<Clock className="h-5 w-5 text-pink-600 mt-0.5" />
															<div>
																<h4 className="font-medium text-gray-900">
																	Time
																</h4>
																<p className="text-gray-600">{time}</p>
															</div>
														</div>
														<div className="flex items-start gap-2">
															<Users className="h-5 w-5 text-pink-600 mt-0.5" />
															<div>
																<h4 className="font-medium text-gray-900">
																	Price
																</h4>
																<p className="text-gray-600">{price}</p>
															</div>
														</div>
													</div>
													{/* Availability Indicator */}
													<div className="mt-2">
														<div className="flex justify-between items-center mb-1">
															<h3 className="font-medium text-gray-900">
																Availability
															</h3>
															<span
																className={`text-sm font-medium ${
																	remainingSpots <= 3
																		? "text-amber-600"
																		: "text-green-600"
																}`}
															>
																{remainingSpots === 0 ? (
																	<span className="text-sm text-red-600 font-medium flex items-center gap-1">
																		<AlertCircle className="h-3 w-3" /> Waitlist
																		Only
																	</span>
																) : remainingSpots <= 3 ? (
																	"Limited Spots"
																) : (
																	"Available"
																)}
															</span>
														</div>
														<Progress
															value={availabilityPercentage}
															className="h-2 bg-gray-100"
															indicatorClassName={
																remainingSpots === 0
																	? "bg-red-500"
																	: "bg-amber-500"
															}
														/>
													</div>
													<div className="pt-4 mt-auto">
														{buttonText === "Contact for Waitlist" ? (
															<Link href="/contact">
																<Button className="w-full bg-pink-500 hover:bg-pink-700">
																	{buttonText}
																</Button>
															</Link>
														) : (
															<Button
																className="w-full bg-pink-500 hover:bg-pink-700"
																onClick={() =>
																	openRegistration(
																		"4 Year Old Program Option " + option,
																		days,
																		time,
																		price
																	)
																}
															>
																{buttonText}
															</Button>
														)}
													</div>
												</Card>
											);
										})}
									</div>
									<div className="pt-4">
										<h3 className="text-lg font-medium text-gray-900 mb-3">
											Program Highlights for All 4-Year-Old Classes
										</h3>
										<ul className="grid gap-2">
											<li className="flex items-start gap-2">
												<div className="h-5 w-5 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 flex-shrink-0 mt-0.5">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														viewBox="0 0 24 24"
														fill="none"
														stroke="currentColor"
														strokeWidth="2"
														strokeLinecap="round"
														strokeLinejoin="round"
														className="h-3 w-3"
													>
														<polyline points="20 6 9 17 4 12"></polyline>
													</svg>
												</div>
												<span className="text-gray-600">
													Comprehensive kindergarten readiness curriculum
												</span>
											</li>
											<li className="flex items-start gap-2">
												<div className="h-5 w-5 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 flex-shrink-0 mt-0.5">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														viewBox="0 0 24 24"
														fill="none"
														stroke="currentColor"
														strokeWidth="2"
														strokeLinecap="round"
														strokeLinejoin="round"
														className="h-3 w-3"
													>
														<polyline points="20 6 9 17 4 12"></polyline>
													</svg>
												</div>
												<span className="text-gray-600">
													Development of self-help skills and independence
												</span>
											</li>
											<li className="flex items-start gap-2">
												<div className="h-5 w-5 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 flex-shrink-0 mt-0.5">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														viewBox="0 0 24 24"
														fill="none"
														stroke="currentColor"
														strokeWidth="2"
														strokeLinecap="round"
														strokeLinejoin="round"
														className="h-3 w-3"
													>
														<polyline points="20 6 9 17 4 12"></polyline>
													</svg>
												</div>
												<span className="text-gray-600">
													Enhanced focus on early literacy
												</span>
											</li>
											<li className="flex items-start gap-2">
												<div className="h-5 w-5 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 flex-shrink-0 mt-0.5">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														viewBox="0 0 24 24"
														fill="none"
														stroke="currentColor"
														strokeWidth="2"
														strokeLinecap="round"
														strokeLinejoin="round"
														className="h-3 w-3"
													>
														<polyline points="20 6 9 17 4 12"></polyline>
													</svg>
												</div>
												<span className="text-gray-600">
													Science exploration and discovery activities
												</span>
											</li>
											<li className="flex items-start gap-2">
												<div className="h-5 w-5 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 flex-shrink-0 mt-0.5">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														viewBox="0 0 24 24"
														fill="none"
														stroke="currentColor"
														strokeWidth="2"
														strokeLinecap="round"
														strokeLinejoin="round"
														className="h-3 w-3"
													>
														<polyline points="20 6 9 17 4 12"></polyline>
													</svg>
												</div>
												<span className="text-gray-600">
													Introduction to basic math concepts
												</span>
											</li>
										</ul>
									</div>
								</CardContent>
							</Card>
						</TabsContent>
					</Tabs>
				</div>
			</section>

			{/* Registration Process */}
			<section id="registration" className="py-16 bg-gray-50">
				<div className="container">
					<motion.div
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5 }}
						className="text-center mb-12"
					>
						<h2 className="text-3xl font-bold text-gray-900">
							Registration Process
						</h2>
						<div className="mt-2 h-1 w-20 bg-pink-500 mx-auto rounded-full"></div>
						<p className="mt-4 text-gray-600 max-w-2xl mx-auto">
							Follow these steps to register your child for Tot Spot Preschool.
						</p>
					</motion.div>

					<div className="max-w-3xl mx-auto">
						<div className="relative">
							<div className="absolute left-8 top-0 bottom-0 w-0.5 bg-pink-200"></div>

							{[
								{
									step: "Step 1",
									title: "Submit Registration Form",
									description: "Complete our online registration form.",
									action: "Register Online",
									href: "/programs#programs",
								},
								{
									step: "Step 2",
									title: "Pay Registration Fee",
									description:
										"A non-refundable registration fee of $100 is required to secure your child's spot.",
									action: "View Fee Details",
									href: "/programs#programs",
								},
								{
									step: "Step 3",
									title: "Receive Confirmation",
									description:
										"Once your registration is processed, you'll receive a confirmation email with additional information.",
									action: null,
									href: null,
								},
								{
									step: "Step 4",
									title: "Complete Required Forms",
									description:
										"You'll need to complete and submit the Pre-Authorized Debit form if that is your payment method.",
									action: "Download Forms",
									href: "/parents#resources",
								},
								{
									step: "Step 5",
									title: "Start Classes",
									description:
										"Your child is ready to start their preschool journey at Tot Spot!",
									action: null,
									href: null,
								},
							].map((step, index) => (
								<motion.div
									key={index}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ delay: index * 0.1 }}
									className="relative pl-16 pb-10"
								>
									<div className="absolute left-0 top-0 h-16 w-16 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 font-medium">
										{step.step}
									</div>
									<div className="bg-white p-6 rounded-lg shadow-sm">
										<h3 className="text-xl font-bold text-gray-900 mb-2">
											{step.title}
										</h3>
										<p className="text-gray-600 mb-4">{step.description}</p>
										{step.action && (
											<Link href={step.href}>
												<Button
													variant="outline"
													className="text-pink-600 border-pink-600 hover:bg-pink-50"
												>
													{step.action}
												</Button>
											</Link>
										)}
									</div>
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
							<h2 className="text-3xl font-bold">
								Ready to Enroll Your Child?
							</h2>
							<p className="text-pink-100 text-lg">
								Spaces fill quickly! Register today to secure your child's spot
								at Tot Spot Preschool.
							</p>
							<div className="pt-4 flex flex-wrap justify-center gap-4">
								<Link href="/programs#programs">
									<Button
										size="lg"
										className="bg-white text-pink-600 hover:bg-pink-100"
									>
										Register Now
									</Button>
								</Link>

								<Link href="/contact">
									<Button
										size="lg"
										variant="outline"
										className="text-black border-white hover:bg-pink-700 hover:text-white"
									>
										Contact Us
									</Button>
								</Link>
							</div>
						</motion.div>
					</div>
				</div>
			</section>
		</div>
	);
}
