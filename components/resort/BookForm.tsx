'use client';

import React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Users } from "lucide-react";
import { DateRange } from "react-day-picker";
import { useRouter } from 'next/navigation';

import GuestsDropdown from "@/components/resort/GuestsDropdown";
import { useRoomContext } from "@/context/room-context";
import { useAuth } from "@/context/auth-context";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

// StayDatesPicker (kept as is)
interface StayDatesPickerProps {
  range: DateRange | undefined;
  onRangeChange: (range: DateRange | undefined) => void;
}

const StayDatesPicker: React.FC<StayDatesPickerProps> = ({
  range,
  onRangeChange,
}) => {
  const [open, setOpen] = React.useState(false);

  const handleSelect = (next: DateRange | undefined) => {
    onRangeChange(next);

    if (next?.from && next.to) {
      setOpen(false);
    }
  };

  const checkIn = range?.from;
  const checkOut = range?.to;

  let label = "Select dates";
  if (checkIn && checkOut) {
    label = `${format(checkIn, "dd MMM")} – ${format(checkOut, "dd MMM")}`;
  } else if (checkIn) {
    label = `${format(checkIn, "dd MMM")} · Select checkout`;
  }

  const helperText =
    checkIn && checkOut
      ? `Selected: ${format(checkIn, "MM/dd")} → ${format(
          checkOut,
          "MM/dd",
        )}`
      : checkIn
        ? `Choose a checkout date after ${format(checkIn, "MM/dd")}`
        : "Choose your check-in date to begin.";

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            "flex h-11 w-full items-center justify-between rounded-xl",
            "border border-amber-500/30 bg-gray-900/60 px-4 sm:px-5",
            "shadow-inner text-left transition-colors duration-150",
            checkIn ? "text-white" : "text-gray-400",
            "hover:border-amber-400 hover:text-amber-200",
          )}
        >
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4 text-amber-400" />
            <span className="font-mono text-[0.7rem] sm:text-xs tracking-[0.22em] uppercase">
              {label}
            </span>
          </div>
          <span className="hidden font-mono text-[0.6rem] tracking-[0.2em] uppercase text-amber-300/80 sm:inline-block">
            Dates
          </span>
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        sideOffset={8}
        className={cn(
          "w-auto rounded-xl border border-amber-500/40 bg-gray-900/95",
          "p-3 shadow-2xl backdrop-blur-xl",
        )}
      >
        <div className="mb-2 space-y-1">
          <h4 className="font-sans text-xs font-semibold uppercase tracking-[0.24em] text-amber-300">
            Book Your Stay
          </h4>
          <p className="font-mono text-[0.63rem] uppercase tracking-[0.18em] text-amber-200/80">
            {helperText}
          </p>
        </div>

        <Calendar
          mode="range"
          selected={range}
          onSelect={handleSelect}
          defaultMonth={range?.from}
          hidden={{ before: new Date() }}
          autoFocus
          numberOfMonths={1}
          className="p-0 text-xs"
        />
      </PopoverContent>
    </Popover>
  );
};

// BookForm with navigation on submit
const BookForm: React.FC = () => {
  const router = useRouter();
  const { user } = useAuth();

  const [dateRange, setDateRange] = React.useState<DateRange | undefined>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dateRange?.from || !dateRange?.to) return;

    const from = format(dateRange.from, 'yyyy-MM-dd');
    const to = format(dateRange.to, 'yyyy-MM-dd');
    const adults =  1; // Default to 1 if not set

    router.push(`/reserve?from=${from}&to=${to}&adults=${adults}`);
  };

  return (
    <form
      className="w-full max-w-[900px] mx-auto transition-all duration-500 ease-in-out"
      onSubmit={handleSubmit}
    >
      <div
        className={cn(
          "flex w-full flex-col lg:flex-row",
          "rounded-2xl border border-amber-500/30 bg-gray-900/75",
          "shadow-2xl backdrop-blur-xl overflow-hidden",
        )}
      >
        <div className="flex-1 lg:flex-[1.6] border-b lg:border-b-0 lg:border-r border-amber-500/20">
          <div className="flex h-full flex-col justify-center px-4 py-3 lg:px-5">
            <span className="mb-2 font-mono text-[0.65rem] tracking-[0.25em] uppercase text-amber-200/70">
              Dates
            </span>
            <StayDatesPicker range={dateRange} onRangeChange={setDateRange} />
          </div>
        </div>

        <div className="flex-1 lg:flex-[1.1] border-b lg:border-b-0 lg:border-r border-amber-500/20">
          <div className="flex h-full flex-col justify-center px-4 py-3 lg:px-5">
            <span className="mb-2 flex items-center gap-1 font-mono text-[0.65rem] tracking-[0.25em] uppercase text-amber-200/70">
              <Users className="h-3 w-3 text-amber-300" />
              Guests
            </span>
            <div className="h-11">
              <GuestsDropdown />
            </div>
          </div>
        </div>

        <div className="flex-1 lg:flex-[0.9]">
          <Button
            type="submit"
            className={cn(
              "flex h-full w-full items-center justify-center px-4 py-4 lg:px-3 lg:py-0",
              "font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.28em]",
              "rounded-none bg-amber-500 text-gray-900",
              "hover:bg-amber-400 transition-colors duration-200",
              "border-t lg:border-t-0 lg:border-l border-amber-500/30",
            )}
          >
            Check Now
          </Button>
        </div>
      </div>
    </form>
  );
};

export default BookForm;