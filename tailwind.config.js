const colors = require('tailwindcss/colors');

module.exports = {
  purge: [],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'indigo-dark': '#1F1942',
        'indigo-background': '#0F0D31',
        'indigo-background-2': '#2A2260',
      },
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    height: {
      '1/2-screen': '50vh',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
