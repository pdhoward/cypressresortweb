// components/KidsDropdown.tsx
import React from 'react';
import { useRoomContext, RoomContextType } from '@/context/RoomContext'; 
import { kidsList, DropdownItem } from '@/constants/data'; 
import { Menu } from '@headlessui/react';
import { ChevronDownIcon } from '@radix-ui/react-icons'; 

// Define expected types for the external data
interface KidsListType extends DropdownItem {
  name: string;
}

const KidsDropdown: React.FC = () => {

  // Asserting the return type from the context hook
  const { kids, setKids } = useRoomContext() as RoomContextType;

  return (
    <Menu as='div' className='w-full h-full relative font-mono text-sm uppercase'>
      <Menu.Button className='w-full h-full flex items-center justify-between px-6 md:px-8 transition-colors duration-150 text-foreground hover:text-white/80'>
        {kids === '0 Kid' ? 'No Kid' : kids}
        <ChevronDownIcon className='h-4 w-4 text-primary transition-transform ui-open:rotate-180 duration-200' />
      </Menu.Button>

      {/* Styled to look like a clean, themed dropdown */}
      <Menu.Items
        as='ul'
        className='absolute w-full flex flex-col z-40 bg-background/95 border border-primary/20 shadow-2xl backdrop-blur-sm'
      >
        {
          (kidsList as KidsListType[]).map((item, idx) => (
            <Menu.Item
              as='li'
              key={idx}
              onClick={() => setKids(item.name)}
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

export default KidsDropdown;