import Hero from '@/components/sections/Hero';
import AboutSection from '@/components/sections/AboutSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import FeaturedListingsSection from '@/components/sections/FeaturedListingsSection';
import MarketStatsSection from '@/components/sections/MarketStatsSection';
import MapSection from '@/components/sections/MapSection';
import ContactFormSection from '@/components/sections/ContactFormSection';
import FAQSection from '@/components/sections/FAQSection';

export default function Home() {
  // Sample data for the microsite
  const realtorData = {
    name: 'Sarah Johnson',
    title: 'Senior Real Estate Agent',
    email: 'sarah.johnson@dreamagent.ca',
    phone: '(416) 555-0123',
    // Using picsum.photos for more reliable placeholder images
    realtorProfileImageUrl: 'https://picsum.photos/seed/sarahjohnson/200/200',
    cityName: 'Toronto',
    province: 'ON',
    headline: 'Find Your Dream Home in Toronto',
    subheadline: 'Expert guidance through every step of your real estate journey',
    aboutText: 'With over 8 years of experience in the Toronto real estate market, Sarah Johnson has helped hundreds of families find their perfect home. Her deep knowledge of local neighborhoods, market trends, and negotiation expertise ensures her clients get the best possible outcomes.',
    yearsExperience: 8,
    specialties: ['First-time home buyers', 'Luxury properties', 'Investment properties'],
    certifications: ['Certified Residential Specialist', 'Accredited Buyer Representative'],
    brokerageName: 'Premier Realty Group',
    brokerageAddress: 'Toronto, ON',
    // Using Google Maps Static API with custom styling for a clean, professional look
    cityMapImageUrl: 'https://maps.googleapis.com/maps/api/staticmap?center=Toronto,ON,Canada&zoom=11&size=1920x1080&maptype=roadmap&style=feature:administrative|element:labels|visibility:on&style=feature:administrative.country|element:geometry.stroke|color:0x000000|weight:1&style=feature:administrative.province|element:geometry.stroke|color:0x000000|weight:1&style=feature:landscape|element:all|saturation:-100|lightness:65&style=feature:poi|element:all|saturation:-100|lightness:50&style=feature:road|element:all|saturation:-100&style=feature:road.highway|element:geometry|color:0x5f5f5f&style=feature:road.arterial|element:geometry|color:0x929292&style=feature:road.local|element:geometry|color:0xcccccc&style=feature:transit|element:all|saturation:-100&style=feature:water|element:geometry|color:0x2d5f8e&key=AIzaSyA1iNkcELiu2Nvndj0jVyTaAUtbTXBTbBw',
  };

  const featuredListings = [
    {
      id: 'L1',
      imageUrl: 'https://picsum.photos/400/300?random=10', // Modern apartment placeholder
      address: '123 King Street West, Toronto',
      price: '$1,250,000',
      beds: 2,
      baths: 2,
      sqFt: 1200,
      detailsUrl: '/listings/123-king-street-west',
    },
    {
      id: 'L2',
      imageUrl: 'https://picsum.photos/400/300?random=11', // Suburban house placeholder
      address: '456 Maple Avenue, North York',
      price: '$950,000',
      beds: 3,
      baths: 2,
      sqFt: 1800,
      detailsUrl: '/listings/456-maple-avenue',
    },
    {
      id: 'L3',
      imageUrl: 'https://picsum.photos/400/300?random=12', // Luxury condo placeholder
      address: '789 Harbourfront Drive, Toronto',
      price: '$2,100,000',
      beds: 3,
      baths: 3,
      sqFt: 2200,
      detailsUrl: '/listings/789-harbourfront-drive',
    },
  ];

  const testimonials = [
    {
      id: 'T1',
      text: 'Sarah made our home buying experience seamless and stress-free. Her knowledge of the Toronto market is exceptional, and she found us the perfect home within our budget.',
      clientName: 'Michael & Jennifer Chen',
      clientLocation: 'Home Buyers, Scarborough',
    },
    {
      id: 'T2',
      text: 'Working with Sarah was a pleasure. She sold our condo quickly and for above asking price. Her marketing strategy and negotiation skills are top-notch.',
      clientName: 'David Rodriguez',
      clientLocation: 'Home Seller, Downtown Toronto',
    },
    {
      id: 'T3',
      text: 'As first-time buyers, we had many questions. Sarah patiently guided us through every step and helped us understand the market. We couldn\'t be happier with our new home.',
      clientName: 'Emma & James Wilson',
      clientLocation: 'First-time Buyers, Etobicoke',
    },
  ];

  const marketStats = [
    {
      label: 'Average Home Price',
      value: '$1.2M',
      trend: 'up' as const,
      trendValue: '+3.2%',
    },
    {
      label: 'Days on Market',
      value: '18',
      trend: 'down' as const,
      trendValue: '-5 days',
    },
    {
      label: 'Sales Volume',
      value: '2,847',
      trend: 'up' as const,
      trendValue: '+12%',
    },
    {
      label: 'Price per Sq Ft',
      value: '$1,089',
      trend: 'stable' as const,
      trendValue: '+0.8%',
    },
  ];

  const faqs = [
    {
      id: 'F1',
      question: 'What is the current state of the Toronto real estate market?',
      answer: 'The Toronto real estate market remains active with steady demand and competitive pricing. While inventory levels have improved compared to previous years, desirable properties in prime locations continue to move quickly. Our team provides up-to-date market analysis to help you make informed decisions.',
    },
    {
      id: 'F2',
      question: 'How long does it typically take to buy or sell a home?',
      answer: 'The timeline varies depending on market conditions and your specific situation. For buyers, finding the right home can take anywhere from a few weeks to several months. For sellers, well-priced homes in good condition typically sell within 2-4 weeks. We work efficiently to minimize delays and keep you informed throughout the process.',
    },
    {
      id: 'F3',
      question: 'What are the costs involved in buying a home?',
      answer: 'Beyond the purchase price, buyers should budget for land transfer tax, legal fees, home inspection, title insurance, and moving costs. In Toronto, you\'ll also pay the municipal land transfer tax. We provide a detailed breakdown of all costs upfront so there are no surprises.',
    },
    {
      id: 'F4',
      question: 'Do you work with first-time home buyers?',
      answer: 'Absolutely! We specialize in helping first-time buyers navigate the process. We\'ll explain each step, help you understand financing options, connect you with trusted mortgage professionals, and ensure you\'re comfortable with every decision. Many of our clients are first-time buyers who appreciate our patient, educational approach.',
    },
  ];

  return (
    <main>
      <Hero
        realtorName={realtorData.name}
        realtorTitle={realtorData.title}
        realtorProfileImageUrl={realtorData.realtorProfileImageUrl}
        cityName={realtorData.cityName}
        province={realtorData.province}
        headline={realtorData.headline}
        subheadline={realtorData.subheadline}
        ctaText1="Contact Me"
        ctaLink1="#contact"
        ctaText2="View Properties"
        ctaLink2="#listings"
        cityMapImageUrl={realtorData.cityMapImageUrl}
      />
      
      <AboutSection
        realtorName={realtorData.name}
        aboutText={realtorData.aboutText}
        yearsExperience={realtorData.yearsExperience}
        specialties={realtorData.specialties}
        certifications={realtorData.certifications}
      />
      
      <FeaturedListingsSection listings={featuredListings} />
      
      <TestimonialsSection testimonials={testimonials} />
      
      <MarketStatsSection cityName={realtorData.cityName} stats={marketStats} />
      
      <MapSection cityName={realtorData.cityName} />
      
      <FAQSection faqs={faqs} />
      
      <ContactFormSection
        realtorName={realtorData.name}
        realtorEmail={realtorData.email}
        realtorPhone={realtorData.phone}
      />
    </main>
  );
}
