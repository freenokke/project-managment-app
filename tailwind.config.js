// eslint-disable-next-line @typescript-eslint/no-var-requires
const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Graphik', 'sans-serif'], // для примера
      serif: ['Merriweather', 'serif'],
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
        '.button1': {
          display: 'inline-block',
          boxSizing: 'border-box',
          padding: '0 20px',
          margin: '0',
          outline: 'none',
          border: 'none',
          borderRadius: '8px',
          height: '40px',
          lineHeight: '40px',
          fontSize: '17px',
          fontWeight: '600',
          textDecoration: 'none',
          color: '#385898',
          backgroundColor: '#e7f3ff',
          cursor: 'pointer',
          userSelect: 'none',
          appearance: ' none',
          touchAction: 'manipulation',
          '&:focus-visible': {
            boxShadow: '0 0 0 2px #666',
          },
          '&:hover': {
            backgroundColor: '#DBE7F2',
          },
          '&:active': {
            transform: 'scale(0.96)',
          },
          '&:disabled': {
            pointerEvents: 'none',
            opacity: '0.65',
          },
        },
      });
    }),
  ],
};
