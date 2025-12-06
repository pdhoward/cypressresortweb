// components/hero.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { GL } from "./gl";
import { Pill } from "./pill";
import { useVideo } from "@/context/video-context";
import BookForm from "@/components/resort/BookForm";
import VillaAvailabilityButton from "@/components/controls/VillaAvailabilityButton"

// 👇 Import the stacked logo
import CypressBadgeWood from "@/assets/icons/CypressBadgeWood";
import CypressBadgeSnow from "@/assets/icons/CypressBadgeSnow";

const CYPRESS_VIDEO =
  "https://res.cloudinary.com/stratmachine/video/upload/v1764602102/cypress/cypressvideo_v3fjcz.mp4";

export function Hero() {
  const [hovering, setHovering] = useState(false);
  const [showBookForm, setShowBookForm] = useState(false);

  const { showVideo } = useVideo();

  const handleReservationsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowBookForm(true);
  };

  const transitionContainerClasses = showBookForm
    ? "mt-14 h-[300px] lg:h-[70px]"
    : "mt-14 h-[44px]";

  return (
    <section className="relative min-h-svh overflow-hidden">
      {/* BACKGROUND LAYERS */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className={`absolute inset-0 transition-opacity duration-[1500ms] ease-out ${
            showVideo ? "opacity-0" : "opacity-100"
          }`}
        >
          <GL hovering={hovering} />
        </div>

        <video
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1500ms] ease-out ${
            showVideo ? "opacity-100" : "opacity-0"
          }`}
          src={CYPRESS_VIDEO}
          autoPlay
          loop
          muted
          playsInline
        />
      </div>

      {/* FOREGROUND CONTENT */}
      <div
        className={`relative z-10 transition-colors duration-700 ${
          showVideo ? "gold-text" : "text-white"
        }`}
      >
        <div className="pt-28 pb-16 text-center container">
          <Pill className="mb-6">Luxury Villas</Pill>
         
          <div className="flex justify-center text-white">
           {showVideo ? (
            <CypressBadgeSnow width={480} height={280} />
          ) : (
            <CypressBadgeWood width={480} height={280} />
          )}
          </div>

          <p
            className={`font-mono text-sm sm:text-base text-balance mt-8 max-w-[440px] mx-auto ${
              showVideo ? "text-white" : "text-foreground/60"
            }`}
          >
            Where luxury meets nature in the North Georgia Mountains
          </p>

          <div
            className={`transition-all duration-500 ease-in-out flex justify-center ${transitionContainerClasses}`}
          >
            {showBookForm ? (
              <BookForm />
            ) : (
              <Link
                className="contents"
                href="/#reservation"
                onClick={handleReservationsClick}
              >
                <VillaAvailabilityButton />
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
