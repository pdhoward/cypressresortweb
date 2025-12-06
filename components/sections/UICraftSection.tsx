'use client';

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'motion/react';

// --- Data Structure for DRYness ---
interface Feature {
  title: string;
  description: string;
  svg: React.ReactNode;
  imgUrl: string;
  id: number;
}

const features: Feature[] = [
  {
    id: 0,
    title: 'The Craft',
    description: 'Gain the confidence to build anything you envision, transforming motion, interaction, and design principles into second nature.',
    svg: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 3h12l4 6-10 13L2 9Z" />
        <path d="M11 3 8 9l4 13 4-13-3-6" />
        <path d="M2 9h20" />
      </svg>
    ),
    imgUrl: 'https://picsum.photos/720/720?random=12',
  },
  {
    id: 1,
    title: 'CSS Animation',
    description: 'Master CSS animations from your very first set of @keyframes right through to things no one else ever teaches you.',
    svg: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <path d="M7 3v18" />
        <path d="M3 7.5h4" />
        <path d="M3 12h18" />
        <path d="M3 16.5h4" />
        <path d="M17 3v18" />
        <path d="M17 7.5h4" />
        <path d="M17 16.5h4" />
      </svg>
    ),
    imgUrl: 'https://picsum.photos/720/720?random=17',
  },
  {
    id: 2,
    title: 'SVG Filters',
    description: 'Shaders on a budget. Learn how to use noise to your advantage whilst making flames and stickers.',
    svg: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
      </svg>
    ),
    imgUrl: 'https://picsum.photos/720/720?random=19',
  },
  {
    id: 3,
    title: 'Scroll Animation',
    description: 'Take your users on a journey with the joy of tasteful scroll animation. You might not even need JavaScript.',
    svg: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 17V5a2 2 0 0 0-2-2H4" />
        <path d="M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3" />
      </svg>
    ),
    imgUrl: 'https://picsum.photos/720/720?random=42',
  },
  {
    id: 4,
    title: 'Taming Canvas',
    description: 'Grasp how to tame the pixel playground and when to do so. Whilst building with "Performance Driven Development".',
    svg: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
        <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
        <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
        <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
      </svg>
    ),
    imgUrl: 'https://picsum.photos/720/720?random=128',
  },
  {
    id: 5,
    title: 'Layout Tricks',
    description: 'Do you really need a library for that? Sometimes stepping back and rethinking the problem yields a nifty solution.',
    svg: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72" />
        <path d="m14 7 3 3" />
        <path d="M5 6v4" />
        <path d="M19 14v4" />
        <path d="M10 2v2" />
        <path d="M7 8H3" />
        <path d="M21 16h-4" />
        <path d="M11 3H9" />
      </svg>
    ),
    imgUrl: 'https://picsum.photos/720/720?random=56',
  },
  {
    id: 6,
    title: 'Mastering Time',
    description: 'It\'s not all just easings and compositions. Time plays a crucial part in various UI patterns that might not seem obvious at first.',
    svg: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 22h14" />
        <path d="M5 2h14" />
        <path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22" />
        <path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2" />
      </svg>
    ),
    imgUrl: 'https://picsum.photos/720/720?random=39',
  },
];

// Custom CSS for fluid typography and variables
// In a Next.js app, this would typically go in a global CSS file, 
// but is included here for completeness of the component's styling.
const customStyles = `
  /* Base variables and fluid font for the h1 */
  :root {
    --gap: 8px;
    --base: clamp(2rem, 8cqi, 80px);
    --speed: 0.6s;
    --font-size-min: 16;
    --font-size-max: 20;
    --font-ratio-min: 1.2;
    --font-ratio-max: 1.33;
    --font-width-min: 375;
    --font-width-max: 1500;
  }

  .fluid {
    --font-level: 4.25;
    --fluid-min: calc(var(--font-size-min) * pow(var(--font-ratio-min), var(--font-level, 0)));
    --fluid-max: calc(var(--font-size-max) * pow(var(--font-ratio-max), var(--font-level, 0)));
    --fluid-preferred: calc((var(--fluid-max) - var(--fluid-min)) / (var(--font-width-max) - var(--font-width-min)));
    --fluid-type: clamp(
      (var(--fluid-min) / 16) * 1rem,
      ((var(--fluid-min) / 16) * 1rem) - (((var(--fluid-preferred) * var(--font-width-min)) / 16) * 1rem) + (var(--fluid-preferred) * 100vi),
      (var(--fluid-max) / 16) * 1rem
    );
    font-size: var(--fluid-type);
  }

  /* Custom easing for the transition in the original CSS */
  .ease-custom {
    transition-timing-function: cubic-bezier(0, 0, 0, 1); /* Fallback */
    transition-timing-function: linear(
      0 0%, 0.1538 4.09%, 0.2926 8.29%, 0.4173 12.63%, 0.5282 17.12%, 0.6255 21.77%,
      0.7099 26.61%, 0.782 31.67%, 0.8425 37%, 0.8887 42.23%, 0.9257 47.79%,
      0.9543 53.78%, 0.9752 60.32%, 0.9883 67.11%, 0.9961 75%, 1 100%
    );
  }

  /* Specific mask for the image */
  .img-mask {
    mask: radial-gradient(100% 100% at 100% 0, #fff, #0000);
  }
`;

