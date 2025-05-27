import React from 'react';
import Image from 'next/image'; // For realtor profile image

interface HeroProps {
  realtorName: string;
  realtorTitle?: string; // e.g., "Real Estate Agent", "Broker"
  realtorImageUrl?: string; // URL for realtor's profile picture
  cityName: string;
  headline?: string;
  subheadline?: string;
  ctaText1?: string;
  ctaLink1?: string;
  ctaText2?: string;
  ctaLink2?: string;
  // Background will eventually be a dynamic map image
}

const Hero: React.FC<HeroProps> = ({
  realtorName,
  realtorTitle = 'Real Estate Professional',
  realtorImageUrl,
  cityName,
  headline,
  subheadline,
  ctaText1 = 'Contact Me',
  ctaLink1 = '#contact', // Link to contact form section
  ctaText2,
  ctaLink2,
}) => {
  const defaultHeadline = `Your Trusted ${cityName} Real Estate Expert`;
  const defaultSubheadline = `Discover your dream home with ${realtorName}.`;

  return (
    <section className="relative bg-brand-slate/30 py-16 sm:py-24 text-center text-brand-navy">
      {/* Background - Placeholder for dynamic map image */}
      {/* For now, a subtle pattern or gradient could be used, or just the bg-brand-slate/30 */}
      {/* <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/path/to/placeholder-map-bg.jpg')", opacity: 0.2 }}></div> */}
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Realtor Profile Image */}
        {realtorImageUrl ? (
          <div className="mb-8 mx-auto w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-brand-beige shadow-lg">
            <Image 
              src={realtorImageUrl}
              alt={`${realtorName}, ${realtorTitle}`}
              width={160} 
              height={160}
              className="object-cover w-full h-full"
              priority // Hero image, prioritize loading
            />
          </div>
        ) : (
          <div className="mb-8 mx-auto w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-brand-beige flex items-center justify-center border-4 border-brand-navy shadow-lg">
            <span className="text-4xl text-brand-navy">{realtorName.charAt(0)}</span> {/* Placeholder Initials */}
          </div>
        )}

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
          {headline || defaultHeadline}
        </h1>

        {/* Subheadline */}
        <p className="text-lg sm:text-xl md:text-2xl text-brand-navy/80 mb-8 max-w-3xl mx-auto">
          {subheadline || defaultSubheadline}
        </p>

        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
          {ctaText1 && ctaLink1 && (
            <a
              href={ctaLink1}
              className="px-8 py-3 bg-brand-navy text-white font-semibold rounded-lg shadow-md hover:bg-brand-navy/90 transition-colors text-lg focus:outline-none focus:ring-2 focus:ring-brand-beige focus:ring-opacity-50"
            >
              {ctaText1}
            </a>
          )}
          {ctaText2 && ctaLink2 && (
            <a
              href={ctaLink2}
              className="px-8 py-3 bg-brand-beige text-brand-navy font-semibold rounded-lg shadow-md hover:bg-brand-beige/90 border border-brand-navy transition-colors text-lg focus:outline-none focus:ring-2 focus:ring-brand-navy focus:ring-opacity-50"
            >
              {ctaText2}
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero; 