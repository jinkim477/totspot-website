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

		// Send email using Resend
		// 📧 Send notification email
		const emailResult = await resend.emails.send({
			from: "Tot Spot Registration <info@totspotpreschool.ca>",
			to: "info@totspotpreschool.ca",
			subject: "📬 New Registration Submitted",
			html: `
				<p>A new child has been registered!</p>
				<p><strong>Name:</strong> ${newPayload.childFullName}</p>
				<p><strong>Parent Email:</strong> ${newPayload.parentEmail}</p>
				<p><strong>Program:</strong> ${
					newPayload.programChoice3Yr || newPayload.programChoice4Yr
				}</p>
				<p><strong>Signature:</strong> <a href="${signatureUrl}" target="_blank">View Image</a></p>
			`,
		});

		if (emailResult.error) {
			console.error("❌ Email Notification Error:", emailResult.error);
		}

		// 📧 Send confirmation email to the registrant
		await resend.emails.send({
			from: "Tot Spot Preschool <info@totspotpreschool.ca>",
			to: newPayload.parentEmail,
			subject: "✅ Registration Received",
			html: `
		<p>Hi ${newPayload.parent1Name},</p>
		<p>Thank you for registering your child, <strong>${newPayload.childFullName}</strong>, at Tot Spot Preschool!</p>
		<p>We’ve received your submission and will review it shortly.</p>

		<p><strong>Selected Program:</strong><br />
		${newPayload.programChoice3Yr || newPayload.programChoice4Yr}</p>

		<p>If you have any questions, feel free to reply to this email.</p>

		<p>Warm regards,<br />
		Tot Spot Preschool Team</p>
	`,
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
