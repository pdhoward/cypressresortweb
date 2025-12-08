'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Background } from '@/components/Background';
import { Header } from '@/components/header';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/context/auth-context';
import PhoneInputWithCountry from 'react-phone-number-input/react-hook-form';
import 'react-phone-number-input/style.css';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { openAccessGate } from '@/lib/access-gate';

const subscriptionOptions = [
  { value: 'contact_use_cases', label: 'Contact me to review use case & activate service' },
  { value: 'product_updates', label: 'New product releases' },
  { value: 'newsletter', label: 'Newsletter subscription' },
  { value: 'events', label: 'Event invitations' },
  { value: 'beta', label: 'Beta testing opportunities' },
] as const;

const subscriptionValues = subscriptionOptions.map(o => o.value) as [string, ...string[]];

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  title: z.string().min(1, 'Title is required'),
  company: z.string().min(1, 'Company name is required'),
  email: z.string().email('Invalid email address').transform(val => val.trim().toLowerCase()),
  phone: z.string().nonempty('Valid phone number is required').refine(isValidPhoneNumber, { message: 'Invalid phone number' }),
  interest: z.string().min(10, 'Please provide more details about your interest'),
  subscriptions: z.array(z.enum(subscriptionValues)).optional(),
});

type ContactForm = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isAuthenticated, user } = useAuth();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: { subscriptions: [] },
  });

  // Autofill email from session (if known)
  useEffect(() => {
    if (user?.email) setValue('email', user.email);
  }, [user?.email, setValue]);

  // Prefill profile fields when authenticated
  useEffect(() => {
    if (!isAuthenticated || !user?.email) return;
    (async () => {
      try {
        const response = await fetch('/api/user/data', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: user.email }),
        });
        if (!response.ok) return;
        const data = await response.json();
        const u = data?.user;
        if (u) {
          setValue('name', u.name || '');
          setValue('title', u.title || '');
          setValue('company', u.company || '');
          setValue('email', u.email || user.email);
          setValue('phone', u.phone || '');
          setValue('interest', u.interest || '');
          setValue('subscriptions', u.subscriptions || []);
        }
      } catch {
        // ignore: form remains usable
      }
    })();
  }, [isAuthenticated, user?.email, setValue]);

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        alert(errorData.error || 'Error submitting form. Please try again.');
        return;
      }
      alert('Thanks — your request has been submitted. We’ll get back to you shortly.');
    } catch {
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const disabled = !isAuthenticated;

  return (
    <>
      <Background />
      <Header />
      <main className="mx-auto max-w-2xl mb-6 px-4 pt-24 pb-8 sm:px-6 lg:px-8">
        {/* Gate banner (no duplicate gate UI; opens navbar gate) */}
        {!isAuthenticated && (
          <div className="mb-4 rounded-md border border-white/10 bg-zinc-900/40 p-4 backdrop-blur">
            <p className="text-sm text-white/80">
              Access required — get a one-time passcode to contact our team.
            </p>
            <div className="mt-3">
              <button
                onClick={openAccessGate}
                className="rounded-md bg-white/90 px-3 py-1.5 text-sm font-medium text-zinc-900 hover:bg-white"
              >
                Get Access
              </button>
            </div>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800 sm:p-8"
        >
          <h3 className="mb-2 text-center text-base font-semibold text-gray-800 dark:text-gray-100">
            Let’s discuss how our AI can transform your business
          </h3>
          <p className="text-center text-sm text-gray-600 dark:text-gray-300 mb-6">
            Please complete the form below. All fields are required.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className={disabled ? 'opacity-60 pointer-events-none' : ''}>
            <div>
              <input
                {...register('name')}
                placeholder="Full Name *"
                className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
              />
              {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
            </div>

            <div className="mt-3">
              <input
                {...register('title')}
                placeholder="Title *"
                className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
              />
              {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title.message}</p>}
            </div>

            <div className="mt-3">
              <input
                {...register('company')}
                placeholder="Company *"
                className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
              />
              {errors.company && <p className="mt-1 text-xs text-red-500">{errors.company.message}</p>}
            </div>

            <div className="mt-3">
              <input
                {...register('email')}
                type="email"
                placeholder="Email *"
                disabled
                className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 disabled:opacity-70"
              />
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
            </div>

            <div className="mt-3 PhoneInput dark:PhoneInput--dark">
              <PhoneInputWithCountry
                name="phone"
                control={control}
                international
                defaultCountry="US"
                placeholder="Phone *"
                className="text-xs dark:[&_.PhoneInputInput]:bg-gray-700 dark:[&_.PhoneInputInput]:text-white dark:[&_.PhoneInputInput]:border-gray-600 dark:[&_.PhoneInputInput]:placeholder-gray-400"
              />
              {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>}
            </div>

            <div className="mt-3">
              <textarea
                {...register('interest')}
                placeholder="Your Interest *"
                rows={4}
                className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
              />
              {errors.interest && <p className="mt-1 text-xs text-red-500">{errors.interest.message}</p>}
            </div>

            <div className="mt-4 border rounded-md p-4 bg-gray-50 dark:bg-gray-900">
              <h4 className="text-sm font-medium mb-4 text-gray-700 dark:text-gray-200">Subscription Preferences</h4>
              <div className="flex flex-wrap gap-4">
                {subscriptionOptions.map((option) => (
                  <div key={option.value} className="flex items-center">
                    <input
                      type="checkbox"
                      id={option.value}
                      value={option.value}
                      {...register('subscriptions')}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor={option.value} className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setValue('subscriptions', [])}
                className="mt-4 text-sm text-red-600 hover:underline"
              >
                Unsubscribe from everything
              </button>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-4 w-full rounded-md bg-indigo-600 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        </motion.div>
      </main>
    </>
  );
}
