// Design tokens and configuration constants

export const DESIGN_TOKENS = {
  colors: {
    primary: {
      50: '#fdf2f8',
      100: '#fce7f3',
      500: '#f43f5e',
      600: '#e11d48',
    },
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    },
  },
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem',
    '2xl': '4rem',
  },
  borderRadius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
  },
  shadows: {
    card: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    cardHover: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    cardLg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  },
} as const;

export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

export const ANIMATION_DURATIONS = {
  fast: '150ms',
  normal: '200ms',
  slow: '300ms',
  slower: '500ms',
} as const;

export const FORM_VALIDATION = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^[\+]?[1-9][\d]{0,15}$/,
  postalCode: /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/,
} as const;

export const API_ENDPOINTS = {
  contact: '/api/contact',
  listings: '/api/listings',
  realtors: '/api/realtors',
  cities: '/api/cities',
  marketStats: '/api/market-stats',
} as const;

export const SEO_DEFAULTS = {
  title: 'DreamAgent.ca - Real Estate Microsites',
  description: 'Professional real estate microsites for top realtors across Canada',
  keywords: 'real estate, realtor, Canada, homes, properties, microsite',
  ogImage: '/images/og-default.jpg',
} as const;

export const CONTACT_FORM_DEFAULTS = {
  propertyTypes: [
    'Single Family Home',
    'Condo/Apartment',
    'Townhouse',
    'Multi-Family',
    'Commercial',
    'Land/Lot',
  ],
  budgetRanges: [
    'Under $500K',
    '$500K - $750K',
    '$750K - $1M',
    '$1M - $1.5M',
    '$1.5M - $2M',
    'Over $2M',
  ],
  timelines: [
    'Immediately',
    'Within 3 months',
    'Within 6 months',
    'Within 1 year',
    'Just browsing',
  ],
} as const; 