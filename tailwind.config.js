/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '3rem',
        '2xl': '6rem',
      },
    },
    extend: {},
    colors: {
      mainColor: "#060047",
      secondColor: "#125ed4",
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}