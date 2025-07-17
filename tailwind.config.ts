// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // <--- Add this line for class-based dark mode
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}', // <--- Important for App Router
    './src/**/*.{js,ts,jsx,tsx,mdx}', // <--- Add if you use a 'src' directory
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};