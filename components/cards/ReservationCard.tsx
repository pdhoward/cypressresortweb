"use client";

import { motion } from "motion/react";
import { Mail, Phone, CalendarDays, BedDouble } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type Guest = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

export type Reservation = {
  unitId: string;
  unitName: string;
  unitNumber: string;
  calendarId: string;
  startDate: string;
  endDate: string;
  rate: number;
  currency: string;
  cancelHours: number;
  cancelFee: number;
  guest: Guest;
  status: string;
  createdAt: string;
  updatedAt: string;
};

interface ReservationCardProps {
  reservation: Reservation;
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

const formatShortDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

const getNights = (start: string, end: string) => {
  const s = new Date(start).getTime();
  const e = new Date(end).getTime();
  const diff = Math.max(0, e - s);
  return Math.round(diff / (1000 * 60 * 60 * 24));
};

const statusTone = (status: string) => {
  const s = status.toLowerCase();
  if (s === "confirmed")
    return "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-200 border-emerald-200/60";
  if (s === "cancelled" || s === "canceled")
    return "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-200 border-red-200/60";
  if (s === "pending")
    return "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-200 border-amber-200/60";
  return "bg-zinc-50 text-zinc-700 dark:bg-zinc-900/40 dark:text-zinc-200 border-zinc-200/60";
};

export function ReservationCard({ reservation }: ReservationCardProps) {
  const nights = getNights(reservation.startDate, reservation.endDate);
  const total = nights * reservation.rate;

  const guestName = `${reservation.guest.firstName} ${reservation.guest.lastName}`;

  return (
    <TooltipProvider>
      <motion.article
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ y: -2 }}
        transition={{ duration: 0.25 }}
        className={cn(
          "h-full rounded-lg border bg-white/80 dark:bg-zinc-900/70",
          "border-zinc-200 dark:border-white/10",
          "shadow-sm hover:shadow-md hover:ring-1 hover:ring-black/5 dark:hover:ring-white/10",
          "overflow-hidden"
        )}
      >
        <div className="p-4 flex flex-col gap-3">
          {/* Top row: villa + status */}
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-0.5">
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                {reservation.unitName}
              </h3>
              <p className="text-[11px] uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
                Villa {reservation.unitNumber}
              </p>
            </div>

            <Badge
              variant="outline"
              className={cn(
                "text-[11px] px-2 py-1 border",
                statusTone(reservation.status)
              )}
            >
              {reservation.status.charAt(0).toUpperCase() +
                reservation.status.slice(1)}
            </Badge>
          </div>

          {/* Dates + nights */}
          <div className="mt-1 flex items-center justify-between text-xs text-zinc-600 dark:text-zinc-300">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-zinc-500" />
              <span>
                {formatShortDate(reservation.startDate)} –{" "}
                {formatShortDate(reservation.endDate)}
              </span>
            </div>
            <div className="flex items-center gap-1 text-[11px]">
              <BedDouble className="h-3.5 w-3.5 text-zinc-500" />
              <span>{nights} night{nights === 1 ? "" : "s"}</span>
            </div>
          </div>

          {/* Rate / totals / policy */}
          <div className="mt-2 grid grid-cols-2 gap-2 text-[11px] text-zinc-600 dark:text-zinc-300">
            <div>
              <p className="uppercase tracking-[0.12em] text-zinc-500 dark:text-zinc-400 mb-0.5">
                Nightly rate
              </p>
              <p className="font-medium text-zinc-900 dark:text-zinc-50">
                {reservation.currency} {reservation.rate.toLocaleString()}
              </p>
            </div>
            <div className="text-right">
              <p className="uppercase tracking-[0.12em] text-zinc-500 dark:text-zinc-400 mb-0.5">
                Est. total
              </p>
              <p className="font-medium text-zinc-900 dark:text-zinc-50">
                {reservation.currency} {total.toLocaleString()}
              </p>
            </div>
            <div className="col-span-2 text-[11px] text-zinc-500 dark:text-zinc-400">
              Free cancellation until{" "}
              <span className="font-medium">
                {reservation.cancelHours}h
              </span>{" "}
              before arrival; fee {reservation.currency}{" "}
              {reservation.cancelFee.toLocaleString()} thereafter.
            </div>
          </div>

          {/* Guest info */}
          <div className="mt-3 border-t border-zinc-200/80 dark:border-white/10 pt-3 flex items-start justify-between gap-3">
            <div className="space-y-1">
              <p className="text-xs font-medium text-zinc-900 dark:text-zinc-50">
                {guestName}
              </p>
              <div className="flex flex-col gap-1 text-[11px] text-zinc-600 dark:text-zinc-300">
                <div className="flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5 text-zinc-500" />
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a
                        href={`mailto:${reservation.guest.email}`}
                        className="truncate max-w-[160px] hover:underline"
                      >
                        {reservation.guest.email}
                      </a>
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      <p className="text-xs">{reservation.guest.email}</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <div className="flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5 text-zinc-500" />
                  <span>{reservation.guest.phone}</span>
                </div>
              </div>
            </div>

            <div className="text-right text-[11px] text-zinc-500 dark:text-zinc-400">
              <p className="uppercase tracking-[0.12em] mb-0.5">
                Booked on
              </p>
              <p>{formatDate(reservation.createdAt)}</p>
            </div>
          </div>
        </div>
      </motion.article>
    </TooltipProvider>
  );
}
