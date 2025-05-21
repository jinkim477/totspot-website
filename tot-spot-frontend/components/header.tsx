"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export function Header() {
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 10);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const navItems = [
		{ name: "Home", href: "/" },
		{ name: "About", href: "/about" },
		{ name: "Programs & Registration", href: "/programs" },
		{ name: "Contact", href: "/contact" },
		{ name: "Parents", href: "/parents" },
		{ name: "Updates", href: "/updates" },
	];

	return (
		<header className="sticky top-0 z-50 bg-white shadow-md">
			<div className="container mx-auto flex h-16 items-center justify-between">
				<span className="text-lg font-bold">Header test</span>
				<nav className="hidden md:flex gap-4">
					<a href="/">Home</a>
					<a href="/about">About</a>
				</nav>
			</div>
		</header>
	);
}
