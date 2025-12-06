import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const DEFAULT_VIDEO_SRC = "https://res.cloudinary.com/stratmachine/video/upload/v1752260506/machine/20250711cypressdemo_q7plge.mp4";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc?: string;
}

export function VideoModal({ isOpen, onClose, videoSrc = DEFAULT_VIDEO_SRC }: VideoModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>
            <iframe
              src={videoSrc}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0"
            ></iframe>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}