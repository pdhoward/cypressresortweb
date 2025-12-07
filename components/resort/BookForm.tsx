"use client";

import React from "react";
import { format, addDays } from "date-fns";
import { Calendar as CalendarIcon, Users } from "lucide-react";
import { DateRange } from "react-day-picker";
import { useRouter } from "next/navigation";

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

/* ---------- StayDatesPicker (your refactored version) ---------- */

interface StayDatesPickerProps {
  range: DateRange | undefined;
  onRangeChange: (range: DateRange | undefined) => void;
}

const StayDatesPicker: React.FC<StayDatesPickerProps> = ({
  range,
  onRangeChange,
}) => {
  const [open, setOpen] = React.useState(false);
  const [selectionMode, setSelectionMode] =
    React.useState<"checkin" | "checkout">("checkin");

  const handleSelect = (next: DateRange | undefined) => {
    if (!next?.from) {
      onRangeChange(undefined);
      setSelectionMode("checkin");
      return;
    }

    // First click → set minimum 1-night stay
    if (next.from && !next.to) {
      const nextDay = addDays(next.from, 1);
      const rangeWithMin: DateRange = { from: next.from, to: nextDay };
      onRangeChange(rangeWithMin);
      setSelectionMode("checkout");
      return;
    }

    if (next.from && next.to) {
      onRangeChange(next);
      setSelectionMode("checkin");
      setOpen(false);
    }
  };

  const handleClear = () => {
    onRangeChange(undefined);
    setSelectionMode("checkin");
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
      ? `Selected: ${format(checkIn, "MM/dd")} → ${format(checkOut, "MM/dd")}`
      : checkIn
      ? `Choose a checkout date after ${format(checkIn, "MM/dd")}`
      : "Choose your check-in date to begin.";

  const selectionText =
    selectionMode === "checkin"
      ? "Selecting: Check-in date"
      : "Selecting: Checkout date";

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
        <div className="mb-2 flex items-start justify-between gap-2">
          <div className="space-y-1">
            <h4 className="font-sans text-xs font-semibold uppercase tracking-[0.24em] text-amber-300">
              Book Your Stay
            </h4>
            <p className="font-mono text-[0.63rem] uppercase tracking-[0.18em] text-amber-200/80">
              {helperText}
            </p>
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-amber-300/80">
              {selectionText}
            </p>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="h-7 px-2 py-1 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-amber-200/80 hover:text-amber-100"
          >
            Clear
          </Button>
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
          classNames={{
            head_cell:
              "text-[0.65rem] font-mono text-amber-200/70 w-9 text-center",
            day: "h-9 w-9 p-0 font-normal text-xs text-center aria-selected:opacity-100",
          }}
        />
      </PopoverContent>
    </Popover>
  );
};

/* -------------------------- BookForm using context -------------------------- */

const BookForm: React.FC = () => {
  const router = useRouter();
  const { adults } = useRoomContext();
  const { user } = useAuth();
  console.log(`[BOOKFORM AUTH CONTEXT] - ${user}`);

  const [dateRange, setDateRange] = React.useState<DateRange | undefined>();

  // Parse adults string from context into a number; treat "Not Selected" as 0
  const adultsCount = React.useMemo(() => {
    if (!adults || adults === "Not Selected" || adults === "0") return 0;
    const parsed = parseInt(adults, 10);
    return Number.isNaN(parsed) ? 0 : parsed;
  }, [adults]);

  const hasValidDates = Boolean(dateRange?.from && dateRange?.to);
  const hasGuests = adultsCount > 0;

  const isFormValid = hasValidDates && hasGuests;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || !dateRange?.from || !dateRange?.to) return;

    const from = format(dateRange.from, "yyyy-MM-dd");
    const to = format(dateRange.to, "yyyy-MM-dd");

    router.push(`/reserve?from=${from}&to=${to}&adults=${adultsCount}`);
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
        {/* Dates */}
        <div className="flex-1 lg:flex-[1.6] border-b lg:border-b-0 lg:border-r border-amber-500/20">
          <div className="flex h-full flex-col justify-center px-4 py-3 lg:px-5">
            <span className="mb-2 font-mono text-[0.65rem] tracking-[0.25em] uppercase text-amber-200/70">
              Dates
            </span>
            <StayDatesPicker range={dateRange} onRangeChange={setDateRange} />
          </div>
        </div>

        {/* Guests */}
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

        {/* Submit */}
        <div className="flex-1 lg:flex-[0.9]">
          <Button
            type="submit"
            disabled={!isFormValid}
            className={cn(
              "flex h-full w-full items-center justify-center px-4 py-4 lg:px-3 lg:py-0",
              "font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.28em]",
              "rounded-none border-t lg:border-t-0 lg:border-l border-amber-500/30",
              isFormValid
                ? "bg-amber-500 text-gray-900 hover:bg-amber-400 transition-colors duration-200"
                : "bg-amber-500/30 text-gray-500 cursor-not-allowed",
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
