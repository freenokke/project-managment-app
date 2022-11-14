/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('tailwindcss').Config} */

const withMT = require('@material-tailwind/react/utils/withMT');

const config = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Graphik', 'sans-serif'], // для примера
      serif: ['Merriweather', 'serif'],
    },
    colors: {
      primary: '#FF7235',
    },
    screens: {
      mobile: '576px',
      'small-tablet': '600px',
      tablet: '768px',
      'small-laptop': '992px',
      laptop: '1024px',
    },

    container: {
      padding: '1rem',
      center: true,
    },
    extend: {
      spacing: {
        18: '4.5rem',
      },
    },

    // fontSize: {
    //   s1: [
    //     '30px',
    //     {
    //       fontWeight: 800,
    //     },
    //   ],
    // },
  },
  plugins: [],
};

module.exports = config;

module.exports = withMT(config);
