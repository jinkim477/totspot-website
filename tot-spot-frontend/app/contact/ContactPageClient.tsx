"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";
import { CardHeader } from "@/components/ui/card";
import { CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";

export default function ContactPage({
	contactInfo,
	contactPagePhotos,
}: {
	contactInfo: any;
	contactPagePhotos: any;
}) {
	const { addressLineOne, addressLineTwo, phone, email, mapsLink } =
		contactInfo.fields;

	const landingPhotoUrl =
		contactPagePhotos[0].fields.landingPhoto.fields.file.url;

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

	return (
		<div className="min-h-screen">
			{/* Hero Section */}
			<section className="relative h-[400px] overflow-hidden">
				<div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 z-10" />
				<Image
					src={landingPhotoUrl}
					alt="Contact Tot Spot Preschool"
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
							Contact Us
						</h1>
						<p className="mt-6 text-lg text-white/90 max-w-xl">
							We'd love to hear from you! Get in touch with Tot Spot Preschool.
						</p>
					</motion.div>
				</div>
			</section>

			{/* Contact Information */}
			<section className="py-16">
				<div className="container">
					<div className="grid lg:grid-cols-3 gap-8">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: 0 }}
							className="lg:col-span-2"
						>
							<Card id="contact-form" >
								<CardHeader>
									<CardTitle>Send Us a Message</CardTitle>
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
										<form className="grid gap-6" onSubmit={handleSubmit}>
											<div className="grid md:grid-cols-2 gap-4">
												<div className="space-y-2">
													<Label htmlFor="first-name">
														First Name <span className="text-pink-600">*</span>
													</Label>
													<Input
														id="firstName"
														placeholder="Enter your first name"
														value={formData.firstName}
														onChange={handleChange}
														required
													/>
												</div>
												<div className="space-y-2">
													<Label htmlFor="last-name">
														Last Name <span className="text-pink-600">*</span>
													</Label>
													<Input
														id="lastName"
														placeholder="Enter your last name"
														value={formData.lastName}
														onChange={handleChange}
														required
													/>
												</div>
											</div>
											<div className="grid md:grid-cols-2 gap-4">
												<div className="space-y-2">
													<Label htmlFor="email">
														Email <span className="text-pink-600">*</span>
													</Label>
													<Input
														id="email"
														type="email"
														placeholder="Enter your email"
														value={formData.email}
														onChange={handleChange}
														required
													/>
												</div>
												<div className="space-y-2">
													<Label htmlFor="phone">
														Phone <span className="text-pink-600">*</span>
													</Label>
													<Input
														id="phone"
														type="tel"
														placeholder="Enter your phone number"
														value={formData.phone}
														onChange={handleChange}
														required
													/>
												</div>
											</div>
											<div className="space-y-2">
												<Label htmlFor="subject">
													Subject <span className="text-pink-600">*</span>
												</Label>
												<Input
													id="subject"
													placeholder="What is this regarding?"
													value={formData.subject}
													onChange={handleChange}
													required
												/>
											</div>
											<div className="space-y-2">
												<Label htmlFor="message">
													Message <span className="text-pink-600">*</span>
												</Label>
												<Textarea
													id="message"
													placeholder="Enter your message"
													className="min-h-[150px]"
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
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: 0.2 }}
						>
							<Card className="h-full">
								<CardHeader>
									<CardTitle>Contact Information</CardTitle>
								</CardHeader>
								<CardContent className="space-y-6">
									<div className="space-y-4">
										<div className="flex items-start gap-3">
											<MapPin className="h-5 w-5 text-pink-600 mt-1" />
											<div>
												<h3 className="font-medium text-gray-900">Address</h3>
												<Link
													href={mapsLink}
													target="_blank"
													rel="noopener noreferrer"
												>
													<div className="text-gray-600 hover:text-pink-600">
														<p>{addressLineOne}</p>
														<p>{addressLineTwo}</p>
													</div>
												</Link>
											</div>
										</div>
										<div className="flex items-start gap-3">
											<Phone className="h-5 w-5 text-pink-600 mt-1" />
											<div>
												<h3 className="font-medium text-gray-900">Phone</h3>
												<Link href={`tel:${phone}`}>
													<p className="text-gray-600 hover:text-pink-600">
														{phone}
													</p>
												</Link>
											</div>
										</div>
										<div className="flex items-start gap-3">
											<Mail className="h-5 w-5 text-pink-600 mt-1" />
											<div>
												<h3 className="font-medium text-gray-900">Email</h3>
												<Link href={`mailto:${email}`}>
													<p className="text-gray-600 hover:text-pink-600">
														{email}
													</p>
												</Link>
											</div>
										</div>
									</div>

									<div>
										<h3 className="font-medium text-gray-900 mb-2">
											Office Hours
										</h3>
										<div className="space-y-1">
											<div className="flex justify-between">
												<span className="text-gray-600">Mon/Wed/Fri</span>
												<span className="text-gray-600">8:30 AM - 12:00 PM</span>
											</div>
											<div className="flex justify-between">
												<span className="text-gray-600">Tues/Thurs</span>
												<span className="text-gray-600">8:30 AM - 3:45 PM</span>
											</div>
											<div className="flex justify-between">
												<span className="text-gray-600">Saturday - Sunday</span>
												<span className="text-gray-600">Closed</span>
											</div>
										</div>
									</div>

									<div className="pt-4">
										<h3 className="font-medium text-gray-900 mb-2">
											Connect With Us
										</h3>
										<div className="flex gap-4">
											<a
												href="#"
												className="h-10 w-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 hover:bg-pink-200 transition-colors"
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="20"
													height="20"
													viewBox="0 0 24 24"
													fill="none"
													stroke="currentColor"
													strokeWidth="2"
													strokeLinecap="round"
													strokeLinejoin="round"
												>
													<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
												</svg>
												<span className="sr-only">Facebook</span>
											</a>
											<a
												href="#"
												className="h-10 w-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 hover:bg-pink-200 transition-colors"
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="20"
													height="20"
													viewBox="0 0 24 24"
													fill="none"
													stroke="currentColor"
													strokeWidth="2"
													strokeLinecap="round"
													strokeLinejoin="round"
												>
													<rect
														x="2"
														y="2"
														width="20"
														height="20"
														rx="5"
														ry="5"
													></rect>
													<path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
													<line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
												</svg>
												<span className="sr-only">Instagram</span>
											</a>
										</div>
									</div>
								</CardContent>
							</Card>
						</motion.div>
					</div>
				</div>
			</section>

			{/* Map */}
			<section className="py-8">
				<div className="container">
					<motion.div
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5 }}
						className="h-[400px] relative rounded-lg overflow-hidden shadow-lg"
					>
						<iframe
							src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2514.6455125663483!2d-114.05158882341433!3d50.93027417168778!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x537176ec66fef76b%3A0x9e725e944c64587a!2sTot%20Spot%20Preschool!5e0!3m2!1sen!2sca!4v1746492999214!5m2!1sen!2sca"
							width="100%"
							height="100%"
							style={{ border: 0 }}
							allowFullScreen
							loading="lazy"
							referrerPolicy="no-referrer-when-downgrade"
							title="Tot Spot Preschool Location"
							className="absolute inset-0"
						></iframe>
					</motion.div>
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
								Ready to Join the Tot Spot Family?
							</h2>
							<p className="text-pink-100 text-lg">
								We're excited to meet you and your child! Reach out today to
								learn more about our programs.
							</p>
							<div className="pt-4">
								<Link href="/contact#contact-form">
									<Button
										size="lg"
										className="bg-white text-pink-600 hover:bg-pink-50"
									>
										Schedule a Tour
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
