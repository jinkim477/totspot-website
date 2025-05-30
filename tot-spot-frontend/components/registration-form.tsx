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
	downloadableDocs,
	onClose,
}: {
	programName: string;
	programDays: string;
	programTime: string;
	programPrice: string;
	downloadableDocs: any[];
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

	const totalSteps = 3;

	// ...existing code...

	const isStep1Valid = () =>
		childFirstName.trim() && dob.trim() && gender.trim();

	const isStep2Valid = () =>
		street.trim() &&
		city.trim() &&
		province.trim() &&
		postalCode.trim() &&
		parent1.trim() &&
		parent1Phone.trim() &&
		email.trim() &&
		returningFamily.trim();

	const isStep3Valid = () =>
		regFeeMethod.trim() &&
		monthlyFeeMethod.trim() &&
		signature.trim() &&
		date.trim();

	const preAuthDebitDoc = downloadableDocs.find(
		(doc) =>
			doc.fields &&
			doc.fields.title &&
			doc.fields.title.toLowerCase().includes("pre-authorized debit")
	);

	const handleSubmit = async (e: React.FormEvent) => {
		// console.log("Handle Submit Triggered at Step:", step);
		e.preventDefault();
		setIsSubmitting(true);

		const programChoice = `${programDays} ${programTime.includes("AM") ? "AM" : "PM"} (${programPrice})`;
		const isThreeYearOld = programName.toLowerCase().includes("3 year");

		const payload: Record<string, string> = {
			childFullName: `${childFirstName} ${childLastName}`,
			dateOfBirth: dob,
			gender: gender,

			addressStreet: street,
			addressCity: city,
			addressProvince: province,
			addressPostalCode: postalCode,

			parent1Name: parent1,
			parent2Name: parent2,
			parent1Phone: parent1Phone,
			parent2Phone: parent2Phone,
			parentEmail: email,

			isReturningFamily: returningFamily,
			referralSource: hearAboutUs,

			programChoice3Yr: isThreeYearOld ? programChoice : "",
			programChoice4Yr: isThreeYearOld ? "" : programChoice,

			registrationFeeMethod: regFeeMethod,
			monthlyFeeMethod: monthlyFeeMethod,

			signature: signature,
			submissionDate: date,
		};

		console.log("📝 Registration Payload:", payload); // for debugging

		try {
			// Fluent Forms API
			const response = await fetch("/api/submit-registration", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload),
			});

			const result = await response.json();

			if (!response.ok) {
				console.error("❌ Submission Error:", result);
				alert("Submission Failed. Please try again.");
				setIsSubmitting(false);
				return;
			}

			console.log("✅ Submission Successful:", result);
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
											<Label className="px-2">
												First Name <span className="text-pink-600">*</span>
											</Label>
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
											<Label className="px-2">
												Date of Birth <span className="text-pink-600">*</span>
											</Label>
											<Input
												value={dob}
												onChange={(e) => setDob(e.target.value)}
												type="date"
												placeholder="Date of Birth"
												required
											/>
										</div>
										<div className="space-y-2">
											<Label className="px-2">
												Gender <span className="text-pink-600">*</span>
											</Label>
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
											<Label className="px-2">
												Street Address <span className="text-pink-600">*</span>
											</Label>
											<Input
												value={street}
												onChange={(e) => setStreet(e.target.value)}
												placeholder="e.g. 123 Main St NE"
												required
											/>
										</div>
										<div className="space-y-2">
											<Label className="px-2">
												City <span className="text-pink-600">*</span>
											</Label>
											<Input
												value={city}
												onChange={(e) => setCity(e.target.value)}
												placeholder="e.g. Calgary"
												required
											/>
										</div>
										<div className="space-y-2">
											<Label className="px-2">
												Province <span className="text-pink-600">*</span>
											</Label>
											<Input
												value={province}
												onChange={(e) => setProvince(e.target.value)}
												placeholder="e.g. Alberta"
												required
											/>
										</div>
										<div className="space-y-2">
											<Label className="px-2">
												Postal Code <span className="text-pink-600">*</span>
											</Label>
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
											<Label className="px-2">
												Parent 1 Name <span className="text-pink-600">*</span>
											</Label>
											<Input
												value={parent1}
												onChange={(e) => setParent1(e.target.value)}
												placeholder="e.g. Jane Doe"
												required
											/>
										</div>
										<div className="space-y-2">
											<Label className="px-2">
												Parent 1 Phone <span className="text-pink-600">*</span>
											</Label>
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
											<Label className="px-2">
												Email <span className="text-pink-600">*</span>
											</Label>
											<Input
												value={email}
												onChange={(e) => setEmail(e.target.value)}
												type="email"
												placeholder="e.g. janedoe123@gmail.com"
												required
											/>
										</div>
										<div className="space-y-2">
											<Label className="px-2">
												Returning Tot Spot Family?{" "}
												<span className="text-pink-600">*</span>
											</Label>
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
								disabled={
									(step === 1 && !isStep1Valid()) ||
									(step === 2 && !isStep2Valid())
								}
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

								<div className="grid grid-cols-2 gap-4 mb-6">
									<div className="space-y-2">
										<Label className="font-bold">
											Registration Fee Payment Method{" "}
											<span className="text-pink-600">*</span>
										</Label>
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
										<Label className="font-bold">
											Monthly Fee Payment Method{" "}
											<span className="text-pink-600">*</span>
										</Label>
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
										{monthlyFeeMethod === "Pre-authorized Debit" &&
											preAuthDebitDoc && (
												<div className="mt-4">
													<a
														href={preAuthDebitDoc.fields.file.fields.file.url}
														download
														target="_blank"
														rel="noopener noreferrer"
														className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
													>
														Download Pre-Authorized Debit Form
													</a>
												</div>
											)}
									</div>
								</div>
								<div className="mb-4">
									<p className="font-bold">Note:</p>
									<ul className="break-words whitespace-normal list-disc mx-6">
										<li>
											The $100 non-refundable Registration Fee is payable on the
											day of registration.
										</li>
										<li>
											The Monthly School Fees are drawn on the 1st business day
											of each month from September to June.
										</li>
									</ul>
								</div>
								<div className="space-y-4">
									<div className="space-y-2">
										<Label className="font-bold">
											Signature <span className="text-pink-600">*</span>
										</Label>
										<div className="w-full max-w-full overflow-hidden">
											<SignatureField onChange={setSignature} />
										</div>
									</div>
									<div className="space-y-2">
										<Label htmlFor="date">
											Date <span className="text-pink-600">*</span>
										</Label>
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
