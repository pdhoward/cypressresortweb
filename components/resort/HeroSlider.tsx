// components/HeroSlider.tsx

import React, { useState, useEffect } from 'react';
// Assuming the path and exported SliderItem interface are correct
import { sliderData, SliderItem } from '@/constants/data'; 
import Link from 'next/link'; // Using Next.js Link for navigation

// Define the autoplay delay in milliseconds
const AUTOPLAY_DELAY = 4000; 

const HeroSlider: React.FC = () => {
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

    // Autoplay and Loop Logic
    useEffect(() => {
        // Set a timer to advance the slide
        const timer = setTimeout(() => {
            setCurrentSlideIndex((prevIndex) => 
                // Calculate the next index, looping back to 0 if we reach the end
                (prevIndex + 1) % sliderData.length 
            );
        }, AUTOPLAY_DELAY);

        // Cleanup function: Clear the timeout when the component unmounts or currentSlideIndex changes
        return () => clearTimeout(timer);
    }, [currentSlideIndex]); // Re-run effect whenever the current slide index updates

    return (
        // Main container: relative positioning for absolute slides, and overflow hidden
        <div className='heroSlider relative h-[600px] lg:h-[860px] overflow-hidden'>
            {
                sliderData.map((slide: SliderItem, index: number) => {
                    const isActive = index === currentSlideIndex;
                    // Define classes for transition and visibility based on active state
                    const transitionClass = 'transition-opacity duration-1000 ease-in-out';
                    const opacityClass = isActive ? 'opacity-100 z-10' : 'opacity-0 z-0';

                    return (
                        <div
                            key={slide.id}
                            // Absolute positioning to stack slides, using opacity for fade effect
                            className={`absolute top-0 w-full h-full flex justify-center items-center ${transitionClass} ${opacityClass}`}
                        >
                            {/* 1. Content (must have a higher z-index than the overlay) */}
                            <div className='z-30 text-white text-center relative p-4'>
                                <div className='uppercase font-tertiary tracking-[6px] mb-5'>Just Enjoy & Relax</div>
                                <h1 className='font-primary text-[32px] uppercase tracking-[2px] max-w-[920px] lg:text-[68px] leading-tight mb-6'>
                                    {slide.title}
                                </h1>
                                {/* This is typically a button that links to the room section */}
                                <Link 
                                    href="/rooms" 
                                    className='btn btn-lg btn-primary mx-auto inline-block'
                                >
                                    {slide.btnNext}
                                </Link>
                            </div>

                            {/* 2. Background Image */}
                            <div className='absolute top-0 w-full h-full'>
                                {/* Ensure the image object-cover stays in place */}
                                <img 
                                    className='object-cover h-full w-full' 
                                    src={slide.bg} 
                                    alt={`Background image for ${slide.title}`} 
                                />
                            </div>

                            {/* 3. Black Overlay for better text contrast */}
                            <div className='absolute w-full h-full bg-black/70 z-20' />
                        </div>
                    );
                })
            }
        </div>
    );
};

export default HeroSlider;