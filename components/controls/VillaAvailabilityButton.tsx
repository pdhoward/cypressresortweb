"use client";

import React from "react";

interface VillaAvailabilityButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

/**
 * A luxury-style "Check Availability" button
 * – glowy gold border, subtle hover animation,
 * – designed to drop cleanly into the Hero.
 */
const VillaAvailabilityButton: React.FC<VillaAvailabilityButtonProps> = ({
  className = "",
  ...props
}) => {
  const baseClasses =
    "relative inline-flex items-center justify-center rounded-full " +
    "border border-amber-300/80 bg-black/20 px-8 py-3 " +
    "font-mono text-xs tracking-[0.35em] uppercase text-amber-200 " +
    "shadow-[0_0_20px_rgba(251,191,36,0.4)] backdrop-blur-sm " +
    "transition-all duration-300 " +
    "hover:-translate-y-0.5 hover:border-amber-300 hover:bg-black/40 " +
    "hover:shadow-[0_0_36px_rgba(251,191,36,0.7)] " +
    "focus-visible:outline-none focus-visible:ring-2 " +
    "focus-visible:ring-amber-300/80 focus-visible:ring-offset-2 " +
    "focus-visible:ring-offset-black group";

  return (
    <button
      type="button"
      className={`${baseClasses} ${className}`}
      {...props}
    >
      {/* Inner content */}
      <span className="relative z-10 flex items-center gap-3">
        <span className="text-sm font-medium tracking-[0.3em]">
          Reserve
        </span>

        {/* Glowing arrow pill */}
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-amber-300/70 bg-amber-300/10 transition-transform duration-300 group-hover:translate-x-1 group-hover:scale-110">
          <svg
            className="h-3.5 w-3.5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </span>
      </span>

      {/* Soft ambient glow */}
      <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-amber-200/10 via-amber-400/20 to-amber-200/10 opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100" />

      {/* Outer halo / border luminance */}
      <span className="pointer-events-none absolute inset-[-1px] rounded-full border border-amber-300/40 opacity-70 [box-shadow:0_0_22px_rgba(251,191,36,0.45)] group-hover:opacity-100" />
    </button>
  );
};

export default VillaAvailabilityButton;
