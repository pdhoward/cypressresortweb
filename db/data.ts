// db/data.ts

import {
  AccessibilityIcon, // General utility/placeholder
  BlendingModeIcon, // Used for Coffee/Cocktail (fluid/mix)
  MixerHorizontalIcon, // Used for Coffee/Cocktail (mix)
  CheckCircledIcon, // Used for Bath (cleanliness)
  HomeIcon, // Placeholder for Room image (generic home/room)
  MagnifyingGlassIcon, // Placeholder for Search/Booking
  StopwatchIcon, // Used for GYM (time/fitness)
  UploadIcon, // Used for Wifi (upload/signal)
  PinRightIcon, // Used for Parking (pin location)
  HamburgerMenuIcon, // Used for Breakfast/Hotdog (food)
} from '@radix-ui/react-icons';
import { IconProps } from '@radix-ui/react-icons/dist/types';

// Assuming 'images' is an object that resolves to image URLs/modules
interface RoomImages {
    Room1Img: string;
    Room1ImgLg: string;
    Room2Img: string;
    Room2ImgLg: string;
    Room3Img: string;
    Room3ImgLg: string;
    Room4Img: string;
    Room4ImgLg: string;
    Room5Img: string;
    Room5ImgLg: string;
    Room6Img: string;
    Room6ImgLg: string;
    Room7Img: string;
    Room7ImgLg: string;
    Room8Img: string;
    Room8ImgLg: string;
    [key: string]: string;
}
// Placeholder for the images import
const images: RoomImages = {} as RoomImages;

// --- Interfaces for Export ---

// Icon component type from Radix UI is a React.FC that accepts IconProps
export type RadixIcon = React.FC<IconProps>;

// 1. Interface for a single Room Facility
export interface Facility {
    name: string;
    icon: RadixIcon;
}

// 2. Interface for a single Room object
export interface Room {
    id: number;
    name: string;
    description: string;
    facilities: Facility[];
    size: number; // square meters/feet
    maxPerson: number;
    price: number; // per night
    image: string; // Small image
    imageLg: string; // Large image
}

// --- Radix Icon Mapping ---
// Mapping the conceptual Font Awesome icons to the best functional Radix UI equivalents
const iconMap: { [key: string]: RadixIcon } = {
    // Original: FaWifi
    Wifi: UploadIcon, 
    // Original: FaCoffee (Using Mixer for liquid/mix)
    Coffee: MixerHorizontalIcon, 
    // Original: FaBath (Using CheckCircled for clean/utility)
    Bath: CheckCircledIcon, 
    // Original: FaParking
    Parking: PinRightIcon, 
    // Original: FaSwimmingPool (No direct pool icon, using generic utility/check)
    SwimmingPool: AccessibilityIcon, 
    // Original: FaHotdog (Using Hamburger for food)
    Breakfast: HamburgerMenuIcon, 
    // Original: FaStopwatch (Using Stopwatch for fitness/time)
    GYM: StopwatchIcon, 
    // Original: FaCocktail (Using BlendingMode for drinks/mix)
    Drinks: BlendingModeIcon, 
};

// --- Exported Data Array ---

