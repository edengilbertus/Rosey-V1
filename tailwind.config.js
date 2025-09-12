/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-cream': '#FFFBF0',
        'brand-peach': '#F8E9D3',
        'brand-tan': '#D1A981',
        'brand-charcoal': '#4F4A45',
        'brand-yellow': '#F3D063',
        'brand-gray': '#D9D9D9',
      },
      fontFamily: {
        'sans': ['Lato', 'sans-serif'],
        'serif': ['Cormorant Garamond', 'serif'],
      }
    },
  },
  plugins: [],
}