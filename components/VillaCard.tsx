'use client';

import { Bed, Eye, ImageIcon, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';
import { Unit } from '@/types/unit';
import { useState } from 'react';
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

interface VillaCardProps {
  unit: Unit;
}

export function VillaCard({ unit }: VillaCardProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const mainImage = unit.media?.find((m) => m.isPrimary && m.type === 'image') ||
                    unit.media?.find((m) => m.type === 'image') ||
                    { url: '/placeholder.jpg', altText: 'Unit Image' };

  const bedSummary = unit.config.beds?.map((b) => `${b.count} ${b.size}`).join(', ') || 'N/A';

  const amenityBadges = unit.config.amenities?.map((a) => (
    <Badge key={a} variant="outline" className="mr-1 mb-1 text-xs">
      {a.replace(/_/g, ' ').toUpperCase()}
    </Badge>
  ));

  const mediaItems = unit.media?.map((media, idx) => {
    if (media.type === 'image') {
      return (
        <img
          key={idx}
          src={media.url}
          alt={media.altText || 'Unit Media'}
          className="w-full h-auto rounded-lg mb-4 shadow-lg"
          loading="lazy"
        />
      );
    } else if (media.type === 'video') {
      return (
        <video
          key={idx}
          src={media.url}
          controls
          className="w-full h-auto rounded-lg mb-4 shadow-lg"
        >
          <source src={media.url} type={media.mimeType || 'video/mp4'} />
        </video>
      );
    } else if (media.type === 'audio') {
      return (
        <audio
          key={idx}
          src={media.url}
          controls
          className="w-full mb-4"
        />
      );
    } else if (media.type === '360_tour') {
      return (
        <iframe
          key={idx}
          src={media.url}
          title={media.caption || '360 Tour'}
          className="w-full h-64 rounded-lg mb-4 shadow-lg"
          allowFullScreen
        />
      );
    }
    return null;
  });

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
          <img
            src={mainImage.url}
            alt={mainImage.altText || unit.name}
            className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
            loading="lazy"
          />
          <div className="absolute top-2 right-2">
            <Badge className="bg-gold-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow">
              {unit.type.replace('_', ' ').toUpperCase()}
            </Badge>
          </div>
        </div>

        {/* Body */}
        <div className="p-5 flex flex-col gap-4">
          <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
            {unit.name} {unit.unitNumber ? `(${unit.unitNumber})` : ''}
          </h3>

          <TooltipProvider>
            <Tooltip delayDuration={150}>
              <TooltipTrigger asChild>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 cursor-help">
                  {unit.description || 'Luxurious accommodation with premium amenities.'}
                </p>
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-md bg-white dark:bg-zinc-800 shadow-lg">
                <p className="text-sm">{unit.description}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <div className="flex items-center justify-between text-sm">
            <span className="font-semibold text-gold-600 dark:text-gold-400">
              {unit.currency} {unit.rate.toLocaleString()} / night
            </span>
            <div className="flex items-center text-zinc-600 dark:text-zinc-300">
              <Bed className="w-4 h-4 mr-1" />
              {bedSummary}
            </div>
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
            {unit.active ? (
              <Button
                size="sm"
                className="flex-1 h-9 text-sm bg-gold-500 text-white hover:bg-gold-600"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Reserve
              </Button>
            ) : (
              <Badge variant="outline" className="flex-1 h-9 px-3 text-sm text-zinc-600 dark:text-zinc-300 border-gold-300">
                Coming Soon
              </Badge>
            )}
          </div>
        </div>
      </motion.article>

      {/* Details Modal */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="sm:max-w-lg max-h-[80vh] overflow-y-auto bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">{unit.name} Details</DialogTitle>
            <DialogDescription className="text-sm text-zinc-600 dark:text-zinc-400">
              Explore the luxurious features of this unit.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 space-y-4">
            <div>
              <h4 className="font-semibold">Configuration</h4>
              <ul className="list-disc pl-5 text-sm">
                <li>Square Feet: {unit.config.squareFeet ?? 'N/A'}</li>
                <li>View: {unit.config.view?.toUpperCase() ?? 'N/A'}</li>
                <li>Max Occupancy: {unit.config.maxOccupancy ?? 'N/A'}</li>
                <li>Floor: {unit.config.floorLevel ?? 'N/A'}</li>
                <li>Shower: {unit.config.shower ? 'Yes' : 'No'}</li>
                <li>Bathtub: {unit.config.bathtub ? 'Yes' : 'No'}</li>
                <li>Hot Tub: {unit.config.hotTub ? 'Yes' : 'No'}</li>
                <li>Sauna: {unit.config.sauna ? 'Yes' : 'No'}</li>
                <li>ADA Accessible: {unit.config.ada ? 'Yes' : 'No'}</li>
                <li>Pet Policy: {unit.config.petPolicy?.toUpperCase() ?? 'N/A'}</li>
                <li>Smoking Policy: {unit.config.smokingPolicy?.toUpperCase() ?? 'N/A'}</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold">Amenities</h4>
              <div className="flex flex-wrap">{amenityBadges}</div>
            </div>
            <div>
              <h4 className="font-semibold">Booking Info</h4>
              <ul className="list-disc pl-5 text-sm">
                <li>Check-In: {unit.checkInTime ?? 'N/A'}</li>
                <li>Check-Out: {unit.checkOutTime ?? 'N/A'}</li>
                <li>Min Stay: {unit.minStayNights ?? 'N/A'} nights</li>
                <li>Max Stay: {unit.maxStayNights ?? 'N/A'} nights</li>
                <li>Cleaning Fee: {unit.currency} {unit.cleaningFee ?? 0}</li>
                <li>Security Deposit: {unit.currency} {unit.securityDeposit ?? 0}</li>
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
              Immerse yourself in the luxury.
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="mt-4 max-h-[60vh] pr-4">
            <div className="space-y-6">
              {mediaItems?.length ? mediaItems : <p className="text-center text-zinc-500">No media available.</p>}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
}