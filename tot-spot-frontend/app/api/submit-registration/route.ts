export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

// Init Supabase client
const supabase = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL!,
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY!);

// Company emails from environment (used for notification recipients and sender)
const COMPANY_EMAIL = process.env.NEXT_PUBLIC_COMPANY_EMAIL || "";
const SECONDARY_COMPANY_EMAIL =
	process.env.NEXT_PUBLIC_SECONDARY_COMPANY_EMAIL || "";

// Notification recipients: include primary and secondary if present
const NOTIFICATION_EMAILS = [COMPANY_EMAIL, SECONDARY_COMPANY_EMAIL].filter(
	Boolean
);

export async function POST(req: NextRequest) {
	try {
		const data = await req.json();

		// Extract base64 data from the signature string
		const base64Data = data.signature.replace(/^data:image\/\w+;base64,/, "");
		const binary = atob(base64Data);
		const byteArray = new Uint8Array(binary.length);
		for (let i = 0; i < binary.length; i++) {
			byteArray[i] = binary.charCodeAt(i);
		}
		const blob = new Blob([byteArray], { type: "image/png" });

		// Define a unique filename
		const fileName = `signature-${Date.now()}.png`;

		console.log("🖼 Uploading signature:", fileName);
		// Upload to Supabase Storage
		const { error: uploadError } = await supabase.storage
			.from("signatures")
			.upload(fileName, blob, {
				contentType: "image/png",
			});

		console.log("Blob size:", blob.size);

		if (uploadError) {
			console.error("❌ Upload Error:", uploadError);
			return NextResponse.json({ error: "Upload failed" }, { status: 500 });
		}

		// Get public URL
		const { data: publicUrlData } = supabase.storage
			.from("signatures")
			.getPublicUrl(fileName);

		const signatureUrl = publicUrlData.publicUrl;

		// Remove the base64 from the payload and add signature_url
		const { signature, ...rest } = data;

		const newPayload = {
			...rest,
			signatureUrl: signatureUrl,
		};

		// Save to Supabase table
		const { error: insertError } = await supabase
			.from("registrations")
			.insert([newPayload]);

		if (insertError) {
			console.error("❌ Supabase Insert Error:", insertError);
			return NextResponse.json({ error: "Insert failed" }, { status: 500 });
		}

		const pdfBuffer = await generateRegistrationPDF(newPayload, signatureUrl);

		// Determine program details for emails
		const programAge = newPayload.programChoice3Yr
			? "3 Year Olds"
			: "4 Year Olds";
		const programChoice =
			newPayload.programChoice3Yr || newPayload.programChoice4Yr;

		// Send email using Resend to one or more notification recipients
		// Set REGISTRATION_NOTIFICATION_EMAILS as a comma-separated list in your env (e.g. "info@...,admin@example.com").
		const notificationHtml = `
				<p>A new child has been registered!</p>
				<p><strong>Name:</strong> ${newPayload.childFullName}</p>
				<p><strong>Parent Email:</strong> ${newPayload.parentEmail}</p>
				<p><strong>Program:</strong> ${programAge} - ${programChoice}</p>
				<p><strong>Signature:</strong> <a href="${signatureUrl}" target="_blank">View Image</a></p>
			`;

		try {
			await resend.emails.send({
				from: `Tot Spot Registration <${COMPANY_EMAIL}>`,
				to: NOTIFICATION_EMAILS,
				subject: "📬 New Registration Submitted",
				html: notificationHtml,
				attachments: [
					{
						filename: `registration-${newPayload.childFullName.replace(
							/\s+/g,
							"_"
						)}-${Date.now()}.pdf`,
						content: pdfBuffer,
					},
				],
			});
		} catch (e) {
			console.error("❌ Email Notification Error:", e);
		}

		// 📧 Send confirmation email to the registrant
		await resend.emails.send({
			from: `Tot Spot Preschool <${COMPANY_EMAIL}>`,
			to: newPayload.parentEmail,
			subject: "✅ Registration Received",
			html: `
		<p>Hi ${newPayload.parent1Name},</p>
		<p>Thank you for registering your child, <strong>${newPayload.childFullName}</strong>, at Tot Spot Preschool!</p>
		<p>We’ve received your submission and will review it shortly.</p>

		<p><strong>Selected Program:</strong><br />
		${programAge} - ${programChoice}</p>

		<p>If you have any questions, feel free to reply to this email.</p>

		<p>Warm regards,<br />
		Tot Spot Preschool Team</p>
	`,
			attachments: [
				{
					filename: `registration-${newPayload.childFullName.replace(
						/\s+/g,
						"_"
					)}-${Date.now()}.pdf`,
					content: pdfBuffer,
				},
			],
		});

		return NextResponse.json({ success: true });
	} catch (err) {
		console.error("❌ Server Error:", err);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 }
		);
	}
}

