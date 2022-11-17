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
      keyframes: {
        sunset: {
          '0%': { fill: 'yellow' },
          '10%': { fill: '#F5EBDD' },
          '50%': { fill: '#F5EBDD' },
          '60%': { fill: 'yellow' },
          '100%': { fill: 'yellow' },
        },
        light: {
          '0%': { fill: '#FDC6AE' },
          '10%': { fill: '#1B1B1B' },
          '50%': { fill: '#1B1B1B' },
          '60%': { fill: '#FDC6AE' },
          '100%': { fill: '#FDC6AE' },
        },
        bubble: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(0.8)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      animation: {
        sun: 'sunset 15s linear infinite',
        light: 'light 15s linear infinite',
        bubble: 'bubble 10s linear infinite',
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
        '.height100': {
          height: 'calc(100vh - 65px - 70px)',
        },
      });
    }),
  ],
};

module.exports = config;

module.exports = withMT(config);
