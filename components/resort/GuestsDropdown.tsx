"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";

import { useRoomContext } from "@/context/room-context";
import { adultsList, DropdownItem } from "@/constants/data";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

type AdultsOption = DropdownItem & {
  name: string;
};

const GuestsDropdown: React.FC = () => {
  const { adults, setAdults } = useRoomContext();

  // Default display: "Not Selected"
  const displayAdults =
    adults && adults !== "0" ? adults : "Not Selected";

  return (
    <div className="flex h-full w-full items-stretch font-mono text-xs sm:text-sm uppercase">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className={cn(
              "flex h-full w-full items-center justify-between",
              "px-4 sm:px-6 md:px-8",
              "text-foreground/80 hover:text-amber-200",
              "transition-colors duration-150",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/80 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            )}
          >
            <span className="tracking-[0.25em]">{displayAdults}</span>
            <ChevronDown className="h-4 w-4 text-primary transition-transform duration-200 group-data-[state=open]:rotate-180" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="start"
          className={cn(
            "w-[var(--radix-dropdown-menu-trigger-width)] min-w-[10rem]",
            "bg-background/95 border border-primary/20",
            "shadow-2xl backdrop-blur-sm",
          )}
        >
          {(adultsList as AdultsOption[]).map((item) => (
            <DropdownMenuItem
              key={item.name}
              onClick={() => setAdults(item.name)}
              className={cn(
                "flex h-9 w-full items-center justify-center",
                "text-xs sm:text-sm tracking-[0.18em]",
                "text-foreground/70 hover:text-primary",
                "hover:bg-primary/10",
                "cursor-pointer",
              )}
            >
              {item.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default GuestsDropdown;

