/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#370070',
        secondary: '#FF9737',
        sidenavBg: 'linear-gradient(270deg, #fffffffe 0%, #e9ecff 100%)'
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp')
  ],
}