"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

interface CheckOutProps {
  value?: Date | null;
  minDate?: Date; // e.g. pass check-in date here
  onChange?: (date: Date | undefined) => void;
}

const CheckOut: React.FC<CheckOutProps> = ({ value, minDate, onChange }) => {
  const [date, setDate] = React.useState<Date | undefined>(value ?? undefined);

  const effectiveMin = React.useMemo(
    () => minDate ?? new Date(),
    [minDate]
  );

  const handleSelect = (nextDate?: Date) => {
    setDate(nextDate);
    onChange?.(nextDate);
  };

  return (
    <div className="flex h-full flex-col justify-center px-4 py-3 lg:px-6 lg:py-0">
      {/* Label */}
      <span className="mb-2 font-mono text-[0.65rem] tracking-[0.25em] uppercase text-foreground/60">
        Check-out
      </span>

      {/* Date Picker */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            className={cn(
              "flex w-full items-center justify-between rounded-none border-0 bg-transparent px-0 py-1",
              "font-mono text-xs sm:text-sm uppercase tracking-[0.2em]",
              !date && "text-foreground/50",
              "hover:bg-transparent hover:text-amber-200"
            )}
          >
            <span>
              {date ? format(date, "EEE, MMM d") : "Select date"}
            </span>
            <CalendarIcon className="h-4 w-4 text-primary" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="mt-2 w-auto rounded-xl border border-primary/20 bg-background/95 p-0 shadow-2xl backdrop-blur-md"
        >
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleSelect}
            // 👇 enforce check-out not before `minDate`
            hidden={{ before: effectiveMin }}
            autoFocus
            className="luxury-calendar"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default CheckOut;
