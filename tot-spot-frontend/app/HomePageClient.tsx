"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
	ArrowRight,
	Calendar,
	ChevronDown,
	Clock,
	MapPin,
	Users,
	Phone,
	Mail,
	Check,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";
import { CardDescription } from "@/components/ui/card";
import { CardHeader } from "@/components/ui/card";
import { CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import DatesSection from "@/components/dates";
import { BLOCKS } from "@contentful/rich-text-types";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

export default function Home({
	programs,
	dates,
	monthlyUpdates,
	contactInfo,
	homePagePhotos,
	homePageDetails,
}: {
	programs: any[];
	dates: any[];
	monthlyUpdates: any[];
	contactInfo: any;
	homePagePhotos: any[];
	homePageDetails: any;
}) {
	const [scrollY, setScrollY] = useState(0);

	const threeYearPrograms = programs
		.filter((program) => program.fields.age === 3)
		.sort((a, b) => a.fields.option - b.fields.option);

	const fourYearPrograms = programs
		.filter((program) => program.fields.age === 4)
		.sort((a, b) => a.fields.option - b.fields.option);

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

	const { addressLineOne, addressLineTwo, phone, email, mapsLink } =
		contactInfo.fields;

	const landingPhotoUrl = homePagePhotos[0].fields.landingPhoto.fields.file.url;
	const welcomePhotoUrl = homePagePhotos[0].fields.welcomePhoto.fields.file.url;

	useEffect(() => {
		const handleScroll = () => {
			setScrollY(window.scrollY);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

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

	function getUTCMonthYear(dateString: string) {
		const date = new Date(dateString);
		const year = date.getUTCFullYear();
		const month = date.toLocaleString("en-US", {
			month: "long",
			timeZone: "UTC",
		});
		return `${month} ${year}`;
	}

	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
		subject: "",
		message: "",
	});

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [success, setSuccess] = useState(false);

	function handleChange(
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) {
		setFormData({ ...formData, [e.target.id]: e.target.value });
	}

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setIsSubmitting(true);
		setSuccess(false);

		try {
			const res = await fetch("/api/contact", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			});

			if (!res.ok) throw new Error("Failed to send");

			setSuccess(true);
			setFormData({
				firstName: "",
				lastName: "",
				email: "",
				phone: "",
				subject: "",
				message: "",
			});
		} catch (err) {
			console.error("❌ Email sending failed:", err);
			alert("Something went wrong. Please try again.");
		} finally {
			setIsSubmitting(false);
		}
	}

	const landingTitle = homePageDetails[0].fields.landingTitle;
	const [firstWord, ...restWords] = landingTitle.split(" ");
	const restOfTitle = restWords.join(" ");

	return (
		<div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
			{/* Hero Section */}
			<section className="relative h-[600px] overflow-hidden">
				<div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 z-10" />
				<Image
					src={landingPhotoUrl}
					alt="Children at Tot Spot Preschool"
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
						<h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
							<span className="text-yellow-400">{firstWord}</span> {restOfTitle}
						</h1>
						<div className="mt-6 text-lg text-white/90 max-w-xl">
							{documentToReactComponents(homePageDetails[0].fields.landingMessage, options)}
						</div>
						<div className="mt-10 flex flex-wrap gap-4">
							<Link href="/programs">
								<Button size="lg" className="bg-pink-600 hover:bg-pink-700">
									Register Now
								</Button>
							</Link>
							<Link href="/about">
								<Button
									size="lg"
									variant="outline"
									className="text-pink-600 border-white hover:bg-white/20 hover:text-white"
								>
									Our Philosophy
								</Button>
							</Link>
						</div>
					</motion.div>
				</div>

				{/* Animated background elements */}
				<motion.div
					className="absolute top-20 right-10 w-20 h-20 rounded-full bg-yellow-300 opacity-70"
					animate={{
						y: [0, 20, 0],
						scale: [1, 1.1, 1],
					}}
					transition={{
						repeat: Number.POSITIVE_INFINITY,
						duration: 5,
						ease: "easeInOut",
					}}
				/>
				<motion.div
					className="absolute bottom-20 left-10 w-16 h-16 rounded-full bg-blue-300 opacity-70"
					animate={{
						y: [0, -15, 0],
						scale: [1, 1.2, 1],
					}}
					transition={{
						repeat: Number.POSITIVE_INFINITY,
						duration: 4,
						ease: "easeInOut",
					}}
				/>
				<motion.div
					className="absolute top-40 left-1/4 w-12 h-12 rounded-full bg-green-300 opacity-70"
					animate={{
						y: [0, 10, 0],
						scale: [1, 1.1, 1],
					}}
					transition={{
						repeat: Number.POSITIVE_INFINITY,
						duration: 6,
						ease: "easeInOut",
					}}
				/>
			</section>

			{/* Welcome Section */}
			<section className="py-16 md:py-24">
				<div className="container">
					<motion.div
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5 }}
						className="text-center mb-12"
					>
						<h2 className="text-3xl font-bold text-gray-900">
							Welcome to <span className="text-pink-600">Tot Spot</span>
						</h2>
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
								src={welcomePhotoUrl}
								alt="Tot Spot Classroom"
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
							<h3 className="text-2xl font-bold text-gray-900">
								{documentToReactComponents(homePageDetails[0].fields.welcomeTitle, options)}
							</h3>
							<div className="text-gray-600">
								{documentToReactComponents(homePageDetails[0].fields.welcomeMessage, options)}
							</div>
							<div className="pt-4">
								<Link
									href="/about"
									className="inline-flex items-center text-pink-600 font-medium hover:text-pink-700"
								>
									Learn more about us <ArrowRight className="ml-2 h-4 w-4" />
								</Link>
							</div>
						</motion.div>
					</div>
				</div>
			</section>

			{/* Programs Overview */}
			<section className="py-16 bg-gradient-to-r from-purple-50 to-pink-50">
				<div className="container">
					<motion.div
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5 }}
						className="text-center mb-12"
					>
						<h2 className="text-3xl font-bold text-gray-900">Our Programs</h2>
						<div className="mt-2 h-1 w-20 bg-pink-600 mx-auto rounded-full"></div>
						<p className="mt-4 text-gray-600 max-w-2xl mx-auto">
							Tot Spot offers a variety of programs designed to meet the needs
							of children ages 3-4 years old.
						</p>
					</motion.div>

					<div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
						{[threeYearPrograms, fourYearPrograms].map((group, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: index * 0.1 }}
							>
								<Card className="h-full">
									<CardHeader>
										<div className="mb-2">
											<Users className="h-10 w-10 text-pink-600" />
										</div>
										<CardTitle>
											{group[0].fields.age} Year Old Program
										</CardTitle>
										<CardDescription>
											Options {group.map((p) => p.fields.option).join(", ")}
										</CardDescription>
									</CardHeader>

									<CardContent>
										<div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
											{group.map((program, i) => (
												<div
													key={i}
													className="border p-4 rounded-md bg-gray-50"
												>
													<div className="font-medium mb-1">
														Option {program.fields.option}
													</div>
													<ul className="space-y-1 text-sm text-gray-600">
														<li>
															<strong>Days:</strong>{" "}
															{program.fields.days.join("/")}
														</li>
														<li>
															<strong>Time:</strong> {program.fields.time}
														</li>
														<li>
															<strong>Price:</strong> {program.fields.price}
														</li>
													</ul>
												</div>
											))}
										</div>
										<div className="mt-6">
											<Link
												href="/programs"
												className="inline-flex items-center text-pink-600 text-sm font-medium hover:text-pink-700"
											>
												View all plans <ArrowRight className="ml-1 h-4 w-4" />
											</Link>
										</div>
									</CardContent>
								</Card>
							</motion.div>
						))}
					</div>

					<div className="mt-12 text-center">
						<Button asChild size="lg" className="bg-pink-600 hover:bg-pink-700">
							<Link href="/programs">View All Programs</Link>
						</Button>
					</div>
				</div>
			</section>

			<DatesSection dates={dates} />

			{/* Monthly Updates Section */}
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
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
						{[...monthlyUpdates]
							.sort(
								(a, b) =>
									new Date(b.fields.month).getTime() -
									new Date(a.fields.month).getTime()
							)
							.slice(0, 3)
							.map((entry, index) => {
								const date = getUTCMonthYear(entry.fields.month);

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
												<div className="text-gray-600 line-clamp-5">
													{documentToPlainTextString(
														entry.fields.description,
													)}
												</div>
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
																{documentToReactComponents(
																	entry.fields.description,
																	options
																)}
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
					<div className="mt-12 text-center">
						<Button asChild size="lg" className="bg-pink-600 hover:bg-pink-700">
							<Link href="/updates">View All Updates</Link>
						</Button>
					</div>
				</div>
			</section>

			{/* Contact Section */}
			<section
				id="contact"
				className="py-16 bg-gradient-to-b from-blue-50 to-purple-50"
			>
				<div className="container">
					<motion.div
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5 }}
						className="text-center mb-12"
					>
						<h2 className="text-3xl font-bold text-gray-900">Contact Us</h2>
						<div className="mt-2 h-1 w-20 bg-pink-600 mx-auto rounded-full"></div>
						<p className="mt-4 text-gray-600 max-w-2xl mx-auto">
							Have questions or want to schedule a tour? We'd love to hear from
							you!
						</p>
					</motion.div>

					<div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
						<motion.div
							initial={{ opacity: 0, x: -20 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5 }}
						>
							<Card>
								<CardHeader>
									<CardTitle>Get in Touch</CardTitle>
									<CardDescription>
										Fill out the form and we'll get back to you soon.
									</CardDescription>
								</CardHeader>
								<CardContent>
									{success ? (
										<motion.div
											initial={{ opacity: 0, scale: 0.9 }}
											animate={{ opacity: 1, scale: 1 }}
											className="text-center py-10"
										>
											<div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
												<Check className="h-8 w-8 text-green-600" />
											</div>
											<h2 className="mt-6 text-2xl font-bold text-gray-900">
												Message Sent!
											</h2>
											<p className="mt-2 text-gray-600">
												Thank you for reaching out to Tot Spot Preschool. We've
												received your message and will get back to you soon.
											</p>
										</motion.div>
									) : (
										<form className="space-y-4" onSubmit={handleSubmit}>
											<div className="grid grid-cols-2">
												<div className="grid gap-2 mr-2">
													<label
														htmlFor="firstName"
														className="text-sm font-medium"
													>
														First Name <span className="text-pink-600">*</span>
													</label>
													<Input
														id="firstName"
														className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
														placeholder="Your First Name"
														value={formData.firstName}
														onChange={handleChange}
														required
													/>
												</div>
												<div className="grid gap-2 ml-2">
													<label
														htmlFor="lastName"
														className="text-sm font-medium"
													>
														Last Name <span className="text-pink-600">*</span>
													</label>
													<Input
														id="lastName"
														className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
														placeholder="Your Last Name"
														value={formData.lastName}
														onChange={handleChange}
														required
													/>
												</div>
											</div>
											<div className="grid grid-cols-2">
												<div className="grid gap-2 mr-2">
													<label
														htmlFor="email"
														className="text-sm font-medium"
													>
														Email <span className="text-pink-600">*</span>
													</label>
													<Input
														id="email"
														type="email"
														className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
														placeholder="Your Email"
														value={formData.email}
														onChange={handleChange}
														required
													/>
												</div>
												<div className="grid gap-2 ml-2">
													<label
														htmlFor="phone"
														className="text-sm font-medium"
													>
														Phone <span className="text-pink-600">*</span>
													</label>
													<Input
														id="phone"
														type="tel"
														className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
														placeholder="Your Phone Number"
														value={formData.phone}
														onChange={handleChange}
														required
													/>
												</div>
											</div>
											<div className="grid gap-2">
												<label
													htmlFor="subject"
													className="text-sm font-medium"
												>
													Subject <span className="text-pink-600">*</span>
												</label>
												<Input
													id="subject"
													className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
													placeholder="Your Phone Number"
													value={formData.subject}
													onChange={handleChange}
													required
												/>
											</div>
											<div className="grid gap-2">
												<label
													htmlFor="message"
													className="text-sm font-medium"
												>
													Message <span className="text-pink-600">*</span>
												</label>
												<Textarea
													id="message"
													className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
													placeholder="Your message"
													value={formData.message}
													onChange={handleChange}
													required
												/>
											</div>
											<Button
												type="submit"
												className="w-full bg-pink-600 hover:bg-pink-700"
											>
												Send Message
											</Button>
										</form>
									)}
								</CardContent>
							</Card>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, x: 20 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5 }}
							className="flex flex-col justify-start"
						>
							<Card className="mb-6">
								<CardHeader>
									<CardTitle>Visit Us</CardTitle>
								</CardHeader>
								<CardContent className="space-y-4">
									<div className="flex items-start gap-3">
										<MapPin className="h-5 w-5 text-pink-600 mt-0.5" />
										<div>
											<h3 className="font-medium">Address</h3>
											<Link
												href={mapsLink}
												target="_blank"
												rel="noopener noreferrer"
											>
												<p className="text-sm text-gray-500 hover:text-pink-600">
													{addressLineOne}, {addressLineTwo}
												</p>
											</Link>
										</div>
									</div>
									<div className="flex items-start gap-3">
										<Phone className="h-5 w-5 text-pink-600 mt-0.5" />
										<div>
											<h3 className="font-medium">Phone</h3>
											<Link href={`tel:${phone}`}>
												<p className="text-sm text-gray-500 hover:text-pink-600">
													{phone}
												</p>
											</Link>
										</div>
									</div>
									<div className="flex items-start gap-3">
										<Mail className="h-5 w-5 text-pink-600 mt-0.5" />
										<div>
											<h3 className="font-medium">Email</h3>
											<Link href={`mailto:${email}`}>
												<p className="text-sm text-gray-500 hover:text-pink-600">
													{email}
												</p>
											</Link>
										</div>
									</div>
								</CardContent>
							</Card>

							<Card>
								<CardHeader>
									<CardTitle>Hours of Operation</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="space-y-2">
										<div className="flex justify-between">
											<span className="font-medium">Mon/Wed/Fri</span>
											<span>8:30 AM - 12:00 PM</span>
										</div>
										<div className="flex justify-between">
											<span className="font-medium">Tues/Thurs</span>
											<span>8:30 AM - 3:45 PM</span>
										</div>
										<div className="flex justify-between">
											<span className="font-medium">Saturday/Sunday</span>
											<span>Closed</span>
										</div>
									</div>
								</CardContent>
							</Card>
						</motion.div>
					</div>
				</div>
			</section>

			{/* Scroll to top button */}
			<motion.div
				className="fixed bottom-6 right-6 z-50"
				initial={{ opacity: 0 }}
				animate={{ opacity: scrollY > 300 ? 1 : 0 }}
				transition={{ duration: 0.2 }}
			>
				<Button
					variant="outline"
					size="icon"
					className="h-10 w-10 rounded-full bg-white shadow-md"
					onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
				>
					<ChevronDown className="h-5 w-5 rotate-180" />
					<span className="sr-only">Scroll to top</span>
				</Button>
			</motion.div>
		</div>
	);
}
