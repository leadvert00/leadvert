/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    typography: (theme) => ({
      dark: {
        css: {
          color: 'red',
        },
      },
    }),
    extend: {
      colors: {
        primary: '#370070',
        secondary: '#FF9737',
        brand: '#eedac8',
        sidenavBg: 'linear-gradient(270deg, #fffffffe 0%, #e9ecff 100%)'
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/typography')
  ],
}