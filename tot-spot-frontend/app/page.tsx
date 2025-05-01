'use client'

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
	ArrowRight,
	ChevronDown,
	Clock,
	MapPin,
	Users,
	Phone,
	Mail,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
	const [scrollY, setScrollY] = useState(0);

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

	return (
		<div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
			{/* Hero Section */}
			<section className="relative h-[600px] overflow-hidden">
				<div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 z-10" />
				<Image
					src="/placeholder.svg?height=600&width=1920"
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
							<span className="text-yellow-400">Quality</span> Early Education
							for Your Children
						</h1>
						<p className="mt-6 text-lg text-white/90 max-w-xl">
							Located in Lake Bonavista, Tot Spot is one of the best, brightest
							and most spacious preschools in south Calgary.
						</p>
						<div className="mt-10 flex flex-wrap gap-4">
							<Button size="lg" className="bg-pink-600 hover:bg-pink-700">
								Register Now
							</Button>
							<Button
								size="lg"
								variant="outline"
								className="text-black border-white hover:bg-white/20"
							>
                <Link href="/about">
								Our Philosophy
                </Link>
							</Button>
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
								src="https://totspotpreschool.ca/wp-content/uploads/tot-spot-preschool-calgary-1536x864.jpg"
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
								A Nurturing Environment for Early Learning
							</h3>
							<p className="text-gray-600">
								Located in Lake Bonavista, we have one of the best, brightest
								and most spacious preschools in south Calgary. We offer programs
								for three and four year-olds to enrich your little one’s
								learning process through interest-based, fun activities. We
								welcome your children to come and learn through play.
							</p>
							<p className="text-gray-600">
								Your child will benefit from our targeted learning spaces and
								participate in a wide variety of activities daily: sand play,
								building materials, water play, books, listening centre,
								puzzles, crafts, play dough, stories, songs, gym and imaginative
								play! Our teachers have Alberta certification and 75 collective
								years of teaching experience. Come check us out!
							</p>
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
							of children ages 3-5 years old.
						</p>
					</motion.div>

					<div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
						{[
							{
								title: "3 Year Olds",
								description:
									"A gentle introduction to preschool with focus on social skills and creative play.",
								icon: <Users className="h-10 w-10 text-pink-600" />,
								details: [
									"3 different scheduling options",
									"Info...",
									"Info...",
									"Info...",
								],
							},
							{
								title: "4 Year Olds",
								description:
									"Preparation for kindergarten with literacy, numeracy, and social development.",
								icon: <Users className="h-10 w-10 text-pink-600" />,
								details: [
									"3 different scheduling options",
									"Info...",
									"Info...",
									"Info...",
								],
							},
						].map((program, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: index * 0.1 }}
							>
								<Card className="h-full">
									<CardHeader>
										<div className="mb-2">{program.icon}</div>
										<CardTitle>{program.title}</CardTitle>
										<CardDescription>{program.description}</CardDescription>
									</CardHeader>
									<CardContent>
										<ul className="space-y-2">
											{program.details.map((detail, i) => (
												<li key={i} className="flex items-start gap-2">
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
													<span className="text-sm text-gray-600">
														{detail}
													</span>
												</li>
											))}
										</ul>
										<div className="mt-6">
											<Link
												href="/programs"
												className="inline-flex items-center text-pink-600 text-sm font-medium hover:text-pink-700"
											>
												Learn more <ArrowRight className="ml-1 h-4 w-4" />
											</Link>
										</div>
									</CardContent>
								</Card>
							</motion.div>
						))}
					</div>

					<div className="mt-12 text-center">
						<Button asChild size="lg" className="bg-pink-600 hover:bg-pink-700">
							<Link href="/programs">View Program Details</Link>
						</Button>
					</div>
				</div>
			</section>

			{/* Monthly Announcements */}
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
							Monthly Announcements
						</h2>
						<div className="mt-2 h-1 w-20 bg-pink-600 mx-auto rounded-full"></div>
					</motion.div>

					<Tabs defaultValue="may" className="max-w-3xl mx-auto">
						<TabsList className="grid w-full grid-cols-3">
							<TabsTrigger value="may">May</TabsTrigger>
							<TabsTrigger value="june">June</TabsTrigger>
							<TabsTrigger value="july">July</TabsTrigger>
						</TabsList>
						<TabsContent value="may" className="mt-6">
							<Card>
								<CardHeader>
									<CardTitle>May 2025 Events</CardTitle>
									<CardDescription>
										Important dates and activities for May
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
										<motion.li
											variants={item}
											className="flex items-start gap-2"
										>
											<div className="h-6 w-6 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 flex-shrink-0">
												1
											</div>
											<div>
												<span className="font-medium">
													May 5th - Parent-Teacher Conference Day
												</span>
												<p className="text-sm text-gray-500">
													Schedule your 30-minute slot to discuss your child's
													progress.
												</p>
											</div>
										</motion.li>
										<motion.li
											variants={item}
											className="flex items-start gap-2"
										>
											<div className="h-6 w-6 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 flex-shrink-0">
												2
											</div>
											<div>
												<span className="font-medium">
													May 12th - Spring Festival
												</span>
												<p className="text-sm text-gray-500">
													Join us for a day of fun activities, games, and
													performances.
												</p>
											</div>
										</motion.li>
										<motion.li
											variants={item}
											className="flex items-start gap-2"
										>
											<div className="h-6 w-6 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 flex-shrink-0">
												3
											</div>
											<div>
												<span className="font-medium">
													May 26th - Closed for Memorial Day
												</span>
												<p className="text-sm text-gray-500">
													Tot Spot will be closed in observance of Memorial Day.
												</p>
											</div>
										</motion.li>
									</motion.ul>
								</CardContent>
							</Card>
						</TabsContent>
						<TabsContent value="june" className="mt-6">
							<Card>
								<CardHeader>
									<CardTitle>June 2025 Events</CardTitle>
									<CardDescription>
										Important dates and activities for June
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
										<motion.li
											variants={item}
											className="flex items-start gap-2"
										>
											<div className="h-6 w-6 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 flex-shrink-0">
												1
											</div>
											<div>
												<span className="font-medium">
													June 10th - Summer Program Begins
												</span>
												<p className="text-sm text-gray-500">
													Our special summer curriculum starts with water play
													activities.
												</p>
											</div>
										</motion.li>
										<motion.li
											variants={item}
											className="flex items-start gap-2"
										>
											<div className="h-6 w-6 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 flex-shrink-0">
												2
											</div>
											<div>
												<span className="font-medium">
													June 18th - Teddy Bear Picnic
												</span>
												<p className="text-sm text-gray-500">
													Children can bring their favorite stuffed animal for a
													special outdoor lunch.
												</p>
											</div>
										</motion.li>
										<motion.li
											variants={item}
											className="flex items-start gap-2"
										>
											<div className="h-6 w-6 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 flex-shrink-0">
												3
											</div>
											<div>
												<span className="font-medium">
													June 24th - Parent Workshop
												</span>
												<p className="text-sm text-gray-500">
													Join us for a workshop on supporting early literacy at
													home.
												</p>
											</div>
										</motion.li>
									</motion.ul>
								</CardContent>
							</Card>
						</TabsContent>
						<TabsContent value="july" className="mt-6">
							<Card>
								<CardHeader>
									<CardTitle>July 2025 Events</CardTitle>
									<CardDescription>
										Important dates and activities for July
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
										<motion.li
											variants={item}
											className="flex items-start gap-2"
										>
											<div className="h-6 w-6 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 flex-shrink-0">
												1
											</div>
											<div>
												<span className="font-medium">
													July 4th - Closed for Independence Day
												</span>
												<p className="text-sm text-gray-500">
													Tot Spot will be closed in observance of Independence
													Day.
												</p>
											</div>
										</motion.li>
										<motion.li
											variants={item}
											className="flex items-start gap-2"
										>
											<div className="h-6 w-6 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 flex-shrink-0">
												2
											</div>
											<div>
												<span className="font-medium">
													July 15th - Art Exhibition
												</span>
												<p className="text-sm text-gray-500">
													Come see your child's artwork displayed in our mini
													gallery.
												</p>
											</div>
										</motion.li>
										<motion.li
											variants={item}
											className="flex items-start gap-2"
										>
											<div className="h-6 w-6 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 flex-shrink-0">
												3
											</div>
											<div>
												<span className="font-medium">
													July 28th - Science Day
												</span>
												<p className="text-sm text-gray-500">
													Fun experiments and hands-on activities for our little
													scientists.
												</p>
											</div>
										</motion.li>
									</motion.ul>
								</CardContent>
							</Card>
						</TabsContent>
					</Tabs>
				</div>
			</section>

			{/* Recent Updates Section */}
			<section id="updates" className="py-16">
				<div className="container">
					<motion.div
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5 }}
						className="text-center mb-12"
					>
						<h2 className="text-3xl font-bold text-gray-900">Recent Updates</h2>
						<div className="mt-2 h-1 w-20 bg-pink-600 mx-auto rounded-full"></div>
					</motion.div>

					<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
						{[
							{
								title: "New Playground Equipment",
								date: "April 28, 2025",
								image: "/placeholder.svg?height=200&width=400",
								excerpt:
									"We're excited to announce our playground has been upgraded with new equipment designed for safety and fun!",
							},
							{
								title: "Summer Enrollment Open",
								date: "April 15, 2025",
								image: "/placeholder.svg?height=200&width=400",
								excerpt:
									"Registration for our summer program is now open. Limited spots available, secure your child's place today.",
							},
							{
								title: "Staff Spotlight: Ms. Sarah",
								date: "April 5, 2025",
								image: "/placeholder.svg?height=200&width=400",
								excerpt:
									"Meet Ms. Sarah, our new art teacher who brings 10 years of experience in early childhood education.",
							},
						].map((update, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: index * 0.1 }}
							>
								<Card className="overflow-hidden h-full flex flex-col">
									<div className="relative h-48 w-full">
										<Image
											src={update.image || "/placeholder.svg"}
											alt={update.title}
											fill
											className="object-cover"
										/>
									</div>
									<CardHeader>
										<div className="text-sm text-gray-500">{update.date}</div>
										<CardTitle>{update.title}</CardTitle>
									</CardHeader>
									<CardContent className="flex-grow">
										<p>{update.excerpt}</p>
									</CardContent>
									<div className="p-6 pt-0">
										<Button variant="link" className="p-0 h-auto text-pink-600">
											Read more
										</Button>
									</div>
								</Card>
							</motion.div>
						))}
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
									<form className="space-y-4">
										<div className="grid gap-2">
											<label htmlFor="name" className="text-sm font-medium">
												Name
											</label>
											<input
												id="name"
												className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
												placeholder="Your name"
											/>
										</div>
										<div className="grid gap-2">
											<label htmlFor="email" className="text-sm font-medium">
												Email
											</label>
											<input
												id="email"
												type="email"
												className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
												placeholder="Your email"
											/>
										</div>
										<div className="grid gap-2">
											<label htmlFor="message" className="text-sm font-medium">
												Message
											</label>
											<textarea
												id="message"
												className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
												placeholder="Your message"
											/>
										</div>
										<Button className="w-full bg-pink-600 hover:bg-pink-700">
											Send Message
										</Button>
									</form>
								</CardContent>
							</Card>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, x: 20 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5 }}
							className="flex flex-col justify-between"
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
											<p className="text-sm text-gray-500">
												1401 Acadia Drive SE, Calgary, AB T2J 4C6
											</p>
										</div>
									</div>
									<div className="flex items-start gap-3">
										<Phone className="h-5 w-5 text-pink-600 mt-0.5" />
										<div>
											<h3 className="font-medium">Phone</h3>
											<p className="text-sm text-gray-500">(403) 236-1268</p>
										</div>
									</div>
									<div className="flex items-start gap-3">
										<Mail className="h-5 w-5 text-pink-600 mt-0.5" />
										<div>
											<h3 className="font-medium">Email</h3>
											<p className="text-sm text-gray-500">
												info@totspotpreschool.ca
											</p>
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
											<span className="font-medium">Monday - Friday</span>
											<span>7:30 AM - 6:00 PM</span>
										</div>
										<div className="flex justify-between">
											<span className="font-medium">Saturday</span>
											<span>Closed</span>
										</div>
										<div className="flex justify-between">
											<span className="font-medium">Sunday</span>
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
