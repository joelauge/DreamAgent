import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-navy': '#001f3f',
        'brand-slate': '#708090',
        'brand-beige': '#f5f5dc',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Default sans-serif
        // If Lato is also needed, it can be added here
        // lato: ['Lato', 'sans-serif'],
      },
      // Example for animations (can be expanded)
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
export default config; 