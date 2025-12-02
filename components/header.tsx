"use client";

import Link from "next/link";
import { Logo } from "./logo";
import { MobileMenu } from "./mobile-menu";
import { useVideo } from "@/context/video-context";

export const Header = () => {
  const { showVideo } = useVideo();

  // ⭐️ Refactoring for high contrast on video background:
  // Use a bright white/light gold and make it BOLD for better presence.
  const navLinkBase = showVideo
    ? "uppercase inline-block font-mono font-bold text-[#FFEEB2] hover:text-white duration-150 transition-colors ease-out"
    : "uppercase inline-block font-mono text-foreground/60 hover:text-foreground/100 duration-150 transition-colors ease-out";

  // ⭐️ Refactoring for high contrast on video background:
  // Use the primary gold for the sign-in button to make it stand out.
  const signInClasses = showVideo
    ? "uppercase max-lg:hidden transition-colors ease-out duration-150 font-mono text-primary hover:text-primary/80" // Primary gold (#FFC700)
    : "uppercase max-lg:hidden transition-colors ease-out duration-150 font-mono text-primary hover:text-primary/80";

  return (
    <div className="fixed z-50 pt-8 md:pt-14 top-0 left-0 w-full">
      
      <header className="flex items-center justify-between container">
        <Link href="/">
          {/* Logo inherits gold-text vs white */}
          <Logo className={showVideo ? "gold-text" : "text-white"} />
        </Link>

        <nav className="flex max-lg:hidden absolute left-1/2 -translate-x-1/2 items-center justify-center gap-x-10">
          {["About", "Portfolio", "Insights", "Contact"].map((item) => (
            <Link
              className={navLinkBase}
              href={`#${item.toLowerCase()}`}
              key={item}
            >
              {item}
            </Link>
          ))}
        </nav>

        <Link className={signInClasses} href="/#sign-in">
          Sign In
        </Link>

        <MobileMenu />
      </header>
    </div>
  );
};