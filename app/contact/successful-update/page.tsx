'use client';

import { motion } from 'motion/react';
import { Background } from '@/components/Background';
import { Header } from '@/components/header';
import Link from 'next/link';

export default function SuccessPage() {
  return (
    <>
      <Background />
      <Header />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 text-center"
        >
          <h1 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
            Your Guest Profile Has been Updated
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Any changes to your subscriptions are effective imemdiately.
          </p>
          <Link
            href="/"
            className="inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Return to Home
          </Link>
        </motion.div>
      </main>
    </>
  );
}