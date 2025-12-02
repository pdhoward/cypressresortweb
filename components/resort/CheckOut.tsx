// components/CheckOut.tsx
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '@/styles/datepicker.css'; // Assuming this custom stylesheet exists
import { CalendarIcon } from '@radix-ui/react-icons'; // Radix UI Icon

const CheckOut: React.FC = () => {
  // useState(false) for initial empty state, will hold Date object once selected
  const [endDate, setEndDate] = useState<Date | null>(null);

  return (
    <div className='relative flex items-center justify-start h-full'>

      {/* DatePicker Input */}
      <DatePicker
        className='w-full h-full p-0 pl-6 md:pl-8 text-sm uppercase text-white/80 placeholder:text-white/50 bg-transparent focus:outline-none focus:ring-0'
        selected={endDate}
        placeholderText='Check out'
        onChange={(date: Date | null) => setEndDate(date)}
        dateFormat="MM/dd/yyyy" // Standard format
      />

      {/* Icon Wrapper on the right */}
      <div className='absolute z-10 right-0 pr-6 md:pr-8 pointer-events-none'>
        <CalendarIcon className='h-4 w-4 text-primary' />
      </div>

    </div>
  );
};

export default CheckOut;