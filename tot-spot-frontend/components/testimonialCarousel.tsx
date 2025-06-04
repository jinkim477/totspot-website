"use client";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";

export default function TestimonialCarousel({ testimonials }: { testimonials: any[] }) {
	const [currentSlide, setCurrentSlide] = useState(0);
	const [loaded, setLoaded] = useState(false);
	const sliderRef = useRef(null);

	const [sliderInstanceRef, slider] = useKeenSlider<HTMLDivElement>({
		initial: 0,
		loop: true,
		slides: {
			perView: 1,
			spacing: 16,
		},
		mode: "snap",
		created() {
			setLoaded(true);
		},
		slideChanged(s) {
			setCurrentSlide(s.track.details.rel);
		},
	});

    useEffect(() => {
        if (!slider.current) return;

        const interval  = setInterval(() => {
            slider.current?.next();
        }, 30000); // change every 30 seconds

        return () => clearInterval(interval);
    }, [slider]);

	return (
		<div className="relative">
			{/* Carousel */}
			<div ref={sliderInstanceRef} className="keen-slider">
                
				{testimonials.map((testimonial: any, index: number) => (
					<div className="keen-slider__slide" key={index}>
						<Card className="h-full bg-gray-50 border p-6 rounded-lg">
							<CardContent>
								<div className="text-pink-600 text-6xl leading-none my-2">“</div>
								<p className="text-gray-600 italic whitespace-pre-line">
									{testimonial.fields.description}
								</p>
								<div className="mt-4">
									<div className="font-medium text-gray-900">
										{testimonial.fields.name}
									</div>
									<div className="text-sm text-gray-500">
										{testimonial.fields.subtext}
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				))}
			</div>

			{/* Arrows */}
			{loaded && slider && (
				<>
					<button
						onClick={() => slider.current?.prev()}
						className="absolute top-1/2 -left-6 transform -translate-y-1/2 bg-white border rounded-full shadow p-2 hover:bg-gray-100"
					>
						<ChevronLeft className="h-5 w-5 text-pink-600" />
					</button>
					<button
						onClick={() => slider.current?.next()}
						className="absolute top-1/2 -right-6 transform -translate-y-1/2 bg-white border rounded-full shadow p-2 hover:bg-gray-100"
					>
						<ChevronRight className="h-5 w-5 text-pink-600" />
					</button>
				</>
			)}

			{/* Dots */}
			{loaded && slider && (
				<div className="flex justify-center mt-6 space-x-2">
					{testimonials.map((_, idx) => (
						<button
							key={idx}
							onClick={() => slider.current?.moveToIdx(idx)}
							className={clsx(
								"h-2 w-2 rounded-full",
								currentSlide === idx
									? "bg-pink-600"
									: "bg-gray-300 hover:bg-gray-400"
							)}
						/>
					))}
				</div>
			)}
		</div>
	);
}
