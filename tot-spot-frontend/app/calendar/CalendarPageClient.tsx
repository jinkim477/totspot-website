"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function CalendarPageClient({
	calPagePhotos,
	events,
	calDates,
}: {
	calPagePhotos: any[];
	events: any[];
	calDates: any[];
}) {
	const landingPhotoUrl = calPagePhotos[0].fields.landingPhoto.fields.file.url;

	function formatUTCDate(dateString: string) {
		if (!dateString) return "";
		const [year, month, day] = dateString.split("-").map(Number);
		const date = new Date(Date.UTC(year, month - 1, day));
		return date.toLocaleDateString("en-US", {
			month: "short",
			day: "numeric",
			year: "numeric",
			timeZone: "UTC",
		});
	}

	// --- Inline DatesSection logic ---
	// Group events by month
	const getMonthKey = (dateStr: string) => {
		const date = new Date(dateStr);
		return date.toLocaleString("en-US", {
			month: "long",
			year: "numeric",
		});
	};

	const grouped = events.reduce(
		(acc, entry) => {
			const rawDate = entry.fields.event;
			if (!rawDate) return acc;
			const date = new Date(rawDate);
			if (isNaN(date.getTime())) return acc;
			const key = getMonthKey(rawDate);
			if (!acc[key]) acc[key] = [];
			acc[key].push(entry);
			return acc;
		},
		{} as Record<string, any[]>
	);

	const latestThreeMonths = Object.entries(grouped)
		.sort(
			([a], [b]) =>
				new Date(grouped[b][0].fields.event).getTime() -
				new Date(grouped[a][0].fields.event).getTime()
		)
		.slice(0, 3);

	// Animation variants
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

	return (
		<div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
			{/* Hero Section */}
			<section className="relative h-[300px] overflow-hidden">
				<div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 z-10" />
				<Image
					src={landingPhotoUrl}
					alt="Tot Spot Calendar"
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
							Calendar
						</h1>
						<p className="mt-6 text-lg text-white/90 max-w-xl">
							Stay up-to-date with all upcoming events and important dates at
							Tot Spot Preschool.
						</p>
					</motion.div>
				</div>
			</section>

			<section className="py-16">
				<div className="container mx-auto w-full">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						{/* Calendar Dates */}
						<div className="flex flex-col">
							<Card>
								<CardHeader>
									<CardTitle className="text-2xl">Calendar Dates</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="relative">
										<div className="max-h-[500px] overflow-y-auto pr-2">
											<ul>
												{(calDates ?? [])
													.sort(
														(a, b) =>
															new Date(a.fields.event).getTime() -
															new Date(b.fields.event).getTime()
													)
													.map((entry) => {
														const startDate = entry.fields.event;
														const endDate = entry.fields.endDate;
														const dateText = endDate
															? `${formatUTCDate(startDate)} – ${formatUTCDate(endDate)}`
															: formatUTCDate(startDate);

														return (
															<li
																key={entry.sys.id}
																className="grid grid-cols-1 md:grid-cols-12 gap-2 py-4 border-b last:border-0 items-center"
															>
																<span className="md:col-span-3 font-medium text-pink-700">
																	{dateText}
																</span>
																<span className="md:col-span-3 font-semibold text-gray-900">
																	{entry.fields.title}
																</span>
																<span className="md:col-span-6 text-sm text-gray-600">
																	{entry.fields.description}
																</span>
															</li>
														);
													})}
											</ul>
											{/* Fade effect */}
											<div className="pointer-events-none absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white to-transparent" />
										</div>
									</div>
								</CardContent>
							</Card>
							{/* Scroll indicator BELOW the card */}
							<div className="pt-6 flex justify-center">
								<span className="text-base font-semibold text-white bg-pink-600 px-4 py-2 rounded-lg animate-bounce shadow-lg">
									Scroll for more ↓
								</span>
							</div>
						</div>

						{/* School Events (inline, not a separate component) */}
						<Card>
							<CardHeader>
								<CardTitle className="text-2xl">School Events</CardTitle>
							</CardHeader>
							<CardContent>
								{latestThreeMonths.length === 0 ? (
									<p className="text-center text-gray-600 text-lg">
										No upcoming dates
									</p>
								) : (
									<Tabs
										defaultValue={latestThreeMonths[0][0]}
										className="w-full"
									>
										<TabsList className="grid w-full grid-cols-3">
											{latestThreeMonths.map(([monthKey]) => (
												<TabsTrigger key={monthKey} value={monthKey}>
													{monthKey}
												</TabsTrigger>
											))}
										</TabsList>
										{latestThreeMonths.map(([monthKey, entries]) => (
											<TabsContent
												key={monthKey}
												value={monthKey}
												className="mt-6"
											>
												<motion.ul
													variants={container}
													initial="hidden"
													whileInView="show"
													viewport={{ once: true }}
													className="space-y-4"
												>
													{entries
														.sort(
															(a, b) =>
																new Date(a.fields.event).getTime() -
																new Date(b.fields.event).getTime()
														)
														.map((entry, index) => {
															const end = entry.fields.endDate
																? entry.fields.endDate
																: null;

															const dateText = end
																? `${formatUTCDate(entry.fields.event)} – ${formatUTCDate(entry.fields.endDate)}`
																: formatUTCDate(entry.fields.event);

															return (
																<motion.li
																	key={entry.sys.id}
																	variants={item}
																	className="flex gap-4 pb-3 border-b last:border-0"
																>
																	<div className="w-24 flex-shrink-0 font-medium text-pink-600">
																		{dateText}
																	</div>
																	<div>
																		<div className="font-medium text-gray-900">
																			{entry.fields.title}
																		</div>
																		<div className="text-sm text-gray-600">
																			{entry.fields.description}
																		</div>
																	</div>
																</motion.li>
															);
														})}
												</motion.ul>
											</TabsContent>
										))}
									</Tabs>
								)}
							</CardContent>
						</Card>
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
								Contact us for more info or to learn about our programs.
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
