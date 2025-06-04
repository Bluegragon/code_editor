/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Enable class-based dark mode (Replit-style toggle)
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Light theme colors
        primarycolor: '#28A99E' ,secondarycolor: '#28A99E',accentcolor:'#036C5F' ,alert: '#DF3F40',
       
      
      },
    },
  },
  plugins: [],
};
