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
		<header
			className={cn(
				"sticky top-0 z-50 w-full transition-all duration-200",
				scrolled ? "bg-white shadow-md" : "bg-white/80 backdrop-blur-md"
			)}
		>
			<div className="container flex h-16 items-center justify-between">
				<Link href="/" className="flex items-center gap-2">
					<div className="h-10 w-10 rounded-full bg-pink-600"></div>
					<span className="text-xl font-bold text-pink-600">Tot Spot</span>
				</Link>
				<nav className="hidden md:flex gap-1 lg:gap-2">
					{navItems.map((item) => (
						<Link
							key={item.name}
							href={item.href}
							className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-pink-600 transition-colors rounded-md"
						>
							{item.name}
						</Link>
					))}
					<Link href="/programs">
						<Button className="ml-2 bg-pink-600 hover:bg-pink-700">
							Register Now
						</Button>
					</Link>
				</nav>
				<Sheet>
					<SheetTrigger asChild>
						<Button variant="outline" size="icon" className="md:hidden">
							<Menu className="h-5 w-5" />
							<span className="sr-only">Toggle menu</span>
						</Button>
					</SheetTrigger>
					<SheetContent side="right">
						<div className="flex flex-col gap-4 mt-8">
							{navItems.map((item) => (
								<Link
									key={item.name}
									href={item.href}
									className="px-3 py-2 text-lg font-medium text-gray-700 hover:text-pink-600 transition-colors"
								>
									{item.name}
								</Link>
							))}
							<Button className="mt-4 bg-pink-600 hover:bg-pink-700">
								Register Now
							</Button>
						</div>
					</SheetContent>
				</Sheet>
			</div>
		</header>
	);
}
