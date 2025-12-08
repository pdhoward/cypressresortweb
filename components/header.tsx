'use client';

import Link from "next/link";
import { Logo } from "./logo";
import { cn } from '@/lib/utils';
import { MobileMenu } from "./mobile-menu";
import { useVideo } from "@/context/video-context";
import { useTheme } from "@/context/theme-context";
import { useAuth } from "@/context/auth-context"; 
import { AccessGate } from "@/components/security/access-gate";
import { openAccessGate } from '@/lib/access-gate'; 
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";


const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();
  
  const iconBaseClasses = "w-6 h-6 transition-colors ease-out duration-150 cursor-pointer";
  
  const iconClasses = theme === 'dark' 
    ? `${iconBaseClasses} text-white hover:text-primary`
    : `${iconBaseClasses} text-foreground hover:text-primary`;

  return (
    <button 
      onClick={toggleTheme} 
      aria-label={`Toggle to ${theme === 'light' ? 'dark' : 'light'} theme`}
      className="p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
    >
      {theme === 'light' ? (
        <svg xmlns="http://www.w3.org/2000/svg" className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      )}
    </button>
  );
};

export function NavLink({
  href,
  children,
  active,
  isExternal = false,
  onClick,
  showVideo,
}: {
  href: string;
  children?: React.ReactNode;
  active: boolean;
  isExternal?: boolean;
  onClick?: () => void;
  showVideo?: boolean;
}) {
  const baseClasses =
    "inline-flex items-center text-[0.75rem] tracking-[0.28em] uppercase font-medium transition-colors duration-200";

  const paletteClasses = showVideo
    ? "text-[#FFEEB2]/80 hover:text-[#FFEEB2]"
    : "text-foreground/70 hover:text-foreground";

  const activeClasses = active ? "text-foreground" : "";

  const className = cn("font-sentient", baseClasses, paletteClasses, activeClasses);

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}

export function GatedNavLink({
  href,
  children,
  active,
  enabled,
  showVideo,
}: {
  href: string;
  children: React.ReactNode;
  active: boolean;
  enabled: boolean;
  showVideo?: boolean;
}) {
  if (enabled) {
    return (
      <NavLink href={href} active={active} showVideo={showVideo}>
        {children}
      </NavLink>
    );
  }

  const baseClasses =
    "font-sentient inline-flex items-center text-[0.75rem] tracking-[0.28em] uppercase font-medium transition-colors duration-200";
  const paletteClasses = showVideo
    ? "text-[#FFEEB2]/40 hover:text-[#FFEEB2]/50"
    : "text-foreground/40 hover:text-foreground/50";

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            onClick={openAccessGate}
            className="cursor-not-allowed"
          >
            <span className={cn(baseClasses, paletteClasses, active && "text-foreground/70")}>
              {children}
            </span>
          </button>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="max-w-xs">
          <p className="text-xs">
            Guest access required — click to receive a one-time passcode.
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export const Header = () => {
  const { showVideo } = useVideo();
  const { isAuthenticated } = useAuth();

  const signInClasses = showVideo
    ? "uppercase max-lg:hidden transition-colors ease-out duration-150 font-mono text-primary hover:text-primary/80"
    : "uppercase max-lg:hidden transition-colors ease-out duration-150 font-mono text-primary hover:text-primary/80";

  return (
    <div className="fixed z-50 pt-8 md:pt-14 top-0 left-0 w-full">
      <header className="flex items-center justify-between container">
        <Link href="/">
          <Logo className={showVideo ? "gold-text" : "text-white"} />
        </Link>

        {/* Desktop Navigation */}
        <nav className="flex max-lg:hidden absolute left-1/2 -translate-x-1/2 items-center justify-center gap-x-10">
          <NavLink href="/about" active={false} showVideo={showVideo}>About</NavLink>
          <NavLink href="/gallery" active={false} showVideo={showVideo}>Villas</NavLink>
          <NavLink href="/experiences" active={false} showVideo={showVideo}>Experiences</NavLink>
          <NavLink href="/journey" active={false} showVideo={showVideo}>The Journey</NavLink>
          <GatedNavLink href="/reservations" active={false} enabled={isAuthenticated} showVideo={showVideo}>Your Reservations</GatedNavLink>
        </nav>
        
        <div className="flex items-center gap-x-6">
          <AccessGate />
          <ThemeToggleButton />
          <MobileMenu />
        </div>
      </header>
    </div>
  );
};