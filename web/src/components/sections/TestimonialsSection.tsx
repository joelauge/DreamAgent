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
    <section id="testimonials" className="py-12 sm:py-16 bg-brand-beige/50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-brand-navy mb-10 text-center">
          What Our Clients Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="bg-white p-6 rounded-lg shadow-lg border border-brand-slate/30 transform hover:scale-105 transition-transform duration-300 ease-in-out"
            >
              <p className="text-brand-slate italic text-base mb-4 leading-relaxed">
                " {testimonial.text} "
              </p>
              <p className="text-right text-brand-navy font-semibold">
                - {testimonial.clientName}
              </p>
              {testimonial.clientLocation && (
                <p className="text-right text-sm text-brand-slate/80">
                  {testimonial.clientLocation}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection; 