// components/AdultsDropdown.tsx
import React from 'react';
import { useRoomContext, RoomContextType } from '@/context/RoomContext'; // Ensure RoomContextType is exported
import { adultsList, DropdownItem } from '@/constants/data'; // Ensure DropdownItem type is defined
import { Menu } from '@headlessui/react';
import { ChevronDownIcon } from '@radix-ui/react-icons'; // Radix UI Icon

// Define expected types for the external data
interface AdultsListType extends DropdownItem {
  name: string;
}

const AdultsDropdown: React.FC = () => {

  // Asserting the return type from the context hook
  const { adults, setAdults } = useRoomContext() as RoomContextType;

  return (
    <Menu as='div' className='w-full h-full relative font-mono text-sm uppercase'>
      <Menu.Button className='w-full h-full flex items-center justify-between px-6 md:px-8 transition-colors duration-150 text-foreground hover:text-white/80'>
        {adults}
        <ChevronDownIcon className='h-4 w-4 text-primary transition-transform ui-open:rotate-180 duration-200' />
      </Menu.Button>

      {/* Styled to look like a clean, themed dropdown */}
      <Menu.Items
        as='ul'
        className='absolute w-full flex flex-col z-40 bg-background/95 border border-primary/20 shadow-2xl backdrop-blur-sm'
      >
        {
          (adultsList as AdultsListType[]).map((item, idx) => (
            <Menu.Item
              as='li'
              key={idx}
              onClick={() => setAdults(item.name)}
              // Use primary gold for hover state
              className='h-10 text-white/70 border-b border-primary/10 last-of-type:border-b-0 hover:bg-primary/20 hover:text-primary w-full flex items-center justify-center cursor-pointer transition-colors duration-100'
            >
              {item.name}
            </Menu.Item>
          ))
        }
      </Menu.Items>
    </Menu>
  );
};

export default AdultsDropdown;