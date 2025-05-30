"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";
import { CardHeader } from "@/components/ui/card";
import { CardTitle } from "@/components/ui/card";
import { BLOCKS } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

export default function AboutPageClient({
	staff,
	facilities,
	aboutPagePhotos,
	aboutPageDetails,
}: {
	staff: any[];
	facilities: any[];
	aboutPagePhotos: any[];
	aboutPageDetails: any;
}) {
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

	const landingPhotoUrl =
		aboutPagePhotos[0].fields.landingPhoto.fields.file.url;
	const philosophyPhotoUrl =
		aboutPagePhotos[0].fields.philosophyPhoto.fields.file.url;

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
					alt="About Tot Spot Preschool"
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
							About Tot Spot
						</h1>
						<div className="mt-6 text-lg text-white/90 max-w-xl">
							{documentToReactComponents(aboutPageDetails[0].fields.landingText, options)}
						</div>
					</motion.div>
				</div>
			</section>

			{/* Our Philosophy */}
			<section className="py-16 bg-gray-50">
				<div className="container">
					<motion.div
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5 }}
						className="text-center mb-12"
					>
						<h2 className="text-3xl font-bold text-gray-900">Our Philosophy</h2>
						<div className="mt-2 h-1 w-20 bg-pink-600 mx-auto rounded-full"></div>
					</motion.div>

					<div className="grid md:grid-cols-2 gap-12 items-center">
						<motion.div
							initial={{ opacity: 0, x: -20 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5 }}
						>
							<Image
								src={philosophyPhotoUrl}
								alt="Tot Spot Philosophy"
								width={600}
								height={400}
								className="rounded-lg shadow-lg"
							/>
						</motion.div>
						<motion.div
							initial={{ opacity: 0, x: 20 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5 }}
							className="space-y-6"
						>
							<div className="text-gray-600">
								{documentToReactComponents(aboutPageDetails[0].fields.philosophyMessage, options)}
							</div>
							
						</motion.div>
					</div>
				</div>
			</section>

			{/* Meet Our Team */}
			<section className="py-16 md:py-24">
				<div className="container">
					<motion.div
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5 }}
						className="text-center mb-12"
					>
						<h2 className="text-3xl font-bold text-gray-900">Meet Our Team</h2>
						<div className="mt-2 h-1 w-20 bg-pink-600 mx-auto rounded-full"></div>
						<p className="mt-4 text-gray-600 max-w-2xl mx-auto">
							Our experienced and dedicated teachers are passionate about early
							childhood education.
						</p>
					</motion.div>

					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
						{staff.map((staff: any, index: number) => {
							const { name, role, photo } = staff.fields;
							const imageUrl = `https:${photo.fields.file.url}`;

							return (
								<motion.div
									key={index}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ delay: index * 0.1 }}
								>
									<Card className="overflow-hidden h-full transform transition-transform duration-300 hover:scale-105">
										<div className="aspect-square relative">
											<Image
												src={imageUrl}
												alt={name}
												fill
												className="object-cover"
											/>
										</div>
										<CardHeader>
											<CardTitle className="text-center">{name}</CardTitle>
											<p className="text-sm text-pink-600 font-medium text-center">
												{role}
											</p>
										</CardHeader>
									</Card>
								</motion.div>
							);
						})}
					</div>
				</div>
			</section>

			{/* Our Facility */}
			<section id="facility" className="py-16 bg-gray-50">
				<div className="container">
					<motion.div
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5 }}
						className="text-center mb-12"
					>
						<h2 className="text-3xl font-bold text-gray-900">Our Facility</h2>
						<div className="mt-2 h-1 w-20 bg-pink-600 mx-auto rounded-full"></div>
						<p className="mt-4 text-gray-600 max-w-2xl mx-auto">
							Tot Spot has several distinct play/learning areas for children to
							experience each day. Each provides different activities designed
							to develop a wide variety of skills. We provide a theme-based
							program and our toys are rotated monthly.
						</p>
					</motion.div>
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
						{facilities.map((facility, index) => {
							const { title, description, photo } = facility.fields;
							const imageUrl = `https:${photo.fields.file.url}`;

							return (
								<motion.div
									key={index}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ delay: index * 0.1 }}
								>
									<Card className="overflow-hidden h-full transform transition-transform duration-300 hover:scale-105">
										<div className="h-48 relative">
											<Image
												src={imageUrl}
												alt={title}
												fill
												className="object-cover"
											/>
										</div>
										<CardHeader>
											<CardTitle className="text-xl">{title}</CardTitle>
										</CardHeader>
										<CardContent>
											<p className="text-gray-600">{description}</p>
										</CardContent>
									</Card>
								</motion.div>
							);
						})}
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
								Come See Tot Spot for Yourself
							</h2>
							<p className="text-pink-100 text-lg">
								We invite you to schedule a tour of our facility and meet our
								wonderful teachers.
							</p>
							<div className="pt-4 flex flex-wrap justify-center gap-4">
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
