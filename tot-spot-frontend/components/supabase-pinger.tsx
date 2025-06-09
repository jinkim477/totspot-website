// components/SupabasePinger.tsx
"use client";

import { useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL!,
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function SupabasePinger() {
	useEffect(() => {
		const ping = async () => {
			try {
				// Make a minimal real query to keep Supabase active
				await supabase.from("registrations").select("id").limit(1);
				console.log("✅ Supabase pinged");
			} catch (error) {
				console.error("❌ Supabase ping failed", error);
			}
		};

		// Immediately ping on mount
		ping();

		// Then ping every 24 hours
		const interval = setInterval(ping, 24 * 60 * 60 * 1000); // 86,400,000 ms

		return () => clearInterval(interval); // Clean up on unmount
	}, []);

	return null; // No UI
}