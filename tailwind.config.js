/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gray: colors.neutral
      },
      fontSize: {
        // kana: '6rem'
        kana: '7rem'
      }
    }
  },
  plugins: []
};
