"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";
import { BannerData } from "@/types/banner";
import Image from "next/image";
import Link from "next/link";

interface BannerCarouselProps {
  slides: BannerData[];
}

export default function HomeCarousels({ slides }: BannerCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 4500, stopOnInteraction: false }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback(
    (i: number) => emblaApi?.scrollTo(i),
    [emblaApi],
  );

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const validSlides = slides.filter((slide) => slide.imageEnUrl?.trim());

  if (!validSlides.length) return null;

  return (
    <div className="w-full mx-auto font-sans select-none">
      {/* Embla viewport */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {validSlides.map((slide) => {
            const imageSrc = slide.imageEnUrl.trim();

            return (
              <div
                key={slide._id}
                className="flex-[0_0_100%] min-w-0 relative overflow-hidden bg-[#e8c9b0]"
                style={{ aspectRatio: "16/6.5" }}
              >
                {/* Full background image */}

                <Image
                  src={imageSrc}
                  alt={slide.titleEnglish}
                  fill
                  className="absolute inset-0 w-full h-full object-cover"
                  draggable={false}
                />

                {/* Gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />

                {/* Title + CTA */}
                <div className="absolute left-6 top-1/2 -translate-y-1/2 z-10 max-w-xs">
                  <h2
                    className="text-white font-black leading-tight tracking-tight"
                    style={{ fontSize: "clamp(20px, 3.5vw, 48px)" }}
                  >
                    {slide.titleEnglish}
                  </h2>
                  <Link
                    href={`/items/${slide.itemId}?menuId=${slide.categoryId}`}

                    className="mt-4 flex items-center gap-2 text-white text-sm font-medium">
                    <span>Order Now</span>
                    <span className="w-8 h-8 rounded-full bg-white/20 border border-white/40 flex items-center justify-center">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3 mt-4 px-1">
        {/* Dots */}
        <div className="flex items-center gap-2 flex-1">
          {validSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === selectedIndex ? "w-10 bg-[#e05c2a]" : "w-4 bg-gray-300"
                }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Counter */}
        <span className="text-xs font-medium text-gray-400 tracking-widest">
          {String(selectedIndex + 1).padStart(2, "0")} /{" "}
          {String(validSlides.length).padStart(2, "0")}
        </span>

        {/* Arrows */}
        <button
          onClick={scrollPrev}
          className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition cursor-pointer"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button
          onClick={scrollNext}
          className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition cursor-pointer"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
