import React from 'react';

interface FAQ {
  id: string | number;
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQ[];
}

const FAQSection: React.FC<FAQSectionProps> = ({ faqs }) => {
  if (!faqs || faqs.length === 0) {
    return null; // Don't render if no FAQs
  }

  return (
    <section className="py-16 sm:py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get answers to common questions about buying and selling real estate
          </p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq) => (
            <div 
              key={faq.id} 
              className="bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-shadow duration-300 p-6 lg:p-8"
            >
              <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-4">
                {faq.question}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center">
          <div className="bg-white rounded-2xl shadow-card p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Still have questions?
            </h3>
            <p className="text-gray-600 mb-6">
              We're here to help! Get in touch with us for personalized answers to your real estate questions.
            </p>
            <a 
              href="#contact" 
              className="inline-flex items-center px-8 py-4 bg-rose-500 text-white font-medium rounded-xl shadow-lg hover:bg-rose-600 hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
            >
              Contact Us
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection; 