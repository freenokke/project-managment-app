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
        '.boardCard': {
          position: 'relative',
          width: '95%',
          height: '120px',
          padding: '10px 20px',
          boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.25)',
          transition: 'all 0.3s',
          cursor: 'pointer',
          '&:hover': {
            boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.35)',
          },
        },
        '.modalOverlay': {
          position: 'fixed',
          top: '0',
          left: '0',
          bottom: '0',
          right: '0',
          zIndex: '10',
        },
        '.modalInner': {
          position: 'fixed',
          top: '45%',
          left: '50%',
          transform: 'translateX(-50%)',
          transform: 'translateY(-50%)',
          width: '290px',
          padding: '40px 0',
          zIndex: '20',
          borderRadius: '6px',
          backgroundColor: 'white',
          boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.25)',
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
