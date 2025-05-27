import type { Metadata } from "next";
import { Inter } from "next/font/google";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Header from "@/components/layout/Header";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "DreamAgent.ca",
  description: "Real Estate Microsite Generator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className={inter.variable}>
        <body>
          <header
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '1rem',
              borderBottom: '1px solid #eee',
              backgroundColor: '#f8f9fa',
            }}
          >
            <div style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>
              {/* Placeholder for main site logo if needed, or remove if Clerk is the only global nav */}
            </div>
            <div>
              <SignedOut>
                <SignInButton />
                <SignUpButton />
              </SignedOut>
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
            </div>
          </header>

          <Header realtorName="Sample Realtor" cityName="Sample City" />

          <main style={{ padding: '1rem' }}>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