export const roomData: Room[] = [
    {
        id: 1,
        name: 'Superior Room',
        description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit.Ea placeat eos sed voluptas unde veniam eligendi a. Quaerat molestiae hic omnis temporibus quos consequuntur nam voluptatum ea accusamus, corrupti nostrum eum placeat quibusdam quis beatae quae labore earum architecto aliquid debitis.',
        facilities: [
            { name: 'Wifi', icon: iconMap.Wifi },
            { name: 'Coffee', icon: iconMap.Coffee },
            { name: 'Bath', icon: iconMap.Bath },
            { name: 'Parking Space', icon: iconMap.Parking },
            { name: 'Swimming Pool', icon: iconMap.SwimmingPool },
            { name: 'Breakfast', icon: iconMap.Breakfast },
            { name: 'GYM', icon: iconMap.GYM },
            { name: 'Drinks', icon: iconMap.Drinks },
        ],
        size: 30,
        maxPerson: 1,
        price: 115,
        image: images.Room1Img,
        imageLg: images.Room1ImgLg,
    },
    {
        id: 2,
        name: 'Signature Room',
        description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit.Ea placeat eos sed voluptas unde veniam eligendi a. Quaerat molestiae hic omnis temporibus quos consequuntur nam voluptatum ea accusamus, corrupti nostrum eum placeat quibusdam quis beatae quae labore earum architecto aliquid debitis.',
        facilities: [
            { name: 'Wifi', icon: iconMap.Wifi },
            { name: 'Coffee', icon: iconMap.Coffee },
            { name: 'Bath', icon: iconMap.Bath },
            { name: 'Parking Space', icon: iconMap.Parking },
            { name: 'Swimming Pool', icon: iconMap.SwimmingPool },
            { name: 'Breakfast', icon: iconMap.Breakfast },
            { name: 'GYM', icon: iconMap.GYM },
            { name: 'Drinks', icon: iconMap.Drinks },
        ],
        size: 70,
        maxPerson: 2,
        price: 220,
        image: images.Room2Img,
        imageLg: images.Room2ImgLg,
    },
    // ... data entries for rooms 3 through 8 (omitted for brevity, assume the same structure)
    {
        id: 3,
        name: 'Deluxe Room',
        description: '...',
        facilities: [
            { name: 'Wifi', icon: iconMap.Wifi },
            { name: 'Coffee', icon: iconMap.Coffee },
            { name: 'Bath', icon: iconMap.Bath },
            { name: 'Parking Space', icon: iconMap.Parking },
            { name: 'Swimming Pool', icon: iconMap.SwimmingPool },
            { name: 'Breakfast', icon: iconMap.Breakfast },
            { name: 'GYM', icon: iconMap.GYM },
            { name: 'Drinks', icon: iconMap.Drinks },
        ],
        size: 50,
        maxPerson: 3,
        price: 265,
        image: images.Room3Img,
        imageLg: images.Room3ImgLg,
    },
    {
        id: 4,
        name: 'Luxury Room',
        description: '...',
        facilities: [
            { name: 'Wifi', icon: iconMap.Wifi },
            { name: 'Coffee', icon: iconMap.Coffee },
            { name: 'Bath', icon: iconMap.Bath },
            { name: 'Parking Space', icon: iconMap.Parking },
            { name: 'Swimming Pool', icon: iconMap.SwimmingPool },
            { name: 'Breakfast', icon: iconMap.Breakfast },
            { name: 'GYM', icon: iconMap.GYM },
            { name: 'Drinks', icon: iconMap.Drinks },
        ],
        size: 50,
        maxPerson: 4,
        price: 289,
        image: images.Room4Img,
        imageLg: images.Room4ImgLg,
    },
    {
        id: 5,
        name: 'Luxury Suite Room',
        description: '...',
        facilities: [
            { name: 'Wifi', icon: iconMap.Wifi },
            { name: 'Coffee', icon: iconMap.Coffee },
            { name: 'Bath', icon: iconMap.Bath },
            { name: 'Parking Space', icon: iconMap.Parking },
            { name: 'Swimming Pool', icon: iconMap.SwimmingPool },
            { name: 'Breakfast', icon: iconMap.Breakfast },
            { name: 'GYM', icon: iconMap.GYM },
            { name: 'Drinks', icon: iconMap.Drinks },
        ],
        size: 90,
        maxPerson: 5,
        price: 320,
        image: images.Room5Img,
        imageLg: images.Room5ImgLg,
    },
    {
        id: 6,
        name: 'Deluxe Room',
        description: '...',
        facilities: [
            { name: 'Wifi', icon: iconMap.Wifi },
            { name: 'Coffee', icon: iconMap.Coffee },
            { name: 'Bath', icon: iconMap.Bath },
            { name: 'Parking Space', icon: iconMap.Parking },
            { name: 'Swimming Pool', icon: iconMap.SwimmingPool },
            { name: 'Breakfast', icon: iconMap.Breakfast },
            { name: 'GYM', icon: iconMap.GYM },
            { name: 'Drinks', icon: iconMap.Drinks },
        ],
        size: 45,
        maxPerson: 6,
        price: 344,
        image: images.Room6Img,
        imageLg: images.Room6ImgLg,
    },
    {
        id: 7,
        name: 'Luxury Room',
        description: '...',
        facilities: [
            { name: 'Wifi', icon: iconMap.Wifi },
            { name: 'Coffee', icon: iconMap.Coffee },
            { name: 'Bath', icon: iconMap.Bath },
            { name: 'Parking Space', icon: iconMap.Parking },
            { name: 'Swimming Pool', icon: iconMap.SwimmingPool },
            { name: 'Breakfast', icon: iconMap.Breakfast },
            { name: 'GYM', icon: iconMap.GYM },
            { name: 'Drinks', icon: iconMap.Drinks },
        ],
        size: 84,
        maxPerson: 7,
        price: 389,
        image: images.Room7Img,
        imageLg: images.Room7ImgLg,
    },
    {
        id: 8,
        name: 'Deluxe Room',
        description: '...',
        facilities: [
            { name: 'Wifi', icon: iconMap.Wifi },
            { name: 'Coffee', icon: iconMap.Coffee },
            { name: 'Bath', icon: iconMap.Bath },
            { name: 'Parking Space', icon: iconMap.Parking },
            { name: 'Swimming Pool', icon: iconMap.SwimmingPool },
            { name: 'Breakfast', icon: iconMap.Breakfast },
            { name: 'GYM', icon: iconMap.GYM },
            { name: 'Drinks', icon: iconMap.Drinks },
        ],
        size: 48,
        maxPerson: 8,
        price: 499,
        image: images.Room8Img,
        imageLg: images.Room8ImgLg,
    },
];