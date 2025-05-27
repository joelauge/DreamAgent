import React, { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface ContactFormSectionProps {
  realtorName?: string;
  // Add any other props needed, e.g., an onSubmit handler for actual submission
}

const ContactFormSection: React.FC<ContactFormSectionProps> = ({ realtorName }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Basic error clearing on change
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required.';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid.';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required.';
    // Basic phone validation (optional)
    // if (formData.phone.trim() && !/^[\d\s\(\)-]+$/.test(formData.phone)) {
    //   newErrors.phone = 'Phone number is invalid.';
    // }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form data submitted:', formData);
      // Here you would typically send the data to a backend or CRM
      setIsSubmitted(true);
      // Optionally reset form:
      // setFormData({ name: '', email: '', phone: '', message: '' });
    }
  };

  return (
    <section id="contact" className="py-12 sm:py-16 bg-brand-slate/10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-brand-navy mb-8 text-center">
          {isSubmitted ? 'Thank You!' : `Get In Touch ${realtorName ? `with ${realtorName}` : ''}`}
        </h2>

        {isSubmitted ? (
          <p className="text-center text-brand-navy text-lg">
            Your message has been sent successfully. We will get back to you shortly.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-xl border border-brand-slate/20">
            <div className="mb-6">
              <label htmlFor="name" className="block text-brand-navy font-semibold mb-2">Full Name</label>
              <input 
                type="text" 
                name="name" 
                id="name" 
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${errors.name ? 'border-red-500 focus:ring-red-400' : 'border-brand-slate/50 focus:ring-brand-navy/50'}`}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div className="mb-6">
              <label htmlFor="email" className="block text-brand-navy font-semibold mb-2">Email Address</label>
              <input 
                type="email" 
                name="email" 
                id="email" 
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${errors.email ? 'border-red-500 focus:ring-red-400' : 'border-brand-slate/50 focus:ring-brand-navy/50'}`}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div className="mb-6">
              <label htmlFor="phone" className="block text-brand-navy font-semibold mb-2">Phone Number <span className="text-sm text-brand-slate/80">(Optional)</span></label>
              <input 
                type="tel" 
                name="phone" 
                id="phone" 
                value={formData.phone}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${errors.phone ? 'border-red-500 focus:ring-red-400' : 'border-brand-slate/50 focus:ring-brand-navy/50'}`}
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>

            <div className="mb-6">
              <label htmlFor="message" className="block text-brand-navy font-semibold mb-2">Message</label>
              <textarea 
                name="message" 
                id="message" 
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${errors.message ? 'border-red-500 focus:ring-red-400' : 'border-brand-slate/50 focus:ring-brand-navy/50'}`}
              />
              {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
            </div>

            <button 
              type="submit" 
              className="w-full bg-brand-navy text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-brand-navy/90 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-beige focus:ring-opacity-50 text-lg"
            >
              Send Message
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default ContactFormSection; 