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
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
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
	policies,
	faq,
}: {
	dates: any[];
	testimonials: any[];
	parentsPagePhotos: any[];
	downloadableDocs: any[];
	policies: any[];
	faq: any[];
}) {
	const landingPhotoUrl =
		parentsPagePhotos[0].fields.landingPhoto.fields.file.url;

	const options = {
		renderNode: {
			[BLOCKS.PARAGRAPH]: (node, children) => {
				const isEmpty =
					!children ||
					(Array.isArray(children) &&
						children.length === 1 &&
						children[0] === "");
				return isEmpty ? <div style={{ height: "1rem" }} /> : <p>{children}</p>;
			},
			[BLOCKS.OL_LIST]: (node, children) => (
				<ol className="list-decimal pl-6 space-y-1">{children}</ol>
			),
			[BLOCKS.UL_LIST]: (node, children) => (
				<ul className="list-disc pl-6 space-y-1">{children}</ul>
			),
			[BLOCKS.LIST_ITEM]: (node, children) => <li>{children}</li>,
			[BLOCKS.QUOTE]: (node, children) => (
				<blockquote className="border-l-4 border-gray-400 pl-4 italic text-gray-600 my-4">
					{children}
				</blockquote>
			),
		},
	};

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
										{policies.map((policy, idx) => (
											<Dialog key={policy.sys.id || idx}>
												<DialogTrigger asChild>
													<Card className="cursor-pointer hover:shadow-lg transition">
														<CardContent className="pt-4">
															<h3 className="font-medium text-gray-900 mb-1">
																{policy.fields.name}
															</h3>
															<p className="text-sm text-gray-600 mb-3">
																{policy.fields.description}
															</p>
															<span className="text-pink-600 text-sm font-medium">
																Read More
															</span>
														</CardContent>
													</Card>
												</DialogTrigger>
												<DialogContent className="max-w-2xl w-[90vw] max-h-[90vh] overflow-y-auto p-6 bg-white rounded-lg shadow-xl">
													<DialogHeader>
														<DialogTitle>{policy.fields.name}</DialogTitle>
													</DialogHeader>
													<div className="mt-2 text-gray-700 whitespace-pre-wrap">
														{documentToReactComponents(
															policy.fields.policy,
															options
														)}
													</div>
												</DialogContent>
											</Dialog>
										))}
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
							Tot Spot is a pre-school that values and requires family
							participation.
						</p>
						<p className="mt-4 text-gray-600 max-w-2xl mx-auto">
							Sign up to volunteer at pick-up or drop-off.
						</p>
					</motion.div>

					<div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
						{[
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
							{faq
								.filter((item) => item.fields.question && item.fields.answer)
								.map((item) => ({
									question: item.fields.question,
									answer: documentToReactComponents(
										item.fields.answer,
										options
									),
								})) // Ensure both question and answer exist
								.map((faq, index) => (
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
