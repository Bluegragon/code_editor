// tailwind.config.js
import { defineConfig } from 'tailwindcss';
import scrollbar from 'tailwind-scrollbar';

export default defineConfig({
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primarycolor: '#28A99E',
        secondarycolor: '#28A99E',
        accentcolor: '#036C5F',
        alert: '#DF3F40',
      },
    },
  },
  plugins: [
    scrollbar({ nocompatible: true }),
  ],
});
