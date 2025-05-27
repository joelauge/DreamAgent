import React from 'react';

interface AboutSectionProps {
  realtorName: string;
  realtorBio: string;
  yearsOfExperience?: number;
  specializations?: string[];
  // Add other relevant props like a professional headshot URL if different from hero
}

const AboutSection: React.FC<AboutSectionProps> = ({
  realtorName,
  realtorBio,
  yearsOfExperience,
  specializations,
}) => {
  return (
    <section id="about" className="py-12 sm:py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-brand-navy mb-8 text-center">
          About {realtorName}
        </h2>
        <div className="max-w-3xl mx-auto text-brand-slate text-lg leading-relaxed">
          <p className="mb-6">
            {realtorBio}
          </p>
          {yearsOfExperience && (
            <p className="mb-4">
              With <span className="font-semibold text-brand-navy">{yearsOfExperience} years of experience</span> in the industry, {realtorName} has a proven track record of success.
            </p>
          )}
          {specializations && specializations.length > 0 && (
            <div className="mb-6">
              <h4 className="font-semibold text-brand-navy mb-2">Specializations:</h4>
              <ul className="list-disc list-inside pl-4 space-y-1">
                {specializations.map((spec, index) => (
                  <li key={index}>{spec}</li>
                ))}
              </ul>
            </div>
          )}
          {/* You could add more details like awards, community involvement, etc. */}
        </div>
      </div>
    </section>
  );
};

export default AboutSection; 