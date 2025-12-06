'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Background } from '@/components/Background';
import { Header } from '@/components/header';
import { VillaCard } from '@/components/VillaCard';
import { Unit } from '@/types/unit';

export default function GalleryPage() {
  const [units, setUnits] = useState<Unit[]>([]);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Added for demo; adjust based on actual auth logic

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/villas', { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch villas');
        const data = await res.json();
        setUnits(data || []);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const openAccessGate = () => {
    // Simulate access gate opening; in real app, this would handle auth flow
    setIsAuthenticated(true);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <Background />
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        {!isAuthenticated ? (
          <div className="mx-auto max-w-xl rounded-lg border border-white/10 bg-zinc-900/40 backdrop-blur p-6 text-center shadow-xl">
            <h2 className="text-lg font-semibold text-white">Access Required</h2>
            <p className="mt-2 text-sm text-white/70">
              Get a one-time passcode to view the Villa Gallery.
            </p>
            <div className="mt-4 flex justify-center">
              <button
                onClick={openAccessGate}
                className="rounded-md bg-gold-500 px-4 py-2 text-sm font-medium text-white hover:bg-gold-600 transition-colors"
              >
                Get Access
              </button>
            </div>
          </div>
        ) : (
          <>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-3xl font-bold text-white mb-8 text-center tracking-wide"
            >
              Villa Gallery
            </motion.h1>

            {loading ? (
              <p className="text-white/70 text-center">Loading luxurious villas…</p>
            ) : (
              <AnimatePresence>
                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {units.map((u) => (
                    <motion.div key={u._id || u.unit_id} variants={itemVariants} className="h-full">
                      <VillaCard unit={u} />
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            )}
          </>
        )}
      </main>
    </>
  );
}