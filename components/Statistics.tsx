'use client';

import { motion } from 'motion/react';
import { BadgeDollarSign, Headphones, Zap, Clock } from 'lucide-react';

const stats = [
  {
    icon: BadgeDollarSign,
    value: '30–60%',
    label: 'Lower cost-to-serve',
    description: 'Automation + containment',
  },
  {
    icon: Headphones,
    value: '24/7',
    label: 'Always on',
    description: 'No queue times',
  },
  {
    icon: Zap,
    value: 'Realtime',
    label: 'Natural conversations',
    description: 'Modern, low-latency voice',
  },
  {
    icon: Clock,
    value: 'Weeks',
    label: 'Pilot to production',
    description: 'Rapid integration',
  },
];

export function Statistics() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/20 to-transparent dark:from-indigo-950/20 dark:to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/50 mb-4">
                <s.icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div className="text-3xl font-bold text-black dark:text-white mb-2">{s.value}</div>
              <div className="text-lg font-semibold text-black dark:text-white mb-1">{s.label}</div>
              <div className="text-black/60 dark:text-white/60">{s.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
