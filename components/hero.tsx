// components/hero.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { GL } from "./gl";
import { Pill } from "./pill";
import { Button } from "./ui/button";
import { useVideo } from "@/context/video-context"; 
import BookForm from "@/components/resort/BookForm"; // 👈 Import the new component

const CYPRESS_VIDEO =
  "https://res.cloudinary.com/stratmachine/video/upload/v1764602102/cypress/cypressvideo_v3fjcz.mp4";

export function Hero() {
  const [hovering, setHovering] = useState(false);
  // ⭐️ NEW STATE: To control the visibility of the booking form
  const [showBookForm, setShowBookForm] = useState(false);
  
  const { showVideo } = useVideo();

  // Helper function to handle the button click and show the form
  const handleReservationsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowBookForm(true);
  };


  // Classes for the transition div containing the button/form
  const transitionContainerClasses = showBookForm 
    ? "mt-14 h-[300px] lg:h-[70px]" 
    : "mt-14 h-[44px]"; // Approximate height of the button

  return (
    <section className="relative min-h-svh overflow-hidden">
      {/* BACKGROUND LAYERS (omitted for brevity) */}
      <div className="absolute inset-0 pointer-events-none">
        {/* ... existing GL and Video ... */}
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
        <div className="pt-28 pb-16 text-center container"> {/* Added container class */}
          <Pill className="mb-6">Luxury Villas</Pill>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-sentient">
            Experience <br />
            <i className="font-light">Cypress Resort</i>
          </h1>

          <p
            className={`font-mono text-sm sm:text-base text-balance mt-8 max-w-[440px] mx-auto ${
              showVideo ? "text-white" : "text-foreground/60"
            }`}
          >
            Where luxury meets nature in the North Georgia Mountains
          </p>

          {/* ⭐️ CONDITIONAL RENDERING FOR BOOKING FORM */}
          <div className={`transition-all duration-500 ease-in-out flex justify-center ${transitionContainerClasses}`}>
            {showBookForm ? (
              <BookForm />
            ) : (
              // Use an anchor tag around the Button for accessibility
              <Link className="contents" href="/#reservations" onClick={handleReservationsClick}>
                <Button
                  className="max-sm:hidden"
                  onMouseEnter={() => setHovering(true)}
                  onMouseLeave={() => setHovering(false)}
                >
                  [Reservations]
                </Button>
                <Button
                  size="sm"
                  className="sm:hidden"
                  onMouseEnter={() => setHovering(true)}
                  onMouseLeave={() => setHovering(false)}
                >
                  [Reservations]
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}