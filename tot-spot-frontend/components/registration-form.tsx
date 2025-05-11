"use client";

import type React from "react";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

export function RegistrationForm({
	programName,
	onClose,
}: {
	programName: string;
	onClose: () => void;
}) {
	const [step, setStep] = useState(1);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isComplete, setIsComplete] = useState(false);
	const totalSteps = 4;

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);

		// Simulate form submission
		setTimeout(() => {
			setIsSubmitting(false);
			setIsComplete(true);

			// Close the modal after showing success message
			setTimeout(() => {
				onClose();
			}, 3000);
		}, 2000);
	};

	const nextStep = () => {
		if (step < totalSteps) {
			setStep(step + 1);
		}
	};

	const prevStep = () => {
		if (step > 1) {
			setStep(step - 1);
		}
	};

	return (
		<div className="max-w-3xl">
			{!isComplete ? (
				<>
					<div className="mb-6">
						<div className="flex justify-between items-center mb-2">
							<h3 className="text-sm font-medium text-gray-500">
								Step {step} of {totalSteps}
							</h3>
							<button
								type="button"
								onClick={onClose}
								className="text-gray-400 hover:text-gray-500 text-sm"
							>
								Cancel
							</button>
						</div>
						<div className="w-full bg-gray-200 rounded-full h-2.5">
							<div
								className="bg-pink-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
								style={{ width: `${(step / totalSteps) * 100}%` }}
							></div>
						</div>
					</div>

					<form onSubmit={handleSubmit}>
						<AnimatePresence mode="wait">
							{step === 1 && (
								<motion.div
									key="step1"
									initial={{ opacity: 0, x: 20 }}
									animate={{ opacity: 1, x: 0 }}
									exit={{ opacity: 0, x: -20 }}
									transition={{ duration: 0.3 }}
								>
									<h2 className="text-xl font-bold text-gray-900 mb-6">
										Child Information
									</h2>

									<div className="space-y-4">
										<div className="grid grid-cols-2 gap-4">
											<div className="space-y-2">
												<Label htmlFor="child-first-name">First Name</Label>
												<Input
													id="child-first-name"
													placeholder="Child's first name"
													required
												/>
											</div>
											<div className="space-y-2">
												<Label htmlFor="child-last-name">Last Name</Label>
												<Input
													id="child-last-name"
													placeholder="Child's last name"
													required
												/>
											</div>
										</div>

										<div className="space-y-2">
											<Label htmlFor="child-dob">Date of Birth</Label>
											<Input id="child-dob" type="date" required />
										</div>

										<div className="space-y-2">
											<Label>Gender</Label>
											<RadioGroup defaultValue="female">
												<div className="flex items-center space-x-6">
													<div className="flex items-center space-x-2">
														<RadioGroupItem value="female" id="female" />
														<Label htmlFor="female">Female</Label>
													</div>
													<div className="flex items-center space-x-2">
														<RadioGroupItem value="male" id="male" />
														<Label htmlFor="male">Male</Label>
													</div>
												</div>
											</RadioGroup>
										</div>
									</div>
								</motion.div>
							)}

							{step === 2 && (
								<motion.div
									key="step2"
									initial={{ opacity: 0, x: 20 }}
									animate={{ opacity: 1, x: 0 }}
									exit={{ opacity: 0, x: -20 }}
									transition={{ duration: 0.3 }}
								>
									<h2 className="text-xl font-bold text-gray-900 mb-6">
										Address/Parent Details
									</h2>

									<div className="space-y-4">
										<div className="grid grid-cols-4 gap-4">
											<div className="space-y-2">
												<Label htmlFor="street-address">Street Address</Label>
												<Input
													id="street-address"
													placeholder="1234 Main Street"
													required
												/>
											</div>
											<div className="space-y-2">
												<Label htmlFor="city">City</Label>
												<Input id="city" placeholder="e.g. Calgary" required />
											</div>
											<div className="space-y-2">
												<Label htmlFor="province">Province</Label>
												<Input
													id="province"
													placeholder="e.g. Alberta"
													required
												/>
											</div>
											<div className="space-y-2">
												<Label htmlFor="postal-code">Postal Code</Label>
												<Input
													id="postal-code"
													placeholder="e.g. T2J 5C4"
													required
												/>
											</div>
										</div>
										<div className="grid grid-cols-2 gap-4">
											<div className="space-y-2">
												<Label htmlFor="parent1-name">
													Parent/Guardian #1 Name
												</Label>
												<Input
													id="parent1-name"
													placeholder="e.g. Jane Doe"
													required
												/>
											</div>
											<div className="space-y-2">
												<Label htmlFor="parent1-phone">
													Parent/Guardian #1 Phone
												</Label>
												<Input
													id="parent1-phone"
													type="tel"
													placeholder="e.g. 4039876543"
													required
												/>
											</div>
											<div className="space-y-2">
												<Label htmlFor="parent2-name">
													Parent/Guardian #1 Name
												</Label>
												<Input
													id="parent2-name"
													placeholder="e.g. John Doe"
													required
												/>
											</div>
											<div className="space-y-2">
												<Label htmlFor="parent2-phone">
													Parent/Guardian #1 Phone
												</Label>
												<Input
													id="parent2-phone"
													type="tel"
													placeholder="e.g. 4031234567"
													required
												/>
											</div>
										</div>

										<div className="space-y-2">
											<Label>Returning Tot Spot Family?</Label>
											<RadioGroup defaultValue="yes">
												<div className="flex items-center space-x-6">
													<div className="flex items-center space-x-2">
														<RadioGroupItem
															value="returning-yes"
															id="returning-yes"
														/>
														<Label htmlFor="returning-yes">Yes</Label>
													</div>
													<div className="flex items-center space-x-2">
														<RadioGroupItem
															value="returning-no"
															id="returning-no"
														/>
														<Label htmlFor="returning-no">No</Label>
													</div>
												</div>
											</RadioGroup>
										</div>

										<div className="space-y-2">
											<Label htmlFor="hear-about-us">
												How did you hear about our preschool?
											</Label>
											<Input
												id="hear-about-us"
												placeholder="e.g. Friend, Social Media, etc."
												required
											/>
										</div>
									</div>
								</motion.div>
							)}

							{step === 3 && (
								<motion.div
									key="step3"
									initial={{ opacity: 0, x: 20 }}
									animate={{ opacity: 1, x: 0 }}
									exit={{ opacity: 0, x: -20 }}
									transition={{ duration: 0.3 }}
								>
									<h2 className="text-xl font-bold text-gray-900 mb-6">
										Program Details
									</h2>

									<div className="space-y-4">
										<div className="space-y-2">
											<Label>Please confirm your desired class</Label>
											<RadioGroup defaultValue="yes">
												<div className="flex items-center space-x-6">
													<div className="flex items-center space-x-2">
														<RadioGroupItem
															value="confirm-yes"
															id="confirm-yes"
														/>
														<Label htmlFor="confirm-yes">Yes, this is the correct class</Label>
													</div>
													<div className="flex items-center space-x-2">
														<RadioGroupItem
															value="confirm-no"
															id="confirm-no"
														/>
														<Label htmlFor="confirm-no">No, this is not the correct class</Label>
													</div>
												</div>
											</RadioGroup>
										</div>
										<div className="space-y-2">
											<Label>Please select a method to pay the $100 non-refundable Registration Fee</Label>
											<RadioGroup defaultValue="yes">
												<div className="flex items-center space-x-6">
													<div className="flex items-center space-x-2">
														<RadioGroupItem
															value="returning-yes"
															id="returning-yes"
														/>
														<Label htmlFor="returning-yes">Yes</Label>
													</div>
													<div className="flex items-center space-x-2">
														<RadioGroupItem
															value="returning-no"
															id="returning-no"
														/>
														<Label htmlFor="returning-no">No</Label>
													</div>
                                                    <div className="flex items-center space-x-2">
														<RadioGroupItem
															value="returning-no"
															id="returning-no"
														/>
														<Label htmlFor="returning-no">No</Label>
													</div>
												</div>
											</RadioGroup>
										</div>
									</div>
								</motion.div>
							)}

							{step === 4 && (
								<motion.div
									key="step4"
									initial={{ opacity: 0, x: 20 }}
									animate={{ opacity: 1, x: 0 }}
									exit={{ opacity: 0, x: -20 }}
									transition={{ duration: 0.3 }}
								>
									<h2 className="text-xl font-bold text-gray-900 mb-6">
										Additional Information & Consent
									</h2>

									<div className="space-y-4">
										<div className="space-y-2">
											<Label htmlFor="additional-info">
												Additional Information
											</Label>
											<Textarea
												id="additional-info"
												placeholder="Please share any additional information that would help us better understand your child"
												className="min-h-[100px]"
											/>
										</div>

										<div className="space-y-4 pt-2">
											<div className="flex items-start space-x-2">
												<Checkbox id="consent-photos" />
												<div className="grid gap-1.5 leading-none">
													<Label
														htmlFor="consent-photos"
														className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
													>
														I give permission for Tot Spot to take and use
														photos of my child for educational and promotional
														purposes.
													</Label>
												</div>
											</div>

											<div className="flex items-start space-x-2">
												<Checkbox id="consent-trips" />
												<div className="grid gap-1.5 leading-none">
													<Label
														htmlFor="consent-trips"
														className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
													>
														I give permission for my child to participate in
														field trips and outings.
													</Label>
												</div>
											</div>

											<div className="flex items-start space-x-2">
												<Checkbox id="consent-emergency" required />
												<div className="grid gap-1.5 leading-none">
													<Label
														htmlFor="consent-emergency"
														className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
													>
														I authorize Tot Spot staff to seek emergency medical
														treatment for my child if necessary.
													</Label>
												</div>
											</div>

											<div className="flex items-start space-x-2">
												<Checkbox id="terms" required />
												<div className="grid gap-1.5 leading-none">
													<Label
														htmlFor="terms"
														className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
													>
														I have read and agree to Tot Spot's terms and
														conditions, including the payment and cancellation
														policies.
													</Label>
												</div>
											</div>
										</div>

										<div className="pt-4 text-sm text-gray-500">
											<p>
												By submitting this form, you acknowledge that a
												non-refundable registration fee of $100 will be required
												to secure your child's spot.
											</p>
										</div>
									</div>
								</motion.div>
							)}
						</AnimatePresence>

						<div className="mt-8 flex justify-between">
							{step > 1 ? (
								<Button type="button" variant="outline" onClick={prevStep}>
									Back
								</Button>
							) : (
								<div></div>
							)}

							{step < totalSteps ? (
								<Button
									type="button"
									onClick={nextStep}
									className="bg-pink-600 hover:bg-pink-700"
								>
									Continue <ChevronRight className="ml-1 h-4 w-4" />
								</Button>
							) : (
								<Button
									type="submit"
									className="bg-pink-600 hover:bg-pink-700"
									disabled={isSubmitting}
								>
									{isSubmitting ? (
										<>
											<Loader2 className="mr-2 h-4 w-4 animate-spin" />
											Submitting...
										</>
									) : (
										"Submit Registration"
									)}
								</Button>
							)}
						</div>
					</form>
				</>
			) : (
				<motion.div
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					className="text-center py-10"
				>
					<div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
						<Check className="h-8 w-8 text-green-600" />
					</div>
					<h2 className="mt-6 text-2xl font-bold text-gray-900">
						Registration Submitted!
					</h2>
					<p className="mt-2 text-gray-600">
						Thank you for registering with Tot Spot Preschool. We've sent a
						confirmation email with next steps to the email address you
						provided.
					</p>
				</motion.div>
			)}
		</div>
	);
}
