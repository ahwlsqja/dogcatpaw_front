'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils/index';

interface HeroSectionProps {
  /**
   * Background image URL
   */
  backgroundImage?: string;
  /**
   * Hero section height (default: 713px)
   */
  height?: number;
  /**
   * Background opacity (default: 0.75)
   */
  backgroundOpacity?: number;
  /**
   * Children content to display over the background
   */
  children?: ReactNode;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Background overlay color (default: lightgray)
   */
  overlayColor?: string;
}

/**
 * Hero section component with customizable background image
 *
 * Design Specs:
 * - Height: 713px
 * - Aspect Ratio: 1321/713
 * - Flex-shrink: 0
 * - Align-self: stretch
 * - Background opacity: 0.75
 * - Background positioning: -74.213px 0px
 * - Background size: 105.618% 110.013%
 */
export function HeroSection({
  backgroundImage = '/images/hero-bg.jpg',
  height = 713,
  backgroundOpacity = 0.75,
  children,
  className,
  overlayColor = 'rgb(211, 211, 211)', // lightgray
}: HeroSectionProps) {
  return (
    <section
      className={cn(
        'relative',
        'flex-shrink-0',
        'self-stretch',
        'overflow-hidden',
        // Responsive height adjustments
        'min-h-[400px]',
        'md:min-h-[500px]',
        'lg:min-h-[713px]',
        className
      )}
      style={{
        height: `${height}px`,
        aspectRatio: '1321/713',
      }}
    >
      {/* Background Image Layer with Opacity */}
      <div
        className={cn(
          'absolute inset-0 bg-no-repeat',
          // Responsive background positioning
          'bg-center',
          'md:bg-[position:-37px_0px]',
          'lg:bg-[position:-74.213px_0px]'
        )}
        style={{
          opacity: backgroundOpacity,
          backgroundImage: `url(${backgroundImage}), linear-gradient(to right, ${overlayColor}, ${overlayColor})`,
          backgroundSize: '105.618% 110.013%',
          backgroundColor: overlayColor,
        }}
        aria-hidden="true"
      />

      {/* Content Layer */}
      <div className="relative z-10 h-full w-full">
        {children}
      </div>
    </section>
  );
}

/**
 * Hero section with centered content
 */
export function HeroSectionCentered({
  backgroundImage,
  height,
  backgroundOpacity,
  children,
  className,
  overlayColor,
}: HeroSectionProps) {
  return (
    <HeroSection
      backgroundImage={backgroundImage}
      height={height}
      backgroundOpacity={backgroundOpacity}
      overlayColor={overlayColor}
      className={className}
    >
      <div className="container mx-auto h-full px-4">
        <div className="flex h-full items-center justify-center">
          <div className="text-center max-w-4xl">
            {children}
          </div>
        </div>
      </div>
    </HeroSection>
  );
}

/**
 * Hero section with flex layout
 */
export function HeroSectionFlex({
  backgroundImage,
  height,
  backgroundOpacity,
  children,
  className,
  overlayColor,
  align = 'center',
  justify = 'center',
}: HeroSectionProps & {
  align?: 'start' | 'center' | 'end';
  justify?: 'start' | 'center' | 'end' | 'between';
}) {
  const alignClass = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
  }[align];

  const justifyClass = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
  }[justify];

  return (
    <HeroSection
      backgroundImage={backgroundImage}
      height={height}
      backgroundOpacity={backgroundOpacity}
      overlayColor={overlayColor}
      className={className}
    >
      <div className={cn('container mx-auto h-full px-4 flex', alignClass, justifyClass)}>
        {children}
      </div>
    </HeroSection>
  );
}
