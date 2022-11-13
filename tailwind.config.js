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

    // fontSize: {
    //   s1: [
    //     '30px',
    //     {
    //       fontWeight: 800,
    //     },
    //   ],
    // },
  },

  plugins: [
    plugin(function ({ addComponents }) {
      addComponents({
        '.signInLabel': {
          padding: '10px',
          border: '2px solid #CBD5E1 ',
          color: '#CBD5E1',
          borderRadius: '8px',
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
