import Link from "next/link";
import { Placeholder } from "@/components/placeholder";
import { Button } from "@/components/ui/button";
import { homePath } from "@/lib/paths";

interface ReservePageProps {
  searchParams: Promise<{
    from?: string;
    to?: string;
    adults?: string;
  }>;
}

export default async function ReserveComingSoon({ searchParams }: ReservePageProps) {
  const { from, to, adults } = await searchParams;

  return (
    <div className="dark min-h-screen bg-background flex flex-col items-center justify-center px-4 py-8">
      <div className="mb-8">
        <Placeholder
          label="Coming Soon"
          button={
            <Button asChild variant="outline">
              <Link
                className="text-white hover:bg-blue-500"
                href={homePath()}
              >
                Return Home
              </Link>
            </Button>
          }
        />
      </div>

      <div className="w-full max-w-md rounded-2xl border border-amber-500/30 bg-gray-900/80 p-5 shadow-2xl backdrop-blur-xl">
        <h2 className="mb-3 font-sans text-sm font-semibold uppercase tracking-[0.24em] text-amber-300">
          Reservation Details
        </h2>
        <p className="mb-4 text-xs text-amber-200/80">
          This page is still under construction, but here&apos;s what you
          selected:
        </p>
        <dl className="space-y-2 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-amber-200/80">
              Check-in
            </dt>
            <dd className="font-mono text-xs text-amber-50">
              {from ?? "—"}
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-amber-200/80">
              Check-out
            </dt>
            <dd className="font-mono text-xs text-amber-50">
              {to ?? "—"}
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-amber-200/80">
              Guests
            </dt>
            <dd className="font-mono text-xs text-amber-50">
              {adults ?? "—"}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