// Helper function to generate PDF
async function generateRegistrationPDF(
	payload: any,
	signatureUrl: string
): Promise<Buffer> {
	const { jsPDF } = await import("jspdf");

	const doc = new jsPDF();
	let yPosition = 10;

	// Title
	doc.setFontSize(16);
	doc.setFont("helvetica", "bold");
	doc.text("Tot Spot Preschool - Registration Form", 105, yPosition, {
		align: "center",
	});
	yPosition += 10;

	doc.setFontSize(9);
	doc.setFont("helvetica", "normal");
	doc.text(`Submitted: ${payload.submissionDate}`, 105, yPosition, {
		align: "center",
	});
	yPosition += 8;

	// Child Information Section
	doc.setFontSize(12);
	doc.setFont("helvetica", "bold");
	doc.text("Child Information", 10, yPosition);
	yPosition += 7;

	doc.setFont("helvetica", "normal");
	doc.setFontSize(10);
	doc.text(`Full Name: ${payload.childFullName}`, 10, yPosition);
	yPosition += 5;
	doc.text(`Date of Birth: ${payload.dateOfBirth || "N/A"}`, 10, yPosition);
	yPosition += 5;
	doc.text(`Gender: ${payload.gender || "N/A"}`, 10, yPosition);
	yPosition += 8;

	// Address Section
	doc.setFontSize(12);
	doc.setFont("helvetica", "bold");
	doc.text("Address", 10, yPosition);
	yPosition += 7;

	doc.setFont("helvetica", "normal");
	doc.setFontSize(10);
	doc.text(`Street: ${payload.addressStreet || "N/A"}`, 10, yPosition);
	yPosition += 5;
	doc.text(`City: ${payload.addressCity || "N/A"}`, 10, yPosition);
	yPosition += 5;
	doc.text(`Province: ${payload.addressProvince || "N/A"}`, 10, yPosition);
	yPosition += 5;
	doc.text(`Postal Code: ${payload.addressPostalCode || "N/A"}`, 10, yPosition);
	yPosition += 8;

	// Parent/Guardian Information Section
	doc.setFontSize(12);
	doc.setFont("helvetica", "bold");
	doc.text("Parent/Guardian Information", 10, yPosition);
	yPosition += 7;

	doc.setFont("helvetica", "normal");
	doc.setFontSize(10);
	doc.text(`Parent 1 Name: ${payload.parent1Name || "N/A"}`, 10, yPosition);
	yPosition += 5;
	doc.text(`Parent 1 Phone: ${payload.parent1Phone || "N/A"}`, 10, yPosition);
	yPosition += 5;
	doc.text(`Parent 2 Name: ${payload.parent2Name || "N/A"}`, 10, yPosition);
	yPosition += 5;
	doc.text(`Parent 2 Phone: ${payload.parent2Phone || "N/A"}`, 10, yPosition);
	yPosition += 5;
	doc.text(`Email: ${payload.parentEmail || "N/A"}`, 10, yPosition);
	yPosition += 8;

	// Enrollment Information Section
	doc.setFontSize(12);
	doc.setFont("helvetica", "bold");
	doc.text("Enrollment Information", 10, yPosition);
	yPosition += 7;

	doc.setFont("helvetica", "normal");
	doc.setFontSize(10);
	doc.text(
		`Returning Family: ${payload.isReturningFamily || "No"}`,
		10,
		yPosition
	);
	yPosition += 5;
	doc.text(
		`How did you hear about us: ${payload.referralSource || "N/A"}`,
		10,
		yPosition
	);
	yPosition += 8;

	// Program Selection Section
	doc.setFontSize(12);
	doc.setFont("helvetica", "bold");
	doc.text("Program Selection", 10, yPosition);
	yPosition += 7;

	doc.setFont("helvetica", "normal");
	doc.setFontSize(10);
	const programAge = payload.programChoice3Yr ? "3 Year Olds" : "4 Year Olds";
    const programChoice = payload.programChoice3Yr || payload.programChoice4Yr || "N/A";
	doc.text(`Selected Program: ${programAge} - ${programChoice}`, 10, yPosition);
	yPosition += 8;

	// Fee Payment Methods Section
	doc.setFontSize(12);
	doc.setFont("helvetica", "bold");
	doc.text("Fee Payment Methods", 10, yPosition);
	yPosition += 7;

	doc.setFont("helvetica", "normal");
	doc.setFontSize(10);
	doc.text(
		`Registration Fee Payment: ${payload.registrationFeeMethod || "N/A"}`,
		10,
		yPosition
	);
	yPosition += 5;
	doc.text(
		`Monthly Fee Payment: ${payload.monthlyFeeMethod || "N/A"}`,
		10,
		yPosition
	);
	yPosition += 8;

	// Signature Section
	doc.setFontSize(12);
	doc.setFont("helvetica", "bold");
	doc.text("Signature", 10, yPosition);
	yPosition += 7;

	try {
		// Fetch the signature image from the URL
		const response = await fetch(signatureUrl);
		const buffer = await response.arrayBuffer();
		const base64 = Buffer.from(buffer).toString("base64");
		const dataUrl = `data:image/png;base64,${base64}`;

		doc.addImage(dataUrl, "PNG", 10, yPosition, 50, 30);
	} catch (e) {
		doc.setFont("helvetica", "normal");
		doc.setFontSize(10);
		doc.text("Signature image not available", 10, yPosition);
		console.error("Error adding signature image to PDF:", e);
	}

	const pdfData = doc.output("arraybuffer");
	return Buffer.from(pdfData);
}
