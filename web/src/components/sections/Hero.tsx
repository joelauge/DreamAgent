'use client';

import React from 'react';
import Image from 'next/image'; // For realtor profile image
import { AnimatedContainer } from '@/components/ui/AnimatedContainer';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import { Button } from '@/components/ui/Button';
import { ChevronRight } from 'lucide-react';
import { LazyImage } from '@/components/ui/LazyImage'; // Added LazyImage import

interface HeroProps {
  realtorName: string;
  realtorTitle?: string; // e.g., "Real Estate Agent", "Broker"
  realtorProfileImageUrl?: string;
  cityName: string;
  province: string;
  headline?: string;
  subheadline?: string;
  ctaText1?: string;
  ctaLink1?: string;
  ctaText2?: string;
  ctaLink2?: string;
  cityMapImageUrl?: string; // Added cityMapImageUrl prop
}

const Hero: React.FC<HeroProps> = ({
  realtorName,
  realtorTitle = 'Real Estate Professional',
  realtorProfileImageUrl = 'https://via.placeholder.com/150', // Default placeholder
  cityName,
  province,
  headline: passedHeadline,
  subheadline: passedSubheadline,
  ctaText1 = 'View Listings',
  ctaLink1 = '#listings',
  ctaText2 = 'Contact Me',
  ctaLink2 = '#contact',
  cityMapImageUrl, // Destructure new prop
}) => {
  const { isMobile, isTablet } = useBreakpoint();
  
  // Use passed in headline/subheadline if available, otherwise generate defaults
  const headline = passedHeadline || `Find Your Dream Home in ${cityName} with ${realtorName}`;
  const subheadline = passedSubheadline || `Your trusted partner for navigating the ${cityName}, ${province} real estate market. Explore exclusive listings and expert guidance.`;

  return (
    <section className="relative bg-brand-beige text-brand-navy py-20 md:py-32 min-h-[70vh] flex items-center">
      {cityMapImageUrl && (
        <LazyImage
          src={cityMapImageUrl}
          alt={`${cityName}, ${province} map background`}
          fill
          className="absolute inset-0 z-0 object-cover" // Added object-cover
          quality={80}
          priority // Prioritize loading for hero background
        />
      )}
      {/* Overlay for better text readability on background image */}
      <div className="absolute inset-0 bg-black/50 z-0"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Realtor Profile Card */}
          <AnimatedContainer 
            animation="scale-in" 
            delay={200}
            className="inline-block mb-8"
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-card hover:shadow-card-hover transition-shadow duration-300 p-6 sm:p-8">
              {/* Realtor Profile Image */}
              {realtorProfileImageUrl && (
                <div className="mb-6 mx-auto w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                  <Image 
                    src={realtorProfileImageUrl}
                    alt={`${realtorName}, ${realtorTitle}`}
                    width={128} 
                    height={128}
                    className="object-cover w-full h-full"
                    priority // Hero image, prioritize loading
                  />
                </div>
              )}

              {/* Realtor Info */}
              <div className="text-center">
                <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-2">
                  {realtorName}
                </h1>
                <p className="text-gray-700 text-sm sm:text-base">
                  {realtorTitle} in {cityName}
                </p>
              </div>
            </div>
          </AnimatedContainer>

          {/* Main Headline & Subheadline - Now white with drop shadows for contrast */}
          <AnimatedContainer 
            animation="slide-up" 
            delay={400}
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white drop-shadow-lg mb-6 max-w-4xl mx-auto leading-tight">
              {headline}
            </h2>
          </AnimatedContainer>
          <AnimatedContainer 
            animation="slide-up" 
            delay={600}
          >
            <p className="text-lg sm:text-xl text-gray-100 drop-shadow-md mb-10 max-w-2xl mx-auto leading-relaxed">
              {subheadline}
            </p>
          </AnimatedContainer>

          {/* Call to Action Buttons */}
          <AnimatedContainer 
            animation="slide-up" 
            delay={800}
            className="flex flex-col sm:flex-row justify-center items-center gap-4"
          >
            <Button asChild size="lg" className="bg-rose-500 hover:bg-rose-600 text-white">
              <a
                href={ctaLink1}
                className="w-full sm:w-auto px-8 py-4 bg-rose-500 text-white font-medium rounded-xl shadow-lg hover:bg-rose-600 hover:shadow-xl transition-all duration-200 text-center focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
              >
                {ctaText1}
                <ChevronRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-brand-navy">
              <a
                href={ctaLink2}
                className="w-full sm:w-auto px-8 py-4 bg-white/80 backdrop-blur-sm text-brand-navy font-medium rounded-xl shadow-lg border border-gray-200 hover:shadow-xl hover:border-gray-300 hover:bg-white transition-all duration-200 text-center focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                {ctaText2}
              </a>
            </Button>
          </AnimatedContainer>
        </div>
      </div>
    </section>
  );
};

export default Hero; 