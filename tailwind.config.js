/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');
const withMT = require('@material-tailwind/react/utils/withMT');

const config = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Graphik', 'sans-serif'], // для примера
      serif: ['Merriweather', 'serif'],
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
  },
  plugins: [
    plugin(function ({ addComponents }) {
      addComponents({
        '.signInLabel': {
          padding: '10px',
          border: '2px solid #c1d3f4',
          color: '#CBD5E1',
          borderRadius: '8px',
          transition: 'all 0.3s',
          '&:focus-within': {
            borderColor: '#2563EB',
            color: '#2563EB',
          },
        },
        '.signInLabelError': {
          padding: '10px',
          border: '2px solid rgb(220, 38, 38)',
          color: 'rgb(220, 38, 38)',
          borderRadius: '8px',
        },
      });
    }),
  ],
};

module.exports = config;

module.exports = withMT(config);
