"use client";

import Link from "next/link";
import { useState } from "react";
import { GL } from "./gl";
import { Pill } from "./pill";
import { useVideo } from "@/context/video-context";
import BookForm from "@/components/resort/BookForm";
import VillaAvailabilityButton from "@/components/controls/VillaAvailabilityButton";

import CypressBadgeWood from "@/assets/icons/CypressBadgeWood";
import CypressBadgeSnow from "@/assets/icons/CypressBadgeSnow";

import SocialLinks from "@/components/social/SocialLinks";

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
    ? "mt-8 h-[300px] lg:h-[70px]"
    : "mt-8 h-[44px]";

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

      {/* FOREGROUND: make the hero a flex column so we can pin a footer */}
      <div
        className={`relative z-10 min-h-svh flex flex-col transition-colors duration-700 ${
          showVideo ? "gold-text" : "text-white"
        }`}
      >
        {/* Main content grows/shrinks */}
        <div className="flex-1">
          <div className="pt-24 pb-6 text-center container">
            <Pill className="mb-5">Luxury Villas</Pill>

            <div className="flex justify-center text-white">
              {showVideo ? (
                <CypressBadgeSnow width={480} height={280} />
              ) : (
                <CypressBadgeWood width={480} height={280} />
              )}
            </div>

            <p
              className={`font-mono text-sm sm:text-base text-balance mt-6 max-w-[440px] mx-auto ${
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

        {/* ✅ “Real footer” inside the hero: always at bottom, never overlaps CTA */}
        <div className="mt-auto pb-4 sm:pb-5">
          <div className="flex justify-center">
            <div className="pointer-events-auto rounded-full bg-black/20 backdrop-blur border border-white/10 px-3 py-2">
              <SocialLinks
                instagramUrl="https://instagram.com/cypressresort"
                facebookUrl="https://facebook.com/cypressresort"
                youtubeUrl={undefined}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

