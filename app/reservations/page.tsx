"use client"
import { useEffect, useState } from 'react';
import Link from "next/link";
import { Reservation, ReservationCard } from "@/components/cards/ReservationCard";
import { Placeholder } from '@/components/placeholder';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/context/auth-context';
import { openAccessGate } from '@/lib/access-gate';
import { homePath } from "@/lib/paths"; 

const reservationData: Reservation[] = [
  
  {
    "unitId": "68acbc5dfb77d7ff89f4adc6",
    "unitName": "Falls Villa",
    "unitNumber": "2",
    "calendarId": "68a7795d4354ebaa8a52c34d",
    "startDate": "2026-03-16T00:00:00Z",
    "endDate": "2026-03-21T00:00:00Z",
    "rate": 1200,
    "currency": "USD",
    "cancelHours": 48,
    "cancelFee": 150,
    "guest": {
      "firstName": "Patrick",
      "lastName": "Howard",
      "email": "pat@gmail.com",
      "phone": "504-200-2200"
    },
    "status": "confirmed",
    "createdAt": "2025-10-06T21:08:30.250Z",
    "updatedAt": "2025-10-06T21:08:30.250Z"
  },
  {
    "unitId": "68acbc5dfb77d7ff89f4adc6",
    "unitName": "Falls Villa",
    "unitNumber": "2",
    "calendarId": "68a7795d4354ebaa8a52c34d",
    "startDate": "2026-04-01T00:00:00Z",
    "endDate": "2026-04-05T00:00:00Z",
    "rate": 1200,
    "currency": "USD",
    "cancelHours": 48,
    "cancelFee": 150,
    "guest": {
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com",
      "phone": "123-456-7890"
    },
    "status": "confirmed",
    "createdAt": "2025-11-01T10:00:00Z",
    "updatedAt": "2025-11-01T10:00:00Z"
  },
  {
    "unitId": "68acbc5dfb77d7ff89f4adc6",
    "unitName": "Falls Villa",
    "unitNumber": "2",
    "calendarId": "68a7795d4354ebaa8a52c34d",
    "startDate": "2026-05-10T00:00:00Z",
    "endDate": "2026-05-15T00:00:00Z",
    "rate": 1300,
    "currency": "USD",
    "cancelHours": 48,
    "cancelFee": 150,
    "guest": {
      "firstName": "Jane",
      "lastName": "Smith",
      "email": "jane.smith@example.com",
      "phone": "987-654-3210"
    },
    "status": "confirmed",
    "createdAt": "2025-11-15T14:30:00Z",
    "updatedAt": "2025-11-15T14:30:00Z"
  },
  {
    "unitId": "68acbc5dfb77d7ff89f4adc6",
    "unitName": "Falls Villa",
    "unitNumber": "2",
    "calendarId": "68a7795d4354ebaa8a52c34d",
    "startDate": "2026-06-20T00:00:00Z",
    "endDate": "2026-06-25T00:00:00Z",
    "rate": 1200,
    "currency": "USD",
    "cancelHours": 48,
    "cancelFee": 150,
    "guest": {
      "firstName": "Alice",
      "lastName": "Johnson",
      "email": "alice.johnson@example.com",
      "phone": "555-123-4567"
    },
    "status": "confirmed",
    "createdAt": "2025-12-01T09:45:00Z",
    "updatedAt": "2025-12-01T09:45:00Z"
  },
  {
    "unitId": "68acbc5dfb77d7ff89f4adc6",
    "unitName": "Falls Villa",
    "unitNumber": "2",
    "calendarId": "68a7795d4354ebaa8a52c34d",
    "startDate": "2026-07-05T00:00:00Z",
    "endDate": "2026-07-10T00:00:00Z",
    "rate": 1400,
    "currency": "USD",
    "cancelHours": 48,
    "cancelFee": 150,
    "guest": {
      "firstName": "Bob",
      "lastName": "Brown",
      "email": "bob.brown@example.com",
      "phone": "444-789-0123"
    },
    "status": "confirmed",
    "createdAt": "2025-12-05T16:20:00Z",
    "updatedAt": "2025-12-05T16:20:00Z"
  },
  {
    "unitId": "68acbc5dfb77d7ff89f4adc6",
    "unitName": "Falls Villa",
    "unitNumber": "2",
    "calendarId": "68a7795d4354ebaa8a52c34d",
    "startDate": "2026-08-15T00:00:00Z",
    "endDate": "2026-08-20T00:00:00Z",
    "rate": 1200,
    "currency": "USD",
    "cancelHours": 48,
    "cancelFee": 150,
    "guest": {
      "firstName": "Charlie",
      "lastName": "Davis",
      "email": "charlie.davis@example.com",
      "phone": "333-456-7890"
    },
    "status": "confirmed",
    "createdAt": "2025-12-09T11:00:00Z",
    "updatedAt": "2025-12-09T11:00:00Z"
  }
]
export default function Reservations() {
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    if (!isAuthenticated) return;
    (async () => {
      setLoading(true);
      try {
        // mock fetch
        setReservations(reservationData);
      } finally {
        setLoading(false);
      }
    })();
  }, [isAuthenticated]);

  // Not authenticated: keep a simple gated placeholder for now
  if (!isAuthenticated) {
    return (
      <div className="mx-auto max-w-xl rounded-lg border border-white/10 bg-zinc-900/40 backdrop-blur p-6 text-center mt-28">
        <h2 className="text-lg font-semibold text-white">Access required</h2>
        <p className="mt-2 text-sm text-white/70">
          Get a one-time passcode to view your Reservations.
        </p>
        <div className="mt-4 flex justify-center">
          <button
            onClick={openAccessGate}
            className="rounded-md bg-white/90 px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-white"
          >
            Get Access
          </button>
        </div>
     </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container py-24">
        <div className="mb-8 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
              Your Reservations
            </h1>
            <p className="mt-1 text-sm text-muted-foreground max-w-xl">
              Review upcoming stays, guest details, and key booking information for your Cypress Resort reservations.
            </p>
          </div>
        </div>

        {loading ? (
          <p className="text-sm text-muted-foreground">Loading reservations…</p>
        ) : reservations.length === 0 ? (
          <div className="max-w-md mx-auto">
            <Placeholder
              label="No reservations found"
              button={
                <Button asChild variant="outline">
                  <Link href={homePath()}>Return Home</Link>
                </Button>
              }
            />
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {reservations.map((reservation) => (
              <ReservationCard
                key={`${reservation.unitId}-${reservation.startDate}-${reservation.guest.email}`}
                reservation={reservation}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}