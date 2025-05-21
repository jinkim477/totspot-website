"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";
import { CardDescription } from "@/components/ui/card";
import { CardHeader } from "@/components/ui/card";
import { CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import DatesSection from "@/components/dates";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

export default function UpdatesPage({
	dates,
	monthlyUpdates,
	updatePagePhotos,
}: {
	dates: any;
	monthlyUpdates: any;
	updatePagePhotos: any;
}) {
	const latestUpdate = [...monthlyUpdates].sort(
		(a, b) =>
			new Date(b.fields.month).getTime() - new Date(a.fields.month).getTime()
	)[0];

	const formattedDate = new Date(latestUpdate.fields.month).toLocaleDateString(
		"en-US",
		{
			month: "long",
			year: "numeric",
		}
	);

	const landingPhotoUrl =
		updatePagePhotos[0].fields.landingPhoto.fields.file.url;

	return (
		<div className="min-h-screen">
			{/* Hero Section */}
			<section className="relative h-[400px] overflow-hidden">
				<div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 z-10" />
				<Image
					src={landingPhotoUrl}
					alt="Tot Spot Updates"
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
							News & Updates
						</h1>
						<p className="mt-6 text-lg text-white/90 max-w-xl">
							Stay up-to-date with the latest news and events from Tot Spot
							Preschool.
						</p>
					</motion.div>
				</div>
			</section>

			{/* Monthly Updates */}
			<section id="updates" className="py-16">
				<div className="container">
					<motion.div
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5 }}
						className="text-center mb-12"
					>
						<h2 className="text-3xl font-bold text-gray-900">
							Monthly Updates
						</h2>
						<div className="mt-2 h-1 w-20 bg-pink-600 mx-auto rounded-full"></div>
					</motion.div>

					{/* Featured Monthly Update */}
					<div className="grid gap-8">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5 }}
						>
							<Card className="overflow-hidden">
								<div className="md:flex">
									<div className="md:w-1/3 h-[200px] md:h-auto relative">
										<Image
											src={latestUpdate.fields.photo.fields.file.url}
											alt={latestUpdate.fields.photo.fields.title}
											fill
											className="object-cover"
										/>
									</div>
									<div className="md:w-2/3">
										<CardHeader>
											<div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
												<Calendar className="h-4 w-4" />
												<span>{formattedDate}</span>
											</div>
											<CardTitle>{formattedDate} - Monthly Update</CardTitle>
										</CardHeader>
										<CardContent>
											<p className="text-gray-600 line-clamp-6 mb-4">
												{latestUpdate.fields.description}
											</p>
											<Dialog>
												<DialogTrigger asChild>
													<Button className="bg-pink-600 hover:bg-pink-700">
														Read More
													</Button>
												</DialogTrigger>
												<DialogContent className="max-w-4xl w-[90vw] max-h-[90vh] overflow-y-auto p-6 bg-white rounded-lg shadow-xl">
													<DialogHeader className="text-center">
														<div className="flex justify-center">
															<DialogTitle>
																{formattedDate} - Monthly Update
															</DialogTitle>
														</div>
													</DialogHeader>
													<div className="space-y-4">
														<div className="flex justify-center">
															<Image
																src={latestUpdate.fields.photo.fields.file.url}
																alt={latestUpdate.fields.photo.fields.title}
																width={800}
																height={400}
																className="rounded-md"
															/>
														</div>
														<p className="text-gray-700 whitespace-pre-wrap">
															{latestUpdate.fields.description}
														</p>
													</div>
												</DialogContent>
											</Dialog>
										</CardContent>
									</div>
								</div>
							</Card>
						</motion.div>
					</div>

					{/* Rest of Monthly Updates List */}
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
						{[...monthlyUpdates]
							.filter((entry) => entry.sys.id !== latestUpdate.sys.id) // Exclude the featured update
							.sort(
								(a, b) =>
									new Date(b.fields.month).getTime() -
									new Date(a.fields.month).getTime()
							)
							.map((entry, index) => {
								const date = new Date(entry.fields.month).toLocaleDateString(
									"en-US",
									{
										month: "long",
										year: "numeric",
									}
								);

								return (
									<motion.div
										key={entry.sys.id}
										initial={{ opacity: 0, y: 20 }}
										whileInView={{ opacity: 1, y: 0 }}
										viewport={{ once: true }}
										transition={{ delay: index * 0.1 }}
									>
										<Card className="overflow-hidden h-full flex flex-col">
											<div className="h-48 relative">
												<Image
													src={entry.fields.photo.fields.file.url}
													alt={entry.fields.photo.fields.title}
													fill
													className="object-cover"
												/>
											</div>
											<CardHeader>
												<div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
													<Calendar className="h-4 w-4" />
													<span>{date}</span>
												</div>
												<CardTitle>{date} – Monthly Update</CardTitle>
											</CardHeader>
											<CardContent className="flex-grow">
												<p className="text-gray-600 line-clamp-5">
													{entry.fields.description}
												</p>
											</CardContent>
											<div className="p-6 pt-0">
												<Dialog>
													<DialogTrigger asChild>
														<Button
															variant="link"
															className="p-0 h-auto text-pink-600"
														>
															Read more <ArrowRight className="ml-1 h-4 w-4" />
														</Button>
													</DialogTrigger>
													<DialogContent className="max-w-4xl w-[90vw] max-h-[90vh] overflow-y-auto p-6 bg-white rounded-lg shadow-xl">
														<DialogHeader className="text-center">
															<div className="flex justify-center">
																<DialogTitle>
																	{date} – Monthly Update
																</DialogTitle>
															</div>
														</DialogHeader>
														<div className="space-y-4">
															<div className="flex justify-center">
																<Image
																	src={entry.fields.photo.fields.file.url}
																	alt={entry.fields.photo.fields.title}
																	width={800}
																	height={400}
																	className="rounded-md"
																/>
															</div>
															<p className="text-gray-700 whitespace-pre-wrap">
																{entry.fields.description}
															</p>
														</div>
													</DialogContent>
												</Dialog>
											</div>
										</Card>
									</motion.div>
								);
							})}
					</div>
				</div>
			</section>

			<DatesSection id="dates" dates={dates} />

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
								Contact us to learn more about Tot Spot Preschool and our
								programs.
							</p>
							<div className="pt-4 flex flex-wrap justify-center gap-4">
								<Button
									size="lg"
									className="bg-white text-pink-600 hover:bg-pink-100"
									asChild
								>
									<Link href="/contact">Contact Us</Link>
								</Button>
								<Button
									size="lg"
									variant="outline"
									className="text-black border-white hover:bg-pink-700 hover:text-white"
									asChild
								>
									<Link href="/programs">View Programs</Link>
								</Button>
							</div>
						</motion.div>
					</div>
				</div>
			</section>
		</div>
	);
}
