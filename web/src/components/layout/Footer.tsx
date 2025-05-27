import React from 'react';
import Link from 'next/link';

// Placeholder for social media icons if you use a library like react-icons
// import { IconType } from 'react-icons';
// import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

interface SocialLink {
  name: string;
  // icon?: IconType; // Add if using react-icons
  url: string;
}

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  // Placeholder social links - add actual URLs and uncomment icon imports if used
  const socialLinks: SocialLink[] = [
    // { name: 'Facebook', icon: FaFacebook, url: '#' },
    // { name: 'Twitter', icon: FaTwitter, url: '#' },
    // { name: 'Instagram', icon: FaInstagram, url: '#' },
    // { name: 'LinkedIn', icon: FaLinkedin, url: '#' },
    { name: 'Facebook', url: '#facebook-placeholder' },
    { name: 'Twitter', url: '#twitter-placeholder' },
    { name: 'Instagram', url: '#instagram-placeholder' },
  ];

  return (
    <footer className="bg-brand-navy text-white pt-10 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Column 1: About/Branding */}
          <div>
            <h3 className="text-xl font-semibold mb-3">DreamAgent.ca</h3>
            <p className="text-brand-beige/80 text-sm">
              Connecting you with top real estate professionals across Canada.
            </p>
            {/* Add logo here if available */}
          </div>

          {/* Column 2: Quick Links (Placeholder) */}
          <div>
            <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about-us" className="hover:text-brand-beige transition-colors">About Us</Link></li>
              <li><Link href="/contact-us" className="hover:text-brand-beige transition-colors">Contact</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-brand-beige transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service" className="hover:text-brand-beige transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact Info / Social */}
          <div>
            <h3 className="text-xl font-semibold mb-3">Connect With Us</h3>
            {socialLinks.length > 0 && (
              <div className="flex space-x-4 mb-4">
                {socialLinks.map((social) => (
                  <a 
                    key={social.name} 
                    href={social.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label={social.name}
                    className="text-brand-beige/80 hover:text-brand-beige transition-colors text-2xl"
                  >
                    {/* {social.icon && <social.icon />} // Render icon if available */}
                    {social.name.charAt(0)} {/* Fallback: First letter of name */}
                  </a>
                ))}
              </div>
            )}
            <p className="text-brand-beige/80 text-sm">
              {/* Placeholder for contact email/phone */}
              Email: <a href="mailto:info@dreamagent.ca" className="hover:text-brand-beige">info@dreamagent.ca</a>
            </p>
          </div>
        </div>

        <div className="border-t border-brand-slate/50 pt-6 text-center text-sm text-brand-beige/70">
          <p>
            &copy; {currentYear} DreamAgent.ca. All rights reserved.
          </p>
          <p className="mt-1">
            Powered by <Link href="https://dreamagent.ca" className="hover:text-brand-beige transition-colors font-semibold">DreamAgent Platform</Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 