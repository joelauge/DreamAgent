import React from 'react';
import Link from 'next/link';

interface HeaderProps {
  realtorName?: string;
  cityName?: string;
  // Add other props as needed, e.g., realtorImageUrl, brokerageLogoUrl
}

const Header: React.FC<HeaderProps> = ({ realtorName, cityName }) => {
  return (
    <header className="bg-brand-navy text-white p-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        {/* Logo / Site Name */}
        <div className="mb-2 sm:mb-0">
          <Link href="/" className="text-2xl font-bold hover:text-brand-beige transition-colors">
            DreamAgent.ca
          </Link>
        </div>

        {/* Realtor and City Info */}
        <div className="text-center sm:text-right">
          {realtorName && (
            <h2 className="text-lg font-semibold">{realtorName}</h2>
          )}
          {cityName && (
            <p className="text-sm text-brand-slate">
              Top Realtor in {cityName}
            </p>
          )}
        </div>
        
        {/* Clerk UserButton and SignIn/Up are in the RootLayout */}
        {/* Navigation for microsite sections can be added here or handled by a separate Nav component if complex */}
      </div>
    </header>
  );
};

export default Header; 