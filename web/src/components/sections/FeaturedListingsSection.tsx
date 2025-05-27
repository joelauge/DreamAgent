import React from 'react';
import { AnimatedContainer, ResponsiveGrid, LazyImage } from '@/components/ui';

interface Listing {
  id: string | number;
  imageUrl: string; // Placeholder or actual image URL
  address: string;
  price: string; // Formatted price, e.g., "$1,200,000"
  beds: number;
  baths: number;
  sqFt?: number;
  detailsUrl: string; // Link to the listing details page or modal
}

interface FeaturedListingsSectionProps {
  listings: Listing[];
}

const FeaturedListingsSection: React.FC<FeaturedListingsSectionProps> = ({ listings }) => {
  if (!listings || listings.length === 0) {
    return null; // Don't render if no listings
  }

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedContainer animation="slide-up" className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Featured Properties
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover exceptional homes in prime locations
          </p>
        </AnimatedContainer>
        
        <ResponsiveGrid 
          cols={{ sm: 1, md: 2, lg: 3 }} 
          gap="lg"
        >
          {listings.map((listing, index) => (
            <AnimatedContainer
              key={listing.id}
              animation="slide-up"
              delay={index * 100}
            >
              <div className="group bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-lg transition-all duration-300 cursor-pointer"
              >
              {/* Image Container */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <LazyImage 
                  src={listing.imageUrl}
                  alt={`Property at ${listing.address}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {/* Price Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-sm text-gray-900 font-semibold px-3 py-1 rounded-full text-sm shadow-lg">
                    {listing.price}
                  </span>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-rose-500 transition-colors">
                  {listing.address}
                </h3>
                
                {/* Property Details */}
                <div className="flex items-center text-gray-600 text-sm mb-4 space-x-4">
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 21v-4a2 2 0 012-2h4a2 2 0 012 2v4" />
                    </svg>
                    {listing.beds} beds
                  </span>
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10v11M20 10v11" />
                    </svg>
                    {listing.baths} baths
                  </span>
                  {listing.sqFt && (
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                      </svg>
                      {listing.sqFt.toLocaleString()} sq ft
                    </span>
                  )}
                </div>
                
                {/* View Details Link */}
                <a 
                  href={listing.detailsUrl}
                  className="inline-flex items-center text-rose-500 font-medium hover:text-rose-600 transition-colors"
                >
                  View Details
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
              </div>
            </AnimatedContainer>
          ))}
        </ResponsiveGrid>
      </div>
    </section>
  );
};

export default FeaturedListingsSection; 