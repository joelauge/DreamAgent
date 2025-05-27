import Hero from '@/components/sections/Hero';

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
  };

  return (
    <main className="flex flex-col items-center justify-start min-h-screen">
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
      {/* Other page sections will go here */}
      <div className="container mx-auto p-8">
        <h2 className="text-2xl font-bold mb-4">Page Content Below Hero</h2>
        <p>This is where other sections of the microsite will appear.</p>
        <div id="listings" className="h-96 bg-gray-200 my-8 flex items-center justify-center">Listings Section Placeholder</div>
        <div id="valuation" className="h-96 bg-gray-300 my-8 flex items-center justify-center">Valuation Section Placeholder</div>
         <div id="contact" className="h-96 bg-gray-400 my-8 flex items-center justify-center">Contact Section Placeholder</div>
      </div>
    </main>
  );
}
