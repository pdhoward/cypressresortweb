// components/resort/BookForm.tsx
import AdultsDropdown  from '@/components/resort/AdultsDropdown'
import CheckIn from '@/components/resort/CheckIn';
import CheckOut from '@/components/resort/CheckOut'
import KidsDropdown  from '@/components/resort/KidsDropdown'
import { useRoomContext } from '@/context/RoomContext'; // Assuming correct context path
import React from 'react';

// Define the type for the props if needed, but since it has none, we keep it simple
const BookForm: React.FC = () => {
  // Assuming useRoomContext and handleCheck are correctly defined in your context
  const { handleCheck } = useRoomContext();

  return (
    // Note: The original height classes h-[300px] lg:h-[70px] might need adjustment
    // to look good within your existing Hero styling.
    <form className='h-[300px] lg:h-[70px] w-full max-w-[900px] mx-auto transition-all duration-500 ease-in-out'>
      <div className='flex flex-col w-full h-full lg:flex-row shadow-xl rounded-lg overflow-hidden border border-border/50 backdrop-blur-sm bg-white/10'>
        
        <div className='flex-1 border-b lg:border-r lg:border-b-0 border-border/50'>
          {/* Ensure CheckIn is styled internally to fit a dark theme */}
          <CheckIn /> 
        </div>

        <div className='flex-1 border-b lg:border-r lg:border-b-0 border-border/50'>
          <CheckOut />
        </div>

        <div className='flex-1 border-b lg:border-r lg:border-b-0 border-border/50'>
          <AdultsDropdown />
        </div>

        <div className='flex-1 border-b lg:border-r lg:border-b-0 border-border/50'>
          <KidsDropdown />
        </div>

        <button
          type='submit'
          className='flex items-center justify-center p-4 lg:p-0 font-mono text-sm uppercase bg-primary hover:bg-primary/80 transition-colors duration-150 text-black font-bold flex-1'
          onClick={(e) => handleCheck(e)}
        >
          Check Now
        </button>

      </div>
    </form>
  );
};

export default BookForm;