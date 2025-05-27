import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DreamAgent.ca - Real Estate Microsites",
  description: "Professional real estate microsites for top realtors across Canada",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Sample realtor data for layout components
  const realtorData = {
    name: 'Sarah Johnson',
    email: 'sarah.johnson@dreamagent.ca',
    phone: '(416) 555-0123',
    cityName: 'Toronto',
    brokerageName: 'Premier Realty Group',
    brokerageAddress: 'Toronto, ON',
    socialLinks: {
      facebook: 'https://facebook.com/sarahjohnsonrealtor',
      instagram: 'https://instagram.com/sarahjohnsonrealtor',
      linkedin: 'https://linkedin.com/in/sarahjohnsonrealtor',
    }
  };

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Header 
            realtorName={realtorData.name} 
            cityName={realtorData.cityName} 
          />
          
          {/* Clerk Auth UI - temporary for development */}
          <div className="fixed top-20 right-4 z-50 bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-lg">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="text-sm px-3 py-1 bg-rose-500 text-white rounded hover:bg-rose-600 transition-colors">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
          
          {children}
          
          <Footer 
            realtorName={realtorData.name}
            realtorEmail={realtorData.email}
            realtorPhone={realtorData.phone}
            brokerageName={realtorData.brokerageName}
            brokerageAddress={realtorData.brokerageAddress}
            socialLinks={realtorData.socialLinks}
          />
        </body>
      </html>
    </ClerkProvider>
  );
}
