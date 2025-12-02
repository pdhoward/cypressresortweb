// Assuming the path to your Room interface is correct
import { Room as RoomType } from '@/db/data';
import React from 'react';

// Radix UI Icon Imports
import {
  Component1Icon, // Closest Radix equivalent to BsArrowsFullscreen (size/layout)
  PersonIcon,     // Closest Radix equivalent to BsPeople (maxPerson)
} from '@radix-ui/react-icons';
import Link from 'next/link';

// --- 1. Room Component (tsx) ---

interface RoomProps {
  room: RoomType;
}

const Room: React.FC<RoomProps> = ({ room }) => {

  // Destructure with a nullish check is not necessary since we enforce RoomType via props, 
  // but we'll destructure for cleanliness.
  const { id, name, image, size, maxPerson, description, price } = room;
  const linkPath = `/room/${id}`;

  return (
    <div className='bg-white shadow-2xl min-h-[500px] group'>

      <div className='overflow-hidden'>
        {/* Note: In a real Next.js app, you should use the <Image> component for optimization */}
        <img
          src={image}
          alt={name}
          className='group-hover:scale-110 transition-all duration-300 w-full'
        />
      </div>


      {/* Room Details Bar */}
      <div className='bg-white shadow-lg max-w-[300px] mx-auto h-[60px] -translate-y-1/2 flex justify-center items-center uppercase font-tertiary tracking-[1px] font-semibold text-base'>

        <div className='flex justify-between w-[80%]'>

          {/* Size */}
          <div className='flex items-center gap-x-2'>
            <div className='text-accent'>
              <Component1Icon className='h-4 w-4' /> {/* Radix icon for size/layout */}
            </div>
            <div className='flex gap-x-1'>
              <div>Size</div>
              <div>{size}m2</div>
            </div>
          </div>

          {/* Max People */}
          <div className='flex items-center gap-x-2'>
            <div className='text-accent'>
              <PersonIcon className='h-4 w-4' /> {/* Radix icon for person */}
            </div>
            <div className='flex gap-x-1'>
              <div>Max people</div>
              <div>{maxPerson}</div>
            </div>
          </div>

        </div>

      </div>


      {/* Name and Description */}
      <div className='text-center'>
        <Link href={linkPath}>
          <h3 className="h3 hover:text-primary transition-colors duration-200">{name}</h3>
        </Link>

        <p className='max-w-[300px] mx-auto mb-3 lg:mb-6'>{description.slice(0, 56)}...</p>
      </div>


      {/* Button */}
      <Link
        href={linkPath}
        className="btn btn-secondary btn-sm max-w-[240px] mx-auto duration-300"
      >
        Book now from ${price}
      </Link>

    </div>
  );
};

export default Room;
