import React from 'react';
import Image from 'next/image';

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
    <section id="listings" className="py-12 sm:py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-brand-navy mb-10 text-center">
          Featured Listings
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {listings.map((listing) => (
            <div 
              key={listing.id} 
              className="bg-white rounded-lg shadow-xl overflow-hidden border border-brand-slate/20 flex flex-col transform hover:shadow-2xl transition-shadow duration-300 ease-in-out"
            >
              <div className="relative w-full h-56 sm:h-64">
                <Image 
                  src={listing.imageUrl}
                  alt={`View of ${listing.address}`}
                  fill
                  style={{ objectFit: 'cover' }} // Equivalent to object-cover
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold text-brand-navy mb-2">{listing.address}</h3>
                <p className="text-2xl font-bold text-brand-navy mb-3">{listing.price}</p>
                <div className="flex items-center text-brand-slate space-x-4 mb-4 text-sm">
                  <span>{listing.beds} Beds</span>
                  <span>|</span>
                  <span>{listing.baths} Baths</span>
                  {listing.sqFt && (
                    <>
                      <span>|</span>
                      <span>{listing.sqFt.toLocaleString()} SqFt</span>
                    </>
                  )}
                </div>
                <div className="mt-auto">
                  <a 
                    href={listing.detailsUrl}
                    className="inline-block w-full text-center px-6 py-3 bg-brand-navy text-white font-semibold rounded-md shadow-md hover:bg-brand-navy/90 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-beige focus:ring-opacity-50"
                  >
                    View Details
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedListingsSection; 