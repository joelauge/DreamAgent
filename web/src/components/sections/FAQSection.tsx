import React from 'react';

interface FAQItem {
  id: string | number;
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQItem[];
  title?: string;
}

const FAQSection: React.FC<FAQSectionProps> = ({ faqs, title = "Frequently Asked Questions" }) => {
  if (!faqs || faqs.length === 0) {
    return null; // Don't render if no FAQs
  }

  // For a truly expandable FAQ, you'd typically use state for each item
  // and toggle visibility. For now, we'll just display them.

  return (
    <section id="faq" className="py-12 sm:py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-brand-navy mb-10 text-center">
          {title}
        </h2>
        <div className="max-w-3xl mx-auto space-y-6">
          {faqs.map((faq) => (
            <div key={faq.id} className="border border-brand-slate/30 rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-brand-navy mb-3">
                {faq.question}
              </h3>
              <p className="text-brand-slate leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection; 