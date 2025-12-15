"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { SiFacebook, SiInstagram, SiYoutube, SiX } from '@icons-pack/react-simple-icons'

type Props = {
  facebookUrl?: string;
  instagramUrl?: string;
  youtubeUrl?: string;
  xUrl?: string;
  className?: string;
};

function IconLink({
  href,
  label,
  children,
}: {
  href?: string;
  label: string;
  children: React.ReactNode;
}) {
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={label}
      title={label}
      className={cn(
        "inline-flex h-7 w-7 items-center justify-center rounded-full",
        "bg-white/8 hover:bg-white/12",
        "border border-white/10",
        "text-white/85 hover:text-white",
        "transition"
      )}
    >
      {children}
    </a>
  );
}

export default function SocialLinks({
  facebookUrl,
  instagramUrl,
  youtubeUrl,
  xUrl,
  className,
}: Props) {
  // Render nothing if no links configured
  if (!facebookUrl && !instagramUrl && !youtubeUrl && !xUrl) return null;

  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <IconLink href={instagramUrl} label="Instagram">
        <SiInstagram size={16} />
      </IconLink>
      <IconLink href={facebookUrl} label="Facebook">
        <SiFacebook size={16} />
      </IconLink>
      <IconLink href={youtubeUrl} label="YouTube">
        <SiYoutube size={16} />
      </IconLink>
      <IconLink href={xUrl} label="X">
        <SiX size={16} />
      </IconLink>
    </div>
  );
}
