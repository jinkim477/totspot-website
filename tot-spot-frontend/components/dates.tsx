"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function DatesSection({ id, dates }: { id: any, dates: any[] }) {
	const getMonthKey = (dateStr: string) => {
		const date = new Date(dateStr);
		return date.toLocaleString("en-US", {
			month: "long",
			year: "numeric",
		});
	};

	const grouped = dates.reduce((acc, entry) => {
		const rawDate = entry.fields.event;
		if (!rawDate) return acc;

		const date = new Date(rawDate);
		if (isNaN(date.getTime())) return acc;

		const key = getMonthKey(rawDate);
		if (!acc[key]) acc[key] = [];
		acc[key].push(entry);
		return acc;
	}, {} as Record<string, any[]>);

	const latestThreeMonths = Object.entries(grouped)
		.sort(
			([a], [b]) =>
				new Date(grouped[b][0].fields.event).getTime() -
				new Date(grouped[a][0].fields.event).getTime()
		)
		.slice(0, 3);

	if (latestThreeMonths.length === 0) {
		return (
			<p className="text-center text-gray-600 text-lg">No upcoming dates</p>
		);
	}

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
		<section id={id} className="py-16 bg-gray-50">
			<div className="container">
				<motion.div
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
					className="text-center mb-12"
				>
					<h2 className="text-3xl font-bold text-gray-900">
						Important Dates
					</h2>
					<div className="mt-2 h-1 w-20 bg-pink-600 mx-auto rounded-full"></div>
				</motion.div>

				<Tabs
					defaultValue={latestThreeMonths[0][0]}
					className="max-w-3xl mx-auto"
				>
					<TabsList className="grid w-full grid-cols-3">
						{latestThreeMonths.map(([monthKey]) => (
							<TabsTrigger key={monthKey} value={monthKey}>
								{monthKey}
							</TabsTrigger>
						))}
					</TabsList>

					{latestThreeMonths.map(([monthKey, entries]) => (
						<TabsContent key={monthKey} value={monthKey} className="mt-6">
							<Card>
								<CardHeader>
									<CardTitle>{monthKey} Events</CardTitle>
									<CardDescription>
										Important dates and activities for {monthKey}
									</CardDescription>
								</CardHeader>
								<CardContent>
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
												const start = new Date(entry.fields.event);
												const end = entry.fields.endDate
													? new Date(entry.fields.endDate)
													: null;

												const dateText = end
													? `${start.toLocaleDateString("en-US", {
															month: "short",
															day: "numeric",
														})} – ${end.toLocaleDateString("en-US", {
															month: "short",
															day: "numeric",
														})}`
													: start.toLocaleDateString("en-US", {
															month: "short",
															day: "numeric",
														});

												return (
													<motion.li
														key={entry.sys.id}
														variants={item}
														className="flex gap-4 pb-3 border-b last:border-0"
													>
														<div className="w-20 flex-shrink-0 font-medium text-pink-600">
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
								</CardContent>
							</Card>
						</TabsContent>
					))}
				</Tabs>
			</div>
		</section>
	);
}
