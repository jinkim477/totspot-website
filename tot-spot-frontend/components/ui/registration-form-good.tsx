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
import SignatureField from "./ui/signature-field";

export function RegistrationForm({
	programName,
	programDays,
	programTime,
	programPrice,
	onClose,
}: {
	programName: string;
	programDays: string;
	programTime: string;
	programPrice: string;
	onClose: () => void;
}) {
	const [step, setStep] = useState(1);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isComplete, setIsComplete] = useState(false);
	const [signature, setSignature] = useState("");
	const totalSteps = 3;

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);

		try {
			const form = e.target as HTMLFormElement;
			const formData = new FormData(form);

			const programChoice = `${programDays} ${programTime.includes("AM") ? "AM" : "PM"} (${programPrice})`;
			const isThreeYearOld = programName.toLowerCase().includes("3 year");

			const payload: Record<string, string> = {
				Child_s_First_Name: `${formData.get("child-first-name")} + ${formData.get("child-last-name")}`,
				datetime: formData.get("child-dob") as string,
				input_radio: formData.get("child-gender") as string,
				input_text: formData.get("street-address") as string,
				input_text_2: formData.get("city") as string,
				input_text_3: formData.get("province") as string,
				input_text_4: formData.get("postal-code") as string,
				input_text_5: formData.get("parent1-name") as string,
				input_text_6: formData.get("parent2-name") as string,
				phone: formData.get("parent1-phone") as string,
				phone_1: formData.get("parent2-phone") as string,
				email: formData.get("email") as string,
				input_radio_1: formData.get("returning-family") as string,
				input_text_7: formData.get("hear-about-us") as string,
				input_radio_3: isThreeYearOld ? programChoice : "",
				input_radio_4: isThreeYearOld ? "" : programChoice,
				input_radio_7: formData.get("reg-fee-etransfer")
					? "E-Transfer"
					: formData.get("reg-fee-cheque")
						? "Cheque"
						: "Cash",
				input_radio_8: formData.get("reg-monthly-debit")
					? "Completed pre-authorized debit with void cheque/bank form"
					: "Postdated Cheques",
				signature: signature,
				datetime_1: formData.get("date") as string,
			};

			console.log("📝 Registration Payload:", payload);

			setIsSubmitting(false);
			setIsComplete(true);
			setTimeout(() => onClose(), 3000);
		} catch (err) {
			console.error("❌ Submission Error:", err);
			setIsSubmitting(false);
			alert("Something went wrong. Please try again,");
		}
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
													name="child-first-name"
													placeholder="Child's first name"
													required
												/>
											</div>
											<div className="space-y-2">
												<Label htmlFor="child-last-name">Last Name</Label>
												<Input
													id="child-last-name"
													name="child-last-name"
													placeholder="Child's last name"
													required
												/>
											</div>
										</div>

										<div className="space-y-2">
											<Label htmlFor="child-dob">Date of Birth</Label>
											<Input
												id="child-dob"
												name="child-dob"
												type="date"
												required
											/>
										</div>

										<div className="space-y-2">
											<Label>Gender</Label>
											<RadioGroup name="child-gender" defaultValue="female">
												<div className="flex items-center space-x-6">
													<div className="flex items-center space-x-2">
														<RadioGroupItem value="female" id="gender-female" />
														<Label htmlFor="gender-female">Female</Label>
													</div>
													<div className="flex items-center space-x-2">
														<RadioGroupItem value="male" id="gender-male" />
														<Label htmlFor="gender-male">Male</Label>
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
													name="street-address"
													placeholder="Street Address"
													required
												/>
											</div>
											<div className="space-y-2">
												<Label htmlFor="city">City</Label>
												<Input
													id="city"
													name="city"
													placeholder="City"
													required
												/>
											</div>
											<div className="space-y-2">
												<Label htmlFor="province">Province</Label>
												<Input
													id="province"
													name="province"
													placeholder="Province"
													required
												/>
											</div>
											<div className="space-y-2">
												<Label htmlFor="postal-code">Postal Code</Label>
												<Input
													id="postal-code"
													name="postal-code"
													placeholder="Postal Code"
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
													name="parent1-name"
													placeholder="Name"
													required
												/>
											</div>
											<div className="space-y-2">
												<Label htmlFor="parent1-phone">
													Parent/Guardian #1 Phone
												</Label>
												<Input
													id="parent1-phone"
													name="parent1-phone"
													type="tel"
													placeholder="Phone Number"
													required
												/>
											</div>
											<div className="space-y-2">
												<Label htmlFor="parent2-name">
													Parent/Guardian #2 Name
												</Label>
												<Input
													id="parent2-name"
													name="parent2-name"
													placeholder="Name"
													required
												/>
											</div>
											<div className="space-y-2">
												<Label htmlFor="parent2-phone">
													Parent/Guardian #2 Phone
												</Label>
												<Input
													id="parent2-phone"
													name="parent2-phone"
													type="tel"
													placeholder="Phone Number"
													required
												/>
											</div>
										</div>
										<div className="grid grid-cols-2 gap-4">
											<div className="space-y-2">
												<Label htmlFor="email">Email</Label>
												<Input
													id="email"
													name="email"
													placeholder="Email Address"
													required
													type="email"
												/>
											</div>
											<div className="space-y-2">
												<Label>Returning Tot Spot Family?</Label>
												<RadioGroup name="returning-family" defaultValue="yes">
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
										</div>

										<div className="space-y-2">
											<Label htmlFor="hear-about-us">
												How did you hear about our preschool?
											</Label>
											<Input
												id="hear-about-us"
												name="hear-about-us"
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
											<Label>
												Please confirm your desired class:
												<span className="font-extrabold">{programName}</span>
											</Label>
											<RadioGroup defaultValue="yes">
												<div className="flex items-center space-x-6">
													<div className="flex items-center space-x-2">
														<RadioGroupItem
															value="confirm-yes"
															id="confirm-yes"
														/>
														<Label htmlFor="confirm-yes">
															Yes, this is the correct class
														</Label>
													</div>
													<div className="flex items-center space-x-2">
														<RadioGroupItem
															value="confirm-no"
															id="confirm-no"
														/>
														<Label htmlFor="confirm-no">
															No, this is not the correct class
														</Label>
													</div>
												</div>
											</RadioGroup>
										</div>
										<div className="space-y-2">
											<Label>
												Please select a method to pay the&nbsp;
												<span className="font-bold">
													$100 non-refundable Registration Fee&nbsp;
												</span>
												(payable on day of registration)
											</Label>
											<RadioGroup defaultValue="yes">
												<div className="flex items-center space-x-6">
													<div className="flex items-center space-x-2">
														<RadioGroupItem
															value="reg-fee-etransfer"
															id="reg-fee-etransfer"
														/>
														<Label htmlFor="reg-fee-entransfer">
															E-Transfer
														</Label>
													</div>
													<div className="flex items-center space-x-2">
														<RadioGroupItem
															value="reg-fee-cheque"
															id="reg-fee-cheque"
														/>
														<Label htmlFor="reg-fee-cheque">Cheque</Label>
													</div>
													<div className="flex items-center space-x-2">
														<RadioGroupItem
															value="reg-fee-cash"
															id="reg-fee-cash"
														/>
														<Label htmlFor="reg-fee-cash">Cash</Label>
													</div>
												</div>
											</RadioGroup>
										</div>
										<div className="space-y-2">
											<Label>
												Please select a method of payment for&nbsp;
												<span className="font-bold">
													Monthly School Fees&nbsp;
												</span>
												(fees are drawn on the 1st business day of each month)
											</Label>
											<RadioGroup defaultValue="yes">
												<div className="flex items-center space-x-6">
													<div className="flex items-center space-x-2">
														<RadioGroupItem
															value="reg-monthly-debit"
															id="reg-monthly-debit"
														/>
														<Label htmlFor="reg-monthly-debit">
															Completed pre-authorized debit with void
															cheque/bank form
														</Label>
													</div>
													<div className="flex items-center space-x-2">
														<RadioGroupItem
															value="reg-monthly-cheque"
															id="reg-monthly-cheque"
														/>
														<Label htmlFor="reg-monthly-cheque">
															Postdated Cheques
														</Label>
													</div>
												</div>
											</RadioGroup>
										</div>
										<div className="space-y-2">
											<p className="font-bold">Please Note:</p>
											<div>
												<p>
													A student can only be guaranteed a spot in a
													particular class after Tot Spot has received a&nbsp;
												</p>
												<span className="italic">
													registration form, registration fee, and monthly Debit
													(PAD) agreement/Cheques.
												</span>
												&nbsp;All classes are filled on a first-come,
												first-served basis. We welcome you to contact us via
												email or phone if you need any assistance at all.
												<br />
												<br />
												<p className="italic">
													**Cancellation Policy: Tot Spot requires one month's
													notice.**
												</p>
											</div>
										</div>
										<div className="grid grid-cols-2 gap-4">
											<div className="space-y-2">
												<SignatureField onChange={setSignature} />
											</div>
											<div className="space-y-2">
												<Label htmlFor="parent1-phone">Date</Label>
												<Input id="date" type="date" required />
											</div>
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
