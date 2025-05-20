export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Init Supabase client
const supabase = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL!,
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
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

		return NextResponse.json({ success: true });
	} catch (err) {
		console.error("❌ Server Error:", err);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 }
		);
	}
}
