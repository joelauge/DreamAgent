import React from 'react';
import Link from 'next/link';

// Placeholder for social media icons if you use a library like react-icons
// import { IconType } from 'react-icons';
// import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

interface FooterProps {
  realtorName?: string;
  realtorEmail?: string;
  realtorPhone?: string;
  brokerageName?: string;
  brokerageAddress?: string;
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    twitter?: string;
  };
}

const Footer: React.FC<FooterProps> = ({ 
  realtorName, 
  realtorEmail, 
  realtorPhone, 
  brokerageName, 
  brokerageAddress,
  socialLinks = {}
}) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand/Contact */}
          <div className="lg:col-span-2">
            <Link href="/" className="text-xl font-semibold text-gray-900 hover:text-rose-500 transition-colors">
              DreamAgent.ca
            </Link>
            <p className="text-gray-600 mt-3 max-w-md">
              Your trusted partner in finding the perfect home. Professional real estate services with a personal touch.
            </p>
            
            {(realtorEmail || realtorPhone) && (
              <div className="mt-6 space-y-2">
                {realtorEmail && (
                  <p className="text-sm text-gray-600">
                    <a href={`mailto:${realtorEmail}`} className="hover:text-rose-500 transition-colors">
                      {realtorEmail}
                    </a>
                  </p>
                )}
                {realtorPhone && (
                  <p className="text-sm text-gray-600">
                    <a href={`tel:${realtorPhone}`} className="hover:text-rose-500 transition-colors">
                      {realtorPhone}
                    </a>
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#about" className="text-gray-600 hover:text-rose-500 transition-colors text-sm">
                  About {realtorName || 'Us'}
                </a>
              </li>
              <li>
                <a href="#listings" className="text-gray-600 hover:text-rose-500 transition-colors text-sm">
                  Featured Properties
                </a>
              </li>
              <li>
                <a href="#testimonials" className="text-gray-600 hover:text-rose-500 transition-colors text-sm">
                  Testimonials
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-600 hover:text-rose-500 transition-colors text-sm">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Services
            </h3>
            <ul className="space-y-3">
              <li>
                <span className="text-gray-600 text-sm">Home Buying</span>
              </li>
              <li>
                <span className="text-gray-600 text-sm">Home Selling</span>
              </li>
              <li>
                <span className="text-gray-600 text-sm">Market Analysis</span>
              </li>
              <li>
                <span className="text-gray-600 text-sm">Investment Properties</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Links */}
        {Object.keys(socialLinks).length > 0 && (
          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="flex justify-center space-x-6">
              {socialLinks.facebook && (
                <a 
                  href={socialLinks.facebook} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-rose-500 transition-colors"
                >
                  <span className="sr-only">Facebook</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              )}
              {socialLinks.instagram && (
                <a 
                  href={socialLinks.instagram} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-rose-500 transition-colors"
                >
                  <span className="sr-only">Instagram</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323C5.902 8.198 7.053 7.708 8.35 7.708s2.448.49 3.323 1.297c.897.875 1.387 2.026 1.387 3.323s-.49 2.448-1.297 3.323c-.875.897-2.026 1.387-3.323 1.387zm7.718 0c-1.297 0-2.448-.49-3.323-1.297-.897-.875-1.387-2.026-1.387-3.323s.49-2.448 1.297-3.323c.875-.897 2.026-1.387 3.323-1.387s2.448.49 3.323 1.297c.897.875 1.387 2.026 1.387 3.323s-.49 2.448-1.297 3.323c-.875.897-2.026 1.387-3.323 1.387z"/>
                  </svg>
                </a>
              )}
              {socialLinks.linkedin && (
                <a 
                  href={socialLinks.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-rose-500 transition-colors"
                >
                  <span className="sr-only">LinkedIn</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              )}
              {socialLinks.twitter && (
                <a 
                  href={socialLinks.twitter} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-rose-500 transition-colors"
                >
                  <span className="sr-only">Twitter</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
              )}
            </div>
          </div>
        )}

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-500">
              <p>© {currentYear} DreamAgent.ca. All rights reserved.</p>
              {brokerageName && (
                <p className="mt-1">
                  {realtorName && `${realtorName}, `}
                  {brokerageName}
                  {brokerageAddress && ` • ${brokerageAddress}`}
                </p>
              )}
            </div>
            
            <div className="mt-4 md:mt-0">
              <div className="flex space-x-6 text-sm text-gray-500">
                <a href="/privacy" className="hover:text-rose-500 transition-colors">
                  Privacy Policy
                </a>
                <a href="/terms" className="hover:text-rose-500 transition-colors">
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 