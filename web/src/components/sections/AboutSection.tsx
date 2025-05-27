import React from 'react';

interface AboutSectionProps {
  realtorName: string;
  aboutText?: string;
  yearsExperience?: number;
  specialties?: string[];
  certifications?: string[];
}

const AboutSection: React.FC<AboutSectionProps> = ({ 
  realtorName, 
  aboutText, 
  yearsExperience, 
  specialties = [], 
  certifications = [] 
}) => {
  const defaultAboutText = `${realtorName} is a dedicated real estate professional committed to helping clients find their perfect home. With extensive knowledge of the local market and a passion for exceptional service, ${realtorName} guides buyers and sellers through every step of their real estate journey.`;

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            About {realtorName}
          </h2>
          <div className="w-24 h-1 bg-rose-500 mx-auto rounded-full"></div>
        </div>

        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-700 leading-relaxed mb-8 text-center">
            {aboutText || defaultAboutText}
          </p>
        </div>

        {/* Stats and Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {/* Experience */}
          {yearsExperience && (
            <div className="text-center">
              <div className="bg-gray-50 rounded-2xl p-6">
                <div className="text-3xl font-bold text-rose-500 mb-2">
                  {yearsExperience}+
                </div>
                <p className="text-gray-600 font-medium">
                  Years of Experience
                </p>
              </div>
            </div>
          )}

          {/* Specialties */}
          {specialties.length > 0 && (
            <div className="text-center">
              <div className="bg-gray-50 rounded-2xl p-6">
                <div className="text-2xl font-bold text-gray-900 mb-3">
                  Specialties
                </div>
                <div className="space-y-2">
                  {specialties.slice(0, 3).map((specialty, index) => (
                    <p key={index} className="text-gray-600 text-sm">
                      {specialty}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <div className="text-center">
              <div className="bg-gray-50 rounded-2xl p-6">
                <div className="text-2xl font-bold text-gray-900 mb-3">
                  Certifications
                </div>
                <div className="space-y-2">
                  {certifications.slice(0, 3).map((cert, index) => (
                    <p key={index} className="text-gray-600 text-sm">
                      {cert}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">
            Ready to start your real estate journey?
          </p>
          <a 
            href="#contact" 
            className="inline-flex items-center px-8 py-4 bg-rose-500 text-white font-medium rounded-xl shadow-lg hover:bg-rose-600 hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
          >
            Get in Touch
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutSection; 