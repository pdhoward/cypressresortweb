// db/data.ts or constants/data.ts 

interface Images {
  Slider1: string; 
  Slider2: string;
  Slider3: string;
  [key: string]: string;
}
const images: Images = {} as Images; 


export interface DropdownItem {
    name: string;
}

// 2. Interface for Slider Data
export interface SliderItem {
    id: number;
    title: string;
    bg: string; // The type of the imported image module
    btnNext: string;
}

// 3. Interface for Hotel Rules
export interface RuleItem {
    rules: string;
}

// --- Exported Data Arrays ---

export const adultsList: DropdownItem[] = [
    { name: '1 Adult' },
    { name: '2 Adults' },
    { name: '3 Adults' },
    { name: '4 Adults' },
];

export const kidsList: DropdownItem[] = [
    { name: '0 Kid' },
    { name: '1 Kid' },
    { name: '2 Kids' },
    { name: '3 Kids' },
    { name: '4 Kids' },
];

export const sliderData: SliderItem[] = [
    {
        id: 1,
        title: 'Your Luxury Hotel For Vacation',
        bg: images.Slider1,
        btnNext: 'See our rooms',
    },
    {
        id: 2,
        title: 'Feel Relax & Enjoy Your Luxuriousness',
        bg: images.Slider2,
        btnNext: 'See our rooms',
    },
    {
        id: 3,
        title: 'Your Luxury Hotel For Vacation',
        bg: images.Slider3,
        btnNext: 'See our rooms',
    },
];


export const hotelRules: RuleItem[] = [
    {
        rules: 'Check-in : 3:00 PM - 9:00 PM',
    },
    {
        rules: 'Check-out : 10:30 AM',
    },
    {
        rules: 'No Smoking',
    },
    {
        rules: 'No Pet',
    },
];
