/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-charcoal': '#222831',
        'brand-gray': '#393E46',
        'brand-tan': '#DBA362',
        'brand-yellow': '#F8C766',
        'brand-peach': '#F5E1DA',
        'brand-cream': '#FFF5E4',
      }
    },
  },
  plugins: [],
}