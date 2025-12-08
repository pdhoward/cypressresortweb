'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Background } from '@/components/Background';
import { Header } from '@/components/header';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import PhoneInputWithCountry from 'react-phone-number-input/react-hook-form';
import 'react-phone-number-input/style.css';
import { isValidPhoneNumber } from 'libphonenumber-js';

const subscriptionOptions = [
  { value: 'contact_use_cases', label: 'Please contact me to discuss use cases' },
  { value: 'product_updates', label: 'New product releases' },
  { value: 'newsletter', label: 'Newsletter subscription' },
  { value: 'events', label: 'Event invitations' },
  { value: 'beta', label: 'Beta testing opportunities' },
] as const;

const subscriptionValues = subscriptionOptions.map(o => o.value) as [string, ...string[]];

const editSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  title: z.string().min(1, 'Title is required'),
  company: z.string().min(1, 'Company name is required'),
  email: z.string().email('Invalid email address').transform(val => val.trim().toLowerCase()),
  phone: z.string().nonempty('Valid phone number is required').refine(isValidPhoneNumber, { message: 'Invalid phone number' }),
  interest: z.string().min(10, 'Please provide more details about your interest'),
  subscriptions: z.array(z.enum(subscriptionValues)).optional(),
});

type EditForm = z.infer<typeof editSchema>;

export default function EditPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAutofilled, setIsAutofilled] = useState(false);
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<EditForm>({
    resolver: zodResolver(editSchema),
    defaultValues: {
      subscriptions: [],
    },
  });

  useEffect(() => {
    const loadData = async () => {
      const pending = localStorage.getItem('pendingUpdate');
      if (pending) {
        const pendingData = JSON.parse(pending);
        setValue('name', pendingData.name || '');
        setValue('title', pendingData.title || '');
        setValue('company', pendingData.company || '');
        setValue('email', pendingData.email);
        setValue('phone', pendingData.phone || '');
        setValue('interest', pendingData.interest || '');
        setValue('subscriptions', pendingData.subscriptions || []);
        setIsAutofilled(true);
        localStorage.removeItem('pendingUpdate');
      } else if (isAuthenticated && user?.email) {
        try {
          const response = await fetch('/api/user/data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: user.email }),
          });
          if (response.ok) {
            const data = await response.json();
            if (data.user) {
              setValue('name', data.user.name || '');
              setValue('title', data.user.title || '');
              setValue('company', data.user.company || '');
              setValue('email', data.user.email);
              setValue('phone', data.user.phone || '');
              setValue('interest', data.user.interest || '');
              setValue('subscriptions', data.user.subscriptions || []);
              setIsAutofilled(true);
            } else {
              setValue('email', user.email);
            }
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };
    loadData();
  }, [isAuthenticated, user, setValue]);

  const onSubmit = async (data: EditForm) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        router.push('/contact/successful-update');
      } else {
        alert('Error updating profile. Please check the code and try again.');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Background />
      <Header />
      <main className="mx-auto max-w-2xl mb-6 px-4 pt-12 py-8 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-6 rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800 sm:p-8"
        >
          <h3 className="mb-6 text-center text-lg font-semibold text-gray-700 dark:text-gray-200">
            Update Your Profile
          </h3>
          <p className="text-center text-sm text-gray-600 dark:text-gray-300 mb-6">
            Your information is already on file. Edit any accessible fields you would like before resubmitting. All fields are required.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <input
                {...register('name')}
                placeholder="Full Name *"
                className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div>
              <input
                {...register('title')}
                placeholder="Title *"
                className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
              />
              {errors.title && (
                <p className="mt-1 text-xs text-red-500">{errors.title.message}</p>
              )}
            </div>

            <div>
              <input
                {...register('company')}
                placeholder="Company *"
                className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
              />
              {errors.company && (
                <p className="mt-1 text-xs text-red-500">{errors.company.message}</p>
              )}
            </div>

            <div>
              <input
                {...register('email')}
                type="email"
                placeholder="Email *"
                disabled={true}
                className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 disabled:opacity-50"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>

           <div className="PhoneInput dark:PhoneInput--dark">
              <PhoneInputWithCountry
                name="phone"
                control={control}
                international
                defaultCountry="US"
                placeholder="Phone *"
                className="text-xs dark:[&_.PhoneInputInput]:bg-gray-700 dark:[&_.PhoneInputInput]:text-white dark:[&_.PhoneInputInput]:border-gray-600 dark:[&_.PhoneInputInput]:placeholder-gray-400 dark:[&_.PhoneInputCountryIcon]:filter dark:[&_.PhoneInputCountryIcon]:brightness-75 dark:[&_.PhoneInputInput]:focus:border-indigo-500 dark:[&_.PhoneInputInput]:focus:ring-1 dark:[&_.PhoneInputInput]:focus:ring-indigo-500 dark:[&_.PhoneInputInput]:[color-scheme:dark] dark:[&_.PhoneInputInput:-webkit-autofill]:!shadow-[inset_0_0_0px_1000px_theme(colors.gray.700)] dark:[&_.PhoneInputInput:-webkit-autofill]:!text-white dark:[&_.PhoneInputInput:-webkit-autofill]:[-webkit-text-fill-color:white] dark:[&_.PhoneInputCountrySelect]:text-gray-900 dark:[&_.PhoneInputCountrySelect_option]:text-gray-900 dark:[&_.PhoneInputCountrySelect_option]:bg-white"
              />
              {errors.phone && (
                <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>
              )}
            </div>


            <div>
              <textarea
                {...register('interest')}
                placeholder="Your Interest *"
                rows={4}
                className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
              />
              {errors.interest && (
                <p className="mt-1 text-xs text-red-500">{errors.interest.message}</p>
              )}
            </div>           

            <div className="border rounded-md p-4 bg-gray-50 dark:bg-gray-900">
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
                    <label
                      htmlFor={option.value}
                      className="ml-2 text-sm text-gray-600 dark:text-gray-300"
                    >
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
              className="w-full rounded-md bg-indigo-600 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {isSubmitting ? 'Updating...' : 'Update'}
            </button>
          </form>
        </motion.div>
      </main>
    </>
  );
}