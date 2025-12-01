import { ComponentProps } from "react";

export function CypressBadge(props: ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      width={props.width ?? 200}
      height={props.height ?? 200}
      {...props}
    >
      <defs>
        {/* Inner blue radial gradient */}
        <radialGradient id="cypress-badge-inner" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#1f7dd8" />
          <stop offset="50%" stopColor="#0b3a70" />
          <stop offset="100%" stopColor="#041326" />
        </radialGradient>

        {/* Outer ring gradient for a subtle metallic feel */}
        <linearGradient id="cypress-badge-ring" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f5f7fb" />
          <stop offset="40%" stopColor="#cdd5e4" />
          <stop offset="60%" stopColor="#a0aec6" />
          <stop offset="100%" stopColor="#f5f7fb" />
        </linearGradient>
      </defs>

      {/* Background (transparent outside circle) */}
      <rect width="200" height="200" fill="none" />

      {/* Outer ring */}
      <circle
        cx="100"
        cy="100"
        r="96"
        fill="url(#cypress-badge-ring)"
        stroke="#0a0d16"
        strokeWidth="2"
      />

      {/* Inner circular field */}
      <circle
        cx="100"
        cy="100"
        r="80"
        fill="url(#cypress-badge-inner)"
        stroke="rgba(0,0,0,0.35)"
        strokeWidth="1.5"
      />

      {/* Main triangle structure */}
      <path
        d="M100 26 L32 172 H168 Z"
        fill="none"
        stroke="#f7fbff"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Vertical “pillar” lines inside triangle */}
      <line
        x1="70"
        y1="170"
        x2="70"
        y2="128"
        stroke="#f7fbff"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <line
        x1="82"
        y1="170"
        x2="82"
        y2="115"
        stroke="#f7fbff"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <line
        x1="94"
        y1="170"
        x2="94"
        y2="100"
        stroke="#f7fbff"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <line
        x1="106"
        y1="170"
        x2="106"
        y2="100"
        stroke="#f7fbff"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <line
        x1="118"
        y1="170"
        x2="118"
        y2="115"
        stroke="#f7fbff"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <line
        x1="130"
        y1="170"
        x2="130"
        y2="128"
        stroke="#f7fbff"
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* Top arcs (like in the badge) */}
      <path
        d="M52 118 A48 48 0 0 1 148 118"
        fill="none"
        stroke="#f7fbff"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <path
        d="M56 104 A44 44 0 0 1 144 104"
        fill="none"
        stroke="#f7fbff"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
      <path
        d="M60 90 A40 40 0 0 1 140 90"
        fill="none"
        stroke="#f7fbff"
        strokeWidth="2.4"
        strokeLinecap="round"
      />

      {/* Small highlight circle near the top (optional “specular” */}
      <circle cx="85" cy="55" r="6" fill="rgba(255,255,255,0.45)" />
    </svg>
  );
}
