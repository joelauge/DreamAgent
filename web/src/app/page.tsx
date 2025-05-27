import Hero from '@/components/sections/Hero';
import AboutSection from '@/components/sections/AboutSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import FeaturedListingsSection from '@/components/sections/FeaturedListingsSection';

export default function HomePage() {
  // Sample data for the Hero component
  const realtorData = {
    realtorName: 'Jane Doe',
    realtorTitle: 'Lead Real Estate Consultant',
    // You can point realtorImageUrl to a publicly available image for testing,
    // e.g., from Pexels, Unsplash, or a placeholder service like Pngtree, Placeholder.com
    realtorImageUrl: 'https://via.placeholder.com/160', // Placeholder image
    cityName: 'Metropolis',
    headline: 'Find Your Dream Property in Metropolis!',
    subheadline:
      'With years of experience and a passion for helping clients, Jane Doe is your go-to expert for all things real estate in Metropolis.',
    ctaText1: 'View My Listings',
    ctaLink1: '#listings', // Placeholder link
    ctaText2: 'Get a Free Home Valuation',
    ctaLink2: '#valuation', // Placeholder link
    // Data for AboutSection
    realtorBio: 'Jane Doe has been a pivotal figure in the Metropolis real estate scene for over a decade. Known for her unwavering commitment to clients and an unparalleled understanding of the local market, Jane offers a personalized approach to buying and selling homes. Her dedication extends beyond transactions; she strives to build lasting relationships and empower her clients with knowledge and confidence. When not navigating the complexities of real estate, Jane enjoys exploring local parks and contributing to community initiatives.',
    yearsOfExperience: 12,
    specializations: ['Luxury Homes', 'First-time Homebuyers', 'Investment Properties', 'Relocation Services'],
    // Sample Testimonials Data
    testimonials: [
      {
        id: 1,
        text: "Jane made our home buying process incredibly smooth and stress-free. Her knowledge of Metropolis is unmatched!",
        clientName: "The Smiths",
        clientLocation: "Home Buyers, Metropolis"
      },
      {
        id: 2,
        text: "Selling our property with Jane was a breeze. She got us a fantastic price and handled everything professionally.",
        clientName: "John B.",
        clientLocation: "Home Seller, Downtown Metropolis"
      },
      {
        id: 3,
        text: "As a first-time homebuyer, I was nervous, but Jane guided me every step of the way. Highly recommend!",
        clientName: "Alice Green",
        clientLocation: "New Homeowner, Metropolis Suburbs"
      }
    ],
    // Sample Featured Listings Data
    featuredListings: [
      {
        id: 'L1',
        imageUrl: 'https://via.placeholder.com/400x300/ddeeff/001f3f?text=Modern+Downtown+Apartment', // Placeholder
        address: '123 Main St, Metropolis Center',
        price: '$750,000',
        beds: 2,
        baths: 2,
        sqFt: 1200,
        detailsUrl: '#listing-L1'
      },
      {
        id: 'L2',
        imageUrl: 'https://via.placeholder.com/400x300/eefdde/001f3f?text=Cozy+Suburban+House', // Placeholder
        address: '456 Oak Ave, Metropolis Suburbs',
        price: '$1,250,000',
        beds: 4,
        baths: 3,
        sqFt: 2800,
        detailsUrl: '#listing-L2'
      },
      {
        id: 'L3',
        imageUrl: 'https://via.placeholder.com/400x300/ffeedd/001f3f?text=Luxury+Riverside+Condo', // Placeholder
        address: '789 River Rd, Metropolis Waterfront',
        price: '$2,100,000',
        beds: 3,
        baths: 2.5,
        sqFt: 1950,
        detailsUrl: '#listing-L3'
      }
    ]
  };

  return (
    <main className="flex flex-col items-center justify-start min-h-screen bg-gray-50">
      <Hero
        realtorName={realtorData.realtorName}
        realtorTitle={realtorData.realtorTitle}
        realtorImageUrl={realtorData.realtorImageUrl}
        cityName={realtorData.cityName}
        headline={realtorData.headline}
        subheadline={realtorData.subheadline}
        ctaText1={realtorData.ctaText1}
        ctaLink1={realtorData.ctaLink1}
        ctaText2={realtorData.ctaText2}
        ctaLink2={realtorData.ctaLink2}
      />
      <AboutSection 
        realtorName={realtorData.realtorName}
        realtorBio={realtorData.realtorBio}
        yearsOfExperience={realtorData.yearsOfExperience}
        specializations={realtorData.specializations}
      />
      <TestimonialsSection testimonials={realtorData.testimonials} />
      <FeaturedListingsSection listings={realtorData.featuredListings} />
      {/* Other page sections will go here */}
      <div className="container mx-auto p-8">
        <h2 className="text-2xl font-bold mb-4 text-brand-navy">Further Page Content</h2>
        <p className="text-brand-slate">This is where other sections of the microsite will appear.</p>
        <div id="listings" className="min-h-96 bg-gray-200 my-8 flex items-center justify-center p-4 rounded-lg shadow">
          <span className="text-xl text-gray-500">Listings Section Placeholder</span>
        </div>
        <div id="valuation" className="min-h-96 bg-gray-300 my-8 flex items-center justify-center p-4 rounded-lg shadow">
          <span className="text-xl text-gray-500">Valuation Section Placeholder</span>
        </div>
         <div id="contact" className="min-h-96 bg-gray-400 my-8 flex items-center justify-center p-4 rounded-lg shadow">
          <span className="text-xl text-gray-500">Contact Section Placeholder</span>
        </div>
      </div>
    </main>
  );
}
