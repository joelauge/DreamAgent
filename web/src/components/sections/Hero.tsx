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
    <section className="relative bg-gray-50 py-16 sm:py-24">
      {/* Background - Placeholder for dynamic map image */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Realtor Profile Card */}
          <div className="inline-block mb-8">
            <div className="bg-white rounded-2xl shadow-card p-6 sm:p-8">
              {/* Realtor Profile Image */}
              {realtorImageUrl ? (
                <div className="mb-6 mx-auto w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                  <Image 
                    src={realtorImageUrl}
                    alt={`${realtorName}, ${realtorTitle}`}
                    width={128} 
                    height={128}
                    className="object-cover w-full h-full"
                    priority // Hero image, prioritize loading
                  />
                </div>
              ) : (
                <div className="mb-6 mx-auto w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gray-200 flex items-center justify-center border-4 border-white shadow-lg">
                  <span className="text-2xl sm:text-3xl text-gray-600 font-medium">{realtorName.charAt(0)}</span>
                </div>
              )}

              {/* Realtor Info */}
              <div className="text-center">
                <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-2">
                  {realtorName}
                </h1>
                <p className="text-gray-600 text-sm sm:text-base">
                  {realtorTitle} in {cityName}
                </p>
              </div>
            </div>
          </div>

          {/* Main Headline */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 max-w-4xl mx-auto leading-tight">
            {headline || defaultHeadline}
          </h2>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            {subheadline || defaultSubheadline}
          </p>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            {ctaText1 && ctaLink1 && (
              <a
                href={ctaLink1}
                className="w-full sm:w-auto px-8 py-4 bg-rose-500 text-white font-medium rounded-xl shadow-lg hover:bg-rose-600 hover:shadow-xl transition-all duration-200 text-center focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
              >
                {ctaText1}
              </a>
            )}
            {ctaText2 && ctaLink2 && (
              <a
                href={ctaLink2}
                className="w-full sm:w-auto px-8 py-4 bg-white text-gray-900 font-medium rounded-xl shadow-lg border border-gray-200 hover:shadow-xl hover:border-gray-300 transition-all duration-200 text-center focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                {ctaText2}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 