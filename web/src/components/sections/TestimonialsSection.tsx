import React from 'react';

interface Testimonial {
  id: string | number;
  text: string;
  clientName: string;
  clientLocation?: string; // e.g., "Home Buyer, Metropolis"
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ testimonials }) => {
  if (!testimonials || testimonials.length === 0) {
    return null; // Don't render the section if there are no testimonials
  }

  return (
    <section className="py-16 sm:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Real experiences from satisfied homeowners
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-shadow duration-300 p-6 lg:p-8"
            >
              {/* Quote Icon */}
              <div className="mb-4">
                <svg className="w-8 h-8 text-rose-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
              </div>
              
              {/* Testimonial Text */}
              <blockquote className="text-gray-700 text-base lg:text-lg leading-relaxed mb-6">
                "{testimonial.text}"
              </blockquote>
              
              {/* Client Info */}
              <div className="border-t border-gray-100 pt-4">
                <p className="font-semibold text-gray-900 text-sm">
                  {testimonial.clientName}
                </p>
                {testimonial.clientLocation && (
                  <p className="text-gray-500 text-sm mt-1">
                    {testimonial.clientLocation}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection; 