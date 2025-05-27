'use client';

import React, { useState } from 'react';

interface ContactFormSectionProps {
  realtorName?: string;
  realtorEmail?: string;
  realtorPhone?: string;
}

const ContactFormSection: React.FC<ContactFormSectionProps> = ({ 
  realtorName, 
  realtorEmail, 
  realtorPhone 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // TODO: Implement actual form submission logic
    console.log('Form submitted:', formData);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Reset form
    setFormData({ name: '', email: '', phone: '', message: '' });
    setIsSubmitting(false);
    
    // TODO: Show success message
    alert('Thank you for your message! We\'ll get back to you soon.');
  };

  return (
    <section id="contact" className="py-16 sm:py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Get in Touch
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ready to start your real estate journey? Let's discuss your needs and find the perfect property for you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Contact Information
              </h3>
              
              <div className="space-y-4">
                {realtorEmail && (
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-10 h-10 bg-rose-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">Email</p>
                      <a href={`mailto:${realtorEmail}`} className="text-gray-600 hover:text-rose-500 transition-colors">
                        {realtorEmail}
                      </a>
                    </div>
                  </div>
                )}

                {realtorPhone && (
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-10 h-10 bg-rose-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">Phone</p>
                      <a href={`tel:${realtorPhone}`} className="text-gray-600 hover:text-rose-500 transition-colors">
                        {realtorPhone}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-card">
              <h4 className="font-semibold text-gray-900 mb-3">Why Choose {realtorName || 'Us'}?</h4>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-rose-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Local market expertise
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-rose-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Personalized service
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-rose-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Proven track record
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-card p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-colors"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-colors"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-colors"
                  placeholder="(555) 123-4567"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-colors resize-none"
                  placeholder="Tell us about your real estate needs..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-rose-500 text-white font-medium rounded-xl shadow-lg hover:bg-rose-600 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactFormSection; 