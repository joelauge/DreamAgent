// Common interfaces used throughout the application

export interface Realtor {
  id: string;
  name: string;
  title?: string;
  email?: string;
  phone?: string;
  imageUrl?: string;
  cityName: string;
  headline?: string;
  subheadline?: string;
  aboutText?: string;
  yearsExperience?: number;
  specialties?: string[];
  certifications?: string[];
  brokerageName?: string;
  brokerageAddress?: string;
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    twitter?: string;
  };
}

export interface Listing {
  id: string | number;
  imageUrl: string;
  address: string;
  price: string;
  beds: number;
  baths: number;
  sqFt?: number;
  detailsUrl: string;
  status?: 'active' | 'pending' | 'sold';
  listingType?: 'sale' | 'rent';
}

export interface Testimonial {
  id: string | number;
  text: string;
  clientName: string;
  clientLocation?: string;
  rating?: number;
  date?: string;
}

export interface MarketStat {
  label: string;
  value: string;
  trend?: 'up' | 'down' | 'stable';
  trendValue?: string;
  description?: string;
}

export interface FAQ {
  id: string | number;
  question: string;
  answer: string;
  category?: string;
}

export interface City {
  id: string;
  name: string;
  province: string;
  slug: string;
  latitude?: number;
  longitude?: number;
  population?: number;
  mapUrl?: string;
  geoJson?: any; // GeoJSON data for city boundaries
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
  propertyType?: string;
  budget?: string;
  timeline?: string;
} 