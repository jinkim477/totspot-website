"use client";

import type React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

	// Step 1 states
	const [childFirstName, setChildFirstName] = useState("");
	const [childLastName, setChildLastName] = useState("");
	const [dob, setDob] = useState("");
	const [gender, setGender] = useState("Female");

	// Step 2 states
	const [street, setStreet] = useState("");
	const [city, setCity] = useState("");
	const [province, setProvince] = useState("");
	const [postalCode, setPostalCode] = useState("");
	const [parent1, setParent1] = useState("");
	const [parent1Phone, setParent1Phone] = useState("");
	const [parent2, setParent2] = useState("");
	const [parent2Phone, setParent2Phone] = useState("");
	const [email, setEmail] = useState("");
	const [returningFamily, setReturningFamily] = useState("Yes");
	const [hearAboutUs, setHearAboutUs] = useState("");

	// Step 3 states
	const [regFeeMethod, setRegFeeMethod] = useState("E-Transfer");
	const [monthlyFeeMethod, setMonthlyFeeMethod] = useState(
		"Pre-authorized Debit"
	);
	const [date, setDate] = useState("");
	const [signature, setSignature] = useState("");

	const wpApiKey = process.env.WP_API_KEY;

	const totalSteps = 3;

	const handleSubmit = async (e: React.FormEvent) => {
		console.log("Handle Submit Triggered at Step:", step);
		e.preventDefault();
		setIsSubmitting(true);

		try {
			const programChoice = `${programDays} ${programTime.includes("AM") ? "AM" : "PM"} (${programPrice})`;
			const isThreeYearOld = programName.toLowerCase().includes("3 year");

			const payload: Record<string, string> = {
				Child_s_First_Name: `${childFirstName} ${childLastName}`,
				datetime: dob,
				input_radio: gender,
				input_text: street,
				input_text_2: city,
				input_text_3: province,
				input_text_4: postalCode,
				input_text_5: parent1,
				input_text_6: parent2,
				phone: parent1Phone,
				phone_1: parent2Phone,
				email,
				input_radio_1: returningFamily,
				input_text_7: hearAboutUs,
				input_radio_3: isThreeYearOld ? programChoice : "",
				input_radio_4: isThreeYearOld ? "" : programChoice,
				input_radio_7: regFeeMethod,
				input_radio_8: monthlyFeeMethod,
				signature,
				datetime_1: date,
			};

			console.log("📝 Registration Payload:", payload); // for debugging

			// Fluent Forms API
			const response = await fetch("https://totspotpreschool.ca/wp-json/fluentform/v1/forms/4/submit", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: "Basic " + btoa("info@totspotpreschool.ca:" + wpApiKey)
				},
				body: JSON.stringify({
					form_id: 4,
					fields: payload,
				}),
			});

			const result = await response.json();

			if (!response.ok) {
				console.error("❌ Fluent Forms Error:", result);
				alert("Submission Failed. Please try again.");
				setIsSubmitting(false);
				return;
			}

			console.log("✅ Fluent Forms Submission Success:", result);
			setIsSubmitting(false);
			setIsComplete(true);
			setTimeout(() => onClose(), 3000);
		} catch (err) {
			console.error("❌ Submission Error:", err);
			setIsSubmitting(false);
			alert("Something went wrong. Please try again.");
		}
	};

	const nextStep = () => {
		if (step < totalSteps) setStep(step + 1);
	};

	const prevStep = () => {
		if (step > 1) setStep(step - 1);
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
											<Label className="px-2">First Name</Label>
											<Input
												value={childFirstName}
												onChange={(e) => setChildFirstName(e.target.value)}
												placeholder="e.g. John"
												required
											/>
										</div>
										<div className="space-y-2">
											<Label className="px-2">Last Name</Label>
											<Input
												value={childLastName}
												onChange={(e) => setChildLastName(e.target.value)}
												placeholder="e.g. Doe"
												required
											/>
										</div>
									</div>
									<div className="grid grid-cols-2 gap-4">
										<div className="space-y-2">
											<Label className="px-2">Date of Birth</Label>
											<Input
												value={dob}
												onChange={(e) => setDob(e.target.value)}
												type="date"
												placeholder="Date of Birth"
												required
											/>
										</div>
										<div className="space-y-2">
											<Label className="px-2">Gender</Label>
											<div className="flex space-x-4 px-2">
												<label>
													<input
														type="radio"
														name="gender"
														value="Female"
														checked={gender === "Female"}
														onChange={() => setGender("Female")}
													/>{" "}
													Female
												</label>
												<label>
													<input
														type="radio"
														name="gender"
														value="Male"
														checked={gender === "Male"}
														onChange={() => setGender("Male")}
													/>{" "}
													Male
												</label>
											</div>
										</div>
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
									Parent & Address Info
								</h2>
								<div className="space-y-4">
									<div className="grid grid-cols-4 gap-4">
										<div className="space-y-2">
											<Label className="px-2">Street Address</Label>
											<Input
												value={street}
												onChange={(e) => setStreet(e.target.value)}
												placeholder="e.g. 123 Main St NE"
												required
											/>
										</div>
										<div className="space-y-2">
											<Label className="px-2">City</Label>
											<Input
												value={city}
												onChange={(e) => setCity(e.target.value)}
												placeholder="e.g. Calgary"
												required
											/>
										</div>
										<div className="space-y-2">
											<Label className="px-2">Province</Label>
											<Input
												value={province}
												onChange={(e) => setProvince(e.target.value)}
												placeholder="e.g. Alberta"
												required
											/>
										</div>
										<div className="space-y-2">
											<Label className="px-2">Postal Code</Label>
											<Input
												value={postalCode}
												onChange={(e) => setPostalCode(e.target.value)}
												placeholder="e.g. T2N 1N4"
												required
											/>
										</div>
									</div>
									<div className="grid grid-cols-2 gap-4">
										<div className="space-y-2">
											<Label className="px-2">Parent 1 Name</Label>
											<Input
												value={parent1}
												onChange={(e) => setParent1(e.target.value)}
												placeholder="e.g. Jane Doe"
												required
											/>
										</div>
										<div className="space-y-2">
											<Label className="px-2">Parent 1 Phone</Label>
											<Input
												value={parent1Phone}
												onChange={(e) => setParent1Phone(e.target.value)}
												placeholder="e.g. 123-456-7890"
												required
											/>
										</div>
										<div className="space-y-2">
											<Label className="px-2">Parent 2 Name</Label>
											<Input
												value={parent2}
												onChange={(e) => setParent2(e.target.value)}
												placeholder="e.g. James Doe"
												required
											/>
										</div>
										<div className="space-y-2">
											<Label className="px-2">Parent 2 Phone</Label>
											<Input
												value={parent2Phone}
												onChange={(e) => setParent2Phone(e.target.value)}
												placeholder="e.g. 123-456-7890"
												required
											/>
										</div>
									</div>
									<div className="grid grid-cols-2 gap-4">
										<div className="space-y-2">
											<Label className="px-2">Email</Label>
											<Input
												value={email}
												onChange={(e) => setEmail(e.target.value)}
												type="email"
												placeholder="e.g. janedoe123@gmail.com"
												required
											/>
										</div>
										<div className="space-y-2">
											<Label className="px-2">Returning Tot Spot Family?</Label>
											<div className="flex space-x-4 px-2">
												<label>
													<input
														type="radio"
														name="returning"
														value="Yes"
														checked={returningFamily === "Yes"}
														onChange={() => setReturningFamily("Yes")}
													/>{" "}
													Yes
												</label>
												<label>
													<input
														type="radio"
														name="returning"
														value="No"
														checked={returningFamily === "No"}
														onChange={() => setReturningFamily("No")}
													/>{" "}
													No
												</label>
											</div>
										</div>
									</div>
									<div className="space-y-2">
										<Label className="px-2">How did you hear about us?</Label>
										<Input
											value={hearAboutUs}
											onChange={(e) => setHearAboutUs(e.target.value)}
											placeholder="e.g. Friend, Social Media, Google, etc."
											required
										/>
									</div>
								</div>
							</motion.div>
						)}
					</AnimatePresence>

					{step < totalSteps ? (
						<div className="mt-8 flex justify-between">
							{step > 1 ? (
								<Button type="button" variant="outline" onClick={prevStep}>
									Back
								</Button>
							) : (
								<div />
							)}
							<Button
								type="button"
								onClick={nextStep}
								className="bg-pink-600 hover:bg-pink-700"
							>
								Continue <ChevronRight className="ml-1 h-4 w-4" />
							</Button>
						</div>
					) : (
						<form onSubmit={handleSubmit}>
							<motion.div
								key="step3"
								initial={{ opacity: 0, x: 20 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: -20 }}
								transition={{ duration: 0.3 }}
							>
								<h2 className="text-xl font-bold text-gray-900 mb-2">
									Program Details
								</h2>
								<p className="mb-2">
									Selected Class: <strong>{programName}</strong>
								</p>

								<div className="space-y-4">
									<div className="space-y-2">
										<Label>Registration Fee Payment Method</Label>
										<div className="flex space-x-4">
											<label>
												<input
													type="radio"
													name="reg-fee-method"
													value="E-Transfer"
													checked={regFeeMethod === "E-Transfer"}
													onChange={() => setRegFeeMethod("E-Transfer")}
												/>{" "}
												E-Transfer
											</label>
											<label>
												<input
													type="radio"
													name="reg-fee-method"
													value="Cheque"
													checked={regFeeMethod === "Cheque"}
													onChange={() => setRegFeeMethod("Cheque")}
												/>{" "}
												Cheque
											</label>
											<label>
												<input
													type="radio"
													name="reg-fee-method"
													value="Cash"
													checked={regFeeMethod === "Cash"}
													onChange={() => setRegFeeMethod("Cash")}
												/>{" "}
												Cash
											</label>
										</div>
									</div>
									<div>
										<Label>Monthly Fee Payment Method</Label>
										<div className="flex space-x-4">
											<label>
												<input
													type="radio"
													name="monthly-fee-method"
													value="Pre-authorized Debit"
													checked={monthlyFeeMethod === "Pre-authorized Debit"}
													onChange={() =>
														setMonthlyFeeMethod("Pre-authorized Debit")
													}
												/>{" "}
												Pre-authorized Debit
											</label>
											<label>
												<input
													type="radio"
													name="monthly-fee-method"
													value="Postdated Cheques"
													checked={monthlyFeeMethod === "Postdated Cheques"}
													onChange={() =>
														setMonthlyFeeMethod("Postdated Cheques")
													}
												/>{" "}
												Postdated Cheques
											</label>
										</div>
									</div>
									<div>
										<p className="font-bold">Note</p>
										<p className="break-words whitespace-normal">
											* The $100 non-refundable Registration Fee is payable on
											the day of registration.
										</p>
										<p className="break-words whitespace-normal">
											* The Monthly School Fees are drawn on the 1st business
											day of each month from September to June.
										</p>
									</div>
									<div className="space-y-2">
										<Label>Signature</Label>
										<div className="w-full max-w-full overflow-hidden">
											<SignatureField onChange={setSignature} />
										</div>
									</div>
									<div className="space-y-2">
										<Label htmlFor="date">Date</Label>
										<Input
											id="date"
											name="date"
											type="date"
											value={date}
											onChange={(e) => setDate(e.target.value)}
											required
										/>
									</div>
								</div>
							</motion.div>
							<div className="mt-8 flex justify-between">
								<Button type="button" variant="outline" onClick={prevStep}>
									Back
								</Button>
								<Button
									type="submit"
									className="bg-pink-600 hover:bg-pink-700"
									disabled={isSubmitting}
								>
									{isSubmitting ? (
										<>
											<Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
											Submitting...
										</>
									) : (
										"Submit Registration"
									)}
								</Button>
							</div>
						</form>
					)}
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

export default RegistrationForm;
