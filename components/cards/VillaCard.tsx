'use client';

import { Bed, Eye, ImageIcon, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';
import { useMemo, useState } from 'react';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

// If your type is still Unit, keep it. Otherwise rename accordingly.
import { Unit } from '@/types/unit';

interface VillaCardProps {
  unit: Unit;
}

function isVideoUrl(url?: string) {
  if (!url) return false;
  return /\.(mp4|webm|ogg)(\?|#|$)/i.test(url);
}

export function VillaCard({ unit }: VillaCardProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  // --- Data mapping from your real document shape ---
  const images = (unit as any).images as
    | Array<{ url: string; alt?: string; caption?: string; role?: string; order?: number }>
    | undefined;

  const amenitiesObj = (unit as any).amenities as
    | { raw?: string[]; [group: string]: unknown }
    | undefined;

  const policies = (unit as any).policies as
    | {
        checkInTime?: string;
        checkOutTime?: string;
        smoking?: string;
        pets?: { allowed?: boolean; notes?: string };
        minStayNights?: number | null;
        securityDeposit?: { required?: boolean; amount?: number | null; currency?: string };
      }
    | undefined;

  const feesAndTaxes = (unit as any).feesAndTaxes as
    | {
        cleaningFee?: { amount?: number | null; currency?: string; per?: string };
        resortFee?: { amount?: number | null; currency?: string; per?: string };
      }
    | undefined;

  const location = (unit as any).location as
    | { city?: string; state?: string; unitPositionNotes?: string; floorLevel?: number | null }
    | undefined;

  const occupancy = (unit as any).occupancy as
    | { sleeps?: number; maxAdults?: number; maxChildren?: number }
    | undefined;

  const currency = (unit as any).currency ?? 'USD';
  const rate = (unit as any).rate ?? 0;

  const primaryMedia = useMemo(() => {
    const first = images?.[0];
    if (first?.url) {
      return {
        url: first.url,
        altText: first.alt || first.caption || unit.name || 'Unit Image',
      };
    }
    return { url: '/placeholder.jpg', altText: 'Unit Image' };
  }, [images, unit.name]);

  const bedSummary = useMemo(() => {
    const beds = (unit as any)?.config?.beds as Array<{ size: string; count: number }> | undefined;
    if (!beds?.length) return 'N/A';
    return beds.map((b) => `${b.count} ${b.size}`).join(', ');
  }, [unit]);

  // Use amenities.raw as your canonical list (you said it’s always there)
  const amenityBadges = useMemo(() => {
    const raw = amenitiesObj?.raw ?? [];
    return raw.map((a) => (
      <Badge key={a} variant="outline" className="mr-1 mb-1 text-[10px] leading-4">
        {a.replace(/_/g, ' ').toUpperCase()}
      </Badge>
    ));
  }, [amenitiesObj]);

  const galleryItems = useMemo(() => {
    const list = images ?? [];
    return list
      .slice()
      .sort((a, b) => (a.order ?? 999) - (b.order ?? 999))
      .map((media, idx) => {
        if (isVideoUrl(media.url)) {
          return (
            <video
              key={`${media.url}-${idx}`}
              controls
              className="w-full h-auto rounded-lg mb-4 shadow-lg"
            >
              <source src={media.url} />
              Sorry, your browser doesn’t support embedded videos.
            </video>
          );
        }

        return (
          <img
            key={`${media.url}-${idx}`}
            src={media.url}
            alt={media.alt || media.caption || unit.name || 'Unit Media'}
            className="w-full h-auto rounded-lg mb-4 shadow-lg"
            loading="lazy"
          />
        );
      });
  }, [images, unit.name]);

  // Small helper values for Details modal
  const view = (unit as any)?.config?.view ?? undefined;
  const squareFeet = (unit as any)?.config?.squareFeet ?? undefined;
  const bedrooms = (unit as any)?.config?.bedrooms ?? undefined;
  const bathrooms = (unit as any)?.config?.bathrooms ?? undefined;

  const shower = (unit as any)?.config?.shower;
  const bathtub = (unit as any)?.config?.bathtub;
  const hotTub = (unit as any)?.config?.hotTub;
  const sauna = (unit as any)?.config?.sauna;
  const ada = (unit as any)?.config?.ada;

  const cleaningFeeAmount = feesAndTaxes?.cleaningFee?.amount ?? null;
  const securityDepositAmount = policies?.securityDeposit?.amount ?? null;

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ y: -2, scale: 1.02 }}
        transition={{ duration: 0.25 }}
        className={cn(
          'h-full rounded-xl border bg-gradient-to-br from-white to-gray-50 dark:from-zinc-900 to-zinc-800',
          'border-gold-200 dark:border-gold-700/30',
          'shadow-xl hover:shadow-2xl hover:ring-2 hover:ring-gold-300/50 dark:hover:ring-gold-500/30',
          'overflow-hidden transform-gpu'
        )}
      >
        {/* Media Header */}
        <div className="w-full h-48 overflow-hidden relative">
          {isVideoUrl(primaryMedia.url) ? (
            <video className="w-full h-full object-cover" muted playsInline autoPlay loop>
              <source src={primaryMedia.url} />
            </video>
          ) : (
            <img
              src={primaryMedia.url}
              alt={primaryMedia.altText || unit.name}
              className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
              loading="lazy"
            />
          )}

          <div className="absolute top-2 right-2">
            <Badge className="bg-gold-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow">
              {String((unit as any).type ?? 'unit').replace('_', ' ').toUpperCase()}
            </Badge>
          </div>
        </div>

        {/* Body */}
        <div className="p-5 flex flex-col gap-4">
          <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
            {unit.name} {(unit as any).unitNumber ? `(${(unit as any).unitNumber})` : ''}
          </h3>

          <TooltipProvider>
            <Tooltip delayDuration={150}>
              <TooltipTrigger asChild>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 cursor-help">
                  {(unit as any).description || 'Luxurious accommodation with premium amenities.'}
                </p>
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-md bg-white dark:bg-zinc-800 shadow-lg">
                <p className="text-sm">{(unit as any).description}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <div className="flex items-center justify-between text-sm">
            <span className="font-semibold text-gold-600 dark:text-gold-400">
              {currency} {Number(rate).toLocaleString()} / night
            </span>

            <div className="flex items-center text-zinc-600 dark:text-zinc-300">
              <Bed className="w-4 h-4 mr-1" />
              {bedSummary}
            </div>
          </div>

          {/* Optional quick location/occupancy line (safe + useful) */}
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-zinc-600 dark:text-zinc-400">
            {(location?.city || location?.state) && (
              <span>
                {location?.city}
                {location?.city && location?.state ? ', ' : ''}
                {location?.state}
              </span>
            )}
            {occupancy?.sleeps != null && <span>Sleeps {occupancy.sleeps}</span>}
          </div>

          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              className="flex-1 h-9 text-sm border-gold-300 text-gold-700 dark:border-gold-500 dark:text-gold-300 hover:bg-gold-100 dark:hover:bg-gold-900/30"
              onClick={() => setIsDetailsOpen(true)}
            >
              <Eye className="w-4 h-4 mr-2" />
              Details
            </Button>

            <Button
              size="sm"
              variant="outline"
              className="flex-1 h-9 text-sm border-gold-300 text-gold-700 dark:border-gold-500 dark:text-gold-300 hover:bg-gold-100 dark:hover:bg-gold-900/30"
              onClick={() => setIsGalleryOpen(true)}
            >
              <ImageIcon className="w-4 h-4 mr-2" />
              Gallery
            </Button>

            {(unit as any).active ? (
              <Button size="sm" className="flex-1 h-9 text-sm bg-gold-500 text-white hover:bg-gold-600">
                <ExternalLink className="w-4 h-4 mr-2" />
                Reserve
              </Button>
            ) : (
              <Badge
                variant="outline"
                className="flex-1 h-9 px-3 text-sm text-zinc-600 dark:text-zinc-300 border-gold-300"
              >
                Coming Soon
              </Badge>
            )}
          </div>
        </div>
      </motion.article>

      {/* Details Modal */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent
          className={cn(
            'sm:max-w-lg max-h-[80vh] bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100',
            // allow scroll, hide scrollbar
            'overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden'
          )}
        >
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">{unit.name} Details</DialogTitle>
            <DialogDescription className="text-sm text-zinc-600 dark:text-zinc-400">
              Explore the features of this unit.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 space-y-4 text-xs leading-5">
            <div>
              <h4 className="font-semibold text-sm mb-1">Configuration</h4>
              <ul className="list-disc pl-5">
                <li>Square Feet: {squareFeet ?? 'N/A'}</li>
                <li>View: {view ? String(view).toUpperCase() : 'N/A'}</li>
                <li>Bedrooms: {bedrooms ?? 'N/A'}</li>
                <li>Bathrooms: {bathrooms ?? 'N/A'}</li>
                <li>Max Occupancy: {occupancy?.sleeps ?? (unit as any)?.config?.maxOccupancy ?? 'N/A'}</li>
                <li>Floor: {location?.floorLevel ?? 'N/A'}</li>
                <li>Shower: {shower ? 'Yes' : 'No'}</li>
                <li>Bathtub: {bathtub ? 'Yes' : 'No'}</li>
                <li>Hot Tub: {hotTub ? 'Yes' : 'No'}</li>
                <li>Sauna: {sauna ? 'Yes' : 'No'}</li>
                <li>ADA Accessible: {ada ? 'Yes' : 'No'}</li>
                <li>Position Notes: {location?.unitPositionNotes ?? 'N/A'}</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-sm mb-1">Amenities</h4>
              <div className="flex flex-wrap">{amenityBadges?.length ? amenityBadges : <span>N/A</span>}</div>
            </div>

            <div>
              <h4 className="font-semibold text-sm mb-1">Policies & Fees</h4>
              <ul className="list-disc pl-5">
                <li>Check-In: {policies?.checkInTime ?? 'N/A'}</li>
                <li>Check-Out: {policies?.checkOutTime ?? 'N/A'}</li>
                <li>Smoking: {policies?.smoking ? String(policies.smoking).toUpperCase() : 'N/A'}</li>
                <li>
                  Pets:{' '}
                  {policies?.pets?.allowed == null
                    ? 'N/A'
                    : policies.pets.allowed
                      ? `Allowed${policies.pets.notes ? ` — ${policies.pets.notes}` : ''}`
                      : 'Not allowed'}
                </li>
                <li>Min Stay: {policies?.minStayNights ?? 'N/A'} nights</li>

                <li>
                  Cleaning Fee:{' '}
                  {cleaningFeeAmount == null ? 'N/A' : `${currency} ${cleaningFeeAmount}`}
                </li>

                <li>
                  Security Deposit:{' '}
                  {securityDepositAmount == null ? 'N/A' : `${currency} ${securityDepositAmount}`}
                </li>
              </ul>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Gallery Modal */}
      <Dialog open={isGalleryOpen} onOpenChange={setIsGalleryOpen}>
        <DialogContent className="sm:max-w-3xl max-h-[80vh] bg-white dark:bg-zinc-900">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">{unit.name} Gallery</DialogTitle>
            <DialogDescription className="text-sm text-zinc-600 dark:text-zinc-400">
              Media from the unit’s <code className="text-xs">images[]</code> array.
            </DialogDescription>
          </DialogHeader>

          <ScrollArea className="mt-4 max-h-[60vh] pr-4">
            <div className="space-y-6">
              {galleryItems?.length ? (
                galleryItems
              ) : (
                <p className="text-center text-zinc-500">No media available.</p>
              )}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
}
