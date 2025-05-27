import React from 'react';
import Link from 'next/link';

interface HeaderProps {
  realtorName?: string;
  cityName?: string;
  // Add other props as needed, e.g., realtorImageUrl, brokerageLogoUrl
}

const Header: React.FC<HeaderProps> = ({ realtorName, cityName }) => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo / Site Name */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-semibold text-gray-900 hover:text-rose-500 transition-colors">
              DreamAgent.ca
            </Link>
          </div>

          {/* Realtor and City Info */}
          <div className="hidden sm:flex items-center space-x-4">
            {realtorName && (
              <div className="text-right">
                <h2 className="text-sm font-medium text-gray-900">{realtorName}</h2>
                {cityName && (
                  <p className="text-xs text-gray-500">
                    {cityName} Real Estate Expert
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Mobile realtor info */}
          {realtorName && (
            <div className="sm:hidden text-right">
              <h2 className="text-sm font-medium text-gray-900">{realtorName}</h2>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header; 