'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Background } from '@/components/Background';
import { Header } from '@/components/header';
import { VillaCard } from '@/components/cards/VillaCard';
import type { Unit } from '@/types/unit';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export default function GalleryPage() {
  const [units, setUnits] = useState<Unit[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchVillas = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/villas', { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch villas');
        const data = await res.json();
        setUnits(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchVillas();
  }, []);

  return (
    <>
      <Background />
      
      <Header />

      <main className="relative z-10 mx-auto max-w-7xl px-4 pt-24 pb-12 sm:px-6 lg:px-8">
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="
            rounded-3xl border px-4 py-8 shadow-2xl backdrop-blur-xl sm:px-8
            bg-white/80 border-zinc-200/70 text-slate-900
            dark:bg-black/60 dark:border-white/10 dark:text-zinc-50
          "
        >
          <div className="mb-8 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: 0.05 }}
              className="text-3xl font-bold tracking-wide text-slate-900 dark:text-zinc-50 sm:text-4xl"
            >
              Villa Gallery
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: 0.1 }}
              className="mt-2 text-sm text-slate-600 dark:text-zinc-300"
            >
              Explore our collection of hand-picked luxury villas.
            </motion.p>
          </div>

          {loading ? (
            <div className="py-8 text-center text-sm text-slate-600 dark:text-zinc-300">
              Loading luxurious villas…
            </div>
          ) : units.length === 0 ? (
            <div className="py-8 text-center text-sm text-slate-600 dark:text-zinc-300">
              No villas available right now. Check back soon.
            </div>
          ) : (
            <AnimatePresence>
              <motion.div
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {units.map((u) => (
                  <motion.div
                    key={u._id || u.unit_id}
                    variants={itemVariants}
                    className="h-full"
                  >
                    <VillaCard unit={u} />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </motion.section>
      </main>
    </>
  );
}