// Helper component for the SVG used in the Article
const ArticleIcon: React.FC<{ isActive: boolean; children: React.ReactNode }> = ({ isActive, children }) => {
  return (
    <motion.div
      className="w-4 fill-none"
      initial={{ opacity: 0.6 }}
      animate={{ opacity: isActive ? 1 : 0.6 }}
      transition={{ duration: 0.72, delay: isActive ? 0.0 : 0.0 }}
    >
      {children}
    </motion.div>
  );
};

// Helper component for text elements that fade in
const FadeText: React.FC<{ isActive: boolean; children: React.ReactNode; opacityClass: string }> = ({ isActive, children, opacityClass }) => {
  return (
    <motion.div
      className={opacityClass}
      initial={{ opacity: 0 }}
      animate={{ opacity: isActive ? 1 : 0 }}
      transition={{ duration: 0.72, delay: isActive ? 0.15 : 0.0 }}
    >
      {children}
    </motion.div>
  );
};


const UICraftSection: React.FC = () => {
  // state for the currently active list item (expanded card)
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const listRef = useRef<HTMLUListElement>(null);
  const itemsRef = useRef<(HTMLLIElement | null)[]>([]);
  const [articleWidth, setArticleWidth] = useState<number>(0);

  // Memoized Grid Template Columns CSS Value
  const gridTemplateColumns = useMemo(() => {
    return features.map((_, i) => (i === activeIndex ? '10fr' : '1fr')).join(' ');
  }, [activeIndex]);

  // Handle setting the active index on click, focus, or pointermove (hover)
  const setIndex = useCallback((id: number) => {
    setActiveIndex(id);
  }, []);

  // Calculate and set the article width (for absolute positioning inside the list item)
  const resync = useCallback(() => {
    if (itemsRef.current.length > 0) {
      // Find the max width of the *current* expanded item.
      const currentExpandedItem = itemsRef.current[activeIndex];
      const width = currentExpandedItem?.offsetWidth || 0;
      setArticleWidth(width);
    }
  }, [activeIndex]);

  // Set up resize observer to update article width
  useEffect(() => {
    resync();

    // Use ResizeObserver for more efficient and robust width calculation than window.resize
    if (!listRef.current) return;
    const observer = new ResizeObserver(resync);
    observer.observe(listRef.current);
    
    return () => observer.disconnect();
  }, [resync]);
  
  // Update articleWidth when activeIndex changes
  useEffect(() => {
    resync();
  }, [activeIndex, resync]);


  return (
    <>
      {/* Inject custom CSS for non-tailwind or complex/variable-dependent styles */}
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />

      {/* Main Container: Mimics the original body styling */}
      <div className="flex flex-col items-center justify-center gap-4 py-8 min-h-screen bg-white dark:bg-black text-black dark:text-white relative">
        {/* Decorative Grid Background (from original CSS) */}
        <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true" style={{ 
          backgroundImage: `
            linear-gradient(90deg, color-mix(in hsl, canvasText, transparent 70%) 1px, transparent 1px 45px) 50% 50% / 45px 45px,
            linear-gradient(color-mix(in hsl, canvasText, transparent 70%) 1px, transparent 1px 45px) 50% 50% / 45px 45px
          `,
          maskImage: 'linear-gradient(-20deg, transparent 50%, white)',
        }} />

        {/* Bear Link (Icon in top left) */}
        <a
          className="bear-link fixed top-4 left-4 w-12 h-12 grid place-items-center opacity-80 hover:opacity-100 transition-opacity z-10 text-current"
          href="https://twitter.com/intent/follow?screen_name=jh3yy"
          target="_blank"
          rel="noreferrer noopener"
          aria-label="Follow Jhey on X (Twitter)"
        >
          <svg className="w-9" viewBox="0 0 969 955" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <circle cx="161.191" cy="320.191" r="133.191" stroke="currentColor" strokeWidth="20" fill="none"></circle>
            <circle cx="806.809" cy="320.191" r="133.191" stroke="currentColor" strokeWidth="20" fill="none"></circle>
            <circle cx="695.019" cy="587.733" r="31.4016" fill="currentColor"></circle>
            <circle cx="272.981" cy="587.733" r="31.4016" fill="currentColor"></circle>
            <path
              d="M564.388 712.083C564.388 743.994 526.035 779.911 483.372 779.911C440.709 779.911 402.356 743.994 402.356 712.083C402.356 680.173 440.709 664.353 483.372 664.353C526.035 664.353 564.388 680.173 564.388 712.083Z"
              fill="currentColor"
            ></path>
            <rect x="310.42" y="448.31" width="343.468" height="51.4986" fill="#FF1E1E"></rect>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M745.643 288.24C815.368 344.185 854.539 432.623 854.539 511.741H614.938V454.652C614.938 433.113 597.477 415.652 575.938 415.652H388.37C366.831 415.652 349.37 433.113 349.37 454.652V511.741L110.949 511.741C110.949 432.623 150.12 344.185 219.845 288.24C289.57 232.295 384.138 200.865 482.744 200.865C581.35 200.865 675.918 232.295 745.643 288.24Z"
              fill="currentColor"
            ></path>
          </svg>
        </a>

        {/* Header Content */}
        <h1 className="fluid text-center mt-8">the craft of ui</h1>
        <p className="w-[74ch] max-w-[calc(100%-4rem)] text-balance font-mono mb-16 leading-relaxed opacity-80 font-normal text-center">
          Unlock the art and science of interface development. This isn’t just about
          pushing pixels or following documentation — it’s about mastering the
          tools, understanding the nuances, and shaping experiences with intention.
        </p>

        {/* Interactive List/Grid Container */}
        <motion.ul
          ref={listRef}
          className="grid gap-2 p-0 list-none justify-center h-[--list-height] w-[820px] max-w-[calc(100%-4rem)] [container-type:inline-size] ease-custom"
          style={{
            gridTemplateColumns,
            '--list-height': 'clamp(300px, 40dvh, 474px)',
            '--article-width': `${articleWidth}px`, // Pass calculated width to CSS for children
          } as React.CSSProperties}
          transition={{ duration: 0.6 }}
          onFocusCapture={(e) => {
            const li = (e.target as HTMLElement).closest('li');
            if (li) setIndex(li.dataset.id ? parseInt(li.dataset.id) : 0);
          }}
          onClick={(e) => {
            const li = (e.target as HTMLElement).closest('li');
            if (li) setIndex(li.dataset.id ? parseInt(li.dataset.id) : 0);
          }}
          onPointerMove={(e) => {
            const li = (e.target as HTMLElement).closest('li');
            if (li) setIndex(li.dataset.id ? parseInt(li.dataset.id) : 0);
          }}
        >
          {features.map((feature, index) => {
            const isActive = index === activeIndex;

            return (
              <motion.li
                key={feature.id}
                ref={(el) => {
                  itemsRef.current[index] = el;
                }}
                data-id={feature.id}
                data-active={isActive ? 'true' : 'false'}
                className="relative overflow-hidden min-w-[--base] rounded-lg border border-[color-mix(in_hsl,canvas,canvasText_50%)] bg-white dark:bg-black"
                // Framer motion 'layout' handles the smooth grid column transition
                layout
                transition={{ duration: 0.6, ease: [0.35, 0.175, 0.5, 1] }} // Custom easing approximation
              >
                <article
                  className="absolute inset-0 w-[var(--article-width)] h-full font-mono flex flex-col justify-end gap-4 pb-4 px-2 overflow-hidden"
                  style={{ '--base': 'clamp(2rem, 8cqi, 80px)' } as React.CSSProperties}
                >
                  {/* Image */}
                  <motion.img
                    src={feature.imgUrl}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none img-mask"
                    initial={{ filter: 'grayscale(1) brightness(1.5)', scale: 1.1 }}
                    animate={{ 
                      filter: isActive ? 'grayscale(0) brightness(1)' : 'grayscale(1) brightness(1.5)',
                      scale: isActive ? 1 : 1.1,
                    }}
                    transition={{ duration: 0.72, delay: isActive ? 0.15 : 0.0 }}
                  />

                  {/* Title */}
                  <motion.h3
                    className="absolute top-4 left-[calc(var(--base)*0.5)] origin-[0_50%] rotate-90 text-base font-light uppercase whitespace-nowrap m-0 font-mono"
                    initial={{ opacity: 0.6 }}
                    animate={{ opacity: isActive ? 1 : 0.6 }}
                    transition={{ duration: 0.72 }}
                  >
                    {feature.title}
                  </motion.h3>

                  {/* Icon (SVG) */}
                  <ArticleIcon isActive={isActive}>{feature.svg}</ArticleIcon>

                  {/* Description */}
                  <FadeText isActive={isActive} opacityClass="text-[13px] text-balance leading-snug">
                    <p className="m-0">{feature.description}</p>
                  </FadeText>

                  {/* Link */}
                  <FadeText isActive={isActive} opacityClass="w-fit">
                    <a
                      href="#"
                      className="absolute bottom-4 left-0 h-[18px] text-current focus:outline-none"
                    >
                      <span className="inline-block line-clamp-1 translate-x-[calc(var(--base)*0.5)] font-medium hover:underline hover:underline-offset-4">
                        Watch now
                      </span>
                    </a>
                  </FadeText>
                </article>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </>
  );
};

export default UICraftSection;